const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

// --- START: NEW DEBUG LOG ---
console.log('--- ENV CHECK ---');
console.log('User:', process.env.PG_USER);
console.log('DB:', process.env.PG_DATABASE);
console.log('Hash Key (first 10 chars):', process.env.FIREBASE_SCRYPT_KEY.substring(0, 10));
// Note: We don't log the full password for security, but checking surrounding values helps.
console.log('-----------------');
// --- END: NEW DEBUG LOG ---

// --- Configuration ---
const FIREBASE_EXPORT_FILE = 'users.json'; // Ensure this file is present
const MAX_BATCH_SIZE = 10; // Use a smaller batch size for robustness

// --- Database Connection Pool ---
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: 5432,
    ssl: {
        rejectUnauthorized: false // This disables strict certificate validation
    }
});

/**
 * Executes the full user migration process.
 */
async function migrateUsers() {
    let client;
    let usersData;
    
    try {
        // 1. Read the exported Firebase data
        console.log(`Reading data from ${FIREBASE_EXPORT_FILE}...`);
        const data = fs.readFileSync(FIREBASE_EXPORT_FILE, 'utf8');
        const { users } = JSON.parse(data);

        if (!users || users.length === 0) {
            console.log('No users found in the export file. Exiting.');
            return;
        }

        usersData = users;
        console.log(`Found ${usersData.length} users to migrate.`);
        
        // Connect to the database
        client = await pool.connect();
        
        // --- STEP 2: ISOLATE AND TEST THE FIRST USER INSERTION ---
        const firstUser = usersData[0];
        
        console.log('\n--- TESTING FIRST USER INSERTION ---');
        
        // Data Preparation (from the corrected script)
        const passwordHash = Buffer.from(firstUser.passwordHash, 'base64').toString('hex');
        const passwordSalt = Buffer.from(firstUser.salt, 'base64').toString('hex');
        const displayName = firstUser.displayName || null;
        const createdAt = firstUser.createdAt ? new Date(parseInt(firstUser.createdAt)) : null;
        const lastSignInAt = firstUser.lastSignedInAt ? new Date(parseInt(firstUser.lastSignedInAt)) : null;

        const insertValues = [
            firstUser.localId, 
            firstUser.email,
            firstUser.emailVerified,
            displayName,
            createdAt,
            lastSignInAt,
            passwordHash, 
            passwordSalt, 
            'FIREBASE_SCRYPT'
        ];

        console.log('Prepared values for first user:', insertValues.map(v => (v === null ? 'NULL' : v.toString().substring(0, 50) + '...')));
        
        try {
            await client.query('BEGIN'); // Start transaction for the first time
            
            await client.query(
                `INSERT INTO users (
                    id, email, email_verified, display_name, created_at, last_sign_in_at, 
                    password_hash, password_salt, hash_algorithm
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
                insertValues
            );
            
            await client.query('ROLLBACK'); // Roll back the test insert (we don't want to keep it)
            console.log('--- TEST SUCCESS: First user prepared data accepted by PostgreSQL. ---');

        } catch (dbError) {
            await client.query('ROLLBACK'); // Ensure rollback on failure
            console.error('❌ CRITICAL DB ERROR on First User INSERT:', dbError.message);
            console.error('This is the direct PostgreSQL error. Fix this before proceeding.');
            return; // Exit here
        }

        // -----------------------------------------------------------
        // --- STEP 3: RUN FULL MIGRATION (Only if the test passed) ---
        // -----------------------------------------------------------
        console.log('\n--- RUNNING FULL BATCH MIGRATION ---');
        await client.query('BEGIN'); // Start the real transaction

        let migratedCount = 0;
        
        for (let i = 0; i < usersData.length; i += MAX_BATCH_SIZE) {
            const batch = usersData.slice(i, i + MAX_BATCH_SIZE);
            console.log(`\nProcessing batch ${i / MAX_BATCH_SIZE + 1} (${batch.length} users)...`);

            const batchInserts = batch.map(user => {
                return (async () => {
                    // Data Preparation logic is identical to above, just for mapping
                    const pH = Buffer.from(user.passwordHash, 'base64').toString('hex');
                    const pS = Buffer.from(user.salt, 'base64').toString('hex');
                    const dN = user.displayName || null;
                    const cA = user.createdAt ? new Date(parseInt(user.createdAt)) : null;
                    const lS = user.lastSignedInAt ? new Date(parseInt(user.lastSignedInAt)) : null; 

                    if (!user.localId || !user.email) {
                        throw new Error(`User with missing ID or email skipped.`);
                    }

                    await client.query(
                        `INSERT INTO users (id, email, email_verified, display_name, created_at, last_sign_in_at, password_hash, password_salt, hash_algorithm) 
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (id) DO NOTHING;`, 
                        [user.localId, user.email, user.emailVerified, dN, cA, lS, pH, pS, 'FIREBASE_SCRYPT']
                    );
                    return true;
                })();
            });

            const results = await Promise.allSettled(batchInserts);
            
            results.forEach((result) => {
                if (result.status === 'fulfilled') {
                    migratedCount++;
                } else {
                    console.error(`  -> ❌ FAILED to migrate a user: ${result.reason.message}`);
                }
            });
        }

        await client.query('COMMIT');
        console.log(`\n✅ Migration Complete! Successfully inserted ${migratedCount} users out of ${usersData.length}.`);

    } catch (error) {
        // Final FATAL catch for non-DB errors (e.g., file read or connection pool errors)
        if (client) {
            await client.query('ROLLBACK');
        }
        console.error('❌ FATAL ERROR during migration. Transaction rolled back:', error.message);
    } finally {
        if (client) {
            client.release();
        }
        await pool.end();
    }
}

// Execute the migration
migrateUsers();
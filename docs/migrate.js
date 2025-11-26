const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

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
    ssl: false 
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
        await client.query('BEGIN'); // Start transaction

        let migratedCount = 0;
        
        // 2. Process and insert users in batches
        for (let i = 0; i < usersData.length; i += MAX_BATCH_SIZE) {
            const batch = usersData.slice(i, i + MAX_BATCH_SIZE);
            
            console.log(`\nProcessing batch ${i / MAX_BATCH_SIZE + 1} (${batch.length} users)...`);

            // Use Promise.allSettled to ensure one failure doesn't stop the whole batch
            const batchInserts = batch.map(user => {
                return (async () => {
                    // --- DATA PREPARATION (Corrected and Robust) ---
                    const passwordHash = Buffer.from(user.passwordHash, 'base64').toString('hex');
                    const passwordSalt = Buffer.from(user.salt, 'base64').toString('hex');

                    // Handle optional fields and correct timestamp name
                    const displayName = user.displayName || null;
                    const createdAt = user.createdAt ? new Date(parseInt(user.createdAt)) : null;
                    const lastSignInAt = user.lastSignedInAt ? new Date(parseInt(user.lastSignedInAt)) : null; // Corrected field name

                    // Ensure basic mandatory fields are present before trying to insert
                    if (!user.localId || !user.email) {
                        throw new Error(`User with missing ID or email skipped: ${JSON.stringify(user)}`);
                    }

                    // Insert query
                    await client.query(
                        `INSERT INTO users (
                            id, email, email_verified, display_name, created_at, last_sign_in_at, 
                            password_hash, password_salt, hash_algorithm
                        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                        ON CONFLICT (id) DO NOTHING;`, 
                        [
                            user.localId, 
                            user.email,
                            user.emailVerified,
                            displayName, // Can now be null
                            createdAt, // Can now be null
                            lastSignInAt, // Can now be null
                            passwordHash, 
                            passwordSalt, 
                            'FIREBASE_SCRYPT'
                        ]
                    );
                    return true;
                })(); // Run the async function immediately
            });

            const results = await Promise.allSettled(batchInserts);
            
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    migratedCount++;
                } else {
                    console.error(`  -> ❌ FAILED to migrate user ${batch[index].localId} (${batch[index].email}): ${result.reason.message}`);
                    // Note: If the failure is a UNIQUE constraint violation (e.g., email already exists), 
                    // this is usually the source of the crash, and this new logic will log it and continue.
                }
            });
        }

        // 3. Commit the transaction
        await client.query('COMMIT');
        console.log(`\n✅ Migration Complete! Successfully inserted ${migratedCount} users out of ${usersData.length}.`);

    } catch (error) {
        // Only rollback if an error occurred outside the specific user insertion loop (e.g., connection or file read error)
        if (client) {
            await client.query('ROLLBACK');
        }
        console.error('❌ FATAL ERROR during migration. Transaction rolled back:', error.message);
    } finally {
        // Release the database client
        if (client) {
            client.release();
        }
        await pool.end();
    }
}

// Run the migration script
migrateUsers();
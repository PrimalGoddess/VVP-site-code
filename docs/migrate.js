const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

// --- Configuration ---
const FIREBASE_EXPORT_FILE = 'users.json'; // Name of the file you exported from Firebase
const MAX_BATCH_SIZE = 100; // Insert users in batches to prevent transaction overload

// --- Database Connection Pool ---
const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    port: 5432, // Default PostgreSQL port
    ssl: false // Use false if connecting locally/internally, or configure correctly for external
});

/**
 * Executes the full user migration process.
 */
async function migrateUsers() {
    let client;
    try {
        // 1. Read the exported Firebase data
        console.log(`Reading data from ${FIREBASE_EXPORT_FILE}...`);
        const data = fs.readFileSync(FIREBASE_EXPORT_FILE, 'utf8');
        const { users } = JSON.parse(data);

        if (!users || users.length === 0) {
            console.log('No users found in the export file. Exiting.');
            return;
        }

        console.log(`Found ${users.length} users to migrate.`);
        
        // Connect to the database
        client = await pool.connect();
        await client.query('BEGIN'); // Start transaction for atomic operations

        let migratedCount = 0;
        
        // 2. Process and insert users in batches
        for (let i = 0; i < users.length; i += MAX_BATCH_SIZE) {
            const batch = users.slice(i, i + MAX_BATCH_SIZE);
            const inserts = batch.map(user => {
                // IMPORTANT: Firebase exports the hash and salt as base64 strings.
                // We store them as standard strings (VARCHAR) in the DB.
                // We use Buffer to ensure we are correctly reading the binary data before insertion.
                const passwordHash = Buffer.from(user.passwordHash, 'base64').toString('hex');
                const passwordSalt = Buffer.from(user.salt, 'base64').toString('hex');

                // Map Firebase fields to PostgreSQL fields
                return client.query(
                    `INSERT INTO users (
                        id, email, email_verified, display_name, created_at, last_sign_in_at, 
                        password_hash, password_salt, hash_algorithm
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    ON CONFLICT (id) DO NOTHING;`, // Prevents errors on re-run if IDs exist
                    [
                        user.localId, 
                        user.email,
                        user.emailVerified,
                        user.displayName,
                        new Date(parseInt(user.createdAt)),
                        new Date(parseInt(user.lastLoginAt)),
                        passwordHash, 
                        passwordSalt, 
                        'FIREBASE_SCRYPT'
                    ]
                );
            });

            await Promise.all(inserts);
            migratedCount += batch.length;
            console.log(`-> Successfully migrated batch ${i / MAX_BATCH_SIZE + 1}. Total migrated: ${migratedCount}`);
        }

        // 3. Commit the transaction
        await client.query('COMMIT');
        console.log(`\n✅ Migration Complete! Successfully inserted ${migratedCount} users.`);

    } catch (error) {
        // Rollback on any error
        if (client) {
            await client.query('ROLLBACK');
        }
        console.error('❌ An error occurred during migration. Transaction rolled back:', error.message);
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
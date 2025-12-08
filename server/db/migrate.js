import pool from '../config/database.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
    const client = await pool.connect();

    try {
        console.log('🔄 Running case study migration...\n');

        // Read migration file
        const migrationPath = join(__dirname, 'migrate-case-study.sql');
        const migration = fs.readFileSync(migrationPath, 'utf8');

        console.log('📋 Executing migration SQL...');
        await client.query(migration);

        console.log('✅ Migration completed successfully!\n');

        // Verify new columns exist
        const result = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'portfolio_items' 
      AND column_name IN ('content', 'role', 'timeline', 'tools', 'live_link', 'hero_image', 'slug')
      ORDER BY column_name;
    `);

        console.log('📊 New columns added to portfolio_items:');
        result.rows.forEach(row => {
            console.log(`  ✓ ${row.column_name} (${row.data_type})`);
        });

        // Verify images table exists
        const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'portfolio_images'
      );
    `);

        if (tableCheck.rows[0].exists) {
            console.log('\n✅ portfolio_images table created');
        }

        client.release();

    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

runMigration()
    .then(() => {
        console.log('\n🎉 Database migration complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Migration error:', error);
        process.exit(1);
    });

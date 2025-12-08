import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const { Pool } = pg;

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database initialization script
async function initializeDatabase() {
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    try {
        console.log('🔌 Connecting to database...');

        // Test connection
        const client = await pool.connect();
        console.log('✅ Connected to PostgreSQL database');

        // Read schema file
        const schemaPath = join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('📋 Executing schema...');

        // Execute schema
        await client.query(schema);

        console.log('✅ Database schema created successfully!');
        console.log('\n📊 Tables created:');
        console.log('  - contacts (for contact form submissions)');

        // Verify tables exist
        const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `);

        console.log('\n📋 Existing tables in database:');
        result.rows.forEach(row => {
            console.log(`  - ${row.table_name}`);
        });

        client.release();

    } catch (error) {
        console.error('❌ Error initializing database:', error);
        throw error;
    } finally {
        await pool.end();
        console.log('\n🔌 Database connection closed');
    }
}

// Run initialization
initializeDatabase()
    .then(() => {
        console.log('\n✨ Database initialization complete!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n💥 Failed to initialize database:', error);
        process.exit(1);
    });

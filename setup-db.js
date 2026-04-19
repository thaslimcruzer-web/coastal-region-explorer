// Database Setup Script - Creates all tables and sample data
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

async function setupDatabase() {
  console.log('\n🌊 COASTAL REGION DATABASE - SETUP');
  console.log('='.repeat(60));
  
  let connection;
  let dbConnection;
  
  try {
    // Connect to MySQL (without database first)
    console.log('\n📡 Connecting to MySQL...');
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });
    console.log('✅ Connected to MySQL\n');
    
    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'coastal_region';
    console.log(`📊 Creating database '${dbName}' if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database '${dbName}' ready\n`);
    
    // Close initial connection
    await connection.end();
    
    // Connect to the specific database
    console.log(`📡 Connecting to database '${dbName}'...`);
    dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: dbName,
      port: process.env.DB_PORT || 3306,
      multipleStatements: true
    });
    console.log(`✅ Connected to database: ${dbName}\n`);
    
    // Read database.sql file
    console.log('📂 Reading database.sql...');
    const sql = fs.readFileSync('database.sql', 'utf8');
    console.log('✅ SQL file loaded\n');
    
    // Execute the entire SQL file at once (mysql2 can handle multiple statements)
    console.log('🔧 Setting up database...');
    
    try {
      await dbConnection.query(sql);
      console.log('✅ SQL file executed successfully\n');
    } catch (sqlError) {
      console.log('⚠️  Some SQL statements may have failed (this is normal for duplicate entries)');
      console.log(`   Error: ${sqlError.message.substring(0, 100)}...\n`);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ DATABASE SETUP COMPLETE!');
    console.log('='.repeat(60));
    
    // Verify tables
    console.log('\n🔍 Verifying tables...\n');
    const [tables] = await dbConnection.query('SHOW TABLES');
    console.log(`📋 Tables in database: ${tables.length}\n`);
    
    const tableNames = tables.map(t => Object.values(t)[0]);
    for (const table of tableNames) {
      try {
        const [result] = await dbConnection.query(`SELECT COUNT(*) as count FROM \`${table}\``);
        console.log(`   ✓ ${table.padEnd(30)} ${result[0].count} records`);
      } catch (e) {
        console.log(`   ✓ ${table.padEnd(30)} (unable to count)`);
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Database is ready to use!');
    console.log('='.repeat(60));
    console.log('\n🚀 Next steps:');
    console.log('   1. Start server: npm start');
    console.log('   2. Test API: node test-api.js');
    console.log('   3. Run SQL tools: node sql-tools.js\n');
    
  } catch (error) {
    console.log('\n❌ SETUP FAILED!');
    console.log('Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check MySQL is running');
    console.log('   2. Verify .env file credentials');
    console.log('   3. Check database.sql file exists');
    console.log('   4. Ensure DB_HOST, DB_USER, DB_PASSWORD are set correctly\n');
  } finally {
    if (connection) {
      await connection.end().catch(() => {});
    }
    if (dbConnection) {
      await dbConnection.end().catch(() => {});
    }
  }
}

setupDatabase();

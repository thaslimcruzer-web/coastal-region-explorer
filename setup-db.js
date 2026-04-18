// Database Setup Script - Creates all tables and sample data
const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

async function setupDatabase() {
  console.log('\n🌊 COASTAL REGION DATABASE - SETUP');
  console.log('='.repeat(60));
  
  let connection;
  
  try {
    // Connect to MySQL
    console.log('\n📡 Connecting to MySQL...');
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
    console.log('✅ Connected to MySQL\n');
    
    // Read database.sql file
    console.log('📂 Reading database.sql...');
    const sql = fs.readFileSync('database.sql', 'utf8');
    console.log('✅ SQL file loaded\n');
    
    // Split SQL into individual statements
    console.log('🔧 Setting up database...');
    
    // Use the SQL file content directly - mysql2 can handle multiple statements
    const statements = sql
      .replace(/--.*$/gm, '') // Remove comments
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);
    
    console.log(`Found ${statements.length} SQL statements\n`);
    
    // First, use the database
    await connection.query('USE coastal_region');
    console.log('✅ Selected database: coastal_region\n');
    
    // Execute each statement
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      try {
        await connection.query(statement);
        successCount++;
        
        // Show progress for important operations
        if (statement.includes('CREATE TABLE')) {
          const tableName = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/i);
          if (tableName) {
            console.log(`✅ Created table: ${tableName[1]}`);
          }
        } else if (statement.includes('INSERT INTO')) {
          const tableName = statement.match(/INSERT INTO (\w+)/i);
          if (tableName) {
            console.log(`✅ Inserted data into: ${tableName[1]}`);
          }
        }
      } catch (error) {
        // Ignore some expected errors (like duplicate inserts)
        if (!error.message.includes('already exists') && 
            !error.message.includes('Duplicate entry')) {
          console.log(`⚠️  Statement ${i + 1}: ${error.message.substring(0, 50)}...`);
          errorCount++;
        }
      }
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ DATABASE SETUP COMPLETE!');
    console.log('='.repeat(60));
    console.log(`\n📊 Results:`);
    console.log(`   Successful: ${successCount} statements`);
    console.log(`   Errors: ${errorCount} statements\n`);
    
    // Verify tables
    console.log('🔍 Verifying tables...\n');
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`📋 Tables in database: ${tables.length}\n`);
    
    const tableNames = tables.map(t => Object.values(t)[0]);
    for (const table of tableNames) {
      const [result] = await connection.query(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`   ✓ ${table.padEnd(25)} ${result[0].count} records`);
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
    console.log('   1. Check MySQL is running: net start MySQL80');
    console.log('   2. Verify .env file credentials');
    console.log('   3. Check database.sql file exists\n');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();

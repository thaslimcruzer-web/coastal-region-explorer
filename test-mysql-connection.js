// Simple MySQL Connection Test
const mysql = require('mysql2/promise');
require('dotenv').config();

async function testMySQLConnection() {
  console.log('\n🌊 COASTAL REGION DATABASE - CONNECTION TEST');
  console.log('='.repeat(60));
  
  console.log('\n📋 Connection Details:');
  console.log(`   Host: ${process.env.DB_HOST}`);
  console.log(`   Port: ${process.env.DB_PORT}`);
  console.log(`   User: ${process.env.DB_USER}`);
  console.log(`   Database: ${process.env.DB_NAME}`);
  console.log('');

  try {
    // Step 1: Test MySQL Server Connection
    console.log('🔹 Step 1: Testing MySQL Server Connection...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
    console.log('✅ MySQL Server Connected!\n');

    // Step 2: Get MySQL Version
    console.log('🔹 Step 2: Checking MySQL Version...');
    const [versionResult] = await connection.query('SELECT VERSION() as version');
    console.log(`✅ MySQL Version: ${versionResult[0].version}\n`);

    // Step 3: Check if Database Exists
    console.log('🔹 Step 3: Checking Database...');
    const [databases] = await connection.query('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === process.env.DB_NAME);
    
    if (dbExists) {
      console.log(`✅ Database "${process.env.DB_NAME}" exists!\n`);
    } else {
      console.log(`⚠️  Database "${process.env.DB_NAME}" NOT found!\n`);
      console.log('📝 To create database, run:');
      console.log('   mysql -u root -p < database.sql\n');
    }

    // Step 4: Connect to Database
    console.log('🔹 Step 4: Connecting to Database...');
    await connection.query(`USE ${process.env.DB_NAME}`);
    console.log('✅ Database Selected!\n');

    // Step 5: List Tables
    console.log('🔹 Step 5: Checking Tables...');
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`✅ Found ${tables.length} tables:\n`);
    
    if (tables.length > 0) {
      const tableNames = tables.map(t => Object.values(t)[0]);
      tableNames.forEach((table, index) => {
        console.log(`   ${index + 1}. ${table}`);
      });
      console.log('');
    }

    // Step 6: Count Records
    console.log('🔹 Step 6: Counting Records...');
    const importantTables = ['places', 'species', 'sightings', 'environmental_data', 'conservation_projects', 'reviews', 'users'];
    
    for (const table of importantTables) {
      try {
        const [result] = await connection.query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`   ${table.padEnd(25)} ${result[0].count} records`);
      } catch (err) {
        console.log(`   ${table.padEnd(25)} Table not found`);
      }
    }

    // Step 7: Test Query
    console.log('\n🔹 Step 7: Testing Query...');
    const [testQuery] = await connection.query('SELECT 1 + 1 AS result');
    console.log(`✅ Query Test: 1 + 1 = ${testQuery[0].result}\n`);

    // Close Connection
    await connection.end();
    
    console.log('='.repeat(60));
    console.log('✅ ALL TESTS PASSED! Database connection is working!');
    console.log('='.repeat(60));
    console.log('\n🚀 You can now start your server:');
    console.log('   npm start');
    console.log('\n🌐 Server will be available at:');
    console.log('   http://localhost:' + process.env.PORT);
    console.log('');

  } catch (error) {
    console.log('\n' + '='.repeat(60));
    console.log('❌ CONNECTION FAILED!');
    console.log('='.repeat(60));
    console.log('\n🔴 Error:', error.message);
    console.log('\n📋 Troubleshooting Steps:\n');

    if (error.code === 'ECONNREFUSED') {
      console.log('1️⃣  MySQL Service Not Running');
      console.log('   Solution: Start MySQL service');
      console.log('   Command (Admin): net start MySQL80');
      console.log('   or: net start MySQL\n');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('2️⃣  Access Denied - Wrong Password');
      console.log('   Solution: Check password in .env file');
      console.log('   File: .env');
      console.log('   Line: DB_PASSWORD=your_password\n');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('3️⃣  Database Does Not Exist');
      console.log('   Solution: Create database');
      console.log('   Command: mysql -u root -p < database.sql\n');
    } else {
      console.log('🔧 General Troubleshooting:');
      console.log('   1. Check if MySQL is installed');
      console.log('   2. Verify MySQL service is running');
      console.log('   3. Check .env file credentials');
      console.log('   4. Verify MySQL port (default: 3306)\n');
    }

    console.log('📝 Useful Commands:\n');
    console.log('   Check MySQL status:');
    console.log('   mysqladmin -u root -p status\n');
    console.log('   Start MySQL (as Administrator):');
    console.log('   net start MySQL80\n');
    console.log('   Test MySQL login:');
    console.log('   mysql -u root -p\n');
  }
}

// Run the test
testMySQLConnection();

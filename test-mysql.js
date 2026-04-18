const mysql = require('mysql2/promise');
require('dotenv').config();

async function testAndFixMySQL() {
  console.log('🔍 Testing MySQL Connection...\n');
  
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
  };

  console.log('Configuration:');
  console.log(`  Host: ${config.host}`);
  console.log(`  User: ${config.user}`);
  console.log(`  Password: ${config.password ? '*** SET ***' : 'NOT SET'}`);
  console.log(`  Port: ${config.port}`);
  console.log(`  Database: ${process.env.DB_NAME || 'coastal_region'}\n`);

  try {
    // Test 1: Can we connect to MySQL server?
    console.log('Test 1: Connecting to MySQL server...');
    const connection = await mysql.createConnection(config);
    console.log('✅ SUCCESS: Connected to MySQL server!\n');

    // Test 2: Does the database exist?
    const dbName = process.env.DB_NAME || 'coastal_region';
    console.log(`Test 2: Checking if database '${dbName}' exists...`);
    
    const [databases] = await connection.query('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === dbName);

    if (dbExists) {
      console.log(`✅ SUCCESS: Database '${dbName}' exists!\n`);

      // Test 3: Can we use the database?
      console.log(`Test 3: Using database '${dbName}'...`);
      await connection.query(`USE ${dbName}`);
      console.log('✅ SUCCESS: Database selected!\n');

      // Test 4: Do tables exist?
      console.log('Test 4: Checking tables...');
      const [tables] = await connection.query('SHOW TABLES');
      
      if (tables.length > 0) {
        console.log(`✅ SUCCESS: Found ${tables.length} table(s):`);
        tables.forEach(table => {
          const tableName = Object.values(table)[0];
          console.log(`   - ${tableName}`);
        });
        console.log('');
      } else {
        console.log('⚠️  WARNING: No tables found!');
        console.log('   Run: mysql -u root -p < database.sql\n');
      }

      // Test 5: Check sample data
      console.log('Test 5: Checking sightings data...');
      const [rows] = await connection.query('SELECT COUNT(*) as count FROM sightings');
      console.log(`✅ Found ${rows[0].count} sighting(s)\n`);

    } else {
      console.log(`❌ ERROR: Database '${dbName}' does NOT exist!\n`);
      console.log('🔧 FIX: Run this command to create it:');
      console.log(`   mysql -u root -p -e "CREATE DATABASE ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"\n`);
      console.log('   Then import the schema:');
      console.log('   mysql -u root -p < database.sql\n');
    }

    await connection.end();

  } catch (error) {
    console.log(`❌ FAILED: ${error.message}\n`);

    if (error.code === 'ECONNREFUSED') {
      console.log('🔧 FIX: MySQL server is not running!');
      console.log('   - Start MySQL service');
      console.log('   - Or start XAMPP/WAMP');
      console.log('   - Check if MySQL is installed: mysql --version\n');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('🔧 FIX: Access denied!');
      console.log('   - Check your password in .env file');
      console.log('   - Test login: mysql -u root -p');
      console.log('   - Reset password if needed\n');
    } else {
      console.log('🔧 TROUBLESHOOTING:');
      console.log('   1. Is MySQL installed? Check: mysql --version');
      console.log('   2. Is MySQL running? Check services');
      console.log('   3. Are credentials correct in .env?');
      console.log('   4. Can you login? mysql -u root -p\n');
    }
  }

  console.log('═══════════════════════════════════════');
  console.log('📋 Quick Fix Commands:');
  console.log('═══════════════════════════════════════\n');
  console.log('1. Test MySQL login:');
  console.log('   mysql -u root -p\n');
  console.log('2. Create database:');
  console.log('   mysql -u root -p -e "CREATE DATABASE coastal_region CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"\n');
  console.log('3. Import schema:');
  console.log('   mysql -u root -p < database.sql\n');
  console.log('4. Start server:');
  console.log('   npm run dev\n');
  console.log('5. Test API:');
  console.log('   http://localhost:3002/test-db.html\n');
}

testAndFixMySQL();

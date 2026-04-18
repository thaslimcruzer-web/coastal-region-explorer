const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  console.log('\n🔍 Testing MySQL Connection...\n');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('Port:', process.env.DB_PORT);
  console.log('Database:', process.env.DB_NAME);
  console.log('\n' + '='.repeat(50) + '\n');

  try {
    // Test basic connection without database
    console.log('1️⃣  Testing basic MySQL connection...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
    
    console.log('✅ Basic connection successful!');
    
    // Get MySQL version
    const [version] = await connection.query('SELECT VERSION() as version');
    console.log('📊 MySQL Version:', version[0].version);
    
    // Check if database exists
    console.log('\n2️⃣  Checking if database exists...');
    const [databases] = await connection.query('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === process.env.DB_NAME);
    
    if (dbExists) {
      console.log(`✅ Database "${process.env.DB_NAME}" exists!`);
      
      // Test database connection
      console.log('\n3️⃣  Testing database connection...');
      await connection.query(`USE ${process.env.DB_NAME}`);
      console.log('✅ Database connection successful!');
      
      // Check tables
      const [tables] = await connection.query('SHOW TABLES');
      console.log(`📋 Tables in database: ${tables.length}`);
      if (tables.length > 0) {
        tables.forEach(table => {
          const tableName = Object.values(table)[0];
          console.log(`   - ${tableName}`);
        });
      }
    } else {
      console.log(`⚠️  Database "${process.env.DB_NAME}" does not exist`);
      console.log('💡 Run this command to create it:');
      console.log(`   mysql -u ${process.env.DB_USER} -p < database.sql`);
    }
    
    await connection.end();
    console.log('\n✅ All tests passed! MySQL is working correctly.\n');
    
  } catch (error) {
    console.error('\n❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('\n💡 Possible solutions:');
    console.error('   1. Make sure MySQL service is running');
    console.error('   2. Check if username and password are correct');
    console.error('   3. Verify MySQL is installed on port ' + process.env.DB_PORT);
    console.error('\n📝 To start MySQL service, run (as Administrator):');
    console.error('   net start MySQL80');
    console.error('   or');
    console.error('   net start MySQL');
    console.error('\n');
  }
}

testConnection();

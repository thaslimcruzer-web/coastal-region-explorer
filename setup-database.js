const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupDatabase() {
  console.log('\n🔧 Setting up MySQL Database...\n');
  
  try {
    // Connect without database specified
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
    
    console.log('✅ Connected to MySQL server');
    
    // Read the SQL file
    const sqlFile = path.join(__dirname, 'database.sql');
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    
    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log(`📋 Found ${statements.length} SQL statements to execute\n`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.query(statement);
          console.log(`✅ Statement ${i + 1} executed successfully`);
        } catch (error) {
          console.log(`⚠️  Statement ${i + 1}: ${error.message}`);
        }
      }
    }
    
    console.log('\n✅ Database setup complete!');
    
    // Verify database was created
    const [databases] = await connection.query('SHOW DATABASES');
    const dbExists = databases.some(db => db.Database === process.env.DB_NAME);
    
    if (dbExists) {
      console.log(`✅ Database "${process.env.DB_NAME}" exists`);
      
      // Switch to the database
      await connection.query(`USE ${process.env.DB_NAME}`);
      
      // Check tables
      const [tables] = await connection.query('SHOW TABLES');
      console.log(`📊 Tables created: ${tables.length}`);
      
      if (tables.length > 0) {
        tables.forEach(table => {
          const tableName = Object.values(table)[0];
          console.log(`   ✓ ${tableName}`);
        });
      }
    }
    
    await connection.end();
    console.log('\n🎉 Database is ready to use!\n');
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.error('\nPlease check:');
    console.error('1. MySQL is running');
    console.error('2. Username and password are correct in .env file');
    console.error('3. database.sql file exists\n');
  }
}

setupDatabase();

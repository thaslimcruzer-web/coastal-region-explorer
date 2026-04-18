// Show Database Content - Displays all data from your coastal region database
const mysql = require('mysql2/promise');
require('dotenv').config();

async function showDatabase() {
  console.log('\n🌊 COASTAL REGION DATABASE - SHOW ALL DATA');
  console.log('='.repeat(70));
  
  let connection;
  
  try {
    // Connect to MySQL
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    
    console.log('✅ Connected to database: coastal_region\n');
    
    // 1. Show all tables
    console.log('\n📋 TABLES IN DATABASE:');
    console.log('-'.repeat(70));
    const [tables] = await connection.query('SHOW TABLES');
    tables.forEach((table, index) => {
      const tableName = Object.values(table)[0];
      console.log(`   ${index + 1}. ${tableName}`);
    });
    
    // 2. Show places
    console.log('\n\n🏖️  PLACES (5 records):');
    console.log('-'.repeat(70));
    const [places] = await connection.query('SELECT * FROM places ORDER BY rating DESC');
    places.forEach((place, i) => {
      console.log(`\n   ${i + 1}. ${place.name}`);
      console.log(`      Category: ${place.category}`);
      console.log(`      Rating: ⭐ ${place.rating}`);
      console.log(`      Visitors: ${place.visitor_count}`);
      console.log(`      Best Time: ${place.best_time_to_visit}`);
      console.log(`      Location: ${place.latitude}, ${place.longitude}`);
    });
    
    // 3. Show species
    console.log('\n\n🐢 SPECIES (7 records):');
    console.log('-'.repeat(70));
    const [species] = await connection.query('SELECT * FROM species ORDER BY name');
    species.forEach((s, i) => {
      console.log(`\n   ${i + 1}. ${s.name}`);
      console.log(`      Scientific: ${s.scientific_name}`);
      console.log(`      Category: ${s.category}`);
      console.log(`      Status: ${s.conservation_status}`);
      console.log(`      Habitat: ${s.habitat}`);
    });
    
    // 4. Show sightings
    console.log('\n\n👁️  SIGHTINGS (9 records):');
    console.log('-'.repeat(70));
    const [sightings] = await connection.query('SELECT * FROM sightings ORDER BY created_at DESC LIMIT 10');
    sightings.forEach((s, i) => {
      console.log(`\n   ${i + 1}. ${s.species}`);
      console.log(`      Location: ${s.location}`);
      console.log(`      Date: ${s.sighting_date}`);
      console.log(`      Depth: ${s.depth}m | Count: ${s.count}`);
      if (s.notes) console.log(`      Notes: ${s.notes}`);
    });
    
    // 5. Show environmental data
    console.log('\n\n🌊 ENVIRONMENTAL DATA (4 records):');
    console.log('-'.repeat(70));
    const [envData] = await connection.query('SELECT * FROM environmental_data ORDER BY recorded_at DESC LIMIT 5');
    envData.forEach((e, i) => {
      console.log(`\n   ${i + 1}. ${e.location}`);
      console.log(`      Water: ${e.water_temperature}°C | Air: ${e.air_temperature}°C`);
      console.log(`      Waves: ${e.wave_height}m | Visibility: ${e.visibility}m`);
      console.log(`      Wind: ${e.wind_speed} km/h | Weather: ${e.weather_condition}`);
    });
    
    // 6. Show conservation projects
    console.log('\n\n🌱 CONSERVATION PROJECTS (4 records):');
    console.log('-'.repeat(70));
    const [projects] = await connection.query('SELECT * FROM conservation_projects ORDER BY start_date DESC');
    projects.forEach((p, i) => {
      console.log(`\n   ${i + 1}. ${p.name}`);
      console.log(`      Status: ${p.status.toUpperCase()}`);
      console.log(`      Location: ${p.location}`);
      console.log(`      Budget: $${p.budget?.toLocaleString() || 'N/A'}`);
      console.log(`      Participants: ${p.participants_count}`);
      console.log(`      Coordinator: ${p.coordinator}`);
    });
    
    // 7. Show reviews
    console.log('\n\n💬 REVIEWS:');
    console.log('-'.repeat(70));
    const [reviews] = await connection.query(`
      SELECT r.*, u.name as reviewer_name, p.name as place_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN places p ON r.place_id = p.id
      ORDER BY r.created_at DESC
    `);
    if (reviews.length > 0) {
      reviews.forEach((r, i) => {
        console.log(`\n   ${i + 1}. ${'⭐'.repeat(r.rating)} (${r.rating}/5)`);
        console.log(`      Place: ${r.place_name}`);
        console.log(`      Reviewer: ${r.reviewer_name}`);
        console.log(`      Comment: ${r.comment}`);
      });
    } else {
      console.log('   No reviews yet');
    }
    
    // 8. Show users
    console.log('\n\n👥 USERS:');
    console.log('-'.repeat(70));
    const [users] = await connection.query('SELECT id, name, email, role, created_at FROM users');
    if (users.length > 0) {
      users.forEach((u, i) => {
        console.log(`   ${i + 1}. ${u.name} (${u.role}) - ${u.email}`);
      });
    } else {
      console.log('   No users registered yet');
    }
    
    // 9. Database statistics
    console.log('\n\n📊 DATABASE STATISTICS:');
    console.log('-'.repeat(70));
    const [stats] = await connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM places) as total_places,
        (SELECT COUNT(*) FROM species) as total_species,
        (SELECT COUNT(*) FROM sightings) as total_sightings,
        (SELECT COUNT(*) FROM environmental_data) as total_env_records,
        (SELECT COUNT(*) FROM conservation_projects) as total_projects,
        (SELECT COUNT(*) FROM reviews) as total_reviews,
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM favorites) as total_favorites,
        (SELECT COUNT(*) FROM trip_items) as total_trip_items
    `);
    
    const stat = stats[0];
    console.log(`   Places:                ${stat.total_places}`);
    console.log(`   Species:               ${stat.total_species}`);
    console.log(`   Sightings:             ${stat.total_sightings}`);
    console.log(`   Environmental Records: ${stat.total_env_records}`);
    console.log(`   Conservation Projects: ${stat.total_projects}`);
    console.log(`   Reviews:               ${stat.total_reviews}`);
    console.log(`   Users:                 ${stat.total_users}`);
    console.log(`   Favorites:             ${stat.total_favorites}`);
    console.log(`   Trip Items:            ${stat.total_trip_items}`);
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ DATABASE DISPLAY COMPLETE!');
    console.log('='.repeat(70));
    console.log('\n💡 Total Records:', 
      stat.total_places + stat.total_species + stat.total_sightings + 
      stat.total_env_records + stat.total_projects + stat.total_reviews + 
      stat.total_users + stat.total_favorites + stat.total_trip_items
    );
    console.log('');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Make sure MySQL is running: net start MySQL80');
    console.error('   2. Check your .env file credentials');
    console.error('   3. Verify database exists: node test-mysql-connection.js\n');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

showDatabase();

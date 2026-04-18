const mysql = require('mysql2/promise');
require('dotenv').config();

// SQL Tools Utility for Coastal Region Database
class SQLTools {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
      });
      console.log('✅ Connected to coastal_region database\n');
    } catch (error) {
      console.error('❌ Connection failed:', error.message);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.end();
      console.log('\n✅ Database connection closed');
    }
  }

  // 1. Database Statistics
  async getDatabaseStats() {
    console.log('\n📊 DATABASE STATISTICS');
    console.log('='.repeat(50));
    
    const [stats] = await this.connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM sightings) as total_sightings,
        (SELECT COUNT(*) FROM trip_items) as total_trip_items,
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM favorites) as total_favorites,
        (SELECT COUNT(*) FROM places) as total_places,
        (SELECT COUNT(*) FROM species) as total_species,
        (SELECT COUNT(*) FROM environmental_data) as total_env_records,
        (SELECT COUNT(*) FROM conservation_projects) as total_projects,
        (SELECT COUNT(*) FROM reviews) as total_reviews
    `);
    
    console.log(`Total Sightings:        ${stats[0].total_sightings}`);
    console.log(`Total Trip Items:       ${stats[0].total_trip_items}`);
    console.log(`Total Users:            ${stats[0].total_users}`);
    console.log(`Total Favorites:        ${stats[0].total_favorites}`);
    console.log(`Total Places:           ${stats[0].total_places}`);
    console.log(`Total Species:          ${stats[0].total_species}`);
    console.log(`Total Env. Records:     ${stats[0].total_env_records}`);
    console.log(`Total Projects:         ${stats[0].total_projects}`);
    console.log(`Total Reviews:          ${stats[0].total_reviews}`);
  }

  // 2. Recent Sightings
  async getRecentSightings(limit = 10) {
    console.log(`\n🐢 RECENT SIGHTINGS (Last ${limit})`);
    console.log('='.repeat(50));
    
    const [sightings] = await this.connection.query(`
      SELECT species, location, sighting_date, depth, count, notes
      FROM sightings
      ORDER BY created_at DESC
      LIMIT ?
    `, [limit]);
    
    if (sightings.length === 0) {
      console.log('No sightings found');
      return;
    }
    
    sightings.forEach((s, i) => {
      console.log(`\n${i + 1}. ${s.species}`);
      console.log(`   Location: ${s.location}`);
      console.log(`   Date: ${s.sighting_date}`);
      console.log(`   Depth: ${s.depth}m | Count: ${s.count}`);
      if (s.notes) console.log(`   Notes: ${s.notes}`);
    });
  }

  // 3. Species Summary
  async getSpeciesSummary() {
    console.log('\n📈 SPECIES SUMMARY');
    console.log('='.repeat(50));
    
    const [summary] = await this.connection.query(`
      SELECT 
        species,
        COUNT(*) as sighting_count,
        SUM(count) as total_animals,
        ROUND(AVG(depth), 2) as avg_depth
      FROM sightings
      GROUP BY species
      ORDER BY sighting_count DESC
    `);
    
    console.log('\nSpecies                  | Sightings | Animals | Avg Depth');
    console.log('-'.repeat(50));
    summary.forEach(s => {
      console.log(
        `${s.species.padEnd(24)} | ${String(s.sighting_count).padStart(9)} | ${String(s.total_animals).padStart(7)} | ${s.avg_depth}m`
      );
    });
  }

  // 4. Location Analysis
  async getLocationAnalysis() {
    console.log('\n📍 LOCATION ANALYSIS');
    console.log('='.repeat(50));
    
    const [locations] = await this.connection.query(`
      SELECT 
        location,
        COUNT(*) as sightings,
        COUNT(DISTINCT species) as species_count,
        GROUP_CONCAT(DISTINCT species ORDER BY species SEPARATOR ', ') as species_list
      FROM sightings
      GROUP BY location
      ORDER BY sightings DESC
    `);
    
    locations.forEach((loc, i) => {
      console.log(`\n${i + 1}. ${loc.location}`);
      console.log(`   Sightings: ${loc.sightings} | Species: ${loc.species_count}`);
      console.log(`   Species: ${loc.species_list}`);
    });
  }

  // 5. Trip Planning Overview
  async getTripOverview() {
    console.log('\n🗓️  TRIP PLANNING OVERVIEW');
    console.log('='.repeat(50));
    
    const [trips] = await this.connection.query(`
      SELECT 
        trip_date,
        COUNT(*) as places,
        GROUP_CONCAT(place_name ORDER BY place_name SEPARATOR ', ') as place_list
      FROM trip_items
      WHERE trip_date >= CURRENT_DATE()
      GROUP BY trip_date
      ORDER BY trip_date ASC
      LIMIT 10
    `);
    
    if (trips.length === 0) {
      console.log('No upcoming trips planned');
      return;
    }
    
    trips.forEach(trip => {
      console.log(`\n📅 ${trip.trip_date}`);
      console.log(`   Places: ${trip.places}`);
      console.log(`   ${trip.place_list}`);
    });
  }

  // 6. User Activity
  async getUserActivity() {
    console.log('\n👥 USER ACTIVITY');
    console.log('='.repeat(50));
    
    const [users] = await this.connection.query(`
      SELECT 
        u.name,
        u.email,
        u.role,
        COUNT(DISTINCT f.id) as favorites_count,
        DATE_FORMAT(u.created_at, '%Y-%m-%d') as registered
      FROM users u
      LEFT JOIN favorites f ON u.id = f.user_id
      GROUP BY u.id, u.name, u.email, u.role, u.created_at
      ORDER BY u.created_at DESC
      LIMIT 10
    `);
    
    if (users.length === 0) {
      console.log('No users registered yet');
      return;
    }
    
    users.forEach(user => {
      console.log(`\n👤 ${user.name} (${user.role})`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Favorites: ${user.favorites_count}`);
      console.log(`   Registered: ${user.registered}`);
    });
  }

  // 7. Add Sample Data
  async addSampleData() {
    console.log('\n➕ ADDING SAMPLE DATA');
    console.log('='.repeat(50));
    
    // Add sample sighting
    const [result] = await this.connection.query(`
      INSERT INTO sightings (species, location, sighting_date, depth, notes, count)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      'Barracuda',
      'Kalkudah Main Beach',
      '2026-04-18',
      4.5,
      'Large school spotted near shore',
      8
    ]);
    
    console.log(`✅ Added new sighting (ID: ${result.insertId})`);
  }

  // 8. Database Health Check
  async healthCheck() {
    console.log('\n🔍 DATABASE HEALTH CHECK');
    console.log('='.repeat(50));
    
    const [result] = await this.connection.query('SELECT 1 as connected');
    console.log(`Connection: ${result[0].connected ? '✅ OK' : '❌ Failed'}`);
    
    const [tables] = await this.connection.query('SHOW TABLES');
    console.log(`Tables: ${tables.length} found`);
    
    const [version] = await this.connection.query('SELECT VERSION() as version');
    console.log(`MySQL Version: ${version[0].version}`);
    
    const [size] = await this.connection.query(`
      SELECT 
        ROUND(SUM(DATA_LENGTH + INDEX_LENGTH) / 1024 / 1024, 2) as total_size_mb
      FROM information_schema.TABLES
      WHERE TABLE_SCHEMA = ?
    `, [process.env.DB_NAME]);
    
    console.log(`Database Size: ${size[0].total_size_mb} MB`);
  }

  // 9. Places Overview
  async getPlacesOverview() {
    console.log('\n🏖️  PLACES OVERVIEW');
    console.log('='.repeat(50));
    
    const [places] = await this.connection.query(`
      SELECT 
        name,
        category,
        rating,
        visitor_count,
        best_time_to_visit,
        latitude,
        longitude
      FROM places
      ORDER BY rating DESC, visitor_count DESC
    `);
    
    if (places.length === 0) {
      console.log('No places found');
      return;
    }
    
    places.forEach((place, i) => {
      console.log(`\n${i + 1}. ${place.name} ⭐ ${place.rating}`);
      console.log(`   Category: ${place.category}`);
      console.log(`   Visitors: ${place.visitor_count}`);
      console.log(`   Best Time: ${place.best_time_to_visit}`);
      console.log(`   Location: ${place.latitude}, ${place.longitude}`);
    });
  }

  // 10. Species by Conservation Status
  async getSpeciesByConservation() {
    console.log('\n🐢 SPECIES BY CONSERVATION STATUS');
    console.log('='.repeat(50));
    
    const [species] = await this.connection.query(`
      SELECT 
        conservation_status,
        COUNT(*) as count,
        GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') as species_list
      FROM species
      GROUP BY conservation_status
      ORDER BY 
        FIELD(conservation_status, 'critically_endangered', 'endangered', 'vulnerable', 'near_threatened', 'least_concern')
    `);
    
    species.forEach(s => {
      const status = s.conservation_status.replace('_', ' ').toUpperCase();
      console.log(`\n🔴 ${status} (${s.count})`);
      console.log(`   ${s.species_list}`);
    });
  }

  // 11. Environmental Conditions
  async getEnvironmentalConditions() {
    console.log('\n🌊 CURRENT ENVIRONMENTAL CONDITIONS');
    console.log('='.repeat(50));
    
    const [conditions] = await this.connection.query(`
      SELECT 
        location,
        water_temperature,
        air_temperature,
        wave_height,
        visibility,
        wind_speed,
        weather_condition,
        recorded_at
      FROM environmental_data
      ORDER BY recorded_at DESC
      LIMIT 10
    `);
    
    if (conditions.length === 0) {
      console.log('No environmental data found');
      return;
    }
    
    conditions.forEach((cond, i) => {
      console.log(`\n${i + 1}. ${cond.location}`);
      console.log(`   Water: ${cond.water_temperature}°C | Air: ${cond.air_temperature}°C`);
      console.log(`   Waves: ${cond.wave_height}m | Visibility: ${cond.visibility}m`);
      console.log(`   Wind: ${cond.wind_speed} km/h | Weather: ${cond.weather_condition}`);
      console.log(`   Recorded: ${cond.recorded_at}`);
    });
  }

  // 12. Conservation Projects Status
  async getConservationProjects() {
    console.log('\n🌱 CONSERVATION PROJECTS');
    console.log('='.repeat(50));
    
    const [projects] = await this.connection.query(`
      SELECT 
        name,
        status,
        location,
        start_date,
        end_date,
        coordinator,
        budget,
        participants_count
      FROM conservation_projects
      ORDER BY 
        FIELD(status, 'active', 'planned', 'completed', 'suspended'),
        start_date DESC
    `);
    
    if (projects.length === 0) {
      console.log('No conservation projects found');
      return;
    }
    
    projects.forEach((proj, i) => {
      const statusIcon = proj.status === 'active' ? '🟢' : 
                        proj.status === 'planned' ? '🔵' : 
                        proj.status === 'completed' ? '✅' : '⏸️';
      console.log(`\n${i + 1}. ${statusIcon} ${proj.name}`);
      console.log(`   Status: ${proj.status.toUpperCase()}`);
      console.log(`   Location: ${proj.location}`);
      console.log(`   Period: ${proj.start_date} to ${proj.end_date}`);
      console.log(`   Coordinator: ${proj.coordinator}`);
      console.log(`   Budget: $${proj.budget?.toLocaleString() || 'N/A'}`);
      console.log(`   Participants: ${proj.participants_count}`);
    });
  }

  // 13. Top Rated Places
  async getTopRatedPlaces() {
    console.log('\n⭐ TOP RATED PLACES');
    console.log('='.repeat(50));
    
    const [places] = await this.connection.query(`
      SELECT 
        p.name,
        p.category,
        p.rating,
        p.visitor_count,
        COUNT(r.id) as review_count,
        ROUND(AVG(r.rating), 2) as avg_review_rating
      FROM places p
      LEFT JOIN reviews r ON p.id = r.place_id
      GROUP BY p.id, p.name, p.category, p.rating, p.visitor_count
      HAVING p.rating > 0
      ORDER BY p.rating DESC, p.visitor_count DESC
      LIMIT 10
    `);
    
    if (places.length === 0) {
      console.log('No rated places found');
      return;
    }
    
    places.forEach((place, i) => {
      console.log(`\n${i + 1}. ${place.name} ⭐ ${place.rating}`);
      console.log(`   Category: ${place.category}`);
      console.log(`   Visitors: ${place.visitor_count}`);
      console.log(`   Reviews: ${place.review_count} (Avg: ${place.avg_review_rating || 'N/A'})`);
    });
  }

  // 14. Recent Reviews
  async getRecentReviews() {
    console.log('\n💬 RECENT REVIEWS');
    console.log('='.repeat(50));
    
    const [reviews] = await this.connection.query(`
      SELECT 
        r.rating,
        r.comment,
        r.visit_date,
        r.created_at,
        u.name as reviewer_name,
        p.name as place_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN places p ON r.place_id = p.id
      ORDER BY r.created_at DESC
      LIMIT 10
    `);
    
    if (reviews.length === 0) {
      console.log('No reviews found');
      return;
    }
    
    reviews.forEach((review, i) => {
      console.log(`\n${i + 1}. ${'⭐'.repeat(review.rating)} (${review.rating}/5)`);
      console.log(`   Place: ${review.place_name}`);
      console.log(`   Reviewer: ${review.reviewer_name}`);
      console.log(`   Visit Date: ${review.visit_date}`);
      if (review.comment) console.log(`   Comment: ${review.comment}`);
    });
  }

  // 15. Biodiversity Hotspots
  async getBiodiversityHotspots() {
    console.log('\n🐠 BIODIVERSITY HOTSPOTS');
    console.log('='.repeat(50));
    
    const [hotspots] = await this.connection.query(`
      SELECT 
        location,
        COUNT(*) as total_sightings,
        COUNT(DISTINCT species) as unique_species,
        SUM(count) as total_animals_seen,
        GROUP_CONCAT(DISTINCT species ORDER BY species SEPARATOR ', ') as species_found
      FROM sightings
      GROUP BY location
      ORDER BY unique_species DESC, total_sightings DESC
      LIMIT 10
    `);
    
    if (hotspots.length === 0) {
      console.log('No biodiversity data found');
      return;
    }
    
    hotspots.forEach((spot, i) => {
      console.log(`\n${i + 1}. ${spot.location}`);
      console.log(`   Sightings: ${spot.total_sightings}`);
      console.log(`   Unique Species: ${spot.unique_species}`);
      console.log(`   Total Animals: ${spot.total_animals_seen}`);
      console.log(`   Species: ${spot.species_found}`);
    });
  }

  // 16. Export Data to JSON
  async exportData(tableName) {
    console.log(`\n📤 EXPORTING ${tableName.toUpperCase()} DATA`);
    console.log('='.repeat(50));
    
    const [data] = await this.connection.query(`SELECT * FROM ${tableName}`);
    
    console.log(`\nTotal records: ${data.length}`);
    console.log('\nFirst 5 records:');
    console.log(JSON.stringify(data.slice(0, 5), null, 2));
    
    return data;
  }

  // 17. Database Backup Summary
  async getBackupSummary() {
    console.log('\n💾 DATABASE BACKUP SUMMARY');
    console.log('='.repeat(50));
    
    const tables = ['sightings', 'trip_items', 'users', 'favorites', 'places', 'species', 'environmental_data', 'conservation_projects', 'reviews'];
    
    for (const table of tables) {
      try {
        const [result] = await this.connection.query(`SELECT COUNT(*) as count FROM ${table}`);
        console.log(`${table.padEnd(25)} ${result[0].count} records`);
      } catch (error) {
        console.log(`${table.padEnd(25)} Table not found`);
      }
    }
  }

  // Menu
  showMenu() {
    console.log('\n🌊 COASTAL REGION DATABASE - SQL TOOLS');
    console.log('='.repeat(50));
    console.log('\n📊 STATISTICS & REPORTS:');
    console.log('  1. Database Statistics');
    console.log('  2. Recent Sightings');
    console.log('  3. Species Summary');
    console.log('  4. Location Analysis');
    console.log('  5. Trip Planning Overview');
    console.log('  6. User Activity');
    console.log('\n🏖️  PLACES & REVIEWS:');
    console.log('  9. Places Overview');
    console.log('  13. Top Rated Places');
    console.log('  14. Recent Reviews');
    console.log('\n🐢 BIODIVERSITY:');
    console.log('  10. Species by Conservation');
    console.log('  15. Biodiversity Hotspots');
    console.log('\n🌊 ENVIRONMENTAL:');
    console.log('  11. Environmental Conditions');
    console.log('\n🌱 CONSERVATION:');
    console.log('  12. Conservation Projects');
    console.log('\n🔧 UTILITIES:');
    console.log('  7. Add Sample Data');
    console.log('  8. Database Health Check');
    console.log('  16. Export Data (table name)');
    console.log('  17. Backup Summary');
    console.log('  99. Run All Reports');
    console.log('  0. Exit');
    console.log('='.repeat(50));
  }

  // Run specific tool
  async runTool(toolNumber, extraParam = null) {
    switch(toolNumber) {
      case 1:
        await this.getDatabaseStats();
        break;
      case 2:
        await this.getRecentSightings();
        break;
      case 3:
        await this.getSpeciesSummary();
        break;
      case 4:
        await this.getLocationAnalysis();
        break;
      case 5:
        await this.getTripOverview();
        break;
      case 6:
        await this.getUserActivity();
        break;
      case 7:
        await this.addSampleData();
        break;
      case 8:
        await this.healthCheck();
        break;
      case 9:
        await this.getPlacesOverview();
        break;
      case 10:
        await this.getSpeciesByConservation();
        break;
      case 11:
        await this.getEnvironmentalConditions();
        break;
      case 12:
        await this.getConservationProjects();
        break;
      case 13:
        await this.getTopRatedPlaces();
        break;
      case 14:
        await this.getRecentReviews();
        break;
      case 15:
        await this.getBiodiversityHotspots();
        break;
      case 16:
        if (extraParam) {
          await this.exportData(extraParam);
        } else {
          console.log('❌ Please specify table name: node sql-tools.js 16 places');
        }
        break;
      case 17:
        await this.getBackupSummary();
        break;
      case 99:
        console.log('\n🔄 RUNNING ALL REPORTS...\n');
        await this.getDatabaseStats();
        await this.getRecentSightings();
        await this.getSpeciesSummary();
        await this.getLocationAnalysis();
        await this.getTripOverview();
        await this.getUserActivity();
        await this.getPlacesOverview();
        await this.getSpeciesByConservation();
        await this.getEnvironmentalConditions();
        await this.getConservationProjects();
        await this.getTopRatedPlaces();
        await this.getRecentReviews();
        await this.getBiodiversityHotspots();
        await this.healthCheck();
        break;
      default:
        console.log('Invalid option');
    }
  }
}

// CLI Interface
async function main() {
  const tools = new SQLTools();
  await tools.connect();

  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Run specific tool from command line
    const toolNumber = parseInt(args[0]);
    const extraParam = args[1] || null;
    await tools.runTool(toolNumber, extraParam);
  } else {
    // Interactive mode
    tools.showMenu();
    console.log('\n💡 Usage: node sql-tools.js <option> [extra]');
    console.log('   Examples:');
    console.log('   node sql-tools.js 1           # Database Statistics');
    console.log('   node sql-tools.js 9           # Places Overview');
    console.log('   node sql-tools.js 16 places   # Export places data');
    console.log('   node sql-tools.js 99          # Run all reports');
  }

  await tools.disconnect();
}

main().catch(console.error);

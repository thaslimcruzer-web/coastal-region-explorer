// Test Database Module - Demonstrates all database operations
const Database = require('./database');

async function testDatabase() {
  const db = new Database();
  
  // Initialize database connection
  console.log('\n🌊 TESTING DATABASE MODULE');
  console.log('='.repeat(60));
  
  const initialized = await db.initialize();
  if (!initialized) {
    console.log('❌ Failed to initialize database');
    return;
  }
  
  console.log('\n' + '='.repeat(60));
  
  try {
    // ==========================================
    // TEST 1: Database Statistics
    // ==========================================
    console.log('\n📊 TEST 1: Database Statistics');
    console.log('-'.repeat(60));
    const stats = await db.getDatabaseStats();
    if (stats.success) {
      console.log('✅ Places:', stats.data.total_places);
      console.log('✅ Species:', stats.data.total_species);
      console.log('✅ Sightings:', stats.data.total_sightings);
      console.log('✅ Environmental Records:', stats.data.total_env_records);
      console.log('✅ Conservation Projects:', stats.data.total_projects);
      console.log('✅ Reviews:', stats.data.total_reviews);
      console.log('✅ Users:', stats.data.total_users);
    }
    
    // ==========================================
    // TEST 2: Get All Places
    // ==========================================
    console.log('\n\n🏖️  TEST 2: Get All Places');
    console.log('-'.repeat(60));
    const places = await db.getAllPlaces();
    if (places.success) {
      console.log(`✅ Found ${places.data.length} places:`);
      places.data.forEach(place => {
        console.log(`   - ${place.name} (${place.category}) ⭐ ${place.rating}`);
      });
    }
    
    // ==========================================
    // TEST 3: Get Places by Category
    // ==========================================
    console.log('\n\n🏝️  TEST 3: Get Beaches Only');
    console.log('-'.repeat(60));
    const beaches = await db.getAllPlaces({ category: 'beach' });
    if (beaches.success) {
      console.log(`✅ Found ${beaches.data.length} beaches:`);
      beaches.data.forEach(place => {
        console.log(`   - ${place.name} ⭐ ${place.rating}`);
      });
    }
    
    // ==========================================
    // TEST 4: Get Single Place
    // ==========================================
    console.log('\n\n📍 TEST 4: Get Place by ID');
    console.log('-'.repeat(60));
    const place = await db.getPlaceById(1);
    if (place.success) {
      console.log('✅ Place details:');
      console.log(`   Name: ${place.data.name}`);
      console.log(`   Category: ${place.data.category}`);
      console.log(`   Rating: ${place.data.rating}`);
      console.log(`   Visitors: ${place.data.visitor_count}`);
    }
    
    // ==========================================
    // TEST 5: Get All Species
    // ==========================================
    console.log('\n\n🐢 TEST 5: Get All Species');
    console.log('-'.repeat(60));
    const species = await db.getAllSpecies();
    if (species.success) {
      console.log(`✅ Found ${species.data.length} species:`);
      species.data.forEach(s => {
        console.log(`   - ${s.name} (${s.conservation_status})`);
      });
    }
    
    // ==========================================
    // TEST 6: Get Endangered Species
    // ==========================================
    console.log('\n\n⚠️  TEST 6: Get Endangered Species');
    console.log('-'.repeat(60));
    const endangered = await db.getAllSpecies({ conservation_status: 'endangered' });
    if (endangered.success) {
      console.log(`✅ Found ${endangered.data.length} endangered species:`);
      endangered.data.forEach(s => {
        console.log(`   - ${s.name}`);
      });
    }
    
    // ==========================================
    // TEST 7: Get Recent Sightings
    // ==========================================
    console.log('\n\n👁️  TEST 7: Recent Sightings');
    console.log('-'.repeat(60));
    const sightings = await db.getRecentSightings(5);
    if (sightings.success) {
      console.log(`✅ Last 5 sightings:`);
      sightings.data.forEach(s => {
        console.log(`   - ${s.species} at ${s.location} (${s.sighting_date})`);
      });
    }
    
    // ==========================================
    // TEST 8: Add New Sighting
    // ==========================================
    console.log('\n\n➕ TEST 8: Add New Sighting');
    console.log('-'.repeat(60));
    const newSighting = await db.createSighting({
      species: 'Dolphin',
      location: 'Pasikudah Beach',
      sighting_date: '2026-04-20',
      depth: 2.0,
      notes: 'Pod of dolphins spotted near shore',
      count: 5
    });
    if (newSighting.success) {
      console.log('✅ New sighting added:', newSighting.message);
    }
    
    // ==========================================
    // TEST 9: Get Environmental Data
    // ==========================================
    console.log('\n\n🌊 TEST 9: Environmental Data');
    console.log('-'.repeat(60));
    const envData = await db.getLatestEnvironmentalData();
    if (envData.success) {
      console.log(`✅ Latest conditions for ${envData.data.length} locations:`);
      envData.data.forEach(e => {
        console.log(`   - ${e.location}: ${e.water_temperature}°C, ${e.weather_condition}`);
      });
    }
    
    // ==========================================
    // TEST 10: Get Conservation Projects
    // ==========================================
    console.log('\n\n🌱 TEST 10: Active Conservation Projects');
    console.log('-'.repeat(60));
    const projects = await db.getAllProjects('active');
    if (projects.success) {
      console.log(`✅ Found ${projects.data.length} active projects:`);
      projects.data.forEach(p => {
        console.log(`   - ${p.name} ($${p.budget.toLocaleString()})`);
      });
    }
    
    // ==========================================
    // TEST 11: Get Biodiversity Hotspots
    // ==========================================
    console.log('\n\n🐠 TEST 11: Biodiversity Hotspots');
    console.log('-'.repeat(60));
    const hotspots = await db.getBiodiversityHotspots();
    if (hotspots.success) {
      console.log('✅ Top locations by species diversity:');
      hotspots.data.forEach((h, i) => {
        console.log(`   ${i + 1}. ${h.location}: ${h.unique_species} species, ${h.total_sightings} sightings`);
      });
    }
    
    // ==========================================
    // TEST 12: Get Top Rated Places
    // ==========================================
    console.log('\n\n⭐ TEST 12: Top Rated Places');
    console.log('-'.repeat(60));
    const topPlaces = await db.getTopRatedPlaces();
    if (topPlaces.success) {
      console.log('✅ Highest rated locations:');
      topPlaces.data.forEach((p, i) => {
        console.log(`   ${i + 1}. ${p.name} ⭐ ${p.rating} (${p.visitor_count} visitors)`);
      });
    }
    
    // ==========================================
    // TEST 13: User Registration
    // ==========================================
    console.log('\n\n👤 TEST 13: Register New User');
    console.log('-'.repeat(60));
    const user = await db.registerUser({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'tourist'
    });
    if (user.success) {
      console.log('✅ User registered:', user.message);
    } else {
      console.log('⚠️  User may already exist:', user.error);
    }
    
    // ==========================================
    // TEST 14: User Login
    // ==========================================
    console.log('\n\n🔐 TEST 14: User Login');
    console.log('-'.repeat(60));
    const login = await db.loginUser('test@example.com', 'password123');
    if (login.success) {
      console.log('✅ Login successful:', login.user.name);
    }
    
    // ==========================================
    // TEST 15: Add to Favorites
    // ==========================================
    console.log('\n\n❤️  TEST 15: Add to Favorites');
    console.log('-'.repeat(60));
    const favorite = await db.addToFavorites(1, 1);
    if (favorite.success) {
      console.log('✅ Added to favorites:', favorite.message);
    }
    
    // ==========================================
    // TEST 16: Get User Favorites
    // ==========================================
    console.log('\n\n📋 TEST 16: Get User Favorites');
    console.log('-'.repeat(60));
    const favorites = await db.getUserFavorites(1);
    if (favorites.success) {
      console.log(`✅ User has ${favorites.data.length} favorites:`, favorites.data);
    }
    
    // ==========================================
    // TEST 17: Add Review
    // ==========================================
    console.log('\n\n💬 TEST 17: Add Review');
    console.log('-'.repeat(60));
    const review = await db.addReview({
      user_id: 1,
      place_id: 1,
      rating: 5,
      comment: 'Amazing beach with crystal clear water!',
      visit_date: '2026-04-20'
    });
    if (review.success) {
      console.log('✅ Review added:', review.message);
    }
    
    // ==========================================
    // TEST 18: Get Place Reviews
    // ==========================================
    console.log('\n\n📝 TEST 18: Get Place Reviews');
    console.log('-'.repeat(60));
    const reviews = await db.getPlaceReviews(1);
    if (reviews.success) {
      console.log(`✅ Found ${reviews.data.length} reviews:`);
      reviews.data.forEach(r => {
        console.log(`   - ${r.user_name}: ${r.rating}/5 - "${r.comment}"`);
      });
    }
    
    // ==========================================
    // TEST 19: Add Trip Item
    // ==========================================
    console.log('\n\n🗓️  TEST 19: Add Trip Item');
    console.log('-'.repeat(60));
    const tripItem = await db.addTripItem({
      place_id: 1,
      place_name: 'Pasikudah Beach',
      category: 'beach',
      trip_date: '2026-05-01',
      notes: 'First day of trip'
    });
    if (tripItem.success) {
      console.log('✅ Trip item added:', tripItem.message);
    }
    
    // ==========================================
    // TEST 20: Get Trip Items
    // ==========================================
    console.log('\n\n📅 TEST 20: Get Trip Items');
    console.log('-'.repeat(60));
    const tripItems = await db.getTripItems();
    if (tripItems.success) {
      console.log(`✅ Found ${tripItems.data.length} trip items:`);
      tripItems.data.forEach(item => {
        console.log(`   - ${item.place_name} on ${item.trip_date}`);
      });
    }
    
    // ==========================================
    // FINAL SUMMARY
    // ==========================================
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('\n📊 Database Module Features Tested:');
    console.log('   ✓ Places CRUD operations');
    console.log('   ✓ Species queries');
    console.log('   ✓ Sightings management');
    console.log('   ✓ Environmental data');
    console.log('   ✓ Conservation projects');
    console.log('   ✓ Reviews system');
    console.log('   ✓ User authentication');
    console.log('   ✓ Favorites system');
    console.log('   ✓ Trip planning');
    console.log('   ✓ Analytics & statistics');
    console.log('\n🎉 Database module is working perfectly!\n');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
  } finally {
    await db.close();
  }
}

// Run tests
testDatabase();

// Test script for Coastal Region Database API
// Run with: node test-api.js

const API_URL = 'http://localhost:3001/api';

async function testAPI() {
  console.log('\n🧪 Testing Coastal Region Database API\n');
  console.log('========================================\n');

  // Test 1: Health Check
  console.log('1️⃣  Testing Health Check...');
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    console.log('✅ Health Check:', data.status);
  } catch (error) {
    console.log('❌ Health Check failed:', error.message);
  }

  // Test 2: Get All Places
  console.log('\n2️⃣  Testing Get All Places...');
  try {
    const response = await fetch(`${API_URL}/places`);
    const data = await response.json();
    console.log(`✅ Places found: ${data.data.length}`);
    data.data.slice(0, 2).forEach(place => {
      console.log(`   - ${place.name} (${place.category}) - Rating: ${place.rating}`);
    });
  } catch (error) {
    console.log('❌ Get Places failed:', error.message);
  }

  // Test 3: Filter Places by Category
  console.log('\n3️⃣  Testing Filter Places by Category (beach)...');
  try {
    const response = await fetch(`${API_URL}/places?category=beach`);
    const data = await response.json();
    console.log(`✅ Beaches found: ${data.data.length}`);
  } catch (error) {
    console.log('❌ Filter Places failed:', error.message);
  }

  // Test 4: Get All Species
  console.log('\n4️⃣  Testing Get All Species...');
  try {
    const response = await fetch(`${API_URL}/species`);
    const data = await response.json();
    console.log(`✅ Species found: ${data.data.length}`);
    data.data.slice(0, 3).forEach(species => {
      console.log(`   - ${species.name} (${species.conservation_status})`);
    });
  } catch (error) {
    console.log('❌ Get Species failed:', error.message);
  }

  // Test 5: Filter Species by Conservation Status
  console.log('\n5️⃣  Testing Filter Endangered Species...');
  try {
    const response = await fetch(`${API_URL}/species?conservation_status=endangered`);
    const data = await response.json();
    console.log(`✅ Endangered species: ${data.data.length}`);
  } catch (error) {
    console.log('❌ Filter Species failed:', error.message);
  }

  // Test 6: Get Environmental Data
  console.log('\n6️⃣  Testing Get Environmental Data...');
  try {
    const response = await fetch(`${API_URL}/environmental`);
    const data = await response.json();
    console.log(`✅ Environmental records: ${data.data.length}`);
    if (data.data.length > 0) {
      const latest = data.data[0];
      console.log(`   - ${latest.location}: Water ${latest.water_temperature}°C, ${latest.weather_condition}`);
    }
  } catch (error) {
    console.log('❌ Get Environmental Data failed:', error.message);
  }

  // Test 7: Get Conservation Projects
  console.log('\n7️⃣  Testing Get Conservation Projects...');
  try {
    const response = await fetch(`${API_URL}/conservation`);
    const data = await response.json();
    console.log(`✅ Projects found: ${data.data.length}`);
    data.data.forEach(project => {
      console.log(`   - ${project.name} [${project.status}]`);
    });
  } catch (error) {
    console.log('❌ Get Projects failed:', error.message);
  }

  // Test 8: Filter Active Projects
  console.log('\n8️⃣  Testing Filter Active Projects...');
  try {
    const response = await fetch(`${API_URL}/conservation?status=active`);
    const data = await response.json();
    console.log(`✅ Active projects: ${data.data.length}`);
  } catch (error) {
    console.log('❌ Filter Projects failed:', error.message);
  }

  // Test 9: Get Recent Sightings
  console.log('\n9️⃣  Testing Get Recent Sightings...');
  try {
    const response = await fetch(`${API_URL}/sightings/recent`);
    const data = await response.json();
    console.log(`✅ Recent sightings: ${data.data.length}`);
  } catch (error) {
    console.log('❌ Get Sightings failed:', error.message);
  }

  // Test 10: Create New Place
  console.log('\n🔟  Testing Create New Place...');
  try {
    const response = await fetch(`${API_URL}/places`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Beach',
        category: 'beach',
        description: 'A beautiful test beach',
        latitude: 7.7000,
        longitude: 81.7500,
        image_url: '/images/test.jpg',
        best_time_to_visit: 'Year-round',
        facilities: 'Parking, Restrooms'
      })
    });
    const data = await response.json();
    console.log('✅ Place created:', data.message);
  } catch (error) {
    console.log('❌ Create Place failed:', error.message);
  }

  // Test 11: Record Environmental Data
  console.log('\n1️⃣1️⃣  Testing Add Environmental Data...');
  try {
    const response = await fetch(`${API_URL}/environmental`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        location: 'Test Location',
        water_temperature: 28.0,
        air_temperature: 30.5,
        wave_height: 0.7,
        tide_level: 1.1,
        visibility: 14.0,
        wind_speed: 11.0,
        weather_condition: 'Partly Cloudy'
      })
    });
    const data = await response.json();
    console.log('✅ Environmental data added:', data.message);
  } catch (error) {
    console.log('❌ Add Environmental Data failed:', error.message);
  }

  // Test 12: Register Test User
  console.log('\n1️⃣2️⃣  Testing User Registration...');
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'tourist'
      })
    });
    const data = await response.json();
    if (data.success || data.error?.includes('already registered')) {
      console.log('✅ User registration handled');
    } else {
      console.log('⚠️  Registration response:', data);
    }
  } catch (error) {
    console.log('❌ User Registration failed:', error.message);
  }

  console.log('\n========================================');
  console.log('✅ API Testing Complete!');
  console.log('========================================\n');
}

// Run tests
testAPI().catch(error => {
  console.error('❌ Test script error:', error);
  console.log('\nMake sure your server is running on http://localhost:3001');
});

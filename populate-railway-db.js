// Script to populate Railway database with sample data
const API_URL = 'https://coastal-explorer-production.up.railway.app/api';

async function populateDatabase() {
  console.log('🚀 Starting to populate database...\n');

  // 1. Add Places
  console.log('📍 Adding Places...');
  const places = [
    {
      name: 'Pasikudah Beach',
      category: 'Beach',
      description: 'Beautiful bay with calm waters and white sand',
      latitude: 7.9167,
      longitude: 81.8167,
      best_time_to_visit: 'November to April',
      facilities: 'Parking, Restrooms, Restaurants, Water Sports'
    },
    {
      name: 'Kalkudah Beach',
      category: 'Beach',
      description: 'Pristine beach perfect for swimming',
      latitude: 7.9333,
      longitude: 81.8333,
      best_time_to_visit: 'November to April',
      facilities: 'Parking, Restrooms, Beach Chairs'
    },
    {
      name: 'Valaichcheni Harbor',
      category: 'Harbor',
      description: 'Fishing harbor with fresh seafood',
      latitude: 7.9500,
      longitude: 81.8500,
      best_time_to_visit: 'Year-round',
      facilities: 'Parking, Fish Market, Restaurants'
    },
    {
      name: 'Pasikudah Lagoon',
      category: 'Lagoon',
      description: 'Shallow lagoon ideal for water sports',
      latitude: 7.9200,
      longitude: 81.8200,
      best_time_to_visit: 'November to April',
      facilities: 'Water Sports Equipment, Parking'
    }
  ];

  for (const place of places) {
    try {
      const response = await fetch(`${API_URL}/places`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(place)
      });
      const result = await response.json();
      console.log(`✅ Added: ${place.name}`);
    } catch (error) {
      console.log(`❌ Failed to add ${place.name}: ${error.message}`);
    }
  }

  // 2. Add Species
  console.log('\n🐠 Adding Species...');
  const species = [
    {
      name: 'Green Sea Turtle',
      scientific_name: 'Chelonia mydas',
      category: 'turtle',
      conservation_status: 'endangered',
      description: 'Commonly spotted in coastal waters',
      habitat: 'Coastal waters, coral reefs',
      diet: 'Seagrass, algae',
      size_range: '80-150 cm'
    },
    {
      name: 'Clownfish',
      scientific_name: 'Amphiprioninae',
      category: 'fish',
      conservation_status: 'least_concern',
      description: 'Colorful fish found in coral reefs',
      habitat: 'Coral reefs, anemones',
      diet: 'Algae, zooplankton',
      size_range: '10-18 cm'
    },
    {
      name: 'Parrotfish',
      scientific_name: 'Scaridae',
      category: 'fish',
      conservation_status: 'least_concern',
      description: 'Important for coral reef health',
      habitat: 'Coral reefs',
      diet: 'Algae, coral',
      size_range: '30-120 cm'
    },
    {
      name: 'Barracuda',
      scientific_name: 'Sphyraena',
      category: 'fish',
      conservation_status: 'least_concern',
      description: 'Large predatory fish',
      habitat: 'Open waters, reefs',
      diet: 'Fish, squid',
      size_range: '50-200 cm'
    }
  ];

  for (const sp of species) {
    try {
      const response = await fetch(`${API_URL}/species`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sp)
      });
      const result = await response.json();
      console.log(`✅ Added: ${sp.name}`);
    } catch (error) {
      console.log(`❌ Failed to add ${sp.name}: ${error.message}`);
    }
  }

  // 3. Add Environmental Data
  console.log('\n🌊 Adding Environmental Data...');
  const environmentalData = [
    {
      location: 'Pasikudah',
      water_temperature: 28.5,
      air_temperature: 30.2,
      wind_speed: 12.3,
      wave_height: 1.2,
      visibility: 15.5,
      weather_condition: 'Sunny'
    },
    {
      location: 'Kalkudah',
      water_temperature: 28.3,
      air_temperature: 30.0,
      wind_speed: 11.8,
      wave_height: 1.1,
      visibility: 16.0,
      weather_condition: 'Partly Cloudy'
    }
  ];

  for (const data of environmentalData) {
    try {
      const response = await fetch(`${API_URL}/environmental`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      console.log(`✅ Added: ${data.location} environmental data`);
    } catch (error) {
      console.log(`❌ Failed to add ${data.location}: ${error.message}`);
    }
  }

  // 4. Add Conservation Projects
  console.log('\n🌿 Adding Conservation Projects...');
  const projects = [
    {
      name: 'Coral Reef Restoration',
      description: 'Restoring damaged coral reefs in Pasikudah bay',
      location: 'Pasikudah',
      start_date: '2024-01-15',
      end_date: '2025-12-31',
      status: 'active',
      coordinator: 'Marine Conservation Team',
      contact_email: 'coral@conservation.org',
      budget: 50000.00
    },
    {
      name: 'Sea Turtle Protection',
      description: 'Protecting nesting sites and monitoring turtle populations',
      location: 'Kalkudah',
      start_date: '2024-03-01',
      end_date: '2025-02-28',
      status: 'active',
      coordinator: 'Wildlife Protection Unit',
      contact_email: 'turtles@conservation.org',
      budget: 35000.00
    }
  ];

  for (const project of projects) {
    try {
      const response = await fetch(`${API_URL}/conservation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      const result = await response.json();
      console.log(`✅ Added: ${project.name}`);
    } catch (error) {
      console.log(`❌ Failed to add ${project.name}: ${error.message}`);
    }
  }

  console.log('\n✅ Database population complete!');
  console.log('\n🔗 Check your live site:');
  console.log('   https://coastal-explorer-production.up.railway.app');
}

populateDatabase().catch(console.error);

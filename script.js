/* =====================================================
   Coastal Region | Pasikudah & Kalkudah Explorer
   Full Application Script
   ITE2953 Project — E2320477
   ===================================================== */

'use strict';

// -------------------------------------------------------
// DATA STORE
// -------------------------------------------------------
const PLACES_DATA = [
  // --- Beaches ---
  {
    id: 1, name: 'Pasikudah Main Lagoon', category: 'beach',
    desc: 'A vast, shallow turquoise lagoon stretching nearly 2 km. The calm shallow waters make it ideal for wading, swimming, and non-motorised water sports.',
    rating: 4.9, reviews: 1284, price: 0, priceLabel: 'Free Entry',
    location: 'Pasikudah', lat: 7.9278, lng: 81.5579,
    tags: ['Swimming', 'Snorkeling', 'Sunset'],
    image: 'images/pasikudah main Lagoon.jpeg',
    openHours: 'Open 24 hrs', distance: 0.2, featured: true,
    highlights: ['Crystal clear water', 'Shallow lagoon', 'Safe for children'],
  },
  {
    id: 2, name: 'Kalkudah Beach', category: 'beach',
    desc: 'A pristine palm-fringed arc of white sand, quieter and more secluded than Pasikudah. Excellent for snorkeling and relaxation.',
    rating: 4.8, reviews: 967, price: 0, priceLabel: 'Free Entry',
    location: 'Kalkudah', lat: 7.9504, lng: 81.5604,
    tags: ['Snorkeling', 'Relaxation', 'Photography'],
    image: 'images/kalkudah beach.jpeg',
    openHours: 'Open 24 hrs', distance: 3.1, featured: true,
    highlights: ['Pristine white sand', 'Coral reefs nearby', 'Palm-fringed shore'],
  },
  {
    id: 44, name: 'Pasikudah Bay', category: 'beach',
    desc: 'A spectacular bay with crystal-clear turquoise waters and powdery white sand. The sheltered bay offers perfect conditions for swimming, kayaking, and stand-up paddleboarding with stunning panoramic views.',
    rating: 4.9, reviews: 1456, price: 0, priceLabel: 'Free Entry',
    location: 'Pasikudah Bay', lat: 7.9290, lng: 81.5590,
    tags: ['Swimming', 'Kayaking', 'Bay Views', 'Photography'],
    image: 'images/pasikudah bay.jpg',
    openHours: 'Open 24 hrs', distance: 0.5, featured: true,
    highlights: ['Sheltered bay waters', 'Panoramic ocean views', 'Perfect for water sports'],
  },
  {
    id: 45, name: 'Elephant Rock', category: 'beach',
    desc: 'A dramatic coastal formation resembling an elephant drinking from the sea. This iconic landmark offers unique photo opportunities, rocky tide pools, and excellent snorkeling around the rock formations.',
    rating: 4.7, reviews: 823, price: 0, priceLabel: 'Free Entry',
    location: 'Kalkudah', lat: 7.9520, lng: 81.5625,
    tags: ['Rock Formation', 'Photography', 'Snorkeling', 'Tide Pools'],
    image: 'images/elephant-rock-elephant.jpg',
    openHours: 'Open 24 hrs', distance: 3.8, featured: true,
    highlights: ['Iconic elephant-shaped rock', 'Natural tide pools', 'Excellent snorkeling spots'],
  },
  {
    id: 3, name: 'Passikudam North Reef', category: 'beach',
    desc: 'A hidden northern stretch with rocky outcrops teeming with marine life, beloved by snorkelers and free-divers.',
    rating: 4.7, reviews: 412, price: 0, priceLabel: 'Free Entry',
    location: 'Pasikudah North', lat: 7.9360, lng: 81.5599,
    tags: ['Snorkeling', 'Freediving', 'Marine Life'],
    image: 'images/passikudam north reef.webp',
    openHours: 'Open 24 hrs', distance: 1.8, featured: false,
    highlights: ['Rocky outcrops', 'Rich marine life', 'Fewer crowds'],
  },

  // --- Local Highlights ---
  {
    id: 54, name: 'Valaichenai Public Ground', category: 'activity',
    desc: 'A spacious community ground hosting local events, sports, and cultural festivals. A great place to experience local community life and weekend activities.',
    rating: 4.4, reviews: 267, price: 0, priceLabel: 'Free Entry',
    location: 'Valaichenai', lat: 7.9080, lng: 81.5430,
    tags: ['Community', 'Events', 'Sports', 'Local Life'],
    image: 'images/valaichenai public ground.jpeg',
    openHours: '6:00 AM – 9:00 PM', distance: 3.2, featured: false,
    highlights: ['Local sports events', 'Cultural festivals', 'Community gatherings'],
  },
  {
    id: 55, name: 'Oddamavadi Mosque', category: 'activity',
    desc: 'A historic mosque with beautiful architecture in the Oddamavadi area. An important cultural and religious site showcasing Islamic heritage in the region.',
    rating: 4.7, reviews: 312, price: 0, priceLabel: 'Free Entry',
    location: 'Oddamavadi', lat: 7.9400, lng: 81.5500,
    tags: ['Cultural', 'Historical', 'Architecture', 'Religious'],
    image: 'images/oddamavadi mosque.jpeg',
    openHours: 'Open during prayer times', distance: 1.8, featured: false,
    highlights: ['Historic Islamic architecture', 'Cultural significance', 'Peaceful atmosphere'],
  },
  {
    id: 56, name: 'Valaichenai Harbor', category: 'activity',
    desc: 'A bustling fishing harbor where you can watch traditional fishing boats return with fresh catches. Experience the daily rhythm of coastal fishing life.',
    rating: 4.5, reviews: 389, price: 0, priceLabel: 'Free Entry',
    location: 'Valaichenai', lat: 7.9120, lng: 81.5480,
    tags: ['Fishing', 'Harbor', 'Local Life', 'Photography'],
    image: 'images/valaichenai harbor.jpeg',
    openHours: '5:00 AM – 6:00 PM', distance: 3.0, featured: true,
    highlights: ['Active fishing harbor', 'Fresh daily catch', 'Boat watching'],
  },
  {
    id: 57, name: 'Pondukalchenai', category: 'activity',
    desc: 'A scenic coastal village known for its traditional lifestyle, paddy fields, and authentic rural Sri Lankan culture. Perfect for cultural immersion.',
    rating: 4.6, reviews: 234, price: 0, priceLabel: 'Free Entry',
    location: 'Pondukalchenai', lat: 7.9200, lng: 81.5400,
    tags: ['Village', 'Cultural', 'Rural Life', 'Scenic'],
    image: 'images/pondukalchenai.jpeg',
    openHours: 'Open 24 hrs', distance: 2.2, featured: false,
    highlights: ['Traditional village life', 'Paddy field landscapes', 'Authentic local culture'],
  },
  {
    id: 58, name: 'Kayankerni', category: 'activity',
    desc: 'A picturesque coastal area with lagoons and wetlands. Rich in biodiversity and bird life, offering nature walks and birdwatching opportunities.',
    rating: 4.7, reviews: 298, price: 0, priceLabel: 'Free Entry',
    location: 'Kayankerni', lat: 7.8950, lng: 81.5350,
    tags: ['Nature', 'Birdwatching', 'Wetlands', 'Photography'],
    image: 'images/kayankerni.jpeg',
    openHours: '6:00 AM – 6:00 PM', distance: 4.5, featured: false,
    highlights: ['Wetland ecosystem', 'Diverse bird species', 'Nature photography'],
  },
  {
    id: 59, name: 'Local Seafood Market', category: 'restaurant',
    desc: 'A vibrant local market where fishermen sell their fresh daily catch. Buy seafood directly, watch the auction, and experience authentic coastal commerce.',
    rating: 4.8, reviews: 567, price: 0, priceLabel: 'Free Entry',
    location: 'Pasikudah', lat: 7.9285, lng: 81.5575,
    tags: ['Seafood', 'Market', 'Local Experience', 'Fresh Catch'],
    image: 'images/local seafood market.jpeg',
    openHours: '5:00 AM – 12:00 PM', distance: 0.5, featured: true,
    highlights: ['Fresh daily catch', 'Local fish auction', 'Direct from fishermen'],
  },

  // --- Activities ---
  {
    id: 19, name: 'Coastal Cycling Tour', category: 'activity',
    desc: 'Guided bicycle tour along the coastal road from Pasikudah to Kalkudah. Pass through fishing villages, paddy fields, and palm-lined lanes.',
    rating: 4.6, reviews: 178, price: 2000, priceLabel: 'LKR 2,000/person',
    location: 'Pasikudah', lat: 7.9290, lng: 81.5575,
    tags: ['Cycling', 'Guided Tour', 'Coastal Views'],
    image: 'images/Coastal cycling tour.jpg',
    openHours: '6:00 AM – 10:00 AM', distance: 0.4, featured: false,
    highlights: ['Village scenery', 'Bike & helmet provided', 'Morning breeze ride'],
  },
  // --- Hotels ---
  {
    id: 8, name: 'Amaya Beach Resort', category: 'hotel',
    desc: 'A luxury beachfront resort with stunning lagoon views, multiple pools, spa facilities, and direct beach access. Perfect for a premium stay.',
    rating: 4.8, reviews: 1102, price: 25000, priceLabel: 'LKR 25,000/night',
    location: 'Pasikudah', lat: 7.9276, lng: 81.5580,
    tags: ['Luxury', 'Beachfront', 'Pool', 'Spa'],
    image: 'images/amaya beach resort.webp',
    openHours: 'Check-in: 2 PM', distance: 0.1, featured: true,
    highlights: ['Direct lagoon access', 'Infinity pool', 'In-house diving school'],
  },
  {
    id: 22, name: 'Maalu Maalu Resort & Spa', category: 'hotel',
    desc: 'An award-winning luxury resort set along Pasikudah beach with private villas, an ayurvedic spa, and multiple dining venues overlooking the ocean.',
    rating: 4.9, reviews: 876, price: 32000, priceLabel: 'LKR 32,000/night',
    location: 'Pasikudah', lat: 7.9265, lng: 81.5585,
    tags: ['Luxury', 'Spa', 'Private Villas'],
    image: 'images/maalu-maalu-resort-spas.jpg',
    openHours: 'Check-in: 2 PM', distance: 0.3, featured: true,
    highlights: ['Private beach villas', 'Ayurvedic spa', 'Award-winning dining'],
  },
  // --- Marine ---
  {
    id: 14, name: 'Coral Restoration Project Site', category: 'marine',
    desc: 'An active coral gardening and restoration project. Join researcher-led snorkeling to see restored coral frames and learn about reef ecology.',
    rating: 4.8, reviews: 218, price: 3000, priceLabel: 'LKR 3,000/session',
    location: 'Pasikudah North', lat: 7.9355, lng: 81.5597,
    tags: ['Coral', 'Conservation', 'Research'],
    image: 'images/coral restoration project site.jpg',
    openHours: '8:00 AM – 12:00 PM', distance: 1.7, featured: false,
    highlights: ['Guided by researchers', 'Coral planting', 'Free-dive option'],
  },

  // Additional Dining
  {
    id: 40, name: 'Heritage Dining Hall', category: 'restaurant',
    desc: 'Traditional Sri Lankan cuisine served in a restored Dutch bungalow. Experience authentic flavors and colonial ambiance.',
    rating: 4.8, reviews: 523, price: 1400, priceLabel: 'Avg LKR 1,400/person',
    location: 'Batticaloa', lat: 7.7310, lng: 81.6990,
    tags: ['Traditional', 'Sri Lankan', 'Heritage'],
    image: 'images/heritage dining hall.jpg',
    openHours: '11:00 AM – 9:00 PM', distance: 22.2, featured: true,
    highlights: ['Dutch bungalow setting', 'Authentic Sri Lankan food', 'Colonial ambiance'],
  },

  // Additional Marine Life
];

const PLACE_DETAIL_CONTENT = {
  1: { bestFor: 'Families, gentle swimming, sunrise walks, water sports', bestTime: 'Early morning and late afternoon', duration: '2 to 4 hours', access: 'Public beach access with nearby resort frontage', extraTitle: 'Beach Details', extraItems: ['Very shallow lagoon shelf extending up to 50m offshore', 'Soft white sand underfoot - comfortable for barefoot walking', 'Low surf through most mornings making it perfect for children', 'Water temperature ranges from 27-29°C year-round', 'Lagoon depth typically 0.5-1.5m near shore'], tips: ['Bring reef-safe sunscreen for midday visits to protect coral.', 'Great starter beach if you are travelling with children.', 'Rent kayaks or paddleboards for lagoon exploration.', 'The water is warmest and calmest between 9 AM - 11 AM.'] },
  2: { bestFor: 'Quiet beach time, couples, snorkeling, relaxation', bestTime: 'Morning through sunset', duration: 'Half day', access: 'Roadside access with open beachfront sections', extraTitle: 'Beach Details', extraItems: ['Long uninterrupted shoreline stretching over 3 km', 'Quieter than main Pasikudah strip - fewer crowds', 'Strong photography spot at golden hour', 'Palm trees provide natural shade along sections', 'Coral reefs visible 100-200m from shore'], tips: ['Ideal if you want fewer crowds than Pasikudah.', 'Pair this stop with a sunset dinner nearby.', 'Best snorkeling is 150m offshore - swim or use provided boats.', 'Early morning offers calmest water and best visibility.'] },
  3: { bestFor: 'Snorkelers, free-divers, marine observers', bestTime: 'Calm mornings with clear water', duration: '1.5 to 3 hours', access: 'Short walk from the northern coastal stretch', extraTitle: 'Reef Notes', extraItems: ['Rock-and-coral mix creating diverse marine habitats', 'Better visibility in calmer weather - up to 10m', 'Best suited to confident swimmers', 'Rich biodiversity including tropical fish and corals', 'Depth ranges from 1-8m suitable for all skill levels'], tips: ['Water shoes help on rocky sections - protect your feet.', 'Avoid stepping on reef patches near shore - they are fragile.', 'Best visibility is in the morning before winds stir sediment.', 'Bring underwater camera - the marine life is spectacular.'] },
  19: { bestFor: 'Active travellers, photographers, culture seekers', bestTime: 'Early morning', duration: '2 to 3 hours', access: 'Guide meetup in central Pasikudah', extraTitle: 'Tour Details', extraItems: ['Bike and helmet provided', 'Fishing village route', 'Scenic coastal-road ride'], tips: ['Wear breathable clothing.', 'Morning departure avoids the stronger heat.'] },
  8: { bestFor: 'Luxury stays, honeymooners, premium beach breaks', bestTime: 'Year-round resort stay', duration: '1 to 3 nights', access: 'Direct beachfront resort access', extraTitle: 'Stay Features', extraItems: ['Multiple pools and spa access', 'Premium lagoon-front setting', 'Suitable for resort-based holidays'], tips: ['Best if you want an all-in-one stay.', 'Reserve earlier in peak season for best rooms.'] },
  22: { bestFor: 'Luxury travellers, wellness stays, couples', bestTime: 'Year-round', duration: '2 to 4 nights', access: 'Direct Pasikudah beachfront access', extraTitle: 'Stay Features', extraItems: ['Private villa feel', 'Ayurvedic wellness options', 'High-end dining on site'], tips: ['A stronger fit for resort-style relaxation than constant day trips.', 'Good choice if spa access matters.'] },
  14: { bestFor: 'Eco-tourists, researchers, reef learners', bestTime: 'Morning sessions', duration: '2 to 3 hours', access: 'Guided entry only', extraTitle: 'Marine Life Details', extraItems: ['Coral restoration frames', 'Research-led interpretation', 'Hands-on reef learning'], tips: ['This visit is strongest if you want purpose-driven tourism.', 'Follow no-touch reef rules at all times.'] },

  // Additional Beach Details
  44: { bestFor: 'Families, water sports enthusiasts, photographers, couples', bestTime: 'Morning to late afternoon', duration: '2 to 4 hours', access: 'Direct beachfront access from main road with parking', extraTitle: 'Beach Details', extraItems: ['Sheltered bay with exceptionally calm waters', 'Panoramic ocean views from elevated points', 'Perfect for kayaking, paddleboarding, and swimming'], tips: ['Best swimming conditions in the morning before winds pick up.', 'Bring a camera - the bay views are stunning at all times of day.'] },
  45: { bestFor: 'Photographers, snorkelers, nature lovers, adventurers', bestTime: 'Early morning or late afternoon', duration: '1.5 to 3 hours', access: 'Coastal path from Kalkudah main beach - 15 min walk', extraTitle: 'Beach Details', extraItems: ['Iconic elephant-shaped rock formation - local landmark', 'Natural tide pools at low tide with marine life', 'Excellent snorkeling around the rock formations'], tips: ['Visit during low tide for best tide pool exploration opportunities.', 'Be careful on wet rocky surfaces - wear water shoes.'] },
  54: { bestFor: 'Community experience, sports fans, event attendees', bestTime: 'Late afternoon and evenings', duration: '1 to 3 hours', access: 'Central Valaichenai location', extraTitle: 'Community Space', extraItems: ['Local cricket and football matches', 'Weekend cultural performances', 'Community festivals and celebrations'], tips: ['Visit during weekends for more activities.', 'Check local event schedules before visiting.'] },
  55: { bestFor: 'Cultural tourists, architecture enthusiasts, photographers', bestTime: 'Morning or late afternoon', duration: '30 minutes to 1 hour', access: 'Via Oddamavadi main road', extraTitle: 'Cultural Site', extraItems: ['Historic Islamic architecture', 'Important religious site for local community', 'Peaceful environment for reflection'], tips: ['Dress modestly when visiting.', 'Respect prayer times and avoid visiting during prayers.'] },
  56: { bestFor: 'Photographers, seafood lovers, cultural observers', bestTime: 'Early morning (5-8 AM) when boats return', duration: '1 to 2 hours', access: 'Harbor road in Valaichenai', extraTitle: 'Harbor Experience', extraItems: ['Watch fishing boats unload their catch', 'Buy fresh seafood directly from fishermen', 'Experience authentic fishing community life'], tips: ['Arrive early for the best action.', 'You can buy fresh seafood at great prices.'] },
  57: { bestFor: 'Cultural immersion, nature lovers, photographers', bestTime: 'Morning or late afternoon', duration: '1.5 to 3 hours', access: 'Village road access', extraTitle: 'Village Experience', extraItems: ['Traditional Sri Lankan village lifestyle', 'Scenic paddy field landscapes', 'Authentic rural culture'], tips: ['Respect local customs and traditions.', 'Great opportunity to photograph rural life.'] },
  58: { bestFor: 'Bird watchers, nature photographers, eco-tourists', bestTime: 'Early morning (6-9 AM) for best bird activity', duration: '2 to 3 hours', access: 'Coastal road to Kayankerni', extraTitle: 'Nature Experience', extraItems: ['Diverse wetland ecosystem', 'Over 50 bird species recorded', 'Peaceful nature walks'], tips: ['Bring binoculars for bird watching.', 'Wear comfortable walking shoes.'] },
  59: { bestFor: 'Seafood lovers, foodies, cultural experience seekers', bestTime: 'Early morning (5-9 AM) for freshest catch', duration: '30 minutes to 1.5 hours', access: 'Near Pasikudah beach road', extraTitle: 'Market Experience', extraItems: ['Daily fresh catch from local fishermen', 'Traditional fish auction process', 'Wide variety of seafood available'], tips: ['Cash only - no card payments.', 'Visit early for best selection.'] },

  // Additional Activity Details

  // Additional Dining Details
  40: { bestFor: 'Culture seekers, food historians, groups', bestTime: 'Lunch and dinner', duration: '1.5 to 2 hours', access: 'Historic Batticaloa location', extraTitle: 'Dining Details', extraItems: ['Traditional Sri Lankan cuisine', 'Dutch bungalow setting', 'Authentic local flavors'], tips: ['Experience colonial dining ambiance.', 'Try traditional rice and curry.'] },

  // Additional Marine Life Details
  44: { bestFor: 'Families, water sports enthusiasts, photographers, couples', bestTime: 'Morning to late afternoon', duration: '2 to 4 hours', access: 'Direct beachfront access from main road', extraTitle: 'Beach Details', extraItems: ['Sheltered bay with calm waters', 'Panoramic ocean views', 'Perfect for kayaking and paddleboarding'], tips: ['Best swimming conditions in the morning.', 'Bring a camera for stunning bay views.'] },
  45: { bestFor: 'Photographers, snorkelers, nature lovers, adventurers', bestTime: 'Early morning or late afternoon', duration: '1.5 to 3 hours', access: 'Coastal path from Kalkudah main beach', extraTitle: 'Beach Details', extraItems: ['Iconic elephant-shaped rock formation', 'Natural tide pools at low tide', 'Excellent snorkeling around rocks'], tips: ['Visit during low tide for best tide pool exploration.', 'Be careful on rocky surfaces.'] },
};

const SPECIES_DATA = {
  fish: [
    { name: 'Parrotfish', scientific: 'Scaridae', desc: 'Vibrant blue-green fish that feed on coral polyps and sand', rarity: 'Common', color: '#00c8ff', image: 'images/parrot fish.jpg' },
    { name: 'Moorish Idol', scientific: 'Zanclus cornutus', desc: 'Distinctive black, white and yellow striped reef fish', rarity: 'Common', color: '#ffd700', image: 'images/moorish_idol fish.jpg' },
    { name: 'Lionfish', scientific: 'Pterois miles', desc: 'Beautifully striped but venomous predator — observe from afar', rarity: 'Occasional', color: '#ff6b6b', image: 'images/lion fish.JPG' },
    { name: 'Clownfish', scientific: 'Amphiprion bicinctus', desc: 'Orange-and-white fish living symbiotic with anemones', rarity: 'Common', color: '#ff8c00', image: 'images/clownfish.jpg' },
    { name: 'Barracuda', scientific: 'Sphyraena barracuda', desc: 'Sleek open-water predator often seen near reef edges', rarity: 'Occasional', color: '#7c8a99', image: 'images/Barracuda fish.jpg' },
  ],
  coral: [
    { name: 'Staghorn Coral', scientific: 'Acropora cervicornis', desc: 'Fast-growing branching coral, critical reef-builder', rarity: 'Common', color: '#b0e0e6', image: 'images/coral.jpg' },
    { name: 'Brain Coral', scientific: 'Diploria labyrinthiformis', desc: 'Massive rounded coral with characteristic groove pattern', rarity: 'Common', color: '#d2b48c', image: 'images/coral 2.jpg' },
    { name: 'Mushroom Coral', scientific: 'Fungiidae', desc: 'Solitary free-living coral that resembles a mushroom cap', rarity: 'Occasional', color: '#90ee90', image: 'images/Acanthastrea_coral.jpg' },
    { name: 'Table Coral', scientific: 'Acropora hyacinthus', desc: 'Flat plate-like formations providing shelter for reef fish', rarity: 'Common', color: '#87ceeb', image: 'images/Coral 1.webp' },
  ],
  turtle: [
    { name: 'Green Sea Turtle', scientific: 'Chelonia mydas', desc: 'The most commonly sighted turtle; feeds on seagrass', rarity: 'Common', color: '#3cb371', image: 'images/turtles 1.webp' },
    { name: 'Hawksbill Turtle', scientific: 'Eretmochelys imbricata', desc: 'Critically endangered; identified by narrow pointed beak', rarity: 'Rare', color: '#cd853f', image: 'images/turtles 2.jpg' },
    { name: 'Leatherback Turtle', scientific: 'Dermochelys coriacea', desc: 'World\'s largest turtle; rare offshore visitor', rarity: 'Very Rare', color: '#696969', image: 'images/turtles 3.jpg' },
  ],
  other: [
    { name: 'Octopus', scientific: 'Octopus vulgaris', desc: 'Intelligent camouflaging cephalopod found in rocky zones', rarity: 'Occasional', color: '#9370db', image: 'images/WhatsApp Image 2026-04-18 at 01.23.34.jpeg' },
    { name: 'Starfish', scientific: 'Asteroidea', desc: 'Sea stars found resting on sandy bottoms and reef flats', rarity: 'Common', color: '#ff6347', image: 'images/other star fish.jpg' },
    { name: 'Jellyfish', scientific: 'Medusozoa', desc: 'Seasonal visitors; admire from a safe distance', rarity: 'Seasonal', color: '#add8e6', image: 'images/other jelly.jpg' },
    { name: 'Sea Cucumber', scientific: 'Holothuroidea', desc: 'Bottom-dwelling scavengers important to reef health', rarity: 'Common', color: '#8b4513', image: 'images/Coral 3.webp' },
  ],
};

// -------------------------------------------------------
// STATE
// -------------------------------------------------------
const state = {
  filteredPlaces: [...PLACES_DATA],
  currentFilter: 'all',
  searchQuery: '',
  tripItems: [],
  sightings: [],
  currentUser: null,
  visibleCount: 100,
  envData: {
    waterTemp: 28, windSpeed: 12, waveHeight: 0.5,
    uvIndex: 5, salinity: 35, visibility: 8,
    isSafe: true
  },
  activeSpeciesTab: 'fish',
  currentModalPlace: null,
  mapInstance: null,
  mapMarkers: [],
  mapLayerGroup: null,
  activeMapFilter: 'all',
};

// -------------------------------------------------------
// UTILITY
// -------------------------------------------------------
function $(id) { return document.getElementById(id); }
function $$(sel) { return document.querySelectorAll(sel); }
function formatLKR(n) { return n === 0 ? 'Free' : `LKR ${n.toLocaleString()}`; }
function starHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < full; i++) s += '<i class="fa-solid fa-star"></i>';
  if (half) s += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = full + (half ? 1 : 0); i < 5; i++) s += '<i class="fa-regular fa-star"></i>';
  return s;
}
function showToast(msg, type = 'success') {
  const t = $('toast');
  const icon = $('toast').querySelector('.toast-icon');
  $('toastMsg').textContent = msg;
  icon.className = `fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} toast-icon`;
  t.style.background = type === 'success' ? 'linear-gradient(135deg,#00c896,#00875f)' : 'linear-gradient(135deg,#ff6b6b,#cc0000)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
function getDistanceStr(d) { return d < 1 ? `${(d * 1000).toFixed(0)}m` : `${d.toFixed(1)}km`; }

// -------------------------------------------------------
// LOADING SCREEN
// -------------------------------------------------------
window.addEventListener('load', () => {
  setTimeout(() => {
    const ls = $('loadingScreen');
    if (ls) { ls.style.opacity = '0'; setTimeout(() => ls.remove(), 600); }
    initApp();
  }, 1500);
});

function initApp() {
  initNavbar();
  renderPlaces();
  renderQuickAdd();
  renderSpecies('fish');
  renderRecentSightings();
  startEnvSimulation();
  drawTideChart();
  setTideDate();
  initSearch();
  initFilters();
  initMap();
  initTripPlanner();
  initBiodiversityForm();
  initModals();
  initScrollSpy();
  initParticles();
  setTripDate();
  observeElements();
}

// -------------------------------------------------------
// NAVBAR
// -------------------------------------------------------
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = $('mobileMenuBtn');
  const mobileMenu = $('mobileMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const icon = mobileBtn.querySelector('i');
    icon.className = mobileMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      mobileBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

// -------------------------------------------------------
// SCROLL SPY
// -------------------------------------------------------
function initScrollSpy() {
  const sections = ['home', 'explore', 'map', 'environment', 'trip-planner', 'biodiversity', 'about'];
  const navLinks = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[data-section="${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(id => { const el = $(id); if (el) obs.observe(el); });
}

// -------------------------------------------------------
// PARTICLES
// -------------------------------------------------------
function initParticles() {
  const container = $('heroParticles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      position:absolute;
      width:${Math.random() * 6 + 2}px;
      height:${Math.random() * 6 + 2}px;
      background:rgba(255,255,255,${Math.random() * 0.4 + 0.1});
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 6 + 4}s ease-in-out infinite;
      animation-delay:${Math.random() * 3}s;
    `;
    container.appendChild(p);
  }
}

// -------------------------------------------------------
// SEARCH
// -------------------------------------------------------
function initSearch() {
  const input = $('searchInput');
  const suggestions = $('searchSuggestions');
  const btn = $('searchBtn');
  const catFilter = $('categoryFilter');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (q.length < 2) { suggestions.style.display = 'none'; return; }
    const matches = PLACES_DATA.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.location.toLowerCase().includes(q)
    ).slice(0, 5);

    if (matches.length === 0) { suggestions.style.display = 'none'; return; }
    suggestions.innerHTML = matches.map(m => `
      <div class="suggestion-item" data-id="${m.id}">
        <i class="fa-solid fa-${m.category === 'beach' ? 'umbrella-beach' : m.category === 'hotel' ? 'hotel' : m.category === 'restaurant' ? 'utensils' : m.category === 'marine' ? 'fish' : 'person-swimming'}"></i>
        <div>
          <div class="suggestion-name">${m.name}</div>
          <div class="suggestion-loc">${m.location} · ${m.category}</div>
        </div>
      </div>
    `).join('');
    suggestions.style.display = 'block';

    suggestions.querySelectorAll('.suggestion-item').forEach(el => {
      el.addEventListener('click', () => {
        const place = PLACES_DATA.find(p => p.id === parseInt(el.dataset.id));
        if (place) openPlaceModal(place);
        suggestions.style.display = 'none';
        input.value = '';
      });
    });
  });

  document.addEventListener('click', e => {
    if (!suggestions.contains(e.target) && e.target !== input) {
      suggestions.style.display = 'none';
    }
  });

  btn.addEventListener('click', () => {
    const q = input.value.trim().toLowerCase();
    const cat = catFilter.value;
    state.searchQuery = q;
    if (cat) state.currentFilter = cat;
    applyFilters();
    document.querySelector('#explore').scrollIntoView({ behavior: 'smooth' });
    suggestions.style.display = 'none';
  });

  // Search tabs
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const type = tab.dataset.tab;
      catFilter.value = type === 'places' ? '' : type === 'activities' ? 'activity' : type === 'stays' ? 'hotel' : '';
    });
  });
}

// -------------------------------------------------------
// FILTERS
// -------------------------------------------------------
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentFilter = btn.dataset.filter;
      state.visibleCount = 100;
      applyFilters();
    });
  });

  $('loadMoreBtn').addEventListener('click', () => {
    state.visibleCount += 3;
    renderPlaces();
  });
}

function applyFilters() {
  state.filteredPlaces = PLACES_DATA.filter(p => {
    const catMatch = state.currentFilter === 'all' || p.category === state.currentFilter;
    const qMatch = !state.searchQuery ||
      p.name.toLowerCase().includes(state.searchQuery) ||
      p.tags.some(t => t.toLowerCase().includes(state.searchQuery)) ||
      p.location.toLowerCase().includes(state.searchQuery);
    return catMatch && qMatch;
  });
  renderPlaces();
}

// -------------------------------------------------------
// PLACE CARDS
// -------------------------------------------------------
function renderPlaces() {
  const grid = $('placesGrid');
  const noResults = $('noResults');
  const loadMore = $('loadMoreBtn');

  if (!grid) return;

  const visible = state.filteredPlaces.slice(0, state.visibleCount);

  if (visible.length === 0) {
    grid.innerHTML = '';
    noResults.style.display = 'flex';
    loadMore.style.display = 'none';
    return;
  }

  noResults.style.display = 'none';
  loadMore.style.display = state.filteredPlaces.length > state.visibleCount ? 'inline-flex' : 'none';

  grid.innerHTML = visible.map(p => `
    <div class="place-card ${p.featured ? 'featured' : ''}" data-id="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}">
      <div class="place-card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="place-card-overlay"></div>
        ${p.featured ? '<div class="featured-badge"><i class="fa-solid fa-crown"></i> Featured</div>' : ''}
        <div class="place-card-cat"><i class="fa-solid fa-${catIcon(p.category)}"></i> ${capitalize(p.category)}</div>
        <button class="place-fav-btn ${isFavourited(p.id) ? 'active' : ''}" data-id="${p.id}" aria-label="Favourite ${p.name}">
          <i class="fa-${isFavourited(p.id) ? 'solid' : 'regular'} fa-heart"></i>
        </button>
      </div>
      <div class="place-card-body">
        <div class="place-meta">
          <span class="place-distance"><i class="fa-solid fa-location-dot"></i> ${getDistanceStr(p.distance)}</span>
          <span class="place-price ${p.price === 0 ? 'free' : ''}">${formatLKR(p.price)}</span>
        </div>
        <h3 class="place-name">${p.name}</h3>
        <div class="place-rating">
          <div class="stars">${starHTML(p.rating)}</div>
          <span>${p.rating} <small>(${p.reviews.toLocaleString()} reviews)</small></span>
        </div>
        <p class="place-desc">${p.desc.substring(0, 90)}…</p>
        <div class="place-tags">${p.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="place-card-actions">
          <button class="btn-view-place" data-id="${p.id}"><i class="fa-solid fa-eye"></i> View Details</button>
          <button class="btn-add-trip" data-id="${p.id}"><i class="fa-solid fa-plus"></i> Add to Trip</button>
        </div>
      </div>
    </div>
  `).join('');

  // Events
  grid.querySelectorAll('.btn-view-place').forEach(btn =>
    btn.addEventListener('click', e => { e.stopPropagation(); openPlaceModal(PLACES_DATA.find(p => p.id === parseInt(btn.dataset.id))); })
  );
  grid.querySelectorAll('.btn-add-trip').forEach(btn =>
    btn.addEventListener('click', e => { e.stopPropagation(); addToTrip(parseInt(btn.dataset.id)); })
  );
  grid.querySelectorAll('.place-fav-btn').forEach(btn =>
    btn.addEventListener('click', e => { e.stopPropagation(); toggleFav(parseInt(btn.dataset.id)); })
  );
  grid.querySelectorAll('.place-card').forEach(card =>
    card.addEventListener('click', () => openPlaceModal(PLACES_DATA.find(p => p.id === parseInt(card.dataset.id))))
  );
}

let favs = JSON.parse(localStorage.getItem('cw_favs') || '[]');
function isFavourited(id) { return favs.includes(id); }
function toggleFav(id) {
  if (favs.includes(id)) { favs = favs.filter(f => f !== id); showToast('Removed from favourites'); }
  else { favs.push(id); showToast('Added to favourites ❤️'); }
  localStorage.setItem('cw_favs', JSON.stringify(favs));
  renderPlaces();
}

function catIcon(cat) {
  return { beach: 'umbrella-beach', activity: 'person-swimming', hotel: 'hotel', restaurant: 'utensils', marine: 'fish' }[cat] || 'map-pin';
}
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// -------------------------------------------------------
// TRIP PLANNER
// -------------------------------------------------------
function initTripPlanner() {
  state.tripItems = JSON.parse(localStorage.getItem('cw_trip') || '[]');

  $('clearTripBtn').addEventListener('click', () => {
    if (state.tripItems.length === 0) return;
    if (confirm('Clear your entire itinerary?')) {
      state.tripItems = [];
      saveTrip();
      renderTrip();
      showToast('Itinerary cleared');
    }
  });

  $('downloadItinerary').addEventListener('click', exportItinerary);
  renderTrip();
}

function categoryLabel(cat) {
  return {
    beach: 'Beach',
    activity: 'Activity',
    hotel: 'Accommodation',
    restaurant: 'Dining',
    marine: 'Marine Life',
  }[cat] || capitalize(cat);
}

function getPlaceDetailContent(place) {
  const fallback = {
    bestFor: place.tags.slice(0, 2).join(', '),
    bestTime: place.category === 'restaurant' ? 'Lunch and dinner' : 'Morning to evening',
    duration: place.category === 'hotel' ? '1 to 3 nights' : '1 to 3 hours',
    access: `${place.location} area access`,
    extraTitle: 'More Details',
    extraItems: place.highlights,
    tips: ['Check local weather before your visit.', 'Plan this stop alongside nearby places for a smoother trip.'],
  };
  return { ...fallback, ...(PLACE_DETAIL_CONTENT[place.id] || {}) };
}

function openPlaceModal(place) {
  if (!place) return;
  state.currentModalPlace = place;
  const detail = getPlaceDetailContent(place);
  const content = $('placeModalContent');

  content.innerHTML = `
    <div class="modal-img-wrap">
      <img src="${place.image}" alt="${place.name}">
      <div class="modal-img-overlay"></div>
      <div class="modal-img-badge">${place.priceLabel}</div>
    </div>
    <div class="modal-body-content">
      <div class="modal-header-row">
        <div>
          <span class="modal-cat"><i class="fa-solid fa-${catIcon(place.category)}"></i> ${categoryLabel(place.category)}</span>
          <h2>${place.name}</h2>
          <div class="modal-location"><i class="fa-solid fa-location-dot"></i> ${place.location} · ${getDistanceStr(place.distance)} from Pasikudah</div>
        </div>
        <div class="modal-rating-big">
          <div class="stars">${starHTML(place.rating)}</div>
          <strong>${place.rating}</strong>
          <small>${place.reviews.toLocaleString()} reviews</small>
        </div>
      </div>

      <p class="modal-desc">${place.desc}</p>

      <div class="modal-highlights">
        <h4><i class="fa-solid fa-circle-check"></i> Highlights</h4>
        <ul>${place.highlights.map(h => `<li><i class="fa-solid fa-check"></i> ${h}</li>`).join('')}</ul>
      </div>

      <div class="modal-info-row">
        <div class="modal-info-item">
          <i class="fa-regular fa-clock"></i>
          <span><strong>Hours</strong><br>${place.openHours}</span>
        </div>
        <div class="modal-info-item">
          <i class="fa-solid fa-tag"></i>
          <span><strong>Price</strong><br>${place.priceLabel}</span>
        </div>
        <div class="modal-info-item">
          <i class="fa-solid fa-star"></i>
          <span><strong>Best For</strong><br>${detail.bestFor}</span>
        </div>
        <div class="modal-info-item">
          <i class="fa-solid fa-sun"></i>
          <span><strong>Best Time</strong><br>${detail.bestTime}</span>
        </div>
        <div class="modal-info-item">
          <i class="fa-solid fa-hourglass-half"></i>
          <span><strong>Typical Visit</strong><br>${detail.duration}</span>
        </div>
        <div class="modal-info-item">
          <i class="fa-solid fa-route"></i>
          <span><strong>Access</strong><br>${detail.access}</span>
        </div>
      </div>

      <div class="modal-highlights">
        <h4><i class="fa-solid fa-circle-info"></i> ${detail.extraTitle}</h4>
        <ul>${detail.extraItems.map(item => `<li><i class="fa-solid fa-angle-right"></i> ${item}</li>`).join('')}</ul>
      </div>

      <div class="modal-highlights">
        <h4><i class="fa-solid fa-lightbulb"></i> Travel Tips</h4>
        <ul>${detail.tips.map(tip => `<li><i class="fa-solid fa-angle-right"></i> ${tip}</li>`).join('')}</ul>
      </div>

      <div class="modal-tags">${place.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>

      <div class="modal-actions">
        <button class="btn-primary" id="modalAddTrip"><i class="fa-solid fa-calendar-plus"></i> Add to Trip</button>
        <button class="btn-outline" id="modalFav"><i class="fa-${isFavourited(place.id) ? 'solid' : 'regular'} fa-heart"></i> ${isFavourited(place.id) ? 'Saved' : 'Save'}</button>
      </div>
    </div>
  `;

  $('placeModal').classList.add('open');
  document.body.style.overflow = 'hidden';

  $('modalAddTrip').addEventListener('click', () => { addToTrip(place.id); closeModal('placeModal'); });
  $('modalFav').addEventListener('click', () => { toggleFav(place.id); closeModal('placeModal'); });
}

function addToTrip(id) {
  if (!state.currentUser) {
    // Allow guest usage, just add
  }
  if (state.tripItems.find(i => i.id === id)) {
    showToast('Already in your itinerary!', 'error');
    return;
  }
  const place = PLACES_DATA.find(p => p.id === id);
  if (!place) return;
  state.tripItems.push({ id, name: place.name, category: place.category, price: place.price, image: place.image, location: place.location });
  saveTrip();
  renderTrip();
  showToast(`"${place.name}" added to your itinerary!`);
  renderQuickAdd();
}

function removeFromTrip(id) {
  state.tripItems = state.tripItems.filter(i => i.id !== id);
  saveTrip();
  renderTrip();
  renderQuickAdd();
  showToast('Removed from itinerary');
}

function saveTrip() { localStorage.setItem('cw_trip', JSON.stringify(state.tripItems)); }

function renderTrip() {
  const days = $('tripDays');
  const empty = $('emptyTrip');
  const summary = $('tripSummary');

  if (state.tripItems.length === 0) {
    days.innerHTML = '';
    if (empty) empty.style.display = 'flex';
    if (summary) summary.style.display = 'none';
    return;
  }
  if (empty) empty.style.display = 'none';
  if (summary) summary.style.display = 'grid';

  const startDate = $('tripStartDate').value ? new Date($('tripStartDate').value) : null;
  const grouped = {};
  state.tripItems.forEach((item, i) => {
    const dayNum = Math.floor(i / 3) + 1;
    if (!grouped[dayNum]) grouped[dayNum] = [];
    grouped[dayNum].push(item);
  });

  days.innerHTML = Object.entries(grouped).map(([day, items]) => {
    const dateLabel = startDate
      ? new Date(startDate.getTime() + (parseInt(day) - 1) * 86400000).toLocaleDateString('en-GB', { weekday: 'long', month: 'short', day: 'numeric' })
      : `Day ${day}`;
    return `
      <div class="trip-day">
        <div class="trip-day-header">
          <i class="fa-regular fa-calendar"></i>
          <span>${dateLabel}</span>
          <span class="trip-day-count">${items.length} place${items.length > 1 ? 's' : ''}</span>
        </div>
        <div class="trip-day-items">
          ${items.map(item => `
            <div class="trip-item">
              <img src="${item.image}" alt="${item.name}">
              <div class="trip-item-info">
                <span class="trip-item-cat">${capitalize(item.category)}</span>
                <strong>${item.name}</strong>
                <span>${item.location} · ${formatLKR(item.price)}</span>
              </div>
              <button class="trip-remove-btn" data-id="${item.id}" aria-label="Remove ${item.name}">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  days.querySelectorAll('.trip-remove-btn').forEach(btn =>
    btn.addEventListener('click', () => removeFromTrip(parseInt(btn.dataset.id)))
  );

  // Summary
  const totalDays = Object.keys(grouped).length;
  const totalBudget = state.tripItems.reduce((s, i) => s + i.price, 0);
  if ($('totalPlaces')) $('totalPlaces').textContent = state.tripItems.length;
  if ($('totalDays')) $('totalDays').textContent = `${totalDays} day${totalDays > 1 ? 's' : ''}`;
  if ($('estBudget')) $('estBudget').textContent = `LKR ${totalBudget.toLocaleString()}`;
}

$('tripStartDate') && $('tripStartDate').addEventListener('change', renderTrip);

function setTripDate() {
  const el = $('tripStartDate');
  if (el && !el.value) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    el.valueAsDate = d;
  }
}

function exportItinerary() {
  if (state.tripItems.length === 0) { showToast('Add some places first!', 'error'); return; }
  let text = '=== Coastal Region — My Itinerary ===\n\n';
  const grouped = {};
  state.tripItems.forEach((item, i) => {
    const d = Math.floor(i / 3) + 1;
    if (!grouped[d]) grouped[d] = [];
    grouped[d].push(item);
  });
  Object.entries(grouped).forEach(([day, items]) => {
    text += `Day ${day}\n`;
    items.forEach(item => {
      text += `  • ${item.name} (${item.location}) — ${formatLKR(item.price)}\n`;
    });
    text += '\n';
  });
  text += `Total estimated budget: LKR ${state.tripItems.reduce((s, i) => s + i.price, 0).toLocaleString()}\n`;
  text += '\nCoastal Region — ITE2953 Project | Pasikudah & Kalkudah, Sri Lanka\n';

  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Coastal Region_Itinerary.txt';
  a.click();
  showToast('Itinerary exported!');
}

// -------------------------------------------------------
// QUICK ADD PANEL
// -------------------------------------------------------
function renderQuickAdd() {
  const grid = $('quickAddGrid');
  if (!grid) return;
  const featured = PLACES_DATA.filter(p => p.featured).slice(0, 6);
  grid.innerHTML = featured.map(p => {
    const inTrip = state.tripItems.some(i => i.id === p.id);
    return `
      <div class="quick-add-item ${inTrip ? 'in-trip' : ''}" data-id="${p.id}" title="${p.name}">
        <img src="${p.image}" alt="${p.name}">
        <div class="quick-add-overlay">
          <span>${p.name}</span>
          <button ${inTrip ? 'disabled' : ''} data-id="${p.id}">
            <i class="fa-solid fa-${inTrip ? 'check' : 'plus'}"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
  grid.querySelectorAll('button[data-id]').forEach(btn => {
    btn.addEventListener('click', e => { e.stopPropagation(); addToTrip(parseInt(btn.dataset.id)); });
  });
}

// -------------------------------------------------------
// ENVIRONMENT MONITOR
// -------------------------------------------------------
function startEnvSimulation() {
  updateEnvDisplay();
  setInterval(() => {
    // Slight random drift
    state.envData.waterTemp = +(state.envData.waterTemp + (Math.random() - 0.5) * 0.2).toFixed(1);
    state.envData.windSpeed = Math.max(0, +(state.envData.windSpeed + (Math.random() - 0.5) * 0.5).toFixed(1));
    state.envData.waveHeight = Math.max(0, +(state.envData.waveHeight + (Math.random() - 0.5) * 0.05).toFixed(2));
    state.envData.uvIndex = Math.max(0, Math.min(11, Math.round(state.envData.uvIndex + (Math.random() - 0.5))));
    state.envData.isSafe = state.envData.waveHeight < 1.5 && state.envData.windSpeed < 30;
    updateEnvDisplay();
    $('lastUpdated').textContent = 'Just now';
  }, 7000);
}

function updateEnvDisplay() {
  const d = state.envData;
  const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };

  set('waterTemp', `${d.waterTemp}°C`);
  set('waterTempBanner', `${d.waterTemp}°C Water`);
  set('windSpeed', `${d.windSpeed} km/h`);
  set('windSpeedBanner', `${d.windSpeed} km/h Wind`);
  set('waveHeight', `${d.waveHeight}m`);
  set('waveHeightBanner', `${d.waveHeight}m Waves`);
  set('uvIndex', `${d.uvIndex} (${uvLabel(d.uvIndex)})`);
  set('uvIndexBanner', `UV: ${uvLabel(d.uvIndex)}`);
  set('salinity', `${d.salinity} PSU`);
  set('salinityBanner', `Salinity: ${d.salinity} PSU`);
  set('visibility', `${d.visibility}m`);

  const badge = $('safetyBadge');
  const icon = document.querySelector('.safety-icon');
  const cond = $('swimCondition');

  if (d.isSafe) {
    if (badge) { badge.textContent = 'SAFE TO SWIM'; badge.className = 'safety-badge safe'; }
    if (icon) icon.className = 'safety-icon safe';
    if (cond) { cond.innerHTML = '<i class="fa-solid fa-circle-check"></i><span>Safe to Swim</span>'; cond.className = 'env-item safe'; }
    set('safetyMsg', 'Coastal conditions are favourable for swimming and water activities.');
  } else {
    if (badge) { badge.textContent = 'CAUTION'; badge.className = 'safety-badge caution'; }
    if (icon) icon.className = 'safety-icon caution';
    if (cond) { cond.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i><span>Use Caution</span>'; cond.className = 'env-item caution'; }
    set('safetyMsg', 'Exercise caution. Wave height or wind conditions may be challenging for some swimmers.');
  }
}

function uvLabel(idx) {
  if (idx <= 2) return 'Low';
  if (idx <= 5) return 'Moderate';
  if (idx <= 7) return 'High';
  if (idx <= 10) return 'Very High';
  return 'Extreme';
}

// -------------------------------------------------------
// TIDE CHART
// -------------------------------------------------------
function setTideDate() {
  const el = $('tideDate');
  if (el) el.textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function drawTideChart() {
  const canvas = $('tideCanvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth || 600;
  canvas.height = 120;

  const w = canvas.width, h = canvas.height;
  const points = Array.from({ length: 25 }, (_, i) => {
    const tide = 0.75 + 0.5 * Math.sin((i / 24) * 2 * Math.PI * 2 - 1);
    return { x: (i / 24) * w, y: h - (tide / 1.5) * (h * 0.7) - h * 0.1 };
  });

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(0,200,255,0.3)');
  grad.addColorStop(1, 'rgba(0,200,255,0)');

  ctx.beginPath();
  ctx.moveTo(points[0].x, h);
  ctx.lineTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(points[points.length - 1].x, h);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  points.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = 'rgba(0,200,255,0.9)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Hour labels
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '10px Inter, sans-serif';
  [0, 6, 12, 18, 24].forEach(h => {
    const x = (h / 24) * w;
    ctx.fillText(`${h}:00`, x - 10, canvas.height - 2);
  });
}

// -------------------------------------------------------
// ALERT SUBSCRIPTIONS
// -------------------------------------------------------
$('subscribeAlerts') && $('subscribeAlerts').addEventListener('click', () => {
  showToast('Subscribed to coastal alerts!');
  $('subscribeAlerts').innerHTML = '<i class="fa-solid fa-check"></i> Subscribed';
  $('subscribeAlerts').disabled = true;
});

// -------------------------------------------------------
// BIODIVERSITY & SIGHTINGS
// -------------------------------------------------------
function renderSpecies(tab) {
  const grid = $('speciesGrid');
  if (!grid) return;
  const data = SPECIES_DATA[tab] || [];
  grid.innerHTML = data.map(s => `
    <div class="species-card">
      <div class="species-image-wrapper">
        <img src="${s.image}" alt="${s.name}" loading="lazy">
      </div>
      <div class="species-color-dot" style="background:${s.color}"></div>
      <div class="species-info">
        <strong>${s.name}</strong>
        <em>${s.scientific}</em>
        <p>${s.desc}</p>
        <span class="species-rarity rarity-${s.rarity.toLowerCase().replace(' ', '-')}">${s.rarity}</span>
      </div>
    </div>
  `).join('');
}

document.querySelectorAll('.species-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.species-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    state.activeSpeciesTab = tab.dataset.species;
    renderSpecies(state.activeSpeciesTab);
  });
});

function initBiodiversityForm() {
  const form = $('reportForm');
  if (!form) return;
  // Set default date to today
  const reportDate = $('reportDate');
  if (reportDate) reportDate.valueAsDate = new Date();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const sighting = {
      id: Date.now(),
      species: $('reportSpecies').value,
      location: $('reportLocation').value,
      date: $('reportDate').value,
      depth: $('reportDepth').value || 'N/A',
      notes: $('reportNotes').value,
      count: $('reportCount').value || 1,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
    state.sightings.unshift(sighting);
    localStorage.setItem('cw_sightings', JSON.stringify(state.sightings));
    renderRecentSightings();
    form.reset();
    if (reportDate) reportDate.valueAsDate = new Date();
    showToast('Sighting report submitted! Thank you for contributing.');
  });
}

function renderRecentSightings() {
  state.sightings = JSON.parse(localStorage.getItem('cw_sightings') || '[]');
  const container = $('recentSightings');
  if (!container) return;
  if (state.sightings.length === 0) {
    container.innerHTML = '<p class="no-sightings">No sightings yet. Be the first to report!</p>';
    return;
  }
  container.innerHTML = state.sightings.slice(0, 5).map(s => `
    <div class="sighting-entry">
      <div class="sighting-icon"><i class="fa-solid fa-binoculars"></i></div>
      <div class="sighting-info">
        <strong>${s.species}</strong>
        <span>${locationLabel(s.location)} · Depth: ${s.depth}m · Count: ${s.count}</span>
        <span class="sighting-date">${s.date} at ${s.timestamp}</span>
        ${s.notes ? `<p class="sighting-notes">"${s.notes}"</p>` : ''}
      </div>
    </div>
  `).join('');
}

function locationLabel(val) {
  const map = {
    'pasikudah-north': 'Pasikudah North Reef',
    'pasikudah-south': 'Pasikudah South Beach',
    'kalkudah-main': 'Kalkudah Main Beach',
    'kalkudah-reef': 'Kalkudah Coral Garden',
    'other': 'Other Location',
  };
  return map[val] || val;
}

// -------------------------------------------------------
// MODALS
// -------------------------------------------------------
function initModals() {
  // Auth
  const authModal = $('authModal');
  const loginBtn = $('loginBtn');
  const signupBtn = $('signupBtn');
  const closeAuth = $('closeAuthModal');
  const tabLogin = $('tabLogin');
  const tabSignup = $('tabSignup');
  const loginWrap = $('loginWrap');
  const signupWrap = $('signupWrap');
  const switchToSignup = $('switchToSignup');
  const switchToLogin = $('switchToLogin');

  function openAuthModal(tab = 'login') {
    authModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    switchAuthTab(tab);
  }
  function switchAuthTab(tab) {
    if (tab === 'login') {
      tabLogin.classList.add('active'); tabSignup.classList.remove('active');
      loginWrap.classList.add('active'); signupWrap.classList.remove('active');
    } else {
      tabSignup.classList.add('active'); tabLogin.classList.remove('active');
      signupWrap.classList.add('active'); loginWrap.classList.remove('active');
    }
  }

  loginBtn && loginBtn.addEventListener('click', () => openAuthModal('login'));
  signupBtn && signupBtn.addEventListener('click', () => openAuthModal('signup'));
  $('mobileLoginBtn') && $('mobileLoginBtn').addEventListener('click', () => openAuthModal('login'));
  $('mobileSignupBtn') && $('mobileSignupBtn').addEventListener('click', () => openAuthModal('signup'));
  closeAuth && closeAuth.addEventListener('click', () => closeModal('authModal'));
  tabLogin && tabLogin.addEventListener('click', () => switchAuthTab('login'));
  tabSignup && tabSignup.addEventListener('click', () => switchAuthTab('signup'));
  switchToSignup && switchToSignup.addEventListener('click', () => switchAuthTab('signup'));
  switchToLogin && switchToLogin.addEventListener('click', () => switchAuthTab('login'));

  // Login form
  const loginForm = $('loginForm');
  loginForm && loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = $('loginEmail').value;
    state.currentUser = { email, name: email.split('@')[0] };
    closeModal('authModal');
    showToast(`Welcome back, ${state.currentUser.name}!`);
    updateNavUser();
  });

  // Signup form
  const signupForm = $('signupForm');
  signupForm && signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = $('signupName').value;
    const email = $('signupEmail').value;
    const role = document.querySelector('input[name="userRole"]:checked')?.value || 'tourist';
    state.currentUser = { name, email, role };
    closeModal('authModal');
    showToast(`Account created! Welcome, ${name}!`);
    updateNavUser();
  });

  // Password strength
  const pw = $('signupPassword');
  pw && pw.addEventListener('input', () => {
    const bar = document.querySelector('.pw-strength-bar');
    if (!bar) return;
    const strength = calcPwStrength(pw.value);
    const colors = ['#ff4444', '#ff8800', '#ffd600', '#00c896'];
    bar.style.width = `${strength * 25}%`;
    bar.style.background = colors[strength - 1] || '#ddd';
  });

  // Password toggle
  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = $(btn.dataset.target);
      if (!target) return;
      target.type = target.type === 'password' ? 'text' : 'password';
      btn.querySelector('i').className = `fa-solid fa-${target.type === 'password' ? 'eye' : 'eye-slash'}`;
    });
  });

  // Place modal close
  $('closePlaceModal') && $('closePlaceModal').addEventListener('click', () => closeModal('placeModal'));

  // Alert modal
  const alertBtn = $('alertBtn');
  alertBtn && alertBtn.addEventListener('click', () => {
    $('alertModalContent').innerHTML = buildAlertContent();
    $('alertModal').classList.add('open');
    document.body.style.overflow = 'hidden';
    alertBtn.querySelector('.badge-dot').style.display = 'none';
  });
  $('closeAlertModal') && $('closeAlertModal').addEventListener('click', () => closeModal('alertModal'));

  // Contact / partner
  $('contactBtn') && $('contactBtn').addEventListener('click', () => showToast('Email us at info@Coastal Region.lk'));
  $('partnerBtn') && $('partnerBtn').addEventListener('click', () => showToast('Partnership enquiries: partners@Coastal Region.lk'));

  // Overlay clicks
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => { m.classList.remove('open'); document.body.style.overflow = ''; });
    }
  });
}

function closeModal(id) {
  const m = $(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}

function updateNavUser() {
  if (!state.currentUser) return;
  const loginBtn = $('loginBtn');
  const signupBtn = $('signupBtn');
  if (loginBtn) loginBtn.textContent = state.currentUser.name;
  if (signupBtn) { signupBtn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i>`; signupBtn.title = 'Log Out'; signupBtn.onclick = () => { state.currentUser = null; location.reload(); }; }
}

function calcPwStrength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.max(1, s);
}

function buildAlertContent() {
  const d = state.envData;
  const alerts = [];
  if (d.waveHeight > 1.0) alerts.push({ level: 'warning', icon: 'water', msg: `Wave height at ${d.waveHeight}m — exercise caution when swimming.` });
  if (d.windSpeed > 20) alerts.push({ level: 'warning', icon: 'wind', msg: `Wind speed at ${d.windSpeed} km/h — avoid kayaking and paddleboarding.` });
  if (d.uvIndex >= 8) alerts.push({ level: 'info', icon: 'sun', msg: `UV index is Very High (${d.uvIndex}). Apply SPF 50+ sunscreen frequently.` });
  if (alerts.length === 0) return '<div class="alert-clear"><i class="fa-solid fa-circle-check"></i><p>No active alerts. All conditions are normal.</p></div>';
  return alerts.map(a => `
    <div class="alert-entry ${a.level}"><i class="fa-solid fa-${a.icon}"></i><p>${a.msg}</p></div>
  `).join('');
}

// -------------------------------------------------------
// INTERACTIVE MAP
// -------------------------------------------------------
const MAP_CATEGORY_COLORS = {
  beach: '#00b8d4',
  activity: '#00c896',
  hotel: '#8370ff',
  restaurant: '#ff6b35',
  marine: '#36aeff',
};

function initMap() {
  if (typeof L === 'undefined' || !$('leafletMap')) return;

  const map = L.map('leafletMap', {
    center: [7.9390, 81.5590],
    zoom: 14,
    scrollWheelZoom: false,
    maxZoom: 18,
    minZoom: 11,
  });
  state.mapInstance = map;

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on('click', () => map.scrollWheelZoom.enable());
  map.on('blur', () => map.scrollWheelZoom.disable());

  // Invalidate map size when it becomes visible (prevents grey tiles)
  const mapObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        map.invalidateSize();
        mapObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  mapObs.observe($('leafletMap'));

  createMapMarkers();
  initMapFilters();

  // Fit bounds to show all markers
  if (state.mapMarkers.length > 0) {
    const group = L.featureGroup(state.mapMarkers);
    map.fitBounds(group.getBounds().pad(0.15));
  }
}

function createMapMarkers() {
  state.mapLayerGroup = L.layerGroup().addTo(state.mapInstance);

  PLACES_DATA.forEach(place => {
    const color = MAP_CATEGORY_COLORS[place.category] || '#00b8d4';

    const marker = L.circleMarker([place.lat, place.lng], {
      radius: 10,
      fillColor: color,
      color: '#fff',
      weight: 2.5,
      fillOpacity: 0.85,
    });

    const popupHTML = `
      <div class="map-popup">
        <img class="map-popup-img" src="${place.image}" alt="${place.name}">
        <div class="map-popup-body">
          <div class="map-popup-cat"><i class="fa-solid fa-${catIcon(place.category)}"></i> ${capitalize(place.category)}</div>
          <div class="map-popup-name">${place.name}</div>
          <div class="map-popup-rating">${starHTML(place.rating)} <span>${place.rating}</span></div>
          <button class="map-popup-btn" data-place-id="${place.id}">View Details</button>
        </div>
      </div>
    `;

    marker.bindPopup(popupHTML, { maxWidth: 260, minWidth: 220, className: 'custom-popup' });

    marker.on('popupopen', () => {
      const btn = document.querySelector(`.map-popup-btn[data-place-id="${place.id}"]`);
      if (btn) {
        btn.addEventListener('click', () => {
          openPlaceModal(place);
          state.mapInstance.closePopup();
        });
      }
    });

    marker.placeCategory = place.category;
    state.mapMarkers.push(marker);
    state.mapLayerGroup.addLayer(marker);
  });
}

function initMapFilters() {
  document.querySelectorAll('.map-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeMapFilter = btn.dataset.filter;
      filterMapMarkers();
    });
  });
}

function filterMapMarkers() {
  state.mapLayerGroup.clearLayers();
  const visibleMarkers = [];

  state.mapMarkers.forEach(marker => {
    if (state.activeMapFilter === 'all' || marker.placeCategory === state.activeMapFilter) {
      state.mapLayerGroup.addLayer(marker);
      visibleMarkers.push(marker);
    }
  });

  if (visibleMarkers.length > 0) {
    const group = L.featureGroup(visibleMarkers);
    state.mapInstance.fitBounds(group.getBounds().pad(0.15));
  }
}

// -------------------------------------------------------
// INTERSECTION OBSERVER — FADE IN SECTIONS
// -------------------------------------------------------
function observeElements() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.place-card, .metric-card, .species-card, .trip-day, .about-feature, .map-wrapper').forEach(el => obs.observe(el));
}

// -------------------------------------------------------
// WINDOW RESIZE — REDRAW CANVAS
// -------------------------------------------------------
window.addEventListener('resize', () => {
  drawTideChart();
  if (state.mapInstance) state.mapInstance.invalidateSize();
});

// -------------------------------------------------------
// BEACH DISCOVERY SECTION
// -------------------------------------------------------
const BEACH_CATEGORIES = {
  family: [1, 2, 17, 18, 44, 50],
  snorkeling: [1, 2, 3, 18, 44, 45],
  secluded: [3, 18, 50],
  cultural: [17],
  wildlife: [3, 14, 18, 42, 50]
};

let selectedBeaches = [];

function renderBeachDiscovery(category = 'all') {
  const grid = $('beachDiscoveryGrid');
  if (!grid) return;

  const beaches = PLACES_DATA.filter(p => p.category === 'beach');
  const filtered = category === 'all' ? beaches : beaches.filter(b => BEACH_CATEGORIES[category]?.includes(b.id));

  grid.innerHTML = filtered.map((beach, index) => {
    const detail = PLACE_DETAIL_CONTENT[beach.id] || {};
    const features = detail.extraItems || beach.highlights;
    const isSelected = selectedBeaches.includes(beach.id);

    return `
      <div class="beach-detail-card" data-id="${beach.id}" style="animation-delay: ${index * 0.1}s">
        <div class="beach-card-header">
          <img src="${beach.image}" alt="${beach.name}" loading="lazy">
          <div class="beach-card-overlay"></div>
          ${beach.featured ? '<div class="beach-card-badge"><i class="fa-solid fa-star"></i> Featured</div>' : ''}
          <div class="beach-card-rating">
            <i class="fa-solid fa-star"></i>
            ${beach.rating} (${beach.reviews})
          </div>
        </div>
        <div class="beach-card-body">
          <h3 class="beach-card-name">${beach.name}</h3>
          <div class="beach-card-location">
            <i class="fa-solid fa-location-dot"></i>
            ${beach.location} · ${getDistanceStr(beach.distance)}
          </div>
          <p class="beach-card-desc">${beach.desc}</p>
          
          <div class="beach-card-features">
            <h4><i class="fa-solid fa-circle-info"></i> Beach Highlights</h4>
            <ul>
              ${features.slice(0, 3).map(f => `<li><i class="fa-solid fa-check"></i> ${f}</li>`).join('')}
            </ul>
          </div>

          <div class="beach-card-tags">
            ${beach.tags.map(tag => `<span class="beach-tag">${tag}</span>`).join('')}
          </div>

          <div class="beach-card-actions">
            <button class="beach-view-btn" data-id="${beach.id}">
              <i class="fa-solid fa-eye"></i>
              View Full Details
            </button>
            <button class="beach-compare-btn ${isSelected ? 'selected' : ''}" data-id="${beach.id}">
              <i class="fa-solid fa-${isSelected ? 'check' : 'plus'}"></i>
              ${isSelected ? 'Selected' : 'Compare'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Animate cards
  setTimeout(() => {
    grid.querySelectorAll('.beach-detail-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 100);
    });
  }, 100);

  // Event listeners
  grid.querySelectorAll('.beach-view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const beach = PLACES_DATA.find(p => p.id === parseInt(btn.dataset.id));
      if (beach) openPlaceModal(beach);
    });
  });

  grid.querySelectorAll('.beach-compare-btn').forEach(btn => {
    btn.addEventListener('click', () => toggleBeachComparison(parseInt(btn.dataset.id), btn));
  });
}

function toggleBeachComparison(beachId, btn) {
  const index = selectedBeaches.indexOf(beachId);
  
  if (index > -1) {
    selectedBeaches.splice(index, 1);
    btn.classList.remove('selected');
    btn.innerHTML = '<i class="fa-solid fa-plus"></i> Compare';
  } else {
    if (selectedBeaches.length >= 3) {
      showToast('Maximum 3 beaches can be compared', 'error');
      return;
    }
    selectedBeaches.push(beachId);
    btn.classList.add('selected');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Selected';
  }

  updateComparisonDisplay();
}

function updateComparisonDisplay() {
  const slots = $('comparisonSlots');
  const content = $('comparisonContent');
  
  if (!slots || !content) return;

  // Update slots
  const slotHTML = [0, 1, 2].map(i => {
    if (i < selectedBeaches.length) {
      const beach = PLACES_DATA.find(p => p.id === selectedBeaches[i]);
      return `
        <div class="comparison-slot filled">
          <i class="fa-solid fa-umbrella-beach"></i>
          <span>${beach.name}</span>
        </div>
      `;
    } else {
      return `
        <div class="comparison-slot empty">
          <i class="fa-solid fa-plus"></i>
          <span>Select Beach ${i + 1}</span>
        </div>
      `;
    }
  }).join('');

  slots.innerHTML = slotHTML;

  // Show comparison content if beaches selected
  if (selectedBeaches.length > 0) {
    content.style.display = 'block';
    const beaches = selectedBeaches.map(id => PLACES_DATA.find(p => p.id === id));
    
    content.innerHTML = `
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            ${beaches.map(b => `<th>${b.name}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Rating</strong></td>
            ${beaches.map(b => `<td><i class="fa-solid fa-star" style="color: var(--accent-amber)"></i> ${b.rating}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Distance</strong></td>
            ${beaches.map(b => `<td>${getDistanceStr(b.distance)}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Location</strong></td>
            ${beaches.map(b => `<td>${b.location}</td>`).join('')}
          </tr>
          <tr>
            <td><strong>Best For</strong></td>
            ${beaches.map(b => {
              const detail = PLACE_DETAIL_CONTENT[b.id] || {};
              return `<td>${detail.bestFor || 'Beach activities'}</td>`;
            }).join('')}
          </tr>
          <tr>
            <td><strong>Best Time</strong></td>
            ${beaches.map(b => {
              const detail = PLACE_DETAIL_CONTENT[b.id] || {};
              return `<td>${detail.bestTime || 'Morning'}</td>`;
            }).join('')}
          </tr>
          <tr>
            <td><strong>Features</strong></td>
            ${beaches.map(b => {
              const detail = PLACE_DETAIL_CONTENT[b.id] || {};
              const features = detail.extraItems || b.highlights;
              return `<td>${features.slice(0, 2).join(', ')}</td>`;
            }).join('')}
          </tr>
          <tr>
            <td><strong>Actions</strong></td>
            ${beaches.map(b => `<td><button class="btn-primary btn-sm" onclick="openPlaceModal(PLACES_DATA.find(p => p.id === ${b.id}))">View Details</button></td>`).join('')}
          </tr>
        </tbody>
      </table>
    `;
  } else {
    content.style.display = 'none';
  }
}

function getDistanceStr(distance) {
  return distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)} km`;
}

// Beach category filter
document.addEventListener('DOMContentLoaded', () => {
  const beachCatBtns = document.querySelectorAll('.beach-cat-btn');
  beachCatBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      beachCatBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBeachDiscovery(btn.dataset.beachCat);
    });
  });

  // Initial render
  renderBeachDiscovery();
});

// -------------------------------------------------------
// SEARCH FORM ON HERO — scroll-to on mobile
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const dist = $('distanceFilter');
  if (dist) {
    dist.addEventListener('change', () => {
      const km = parseFloat(dist.value);
      if (!km) { state.filteredPlaces = [...PLACES_DATA]; renderPlaces(); return; }
      state.filteredPlaces = PLACES_DATA.filter(p => p.distance <= km);
      renderPlaces();
    });
  }
});


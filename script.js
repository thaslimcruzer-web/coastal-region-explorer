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
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    openHours: 'Open 24 hrs', distance: 0.2, featured: true,
    highlights: ['Crystal clear water', 'Shallow lagoon', 'Safe for children'],
  },
  {
    id: 2, name: 'Kalkudah Beach', category: 'beach',
    desc: 'A pristine palm-fringed arc of white sand, quieter and more secluded than Pasikudah. Excellent for snorkeling and relaxation.',
    rating: 4.8, reviews: 967, price: 0, priceLabel: 'Free Entry',
    location: 'Kalkudah', lat: 7.9504, lng: 81.5604,
    tags: ['Snorkeling', 'Relaxation', 'Photography'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop',
    openHours: 'Open 24 hrs', distance: 3.1, featured: true,
    highlights: ['Pristine white sand', 'Coral reefs nearby', 'Palm-fringed shore'],
  },
  {
    id: 3, name: 'Passikudam North Reef', category: 'beach',
    desc: 'A hidden northern stretch with rocky outcrops teeming with marine life, beloved by snorkelers and free-divers.',
    rating: 4.7, reviews: 412, price: 0, priceLabel: 'Free Entry',
    location: 'Pasikudah North', lat: 7.9360, lng: 81.5599,
    tags: ['Snorkeling', 'Freediving', 'Marine Life'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop',
    openHours: 'Open 24 hrs', distance: 1.8, featured: false,
    highlights: ['Rocky outcrops', 'Rich marine life', 'Fewer crowds'],
  },

  // --- Activities ---
  {
    id: 4, name: 'Blue Coral Snorkeling Tours', category: 'activity',
    desc: 'Guided snorkeling expeditions to the best reef sites around Pasikudah. All equipment provided. Suitable for beginners and experienced snorkelers.',
    rating: 4.8, reviews: 768, price: 2500, priceLabel: 'LKR 2,500/person',
    location: 'Pasikudah', lat: 7.9281, lng: 81.5570,
    tags: ['Snorkeling', 'Guided', 'Equipment Included'],
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=800&auto=format&fit=crop',
    openHours: '7:00 AM – 5:00 PM', distance: 0.5, featured: true,
    highlights: ['Certified guides', 'All gear provided', 'Reef conservation briefing'],
  },
  {
    id: 5, name: 'AquaStar Scuba Diving', category: 'activity',
    desc: 'PADI-certified dive centre offering dives to the coral gardens at 8–18 m depth. Discover colourful reef fish, sea turtles, and diverse coral structures.',
    rating: 4.9, reviews: 521, price: 7500, priceLabel: 'LKR 7,500/dive',
    location: 'Pasikudah', lat: 7.9270, lng: 81.5565,
    tags: ['Scuba Diving', 'PADI', 'Coral Gardens'],
    image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=800&auto=format&fit=crop',
    openHours: '8:00 AM – 4:00 PM', distance: 0.6, featured: true,
    highlights: ['PADI certified', 'Coral garden dives', 'Turtle encounters'],
  },
  {
    id: 6, name: 'Wave Rider Surf School', category: 'activity',
    desc: 'Learn to surf on the gentle waves at Kalkudah. Ideal for beginners. Group and private lessons available with certified instructors.',
    rating: 4.6, reviews: 315, price: 4000, priceLabel: 'LKR 4,000/lesson',
    location: 'Kalkudah', lat: 7.9510, lng: 81.5610,
    tags: ['Surfing', 'Lessons', 'Beginners'],
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop',
    openHours: '6:00 AM – 6:00 PM', distance: 3.2, featured: false,
    highlights: ['Certified instructors', 'Board rental', 'Beginner-friendly'],
  },
  {
    id: 7, name: 'Lagoon Kayak Adventure', category: 'activity',
    desc: 'Self-guided or guided kayak tours across the tranquil Pasikudah lagoon. See the coast from the water and discover hidden coves.',
    rating: 4.7, reviews: 289, price: 1800, priceLabel: 'LKR 1,800/hr',
    location: 'Pasikudah', lat: 7.9285, lng: 81.5565,
    tags: ['Kayaking', 'Lagoon', 'Self-guided'],
    image: 'https://images.unsplash.com/photo-1625166836-31f4c785ce30?q=80&w=800&auto=format&fit=crop',
    openHours: '8:00 AM – 5:00 PM', distance: 0.3, featured: false,
    highlights: ['Single & double kayaks', 'Lagoon exploration', 'Hidden coves'],
  },

  // --- Hotels ---
  {
    id: 8, name: 'Amaya Beach Resort', category: 'hotel',
    desc: 'A luxury beachfront resort with stunning lagoon views, multiple pools, spa facilities, and direct beach access. Perfect for a premium stay.',
    rating: 4.8, reviews: 1102, price: 25000, priceLabel: 'LKR 25,000/night',
    location: 'Pasikudah', lat: 7.9276, lng: 81.5580,
    tags: ['Luxury', 'Beachfront', 'Pool', 'Spa'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
    openHours: 'Check-in: 2 PM', distance: 0.1, featured: true,
    highlights: ['Direct lagoon access', 'Infinity pool', 'In-house diving school'],
  },
  {
    id: 9, name: 'Palm Village Eco Lodge', category: 'hotel',
    desc: 'Eco-friendly cabanas nestled among palm trees, close to Kalkudah beach. A sustainable, budget-conscious option with authentic local charm.',
    rating: 4.5, reviews: 634, price: 8500, priceLabel: 'LKR 8,500/night',
    location: 'Kalkudah', lat: 7.9505, lng: 81.5615,
    tags: ['Eco-Friendly', 'Budget', 'Local Charm'],
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
    openHours: 'Check-in: 1 PM', distance: 3.0, featured: false,
    highlights: ['Solar powered', 'Organic meals', 'Beach 5 min walk'],
  },
  {
    id: 10, name: 'Cinnamon Bey Beruwala', category: 'hotel',
    desc: 'A boutique hotel offering modern rooms, a rooftop bar, and a lovely outdoor pool just minutes from the beach. Great for families.',
    rating: 4.6, reviews: 788, price: 14000, priceLabel: 'LKR 14,000/night',
    location: 'Pasikudah', lat: 7.9268, lng: 81.5572,
    tags: ['Boutique', 'Family', 'Pool', 'Rooftop Bar'],
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop',
    openHours: 'Check-in: 2 PM', distance: 0.8, featured: false,
    highlights: ['Rooftop bar', 'Family rooms', 'Pool with slides'],
  },

  // --- Restaurants ---
  {
    id: 11, name: 'The Reef Kitchen', category: 'restaurant',
    desc: 'Fresh seafood restaurant serving the day\'s catch. Grilled fish, crab curry, lobster, and prawn dishes prepared in authentic local style.',
    rating: 4.7, reviews: 924, price: 1500, priceLabel: 'Avg LKR 1,500/person',
    location: 'Pasikudah', lat: 7.9273, lng: 81.5574,
    tags: ['Seafood', 'Local Cuisine', 'Fresh Catch'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
    openHours: '11:00 AM – 10:00 PM', distance: 0.4, featured: true,
    highlights: ['Live lobster tank', 'Beachside tables', 'Sri Lankan spices'],
  },
  {
    id: 12, name: 'Sunset Café & Bar', category: 'restaurant',
    desc: 'A laid-back beachside café perfect for watching the sunset. Serves cocktails, fresh juices, light bites, and international breakfast.',
    rating: 4.5, reviews: 567, price: 800, priceLabel: 'Avg LKR 800/person',
    location: 'Kalkudah', lat: 7.9500, lng: 81.5600,
    tags: ['Café', 'Bar', 'Sunset Views'],
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?q=80&w=800&auto=format&fit=crop',
    openHours: '7:00 AM – 11:00 PM', distance: 3.0, featured: false,
    highlights: ['Panoramic sunset', 'Craft cocktails', 'Breakfast menu'],
  },

  // --- Marine ---
  {
    id: 13, name: 'Turtle Sanctuary & Research Centre', category: 'marine',
    desc: 'A conservation centre protecting sea turtle nesting sites on the coast. Visit during nesting season to see green and hawksbill turtles.',
    rating: 4.9, reviews: 445, price: 500, priceLabel: 'LKR 500 entry',
    location: 'Kalkudah', lat: 7.9495, lng: 81.5595,
    tags: ['Turtles', 'Conservation', 'Education'],
    image: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=800&auto=format&fit=crop',
    openHours: '9:00 AM – 5:00 PM', distance: 2.9, featured: true,
    highlights: ['Nesting site visits', 'Conservation talks', 'Release ceremonies'],
  },
  {
    id: 14, name: 'Coral Restoration Project Site', category: 'marine',
    desc: 'An active coral gardening and restoration project. Join researcher-led snorkeling to see restored coral frames and learn about reef ecology.',
    rating: 4.8, reviews: 218, price: 3000, priceLabel: 'LKR 3,000/session',
    location: 'Pasikudah North', lat: 7.9355, lng: 81.5597,
    tags: ['Coral', 'Conservation', 'Research'],
    image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=800&auto=format&fit=crop',
    openHours: '8:00 AM – 12:00 PM', distance: 1.7, featured: false,
    highlights: ['Guided by researchers', 'Coral planting', 'Free-dive option'],
  },
];

const SPECIES_DATA = {
  fish: [
    { name: 'Parrotfish', scientific: 'Scaridae', desc: 'Vibrant blue-green fish that feed on coral polyps and sand', rarity: 'Common', color: '#00c8ff' },
    { name: 'Moorish Idol', scientific: 'Zanclus cornutus', desc: 'Distinctive black, white and yellow striped reef fish', rarity: 'Common', color: '#ffd700' },
    { name: 'Lionfish', scientific: 'Pterois miles', desc: 'Beautifully striped but venomous predator — observe from afar', rarity: 'Occasional', color: '#ff6b6b' },
    { name: 'Clownfish', scientific: 'Amphiprion bicinctus', desc: 'Orange-and-white fish living symbiotic with anemones', rarity: 'Common', color: '#ff8c00' },
    { name: 'Barracuda', scientific: 'Sphyraena barracuda', desc: 'Sleek open-water predator often seen near reef edges', rarity: 'Occasional', color: '#7c8a99' },
  ],
  coral: [
    { name: 'Staghorn Coral', scientific: 'Acropora cervicornis', desc: 'Fast-growing branching coral, critical reef-builder', rarity: 'Common', color: '#b0e0e6' },
    { name: 'Brain Coral', scientific: 'Diploria labyrinthiformis', desc: 'Massive rounded coral with characteristic groove pattern', rarity: 'Common', color: '#d2b48c' },
    { name: 'Mushroom Coral', scientific: 'Fungiidae', desc: 'Solitary free-living coral that resembles a mushroom cap', rarity: 'Occasional', color: '#90ee90' },
    { name: 'Table Coral', scientific: 'Acropora hyacinthus', desc: 'Flat plate-like formations providing shelter for reef fish', rarity: 'Common', color: '#87ceeb' },
  ],
  turtle: [
    { name: 'Green Sea Turtle', scientific: 'Chelonia mydas', desc: 'The most commonly sighted turtle; feeds on seagrass', rarity: 'Common', color: '#3cb371' },
    { name: 'Hawksbill Turtle', scientific: 'Eretmochelys imbricata', desc: 'Critically endangered; identified by narrow pointed beak', rarity: 'Rare', color: '#cd853f' },
    { name: 'Leatherback Turtle', scientific: 'Dermochelys coriacea', desc: 'World\'s largest turtle; rare offshore visitor', rarity: 'Very Rare', color: '#696969' },
  ],
  other: [
    { name: 'Octopus', scientific: 'Octopus vulgaris', desc: 'Intelligent camouflaging cephalopod found in rocky zones', rarity: 'Occasional', color: '#9370db' },
    { name: 'Starfish', scientific: 'Asteroidea', desc: 'Sea stars found resting on sandy bottoms and reef flats', rarity: 'Common', color: '#ff6347' },
    { name: 'Jellyfish', scientific: 'Medusozoa', desc: 'Seasonal visitors; admire from a safe distance', rarity: 'Seasonal', color: '#add8e6' },
    { name: 'Sea Cucumber', scientific: 'Holothuroidea', desc: 'Bottom-dwelling scavengers important to reef health', rarity: 'Common', color: '#8b4513' },
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
  visibleCount: 6,
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
      state.visibleCount = 6;
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
// PLACE MODAL
// -------------------------------------------------------
function openPlaceModal(place) {
  if (!place) return;
  state.currentModalPlace = place;
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
          <span class="modal-cat"><i class="fa-solid fa-${catIcon(place.category)}"></i> ${capitalize(place.category)}</span>
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

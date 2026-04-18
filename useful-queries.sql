-- ==========================================
-- COASTAL REGION DATABASE - COMPLETE SQL QUERIES
-- ==========================================
-- Comprehensive SQL queries for managing and analyzing your coastal database

USE coastal_region;

-- ==========================================
-- SECTION 1: BASIC DATA RETRIEVAL
-- ==========================================

-- 1.1 Get all places
SELECT * FROM places ORDER BY rating DESC;

-- 1.2 Get all species
SELECT * FROM species ORDER BY name ASC;

-- 1.3 Get recent sightings (last 20)
SELECT species, location, sighting_date, depth, count, notes
FROM sightings
ORDER BY created_at DESC
LIMIT 20;

-- 1.4 Get all conservation projects
SELECT name, status, location, start_date, end_date, budget
FROM conservation_projects
ORDER BY start_date DESC;

-- 1.5 Get latest environmental readings
SELECT * FROM environmental_data
ORDER BY recorded_at DESC
LIMIT 10;


-- ==========================================
-- SECTION 2: PLACES ANALYSIS
-- ==========================================

-- 2.1 Get places by category
SELECT category, COUNT(*) as place_count, AVG(rating) as avg_rating
FROM places
GROUP BY category
ORDER BY place_count DESC;

-- 2.2 Top 10 rated places
SELECT name, category, rating, visitor_count, best_time_to_visit
FROM places
WHERE rating > 0
ORDER BY rating DESC, visitor_count DESC
LIMIT 10;

-- 2.3 Most visited places
SELECT name, category, visitor_count, rating
FROM places
ORDER BY visitor_count DESC
LIMIT 10;

-- 2.4 Places needing reviews (no reviews yet)
SELECT p.name, p.category, p.rating
FROM places p
LEFT JOIN reviews r ON p.id = r.place_id
WHERE r.id IS NULL;

-- 2.5 Places with visitor count above average
SELECT name, visitor_count, rating
FROM places
WHERE visitor_count > (SELECT AVG(visitor_count) FROM places)
ORDER BY visitor_count DESC;


-- ==========================================
-- SECTION 3: SPECIES & BIODIVERSITY
-- ==========================================

-- 3.1 Species count by conservation status
SELECT conservation_status, COUNT(*) as species_count
FROM species
GROUP BY conservation_status
ORDER BY 
  FIELD(conservation_status, 'critically_endangered', 'endangered', 'vulnerable', 'near_threatened', 'least_concern');

-- 3.2 Species count by category
SELECT category, COUNT(*) as count
FROM species
GROUP BY category
ORDER BY count DESC;

-- 3.3 Endangered and critically endangered species
SELECT name, scientific_name, conservation_status, habitat
FROM species
WHERE conservation_status IN ('endangered', 'critically_endangered')
ORDER BY conservation_status, name;

-- 3.4 Most sighted species
SELECT species, COUNT(*) as sighting_count, SUM(count) as total_animals
FROM sightings
GROUP BY species
ORDER BY sighting_count DESC
LIMIT 10;

-- 3.5 Species sighting trends by month
SELECT 
  DATE_FORMAT(sighting_date, '%Y-%m') as month,
  species,
  COUNT(*) as sightings
FROM sightings
GROUP BY month, species
ORDER BY month DESC, sightings DESC;


-- ==========================================
-- SECTION 4: LOCATION ANALYSIS
-- ==========================================

-- 4.1 Biodiversity hotspots (most species diversity)
SELECT 
  location,
  COUNT(*) as total_sightings,
  COUNT(DISTINCT species) as unique_species,
  SUM(count) as total_animals
FROM sightings
GROUP BY location
ORDER BY unique_species DESC, total_sightings DESC
LIMIT 10;

-- 4.2 Recent activity by location
SELECT 
  location,
  COUNT(*) as recent_sightings,
  MAX(sighting_date) as last_sighting
FROM sightings
WHERE sighting_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
GROUP BY location
ORDER BY recent_sightings DESC;

-- 4.3 Location species diversity
SELECT 
  location,
  GROUP_CONCAT(DISTINCT species ORDER BY species SEPARATOR ', ') as species_found
FROM sightings
GROUP BY location;


-- ==========================================
-- SECTION 5: ENVIRONMENTAL MONITORING
-- ==========================================

-- 5.1 Latest conditions per location
SELECT 
  e1.location,
  e1.water_temperature,
  e1.air_temperature,
  e1.wave_height,
  e1.visibility,
  e1.weather_condition,
  e1.recorded_at
FROM environmental_data e1
INNER JOIN (
  SELECT location, MAX(recorded_at) as max_date
  FROM environmental_data
  GROUP BY location
) e2 ON e1.location = e2.location AND e1.recorded_at = e2.max_date
ORDER BY e1.location;

-- 5.2 Average conditions by location
SELECT 
  location,
  ROUND(AVG(water_temperature), 2) as avg_water_temp,
  ROUND(AVG(air_temperature), 2) as avg_air_temp,
  ROUND(AVG(wave_height), 2) as avg_wave_height,
  ROUND(AVG(visibility), 2) as avg_visibility,
  ROUND(AVG(wind_speed), 2) as avg_wind_speed,
  COUNT(*) as readings_count
FROM environmental_data
GROUP BY location
ORDER BY location;

-- 5.3 Best visibility conditions
SELECT location, visibility, weather_condition, recorded_at
FROM environmental_data
WHERE visibility >= 15
ORDER BY visibility DESC
LIMIT 10;


-- ==========================================
-- SECTION 6: CONSERVATION PROJECTS
-- ==========================================

-- 6.1 Active projects
SELECT name, location, coordinator, budget, participants_count
FROM conservation_projects
WHERE status = 'active'
ORDER BY budget DESC;

-- 6.2 Projects by status
SELECT status, COUNT(*) as project_count, SUM(budget) as total_budget
FROM conservation_projects
GROUP BY status;

-- 6.3 High-budget projects
SELECT name, status, budget, coordinator
FROM conservation_projects
WHERE budget > 30000
ORDER BY budget DESC;

-- 6.4 Projects with most participants
SELECT name, status, participants_count, coordinator
FROM conservation_projects
WHERE participants_count > 0
ORDER BY participants_count DESC;

-- 6.5 Upcoming project deadlines (next 90 days)
SELECT name, end_date, status, coordinator
FROM conservation_projects
WHERE end_date BETWEEN CURRENT_DATE AND DATE_ADD(CURRENT_DATE, INTERVAL 90 DAY)
ORDER BY end_date ASC;


-- ==========================================
-- SECTION 7: REVIEWS & RATINGS
-- ==========================================

-- 7.1 Average rating per place
SELECT 
  p.name,
  p.category,
  ROUND(AVG(r.rating), 2) as avg_rating,
  COUNT(r.id) as review_count
FROM places p
LEFT JOIN reviews r ON p.id = r.place_id
GROUP BY p.id, p.name, p.category
HAVING review_count > 0
ORDER BY avg_rating DESC;

-- 7.2 Recent reviews with user info
SELECT 
  r.rating,
  r.comment,
  r.visit_date,
  u.name as reviewer,
  p.name as place
FROM reviews r
JOIN users u ON r.user_id = u.id
JOIN places p ON r.place_id = p.id
ORDER BY r.created_at DESC
LIMIT 20;

-- 7.3 5-star reviews
SELECT 
  r.comment,
  r.visit_date,
  u.name as reviewer,
  p.name as place
FROM reviews r
JOIN users u ON r.user_id = u.id
JOIN places p ON r.place_id = p.id
WHERE r.rating = 5
ORDER BY r.created_at DESC;

-- 7.4 Places with low ratings (below 3.0)
SELECT 
  p.name,
  ROUND(AVG(r.rating), 2) as avg_rating,
  COUNT(r.id) as review_count
FROM places p
JOIN reviews r ON p.id = r.place_id
GROUP BY p.id, p.name
HAVING avg_rating < 3.0
ORDER BY avg_rating ASC;


-- ==========================================
-- SECTION 8: USER ACTIVITY
-- ==========================================

-- 8.1 Most active reviewers
SELECT 
  u.name,
  u.email,
  COUNT(r.id) as review_count,
  ROUND(AVG(r.rating), 2) as avg_rating_given
FROM users u
JOIN reviews r ON u.id = r.user_id
GROUP BY u.id, u.name, u.email
ORDER BY review_count DESC
LIMIT 10;

-- 8.2 Users with most favorites
SELECT 
  u.name,
  u.role,
  COUNT(f.id) as favorites_count
FROM users u
LEFT JOIN favorites f ON u.id = f.user_id
GROUP BY u.id, u.name, u.role
ORDER BY favorites_count DESC
LIMIT 10;

-- 8.3 New users (last 30 days)
SELECT name, email, role, created_at
FROM users
WHERE created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
ORDER BY created_at DESC;

-- 8.4 User role distribution
SELECT role, COUNT(*) as user_count
FROM users
GROUP BY role;


-- ==========================================
-- SECTION 9: TRIP PLANNING
-- ==========================================

-- 9.1 Upcoming trips
SELECT 
  trip_date,
  COUNT(*) as places_count,
  GROUP_CONCAT(place_name ORDER BY place_name SEPARATOR ', ') as places
FROM trip_items
WHERE trip_date >= CURRENT_DATE
GROUP BY trip_date
ORDER BY trip_date ASC;

-- 9.2 Most popular places in trips
SELECT 
  place_name,
  category,
  COUNT(*) as times_planned
FROM trip_items
GROUP BY place_name, category
ORDER BY times_planned DESC
LIMIT 10;

-- 9.3 Trips by month
SELECT 
  DATE_FORMAT(trip_date, '%Y-%m') as month,
  COUNT(*) as trip_count
FROM trip_items
WHERE trip_date >= CURRENT_DATE
GROUP BY month
ORDER BY month ASC;


-- ==========================================
-- SECTION 10: STATISTICS & REPORTS
-- ==========================================

-- 10.1 Complete database statistics
SELECT 
  (SELECT COUNT(*) FROM places) as total_places,
  (SELECT COUNT(*) FROM species) as total_species,
  (SELECT COUNT(*) FROM sightings) as total_sightings,
  (SELECT COUNT(*) FROM environmental_data) as total_env_records,
  (SELECT COUNT(*) FROM conservation_projects) as total_projects,
  (SELECT COUNT(*) FROM reviews) as total_reviews,
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM favorites) as total_favorites,
  (SELECT COUNT(*) FROM trip_items) as total_trip_items;

-- 10.2 Database size information
SELECT 
  table_name,
  table_rows,
  ROUND(((data_length + index_length) / 1024 / 1024), 2) as size_mb
FROM information_schema.tables
WHERE table_schema = 'coastal_region'
ORDER BY size_mb DESC;

-- 10.3 Monthly activity summary
SELECT 
  DATE_FORMAT(created_at, '%Y-%m') as month,
  COUNT(*) as new_sightings
FROM sightings
GROUP BY month
ORDER BY month DESC
LIMIT 12;


-- ==========================================
-- SECTION 11: DATA INSERTION EXAMPLES
-- ==========================================

-- 11.1 Add new place
INSERT INTO places (name, category, description, latitude, longitude, image_url, best_time_to_visit, facilities)
VALUES (
  'New Beach Location',
  'beach',
  'Beautiful pristine beach with clear waters',
  7.7500,
  81.8000,
  '/images/new-beach.jpg',
  'November to April',
  'Parking, Restrooms, Snacks'
);

-- 11.2 Add new species
INSERT INTO species (name, scientific_name, category, conservation_status, description, habitat, diet, size_range)
VALUES (
  'New Species',
  'Scientific Name',
  'fish',
  'least_concern',
  'Description of the species',
  'Coral reefs',
  'Small fish and crustaceans',
  '20-30 cm'
);

-- 11.3 Report new sighting
INSERT INTO sightings (species, location, sighting_date, depth, notes, count)
VALUES (
  'Green Sea Turtle',
  'Pasikudah Beach',
  '2026-04-20',
  3.5,
  'Spotted near coral reef',
  2
);

-- 11.4 Add environmental data
INSERT INTO environmental_data (location, water_temperature, air_temperature, wave_height, tide_level, visibility, wind_speed, weather_condition)
VALUES (
  'Pasikudah Beach',
  28.5,
  31.2,
  0.8,
  1.2,
  15.0,
  12.5,
  'Sunny'
);

-- 11.5 Create conservation project
INSERT INTO conservation_projects (name, description, location, start_date, end_date, status, coordinator, contact_email, budget)
VALUES (
  'New Conservation Project',
  'Project description here',
  'Location Name',
  '2026-05-01',
  '2027-04-30',
  'planned',
  'Coordinator Name',
  'email@example.com',
  25000.00
);


-- ==========================================
-- SECTION 12: DATA UPDATES
-- ==========================================

-- 12.1 Update place rating (auto-calculate from reviews)
UPDATE places p
SET p.rating = (
  SELECT ROUND(AVG(rating), 2)
  FROM reviews
  WHERE place_id = p.id
)
WHERE id = 1;

-- 12.2 Update visitor count
UPDATE places
SET visitor_count = visitor_count + 1
WHERE id = 1;

-- 12.3 Update project status
UPDATE conservation_projects
SET status = 'active'
WHERE id = 1;


-- ==========================================
-- SECTION 13: DATA DELETION
-- ==========================================

-- 13.1 Delete old environmental data (older than 1 year)
DELETE FROM environmental_data
WHERE recorded_at < DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR);

-- 13.2 Delete completed projects (older than 2 years)
DELETE FROM conservation_projects
WHERE status = 'completed' 
  AND end_date < DATE_SUB(CURRENT_DATE, INTERVAL 2 YEAR);

-- 13.3 Delete a specific review
DELETE FROM reviews
WHERE id = 1;


-- ==========================================
-- SECTION 14: ADVANCED QUERIES
-- ==========================================

-- 14.1 Places with their review statistics
SELECT 
  p.name,
  p.category,
  p.rating,
  p.visitor_count,
  COUNT(r.id) as total_reviews,
  ROUND(AVG(r.rating), 2) as avg_review_rating,
  MAX(r.created_at) as last_review_date
FROM places p
LEFT JOIN reviews r ON p.id = r.place_id
GROUP BY p.id, p.name, p.category, p.rating, p.visitor_count
ORDER BY p.rating DESC;

-- 14.2 Species sighting correlation with environmental conditions
SELECT 
  s.species,
  s.location,
  s.sighting_date,
  e.water_temperature,
  e.visibility,
  e.weather_condition
FROM sightings s
LEFT JOIN environmental_data e ON s.location = e.location
  AND s.sighting_date = DATE(e.recorded_at)
ORDER BY s.sighting_date DESC
LIMIT 20;

-- 14.3 Conservation impact analysis
SELECT 
  cp.name as project_name,
  cp.location,
  COUNT(s.id) as sightings_in_area,
  COUNT(DISTINCT s.species) as species_count
FROM conservation_projects cp
LEFT JOIN sightings s ON cp.location = s.location
  AND s.sighting_date BETWEEN cp.start_date AND cp.end_date
WHERE cp.status = 'active'
GROUP BY cp.id, cp.name, cp.location
ORDER BY species_count DESC;

-- 14.4 Best time to visit analysis
SELECT 
  best_time_to_visit,
  COUNT(*) as place_count,
  ROUND(AVG(rating), 2) as avg_rating
FROM places
WHERE best_time_to_visit IS NOT NULL
GROUP BY best_time_to_visit
ORDER BY place_count DESC;


-- ==========================================
-- SECTION 15: BACKUP & EXPORT
-- ==========================================

-- 15.1 Export all places as JSON-like format
SELECT 
  CONCAT(
    '{"name":"', name,
    '","category":"', category,
    '","rating":', rating,
    ',"visitors":', visitor_count,
    ',"location":[', latitude, ',', longitude, ']}'
  ) as json_record
FROM places;

-- 15.2 Generate summary report
SELECT 
  'PLACES' as category,
  COUNT(*) as total
FROM places
UNION ALL
SELECT 'SPECIES', COUNT(*) FROM species
UNION ALL
SELECT 'SIGHTINGS', COUNT(*) FROM sightings
UNION ALL
SELECT 'REVIEWS', COUNT(*) FROM reviews
UNION ALL
SELECT 'USERS', COUNT(*) FROM users
UNION ALL
SELECT 'PROJECTS', COUNT(*) FROM conservation_projects
ORDER BY category;


-- ==========================================
-- SECTION 16: MAINTENANCE QUERIES
-- ==========================================

-- 16.1 Check for duplicate reviews
SELECT user_id, place_id, COUNT(*) as duplicate_count
FROM reviews
GROUP BY user_id, place_id
HAVING duplicate_count > 1;

-- 16.2 Find orphaned records (favorites without valid users)
SELECT f.*
FROM favorites f
LEFT JOIN users u ON f.user_id = u.id
WHERE u.id IS NULL;

-- 16.3 Update all timestamps
UPDATE places
SET updated_at = CURRENT_TIMESTAMP
WHERE id > 0;


-- ==========================================
-- SECTION 17: SEARCH QUERIES
-- ==========================================

-- 17.1 Search places by name
SELECT name, category, rating, description
FROM places
WHERE name LIKE '%beach%'
   OR description LIKE '%beach%'
ORDER BY rating DESC;

-- 17.2 Search species by name or habitat
SELECT name, scientific_name, category, conservation_status
FROM species
WHERE name LIKE '%turtle%'
   OR habitat LIKE '%reef%'
ORDER BY name;

-- 17.3 Search conservation projects
SELECT name, status, description
FROM conservation_projects
WHERE name LIKE '%coral%'
   OR description LIKE '%coral%'
ORDER BY start_date DESC;

-- Active: 1776536731768@@127.0.0.1@3306
-- ==========================================
-- Coastal Region Explorer - Useful SQL Queries
-- ==========================================

-- 1. View All Places
SELECT * FROM places ORDER BY rating DESC;

-- 2. View Places by Category
SELECT * FROM places WHERE category = 'beach' ORDER BY rating DESC;
SELECT * FROM places WHERE category = 'restaurant' ORDER BY rating DESC;
SELECT * FROM places WHERE category = 'hotel' ORDER BY rating DESC;

-- 3. View All Species
SELECT * FROM species ORDER BY name ASC;

-- 4. View Endangered Species
SELECT * FROM species WHERE conservation_status IN ('endangered', 'critically_endangered', 'vulnerable');

-- 5. View Recent Sightings
SELECT * FROM sightings ORDER BY sighting_date DESC LIMIT 20;

-- 6. View Sightings by Location
SELECT species, location, sighting_date, count, notes 
FROM sightings 
WHERE location = 'Pasikudah' 
ORDER BY sighting_date DESC;

-- 7. View All Users
SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC;

-- 8. View User Favorites
SELECT u.name, u.email, p.name as place_name, p.category
FROM favorites f
JOIN users u ON f.user_id = u.id
JOIN places p ON f.place_id = p.id
ORDER BY u.name;

-- 9. View Reviews with Ratings
SELECT u.name as reviewer, p.name as place, r.rating, r.comment, r.visit_date
FROM reviews r
JOIN users u ON r.user_id = u.id
JOIN places p ON r.place_id = p.id
ORDER BY r.rating DESC;

-- 10. View Active Conservation Projects
SELECT * FROM conservation_projects 
WHERE status = 'active' 
ORDER BY start_date DESC;

-- 11. View Latest Environmental Data
SELECT * FROM environmental_data 
ORDER BY recorded_at DESC 
LIMIT 10;

-- 12. View Trip Items
SELECT * FROM trip_items ORDER BY trip_date ASC;

-- 13. Get Place Statistics
SELECT 
    p.name,
    p.category,
    p.rating,
    p.visitor_count,
    COUNT(DISTINCT r.id) as review_count,
    COUNT(DISTINCT f.id) as favorite_count
FROM places p
LEFT JOIN reviews r ON p.id = r.place_id
LEFT JOIN favorites f ON p.id = f.place_id
GROUP BY p.id
ORDER BY p.visitor_count DESC;

-- 14. Most Sighted Species
SELECT species, COUNT(*) as sighting_count, SUM(count) as total_count
FROM sightings
GROUP BY species
ORDER BY sighting_count DESC
LIMIT 10;

-- 15. Top Rated Places
SELECT name, category, rating, visitor_count, best_time_to_visit
FROM places
WHERE rating >= 4.0
ORDER BY rating DESC, visitor_count DESC;

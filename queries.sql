-- ============================================
-- Coastal Region Database - Useful Queries
-- Use with SQLTools extension in VS Code
-- ============================================

-- 1. View all tables in the database
SHOW TABLES;

-- 2. Check table structure
DESCRIBE sightings;
DESCRIBE trip_items;
DESCRIBE users;
DESCRIBE favorites;

-- ============================================
-- SIGHTINGS QUERIES
-- ============================================

-- 3. View all sightings
SELECT * FROM sightings ORDER BY created_at DESC;

-- 4. View recent sightings (last 10)
SELECT * FROM sightings ORDER BY created_at DESC LIMIT 10;

-- 5. Count sightings by species
SELECT species, COUNT(*) as count 
FROM sightings 
GROUP BY species 
ORDER BY count DESC;

-- 6. Count sightings by location
SELECT location, COUNT(*) as count 
FROM sightings 
GROUP BY location 
ORDER BY count DESC;

-- 7. Find sightings in date range
SELECT * FROM sightings 
WHERE sighting_date BETWEEN '2026-04-01' AND '2026-04-30'
ORDER BY sighting_date DESC;

-- 8. Search sightings by species name
SELECT * FROM sightings 
WHERE species LIKE '%turtle%'
ORDER created_at DESC;

-- 9. Insert a new sighting
INSERT INTO sightings (species, location, sighting_date, depth, notes, count) 
VALUES (
    'Green Sea Turtle',
    'Pasikudah North Reef',
    '2026-04-18',
    3.5,
    'Spotted near coral garden area',
    2
);

-- ============================================
-- TRIP ITEMS QUERIES
-- ============================================

-- 10. View all trip items
SELECT * FROM trip_items ORDER BY trip_date ASC;

-- 11. View trip items for specific date
SELECT * FROM trip_items 
WHERE trip_date = '2026-04-20'
ORDER BY created_at ASC;

-- 12. Count trip items by category
SELECT category, COUNT(*) as count 
FROM trip_items 
GROUP BY category;

-- 13. Insert a new trip item
INSERT INTO trip_items (place_id, place_name, category, trip_date, notes) 
VALUES (
    1,
    'Pasikudah Main Lagoon',
    'beach',
    '2026-04-20',
    'First day - beach exploration'
);

-- ============================================
-- USERS QUERIES
-- ============================================

-- 14. View all users
SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC;

-- 15. Count users by role
SELECT role, COUNT(*) as count 
FROM users 
GROUP BY role;

-- 16. Insert a new user (for testing)
INSERT INTO users (name, email, password, role) 
VALUES (
    'Test User',
    'test@example.com',
    'password123',
    'tourist'
);

-- ============================================
-- FAVORITES QUERIES
-- ============================================

-- 17. View all favorites with user details
SELECT f.id, u.name, f.place_id, f.created_at
FROM favorites f
JOIN users u ON f.user_id = u.id
ORDER BY f.created_at DESC;

-- 18. Get user's favorite places
SELECT f.place_id, u.name, u.email
FROM favorites f
JOIN users u ON f.user_id = u.id
WHERE u.id = 1;

-- 19. Insert a new favorite
INSERT INTO favorites (user_id, place_id) 
VALUES (1, 1);

-- ============================================
-- ANALYTICS QUERIES
-- ============================================

-- 20. Total sightings this month
SELECT COUNT(*) as total_sightings
FROM sightings 
WHERE MONTH(sighting_date) = MONTH(CURRENT_DATE())
AND YEAR(sighting_date) = YEAR(CURRENT_DATE());

-- 21. Most popular trip destinations
SELECT place_name, COUNT(*) as times_added
FROM trip_items
GROUP BY place_name
ORDER BY times_added DESC
LIMIT 10;

-- 22. Database statistics
SELECT 
    (SELECT COUNT(*) FROM sightings) as total_sightings,
    (SELECT COUNT(*) FROM trip_items) as total_trip_items,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM favorites) as total_favorites;

-- ============================================
-- MAINTENANCE QUERIES
-- ============================================

-- 23. Delete old sightings (older than 1 year)
-- WARNING: Review before running!
-- DELETE FROM sightings 
-- WHERE sighting_date < DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR);

-- 24. Clear all trip items
-- WARNING: This will delete all trip data!
-- DELETE FROM trip_items;

-- 25. Backup: Export all sightings
SELECT * FROM sightings 
INTO OUTFILE 'C:/Users/HP/OneDrive/Desktop/My project/backups/sightings_backup.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';

-- ============================================
-- TESTING CONNECTION
-- ============================================

-- Test if database is connected
SELECT 'Database Connected Successfully!' as Status;
SELECT NOW() as Current_Time;
SELECT DATABASE() as Current_Database;

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
  user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'coastal_region',
  port: process.env.DB_PORT || process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Database Connected Successfully');
    connection.release();
  } catch (error) {
    console.error('❌ MySQL Connection Error:', error.message);
    console.log('⚠️  The app will continue, but database features won\'t work until MySQL is configured');
  }
}

// Initialize Database Tables
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create sightings table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sightings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        species VARCHAR(100) NOT NULL,
        location VARCHAR(100) NOT NULL,
        sighting_date DATE NOT NULL,
        depth DECIMAL(5,2),
        notes TEXT,
        count INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Sightings table initialized');

    // Create trip_items table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS trip_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        place_id INT NOT NULL,
        place_name VARCHAR(200) NOT NULL,
        category VARCHAR(50),
        trip_date DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Trip items table initialized');

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('tourist', 'business', 'researcher') DEFAULT 'tourist',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table initialized');

    // Create favorites table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        place_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_place (user_id, place_id)
      )
    `);
    console.log('✅ Favorites table initialized');

    // Create places table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS places (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        category VARCHAR(50) NOT NULL,
        description TEXT,
        latitude DECIMAL(10, 8) NOT NULL,
        longitude DECIMAL(11, 8) NOT NULL,
        image_url VARCHAR(500),
        rating DECIMAL(3, 2) DEFAULT 0.00,
        visitor_count INT DEFAULT 0,
        best_time_to_visit VARCHAR(100),
        facilities TEXT
      )
    `);
    console.log('✅ Places table initialized');

    // Create species table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS species (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        scientific_name VARCHAR(150),
        category ENUM('fish', 'coral', 'turtle', 'mammal', 'bird', 'invertebrate', 'algae') NOT NULL,
        conservation_status ENUM('least_concern', 'near_threatened', 'vulnerable', 'endangered', 'critically_endangered') DEFAULT 'least_concern',
        description TEXT,
        image_url VARCHAR(500),
        habitat TEXT,
        diet TEXT,
        size_range VARCHAR(100)
      )
    `);
    console.log('✅ Species table initialized');

    // Create environmental_data table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS environmental_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        location VARCHAR(100) NOT NULL,
        water_temperature DECIMAL(5,2),
        air_temperature DECIMAL(5,2),
        wave_height DECIMAL(5,2),
        tide_level DECIMAL(5,2),
        visibility DECIMAL(5,2),
        wind_speed DECIMAL(5,2),
        weather_condition VARCHAR(50)
      )
    `);
    console.log('✅ Environmental data table initialized');

    // Create conservation_projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS conservation_projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        description TEXT,
        location VARCHAR(100),
        start_date DATE,
        end_date DATE,
        status ENUM('planned', 'active', 'completed', 'suspended') DEFAULT 'planned',
        coordinator VARCHAR(100),
        contact_email VARCHAR(150),
        budget DECIMAL(10,2),
        participants_count INT DEFAULT 0
      )
    `);
    console.log('✅ Conservation projects table initialized');

    // Create reviews table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        place_id INT NOT NULL,
        rating INT NOT NULL,
        comment TEXT,
        visit_date DATE,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_place_review (user_id, place_id)
      )
    `);
    console.log('✅ Reviews table initialized');

    connection.release();
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
  }
}

// ==========================================
// API ENDPOINTS
// ==========================================

// --- Sightings Endpoints ---

// Get all sightings
app.get('/api/sightings', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM sightings ORDER BY created_at DESC LIMIT 50'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create a new sighting
app.post('/api/sightings', async (req, res) => {
  try {
    const { species, location, sighting_date, depth, notes, count } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO sightings (species, location, sighting_date, depth, notes, count) VALUES (?, ?, ?, ?, ?, ?)',
      [species, location, sighting_date, depth || null, notes || '', count || 1]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Sighting reported successfully!',
      id: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get recent sightings (for display)
app.get('/api/sightings/recent', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM sightings ORDER BY created_at DESC LIMIT 10'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Trip Items Endpoints ---

// Get trip items
app.get('/api/trip-items', async (req, res) => {
  try {
    const { date } = req.query;
    let query = 'SELECT * FROM trip_items';
    const params = [];
    
    if (date) {
      query += ' WHERE trip_date = ?';
      params.push(date);
    }
    
    query += ' ORDER BY trip_date ASC, created_at ASC';
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add item to trip
app.post('/api/trip-items', async (req, res) => {
  try {
    const { place_id, place_name, category, trip_date, notes } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO trip_items (place_id, place_name, category, trip_date, notes) VALUES (?, ?, ?, ?, ?)',
      [place_id, place_name, category, trip_date || null, notes || '']
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Added to trip!',
      id: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete trip item
app.delete('/api/trip-items/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM trip_items WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Trip item removed' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Clear all trip items
app.delete('/api/trip-items', async (req, res) => {
  try {
    await pool.query('DELETE FROM trip_items');
    res.json({ success: true, message: 'All trip items cleared' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- User Endpoints ---

// Register user
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role || 'tourist']
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Account created successfully!',
      userId: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Login user
app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await pool.query(
      'SELECT id, name, email, role FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    res.json({ success: true, user: users[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Favorites Endpoints ---

// Get user favorites
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT place_id FROM favorites WHERE user_id = ?',
      [req.params.userId]
    );
    res.json({ success: true, data: rows.map(r => r.place_id) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add to favorites
app.post('/api/favorites', async (req, res) => {
  try {
    const { user_id, place_id } = req.body;
    
    await pool.query(
      'INSERT IGNORE INTO favorites (user_id, place_id) VALUES (?, ?)',
      [user_id, place_id]
    );
    
    res.json({ success: true, message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Remove from favorites
app.delete('/api/favorites/:userId/:placeId', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM favorites WHERE user_id = ? AND place_id = ?',
      [req.params.userId, req.params.placeId]
    );
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    // Return 200 even if database is down - server is still running
    res.json({ status: 'ok', database: 'disconnected', message: 'Server running, database connection pending' });
  }
});

// --- Places Endpoints ---

// Get all places
app.get('/api/places', async (req, res) => {
  try {
    const { category, min_rating } = req.query;
    let query = 'SELECT * FROM places';
    const params = [];
    
    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    if (min_rating) {
      query += category ? ' AND' : ' WHERE';
      query += ' rating >= ?';
      params.push(min_rating);
    }
    
    query += ' ORDER BY rating DESC, visitor_count DESC';
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single place
app.get('/api/places/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM places WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Place not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create place
app.post('/api/places', async (req, res) => {
  try {
    const { name, category, description, latitude, longitude, image_url, best_time_to_visit, facilities } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO places (name, category, description, latitude, longitude, image_url, best_time_to_visit, facilities) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, category, description, latitude, longitude, image_url, best_time_to_visit, facilities]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Place added successfully!',
      id: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update place visitor count
app.patch('/api/places/:id/visit', async (req, res) => {
  try {
    await pool.query(
      'UPDATE places SET visitor_count = visitor_count + 1 WHERE id = ?',
      [req.params.id]
    );
    res.json({ success: true, message: 'Visit recorded' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Species Endpoints ---

// Get all species
app.get('/api/species', async (req, res) => {
  try {
    const { category, conservation_status } = req.query;
    let query = 'SELECT * FROM species';
    const params = [];
    
    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    if (conservation_status) {
      query += category ? ' AND' : ' WHERE';
      query += ' conservation_status = ?';
      params.push(conservation_status);
    }
    
    query += ' ORDER BY name ASC';
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single species
app.get('/api/species/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM species WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Species not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Environmental Data Endpoints ---

// Get latest environmental data
app.get('/api/environmental', async (req, res) => {
  try {
    const { location } = req.query;
    let query = 'SELECT * FROM environmental_data';
    const params = [];
    
    if (location) {
      query += ' WHERE location = ?';
      params.push(location);
    }
    
    query += ' ORDER BY recorded_at DESC LIMIT 10';
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add environmental data
app.post('/api/environmental', async (req, res) => {
  try {
    const { location, water_temperature, air_temperature, wave_height, tide_level, visibility, wind_speed, weather_condition } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO environmental_data (location, water_temperature, air_temperature, wave_height, tide_level, visibility, wind_speed, weather_condition) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [location, water_temperature, air_temperature, wave_height, tide_level, visibility, wind_speed, weather_condition]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Environmental data recorded!',
      id: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Conservation Projects Endpoints ---

// Get all conservation projects
app.get('/api/conservation', async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM conservation_projects';
    const params = [];
    
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY start_date DESC';
    
    const [rows] = await pool.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create conservation project
app.post('/api/conservation', async (req, res) => {
  try {
    const { name, description, location, start_date, end_date, coordinator, contact_email, budget } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO conservation_projects (name, description, location, start_date, end_date, coordinator, contact_email, budget) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, location, start_date, end_date, coordinator, contact_email, budget]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Conservation project created!',
      id: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update project status
app.patch('/api/conservation/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query(
      'UPDATE conservation_projects SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ success: true, message: 'Project status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// --- Reviews Endpoints ---

// Get reviews for a place
app.get('/api/reviews/:placeId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT r.*, u.name as user_name FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.place_id = ? ORDER BY r.created_at DESC',
      [req.params.placeId]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add review
app.post('/api/reviews', async (req, res) => {
  try {
    const { user_id, place_id, rating, comment, visit_date } = req.body;
    
    const [result] = await pool.query(
      'INSERT INTO reviews (user_id, place_id, rating, comment, visit_date) VALUES (?, ?, ?, ?, ?)',
      [user_id, place_id, rating, comment, visit_date]
    );
    
    // Update place rating
    const [avgResult] = await pool.query(
      'SELECT AVG(rating) as avg_rating FROM reviews WHERE place_id = ?',
      [place_id]
    );
    
    await pool.query(
      'UPDATE places SET rating = ? WHERE id = ?',
      [avgResult[0].avg_rating, place_id]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Review added successfully!',
      id: result.insertId 
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, error: 'You have already reviewed this place' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update review
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const [result] = await pool.query(
      'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
      [rating, comment, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }
    
    res.json({ success: true, message: 'Review updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM reviews WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start Server
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '0.0.0.0';
app.listen(PORT, HOST, async () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 API available at /api\n`);
  
  // Initialize database in background (don't block server startup)
  try {
    await testConnection();
    await initializeDatabase();
  } catch (error) {
    console.error('⚠️  Database initialization warning:', error.message);
    console.log('Server will continue running. Database features may not work until connection is established.');
  }
});

module.exports = app;

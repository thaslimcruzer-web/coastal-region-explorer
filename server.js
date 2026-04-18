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
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'coastal_region',
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
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// Start Server
app.listen(PORT, async () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api\n`);
  
  await testConnection();
  await initializeDatabase();
});

module.exports = app;

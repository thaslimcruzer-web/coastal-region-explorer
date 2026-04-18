// Fixed Database Module - Ensures Active Connection
const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
  constructor() {
    this.pool = null;
    this.isConnected = false;
  }

  // Initialize connection pool with retry logic
  async connect() {
    if (this.isConnected && this.pool) {
      console.log('✅ Using existing database connection');
      return true;
    }

    try {
      console.log('📡 Connecting to MySQL database...');
      
      this.pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'coastal_region',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        acquireTimeout: 60000,
        timeout: 60000,
        reconnect: true
      });

      // Test the connection
      const connection = await this.pool.getConnection();
      console.log('✅ MySQL Database Connected Successfully');
      console.log(`📊 Database: ${process.env.DB_NAME}`);
      connection.release();
      
      this.isConnected = true;
      return true;
    } catch (error) {
      console.error('❌ Database connection failed:', error.message);
      this.isConnected = false;
      
      console.log('\n💡 Troubleshooting:');
      console.log('1. Check if MySQL is running: net start MySQL80');
      console.log('2. Verify .env file has correct credentials');
      console.log('3. Test connection: node test-mysql-connection.js\n');
      
      return false;
    }
  }

  // Ensure connection is active before any query
  async ensureConnection() {
    if (!this.isConnected || !this.pool) {
      console.log('⚠️  No active connection, connecting...');
      return await this.connect();
    }
    
    // Test if connection is still alive
    try {
      const connection = await this.pool.getConnection();
      connection.release();
      return true;
    } catch (error) {
      console.log('⚠️  Connection lost, reconnecting...');
      this.isConnected = false;
      return await this.connect();
    }
  }

  // Generic query method with connection check
  async query(sql, params = []) {
    const connected = await this.ensureConnection();
    if (!connected) {
      throw new Error('No active database connection');
    }
    
    try {
      const [rows] = await this.pool.query(sql, params);
      return rows;
    } catch (error) {
      console.error('❌ Query error:', error.message);
      throw error;
    }
  }

  // ==========================================
  // PLACES OPERATIONS
  // ==========================================

  async getAllPlaces(filters = {}) {
    try {
      let query = 'SELECT * FROM places';
      const params = [];
      const conditions = [];

      if (filters.category) {
        conditions.push('category = ?');
        params.push(filters.category);
      }

      if (filters.min_rating) {
        conditions.push('rating >= ?');
        params.push(filters.min_rating);
      }

      if (filters.search) {
        conditions.push('(name LIKE ? OR description LIKE ?)');
        params.push(`%${filters.search}%`, `%${filters.search}%`);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY rating DESC, visitor_count DESC';

      if (filters.limit) {
        query += ' LIMIT ?';
        params.push(filters.limit);
      }

      const rows = await this.query(query, params);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getPlaceById(id) {
    try {
      const rows = await this.query('SELECT * FROM places WHERE id = ?', [id]);
      if (rows.length === 0) {
        return { success: false, error: 'Place not found' };
      }
      return { success: true, data: rows[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createPlace(placeData) {
    try {
      const { name, category, description, latitude, longitude, image_url, best_time_to_visit, facilities } = placeData;
      
      const result = await this.query(
        `INSERT INTO places (name, category, description, latitude, longitude, image_url, best_time_to_visit, facilities) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, category, description, latitude, longitude, image_url, best_time_to_visit, facilities]
      );
      
      return { success: true, id: result.insertId, message: 'Place created successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updatePlace(id, placeData) {
    try {
      const fields = [];
      const params = [];

      for (const [key, value] of Object.entries(placeData)) {
        if (value !== undefined) {
          fields.push(`${key} = ?`);
          params.push(value);
        }
      }

      if (fields.length === 0) {
        return { success: false, error: 'No fields to update' };
      }

      params.push(id);
      const query = `UPDATE places SET ${fields.join(', ')} WHERE id = ?`;
      
      await this.query(query, params);
      return { success: true, message: 'Place updated successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deletePlace(id) {
    try {
      await this.query('DELETE FROM places WHERE id = ?', [id]);
      return { success: true, message: 'Place deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async incrementVisitorCount(id) {
    try {
      await this.query('UPDATE places SET visitor_count = visitor_count + 1 WHERE id = ?', [id]);
      return { success: true, message: 'Visitor count incremented' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // SPECIES OPERATIONS
  // ==========================================

  async getAllSpecies(filters = {}) {
    try {
      let query = 'SELECT * FROM species';
      const params = [];
      const conditions = [];

      if (filters.category) {
        conditions.push('category = ?');
        params.push(filters.category);
      }

      if (filters.conservation_status) {
        conditions.push('conservation_status = ?');
        params.push(filters.conservation_status);
      }

      if (filters.search) {
        conditions.push('(name LIKE ? OR scientific_name LIKE ?)');
        params.push(`%${filters.search}%`, `%${filters.search}%`);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY name ASC';

      const rows = await this.query(query, params);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getSpeciesById(id) {
    try {
      const rows = await this.query('SELECT * FROM species WHERE id = ?', [id]);
      if (rows.length === 0) {
        return { success: false, error: 'Species not found' };
      }
      return { success: true, data: rows[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // SIGHTINGS OPERATIONS
  // ==========================================

  async getAllSightings(limit = 50) {
    try {
      const rows = await this.query(
        'SELECT * FROM sightings ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getRecentSightings(limit = 10) {
    try {
      const rows = await this.query(
        'SELECT * FROM sightings ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async createSighting(sightingData) {
    try {
      const { species, location, sighting_date, depth, notes, count } = sightingData;
      
      const result = await this.query(
        `INSERT INTO sightings (species, location, sighting_date, depth, notes, count) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [species, location, sighting_date, depth, notes || '', count || 1]
      );
      
      return { success: true, id: result.insertId, message: 'Sighting reported successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // ENVIRONMENTAL DATA OPERATIONS
  // ==========================================

  async getEnvironmentalData(location = null) {
    try {
      let query = 'SELECT * FROM environmental_data';
      const params = [];

      if (location) {
        query += ' WHERE location = ?';
        params.push(location);
      }

      query += ' ORDER BY recorded_at DESC LIMIT 10';

      const rows = await this.query(query, params);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getLatestEnvironmentalData() {
    try {
      const rows = await this.query(`
        SELECT e1.* 
        FROM environmental_data e1
        INNER JOIN (
          SELECT location, MAX(recorded_at) as max_date
          FROM environmental_data
          GROUP BY location
        ) e2 ON e1.location = e2.location AND e1.recorded_at = e2.max_date
        ORDER BY e1.location
      `);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addEnvironmentalData(data) {
    try {
      const { location, water_temperature, air_temperature, wave_height, tide_level, visibility, wind_speed, weather_condition } = data;
      
      const result = await this.query(
        `INSERT INTO environmental_data (location, water_temperature, air_temperature, wave_height, tide_level, visibility, wind_speed, weather_condition) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [location, water_temperature, air_temperature, wave_height, tide_level, visibility, wind_speed, weather_condition]
      );
      
      return { success: true, id: result.insertId, message: 'Environmental data recorded' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // CONSERVATION PROJECTS OPERATIONS
  // ==========================================

  async getAllProjects(status = null) {
    try {
      let query = 'SELECT * FROM conservation_projects';
      const params = [];

      if (status) {
        query += ' WHERE status = ?';
        params.push(status);
      }

      query += ' ORDER BY start_date DESC';

      const rows = await this.query(query, params);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // REVIEWS OPERATIONS
  // ==========================================

  async getPlaceReviews(placeId) {
    try {
      const rows = await this.query(
        `SELECT r.*, u.name as user_name 
         FROM reviews r 
         JOIN users u ON r.user_id = u.id 
         WHERE r.place_id = ? 
         ORDER BY r.created_at DESC`,
        [placeId]
      );
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addReview(reviewData) {
    try {
      const { user_id, place_id, rating, comment, visit_date } = reviewData;
      
      const result = await this.query(
        `INSERT INTO reviews (user_id, place_id, rating, comment, visit_date) 
         VALUES (?, ?, ?, ?, ?)`,
        [user_id, place_id, rating, comment, visit_date]
      );
      
      // Update place average rating
      const avgResult = await this.query(
        'SELECT AVG(rating) as avg_rating FROM reviews WHERE place_id = ?',
        [place_id]
      );
      
      await this.query(
        'UPDATE places SET rating = ? WHERE id = ?',
        [avgResult[0].avg_rating, place_id]
      );
      
      return { success: true, id: result.insertId, message: 'Review added successfully' };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return { success: false, error: 'You have already reviewed this place' };
      }
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // USERS OPERATIONS
  // ==========================================

  async registerUser(userData) {
    try {
      const { name, email, password, role } = userData;
      
      // Check if user exists
      const existing = await this.query('SELECT id FROM users WHERE email = ?', [email]);
      if (existing.length > 0) {
        return { success: false, error: 'Email already registered' };
      }
      
      const result = await this.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, password, role || 'tourist']
      );
      
      return { success: true, userId: result.insertId, message: 'User registered successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async loginUser(email, password) {
    try {
      const users = await this.query(
        'SELECT id, name, email, role FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
      
      if (users.length === 0) {
        return { success: false, error: 'Invalid credentials' };
      }
      
      return { success: true, user: users[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // FAVORITES OPERATIONS
  // ==========================================

  async getUserFavorites(userId) {
    try {
      const rows = await this.query(
        'SELECT place_id FROM favorites WHERE user_id = ?',
        [userId]
      );
      return { success: true, data: rows.map(r => r.place_id) };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addToFavorites(userId, placeId) {
    try {
      await this.query(
        'INSERT IGNORE INTO favorites (user_id, place_id) VALUES (?, ?)',
        [userId, placeId]
      );
      return { success: true, message: 'Added to favorites' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async removeFromFavorites(userId, placeId) {
    try {
      await this.query(
        'DELETE FROM favorites WHERE user_id = ? AND place_id = ?',
        [userId, placeId]
      );
      return { success: true, message: 'Removed from favorites' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // TRIP ITEMS OPERATIONS
  // ==========================================

  async getTripItems(date = null) {
    try {
      let query = 'SELECT * FROM trip_items';
      const params = [];

      if (date) {
        query += ' WHERE trip_date = ?';
        params.push(date);
      }

      query += ' ORDER BY trip_date ASC, created_at ASC';

      const rows = await this.query(query, params);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async addTripItem(itemData) {
    try {
      const { place_id, place_name, category, trip_date, notes } = itemData;
      
      const result = await this.query(
        'INSERT INTO trip_items (place_id, place_name, category, trip_date, notes) VALUES (?, ?, ?, ?, ?)',
        [place_id, place_name, category, trip_date, notes || '']
      );
      
      return { success: true, id: result.insertId, message: 'Added to trip' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteTripItem(id) {
    try {
      await this.query('DELETE FROM trip_items WHERE id = ?', [id]);
      return { success: true, message: 'Trip item removed' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // ==========================================
  // STATISTICS & ANALYTICS
  // ==========================================

  async getDatabaseStats() {
    try {
      const stats = await this.query(`
        SELECT 
          (SELECT COUNT(*) FROM places) as total_places,
          (SELECT COUNT(*) FROM species) as total_species,
          (SELECT COUNT(*) FROM sightings) as total_sightings,
          (SELECT COUNT(*) FROM environmental_data) as total_env_records,
          (SELECT COUNT(*) FROM conservation_projects) as total_projects,
          (SELECT COUNT(*) FROM reviews) as total_reviews,
          (SELECT COUNT(*) FROM users) as total_users,
          (SELECT COUNT(*) FROM favorites) as total_favorites,
          (SELECT COUNT(*) FROM trip_items) as total_trip_items
      `);
      return { success: true, data: stats[0] };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getBiodiversityHotspots() {
    try {
      const rows = await this.query(`
        SELECT 
          location,
          COUNT(*) as total_sightings,
          COUNT(DISTINCT species) as unique_species,
          SUM(count) as total_animals
        FROM sightings
        GROUP BY location
        ORDER BY unique_species DESC, total_sightings DESC
        LIMIT 10
      `);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getTopRatedPlaces() {
    try {
      const rows = await this.query(`
        SELECT name, category, rating, visitor_count
        FROM places
        WHERE rating > 0
        ORDER BY rating DESC, visitor_count DESC
        LIMIT 10
      `);
      return { success: true, data: rows };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Close connection pool
  async disconnect() {
    if (this.pool) {
      await this.pool.end();
      this.isConnected = false;
      console.log('✅ Database connection closed');
    }
  }
}

module.exports = Database;

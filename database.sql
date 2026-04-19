-- Coastal Region Database Schema
-- This file contains all table definitions and sample data
-- Note: The database should already be created before running this file

-- Create sightings table
CREATE TABLE IF NOT EXISTS sightings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  species VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  sighting_date DATE NOT NULL,
  depth DECIMAL(5,2),
  temperature DECIMAL(5,2),
  notes TEXT,
  count INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create trip_items table
CREATE TABLE IF NOT EXISTS trip_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id INT NOT NULL,
  place_name VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  trip_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('tourist', 'business', 'researcher') DEFAULT 'tourist',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  place_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_place (user_id, place_id)
);

-- Create places table
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
);

-- Create species table
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
);

-- Create environmental_data table
CREATE TABLE IF NOT EXISTS environmental_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  location VARCHAR(100) NOT NULL,
  water_temperature DECIMAL(5,2),
  air_temperature DECIMAL(5,2),
  wave_height DECIMAL(5,2),
  tide_level DECIMAL(5,2),
  visibility DECIMAL(5,2),
  wind_speed DECIMAL(5,2),
  weather_condition VARCHAR(50),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create conservation_projects table
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
  participants_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  place_id INT NOT NULL,
  rating INT NOT NULL,
  comment TEXT,
  visit_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_place_review (user_id, place_id)
);

-- Insert sample places data
INSERT INTO places (name, category, latitude, longitude, rating, description, visitor_count, best_time_to_visit) VALUES
('Pasikudah Beach', 'Beach', 7.9167, 81.8167, 4.8, 'Beautiful bay with calm waters and white sand', 1250, 'November to April'),
('Kalkudah Beach', 'Beach', 7.9333, 81.8333, 4.7, 'Pristine beach perfect for swimming', 980, 'November to April'),
('Valaichcheni Harbor', 'Harbor', 7.9500, 81.8500, 4.5, 'Fishing harbor with fresh seafood', 650, 'Year-round'),
('Pasikudah Lagoon', 'Lagoon', 7.9200, 81.8200, 4.6, 'Shallow lagoon ideal for water sports', 720, 'November to April')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample species data
INSERT INTO species (name, scientific_name, category, conservation_status, description) VALUES
('Green Sea Turtle', 'Chelonia mydas', 'turtle', 'endangered', 'Commonly spotted in coastal waters'),
('Clownfish', 'Amphiprioninae', 'fish', 'least_concern', 'Colorful fish found in coral reefs'),
('Parrotfish', 'Scaridae', 'fish', 'least_concern', 'Important for coral reef health'),
('Barracuda', 'Sphyraena', 'fish', 'least_concern', 'Large predatory fish')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample environmental data
INSERT INTO environmental_data (location, water_temperature, air_temperature, wind_speed, wave_height, visibility, weather_condition) VALUES
('Pasikudah', 28.5, 30.2, 12.3, 1.2, 15.5, 'Sunny'),
('Kalkudah', 28.3, 30.0, 11.8, 1.1, 16.0, 'Partly Cloudy')
ON DUPLICATE KEY UPDATE location=location;

-- Insert sample conservation projects
INSERT INTO conservation_projects (name, description, location, start_date, end_date, status, coordinator, contact_email, budget) VALUES
('Coral Reef Restoration', 'Restoring damaged coral reefs in Pasikudah bay', 'Pasikudah', '2024-01-15', '2025-12-31', 'active', 'Marine Conservation Team', 'coral@conservation.org', 50000.00),
('Sea Turtle Protection', 'Protecting nesting sites and monitoring turtle populations', 'Kalkudah', '2024-03-01', '2025-02-28', 'active', 'Wildlife Protection Unit', 'turtles@conservation.org', 35000.00)
ON DUPLICATE KEY UPDATE name=name;

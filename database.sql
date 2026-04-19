-- Coastal Region Database Schema
-- This file contains all table definitions and sample data

-- Use the database
USE coastal_region;

-- Create sightings table
CREATE TABLE IF NOT EXISTS sightings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  species VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  sighting_date DATE NOT NULL,
  depth DECIMAL(5,2),
  temperature DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trip_items table
CREATE TABLE IF NOT EXISTS trip_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  price DECIMAL(10,2),
  duration VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  place_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create places table
CREATE TABLE IF NOT EXISTS places (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rating DECIMAL(3,2),
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create species table
CREATE TABLE IF NOT EXISTS species (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  scientific_name VARCHAR(150),
  category VARCHAR(50),
  conservation_status VARCHAR(50),
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create environmental_data table
CREATE TABLE IF NOT EXISTS environmental_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  location VARCHAR(100) NOT NULL,
  temperature DECIMAL(5,2),
  humidity DECIMAL(5,2),
  wind_speed DECIMAL(5,2),
  wave_height DECIMAL(5,2),
  tide_level VARCHAR(50),
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create conservation_projects table
CREATE TABLE IF NOT EXISTS conservation_projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  location VARCHAR(100),
  status VARCHAR(50),
  start_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  place_id INT,
  rating INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample places data
INSERT INTO places (name, category, latitude, longitude, rating, description) VALUES
('Pasikudah Beach', 'Beach', 7.9167, 81.8167, 4.8, 'Beautiful bay with calm waters and white sand'),
('Kalkudah Beach', 'Beach', 7.9333, 81.8333, 4.7, 'Pristine beach perfect for swimming'),
('Valaichcheni Harbor', 'Harbor', 7.9500, 81.8500, 4.5, 'Fishing harbor with fresh seafood'),
('Pasikudah Lagoon', 'Lagoon', 7.9200, 81.8200, 4.6, 'Shallow lagoon ideal for water sports')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample species data
INSERT INTO species (name, scientific_name, category, conservation_status, description) VALUES
('Green Sea Turtle', 'Chelonia mydas', 'Reptile', 'Endangered', 'Commonly spotted in coastal waters'),
('Clownfish', 'Amphiprioninae', 'Fish', 'Least Concern', 'Colorful fish found in coral reefs'),
('Parrotfish', 'Scaridae', 'Fish', 'Least Concern', 'Important for coral reef health'),
('Barracuda', 'Sphyraena', 'Fish', 'Least Concern', 'Large predatory fish')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample environmental data
INSERT INTO environmental_data (location, temperature, humidity, wind_speed, wave_height, tide_level) VALUES
('Pasikudah', 28.5, 75.2, 12.3, 1.2, 'High'),
('Kalkudah', 28.3, 76.1, 11.8, 1.1, 'Medium')
ON DUPLICATE KEY UPDATE location=location;

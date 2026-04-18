-- Coastal Region Database Setup
-- Run this script in MySQL to create the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS coastal_region CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the database
USE coastal_region;

-- Sightings table for biodiversity reports
CREATE TABLE IF NOT EXISTS sightings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  species VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  sighting_date DATE NOT NULL,
  depth DECIMAL(5,2),
  notes TEXT,
  count INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_species (species),
  INDEX idx_location (location),
  INDEX idx_date (sighting_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Trip items for itinerary planning
CREATE TABLE IF NOT EXISTS trip_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  place_id INT NOT NULL,
  place_name VARCHAR(200) NOT NULL,
  category VARCHAR(50),
  trip_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_place_id (place_id),
  INDEX idx_trip_date (trip_date),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('tourist', 'business', 'researcher') DEFAULT 'tourist',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Favorites table for user preferences
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  place_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_place (user_id, place_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample sightings data
INSERT INTO sightings (species, location, sighting_date, depth, notes, count) VALUES
('Green Sea Turtle', 'Pasikudah North Reef', '2026-04-15', 3.5, 'Spotted near coral garden', 2),
('Parrotfish', 'Kalkudah Main Beach', '2026-04-16', 2.0, 'Feeding on coral polyps', 5),
('Clownfish', 'Pasikudah Bay', '2026-04-17', 1.5, 'Found in anemone', 3),
('Hawksbill Turtle', 'Kalkudah Coral Garden', '2026-04-17', 4.0, 'Rare sighting near reef edge', 1),
('Lionfish', 'Passikudam North Reef', '2026-04-18', 5.5, 'Venomous species observed', 1);

-- Show tables
SHOW TABLES;

-- Display sample data
SELECT * FROM sightings ORDER BY created_at DESC LIMIT 5;

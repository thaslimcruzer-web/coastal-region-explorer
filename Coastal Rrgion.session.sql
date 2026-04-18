CREATE DATABASE IF NOT EXISTS coastal_region CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE coastal_region;

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
  facilities TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_location (latitude, longitude)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  size_range VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_status (conservation_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_location (location),
  INDEX idx_recorded_at (recorded_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('tourist', 'business', INSERT INTO users (
      id,
      name,
      email,
      password,
      role,
      created_at,
      updated_at
    )
  VALUES (
      id:intINSERT INTO users (
          id,
          userINSERT INTO users (
              id,
              name,
              email,
              password,
              role,
              created_at,
              updated_at
            )
          VALUES (
              id:int,
              'username:varchar',
              'email:varchar',
              'password:varchar',
              'role:enum',
              'created_at:timestamp',
              'updated_at:timestamp'
            );name,
          email,
          password,
          role,
          created_at,
          updated_at
        )
      VALUES (
          id:int,
          'name:varchar',
          'email:varchar',
          'password:varchar',
          'role:enum',
          'created_at:timestamp',
          'updated_at:timestamp'
        );,
      'name:varchar',
      'email:varchar',
      'password:varchar',
      'role:enum',
      'created_at:timestamp',
      'updated_at:timestamp'
    );'researcher') DEFAULT 'tourist',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  place_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_place (user_id, place_id),
  INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  place_id INT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  visit_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_place_id (place_id),
  INDEX idx_rating (rating),
  UNIQUE KEY unique_user_place_review (user_id, place_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



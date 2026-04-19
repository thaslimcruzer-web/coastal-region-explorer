#!/usr/bin/env node

/**
 * Railway Startup Script
 * This script ensures database is ready before starting the server
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('\n🚀 Starting Coastal Region Explorer on Railway...\n');

// Check if database.sql exists
if (!fs.existsSync('database.sql')) {
  console.error('❌ database.sql not found!');
  process.exit(1);
}

// Try to run setup-db.js, but don't fail if it errors (tables might already exist)
console.log('📦 Setting up database (if needed)...');
try {
  execSync('node setup-db.js', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  console.log('\n✅ Database setup complete!\n');
} catch (error) {
  console.log('\n⚠️  Database setup had issues (this is okay if tables already exist)');
  console.log('   Continuing with server startup...\n');
}

// Start the main server
console.log('🌐 Starting server...\n');
execSync('node server.js', { 
  stdio: 'inherit',
  env: { ...process.env }
});

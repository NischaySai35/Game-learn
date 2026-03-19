#!/usr/bin/env node

/**
 * Setup Script for Game-Learn Project
 * 
 * This script runs automatically when developers install dependencies
 * It ensures all necessary directories are created for the project
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_DIRS = [
  'mongodb-data',
  'backend/logs',
  'frontend/dist'
];

console.log('🔧 Setting up Game-Learn project...\n');

REQUIRED_DIRS.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  } else {
    console.log(`✓ Directory exists: ${dir}`);
  }
});

// Create .env files if they don't exist (from templates)
const envFiles = [
  { src: '.env.example', dest: 'backend/.env.local' },
  { src: 'frontend/.env.example', dest: 'frontend/.env.local' }
];

envFiles.forEach(({ src, dest }) => {
  const srcPath = path.join(__dirname, '..', src);
  const destPath = path.join(__dirname, '..', dest);
  
  // Only copy if destination doesn't exist
  if (!fs.existsSync(destPath) && fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Created: ${dest} (from template)`);
  }
});

console.log('\n✨ Setup complete! Your project is ready to run.');
console.log('\nTo start development, run:');
console.log('  npm run dev\n');

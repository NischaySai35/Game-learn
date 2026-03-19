#!/bin/bash

# Game-Learn Development Startup Script for macOS/Linux
# This script helps start the entire application

echo ""
echo "===================================="
echo "  Game-Learn Development Startup"
echo "===================================="
echo ""

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB not found!"
    echo "Please install MongoDB from: https://www.mongodb.com/try/download/community"
    echo ""
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found!"
    echo "Please install Node.js from: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js found:"
node --version

echo "✅ MongoDB found:"
mongod --version

echo ""
echo "Starting MongoDB..."
mkdir -p ./mongodb-data
mongod --dbpath ./mongodb-data --logpath ./mongodb.log &
MONGO_PID=$!
sleep 2

echo "✅ MongoDB started (PID: $MONGO_PID)"
echo ""
echo "Starting Game-Learn development server..."
echo ""
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo ""

npm run dev

# Cleanup: Kill MongoDB when dev server stops
kill $MONGO_PID 2>/dev/null

echo ""
echo "Application stopped."

@echo off
REM Game-Learn Development Startup Script for Windows
REM This script helps start the entire application

echo.
echo ====================================
echo  Game-Learn Development Startup
echo ====================================
echo.

REM Check if MongoDB is installed
where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ MongoDB not found!
    echo Please install MongoDB from: https://www.mongodb.com/try/download/community
    echo.
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ❌ Node.js not found!
    echo Please install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version

echo ✅ MongoDB found:
mongod --version

echo.
echo Starting MongoDB...
start "MongoDB" mongod --dbpath "mongodb-data" --logpath "mongodb.log"
timeout /t 2

echo ✅ MongoDB started

echo.
echo Starting Game-Learn development server...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.

npm run dev

pause

@echo off
REM Bio-Digital System - Setup Script for Windows
REM Run this to get everything started!

setlocal enabledelayedexpansion

echo.
echo ========================================================================
echo   Bio-Digital System Full-Stack Setup
echo ========================================================================
echo.

REM Check if we're in the right directory
if not exist "README.md" (
    echo ERROR: Please run this script from the bio-digital-fullstack directory
    pause
    exit /b 1
)

echo.
echo [1] Installing Frontend Dependencies
echo ========================================================================
cd frontend
call npm install
if %errorlevel% equ 0 (
    echo.
    echo SUCCESS: Frontend dependencies installed
) else (
    echo.
    echo WARNING: Frontend installation had issues
)
cd ..
echo.

echo [2] Installing Backend Dependencies
echo ========================================================================
cd backend
call npm install
if %errorlevel% equ 0 (
    echo.
    echo SUCCESS: Backend dependencies installed
) else (
    echo.
    echo WARNING: Backend installation had issues
)
cd ..
echo.

echo.
echo ========================================================================
echo   SUCCESS: Setup Complete!
echo ========================================================================
echo.
echo Next Steps:
echo.
echo 1. Start MongoDB:
echo    mongod
echo    OR
echo    docker run -d -p 27017:27017 --name mongodb mongo:latest
echo.
echo 2. Open 3 Command Prompts and run:
echo.
echo    CMD 1 - Backend:
echo    cd backend
echo    npm run dev
echo.
echo    CMD 2 - Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo    CMD 3 - MongoDB:
echo    mongod
echo.
echo 3. Visit http://localhost:3000 in your browser
echo.
echo ========================================================================
echo   OR use Docker Compose (requires Docker):
echo ========================================================================
echo.
echo    docker-compose up -d
echo.
echo ========================================================================
echo   See README.md for more information
echo ========================================================================
echo.

pause

@echo off
echo ========================================
echo Railway Deployment Script
echo ========================================
echo.

REM Check if Railway CLI is installed
where railway >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Railway CLI not found!
    echo.
    echo Please install Railway CLI:
    echo   npm i -g @railway/cli
    echo.
    echo Or deploy via GitHub:
    echo   1. Push changes to GitHub
    echo   2. Connect repo to Railway
    echo.
    pause
    exit /b 1
)

echo Step 1: Checking Railway login...
railway whoami
if %errorlevel% neq 0 (
    echo.
    echo Please login to Railway first:
    echo   railway login
    echo.
    pause
    exit /b 1
)

echo.
echo Step 2: Linking project...
railway link

echo.
echo Step 3: Deploying to Railway...
railway up

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo To get your live URL:
echo   railway domain
echo.
echo Or check Railway Dashboard:
echo   https://railway.app
echo.
pause

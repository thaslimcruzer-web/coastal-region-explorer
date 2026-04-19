# Railway Deployment Script - Complete Setup
# This script prepares your project for Railway deployment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RAILWAY DEPLOYMENT PREPARATION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify files exist
Write-Host "Step 1: Verifying project files..." -ForegroundColor Yellow

$requiredFiles = @("server.js", "package.json", "Procfile", ".nvmrc", "setup-db.js")
$allFilesExist = $true

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host ""
    Write-Host "ERROR: Missing required files!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 2: Checking package.json configuration..." -ForegroundColor Yellow

# Verify package.json has start script
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
if ($packageJson.scripts.start -eq "node server.js") {
    Write-Host "  [OK] Start script configured correctly" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Start script not found or incorrect" -ForegroundColor Red
    exit 1
}

# Verify dependencies
if ($packageJson.dependencies.mysql2) {
    Write-Host "  [OK] mysql2 dependency found" -ForegroundColor Green
}
if ($packageJson.dependencies.express) {
    Write-Host "  [OK] express dependency found" -ForegroundColor Green
}
if ($packageJson.dependencies.cors) {
    Write-Host "  [OK] cors dependency found" -ForegroundColor Green
}
if ($packageJson.dependencies.dotenv) {
    Write-Host "  [OK] dotenv dependency found" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Checking Procfile..." -ForegroundColor Yellow
$procfile = Get-Content "Procfile" -Raw
if ($procfile -match "web: node server.js") {
    Write-Host "  [OK] Procfile configured correctly" -ForegroundColor Green
} else {
    Write-Host "  [ERROR] Procfile incorrect" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 4: Verifying Git status..." -ForegroundColor Yellow
git status --short
Write-Host ""

Write-Host "Step 5: Pushing latest changes to GitHub..." -ForegroundColor Yellow
git add .
git commit -m "Prepare for Railway deployment - Node.js and MySQL config"
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "  [OK] Code pushed to GitHub" -ForegroundColor Green
} else {
    Write-Host "  [WARNING] Push may have failed, but continuing..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PROJECT READY FOR RAILWAY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your project is now configured for Railway deployment." -ForegroundColor White
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Go to https://railway.app" -ForegroundColor Yellow
Write-Host "2. Login with GitHub account" -ForegroundColor Yellow
Write-Host "3. Click 'New Project' -> 'Deploy from GitHub repo'" -ForegroundColor Yellow
Write-Host "4. Select: thaslimcruzer-web/coastal-region-explorer" -ForegroundColor Yellow
Write-Host ""
Write-Host "5. After deployment starts, add MySQL:" -ForegroundColor Yellow
Write-Host "   - Click '+ New' -> 'Database' -> 'MySQL'" -ForegroundColor Yellow
Write-Host "   - Wait 2 minutes for provisioning" -ForegroundColor Yellow
Write-Host ""
Write-Host "6. Configure Environment Variables in Node.js service:" -ForegroundColor Yellow
Write-Host "   - Click Node.js service -> 'Variables' tab" -ForegroundColor Yellow
Write-Host "   - Add these variables (copy from MySQL service):" -ForegroundColor Yellow
Write-Host ""
Write-Host "   VARIABLE NAME    | COPY FROM MYSQL" -ForegroundColor Cyan
Write-Host "   -----------------|------------------" -ForegroundColor Cyan
Write-Host "   DB_HOST          | MYSQLHOST" -ForegroundColor White
Write-Host "   DB_USER          | MYSQLUSER" -ForegroundColor White
Write-Host "   DB_PASSWORD      | MYSQLPASSWORD" -ForegroundColor White
Write-Host "   DB_NAME          | MYSQLDATABASE" -ForegroundColor White
Write-Host "   DB_PORT          | MYSQLPORT" -ForegroundColor White
Write-Host "   NODE_ENV         | production (type manually)" -ForegroundColor White
Write-Host "   PORT             | 3001 (type manually)" -ForegroundColor White
Write-Host ""
Write-Host "7. Setup Database Schema:" -ForegroundColor Yellow
Write-Host "   - In Node.js service, go to 'Settings' tab" -ForegroundColor Yellow
Write-Host "   - Click 'Open Shell' or 'Shell' tab" -ForegroundColor Yellow
Write-Host "   - Run: node setup-db.js" -ForegroundColor White
Write-Host ""
Write-Host "8. Get Your Public Live Link!" -ForegroundColor Yellow
Write-Host "   - Go to Node.js service 'Settings' tab" -ForegroundColor Yellow
Write-Host "   - Find 'Domains' section" -ForegroundColor Yellow
Write-Host "   - Your URL: https://coastal-region-explorer.up.railway.app" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  DEPLOYMENT GUIDE COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

# MySQL Installation Helper Script

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "MySQL Installation Guide" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "MySQL needs to be installed on your system." -ForegroundColor Yellow
Write-Host ""
Write-Host "Follow these steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "STEP 1: Download MySQL Installer" -ForegroundColor Green
Write-Host "  1. Open this URL in your browser:" -ForegroundColor White
Write-Host "     https://dev.mysql.com/downloads/installer/" -ForegroundColor Yellow
Write-Host ""
Write-Host "  2. Download the WEB version (smaller):" -ForegroundColor White
Write-Host "     mysql-installer-web-community-8.0.xx.x.msi" -ForegroundColor Yellow
Write-Host ""
Write-Host "  3. OR download the FULL version (larger):" -ForegroundColor White
Write-Host "     mysql-installer-community-8.0.xx.x.msi" -ForegroundColor Yellow
Write-Host ""

Write-Host "STEP 2: Run the Installer" -ForegroundColor Green
Write-Host "  1. Double-click the downloaded file" -ForegroundColor White
Write-Host "  2. Accept the license agreement" -ForegroundColor White
Write-Host "  3. Choose 'Developer Default' or 'Server only'" -ForegroundColor White
Write-Host "  4. Click 'Execute' to download and install components" -ForegroundColor White
Write-Host ""

Write-Host "STEP 3: Configure MySQL Server" -ForegroundColor Green
Write-Host "  IMPORTANT SETTINGS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  - Config Type: Development Computer" -ForegroundColor Cyan
Write-Host "  - Port: 3306 (default)" -ForegroundColor Cyan
Write-Host "  - Authentication: Use Strong Password Encryption" -ForegroundColor Cyan
Write-Host "  - Root Password: thaslim@9695" -ForegroundColor Cyan
Write-Host "  - Confirm Password: thaslim@9695" -ForegroundColor Cyan
Write-Host ""
Write-Host "  WINDOWS SERVICE SETTINGS:" -ForegroundColor Yellow
Write-Host "  - [X] Configure MySQL Server as a Windows Service" -ForegroundColor Cyan
Write-Host "  - Service Name: MySQL80" -ForegroundColor Cyan
Write-Host "  - [X] Start the MySQL Server at System Startup" -ForegroundColor Cyan
Write-Host ""

Write-Host "STEP 4: Complete Installation" -ForegroundColor Green
Write-Host "  1. Click 'Execute' on Apply Configuration" -ForegroundColor White
Write-Host "  2. Wait for all checks to complete" -ForegroundColor White
Write-Host "  3. Click 'Finish'" -ForegroundColor White
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "After Installation is Complete" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Come back here and press any key to continue..." -ForegroundColor Yellow
Write-Host "I will automatically set up your database!" -ForegroundColor Green
Write-Host ""

$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "Checking for MySQL installation..." -ForegroundColor Cyan

# Common MySQL paths
$mysqlPaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe",
    "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe"
)

$mysqlExe = $null
foreach ($path in $mysqlPaths) {
    if (Test-Path $path) {
        $mysqlExe = $path
        Write-Host "[OK] Found MySQL at: $path" -ForegroundColor Green
        break
    }
}

if (-not $mysqlExe) {
    Write-Host "[ERROR] MySQL not found yet!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "  1. Complete the MySQL installation" -ForegroundColor White
    Write-Host "  2. Make sure MySQL80 service is running" -ForegroundColor White
    Write-Host "  3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Or manually start setup with: .\setup-mysql.ps1" -ForegroundColor Cyan
    exit
}

Write-Host "[OK] MySQL installed!" -ForegroundColor Green
Write-Host ""

# Test connection
Write-Host "Testing connection..." -ForegroundColor Cyan
$env:MYSQL_PWD = "thaslim@9695"
& $mysqlExe -u root -e "SELECT 'Connected!' as Status;" 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Cannot connect!" -ForegroundColor Red
    Write-Host "Make sure MySQL80 service is running in services.msc" -ForegroundColor Yellow
    exit
}

Write-Host "[OK] Connected!" -ForegroundColor Green
Write-Host ""

# Create database
Write-Host "Creating database..." -ForegroundColor Cyan
& $mysqlExe -u root -e "CREATE DATABASE IF NOT EXISTS coastal_region CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Database created!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Failed to create database" -ForegroundColor Red
    exit
}

# Import schema
Write-Host ""
Write-Host "Importing database schema..." -ForegroundColor Cyan
Get-Content database.sql | & $mysqlExe -u root coastal_region 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Schema imported!" -ForegroundColor Green
} else {
    Write-Host "[WARN] Some errors (tables may exist)" -ForegroundColor Yellow
}

# Show tables
Write-Host ""
Write-Host "Database tables:" -ForegroundColor Cyan
& $mysqlExe -u root -e "USE coastal_region; SHOW TABLES;"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "SUCCESS! MySQL Setup Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Start server: npm run dev" -ForegroundColor White
Write-Host "  2. Test API: http://localhost:3002/test-db.html" -ForegroundColor White
Write-Host ""

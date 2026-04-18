Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "MySQL Connection Fix" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if MySQL is installed
Write-Host "Step 1: Checking MySQL installation..." -ForegroundColor Yellow

$mysqlPaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe",
    "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\xampp\mysql\bin\mysql.exe"
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
    Write-Host "[ERROR] MySQL is NOT installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "You need to install MySQL first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://dev.mysql.com/downloads/installer/" -ForegroundColor White
    Write-Host "2. Install and set password: thaslim@9695" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "OR use XAMPP (easier):" -ForegroundColor Yellow
    Write-Host "1. Download: https://www.apachefriends.org/" -ForegroundColor White
    Write-Host "2. Install XAMPP" -ForegroundColor White
    Write-Host "3. Start MySQL from XAMPP Control Panel" -ForegroundColor White
    Write-Host "4. Change password in .vscode/settings.json to empty" -ForegroundColor White
    exit
}

# Step 2: Try to start MySQL service
Write-Host ""
Write-Host "Step 2: Starting MySQL service..." -ForegroundColor Yellow

$service = Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue

if ($service) {
    Write-Host "Found service: $($service.Name)" -ForegroundColor Cyan
    if ($service.Status -ne "Running") {
        Write-Host "Starting $($service.Name)..." -ForegroundColor Yellow
        try {
            Start-Service -Name $service.Name
            Write-Host "[OK] Service started!" -ForegroundColor Green
        } catch {
            Write-Host "[ERROR] Failed to start service: $_" -ForegroundColor Red
            Write-Host "Try running as Administrator" -ForegroundColor Yellow
        }
    } else {
        Write-Host "[OK] Service already running!" -ForegroundColor Green
    }
} else {
    Write-Host "[WARN] No MySQL service found!" -ForegroundColor Yellow
    Write-Host "Trying to start MySQL manually..." -ForegroundColor Yellow
    
    $mysqlDir = Split-Path $mysqlExe
    Push-Location $mysqlDir
    Start-Process -FilePath "mysqld.exe" -ArgumentList "--console" -WindowStyle Normal
    Pop-Location
    
    Write-Host "MySQL started in new window - leave it open!" -ForegroundColor Yellow
    Write-Host "Waiting 3 seconds for MySQL to start..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
}

# Step 3: Test connection
Write-Host ""
Write-Host "Step 3: Testing connection..." -ForegroundColor Yellow

$env:MYSQL_PWD = "thaslim@9695"
& $mysqlExe -u root -h 127.0.0.1 -e "SELECT 'Connection Successful!' as Status;" 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Connection failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible issues:" -ForegroundColor Yellow
    Write-Host "1. Wrong password - check .vscode/settings.json" -ForegroundColor White
    Write-Host "2. MySQL not fully started - wait 10 seconds and try again" -ForegroundColor White
    Write-Host "3. Port blocked - check firewall" -ForegroundColor White
    Write-Host ""
    Write-Host "To test manually:" -ForegroundColor Cyan
    Write-Host "mysql -u root -p -h 127.0.0.1" -ForegroundColor White
    exit
}

Write-Host "[OK] Connection successful!" -ForegroundColor Green

# Step 4: Check database
Write-Host ""
Write-Host "Step 4: Checking database..." -ForegroundColor Yellow

& $mysqlExe -u root -h 127.0.0.1 -e "CREATE DATABASE IF NOT EXISTS coastal_region CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "[OK] Database exists/created!" -ForegroundColor Green
} else {
    Write-Host "[ERROR] Database issue!" -ForegroundColor Red
    exit
}

# Step 5: Import schema if needed
Write-Host ""
Write-Host "Step 5: Checking tables..." -ForegroundColor Yellow

$tables = & $mysqlExe -u root -h 127.0.0.1 -e "USE coastal_region; SHOW TABLES;" 2>&1

if ($tables -match "sightings") {
    Write-Host "[OK] Tables exist!" -ForegroundColor Green
} else {
    Write-Host "Importing schema..." -ForegroundColor Yellow
    Get-Content database.sql | & $mysqlExe -u root -h 127.0.0.1 coastal_region 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[OK] Schema imported!" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Some import errors (may be okay)" -ForegroundColor Yellow
    }
}

# Final summary
Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "SUCCESS! MySQL is Ready!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Now in VS Code:" -ForegroundColor Cyan
Write-Host "1. Reload VS Code (Ctrl+Shift+P -> Reload Window)" -ForegroundColor White
Write-Host "2. Open SQLTools panel (left sidebar)" -ForegroundColor White
Write-Host "3. Click Connect on 'Coastal Region Database'" -ForegroundColor White
Write-Host "4. It should work now!" -ForegroundColor Green
Write-Host ""
Write-Host "Connection details:" -ForegroundColor Cyan
Write-Host "  Host: 127.0.0.1" -ForegroundColor White
Write-Host "  Port: 3306" -ForegroundColor White
Write-Host "  Database: coastal_region" -ForegroundColor White
Write-Host "  User: root" -ForegroundColor White
Write-Host "  Password: thaslim@9695" -ForegroundColor White
Write-Host ""

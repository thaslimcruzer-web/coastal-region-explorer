# MySQL Connection Setup and Test Script
# Run this script to verify your MySQL connection

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MySQL Connection Setup & Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if MySQL is installed
Write-Host "Step 1: Checking MySQL Installation..." -ForegroundColor Yellow
$mysqlPath = where.exe mysql 2>$null
if ($mysqlPath) {
    Write-Host "  MySQL is installed" -ForegroundColor Green
    Write-Host "  Location: $mysqlPath" -ForegroundColor Gray
} else {
    Write-Host "  MySQL not found in PATH" -ForegroundColor Red
    Write-Host "  Please install MySQL first" -ForegroundColor Yellow
    exit 1
}

# Step 2: Check MySQL Service
Write-Host ""
Write-Host "Step 2: Checking MySQL Service..." -ForegroundColor Yellow
$mysqlService = Get-Service -Name "MySQL*" -ErrorAction SilentlyContinue

if ($mysqlService) {
    Write-Host "  Service: $($mysqlService.Name)" -ForegroundColor Gray
    if ($mysqlService.Status -eq "Running") {
        Write-Host "  Status: Running" -ForegroundColor Green
    } else {
        Write-Host "  Status: $($mysqlService.Status)" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "  Would you like to start MySQL service? (Y/N)" -ForegroundColor Cyan
        $response = Read-Host
        if ($response -eq "Y" -or $response -eq "y") {
            Write-Host "  Starting MySQL service..." -ForegroundColor Yellow
            Start-Service -Name $mysqlService.Name
            Write-Host "  Service started!" -ForegroundColor Green
        }
    }
} else {
    Write-Host "  MySQL service not found" -ForegroundColor Red
    Write-Host "  Try starting manually: net start MySQL80" -ForegroundColor Yellow
}

# Step 3: Test MySQL Connection
Write-Host ""
Write-Host "Step 3: Testing MySQL Connection..." -ForegroundColor Yellow

# Read .env file
$envFile = ".env"
if (Test-Path $envFile) {
    $envContent = Get-Content $envFile
    $dbHost = ($envContent | Where-Object { $_ -match "^DB_HOST=" }) -replace "DB_HOST=", ""
    $dbUser = ($envContent | Where-Object { $_ -match "^DB_USER=" }) -replace "DB_USER=", ""
    $dbPassword = ($envContent | Where-Object { $_ -match "^DB_PASSWORD=" }) -replace "DB_PASSWORD=", ""
    $dbName = ($envContent | Where-Object { $_ -match "^DB_NAME=" }) -replace "DB_NAME=", ""
    $dbPort = ($envContent | Where-Object { $_ -match "^DB_PORT=" }) -replace "DB_PORT=", ""
    
    Write-Host "  Host: $dbHost" -ForegroundColor Gray
    Write-Host "  User: $dbUser" -ForegroundColor Gray
    Write-Host "  Port: $dbPort" -ForegroundColor Gray
    Write-Host "  Database: $dbName" -ForegroundColor Gray
    Write-Host ""
    
    # Test connection
    $env:MYSQL_PWD = $dbPassword
    $testResult = mysql -h $dbHost -P $dbPort -u $dbUser -e "SELECT 1" 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  Connection: SUCCESS" -ForegroundColor Green
        
        # Get MySQL version
        $version = mysql -h $dbHost -P $dbPort -u $dbUser -e "SELECT VERSION()" 2>&1
        Write-Host "  MySQL Version: $version" -ForegroundColor Gray
    } else {
        Write-Host "  Connection: FAILED" -ForegroundColor Red
        Write-Host "  Error: Unable to connect to MySQL" -ForegroundColor Red
        Write-Host ""
        Write-Host "  Possible issues:" -ForegroundColor Yellow
        Write-Host "  1. MySQL service not running" -ForegroundColor Gray
        Write-Host "  2. Wrong password in .env file" -ForegroundColor Gray
        Write-Host "  3. MySQL not installed on port $dbPort" -ForegroundColor Gray
        Write-Host ""
        Write-Host "  To fix:" -ForegroundColor Cyan
        Write-Host "  - Check .env file has correct password" -ForegroundColor Gray
        Write-Host "  - Start MySQL: net start MySQL80" -ForegroundColor Gray
        exit 1
    }
} else {
    Write-Host "  .env file not found!" -ForegroundColor Red
    Write-Host "  Please create .env file with database credentials" -ForegroundColor Yellow
    exit 1
}

# Step 4: Check Database
Write-Host ""
Write-Host "Step 4: Checking Database..." -ForegroundColor Yellow

$env:MYSQL_PWD = $dbPassword
$dbCheck = mysql -h $dbHost -P $dbPort -u $dbUser -e "SHOW DATABASES LIKE '$dbName'" 2>&1

if ($dbCheck -like "*$dbName*") {
    Write-Host "  Database '$dbName': EXISTS" -ForegroundColor Green
    
    # Check tables
    Write-Host ""
    Write-Host "Step 5: Checking Tables..." -ForegroundColor Yellow
    $tables = mysql -h $dbHost -P $dbPort -u $dbUser $dbName -e "SHOW TABLES" 2>&1
    
    if ($tables) {
        $tableCount = ($tables | Measure-Object).Count - 1
        Write-Host "  Tables found: $tableCount" -ForegroundColor Green
        Write-Host ""
        Write-Host "  Tables:" -ForegroundColor Cyan
        foreach ($table in $tables) {
            if ($table -ne "Tables_in_$dbName") {
                Write-Host "    - $table" -ForegroundColor Gray
            }
        }
    } else {
        Write-Host "  No tables found" -ForegroundColor Yellow
        Write-Host "  Run: mysql -u root -p < database.sql" -ForegroundColor Cyan
    }
    
    # Count records
    Write-Host ""
    Write-Host "Step 6: Record Counts..." -ForegroundColor Yellow
    
    $importantTables = @("places", "species", "sightings", "environmental_data", "conservation_projects", "reviews", "users")
    
    foreach ($table in $importantTables) {
        $count = mysql -h $dbHost -P $dbPort -u $dbUser $dbName -e "SELECT COUNT(*) as count FROM $table" 2>&1
        if ($count) {
            $number = ($count -split "`n" | Where-Object { $_ -match "^\d+" }) -replace ".*\s", ""
            if ($number) {
                Write-Host "  $($table.PadRight(25)) $number records" -ForegroundColor Gray
            }
        }
    }
    
} else {
    Write-Host "  Database '$dbName': NOT FOUND" -ForegroundColor Red
    Write-Host ""
    Write-Host "  To create database, run:" -ForegroundColor Cyan
    Write-Host "  mysql -u root -p < database.sql" -ForegroundColor Yellow
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Connection Test Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Test with Node.js:" -ForegroundColor Cyan
Write-Host "   node test-mysql-connection.js" -ForegroundColor White
Write-Host ""
Write-Host "2. Start Server:" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor White
Write-Host ""
Write-Host "3. Open Browser:" -ForegroundColor Cyan
Write-Host "   http://localhost:3001" -ForegroundColor White
Write-Host ""
Write-Host "4. Run SQL Tools:" -ForegroundColor Cyan
Write-Host "   node sql-tools.js" -ForegroundColor White
Write-Host ""

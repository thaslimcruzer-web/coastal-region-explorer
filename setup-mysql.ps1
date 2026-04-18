Write-Host "Checking MySQL Installation..." -ForegroundColor Cyan
Write-Host ""

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
    Write-Host "[ERROR] MySQL not found!" -ForegroundColor Red
    Write-Host "Please start MySQL service from Services (services.msc)"
    exit
}

Write-Host ""
Write-Host "Testing MySQL Connection..." -ForegroundColor Cyan
$env:MYSQL_PWD = "thaslim@9695"
& $mysqlExe -u root -e "SELECT 'Connection Successful!' as Status;"

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Cannot connect to MySQL!" -ForegroundColor Red
    Write-Host "Start MySQL service: net start MySQL80"
    exit
}

Write-Host "[OK] MySQL is running!" -ForegroundColor Green
Write-Host ""
Write-Host "Creating database..." -ForegroundColor Cyan
& $mysqlExe -u root -e "CREATE DATABASE IF NOT EXISTS coastal_region CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

Write-Host "[OK] Database created!" -ForegroundColor Green
Write-Host ""
Write-Host "Importing schema..." -ForegroundColor Cyan
Get-Content database.sql | & $mysqlExe -u root coastal_region

Write-Host "[OK] Schema imported!" -ForegroundColor Green
Write-Host ""
Write-Host "Verifying tables..." -ForegroundColor Cyan
& $mysqlExe -u root -e "USE coastal_region; SHOW TABLES;"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "MySQL Setup Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Start server: npm run dev" -ForegroundColor Cyan
Write-Host "Test at: http://localhost:3002/test-db.html" -ForegroundColor Cyan
Write-Host ""

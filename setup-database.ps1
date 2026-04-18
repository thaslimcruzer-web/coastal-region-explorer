# Coastal Region Database Setup Script
# Run this script to initialize your database

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Coastal Region Database Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is running
Write-Host "Checking MySQL connection..." -ForegroundColor Yellow
try {
    $env:MYSQL_PWD = ""
    $result = mysql -u root -e "SELECT 1" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ MySQL is running" -ForegroundColor Green
    } else {
        Write-Host "✗ MySQL is not running. Please start MySQL first." -ForegroundColor Red
        Write-Host "  Run: net start MySQL80" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "✗ MySQL not found. Please install MySQL first." -ForegroundColor Red
    exit 1
}

# Run database setup
Write-Host ""
Write-Host "Creating database and tables..." -ForegroundColor Yellow
try {
    $env:MYSQL_PWD = ""
    mysql -u root < database.sql 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database created successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Database setup failed" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "✗ Error running database script" -ForegroundColor Red
    exit 1
}

# Verify tables
Write-Host ""
Write-Host "Verifying database tables..." -ForegroundColor Yellow
$env:MYSQL_PWD = ""
$tables = mysql -u root coastal_region -e "SHOW TABLES;" 2>&1
Write-Host $tables -ForegroundColor White

# Count sample data
Write-Host ""
Write-Host "Sample data summary:" -ForegroundColor Yellow
$env:MYSQL_PWD = ""

$places = mysql -u root coastal_region -e "SELECT COUNT(*) as count FROM places;" 2>&1
Write-Host "  Places: $places" -ForegroundColor White

$species = mysql -u root coastal_region -e "SELECT COUNT(*) as count FROM species;" 2>&1
Write-Host "  Species: $species" -ForegroundColor White

$sightings = mysql -u root coastal_region -e "SELECT COUNT(*) as count FROM sightings;" 2>&1
Write-Host "  Sightings: $sightings" -ForegroundColor White

$environmental = mysql -u root coastal_region -e "SELECT COUNT(*) as count FROM environmental_data;" 2>&1
Write-Host "  Environmental Records: $environmental" -ForegroundColor White

$projects = mysql -u root coastal_region -e "SELECT COUNT(*) as count FROM conservation_projects;" 2>&1
Write-Host "  Conservation Projects: $projects" -ForegroundColor White

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Start server: npm start" -ForegroundColor White
Write-Host "  2. Open browser: http://localhost:3001" -ForegroundColor White
Write-Host "  3. Test API: http://localhost:3001/api/health" -ForegroundColor White
Write-Host ""
Write-Host "For full API documentation, see: DATABASE_API_DOCUMENTATION.md" -ForegroundColor Cyan
Write-Host ""

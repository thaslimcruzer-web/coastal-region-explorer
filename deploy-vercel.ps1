# Vercel Deployment Helper Script
# This script helps you deploy your coastal region project to Vercel

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Vercel Deployment Helper" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Step 1: Checking Vercel CLI..." -ForegroundColor Yellow
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "  Vercel CLI not found." -ForegroundColor Red
    Write-Host ""
    Write-Host "  Would you like to install it now? (Y/N)" -ForegroundColor Cyan
    $response = Read-Host
    
    if ($response -eq "Y" -or $response -eq "y") {
        Write-Host "  Installing Vercel CLI..." -ForegroundColor Yellow
        npm install -g vercel
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Vercel CLI installed!" -ForegroundColor Green
        } else {
            Write-Host "  ❌ Installation failed. Try: npm install -g vercel" -ForegroundColor Red
            exit 1
        }
    } else {
        Write-Host "  Please install manually: npm install -g vercel" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "  ✅ Vercel CLI is installed" -ForegroundColor Green
}

# Check if logged in
Write-Host ""
Write-Host "Step 2: Checking Vercel Login..." -ForegroundColor Yellow
$vercelStatus = vercel whoami 2>&1

if ($vercelStatus -like "*Not authenticated*") {
    Write-Host "  Not logged in to Vercel." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Opening browser for login..." -ForegroundColor Cyan
    vercel login
} else {
    Write-Host "  ✅ Logged in as: $vercelStatus" -ForegroundColor Green
}

# Display deployment options
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Deployment Options" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT: Vercel does NOT support MySQL databases!" -ForegroundColor Red
Write-Host ""
Write-Host "Your options:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Deploy Frontend to Vercel + Use Cloud MySQL (PlanetScale)" -ForegroundColor White
Write-Host "   - Frontend on Vercel's fast CDN" -ForegroundColor Gray
Write-Host "   - MySQL on PlanetScale (free tier)" -ForegroundColor Gray
Write-Host "   - Requires external database setup" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Deploy Everything to Railway (RECOMMENDED)" -ForegroundColor Green
Write-Host "   - Both app AND MySQL on Railway" -ForegroundColor Gray
Write-Host "   - Free `$5/month credit" -ForegroundColor Gray
Write-Host "   - Easier setup for your project" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Deploy Frontend to Vercel + Backend to Railway" -ForegroundColor White
Write-Host "   - Best performance" -ForegroundColor Gray
Write-Host "   - More complex setup" -ForegroundColor Gray
Write-Host ""

Write-Host "Which option do you want? (1/2/3)" -ForegroundColor Cyan
$option = Read-Host

switch ($option) {
    "1" {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  Option 1: Vercel + PlanetScale" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next Steps:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Create MySQL database on PlanetScale:" -ForegroundColor White
        Write-Host "   → https://planetscale.com" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "2. Deploy to Vercel:" -ForegroundColor White
        Write-Host "   Command: vercel" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "3. Add environment variables:" -ForegroundColor White
        Write-Host "   - DB_HOST" -ForegroundColor Gray
        Write-Host "   - DB_USER" -ForegroundColor Gray
        Write-Host "   - DB_PASSWORD" -ForegroundColor Gray
        Write-Host "   - DB_NAME" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Would you like to deploy to Vercel now? (Y/N)" -ForegroundColor Cyan
        $deploy = Read-Host
        
        if ($deploy -eq "Y" -or $deploy -eq "y") {
            Write-Host ""
            Write-Host "Deploying to Vercel..." -ForegroundColor Yellow
            vercel
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host ""
                Write-Host "✅ Deployment successful!" -ForegroundColor Green
                Write-Host "📝 Don't forget to:" -ForegroundColor Yellow
                Write-Host "   1. Set up PlanetScale MySQL database" -ForegroundColor White
                Write-Host "   2. Add environment variables in Vercel dashboard" -ForegroundColor White
                Write-Host "   3. Redeploy: vercel --prod" -ForegroundColor White
            }
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  Option 2: Railway (RECOMMENDED)" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "This is the BEST option for your project!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Steps:" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "1. Push your code to GitHub:" -ForegroundColor White
        Write-Host "   git add ." -ForegroundColor Cyan
        Write-Host "   git commit -m 'Ready for deployment'" -ForegroundColor Cyan
        Write-Host "   git push" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "2. Deploy on Railway:" -ForegroundColor White
        Write-Host "   → https://railway.app" -ForegroundColor Cyan
        Write-Host "   - Sign up with GitHub" -ForegroundColor Gray
        Write-Host "   - New Project → Deploy from GitHub" -ForegroundColor Gray
        Write-Host "   - Add MySQL database" -ForegroundColor Gray
        Write-Host "   - Add environment variables" -ForegroundColor Gray
        Write-Host ""
        Write-Host "3. Get your live link!" -ForegroundColor White
        Write-Host "   Example: https://coastal-region.up.railway.app" -ForegroundColor Green
        Write-Host ""
        Write-Host "Would you like to open Railway now? (Y/N)" -ForegroundColor Cyan
        $openRailway = Read-Host
        
        if ($openRailway -eq "Y" -or $openRailway -eq "y") {
            Start-Process "https://railway.app"
            Write-Host "  ✅ Railway opened in your browser!" -ForegroundColor Green
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host "  Option 3: Vercel Frontend + Railway Backend" -ForegroundColor Cyan
        Write-Host "========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Advanced setup for best performance" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "This requires:" -ForegroundColor White
        Write-Host "   1. Deploy backend to Railway (with MySQL)" -ForegroundColor Gray
        Write-Host "   2. Update frontend API URL" -ForegroundColor Gray
        Write-Host "   3. Deploy frontend to Vercel" -ForegroundColor Gray
        Write-Host ""
        Write-Host "Would you like detailed instructions? (Y/N)" -ForegroundColor Cyan
        $details = Read-Host
        
        if ($details -eq "Y" -or $details -eq "y") {
            Write-Host ""
            Write-Host "  Opening deployment guide..." -ForegroundColor Cyan
            Start-Process "notepad.exe" "VERCEL_DEPLOYMENT_GUIDE.md"
        }
    }
    
    default {
        Write-Host ""
        Write-Host "Invalid option. Please read the guide:" -ForegroundColor Red
        Write-Host "  VERCEL_DEPLOYMENT_GUIDE.md" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  For more help, see:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  📖 VERCEL_DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host "  🌐 https://vercel.com/docs" -ForegroundColor White
Write-Host "  🚂 https://railway.app" -ForegroundColor White
Write-Host ""

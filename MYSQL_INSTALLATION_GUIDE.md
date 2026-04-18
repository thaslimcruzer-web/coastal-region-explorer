# MySQL Installation Guide for Windows
# =========================================

## Step-by-Step Instructions:

### Option 1: Download MySQL Installer (Easiest)

1. **Download MySQL Installer:**
   - Go to: https://dev.mysql.com/downloads/installer/
   - Download "mysql-installer-community-8.0.xx.msi" (Web Community version)
   - File size: ~3 MB (downloads components during installation)

2. **Install MySQL:**
   - Run the downloaded .msi file
   - Choose "Server only" installation type
   - Click "Execute" to download and install
   - Follow the configuration wizard:
     * Config Type: Development Computer
     * Root Password: thaslim@9695 (or your preferred password)
     * Create a new user if needed
     * Leave port as 3306
     * Apply Configuration

3. **Start MySQL Service:**
   - MySQL should start automatically after installation
   - Verify with: Get-Service MySQL80

### Option 2: Quick Installation via PowerShell

Run these commands in PowerShell as Administrator:

```powershell
# Download MySQL Installer (you'll need to complete the setup manually)
Start-Process "https://dev.mysql.com/downloads/installer/"
```

### Option 3: Use XAMPP (Includes MySQL)

1. Download XAMPP from: https://www.apachefriends.org/
2. Install XAMPP (includes MySQL, Apache, PHP)
3. Start MySQL from XAMPP Control Panel
4. Update .env file if MySQL port is different

---

## After Installation:

### Step 1: Verify MySQL is Running
```powershell
Get-Service MySQL80
# Should show Status: Running
```

### Step 2: Test Connection
```powershell
node test-connection.js
```

### Step 3: Create Database
```powershell
mysql -u root -p < database.sql
# Password: thaslim@9695
```

### Step 4: Start Your Server
```powershell
npm start
```

---

## Troubleshooting:

### MySQL Service Won't Start
- Check Windows Event Viewer for errors
- Verify port 3306 is not in use: netstat -ano | findstr :3306
- Try: net start MySQL80

### Connection Refused
- Verify password in .env matches your MySQL root password
- Check MySQL is listening on port 3306
- Try connecting with: mysql -u root -p

### Database Doesn't Exist
- Run: mysql -u root -p < database.sql
- Or manually: mysql -u root -p
  Then: CREATE DATABASE coastal_region;

---

## Need Help?

If you encounter any issues during installation, let me know what error you see!

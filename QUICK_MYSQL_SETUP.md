# Quick MySQL Setup Instructions

## MySQL Service Not Found - Follow These Steps:

### Option 1: Start MySQL from Services

1. Press **Windows Key + R**
2. Type: `services.msc`
3. Press **Enter**
4. Look for: **MySQL80** or **MySQL** in the list
5. If found:
   - Right-click on it
   - Click **Start**
   - Set Startup Type to **Automatic**
6. If NOT found, you need to complete installation (see Option 2)

---

### Option 2: Complete MySQL Installation

If MySQL service is not in services.msc, the installation may not be complete:

1. **Run MySQL Installer Again:**
   - Go to: `C:\Program Files\MySQL\MySQL Installer for Windows\`
   - Run: `MySQLInstaller.exe`
   - OR re-download from: https://dev.mysql.com/downloads/installer/

2. **During Installation:**
   - Choose: **Server only** or **Developer Default**
   - Configure MySQL Server as Windows Service: **YES**
   - Service Name: **MySQL80**
   - Start MySQL Server at System Startup: **YES**
   - Root Password: `thaslim@9695`

3. **After Installation:**
   - The MySQL80 service should appear in services.msc
   - It should start automatically

---

### Option 3: Start MySQL Manually

If MySQL is installed but service won't start:

1. Open Command Prompt as **Administrator**
2. Navigate to MySQL bin folder:
   ```
   cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
   ```
3. Start MySQL:
   ```
   mysqld --console
   ```
4. Leave this window open
5. In a NEW terminal, run:
   ```
   .\setup-mysql.ps1
   ```

---

### Option 4: Use XAMPP Instead (Easiest)

If MySQL installation is problematic, use XAMPP:

1. **Download XAMPP:**
   - https://www.apachefriends.org/
   
2. **Install XAMPP** (default settings)

3. **Start MySQL:**
   - Open XAMPP Control Panel
   - Click **Start** next to MySQL
   - Wait for green highlight

4. **Update .env file:**
   - Change DB_PORT to 3306 (already set)
   - Password should be empty for XAMPP:
     ```
     DB_PASSWORD=
     ```

5. **Run setup:**
   ```
   .\setup-mysql.ps1
   ```

---

### After MySQL is Running:

1. Run the setup script:
   ```powershell
   .\setup-mysql.ps1
   ```

2. Start your server:
   ```powershell
   npm run dev
   ```

3. Test your database:
   - Open: http://localhost:3002/test-db.html

---

## Troubleshooting

**Problem:** "Access denied for user root"
**Fix:** Check password in .env matches your MySQL password

**Problem:** "Can't connect to MySQL server"
**Fix:** MySQL service is not running - start it from services.msc

**Problem:** MySQL not in services.msc
**Fix:** Re-run MySQL Installer and configure as Windows Service

---

## Need Help?

Tell me which option you'd like to try, or if you want me to:
- Switch to SQLite (no installation needed)
- Help with XAMPP setup
- Troubleshoot MySQL installation

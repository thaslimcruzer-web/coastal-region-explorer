# 🔧 MySQL Connection Fix Guide

## ❌ Current Issue
MySQL server is **not installed** or **not running** on your system.

---

## ✅ SOLUTION 1: Install MySQL (Recommended for Production)

### Step 1: Download MySQL
1. Go to: https://dev.mysql.com/downloads/installer/
2. Download **MySQL Installer for Windows**
3. Run the installer
4. Choose **Developer Default** or **Server only**
5. Set root password: `thaslim@9695` (match your .env file)
6. Complete installation

### Step 2: Verify Installation
```bash
mysql --version
```

### Step 3: Create Database
```bash
mysql -u root -p -e "CREATE DATABASE coastal_region CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
```

### Step 4: Import Schema
```bash
mysql -u root -p < database.sql
```

### Step 5: Start Server
```bash
npm run dev
```

---

## ✅ SOLUTION 2: Use XAMPP (Easier)

### Step 1: Download XAMPP
1. Go to: https://www.apachefriends.org/
2. Download XAMPP for Windows
3. Install it (default settings are fine)

### Step 2: Start MySQL
1. Open **XAMPP Control Panel**
2. Click **Start** next to MySQL
3. Wait for it to turn green

### Step 3: Create Database
1. Open browser: http://localhost/phpmyadmin
2. Click **New** in left sidebar
3. Database name: `coastal_region`
4. Collation: `utf8mb4_unicode_ci`
5. Click **Create**

### Step 4: Import Schema
1. Click on `coastal_region` database
2. Click **Import** tab
3. Choose file: `database.sql` from your project
4. Click **Go**

### Step 5: Start Server
```bash
npm run dev
```

---

## ✅ SOLUTION 3: Use SQLite (No Installation Required)

If you want to test without installing MySQL, I can switch to SQLite which works immediately!

**Benefits:**
- ✅ No installation needed
- ✅ Works out of the box
- ✅ Perfect for development/testing
- ✅ Single file database

**Just tell me and I'll set it up!**

---

## 🔍 Test Your Connection

After setting up MySQL, run:
```bash
node test-mysql.js
```

You should see:
```
✅ SUCCESS: Connected to MySQL server!
✅ SUCCESS: Database 'coastal_region' exists!
✅ SUCCESS: Database selected!
✅ SUCCESS: Found 4 table(s)
✅ Found 5 sighting(s)
```

---

## 🚀 Quick Commands

### Check if MySQL is running:
```bash
# Windows Services
services.msc
# Look for: MySQL80 or MySQL57

# Or use XAMPP Control Panel
```

### Test MySQL login:
```bash
mysql -u root -p
# Enter password: thaslim@9695
```

### Start your server:
```bash
npm run dev
```

### Test API:
Open: http://localhost:3002/test-db.html

---

## 📝 Your Current Configuration

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=thaslim@9695
DB_NAME=coastal_region
PORT=3002
```

---

## ❓ Need Help?

1. **MySQL not installed?** → Use SOLUTION 1 or 2
2. **Password wrong?** → Update `.env` file
3. **Port conflict?** → Change PORT in `.env`
4. **Want easy setup?** → Use SOLUTION 3 (SQLite)

---

## 🎯 Recommended Path

**For Beginners:** Use XAMPP (SOLUTION 2)
**For Production:** Install MySQL (SOLUTION 1)
**For Quick Testing:** Use SQLite (SOLUTION 3)

---

**Which solution would you like to use?**

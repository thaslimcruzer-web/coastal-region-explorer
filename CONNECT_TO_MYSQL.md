# 🚀 Quick Start - Connect to MySQL Database

## 3-Step Setup

### 1️⃣ Test MySQL Connection
```powershell
# Run the connection test
node test-mysql-connection.js
```

**Expected Output:**
```
✅ ALL TESTS PASSED! Database connection is working!
```

### 2️⃣ Start Server
```bash
npm start
```

**Expected Output:**
```
✅ MySQL Database Connected Successfully
✅ Sightings table initialized
✅ Trip items table initialized
✅ Users table initialized
✅ Favorites table initialized
✅ Places table initialized
✅ Species table initialized
✅ Environmental data table initialized
✅ Conservation projects table initialized
✅ Reviews table initialized

🚀 Server running on http://localhost:3001
📊 API available at http://localhost:3001/api
```

### 3️⃣ Verify Connection
Open browser: http://localhost:3001/api/health

**Expected Response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## ⚠️ If Connection Fails

### Error: Can't Connect to MySQL
```powershell
# Start MySQL service (as Administrator)
net start MySQL80
```

### Error: Database Doesn't Exist
```bash
# Create database
mysql -u root -p < database.sql
```

### Error: Access Denied
1. Open `.env` file
2. Check password is correct: `DB_PASSWORD=thaslim@9695`
3. Test login: `mysql -u root -p`

---

## 🧪 Testing Commands

```bash
# Test MySQL connection
npm run test-connection

# Test API endpoints
npm run test-api

# Run SQL tools
npm run sql-tools

# View database stats
node sql-tools.js 1

# Health check
node sql-tools.js 8
```

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | Database credentials |
| `database.sql` | Database schema |
| `server.js` | API server with MySQL connection |
| `test-mysql-connection.js` | Connection test script |
| `test-mysql-setup.ps1` | PowerShell setup script |

---

## 🔧 Quick Commands

```bash
# Start MySQL
net start MySQL80

# Stop MySQL
net stop MySQL80

# Check MySQL status
Get-Service MySQL*

# Login to MySQL
mysql -u root -p

# Start server
npm start

# Test connection
node test-mysql-connection.js
```

---

## ✅ Success Checklist

- [ ] MySQL service is running
- [ ] `.env` file has correct password
- [ ] Database `coastal_region` exists
- [ ] `node test-mysql-connection.js` passes
- [ ] `npm start` shows "Connected Successfully"
- [ ] http://localhost:3001/api/health works

---

## 📊 Database Info

**Database:** coastal_region  
**Tables:** 9  
**Sample Records:** 25+  
**Server:** http://localhost:3001  
**API:** http://localhost:3001/api  

---

## 🆘 Need Help?

Run the comprehensive test:
```powershell
.\test-mysql-setup.ps1
```

Or read the full guide:
📖 [MYSQL_CONNECTION_GUIDE.md](MYSQL_CONNECTION_GUIDE.md)

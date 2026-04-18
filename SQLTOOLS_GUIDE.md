# 🗄️ SQLTools Setup Guide - Step by Step

## What is SQLTools?
SQLTools is a VS Code extension that lets you manage your MySQL database visually without leaving your code editor!

---

## ✅ STEP 1: Install SQLTools Extension

### In VS Code:
1. Press **Ctrl+Shift+X** (Open Extensions)
2. Search for: **SQLTools**
3. Install these TWO extensions:

   **A) SQLTools** (Main Extension)
   - Author: Matheus Teixeira
   - Downloads: 2M+
   - Click **Install**

   **B) SQLTools MySQL/MariaDB Driver** (Driver)
   - Author: Matheus Teixeira
   - Required for MySQL connection
   - Click **Install**

4. **Restart VS Code** after installation

---

## ✅ STEP 2: Configuration (Already Done!)

I've already created the configuration file for you:
- Location: `.vscode/settings.json`
- Database: `coastal_region`
- Server: `localhost:3306`
- User: `root`
- Password: `thaslim@9695`

**No need to configure manually!** ✅

---

## ✅ STEP 3: Connect to Database

### Before Using SQLTools:
Make sure MySQL is running!

**Option A: Start MySQL Service**
1. Press **Windows + R**
2. Type: `services.msc`
3. Find: **MySQL80**
4. Right-click → **Start**

**Option B: Start with Command**
```powershell
net start MySQL80
```

### Connect in VS Code:
1. Look at the **left sidebar** in VS Code
2. Click on **SQLTools icon** (database icon)
3. You should see: **"Coastal Region Database"**
4. Click the **plug icon** 🔌 to connect
5. If successful, you'll see a green checkmark ✅

---

## ✅ STEP 4: Explore Your Database

Once connected, you can:

### View Tables:
1. Expand **"Coastal Region Database"** in SQLTools panel
2. Click on **Tables**
3. You'll see:
   - `sightings`
   - `trip_items`
   - `users`
   - `favorites`

### View Table Data:
1. Right-click any table
2. Select: **"Show Table Records"**
3. Data appears in a new tab!

### View Table Structure:
1. Right-click any table
2. Select: **"Describe Table"**
3. See columns, types, and constraints

---

## ✅ STEP 5: Run SQL Queries

### Use the Queries File:
I've created `queries.sql` with 25+ useful queries!

1. Open: **queries.sql** in VS Code
2. Select any query (or multiple)
3. Press: **Ctrl+E, Ctrl+E** (or right-click → Run Query)
4. Results appear below!

### Example Queries:

**View all sightings:**
```sql
SELECT * FROM sightings ORDER BY created_at DESC;
```

**Count species:**
```sql
SELECT species, COUNT(*) as count 
FROM sightings 
GROUP BY species;
```

**Insert test data:**
```sql
INSERT INTO sightings (species, location, sighting_date, depth, notes, count) 
VALUES ('Clownfish', 'Kalkudah Beach', '2026-04-18', 2.0, 'Test entry', 3);
```

---

## ✅ STEP 6: Common Operations

### Create New Table:
```sql
CREATE TABLE test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);
```

### Insert Data:
```sql
INSERT INTO table_name (column1, column2) 
VALUES ('value1', 'value2');
```

### Update Data:
```sql
UPDATE sightings 
SET notes = 'Updated notes' 
WHERE id = 1;
```

### Delete Data:
```sql
DELETE FROM sightings WHERE id = 1;
```

### Export Data to CSV:
1. Right-click table
2. Select: **"Export to CSV"**
3. Choose location to save

---

## 📊 SQLTools Features

### Available in Right-Click Menu:
- ✅ **Show Table Records** - View data
- ✅ **Describe Table** - View structure
- ✅ **Run Query** - Execute SQL
- ✅ **Export to CSV** - Download data
- ✅ **Export to JSON** - Export as JSON
- ✅ **Refresh** - Update view
- ✅ **Copy Name** - Copy table name

### Keyboard Shortcuts:
- **Ctrl+E, Ctrl+E** - Run selected query
- **Ctrl+E, Ctrl+R** - Run current file
- **Ctrl+E, Ctrl+C** - Connect/Disconnect

---

## 🎯 Quick Start Checklist

- [ ] Install SQLTools extension
- [ ] Install MySQL/MariaDB Driver
- [ ] Restart VS Code
- [ ] Start MySQL service
- [ ] Click SQLTools icon in sidebar
- [ ] Click connect (🔌) on "Coastal Region Database"
- [ ] Open `queries.sql`
- [ ] Run a test query: `SELECT * FROM sightings;`
- [ ] ✅ Success!

---

## 🐛 Troubleshooting

### Problem: "Connection refused"
**Solution:** MySQL service is not running
```powershell
net start MySQL80
```

### Problem: "Access denied"
**Solution:** Check password in `.vscode/settings.json`
- Should be: `thaslim@9695`

### Problem: "Database does not exist"
**Solution:** Run setup script
```powershell
.\setup-mysql.ps1
```

### Problem: SQLTools not showing in sidebar
**Solution:** 
1. Restart VS Code
2. Check if extension is installed
3. Look for database icon on left sidebar

---

## 📚 Useful Files Created

1. **`.vscode/settings.json`** - SQLTools configuration
2. **`queries.sql`** - 25+ ready-to-use queries
3. **`database.sql`** - Database schema
4. **`server.js`** - Backend API server

---

## 🚀 Next Steps

1. ✅ Install SQLTools
2. ✅ Connect to database
3. ✅ Run queries from `queries.sql`
4. ✅ Explore your data visually
5. ✅ Start your server: `npm run dev`
6. ✅ Test API: http://localhost:3002/test-db.html

---

## 💡 Pro Tips

1. **Save frequently used queries** in `queries.sql`
2. **Use Ctrl+E, Ctrl+E** to run queries quickly
3. **Right-click tables** for quick actions
4. **Export data** to CSV for reports
5. **Use transactions** for safe updates:
   ```sql
   START TRANSACTION;
   UPDATE sightings SET notes = 'test' WHERE id = 1;
   -- Check if correct, then:
   COMMIT;
   -- Or if wrong:
   -- ROLLBACK;
   ```

---

**Happy Querying! 🎉**

Need help? Just ask! 😊

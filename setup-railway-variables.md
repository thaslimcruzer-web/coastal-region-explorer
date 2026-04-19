# Railway Environment Variables Setup Script

This script will help you verify that your Railway environment variables are correctly configured.

## 🎯 Required Environment Variables

Your Railway Node.js service needs these 7 environment variables:

### Manual Variables (Type these yourself):
1. **NODE_ENV** = `production`
2. **PORT** = `3001`

### From MySQL Service (Copy these from your MySQL service):
3. **DB_HOST** = (Copy from MySQL's `MYSQLHOST`)
4. **DB_USER** = (Copy from MySQL's `MYSQLUSER`)
5. **DB_PASSWORD** = (Copy from MySQL's `MYSQLPASSWORD`)
6. **DB_NAME** = (Copy from MySQL's `MYSQLDATABASE`)
7. **DB_PORT** = (Copy from MySQL's `MYSQLPORT`)

---

## 📋 Step-by-Step Instructions

### Step 1: Open Railway Dashboard
1. Go to: https://railway.app
2. Login with GitHub
3. Click on your project: `coastal-region-explorer`

### Step 2: Check MySQL Service Exists
1. You should see **2 services** in your project:
   - `coastal-region-explorer` (Node.js app)
   - `MySQL` (database)
   
2. If MySQL is missing:
   - Click **"+ New"**
   - Select **"Database"** → **"Add MySQL"**
   - Wait 2 minutes for provisioning

### Step 3: Get MySQL Variables
1. Click on the **MySQL service**
2. Go to **"Variables"** tab
3. You'll see these auto-generated variables:
   - `MYSQLHOST` (e.g., `mysql.railway.internal`)
   - `MYSQLUSER` (usually `root`)
   - `MYSQLPASSWORD` (long random string)
   - `MYSQLDATABASE` (usually `railway`)
   - `MYSQLPORT` (usually `3306`)

4. **Keep this tab open** - you'll need to copy these values

### Step 4: Set Variables in Node.js Service
1. Click on **coastal-region-explorer** service (your Node.js app)
2. Go to **"Variables"** tab
3. Click **"New Variable"** button
4. Add these variables one by one:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NODE_ENV` | `production` | Type manually |
| `PORT` | `3001` | Type manually |
| `DB_HOST` | (copy MYSQLHOST value) | From MySQL service |
| `DB_USER` | (copy MYSQLUSER value) | From MySQL service |
| `DB_PASSWORD` | (copy MYSQLPASSWORD value) | From MySQL service |
| `DB_NAME` | (copy MYSQLDATABASE value) | From MySQL service |
| `DB_PORT` | (copy MYSQLPORT value) | From MySQL service |

### Step 5: Verify All Variables
After adding all 7 variables, your Variables tab should show:
```
NODE_ENV = production
PORT = 3001
DB_HOST = mysql.railway.internal (or similar)
DB_USER = root
DB_PASSWORD = ******** (hidden)
DB_NAME = railway
DB_PORT = 3306
```

### Step 6: Wait for Auto-Deploy
- Railway will **automatically redeploy** when you add/change variables
- Wait 1-2 minutes for deployment to complete
- Look for ✅ green checkmark

### Step 7: Test Your Live Link
Once deployment is complete, test these URLs:

1. **Main Website:**
   ```
   https://coastal-region-explorer.up.railway.app
   ```

2. **API Health Check:**
   ```
   https://coastal-region-explorer.up.railway.app/api/health
   ```
   
   Expected response:
   ```json
   {
     "status": "ok",
     "database": "connected"
   }
   ```

---

## 🐛 Troubleshooting

### ❌ Deployment Still Failing?

**Check the logs:**
1. Click on your Node.js service
2. Go to **"Deployments"** tab
3. Click on the latest deployment
4. Look for error messages

**Common errors:**
- `ECONNREFUSED` → DB variables are wrong
- `ER_ACCESS_DENIED_ERROR` → DB_PASSWORD is incorrect
- `Unknown database` → DB_NAME is wrong
- `Port 3001 already in use` → PORT variable issue

### ❌ Database Not Connected?

1. Verify all 5 DB_* variables match MySQL service exactly
2. Make sure MySQL service is running (green checkmark)
3. Try copying variables again (no extra spaces!)
4. Wait 2 minutes after setting variables

### ❌ Site Shows 502 Error?

1. Check if deployment completed successfully
2. Verify PORT=3001 is set
3. Check logs for startup errors
4. Try redeploying manually

---

## ✅ Success Checklist

- [ ] MySQL service is running (green checkmark)
- [ ] All 7 environment variables are set in Node.js service
- [ ] Deployment shows green checkmark ✅
- [ ] No errors in deployment logs
- [ ] Health check returns `{"status": "ok", "database": "connected"}`
- [ ] Main website loads in browser

---

## 🎉 You're Done!

Once all variables are set and deployment succeeds, your live link will be:
```
https://coastal-region-explorer.up.railway.app
```

**Your app is now live and connected to the database!** 🚀

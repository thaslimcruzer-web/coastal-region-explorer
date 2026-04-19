# Railway Deployment - Complete Step-by-Step Guide

## Your Project Info
- **GitHub Repository:** https://github.com/thaslimcruzer-web/coastal-region-explorer
- **Project Name:** coastal-region-explorer
- **Expected Live URL:** https://coastal-region-explorer.up.railway.app

---

## STEP 1: Go to Railway

1. **Open this link in your browser:** https://railway.app
2. **Click "Login"** or "Start a New Project"
3. **Choose "Login with GitHub"**
4. **Authorize Railway** to access your GitHub account

---

## STEP 2: Create New Project from GitHub

1. After logging in, click **"+ New Project"** button
2. Select **"Deploy from GitHub repo"**
3. You'll see a list of your GitHub repositories
4. **Find and click:** `thaslimcruzer-web/coastal-region-explorer`
5. Railway will automatically:
   - Detect it's a Node.js project (from package.json)
   - Start building your app
   - Show a deployment progress screen

**Wait for the initial deployment to complete** (about 1-2 minutes)

---

## STEP 3: Add MySQL Database

1. In your Railway project dashboard, you'll see your Node.js service as a box
2. Click the **"+ New"** button (usually at the top or beside your service)
3. Select **"Database"** from the options
4. Choose **"MySQL"**
5. Railway will provision a MySQL database (takes about 2 minutes)
6. You'll see a new MySQL box appear in your project

---

## STEP 4: Get MySQL Credentials

1. **Click on the MySQL database box** in your project
2. Go to the **"Variables"** tab at the top
3. You'll see these variables automatically created by Railway:
   ```
   MYSQLHOST = xxx.railway.internal
   MYSQLUSER = root
   MYSQLPASSWORD = (auto-generated password)
   MYSQLDATABASE = railway
   MYSQLPORT = 3306
   ```
4. **Keep this tab open** - you'll need to copy these values

---

## STEP 5: Configure Node.js Environment Variables

1. **Click on your Node.js service box** (coastal-region-explorer)
2. Go to the **"Variables"** tab
3. Click **"+ New Variable"** or "Add Variable"
4. Add these variables one by one:

   | Variable Name | Value (copy from MySQL) |
   |--------------|------------------------|
   | DB_HOST | (copy MYSQLHOST value) |
   | DB_USER | (copy MYSQLUSER value) |
   | DB_PASSWORD | (copy MYSQLPASSWORD value) |
   | DB_NAME | (copy MYSQLDATABASE value) |
   | DB_PORT | (copy MYSQLPORT value) |
   | NODE_ENV | production |
   | PORT | 3001 |

5. After adding all variables, Railway will **automatically redeploy** your app

---

## STEP 6: Wait for Redeployment

1. Railway will show "Deploying..." status
2. Wait for it to show "Deployed" with a green checkmark
3. This takes about 1-2 minutes
4. Check the **Deployments** tab to see logs

---

## STEP 7: Setup Database Schema

1. In your Node.js service, go to the **"Settings"** tab
2. Scroll down to find **"Open Shell"** or go to **"Shell"** tab
3. A terminal will open in your browser
4. Run this command:
   ```bash
   node setup-db.js
   ```
5. Wait for it to complete - you should see success messages
6. This creates all your database tables

**Alternative:** If setup-db.js doesn't exist, run:
```bash
npm install
node -e "require('./database.js').initializeDatabase()"
```

---

## STEP 8: Get Your Public Live Link!

1. Go to your Node.js service **"Settings"** tab
2. Look for **"Domains"** or **"Networking"** section
3. You'll see your public URL:
   ```
   https://coastal-region-explorer-production-xxxxx.up.railway.app
   ```
4. **Click the link** to open your live app!
5. You can also:
   - Click **"Generate Domain"** if not automatically created
   - Add a custom domain (optional)

---

## STEP 9: Test Your Live App

1. Open your public URL in browser
2. Test the health check: `YOUR_URL/api/health`
3. You should see:
   ```json
   {
     "status": "ok",
     "database": "connected"
   }
   ```

---

## Troubleshooting

### If Deployment Fails:
1. Check the **Deployments** tab for error logs
2. Common issues:
   - Missing environment variables
   - Database connection failed
   - Port configuration wrong

### If Database Connection Fails:
1. Verify all DB_* variables are correct
2. Make sure MySQL service is running (green checkmark)
3. Check that you copied values from MYSQLHOST, not adding manually

### If App Doesn't Load:
1. Check if deployment succeeded (green checkmark)
2. Verify PORT is set to 3001
3. Check deployment logs for errors

---

## What You'll Have After This:

✅ **Permanent public URL** - always accessible  
✅ **Cloud MySQL database** - fully managed  
✅ **Auto-deployment** - pushes from GitHub automatically  
✅ **Free hosting** - $5 credit per month on Railway  
✅ **HTTPS enabled** - secure connection  

---

## Need Help?

If you get stuck at any step, tell me which step and I'll help you troubleshoot!

**Railway Dashboard:** https://railway.app/dashboard  
**Your Project:** Look for "coastal-region-explorer"

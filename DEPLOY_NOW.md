# 🚀 Deploy to Railway - Quick Guide

## Your Live Link Will Be:
```
https://coastal-region-explorer.up.railway.app
```

---

## ✅ Step-by-Step Deployment:

### 1️⃣ Push Code to GitHub
```bash
git add .
git commit -m "Fix Railway deployment issues"
git push origin main
```

### 2️⃣ Deploy on Railway

1. Go to: **https://railway.app**
2. Login with GitHub
3. Click **"+ New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose: `thaslimcruzer-web/coastal-region-explorer`
6. Wait for build to complete (~1 minute)

### 3️⃣ Add MySQL Database

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"MySQL"**
3. Wait for provisioning (~2 minutes)

### 4️⃣ Set Environment Variables

1. Click on your **Node.js service** (coastal-region-explorer)
2. Go to **"Variables"** tab
3. Click on the MySQL service to see its variables
4. Copy these values from MySQL to your Node.js service:

| Variable | Value (from MySQL) |
|----------|-------------------|
| `DB_HOST` | Copy `MYSQLHOST` value |
| `DB_USER` | Copy `MYSQLUSER` value (usually `root`) |
| `DB_PASSWORD` | Copy `MYSQLPASSWORD` value |
| `DB_NAME` | Copy `MYSQLDATABASE` value (usually `railway`) |
| `DB_PORT` | Copy `MYSQLPORT` value (usually `3306`) |
| `NODE_ENV` | Type: `production` |
| `PORT` | Type: `3001` |

### 5️⃣ Wait for Auto-Redeploy

- Railway will automatically redeploy after adding variables
- Wait for green checkmark ✅ (~1-2 minutes)

### 6️⃣ Get Your Live Link!

1. Click on your Node.js service
2. Go to **"Settings"** tab
3. Scroll to **"Networking"** or **"Domains"** section
4. Click **"Generate Domain"** if not present
5. Your link: `https://coastal-region-explorer.up.railway.app`

---

## ✅ Test Your Live Site:

### Main Website:
```
https://coastal-region-explorer.up.railway.app
```

### API Health Check:
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

## 🐛 Troubleshooting:

### Site Not Loading?
1. Check Railway Dashboard for deployment status
2. Click on "Deployments" tab to see logs
3. Look for errors in the logs

### Database Connection Failed?
1. Verify all DB_* environment variables are correct
2. Make sure MySQL service is running (green checkmark)
3. Copy exact values from MySQL Variables tab

### Still Having Issues?
1. Check deployment logs in Railway
2. Verify your GitHub repo has the latest code
3. Try redeploying from Railway dashboard

---

## 🎉 Success Checklist:

- ✅ Code pushed to GitHub
- ✅ Railway project created from GitHub
- ✅ MySQL database added
- ✅ Environment variables configured
- ✅ Deployment shows green checkmark
- ✅ Live link accessible
- ✅ Health check returns "ok"

---

**Need Help?** Check the deployment logs in Railway dashboard!

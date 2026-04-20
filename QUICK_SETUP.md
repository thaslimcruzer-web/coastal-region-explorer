# Quick Railway Setup Guide

## 🎯 Complete Your Deployment in 3 Steps

### Step 1: Add Node.js Service to Your Railway Project

1. **Go to:** https://railway.app
2. **Click on:** your "kind-energy" project
3. **Click:** "+ New" button (top right)
4. **Select:** "GitHub Repo"
5. **Search for:** `coastal-region-explorer`
6. **Click:** "Deploy"

### Step 2: Railway Will Auto-Detect Everything

Railway will automatically:
- ✅ Detect Node.js from package.json
- ✅ Use Node.js 18.20.0 (from .node-version)
- ✅ Run `npm install`
- ✅ Start with `node server.js`
- ✅ Connect to MySQL automatically

### Step 3: Wait for Deployment (1-2 minutes)

Watch the deployment logs:
- Click on your Node.js service
- Click "Deployments" tab
- View live logs

### ✅ Success! Get Your Live URL

Once deployment succeeds:
1. Click on your **Node.js service**
2. Go to **"Settings"** tab
3. Scroll to **"Domains"**
4. Copy your URL: `https://your-app.up.railway.app`

---

## 🔍 Test Your Live Site

```
https://your-app.up.railway.app/              ← Main website
https://your-app.up.railway.app/api/health    ← Health check
https://your-app.up.railway.app/api/places    ← API endpoint
```

---

## ⚠️ Important: MySQL Connection

Your Node.js service will automatically connect to MySQL because:
- Both services are in the same Railway project
- Railway auto-injects these variables:
  - `MYSQLHOST`
  - `MYSQLUSER`
  - `MYSQLPASSWORD`
  - `MYSQLDATABASE`
  - `MYSQLPORT`

Your server.js is already configured to use these! ✅

---

## 🐛 Troubleshooting

**Deployment Failed?**
- Click "Deployments" → View logs
- Check for errors

**Database Connection Failed?**
- Wait 60 seconds for MySQL to initialize
- Server will start even if DB connection fails initially
- Check both services are in the same project

**Can't Find GitHub Repo?**
- Make sure repo is public
- Or connect GitHub account in Railway settings

---

## 📊 What's Already Fixed

✅ railway.json - Clean configuration
✅ package.json - Valid Node.js version
✅ server.js - Non-blocking DB initialization
✅ .node-version - Node 18.20.0
✅ nixpacks.toml - Build configuration
✅ Database schema - All tables with correct columns

---

**Time to complete:** 2-3 minutes
**Result:** Live website with working API! 🚀

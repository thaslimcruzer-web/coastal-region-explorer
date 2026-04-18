# 🚀 Deploy to Vercel - Complete Guide

## ⚠️ Important: Vercel + MySQL Limitation

**Vercel is a serverless platform** and **does NOT support MySQL databases directly**. You have two options:

---

## 🎯 Option A: Deploy Frontend Only to Vercel (Easy)

Deploy just the HTML/CSS/JS frontend to Vercel, but connect to an **external MySQL database**.

### Step 1: Get a Cloud MySQL Database

Choose one of these free MySQL hosting services:

#### **PlanetScale** (RECOMMENDED) - Free Tier
1. Go to: https://planetscale.com
2. Sign up with GitHub
3. Create new database: `coastal_region`
4. Get connection credentials:
   - Host
   - Username
   - Password
   - Database name

#### **Supabase** - Free Tier
1. Go to: https://supabase.com
2. Create project
3. Use the PostgreSQL database (or connect external MySQL)

#### **Railway** - $5 Free Credit
1. Go to: https://railway.app
2. Create MySQL database
3. Get credentials

### Step 2: Deploy to Vercel

#### Method 1: Vercel CLI (Command Line)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
cd "C:\Users\HP\OneDrive\Desktop\My project"
vercel

# 4. Follow prompts:
#    - Set up and deploy? Y
#    - Which scope? (select your account)
#    - Link to existing project? Y (you have one!)
#    - Project name: coastal-region-explorer
#    - Directory: ./
#    - Override settings? N

# 5. Add environment variables
vercel env add DB_HOST
vercel env add DB_USER
vercel env add DB_PASSWORD
vercel env add DB_NAME
vercel env add DB_PORT

# 6. Redeploy with env vars
vercel --prod
```

#### Method 2: Vercel Dashboard (Easier)

1. **Go to:** https://vercel.com/dashboard
2. **Find your project:** coastal-region-explorer
3. **Click:** Settings → Environment Variables
4. **Add these variables:**
   ```
   DB_HOST = your-cloud-mysql-host.com
   DB_USER = your-username
   DB_PASSWORD = your-password
   DB_NAME = coastal_region
   DB_PORT = 3306
   ```
5. **Deploy:**
   - Push code to GitHub
   - Vercel auto-deploys
   - OR run: `vercel --prod`

### Step 3: Update server.js for Vercel

Vercel uses serverless functions. Your current `server.js` needs modification:

**Create `api/index.js`:**
```javascript
const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306
    });

    const [rows] = await pool.query('SELECT * FROM places ORDER BY rating DESC');
    
    res.status(200).json({
      success: true,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

---

## 🎯 Option B: Deploy Full Stack to Railway (RECOMMENDED) ⭐

**Railway supports BOTH your app AND MySQL database** - much better for your project!

### Why Railway is Better for Your Project:
✅ Supports MySQL natively  
✅ Full Node.js backend  
✅ Environment variables  
✅ Free $5/month credit  
✅ Permanent hosting  
✅ Auto-deploy from GitHub  

### Deploy to Railway (20 minutes):

#### Step 1: Prepare Your Code

1. **Push to GitHub:**
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - Coastal Region Explorer"

# Create GitHub repo
# Go to github.com → New Repository
# Copy the repo URL

# Push code
git remote add origin https://github.com/YOUR_USERNAME/coastal-region.git
git push -u origin main
```

#### Step 2: Deploy on Railway

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **Click:** "New Project"
4. **Select:** "Deploy from GitHub repo"
5. **Choose:** your coastal-region repository

#### Step 3: Add MySQL Database

1. **In Railway dashboard:**
   - Click "+ New"
   - Select "Database" → "MySQL"
   - Wait for it to provision (~2 minutes)

2. **Copy MySQL credentials:**
   - Click on MySQL service
   - Go to "Variables" tab
   - Copy:
     ```
     DATABASE_URL = mysql://user:password@host:port/database
     ```
   - Or individual variables:
     ```
     DB_HOST = xxx.railway.internal
     DB_USER = root
     DB_PASSWORD = xxx
     DB_NAME = railway
     DB_PORT = 3306
     ```

#### Step 4: Configure Environment Variables

In Railway, add these variables:
```
DB_HOST = <from MySQL service>
DB_USER = <from MySQL service>
DB_PASSWORD = <from MySQL service>
DB_NAME = <from MySQL service>
DB_PORT = 3306
NODE_ENV = production
PORT = 3001
```

#### Step 5: Deploy Database Schema

Run the setup script once:
```bash
# In Railway shell or locally with Railway DB credentials
mysql -h <host> -u <user> -p<password> <database> < database.sql
```

Or use the setup script:
```bash
node setup-db.js
```

#### Step 6: Get Your Live Link

Railway will give you a permanent URL:
```
https://coastal-region-explorer.up.railway.app
```

✅ **Done!** Your full app with MySQL is live!

---

## 🎯 Option C: Deploy Frontend to Vercel + Backend to Railway

**Best of both worlds:**
- Frontend (HTML/CSS/JS) → Vercel (CDN, fast)
- Backend (Node.js + MySQL) → Railway

### Setup:

1. **Deploy backend to Railway** (see Option B)
2. **Update frontend API URL:**
   ```javascript
   // In script.js or wherever you make API calls
   const API_URL = 'https://coastal-region-explorer.up.railway.app/api';
   ```
3. **Deploy frontend to Vercel** (see Option A)

---

## 📊 Comparison

| Feature | Vercel | Railway |
|---------|--------|---------|
| **Frontend Hosting** | ✅ Excellent | ✅ Good |
| **Node.js Backend** | ⚠️ Serverless only | ✅ Full support |
| **MySQL Database** | ❌ Not supported | ✅ Native support |
| **Free Tier** | ✅ Generous | ✅ $5/month |
| **Setup Difficulty** | Easy | Easy |
| **Best For** | Frontend only | Full stack apps |

---

## 🚀 Quick Decision Guide

### Choose Vercel if:
- ✅ You only want to host the frontend
- ✅ You'll use a separate cloud MySQL (PlanetScale)
- ✅ You want the fastest CDN

### Choose Railway if:
- ✅ You want everything in one place
- ✅ You need MySQL hosting
- ✅ You want the easiest setup
- ✅ **RECOMMENDED for your project!** ⭐

---

## 💡 My Recommendation for Your Project

**Use Railway** because:
1. ✅ Your project uses MySQL (Vercel doesn't support it)
2. ✅ One platform for everything
3. ✅ Free tier is sufficient
4. ✅ Easy deployment
5. ✅ Permanent hosting

**Live link will be:**
```
https://coastal-region-explorer.up.railway.app
```

---

## 🔧 Need Help?

### Vercel Commands:
```bash
# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod

# Add environment variable
vercel env add DB_HOST

# View deployments
vercel ls
```

### Railway:
- Dashboard: https://railway.app/dashboard
- Docs: https://docs.railway.app
- Support: https://railway.app/discord

---

## ✅ Next Steps

### For Vercel (Frontend Only):
1. Get cloud MySQL from PlanetScale
2. Run `vercel` to deploy
3. Add environment variables
4. Update API URLs in frontend

### For Railway (Full Stack - RECOMMENDED):
1. Push code to GitHub
2. Deploy on Railway
3. Add MySQL database
4. Configure environment variables
5. Run database setup
6. **Get your live link!** 🎉

---

## 📞 Which option do you prefer?

1. **Vercel + PlanetScale** (Frontend + Cloud MySQL)
2. **Railway** (Full stack with MySQL) ⭐ RECOMMENDED
3. **Vercel Frontend + Railway Backend** (Split deployment)

**Let me know and I'll help you complete the deployment!** 🚀

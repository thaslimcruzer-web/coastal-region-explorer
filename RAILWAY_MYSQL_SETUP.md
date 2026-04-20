# 🚀 Railway MySQL Database Setup Guide

## Step-by-Step Instructions

### 1️⃣ Sign Up for Railway

1. Go to: **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Sign up with your **GitHub account** (recommended)
4. You'll get $5 free credit monthly (enough for hobby projects)

---

### 2️⃣ Create a New Project

1. Click **"+ New Project"** button
2. Select **"Deploy MySQL"** from the database options
   - OR click **"Empty Project"** first, then add MySQL
3. Wait for MySQL to provision (~1-2 minutes)
4. You'll see a green checkmark ✅ when ready

---

### 3️⃣ Get Your Database Credentials

1. Click on your **MySQL service** in the Railway dashboard
2. Go to the **"Variables"** tab
3. You'll see these auto-generated variables:

| Railway Variable | Use As |
|-----------------|---------|
| `MYSQLHOST` | DB_HOST |
| `MYSQLUSER` | DB_USER |
| `MYSQLPASSWORD` | DB_PASSWORD |
| `MYSQLDATABASE` | DB_NAME |
| `MYSQLPORT` | DB_PORT |

4. **Copy all these values** - you'll need them for Vercel

---

### 4️⃣ Initialize Database Tables (IMPORTANT!)

Railway creates an empty database. You need to create your tables.

**Option A: Using Railway's Web Interface**
1. Click on your MySQL service
2. Go to **"Data"** tab
3. Click **"Connect"** to open the web MySQL client
4. Run the SQL from `database.sql` file

**Option B: Using MySQL Client Locally**
```bash
# Install MySQL client if you don't have it
# Then connect to your Railway database:
mysql -h [MYSQLHOST] -u [MYSQLUSER] -p[MYPASSWORD] [MYSQLDATABASE]

# Then run:
source database.sql
```

**Option C: Automatic Setup (Recommended)**
After setting environment variables, your app will auto-create tables on first run!

---

### 5️⃣ Add Environment Variables to Vercel

Once you have your Railway credentials, run these commands:

```bash
# Add each variable to Vercel production environment
vercel env add DB_HOST production
# Paste your MYSQLHOST value

vercel env add DB_USER production
# Paste your MYSQLUSER value

vercel env add DB_PASSWORD production
# Paste your MYSQLPASSWORD value

vercel env add DB_NAME production
# Paste your MYSQLDATABASE value

vercel env add DB_PORT production
# Paste your MYSQLPORT value (usually 3306)

vercel env add NODE_ENV production
# Type: production
```

---

### 6️⃣ Redeploy to Vercel

After adding environment variables:

```bash
# Trigger a new deployment
vercel --prod --yes
```

---

### 7️⃣ Test Your Database Connection

Visit your API health endpoint:
```
https://coastal-region-explorer.vercel.app/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## 🎯 Quick Reference

### Your Vercel Live URL:
```
https://coastal-region-explorer.vercel.app
```

### Railway Dashboard:
```
https://railway.app/dashboard
```

### Vercel Dashboard:
```
https://vercel.com/thaslimcruzer-9380s-projects/coastal-region-explorer
```

---

## 🐛 Troubleshooting

### Database Connection Failing?
1. Verify all environment variables are correct in Vercel
2. Check Railway dashboard - MySQL service should show green ✅
3. Make sure Railway project is active (not paused)

### Tables Not Created?
- Your app automatically creates tables on first successful connection
- Check Vercel logs: `vercel logs --follow`
- Or manually run `database.sql` in Railway's MySQL client

### Railway Free Tier Limits:
- 5GB storage
- $5 free credit/month
- Database may pause after inactivity (wake up by visiting Railway dashboard)

---

## ✅ Success Checklist

- [ ] Railway account created
- [ ] MySQL database deployed on Railway
- [ ] Database credentials copied
- [ ] Environment variables added to Vercel
- [ ] Database tables initialized
- [ ] Vercel redeployed
- [ ] Health check shows "database: connected"
- [ ] Website working with live database

---

**Need Help?** Check Railway docs: https://docs.railway.app/databases/mysql

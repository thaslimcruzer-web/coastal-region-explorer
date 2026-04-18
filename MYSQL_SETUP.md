# MySQL Database Setup Guide

## 📋 Prerequisites

1. **Install MySQL Server** (if not already installed)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or use XAMPP/WAMP which includes MySQL

2. **Install Node.js** (if not already installed)
   - Download from: https://nodejs.org/

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

This will install:
- `express` - Web server framework
- `mysql2` - MySQL database driver
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `nodemon` - Auto-restart server (dev only)

---

### Step 2: Configure Database

**Option A: Using MySQL Command Line**

1. Open MySQL command line or MySQL Workbench
2. Run the database setup script:

```bash
mysql -u root -p < database.sql
```

**Option B: Manual Setup**

1. Open MySQL Workbench or phpMyAdmin
2. Copy and paste the contents of `database.sql`
3. Execute the script

**Option C: Automatic (Server will create tables)**

The server will automatically create tables on first run if they don't exist!

---

### Step 3: Configure Environment Variables

1. Open the `.env` file in the project root
2. Update with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=coastal_region
PORT=3001
```

---

## ▶️ Start the Server

### Development Mode (auto-restart on changes):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3001
📊 API available at http://localhost:3001/api

✅ MySQL Database Connected Successfully
✅ Sightings table initialized
✅ Trip items table initialized
✅ Users table initialized
```

---

## 🧪 Test the API

Open your browser or use Postman to test:

### Health Check
```
GET http://localhost:3001/api/health
```

### Get All Sightings
```
GET http://localhost:3001/api/sightings
```

### Get Recent Sightings
```
GET http://localhost:3001/api/sightings/recent
```

### Create a Sighting
```
POST http://localhost:3001/api/sightings
Content-Type: application/json

{
  "species": "Green Sea Turtle",
  "location": "Pasikudah North Reef",
  "sighting_date": "2026-04-18",
  "depth": 3.5,
  "notes": "Spotted near coral garden",
  "count": 2
}
```

---

## 📊 Database Schema

### Tables Created:

1. **sightings** - Marine life sighting reports
   - `id`, `species`, `location`, `sighting_date`, `depth`, `notes`, `count`

2. **trip_items** - User trip itinerary
   - `id`, `place_id`, `place_name`, `category`, `trip_date`, `notes`

3. **users** - User accounts
   - `id`, `name`, `email`, `password`, `role`

4. **favorites** - User favorite places
   - `id`, `user_id`, `place_id`

---

## 🔗 API Endpoints

### Sightings
- `GET /api/sightings` - Get all sightings
- `GET /api/sightings/recent` - Get recent sightings (last 10)
- `POST /api/sightings` - Create new sighting

### Trip Items
- `GET /api/trip-items` - Get trip items
- `POST /api/trip-items` - Add item to trip
- `DELETE /api/trip-items/:id` - Delete trip item
- `DELETE /api/trip-items` - Clear all trip items

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Favorites
- `GET /api/favorites/:userId` - Get user favorites
- `POST /api/favorites` - Add to favorites
- `DELETE /api/favorites/:userId/:placeId` - Remove from favorites

---

## 🛠️ Troubleshooting

### Error: "MySQL Connection Error"
- Check if MySQL server is running
- Verify credentials in `.env` file
- Ensure database `coastal_region` exists

### Error: "Port 3001 already in use"
- Change `PORT` in `.env` file to another port (e.g., 3002)
- Or stop the process using port 3001

### Error: "Access denied for user"
- Update `DB_USER` and `DB_PASSWORD` in `.env`
- Create MySQL user with proper permissions

---

## 📱 Connect Frontend to Backend

Update your `script.js` to use the API:

```javascript
// Example: Submit sighting to database
async function submitSightingToDB(sightingData) {
  try {
    const response = await fetch('http://localhost:3001/api/sightings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sightingData)
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

---

## 📦 Project Structure

```
My Project/
├── server.js              # Express server with MySQL
├── database.sql           # Database setup script
├── .env                   # Environment variables
├── package.json           # Dependencies
├── index.html             # Frontend
├── script.js              # Frontend JavaScript
├── styles.css             # Frontend styles
└── images/                # Image assets
```

---

## 🎯 Next Steps

1. ✅ Database connected
2. ⏳ Integrate API calls in frontend
3. ⏳ Add user authentication
4. ⏳ Implement real-time data sync
5. ⏳ Add admin dashboard

---

## 📞 Support

If you encounter issues:
1. Check MySQL is running: `mysql --version`
2. Check Node.js is installed: `node --version`
3. View server logs in terminal
4. Test API endpoints with Postman

---

**Happy Coding! 🚀**

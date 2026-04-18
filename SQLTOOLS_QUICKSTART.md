# ⚡ SQLTools Quick Start - 5 Minutes

## 🎯 Step-by-Step (Follow in Order)

### 1️⃣ Install Extensions (2 minutes)
```
VS Code → Ctrl+Shift+X → Search:
✓ SQLTools
✓ SQLTools MySQL/MariaDB Driver
→ Restart VS Code
```

### 2️⃣ Start MySQL (30 seconds)
```powershell
net start MySQL80
```

### 3️⃣ Connect Database (30 seconds)
```
VS Code Left Sidebar → Click Database Icon 🔌
→ "Coastal Region Database" → Click Connect
```

### 4️⃣ Run First Query (30 seconds)
```
1. Open: queries.sql
2. Select: SELECT * FROM sightings;
3. Press: Ctrl+E, Ctrl+E
4. ✅ See results!
```

---

## 📁 Files You Need

| File | Purpose |
|------|---------|
| `.vscode/settings.json` | Auto-configured ✅ |
| `queries.sql` | 25+ ready queries ✅ |
| `database.sql` | Schema backup |
| `SQLTOOLS_GUIDE.md` | Full guide |

---

## 🎨 Visual Guide

```
VS Code Sidebar:
┌─────────────────┐
│ 🗄️  SQLTools    │ ← Click this icon
├─────────────────┤
│ 🔌 Coastal      │ ← Click plug to connect
│    Region DB    │
│  └─ Tables      │ ← Expand to see tables
│     ├─ sightings│ ← Right-click → Show Records
│     ├─ trip_... │
│     ├─ users    │
│     └─ favorites│
└─────────────────┘
```

---

## ⌨️ Essential Shortcuts

| Action | Shortcut |
|--------|----------|
| Run Query | `Ctrl+E, Ctrl+E` |
| Run File | `Ctrl+E, Ctrl+R` |
| Extensions | `Ctrl+Shift+X` |

---

## ✅ Connection Settings (Already Set)

```
Host: localhost
Port: 3306
Database: coastal_region
User: root
Password: thaslim@9695
```

---

## 🚨 If It Doesn't Work

**MySQL not running?**
```powershell
net start MySQL80
```

**Database doesn't exist?**
```powershell
.\setup-mysql.ps1
```

**Wrong password?**
Check: `.vscode/settings.json`

---

## 🎉 You're Ready!

1. Connect database ✅
2. Open queries.sql ✅
3. Run queries ✅
4. Explore data ✅

**That's it! Start querying!** 🚀

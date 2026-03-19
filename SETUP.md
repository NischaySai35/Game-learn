# 🚀 Game-Learn: Getting Started Guide

**For New Team Members & Contributors**

This guide walks you through setting up the Game-Learn project on your machine.

---

## ✅ Prerequisites

Make sure you have installed:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** v8 or higher (comes with Node.js)
- **MongoDB** v8.2+ ([Download](https://www.mongodb.com/try/download/community))

Verify installation:
```bash
node --version
npm --version
mongod --version
```

---

## 📦 Installation (Just 3 Steps!)

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd Game-learn
```

### Step 2: Install All Dependencies
```bash
npm run install:all
```

This command will:
- ✅ Install root dependencies
- ✅ Install backend dependencies (`/backend`)
- ✅ Install frontend dependencies (`/frontend`)
- ✅ **Automatically create MongoDB folder** 📁
- ✅ **Automatically create log directories**

> **What happens automatically:**
> - `mongodb-data/` folder is created for MongoDB data
> - `.env.local` files are set up from templates (you may need to add API keys)

### Step 3: Set Up Environment Variables

Open these files and add your API keys:

**`backend/.env.local`:**
```env
MONGODB_URI=mongodb://localhost:27017/gamelearn
PORT=5000
JWT_SECRET=your-secret-key-here
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_API_KEY=your_google_api_key_here
```

**`frontend/.env.local`:**
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_ENABLE_MOCK_API=false
```

> Get API keys from:
> - **GEMINI_API_KEY**: [Google AI Studio](https://aistudio.google.com)
> - **GOOGLE_API_KEY**: [Google Cloud Console](https://console.cloud.google.com)

---

## 🗄️ MongoDB Setup

### On Windows:
```bash
mongod --dbpath "path/to/Game-learn/mongodb-data"
```

### On macOS/Linux:
```bash
mongod --dbpath ./mongodb-data
```

Keep MongoDB running in a separate terminal window.

---

## 🏃 Running the Project

### **Option 1: Run Everything at Once** (Recommended)
```bash
npm run dev
```

This starts:
- ✅ Backend on `http://localhost:5000`
- ✅ Frontend on `http://localhost:5173`

### **Option 2: Run Separately**
```bash
npm run dev:backend   # Terminal 1
npm run dev:frontend  # Terminal 2
```

### **Option 3: Individual Setup**
```bash
# Backend only
cd backend
npm run dev

# Frontend only (in another terminal)
cd frontend
npm run dev
```

---

## 🌐 Access the Application

Once running, open your browser and go to:

**Frontend:** `http://localhost:5173`  
**Backend:** `http://localhost:5000`

---

## ✨ Folder Structure

```
Game-learn/
├── backend/              # Express.js API server
│   ├── controllers/      # Route handlers
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── services/        # Business logic
├── frontend/             # React UI
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # Reusable components
│   │   └── api/         # API clients
├── mongodb-data/        # Local MongoDB data (auto-created)
├── scripts/             # Setup scripts
└── package.json         # Root dependencies
```

---

## 🐛 Troubleshooting

### Problem: "MongoDB connection failed"
```bash
# Check if MongoDB is running
netstat -an | grep 27017

# Start MongoDB with the correct path
mongod --dbpath ./mongodb-data
```

### Problem: "Port 5000 is already in use"
```bash
# Find and kill the process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

### Problem: "Port 5173 is already in use"
```bash
# Same as above but for port 5173
# Or manually specify a different port in frontend package.json
```

### Problem: Dependencies not installing
```bash
# Clear npm cache and reinstall
npm cache clean --force
npm run install:all
```

---

## 📝 Project Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both backend & frontend |
| `npm run dev:backend` | Start backend only |
| `npm run dev:frontend` | Start frontend only |
| `npm run build` | Build for production |
| `npm run install:all` | Install all dependencies |
| `npm run setup` | Manually run setup script |

---

## 🎮 Features to Explore

- **Courses**: Browse and learn from gamified courses
- **Achievements**: Earn badges and unlock achievements
- **Leaderboard**: Compete with other learners
- **XP & Coins**: Gain experience points and virtual currency
- **Streak Tracking**: Maintain daily learning streaks
- **Progress Dashboard**: Track your learning journey

---

## 📞 Need Help?

If you encounter issues:

1. Check the **console output** for error messages
2. Look in **browser DevTools** (F12) for JavaScript errors
3. Check **backend logs** in the terminal
4. Ask in the team chat/Discord!

---

## 🎉 You're All Set!

```bash
npm run install:all
npm run dev
# Then open http://localhost:5173 in your browser
```

**Happy Learning! 🚀**

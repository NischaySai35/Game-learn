const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: ".env.local" }); // Load from .env.local

const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const quizRoutes = require("./routes/quizRoutes");
const projectRoutes = require("./routes/projectRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const competitionRoutes = require("./routes/competitionRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const learningRoutes = require("./routes/learningRoutes");
const profileRoutes = require("./routes/profileRoutes");
const progressRoutes = require("./routes/courseProgressRoutes");
const unlockRoutes = require("./routes/unlockRoutes");
const contentRoutes = require("./routes/contentRoutes");
const topicRoutes = require("./routes/topicRoutes");
const Course = require("./models/Course");
const coursesData = require("./data/coursesData");

const app = express();

// ============================================
// MIDDLEWARE SETUP
// ============================================

// CORS Configuration - Allow frontend to communicate with backend
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,http://localhost:5174,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:5174').split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ============================================
// DATABASE CONNECTION
// ============================================
connectDB();

const seedCourses = async () => {
  try {
    console.log("Checking course count...");

    const count = await Course.countDocuments();
    console.log("Course count:", count);

    if (count === 0) {
      console.log("Seeding courses...");
      await Course.insertMany(coursesData);
      console.log("Courses inserted automatically");
    } else {
      console.log("Courses already exist");
    }
  } catch (error) {
    console.error("Error seeding courses:", error);
  }
};

// ============================================
// STATIC FILES
// ============================================
// Static folder for certificates
app.use("/certificates", express.static(path.join(__dirname, "certificates")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ============================================
// API ROUTES
// ============================================
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/unlock", unlockRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/topics", topicRoutes);

// ============================================
// HEALTH CHECK ROUTE
// ============================================
app.get("/", (req, res) => {
  res.json({
    message: "FunLearn API Running",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString()
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 Handler - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
    method: req.method
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: Object.values(err.errors).map(e => e.message)
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate field value",
      field: Object.keys(err.keyValue)[0]
    });
  }
  
  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
  
  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === "development" ? err : {}
  });
});

// ============================================
// SERVER START
// ============================================
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

mongoose.connection.once("open", async () => {
  console.log("MongoDB connected");

  await seedCourses();

  const server = app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ Environment: ${NODE_ENV}`);
    console.log(`✓ MongoDB: ${process.env.MONGO_URI || 'mongodb://localhost:27017/gamelearn'}`);
    console.log(`✓ CORS Origins: ${allowedOrigins.join(', ')}`);
    console.log(`\nBackend ready at http://localhost:${PORT}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
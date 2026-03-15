const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const quizRoutes = require("./routes/quizRoutes");
const projectRoutes = require("./routes/projectRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes")
const competitionRoutes = require("./routes/competitionRoutes")
const certificateRoutes = require("./routes/certificateRoutes")
const learningRoutes = require("./routes/learningRoutes")
const profileRoutes = require("./routes/profileRoutes")
const progressRoutes = require("./routes/courseProgressRoutes")
const unlockRoutes = require("./routes/unlockRoutes")

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Static folder for certificates
app.use("/certificates", express.static("certificates"))

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/leaderboard", leaderboardRoutes)
app.use("/api/competitions", competitionRoutes)
app.use("/api/certificate", certificateRoutes)
app.use("/api/learning", learningRoutes)
app.use("/api/profile", profileRoutes)
app.use("/api/progress", progressRoutes)
app.use("/api/unlock", unlockRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("GameLearn API Running")
})

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
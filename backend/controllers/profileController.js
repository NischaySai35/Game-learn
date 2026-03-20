const User = require("../models/User");
const Project = require("../models/Project");
const Activity = require("../models/Activity");

// ============================================
// GET PROFILE (SKILL DASHBOARD)
// ============================================
exports.getSkillProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const projects = await Project.find({ userId });

    const activities = await Activity
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      name: user.name,
      skills: user.skillsProgress || [],
      badge: user.badge,
      level: user.level,
      xp: user.xp,
      coins: user.coins,
      streak: user.streak,
      projects,
      recentActivity: activities
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: error.message });
  }
};


// ============================================
// UPDATE PROFILE (SAFE UPDATE)
// ============================================
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    const { name, interestedRoles, dailyLearningTarget } = req.body;

    // 🔒 Validation for daily target
    if (
      dailyLearningTarget !== undefined &&
      (dailyLearningTarget < 15 || dailyLearningTarget > 300)
    ) {
      return res.status(400).json({
        message: "Daily target must be between 15 and 300 minutes"
      });
    }

    // 🧠 Only update provided fields
    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (interestedRoles !== undefined) updateData.interestedRoles = interestedRoles;
    if (dailyLearningTarget !== undefined) updateData.dailyLearningTarget = dailyLearningTarget;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = updatedUser.toObject();
    delete userData.password;

    res.json(userData);

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: error.message });
  }
};


// ============================================
// UPDATE SKILLS (CATEGORY-BASED)
// ============================================
exports.updateSkills = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({ message: "Skills are required" });
    }

    // Convert to skillsProgress format
    const skillsProgress = skills.map(skill => ({
      skill,
      progress: 0
    }));

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { skillsProgress },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const userData = updatedUser.toObject();
    delete userData.password;

    res.json(userData);

  } catch (error) {
    console.error("Error updating skills:", error);
    res.status(500).json({ error: error.message });
  }
};
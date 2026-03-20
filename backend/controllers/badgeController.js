const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const calculateBadge = require('../utils/badgeCalculator');

/**
 * Updates a user's badge based on the number of certificates in the certificates folder.
 * @param {string} userId - The ID of the user.
 * @param {string} userName - The name of the user (used for filename matching).
 */
exports.updateUserBadge = async (userId, userName) => {
  try {
    const certificatesDir = path.join(__dirname, '..', 'certificates');
    
    // Ensure the directory exists
    if (!fs.existsSync(certificatesDir)) {
      console.warn('Certificates directory does not exist.');
      return;
    }

    // Read files and filter by userName (Format: UserName_CourseName.pdf)
    const files = fs.readdirSync(certificatesDir);
    const userCertificates = files.filter(file => 
      file.startsWith(`${userName}_`) && file.endsWith('.pdf')
    );

    const courseCount = userCertificates.length;
    const newBadge = calculateBadge(courseCount);

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { badge: newBadge },
      { new: true }
    );

    console.log(`Updated badge for ${userName}: ${newBadge} (Count: ${courseCount})`);
    return updatedUser;
  } catch (error) {
    console.error('Error updating user badge:', error);
  }
};

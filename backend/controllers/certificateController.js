const path = require("path")
const generateCertificate = require("../utils/certificateGenerator")
const { updateUserBadge } = require("./badgeController")

exports.createCertificate = async (req, res) => {

  try {

    const { userName, courseName, projectName, certificateId } = req.body

    const filePath = `certificates/${userName}_${courseName.replace(/\s+/g, '_')}.pdf`

    generateCertificate(userName, courseName, projectName, certificateId, filePath)

    // Trigger badge update based on folder count
    const userId = req.user?.id || req.body.userId;
    if (userId) {
      await updateUserBadge(userId, userName);
    }

    res.json({
      message: "Certificate generated successfully",
      certificate: filePath,
      certificateId: certificateId
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}
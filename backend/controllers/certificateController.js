const path = require("path")
const generateCertificate = require("../utils/certificateGenerator")

exports.createCertificate = async (req, res) => {

  try {

    const { userName, courseName, projectName, certificateId } = req.body

    const filePath = `certificates/${userName}_${courseName.replace(/\s+/g, '_')}.pdf`

    generateCertificate(userName, courseName, projectName, certificateId, filePath)

    res.json({
      message: "Certificate generated successfully",
      certificate: filePath,
      certificateId: certificateId
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}
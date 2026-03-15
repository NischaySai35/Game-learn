const path = require("path")
const generateCertificate = require("../utils/certificateGenerator")

exports.createCertificate = async (req, res) => {

  try {

    const { userName, courseName } = req.body

    const filePath = `certificates/${userName}_${courseName}.pdf`

    generateCertificate(userName, courseName, filePath)

    res.json({
      message: "Certificate generated",
      certificate: filePath
    })

  } catch (error) {

    res.status(500).json({ error: error.message })

  }

}
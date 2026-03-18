const PDFDocument = require("pdfkit")
const fs = require("fs")

function generateCertificate(userName, courseName, filePath) {

  const doc = new PDFDocument()

  doc.pipe(fs.createWriteStream(filePath))

  // Current Date & Time
  const now = new Date()
  const date = now.toLocaleDateString()
  const time = now.toLocaleTimeString()

  // Title
  doc.fontSize(30)
     .text("Certificate of Completion", { align: "center" })

  doc.moveDown(2)

  // Content
  doc.fontSize(20)
     .text("This certifies that", { align: "center" })

  doc.moveDown()

  doc.fontSize(26)
     .text(userName, { align: "center" })

  doc.moveDown()

  doc.fontSize(20)
     .text("has successfully completed the course", { align: "center" })

  doc.moveDown()

  doc.fontSize(24)
     .text(courseName, { align: "center" })

  doc.moveDown(2)

  //  Date & Time
  doc.fontSize(16)
     .text(`Date: ${date}`, { align: "center" })

  doc.text(`Time: ${time}`, { align: "center" })

  doc.end()
}

module.exports = generateCertificate
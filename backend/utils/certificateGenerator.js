const PDFDocument = require("pdfkit")
const fs = require("fs")

function generateCertificate(userName, courseName, filePath) {

  const doc = new PDFDocument()

  doc.pipe(fs.createWriteStream(filePath))

  doc.fontSize(30)
     .text("Certificate of Completion", { align: "center" })

  doc.moveDown()

  doc.fontSize(20)
     .text(`This certifies that`, { align: "center" })

  doc.moveDown()

  doc.fontSize(25)
     .text(userName, { align: "center" })

  doc.moveDown()

  doc.fontSize(20)
     .text(`has successfully completed the course`, { align: "center" })

  doc.moveDown()

  doc.fontSize(22)
     .text(courseName, { align: "center" })

  doc.end()

}

module.exports = generateCertificate
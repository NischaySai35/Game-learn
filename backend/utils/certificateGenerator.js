const PDFDocument = require("pdfkit")
const fs = require("fs")
const path = require("path")

function generateCertificate(userName, courseName, projectName, certificateId, filePath) {

  const doc = new PDFDocument({
    size: [800, 600], // Standard certificate size
    margin: 0
  })

  doc.pipe(fs.createWriteStream(filePath))

  // Load certificate template image
  const templatePath = path.join(__dirname, '../assets/certificate-template.jpg')

  try {
    // Add background image
    doc.image(templatePath, 0, 0, {
      width: 800,
      height: 600,
      align: 'center',
      valign: 'center'
    })
  } catch (error) {
    console.log('Certificate template not found, using text-only design')
    // Fallback to text-only if image not found
    doc.rect(0, 0, 800, 600).fill('#f8f9fa')
  }

  // Set font and colors for text overlays
  doc.fillColor('#2c3e50').font('Helvetica-Bold')

  // Certificate Title
  doc.fontSize(36)
     .text("CERTIFICATE OF COMPLETION", 0, 80, {
       align: "center",
       width: 800
     })

  // Main content
  doc.fontSize(18)
     .text("This certifies that", 0, 160, {
       align: "center",
       width: 800
     })

  // User Name (larger, prominent)
  doc.fontSize(32)
     .fillColor('#e74c3c')
     .text(userName, 0, 200, {
       align: "center",
       width: 800
     })

  // Completion text
  doc.fillColor('#2c3e50').fontSize(18)
     .text("has successfully completed", 0, 260, {
       align: "center",
       width: 800
     })

  // Course Name
  doc.fontSize(24)
     .fillColor('#27ae60')
     .text(`"${courseName}"`, 0, 300, {
       align: "center",
       width: 800
     })

  // Project Name
  doc.fillColor('#2c3e50').fontSize(16)
     .text("Project:", 0, 350, {
       align: "center",
       width: 800
     })

  doc.fontSize(20)
     .fillColor('#3498db')
     .text(projectName, 0, 375, {
       align: "center",
       width: 800
     })

  // Date
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  doc.fillColor('#2c3e50').fontSize(16)
     .text(`Date of Completion: ${completionDate}`, 0, 420, {
       align: "center",
       width: 800
     })

  // Certificate ID
  doc.fontSize(12)
     .fillColor('#7f8c8d')
     .text(`Certificate ID: ${certificateId}`, 0, 460, {
       align: "center",
       width: 800
     })

  // Footer
  doc.fontSize(10)
     .text("GameLearn - Gamified Learning Platform", 0, 520, {
       align: "center",
       width: 800
     })

  doc.end()
}

module.exports = generateCertificate
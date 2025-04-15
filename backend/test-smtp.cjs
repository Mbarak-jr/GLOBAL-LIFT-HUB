require('dotenv').config();
const nodemailer = require('nodemailer');

console.log("Testing SMTP connection with these settings:");
console.log({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // For self-signed certs (remove in production)
  }
});

// Test connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Connection Failed:', error);
  } else {
    console.log('✅ SMTP Connection Successful! Server is ready to send emails');
  }
});

// Optional: Send a test email
transporter.sendMail({
  from: `"Test Sender" <${process.env.SMTP_USER}>`,
  to: process.env.SMTP_USER, // Send to yourself
  subject: 'SMTP Test Email',
  text: 'This is a test email from your Node.js server!',
  html: '<b>Success!</b> Your SMTP configuration works.'
})
.then(info => console.log('📧 Test email sent:', info.messageId))
.catch(err => console.error('📧 Email send failed:', err));
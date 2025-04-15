import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

// Create the transporter object using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465', // For SSL port
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Test SMTP connection
const testSMTPConnection = async () => {
  try {
    await transporter.verify();
    console.log('SMTP Connection is successful!');
  } catch (error) {
    console.error('SMTP Connection failed:', error);
  }
};

testSMTPConnection();

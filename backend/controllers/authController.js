import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/User.js';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: process.env.NODE_ENV === 'production'
  }
});

const allowedRoles = ['beneficiary', 'donor', 'partner', 'admin'];

const generateAuthToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid role specified',
        allowedRoles
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email'
      });
    }

    const newUser = await User.create({ 
      name, 
      email, 
      password, 
      role,
      emailVerified: true
    });

    const token = generateAuthToken(newUser._id, newUser.role);

    await transporter.sendMail({
      from: `"Welcome" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: newUser.email,
      subject: 'Welcome to Our Platform',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome, ${name}!</h2>
          <p>Your account has been successfully created.</p>
          <p>You can now log in and start using our services.</p>
        </div>
      `
    });

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        emailVerified: newUser.emailVerified
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Registration failed',
      error: error.message 
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    const token = generateAuthToken(user._id, user.role);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Login failed',
      error: error.message 
    });
  }
};

export const verifyResetToken = async (req, res) => {
  const { token } = req.params;

  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }

    return res.status(200).json({ 
      success: true,
      message: 'Token is valid',
      email: user.email
    });

  } catch (error) {
    console.error('Token Verification Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Token verification failed',
      error: error.message 
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(200).json({ 
        success: true,
        message: 'If this email exists, a reset link has been sent'
      });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password/${resetToken}`;
    
    await transporter.sendMail({
      from: `"Support" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Password Reset Instructions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">Reset Password</a>
          <p>This link expires in 15 minutes.</p>
        </div>
      `
    });

    return res.status(200).json({ 
      success: true,
      message: 'Password reset email sent'
    });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Password reset failed',
      error: error.message 
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password, newPassword, confirmPassword } = req.body;

  try {
    // Debugging log - remove in production
    console.log('Reset Password Request:', {
      token,
      body: req.body
    });

    // Handle both password formats
    const actualPassword = password || newPassword;
    
    if (!actualPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Password is required' 
      });
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Passwords do not match' 
      });
    }

    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }

    user.password = actualPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json({ 
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Password reset failed',
      error: error.message 
    });
  }
};

export const testSMTPConnection = async (req, res) => {
  try {
    await transporter.verify();
    return res.status(200).json({ 
      success: true,
      message: 'SMTP connection successful' 
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: 'SMTP connection failed',
      error: error.message 
    });
  }
};

export default {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  testSMTPConnection
};
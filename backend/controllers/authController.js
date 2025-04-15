import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import User from '../models/User.js';

dotenv.config();

// Enhanced SMTP transporter configuration
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
  },
  pool: true,
  maxConnections: 5,
  rateDelta: 1000,
  rateLimit: 5
});

// Valid roles for registration
const allowedRoles = ['beneficiary', 'donor', 'partner', 'admin'];

// JWT token generation (reusable)
const generateAuthToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
  );
};

// Register a new user with email verification
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate role
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid role specified',
        allowedRoles
      });
    }

    // Check for existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const newUser = new User({ 
      name, 
      email, 
      password, 
      role,
      emailVerified: false
    });

    // Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    newUser.emailVerificationToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');
    newUser.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    await newUser.save();

    // Generate auth token
    const token = generateAuthToken(newUser._id, newUser.role);

    // Create verification URL
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;

    // Send verification email
    await transporter.sendMail({
      from: `"Verify Your Email" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: newUser.email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Our Platform, ${name}!</h2>
          <p>Please verify your email address to complete your registration:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 10px 20px; background-color: #4299e1; 
                    color: white; text-decoration: none; border-radius: 4px; margin: 15px 0;">
            Verify Email
          </a>
          <p>If you didn't create this account, please ignore this email.</p>
          <p style="font-size: 0.8em; color: #718096;">
            This link will expire in 24 hours.
          </p>
        </div>
      `
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email to verify your account.',
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
      message: 'Server error during registration',
      error: error.message 
    });
  }
};

// Login user with email verification check
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

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email before logging in',
        code: 'EMAIL_NOT_VERIFIED'
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
      message: 'Server error during login',
      error: error.message 
    });
  }
};

// Resend verification email
export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with this email'
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');
    user.emailVerificationToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    await user.save({ validateBeforeSave: false });

    // Create verification URL
    const verificationUrl = `${process.env.FRONTEND_URL}/auth/verify-email?token=${verificationToken}`;

    // Send verification email
    await transporter.sendMail({
      from: `"Verify Your Email" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Verify Your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">Email Verification</h2>
          <p>Please click the button below to verify your email address:</p>
          <a href="${verificationUrl}" 
             style="display: inline-block; padding: 10px 20px; background-color: #4299e1; 
                    color: white; text-decoration: none; border-radius: 4px; margin: 15px 0;">
            Verify Email
          </a>
          <p>If you didn't create an account, please ignore this email.</p>
          <p style="font-size: 0.8em; color: #718096;">
            This link will expire in 24 hours.
          </p>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      message: 'Verification email sent successfully'
    });

  } catch (error) {
    console.error('Resend verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to resend verification email',
      error: error.message
    });
  }
};

// Verify email with token
export const verifyEmail = async (req, res) => {
  const { token } = req.query; // Changed from req.body to req.query

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Verification token is required'
    });
  }

  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired verification token'
      });
    }

    // Mark email as verified and clear token
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    // Send welcome email
    await transporter.sendMail({
      to: user.email,
      subject: 'Email Verified Successfully',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d3748;">Email Verified</h2>
          <p>Your email address has been successfully verified!</p>
          <p>You can now log in to your account and start using our services.</p>
        </div>
      `
    });

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully'
    });

  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify email',
      error: error.message
    });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false,
      message: 'Email is required' 
    });
  }

  try {
    const user = await User.findOne({ email });
    
    // Always return success to prevent email enumeration
    if (!user) {
      return res.status(200).json({ 
        success: true,
        message: 'If this email exists, a reset link has been sent'
      });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    
    await user.save({ validateBeforeSave: false });

    // Construct reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;
    
    // Enhanced email template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d3748;">Password Reset Request</h2>
        <p>You recently requested to reset your password. Click the button below to proceed:</p>
        <a href="${resetUrl}" 
           style="display: inline-block; padding: 10px 20px; background-color: #4299e1; 
                  color: white; text-decoration: none; border-radius: 4px; margin: 15px 0;">
          Reset Password
        </a>
        <p>If you didn't request this, please ignore this email.</p>
        <p style="font-size: 0.8em; color: #718096;">
          This link will expire in 15 minutes.
        </p>
      </div>
    `;

    // Send email
    await transporter.sendMail({
      from: `"Support Team" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to: user.email,
      subject: 'Password Reset Instructions',
      html: emailHtml
    });

    return res.status(200).json({ 
      success: true,
      message: 'Password reset email sent if the account exists'
    });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Server error during password reset',
      error: error.message 
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ 
      success: false,
      message: 'Token and password are required' 
    });
  }

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
        message: 'Invalid or expired token. Please request a new password reset link.' 
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    // Update user password and clear reset token
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Send confirmation email
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Changed Successfully',
      html: `
        <p>Your password was successfully updated.</p>
        <p>If you didn't make this change, please contact our support team immediately.</p>
      `
    });

    return res.status(200).json({ 
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Reset Password Error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Error resetting password',
      error: error.message 
    });
  }
};

// Verify Reset Token
export const verifyResetToken = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ 
      success: false,
      valid: false,
      message: 'Token is required' 
    });
  }

  try {
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    }).select('-password');

    if (!user) {
      return res.status(400).json({ 
        success: false,
        valid: false,
        message: 'Invalid or expired token' 
      });
    }

    return res.status(200).json({ 
      success: true,
      valid: true,
      message: 'Token is valid',
      email: user.email,
      expiresAt: user.resetPasswordExpire
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({ 
      success: false,
      valid: false,
      message: 'Error verifying token',
      error: error.message 
    });
  }
};

// Test SMTP connection
export const testSMTPConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ SMTP Connection Successful!');
    return { success: true, message: 'SMTP Connection Successful' };
  } catch (error) {
    console.error('❌ SMTP Connection Failed:', error);
    return { success: false, message: 'SMTP Connection Failed', error: error.message };
  }
};

// Test email sending
export const sendTestEmail = async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: `"Test Sender" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TEST_RECIPIENT || process.env.SMTP_USER,
      subject: 'SMTP Test Email',
      text: 'This is a test email from your Node.js server!',
      html: '<b>Success!</b> Your SMTP configuration works.'
    });

    return res.status(200).json({
      success: true,
      message: 'Test email sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Test Email Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
};

// Export all controller functions
export default {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  resendVerificationEmail,
  verifyEmail,
  testSMTPConnection,
  sendTestEmail
};
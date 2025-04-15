import express from 'express';
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  resendVerificationEmail,
  verifyEmail
} from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/verify-reset-token/:token', verifyResetToken);

// Email verification routes
router.post('/resend-verification', resendVerificationEmail);
router.get('/verify-email', verifyEmail);

export default router;
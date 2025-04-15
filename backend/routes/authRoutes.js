import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Authentication routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Password reset routes
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Remove unused or undefined routes (verifyResetToken & verifyEmail are not defined in controller)
 
export default router;

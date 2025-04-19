import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();


// Add this at the top of authRoutes.js
router.use((req, res, next) => {
  console.log(`Auth route accessed: ${req.method} ${req.path}`);
  next();
}); 


// Authentication routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Password reset routes
router.post('/forgot-password', authController.forgotPassword);
router.get('/verify-reset-token/:token', authController.verifyResetToken);
router.post('/reset-password/:token', authController.resetPassword);

export default router;
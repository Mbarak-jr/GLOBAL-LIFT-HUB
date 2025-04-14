import express from 'express';  // Use import instead of require
import { registerUser, loginUser } from '../controllers/authController.js';  // Change to import

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;  // Use export default instead of module.exports

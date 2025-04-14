import express from 'express';
import {
  getPovertyImpactStats,
  getUserImpact,
  getCommunityImpact
} from '../controllers/impactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, getPovertyImpactStats);
router.get('/user/:userId', protect, getUserImpact);
router.get('/community', protect, getCommunityImpact);

export default router;
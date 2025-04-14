import express from 'express';
import {
  getPublicOpportunities,
  getOpportunityById,
  getInvestmentOpportunities,
  getAllOpportunitiesAdmin,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} from '../controllers/opportunityController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPublicOpportunities);
router.get('/investments', getInvestmentOpportunities);
router.get('/:id', getOpportunityById);

// Protected admin routes
router.use('/admin', protect, adminOnly);

router.get('/admin/all', getAllOpportunitiesAdmin);
router.post('/admin', createOpportunity);
router.put('/admin/:id', updateOpportunity);
router.delete('/admin/:id', deleteOpportunity);

export default router;

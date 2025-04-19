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
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getPublicOpportunities);
router.get('/investments', getInvestmentOpportunities);
router.get('/:id', getOpportunityById);

// Protected routes (admin check will be handled in controller)
router.post('/', protect, createOpportunity);
router.put('/:id', protect, updateOpportunity);
router.delete('/:id', protect, deleteOpportunity);

// Admin-only route
router.get('/admin/all', protect, getAllOpportunitiesAdmin);

export default router;
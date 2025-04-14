import express from 'express';
import {
  getInstitutions,
  getInstitution,
  createInstitution,
  updateInstitution,
  deleteInstitution
} from '../controllers/financialInstitutionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (read-only)
router.route('/')
  .get(getInstitutions);

router.route('/:id')
  .get(getInstitution);

// Protected admin routes
router.use(protect, adminOnly); // Apply to all routes below

router.route('/')
  .post(createInstitution);

router.route('/:id')
  .patch(updateInstitution)
  .delete(deleteInstitution);

export default router;
import express from 'express';
import {
  getInstitutions,
  getInstitution,
  createInstitution,
  updateInstitution,
  deleteInstitution
} from '../controllers/financialInstitutionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (read-only)
router.route('/')
  .get(getInstitutions);

router.route('/:id')
  .get(getInstitution);

// Protected routes (admin check in controller)
router.route('/')
  .post(protect, createInstitution);

router.route('/:id')
  .patch(protect, updateInstitution)
  .delete(protect, deleteInstitution);

export default router;
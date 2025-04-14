import express from 'express';
import {
  applyLoan,
  getLoans,
  updateLoanStatus
} from '../controllers/loanController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js'; // Corrected import
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router();

// Beneficiaries apply
router.post('/apply', protect, authorizeRoles('beneficiary'), applyLoan);

// Admins & Partners can view all loans
router.get('/', protect, authorizeRoles('admin', 'partner'), getLoans);

// Admin or Partner can update loan status
router.put('/:loanId', protect, authorizeRoles('admin', 'partner'), updateLoanStatus);

export default router;

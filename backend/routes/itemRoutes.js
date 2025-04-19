import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  createItemReview
} from '../controllers/itemController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getItems);

router.route('/:id')
  .get(getItemById);

// Protected routes
router.route('/:id/reviews')
  .post(protect, createItemReview);

// Admin-only routes
router.route('/')
  .post(protect, admin, createItem);

router.route('/:id')
  .put(protect, admin, updateItem)
  .delete(protect, admin, deleteItem);

export default router;
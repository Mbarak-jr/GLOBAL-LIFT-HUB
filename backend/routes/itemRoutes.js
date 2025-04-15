import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  createItemReview
} from '../controllers/itemController.js';
import { protect, sellerOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getItems)
  .post(protect, sellerOrAdmin, createItem);

router.route('/:id')
  .get(getItemById)
  .put(protect, sellerOrAdmin, updateItem)
  .delete(protect, sellerOrAdmin, deleteItem);

router.route('/:id/reviews')
  .post(protect, createItemReview);

export default router;
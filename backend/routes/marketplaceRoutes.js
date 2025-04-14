import express from 'express';
import {
  getMarketplaceItems,
  getMarketplaceItem,
  createMarketplaceItem,
  updateMarketplaceItem,
  deleteMarketplaceItem,
  createItemReview,
  getCategories,
  getCountries,
  createOrder,
  getMyOrders,
  getSellerItems,
  getSellerOrders
} from '../controllers/marketplaceController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getMarketplaceItems);
router.get('/categories', getCategories);
router.get('/countries', getCountries);
router.get('/:id', getMarketplaceItem);

// Protected routes
router.post('/:id/reviews', protect, createItemReview);
router.post('/orders', protect, createOrder);
router.get('/orders/myorders', protect, getMyOrders);
router.get('/seller/items', protect, getSellerItems);
router.get('/seller/orders', protect, getSellerOrders);

// Seller/admin routes
router.post('/', protect, upload.array('images', 5), createMarketplaceItem);
router.put('/:id', protect, upload.array('images', 5), updateMarketplaceItem);
router.delete('/:id', protect, deleteMarketplaceItem);

export default router;
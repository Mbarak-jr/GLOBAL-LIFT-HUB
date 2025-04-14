import MarketplaceItem from '../models/MarketplaceItem.js';
import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';

// @desc    Get all marketplace items
// @route   GET /api/marketplace
// @access  Public
const getMarketplaceItems = asyncHandler(async (req, res) => {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    country,
    fairTrade,
    organic,
    sort,
    page = 1,
    limit = 20
  } = req.query;

  const query = {};

  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  if (fairTrade === 'true') query.isFairTrade = true;
  if (organic === 'true') query.isOrganic = true;
  if (country) query['location.country'] = country;

  let sortOption = {};
  if (sort) {
    switch (sort) {
      case 'price-low':
        sortOption = { price: 1 };
        break;
      case 'price-high':
        sortOption = { price: -1 };
        break;
      case 'rating':
        sortOption = { rating: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }
  }

  const searchQuery = search ? {
    $text: {
      $search: search
    }
  } : {};

  const finalQuery = { ...query, ...searchQuery };

  const items = await MarketplaceItem.find(finalQuery)
    .sort(sortOption)
    .limit(limit)
    .skip((page - 1) * limit)
    .populate('seller', 'name avatar');

  const count = await MarketplaceItem.countDocuments(finalQuery);

  res.json({
    items,
    page: Number(page),
    pages: Math.ceil(count / limit),
    total: count
  });
});

// @desc    Get single marketplace item
// @route   GET /api/marketplace/:id
// @access  Public
const getMarketplaceItem = asyncHandler(async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id)
    .populate('seller', 'name avatar rating')
    .populate('reviews.user', 'name avatar');

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  res.json(item);
});

// @desc    Create new marketplace item
// @route   POST /api/marketplace
// @access  Private
const createMarketplaceItem = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    quantity,
    location,
    povertyImpact,
    productionMethod,
    isFairTrade,
    isOrganic,
    isRecycled,
    tags,
    shippingOptions
  } = req.body;

  const images = req.files?.map(file => file.path) || [];

  if (!images.length) {
    res.status(400);
    throw new Error('Please upload at least one image');
  }

  const item = new MarketplaceItem({
    name,
    description,
    price,
    category,
    images,
    quantity,
    seller: req.user._id,
    location,
    povertyImpact,
    productionMethod,
    isFairTrade: isFairTrade || false,
    isOrganic: isOrganic || false,
    isRecycled: isRecycled || false,
    tags,
    shippingOptions
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

// @desc    Update marketplace item
// @route   PUT /api/marketplace/:id
// @access  Private (seller or admin)
const updateMarketplaceItem = asyncHandler(async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user is seller or admin
  if (item.seller.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized to update this item');
  }

  const {
    name,
    description,
    price,
    category,
    quantity,
    location,
    povertyImpact,
    productionMethod,
    isFairTrade,
    isOrganic,
    isRecycled,
    tags,
    shippingOptions
  } = req.body;

  const images = req.files?.map(file => file.path) || item.images;

  item.name = name || item.name;
  item.description = description || item.description;
  item.price = price || item.price;
  item.category = category || item.category;
  item.images = images;
  item.quantity = quantity || item.quantity;
  item.location = location || item.location;
  item.povertyImpact = povertyImpact || item.povertyImpact;
  item.productionMethod = productionMethod || item.productionMethod;
  item.isFairTrade = isFairTrade || item.isFairTrade;
  item.isOrganic = isOrganic || item.isOrganic;
  item.isRecycled = isRecycled || item.isRecycled;
  item.tags = tags || item.tags;
  item.shippingOptions = shippingOptions || item.shippingOptions;

  const updatedItem = await item.save();
  res.json(updatedItem);
});

// @desc    Delete marketplace item
// @route   DELETE /api/marketplace/:id
// @access  Private (seller or admin)
const deleteMarketplaceItem = asyncHandler(async (req, res) => {
  const item = await MarketplaceItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user is seller or admin
  if (item.seller.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('Not authorized to delete this item');
  }

  await item.remove();
  res.json({ message: 'Item removed' });
});

// @desc    Create new review
// @route   POST /api/marketplace/:id/reviews
// @access  Private
const createItemReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const item = await MarketplaceItem.findById(req.params.id);

  if (!item) {
    res.status(404);
    throw new Error('Item not found');
  }

  // Check if user already reviewed
  const alreadyReviewed = item.reviews.find(
    r => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Item already reviewed');
  }

  const review = {
    user: req.user._id,
    rating: Number(rating),
    comment
  };

  item.reviews.push(review);
  item.rating = item.reviews.reduce((acc, item) => item.rating + acc, 0) / item.reviews.length;

  await item.save();
  res.status(201).json({ message: 'Review added' });
});

// @desc    Get categories
// @route   GET /api/marketplace/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await MarketplaceItem.distinct('category');
  res.json(categories);
});

// @desc    Get countries
// @route   GET /api/marketplace/countries
// @access  Public
const getCountries = asyncHandler(async (req, res) => {
  const countries = await MarketplaceItem.distinct('location.country');
  res.json(countries.filter(Boolean));
});

// @desc    Create new order
// @route   POST /api/marketplace/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
    buyerNotes
  } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  // Verify items and calculate total
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const dbItem = await MarketplaceItem.findById(item.itemId);
    
    if (!dbItem) {
      res.status(404);
      throw new Error(`Item not found: ${item.itemId}`);
    }

    if (dbItem.quantity < item.quantity) {
      res.status(400);
      throw new Error(`Not enough quantity for item: ${dbItem.name}`);
    }

    const itemTotal = dbItem.price * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      item: item.itemId,
      quantity: item.quantity,
      priceAtPurchase: dbItem.price
    });

    // Reduce item quantity
    dbItem.quantity -= item.quantity;
    await dbItem.save();
  }

  // Calculate poverty impact score
  const povertyImpact = {
    povertyReductionScore: Math.min(100, orderItems.length * 5), // Simple scoring
    communityDevelopment: 'This purchase supports local artisans and small businesses'
  };

  const order = new Order({
    buyer: req.user._id,
    items: orderItems,
    totalAmount,
    shippingAddress,
    paymentMethod,
    buyerNotes,
    povertyImpact
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get user orders
// @route   GET /api/marketplace/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ buyer: req.user._id })
    .populate('items.item', 'name images')
    .sort('-createdAt');
  res.json(orders);
});

// @desc    Get seller items
// @route   GET /api/marketplace/seller/items
// @access  Private (seller)
const getSellerItems = asyncHandler(async (req, res) => {
  const items = await MarketplaceItem.find({ seller: req.user._id });
  res.json(items);
});

// @desc    Get seller orders
// @route   GET /api/marketplace/seller/orders
// @access  Private (seller)
const getSellerOrders = asyncHandler(async (req, res) => {
  // Find orders that contain items sold by this seller
  const orders = await Order.aggregate([
    {
      $lookup: {
        from: 'marketplaceitems',
        localField: 'items.item',
        foreignField: '_id',
        as: 'itemDetails'
      }
    },
    {
      $match: {
        'itemDetails.seller': new mongoose.Types.ObjectId(req.user._id)
      }
    },
    {
      $sort: { createdAt: -1 }
    }
  ]);

  res.json(orders);
});

export {
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
};
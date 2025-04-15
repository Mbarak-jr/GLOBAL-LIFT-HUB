import Item from '../models/itemModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all items with filters
// @route   GET /api/items
// @access  Public
const getItems = asyncHandler(async (req, res) => {
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
    limit = 12
  } = req.query;

  // Build query object
  const query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (country) {
    query.country = country;
  }

  if (fairTrade === 'true') {
    query.fairTrade = true;
  }

  if (organic === 'true') {
    query.organic = true;
  }

  // Sorting
  let sortOption = { createdAt: -1 }; // Default: newest first
  if (sort === 'lowest') {
    sortOption = { price: 1 };
  } else if (sort === 'highest') {
    sortOption = { price: -1 };
  } else if (sort === 'toprated') {
    sortOption = { rating: -1 };
  }

  // Pagination
  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;

  const count = await Item.countDocuments(query);
  const items = await Item.find(query)
    .populate('category', 'name')
    .populate('seller', 'name')
    .sort(sortOption)
    .skip(skip)
    .limit(pageSize);

  res.json({
    items,
    page: pageNumber,
    pages: Math.ceil(count / pageSize),
    total: count
  });
});

// @desc    Fetch single item
// @route   GET /api/items/:id
// @access  Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)
    .populate('category', 'name description')
    .populate('seller', 'name email');

  if (item) {
    res.json(item);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Create new item
// @route   POST /api/items
// @access  Private/Seller
const createItem = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    images,
    category,
    country,
    fairTrade,
    organic,
    stock
  } = req.body;

  const item = new Item({
    name,
    description,
    price,
    images,
    category,
    seller: req.user._id,
    country,
    fairTrade,
    organic,
    stock
  });

  const createdItem = await item.save();
  res.status(201).json(createdItem);
});

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private/Seller or Admin
const updateItem = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    images,
    category,
    country,
    fairTrade,
    organic,
    stock
  } = req.body;

  const item = await Item.findById(req.params.id);

  if (item) {
    // Check if the user is the seller or admin
    if (item.seller.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to update this item');
    }

    item.name = name || item.name;
    item.description = description || item.description;
    item.price = price || item.price;
    item.images = images || item.images;
    item.category = category || item.category;
    item.country = country || item.country;
    item.fairTrade = fairTrade !== undefined ? fairTrade : item.fairTrade;
    item.organic = organic !== undefined ? organic : item.organic;
    item.stock = stock || item.stock;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private/Seller or Admin
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    // Check if the user is the seller or admin
    if (item.seller.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      res.status(401);
      throw new Error('Not authorized to delete this item');
    }

    await item.remove();
    res.json({ message: 'Item removed' });
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

// @desc    Create new review
// @route   POST /api/items/:id/reviews
// @access  Private
const createItemReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const item = await Item.findById(req.params.id);

  if (item) {
    const alreadyReviewed = item.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Item already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    };

    item.reviews.push(review);
    item.numReviews = item.reviews.length;
    item.rating =
      item.reviews.reduce((acc, item) => item.rating + acc, 0) /
      item.reviews.length;

    await item.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Item not found');
  }
});

export {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  createItemReview
};
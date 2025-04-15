import Item from '../models/itemModel.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all countries with items
// @route   GET /api/countries
// @access  Public
const getCountries = asyncHandler(async (req, res) => {
  const countries = await Item.distinct('country');
  res.json(countries);
});

export { getCountries };
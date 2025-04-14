import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Opportunity from '../models/opportunityModel.js';

// Public: Get all published opportunities
export const getPublicOpportunities = asyncHandler(async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ isPublished: true });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching opportunities', error: err.message });
  }
});

// Public: Get one opportunity by ID
export const getOpportunityById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid opportunity ID');
  }

  const opportunity = await Opportunity.findById(req.params.id);
  if (!opportunity || !opportunity.isPublished) {
    res.status(404);
    throw new Error('Opportunity not found');
  }
  res.json(opportunity);
});

// Public: Get investment opportunities
export const getInvestmentOpportunities = asyncHandler(async (req, res) => {
  const opportunities = await Opportunity.find({
    category: 'investment',
    isPublished: true
  });
  res.json(opportunities);
});

// Admin: Get all opportunities
export const getAllOpportunitiesAdmin = asyncHandler(async (req, res) => {
  const opportunities = await Opportunity.find({})
    .populate('postedBy', 'name email')
    .exec();
  res.json(opportunities);
});

// Admin: Create opportunity
export const createOpportunity = asyncHandler(async (req, res) => {
  const { title, description, category, location, eligibility, deadline, isPublished } = req.body;

  if (!title || !description || !category || !location || !eligibility || !deadline) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  const newOpportunity = new Opportunity({
    title,
    description,
    category,
    location,
    eligibility,
    deadline,
    isPublished,
    postedBy: req.user._id
  });

  const created = await newOpportunity.save();
  res.status(201).json(created);
});

// Admin: Update opportunity
export const updateOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity) {
    res.status(404);
    throw new Error('Opportunity not found');
  }

  const updates = req.body;
  Object.assign(opportunity, updates);

  const updated = await opportunity.save();
  res.json(updated);
});

// Admin: Delete opportunity (soft delete)
export const deleteOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity) {
    res.status(404);
    throw new Error('Opportunity not found');
  }

  // Soft delete (mark as deleted)
  opportunity.isDeleted = true;
  await opportunity.save();

  res.json({ message: 'Opportunity deleted' });
});

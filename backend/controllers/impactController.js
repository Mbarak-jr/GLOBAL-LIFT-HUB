import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import MarketplaceItem from '../models/MarketplaceItem.js';
import User from '../models/userModel.js';

// @desc    Get poverty impact statistics
// @route   GET /api/impact/stats
// @access  Private
const getPovertyImpactStats = asyncHandler(async (req, res) => {
  const [orders, items, users] = await Promise.all([
    Order.aggregate([
      {
        $group: {
          _id: null,
          totalJobsCreated: { $sum: '$povertyImpact.jobsCreated' },
          totalAmount: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      }
    ]),
    MarketplaceItem.countDocuments(),
    User.countDocuments({ role: 'beneficiary' })
  ]);

  res.json({
    totalJobsCreated: orders[0]?.totalJobsCreated || 0,
    totalTransactions: orders[0]?.count || 0,
    totalAmount: orders[0]?.totalAmount || 0,
    totalProducts: items,
    totalBeneficiaries: users
  });
});

// @desc    Get user impact
// @route   GET /api/impact/user/:userId
// @access  Private
const getUserImpact = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const impact = await Order.aggregate([
    { $match: { buyer: user._id } },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: '$totalAmount' },
        jobsSupported: { $sum: '$povertyImpact.jobsCreated' },
        orderCount: { $sum: 1 }
      }
    }
  ]);

  res.json({
    user: {
      name: user.name,
      email: user.email
    },
    impact: impact[0] || {
      totalSpent: 0,
      jobsSupported: 0,
      orderCount: 0
    }
  });
});

// @desc    Get community impact
// @route   GET /api/impact/community
// @access  Private
const getCommunityImpact = asyncHandler(async (req, res) => {
  const impact = await MarketplaceItem.aggregate([
    {
      $group: {
        _id: '$location.country',
        totalProducts: { $sum: 1 },
        jobsCreated: { $sum: '$povertyImpact.jobsCreated' }
      }
    },
    { $sort: { jobsCreated: -1 } }
  ]);

  res.json(impact);
});

export {
  getPovertyImpactStats,
  getUserImpact,
  getCommunityImpact
};
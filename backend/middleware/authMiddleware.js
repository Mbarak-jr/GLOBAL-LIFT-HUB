import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Basic authentication middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin check middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Admin access required');
  }
});

// Email verification check middleware
const verifiedUser = asyncHandler(async (req, res, next) => {
  if (req.user?.emailVerified) {
    next();
  } else {
    res.status(403);
    throw new Error('Please verify your email first');
  }
});

export { protect, admin, verifiedUser };
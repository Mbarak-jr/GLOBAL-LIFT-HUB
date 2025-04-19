import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

// Protect middleware to ensure the user is authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using JWT secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by decoded user ID
      const user = await User.findById(decoded.userId).select('-password');

      if (!user) {
        res.status(401);
        throw new Error('User not found');
      }

      // Attach the user object to the request
      req.user = user;
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

// Admin-only middleware to ensure the user has an admin role
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied: Admins only');
  }
};

// Seller-only middleware to ensure the user has a seller role
const seller = (req, res, next) => {
  if (req.user && req.user.role === 'seller') {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied: Sellers only');
  }
};

// Seller or Admin middleware for marketplace operations
const sellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied: Seller or Admin privileges required');
  }
};

// Verified user middleware (email verified)
const verifiedUser = (req, res, next) => {
  if (req.user && req.user.emailVerified) {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied: Please verify your email first');
  }
};

export { protect, admin, seller, sellerOrAdmin, verifiedUser };
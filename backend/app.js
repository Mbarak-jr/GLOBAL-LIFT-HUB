import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { protect, admin, seller, sellerOrAdmin, verifiedUser } from './middleware/authMiddleware.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import opportunityRoutes from './routes/opportunityRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import financialInstitutionRoutes from './routes/financialInstitutions.js';
import userRoutes from './routes/userRoutes.js';
import heroSectionRoutes from './routes/heroSectionRoutes.js';
import featureSectionRoutes from './routes/featureSectionRoutes.js';
// Marketplace Routes
import itemRoutes from './routes/itemRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import countryRoutes from './routes/countryRoutes.js';

// Configure environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173', // Local development
      'https://globallifthub.onrender.com', // Production frontend
      'https://globallifthubapi.onrender.com', // Production backend
      process.env.FRONTEND_URL, // From environment variable
    ].filter(Boolean); // Remove any falsy values
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Security middleware
app.disable('x-powered-by');
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files with cache control
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : '0'
}));

// API Documentation Route
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'api-docs.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    services: {
      database: 'MongoDB',
      authentication: 'JWT',
      marketplace: 'active'
    }
  });
});


// Add this right before your route declarations
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
}); 

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/financial-institutions', financialInstitutionRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/users', protect, userRoutes);
app.use('/api/hero-sections', heroSectionRoutes);
app.use('/api/feature-sections', featureSectionRoutes);

// Marketplace Routes
app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/countries', countryRoutes);

// Admin Protected Routes
app.use('/api/admin/roles', protect, admin, roleRoutes);
app.use('/api/admin/financial-institutions', protect, admin, financialInstitutionRoutes);
app.use('/api/admin/hero-sections', protect, admin, heroSectionRoutes);
app.use('/api/admin/feature-sections', protect, admin, featureSectionRoutes);
app.use('/api/admin/categories', protect, admin, categoryRoutes);

// Seller Protected Routes
app.use('/api/seller/items', protect, seller, itemRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Server Configuration
const PORT = process.env.PORT || 5000;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log(`
  🌍 Server running in ${ENVIRONMENT} mode
  🚀 Listening on port ${PORT}
  🔗 MongoDB Connected: ${process.env.MONGO_URI?.split('@')[1]?.split('/')[0] || 'Connected'}
  🌐 Allowed Origins: 
     - http://localhost:5173
     - https://globallifthub.onrender.com
     - https://globallifthubapi.onrender.com
     - ${process.env.FRONTEND_URL}
  🔒 Authentication required for protected routes
  👑 Admin privileges required for admin routes
  🛍️ Seller privileges required for seller routes
  📚 API docs available at /api-docs
  🏥 Health check at /api/health
  🎯 Dynamic Sections:
     - Hero: /api/hero-sections
     - Features: /api/feature-sections
  🛒 Marketplace Features:
     - Items: /api/items
     - Categories: /api/categories
     - Countries: /api/countries
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;
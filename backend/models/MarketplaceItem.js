import mongoose from 'mongoose';

const marketplaceItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: [
      'agriculture', 
      'handicrafts', 
      'textiles', 
      'food', 
      'services', 
      'digital',
      'recycled'
    ]
  },
  images: [{
    type: String,
    required: true
  }],
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    country: String,
    region: String,
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  },
  povertyImpact: {
    jobsCreated: Number,
    communityBenefit: String
  },
  productionMethod: {
    type: String,
    enum: ['artisanal', 'small-batch', 'cooperative', 'other'],
    required: true
  },
  isFairTrade: Boolean,
  isOrganic: Boolean,
  isRecycled: Boolean,
  tags: [String],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  shippingOptions: {
    localPickup: Boolean,
    worldwideShipping: Boolean,
    ecoFriendlyPackaging: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add text index for search
marketplaceItemSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  'location.country': 'text',
  'location.region': 'text'
});

// Virtual for average rating
marketplaceItemSchema.virtual('averageRating').get(function() {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / this.reviews.length;
});

const MarketplaceItem = mongoose.model('MarketplaceItem', marketplaceItemSchema);

export default MarketplaceItem;
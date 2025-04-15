// models/FeatureSection.js
import mongoose from 'mongoose';

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  path: { type: String, required: true },
  color: { type: String, required: true }
});

const featureSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  features: [featureSchema],
  ctaButton: {
    text: { type: String, required: true },
    link: { type: String, required: true }
  },
  background: {
    colorFrom: { type: String, default: 'from-blue-50' },
    colorTo: { type: String, default: 'to-white' }
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('FeatureSection', featureSectionSchema);
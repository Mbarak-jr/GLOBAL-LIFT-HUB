// models/HeroSection.js
import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  primaryButton: {
    text: { type: String, required: true },
    link: { type: String, required: true }
  },
  secondaryButton: {
    text: { type: String, required: true },
    link: { type: String, required: true }
  },
  stats: [
    {
      icon: { type: String, required: true },
      text: { type: String, required: true }
    }
  ],
  background: {
    colorFrom: { type: String, default: 'from-blue-600' },
    colorTo: { type: String, default: 'to-blue-800' },
    accentColor: { type: String, default: 'text-yellow-300' }
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('HeroSection', heroSectionSchema);
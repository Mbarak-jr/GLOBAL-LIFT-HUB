import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'soft', 'business', 'creative', 'language', 'other'],
    default: 'technical'
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    default: '📚'
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  isActive: {
    type: Boolean,
    default: true
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
  timestamps: true
});

skillSchema.index({ name: 'text', description: 'text' });

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
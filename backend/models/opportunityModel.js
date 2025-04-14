import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      'job',
      'internship',
      'scholarship',
      'mentorship',
      'grant',
      'investment',
      'other'
    ],
    required: true
  },
  location: {
    type: String
  },
  eligibility: {
    type: String
  },
  deadline: {
    type: Date
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);
export default Opportunity;

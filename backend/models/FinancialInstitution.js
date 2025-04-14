import mongoose from 'mongoose';

const financialInstitutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['MFI', 'SACCO', 'BANK'],
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  logo: {
    type: String // URL to logo image
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const FinancialInstitution = mongoose.model('FinancialInstitution', financialInstitutionSchema);

export default FinancialInstitution;
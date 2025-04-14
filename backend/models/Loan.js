import mongoose from 'mongoose';

// Loan Schema
const loanSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    approvedDate: {
        type: Date
    },
    repaymentPlan: {
        type: String
    }
});

export default mongoose.model('Loan', loanSchema);

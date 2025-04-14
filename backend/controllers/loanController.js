import Loan from '../models/Loan.js';

// Apply for a loan
export const applyLoan = async (req, res) => {
    const { amount, purpose } = req.body;

    try {
        const loan = new Loan({
            amount,
            purpose,
            applicant: req.user.id
        });

        await loan.save();
        res.status(201).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all loans
export const getLoans = async (req, res) => {
    try {
        const loans = await Loan.find({ applicant: req.user.id });
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Approve/reject a loan
export const updateLoanStatus = async (req, res) => {
    const { loanId } = req.params;
    const { status } = req.body;

    try {
        const loan = await Loan.findById(loanId);

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        loan.status = status;

        if (status === 'approved') {
            loan.approvedDate = Date.now();
        }

        await loan.save();
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

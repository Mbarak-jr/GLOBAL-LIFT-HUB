import FinancialInstitution from '../models/FinancialInstitution.js';

// @desc    Get all financial institutions
// @route   GET /api/financial-institutions
// @access  Public
export const getInstitutions = async (req, res) => {
  try {
    const institutions = await FinancialInstitution.find().sort({ name: 1 });
    res.json(institutions);
  } catch (err) {
    console.error(`Error fetching institutions: ${err.message}`);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching institutions'
    });
  }
};

// @desc    Get single institution
// @route   GET /api/financial-institutions/:id
// @access  Public
export const getInstitution = async (req, res) => {
  try {
    const institution = await FinancialInstitution.findById(req.params.id);
    
    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Financial institution not found'
      });
    }
    
    res.json({
      success: true,
      data: institution
    });
  } catch (err) {
    console.error(`Error fetching institution ${req.params.id}: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching institution'
    });
  }
};

// @desc    Create new institution
// @route   POST /api/financial-institutions
// @access  Private/Admin
export const createInstitution = async (req, res) => {
  try {
    const { name, type, interestRate, description, logo } = req.body;
    
    // Validate required fields
    if (!name || !type || !interestRate) {
      return res.status(400).json({
        success: false,
        message: 'Name, type and interest rate are required'
      });
    }

    const institution = new FinancialInstitution({
      name,
      type,
      interestRate,
      description,
      logo
    });

    const savedInstitution = await institution.save();
    
    res.status(201).json({
      success: true,
      data: savedInstitution
    });
  } catch (err) {
    console.error(`Error creating institution: ${err.message}`);
    
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Institution with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating institution'
    });
  }
};

// @desc    Update institution
// @route   PATCH /api/financial-institutions/:id
// @access  Private/Admin
export const updateInstitution = async (req, res) => {
  try {
    const institution = await FinancialInstitution.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Financial institution not found'
      });
    }

    res.json({
      success: true,
      data: institution
    });
  } catch (err) {
    console.error(`Error updating institution ${req.params.id}: ${err.message}`);
    
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Institution with this name already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating institution'
    });
  }
};

// @desc    Delete institution
// @route   DELETE /api/financial-institutions/:id
// @access  Private/Admin
export const deleteInstitution = async (req, res) => {
  try {
    const institution = await FinancialInstitution.findByIdAndDelete(req.params.id);

    if (!institution) {
      return res.status(404).json({
        success: false,
        message: 'Financial institution not found'
      });
    }

    res.json({
      success: true,
      message: 'Institution deleted successfully'
    });
  } catch (err) {
    console.error(`Error deleting institution ${req.params.id}: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting institution'
    });
  }
};
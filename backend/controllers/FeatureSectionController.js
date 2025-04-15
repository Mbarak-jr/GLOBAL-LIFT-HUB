// controllers/FeatureSectionController.js
import FeatureSection from '../models/FeatureSection.js';

export const getActiveFeatureSections = async (req, res) => {
  try {
    const sections = await FeatureSection.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching feature sections', 
      error: error.message 
    });
  }
};

export const createFeatureSection = async (req, res) => {
  try {
    const newSection = new FeatureSection(req.body);
    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating feature section', 
      error: error.message 
    });
  }
};

export const updateFeatureSection = async (req, res) => {
  try {
    const updated = await FeatureSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating feature section', 
      error: error.message 
    });
  }
};
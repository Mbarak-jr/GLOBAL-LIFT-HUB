// controllers/HeroSectionController.js
import HeroSection from '../models/HeroSection.js';

export const getActiveHeroSections = async (req, res) => {
  try {
    const sections = await HeroSection.find({ isActive: true })
      .sort({ order: 1 })
      .lean();
    res.json(sections);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching hero sections', 
      error: error.message 
    });
  }
};

export const createHeroSection = async (req, res) => {
  try {
    const newSection = new HeroSection(req.body);
    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error creating hero section', 
      error: error.message 
    });
  }
};

export const updateHeroSection = async (req, res) => {
  try {
    const updated = await HeroSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ 
      message: 'Error updating hero section', 
      error: error.message 
    });
  }
};
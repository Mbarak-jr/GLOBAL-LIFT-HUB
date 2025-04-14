import Skill from '../models/Skill.js';
import Course from '../models/Course.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Private
export const getSkills = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    const skills = await Skill.find(query).sort({ name: 1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (err) {
    console.error(`Error getting skills: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching skills'
    });
  }
};

// @desc    Get courses for a specific skill
// @route   GET /api/skills/:id/courses
// @access  Private
export const getSkillCourses = async (req, res) => {
  try {
    const courses = await Course.find({ 
      skills: req.params.id,
      isActive: true
    }).populate('instructor', 'name email');

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    console.error(`Error getting skill courses: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching skill courses'
    });
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private/Admin
export const createSkill = async (req, res) => {
  try {
    const { name, category, description, icon } = req.body;

    const existingSkill = await Skill.findOne({ name });
    if (existingSkill) {
      return res.status(400).json({
        success: false,
        message: 'Skill with this name already exists'
      });
    }

    const skill = new Skill({
      name,
      category,
      description,
      icon
    });

    const savedSkill = await skill.save();
    res.status(201).json({
      success: true,
      data: savedSkill
    });
  } catch (err) {
    console.error(`Error creating skill: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while creating skill'
    });
  }
};

// @desc    Add a new course (now relates to skills)
// @route   POST /api/skills/courses
// @access  Private/Partner/Admin
export const addCourse = async (req, res) => {
  try {
    const { title, description, category, duration, price, skills } = req.body;

    const course = new Course({
      title,
      description,
      category,
      duration,
      price,
      skills,
      instructor: req.user.id
    });

    const savedCourse = await course.save();
    
    // Update skills with this course reference
    await Skill.updateMany(
      { _id: { $in: skills } },
      { $addToSet: { courses: savedCourse._id } }
    );

    res.status(201).json({
      success: true,
      data: await savedCourse.populate('skills', 'name')
    });
  } catch (err) {
    console.error(`Error adding course: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while adding course'
    });
  }
};

// @desc    Get all courses
// @route   GET /api/skills/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    const { search, category, skill } = req.query;
    const query = { isActive: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (skill) {
      query.skills = skill;
    }

    const courses = await Course.find(query)
      .populate('instructor', 'name')
      .populate('skills', 'name category');

    res.json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (err) {
    console.error(`Error getting courses: ${err.message}`);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
};
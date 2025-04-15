import express from 'express';
import {
  getSkills,
  createSkill,
  getSkillCourses,
  addCourse,
  getCourses
} from '../controllers/skillController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router();

// Public route to get skills
router.route('/')
  .get(getSkills) // ✅ Public access
  .post(protect, admin, createSkill); // 🔒 Changed from adminOnly to admin - protected for admins

// Optional: keep this protected or make it public based on your needs
router.route('/:id/courses')
  .get(protect, getSkillCourses); // 🔒 Protected access

// Courses routes
router.route('/courses')
  .get(getCourses) // ✅ Public access
  .post(protect, authorizeRoles('partner', 'admin'), addCourse); // 🔒 Protected for partners and admins

export default router;
import express from 'express';
import {
  getSkills,
  createSkill,
  getSkillCourses,
  addCourse,
  getCourses
} from '../controllers/skillController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router();

// Public route to get skills
router.route('/')
  .get(getSkills) // ✅ Now public
  .post(protect, adminOnly, createSkill); // 🔒 Protected for admins

// Optional: keep this protected or make it public based on your needs
router.route('/:id/courses')
  .get(protect, getSkillCourses); // 🔒 Still protected

// Courses routes
router.route('/courses')
  .get(getCourses) // ✅ Already public
  .post(protect, authorizeRoles('partner', 'admin'), addCourse); // 🔒 Protected

export default router;

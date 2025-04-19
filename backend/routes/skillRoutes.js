import express from 'express';
import {
  getSkills,
  createSkill,
  getSkillCourses,
  addCourse,
  getCourses
} from '../controllers/skillController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getSkills) // Public access
  .post(protect, admin, createSkill); // Admin-only access

router.route('/:id/courses')
  .get(protect, getSkillCourses) // Protected access
  .post(protect, admin, addCourse); // Admin-only access

router.route('/courses')
  .get(getCourses); // Public access

export default router;
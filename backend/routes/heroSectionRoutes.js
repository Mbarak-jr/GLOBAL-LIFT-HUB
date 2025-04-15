// routes/heroSectionRoutes.js
import express from 'express';
import { 
  getActiveHeroSections,
  createHeroSection,
  updateHeroSection
} from '../controllers/HeroSectionController.js';

const router = express.Router();

router.get('/', getActiveHeroSections);
router.post('/', createHeroSection);
router.put('/:id', updateHeroSection);

export default router;
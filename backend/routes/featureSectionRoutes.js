// routes/featureSectionRoutes.js
import express from 'express';
import { 
  getActiveFeatureSections,
  createFeatureSection,
  updateFeatureSection
} from '../controllers/FeatureSectionController.js';

const router = express.Router();

router.get('/', getActiveFeatureSections);
router.post('/', createFeatureSection);
router.put('/:id', updateFeatureSection);

export default router;
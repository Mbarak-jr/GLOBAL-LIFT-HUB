import express from 'express';
import { getCountries } from '../controllers/countryController.js';

const router = express.Router();

router.route('/').get(getCountries);

export default router;
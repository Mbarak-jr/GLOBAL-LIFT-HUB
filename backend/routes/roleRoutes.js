import express from 'express';
import Role from '../models/roleModel.js';

const router = express.Router();

// GET /api/roles - Fetch all roles from DB
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
});

export default router;

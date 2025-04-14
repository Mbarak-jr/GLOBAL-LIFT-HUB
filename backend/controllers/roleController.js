// controllers/roleController.js

import Role from '../models/roleModel.js';

export const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch roles' });
  }
};

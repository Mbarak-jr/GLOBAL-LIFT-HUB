import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Role from '../models/roleModel.js';  // Corrected import for roleModel.js

dotenv.config();

const roles = ['user', 'beneficiary', 'donor', 'partner', 'admin'];

const seedRoles = async () => {
  try {
    await connectDB();

    for (const role of roles) {
      const existing = await Role.findOne({ name: role });
      if (!existing) {
        await Role.create({ name: role });
        console.log(`✅ Role '${role}' added.`);
      } else {
        console.log(`ℹ️ Role '${role}' already exists.`);
      }
    }

    console.log('🎉 Role seeding completed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedRoles();

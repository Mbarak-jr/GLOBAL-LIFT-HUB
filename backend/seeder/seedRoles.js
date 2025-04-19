import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    // Seed only admin user (no partner unless specifically required)
    const adminEmail = 'admin@example.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,  // Only special privilege flag
        emailVerified: true
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️ Admin user already exists');
    }

    console.log('🎉 User seeding completed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();
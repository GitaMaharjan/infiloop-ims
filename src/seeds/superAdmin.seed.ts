import mongoose from 'mongoose';
import { User, UserRole } from '../models/user.model.js';
import { config } from '../config/index.js';

const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(config.mongoUri as string);
        console.log('Connected to MongoDB for seeding...');

        const adminExists = await User.findOne({ role: UserRole.SUPER_ADMIN });

        if (!adminExists) {
            await User.create({
                fullName: 'System Administrator',
                email: 'admin@system.com',
                password: 'SuperSecurePassword123!', // Will be hashed by pre-save hook
                role: UserRole.SUPER_ADMIN,
                organizationId: null, // Super Admins don't belong to a specific org
                isActive: true
            });
            console.log(' Super Admin created: admin@system.com / SuperSecurePassword123!');
        } else {
            console.log('Super Admin already exists.');
        }

        await mongoose.disconnect();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedSuperAdmin();
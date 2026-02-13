import mongoose from 'mongoose';
import { User, UserRole } from '../models/user.model.js';
import { config } from '../config/index.js';
import crypto from 'crypto';
import { hashToken } from '../utils/token.js';
const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log('Connected to MongoDB for seeding...');
        const adminExists = await User.findOne({ role: UserRole.SUPER_ADMIN });
        if (!adminExists) {
            // Generate a random refresh token for seeding
            const refreshToken = crypto.randomBytes(64).toString('hex');
            const hashedRefreshToken = hashToken(refreshToken);
            const newAdmin = await User.create({
                fullName: 'Gita Maharjan',
                email: 'gitamaharjan303@gmail.com',
                password: 'Gita123', // Will be hashed by pre-save hook
                role: UserRole.SUPER_ADMIN,
                organizationId: null,
                isActive: true,
                refreshToken: hashedRefreshToken
            });
            console.log('Super Admin created!');
            console.log('Email:', newAdmin.email);
            console.log('Password: Gita123');
            console.log('Refresh Token (for testing only!):', refreshToken);
        }
        else {
            console.log('Super Admin already exists.');
        }
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};
seedSuperAdmin();
//# sourceMappingURL=seedSuperAdmin.seed.js.map
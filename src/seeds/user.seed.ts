import mongoose from "mongoose";
import dotenv from "dotenv";
import { User, UserRole } from "../models/user.model.js";
import { Types } from "mongoose";
import { config } from "../config/index.js";

dotenv.config();

async function seedUsers() {
    try {
        //  Connect to DB
        await mongoose.connect(config.mongoUri as string);
        console.log("MongoDB connected");

        // Clear existing users (optional)
        await User.deleteMany({});
        console.log("Existing users cleared");

        // Fake Organization ID (replace with real one if exists)
        const fakeOrgId = new Types.ObjectId();

        // Create Users
        const users = [
            {
                fullName: "Super Admin",
                email: "superadmin@example.com",
                password: "Password123!",
                role: UserRole.SUPER_ADMIN,
                organizationId: null
            },
            {
                fullName: "Organization Admin",
                email: "orgadmin@example.com",
                password: "Password123!",
                role: UserRole.ORG_ADMIN,
                organizationId: fakeOrgId
            },
            {
                fullName: "Staff Member",
                email: "staff@example.com",
                password: "Password123!",
                role: UserRole.STAFF,
                organizationId: fakeOrgId
            }
        ];

        await User.insertMany(users);

        console.log("Users seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seedUsers();

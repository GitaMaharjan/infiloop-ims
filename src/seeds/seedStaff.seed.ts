import mongoose from "mongoose";
import dotenv from "dotenv";
import { User, UserRole } from "../models/user.model.js";
import { Organization } from "../models/organization.model.js";

dotenv.config();

const seedStaff = async () => {
    try {
        // Connect to DB
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB connected");

        // Get an existing organization (or replace with a specific ID)
        const org = await Organization.findOne();
        if (!org) {
            console.log("No organization found. Create an organization first.");
            process.exit(1);
        }

        // Staff user data
        const staffData = {
            fullName: "Sita Maharjan",
            email: "sita@gmail.com",
            password: "Sita123", // will be hashed automatically
            role: UserRole.STAFF,
            organizationId: org._id,
            isActive: true,
        };

        // Check if user exists
        const existingUser = await User.findOne({ email: staffData.email });
        if (existingUser) {
            console.log("Staff user already exists");
        } else {
            const staffUser = await User.create(staffData);
            console.log("Staff user created:", staffUser);
        }

        process.exit(0);
    } catch (err: any) {
        console.error("Error seeding staff user:", err.message);
        process.exit(1);
    }
};

seedStaff();

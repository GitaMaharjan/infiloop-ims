import { User, UserRole } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";
import { Types } from "mongoose";

export const loginService = async (email: string, password: string) => {

    // Find user by email and explicitly include the password (since it's hidden by default)
    const user = await User.findOne({ email, deletedAt: null }).select('+password');
    if (!user) {
        throw new Error("Authentication failed: Invalid email or password")
    }
    if (!user.isActive) {
        throw new Error("Authentication failed: User is not active")
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        throw new Error("Authentication failed: Invalid password")
    }

    // 3. Create the JWT payload with Multi-Tenant context
    const token = signToken({
        userId: user._id,
        role: user.role,
        organizationId: user.organizationId
    });
    return {
        token,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId
        }
    };
}

// export const registerService = async (
//     fullName: string,
//     email: string,
//     password: string,
//     role: UserRole,
//     organizationId?: string | null
// ) => {

//     // Check email uniqueness
//     const existingUser = await User.findOne({ email, deletedAt: null });
//     if (existingUser) {
//         throw new Error("Registration failed: Email already in use");
//     }

//     // Multi-tenant validation logic
//     let finalOrgId: Types.ObjectId | null = null;
//     // Validate role
//     if (!Object.values(UserRole).includes(role)) {
//         throw new Error("Invalid role");
//     }

//     // Validate organization logic
//     if (role !== UserRole.SUPER_ADMIN) {
//         if (!organizationId) {
//             throw new Error("organizationId is required for non-super admin users");
//         }

//         finalOrgId = new Types.ObjectId(organizationId);
//     } else {
//         organizationId = null; // SUPER_ADMIN must not belong to org
//     }

//     // Create user (password will hash automatically)
//     const newUser = await User.create({
//         fullName,
//         email,
//         password,
//         role,
//         organizationId: finalOrgId
//     });

//     //GENERATE JWT IMMEDIATELY
//     // This allows the user to start using the app without logging in again
//     const token = signToken({
//         userId: newUser._id as Types.ObjectId,
//         role: newUser.role,
//         organizationId: newUser.organizationId as Types.ObjectId | null
//     });

//     //Return safe data + token
//     return {
//         token,
//         user: {
//             id: newUser._id,
//             fullName: newUser.fullName,
//             email: newUser.email,
//             role: newUser.role,
//             organizationId: newUser.organizationId
//         }
//     };

// };

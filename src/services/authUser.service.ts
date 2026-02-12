import { User } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";

export const loginUserService = async (email: string, password: string) => {
    // Find user and include password
    const user = await User.findOne({ email, deletedAt: null }).select("+password");
    if (!user) throw new Error("Authentication failed: Invalid email or password");

    // Check if user is active
    if (!user.isActive) throw new Error("Authentication failed: User is not active");

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Authentication failed: Invalid email or password");

    // Generate JWT with tenant context
    const token = signToken({
        userId: user._id,
        role: user.role,
        organizationId: user.organizationId
    });

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId
        }
    };
};

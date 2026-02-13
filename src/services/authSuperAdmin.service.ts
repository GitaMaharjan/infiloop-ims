import { User } from "../models/user.model.js";

import { generateAccessToken, generateRefreshToken, hashToken } from "../utils/token.js";

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

    const accessToken = generateAccessToken({
        userId: user._id,
        role: user.role,
        organizationId: user.organizationId

    })
    const refreshToken = generateRefreshToken(user._id)
    const hashedRefreshToken = hashToken(refreshToken);

    user.refreshToken = hashedRefreshToken
    await user.save()

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            email: user.email,
            role: user.role,
        }
    };
}


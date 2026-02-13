import { User } from "../models/user.model.js";
import { hashToken } from "../utils/token.js";
export const logOutUserService = async (refreshToken) => {
    if (!refreshToken) {
        throw new Error("Refresh token is required");
    }
    // Hash incoming refresh token
    const hashedToken = hashToken(refreshToken);
    // Find user with this refresh token
    const user = await User.findOne({ refreshToken: hashedToken });
    if (!user) {
        throw new Error("Invalid refresh token");
    }
    // Remove refresh token from DB
    user.refreshToken = null;
    await user.save();
    return;
};
//# sourceMappingURL=logOutUser.service.js.map
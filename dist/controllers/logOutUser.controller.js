import { logOutUserService } from "../services/logOutUser.service.js";
export const logOutUserController = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await logOutUserService(refreshToken);
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
//# sourceMappingURL=logOutUser.controller.js.map
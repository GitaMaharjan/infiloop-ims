import { loginService } from "../services/authSuperAdmin.service.js";
import { UserRole } from "../models/user.model.js";
export const SuperAdminLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation check
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Please provide email and password" });
        }
        const loginResult = await loginService(email, password);
        if (loginResult.user.role !== UserRole.SUPER_ADMIN) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Not a super admin."
            });
        }
        res.status(200).json({
            success: true,
            message: "Login successful",
            ...loginResult
        });
    }
    catch (error) {
        res.status(401).json({ success: false, error: error.message });
    }
};
//# sourceMappingURL=authSuperAdmin.controller.js.map
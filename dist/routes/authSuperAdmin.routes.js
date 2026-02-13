import { Router } from "express";
import { SuperAdminLoginController } from "../controllers/authSuperAdmin.controller.js";
import { authenticate, requireRole } from "../middleware/auth.middleware.js";
import { UserRole } from "../models/user.model.js";
import { approveOrganizationController } from "../controllers/superAdmin.controller.js";
import { logOutUserService } from "../services/logOutUser.service.js";
const router = Router();
// PUBLIC LOGIN
router.post("/login", SuperAdminLoginController);
// PROTECTED - All routes below get middleware, MIDDLEWARE ACTIVATED - Everything after is protected
router.use(authenticate);
router.use(requireRole(UserRole.SUPER_ADMIN));
router.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome Super Admin" });
});
router.patch("/organization/:organizationId/approve", approveOrganizationController);
router.post("/logout", logOutUserService);
export const authSuperAdminRoutes = router;
//# sourceMappingURL=authSuperAdmin.routes.js.map
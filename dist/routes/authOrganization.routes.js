import { Router } from "express";
import { loginController, registerOrganizationWithAdminController } from "../controllers/authOrganizationUser.controller.js";
import { logOutUserController } from "../controllers/logOutUser.controller.js";
import { UserRole } from "../models/user.model.js";
import { authenticate, requireRole } from "../middleware/auth.middleware.js";
import { categoryRoutes } from "../modules/inventory/category/category.routes.js";
const router = Router();
//public routes for organization registration
router.post('/register', registerOrganizationWithAdminController);
router.post('/login', loginController);
router.use(authenticate);
router.use(requireRole(UserRole.ORG_ADMIN, UserRole.STAFF));
router.post('/dashboard', (req, res) => {
    res.json({ message: "Welcome organization" });
});
router.post('/logout', logOutUserController);
router.use("/", categoryRoutes);
export const authOrganizationRoutes = router;
//# sourceMappingURL=authOrganization.routes.js.map
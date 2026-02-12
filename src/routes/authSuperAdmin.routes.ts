import { Router } from "express";
import { SuperAdminLoginController } from "../controllers/authSuperAdmin.controller.js";
import { authenticate, requireRole } from "../middleware/auth.middleware.js";
import { UserRole } from "../models/user.model.js";
import { approveOrganizationController } from "../controllers/superAdmin.controller.js";

const router = Router();

// PUBLIC LOGIN
router.post("/login", SuperAdminLoginController);

// PROTECTED ROUTES BELOW
router.use(authenticate);
router.use(requireRole(UserRole.SUPER_ADMIN));

router.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome Super Admin" });
});

// Only SUPER_ADMIN can approve organizations
router.patch(
    "/organization/:organizationId/approve",
    authenticate,
    requireRole(UserRole.SUPER_ADMIN),
    approveOrganizationController
);


export const authSuperAdminRoutes = router;
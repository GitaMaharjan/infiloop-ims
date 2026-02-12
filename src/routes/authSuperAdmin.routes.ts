import { Router } from "express";
import { SuperAdminLoginController } from "../controllers/superAdmin.controller.js";
import { authenticate, requireRole } from "../middleware/auth.middleware.js";
import { UserRole } from "../models/user.model.js";

const router = Router();

// PUBLIC LOGIN
router.post("/login", SuperAdminLoginController);

// PROTECTED ROUTES BELOW
router.use(authenticate);
router.use(requireRole(UserRole.SUPER_ADMIN));

router.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome Super Admin" });
});

export const authSuperAdminRoutes = router;
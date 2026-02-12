import { healthRoutes } from "./health.routes.js";
import { Router } from "express";
import { errorHandlerRoutes } from "./errorHandler.routes.js";
import { authOrganizationRoutes } from "./authOrganization.routes.js";
import { authSuperAdminRoutes } from "./authSuperAdmin.routes.js";

const router = Router();

router.use("/super-admin", authSuperAdminRoutes)

router.use("/health", healthRoutes);
router.use("/error-test", errorHandlerRoutes);
router.use("/auth", authOrganizationRoutes);

export default router;
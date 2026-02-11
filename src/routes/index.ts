import { healthRoutes } from "./health.routes.js";
import { Router } from "express";
import { errorHandlerRoutes } from "./errorHandler.routes.js";
import { authRoutes } from "./auth.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/error-test", errorHandlerRoutes);
router.use("/auth", authRoutes);

export default router;
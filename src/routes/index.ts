import { healthRoutes } from "./health.routes.js";
import { Router } from "express";
import { errorHandlerRoutes } from "./errorHandler.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/error-test", errorHandlerRoutes);


export default router;
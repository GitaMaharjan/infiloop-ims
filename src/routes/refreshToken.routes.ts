import { Router } from "express";
import { refreshTokenController } from "../controllers/refreshToken.controller.js";

const router = Router()
router.post("/refresh-token", refreshTokenController)

export const refreshTokenRoutes = router
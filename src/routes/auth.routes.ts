import { Router } from "express";

const router = Router();
import { LoginController, RegisterController } from "../controllers/auth.controller.js";

router.get("/login", LoginController);
router.post('/register', RegisterController);


export const authRoutes = router;
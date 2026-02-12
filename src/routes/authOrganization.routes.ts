import { Router } from "express";

const router = Router();
import { RegisterController } from "../controllers/auth.controller.js";


//public routes for organization registration
router.post('/register-org', RegisterController);

//private routes



export const authOrganizationRoutes = router;
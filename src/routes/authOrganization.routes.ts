import { Router } from "express";

import { registerOrganizationWithAdminController } from "../controllers/authOrganization.controller.js";
import { loginController } from "../controllers/authUser.controller.js";


const router = Router();

//public routes for organization registration
router.post('/register', registerOrganizationWithAdminController);
router.post('/login', loginController)


export const authOrganizationRoutes = router;
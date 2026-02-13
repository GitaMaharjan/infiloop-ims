import { Router } from "express";

import { loginController, registerOrganizationWithAdminController } from "../controllers/authOrganizationUser.controller.js";
import { logOutUserController } from "../controllers/logOutUser.controller.js";



const router = Router();

//public routes for organization registration
router.post('/register', registerOrganizationWithAdminController);
router.post('/login', loginController)
router.post('/logout', logOutUserController)


export const authOrganizationRoutes = router;
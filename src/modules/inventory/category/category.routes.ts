import { Router } from "express";
import { authenticate, requireOrganization, requireRole } from "../../../middleware/auth.middleware.js";
import { createCategoryController, getAllCategoriesControleller } from "./category.controller.js";
import { UserRole } from "../../../models/user.model.js";

const router = Router();

// Only ORG_ADMIN with organizationId can create category
router.post(
    "/create-category",
    authenticate,
    requireRole(UserRole.ORG_ADMIN),
    requireOrganization,
    createCategoryController
);
router.get("/all-categories",
    authenticate,
    requireRole(UserRole.ORG_ADMIN, UserRole.STAFF),
    requireOrganization,
    getAllCategoriesControleller)
export const categoryRoutes = router;
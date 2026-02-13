import { Router } from "express";
import { authenticate, requireOrganization, requireRole } from "../../../middleware/auth.middleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryController } from "./category.controller.js";
import { UserRole } from "../../../models/user.model.js";
const router = Router();
// Only ORG_ADMIN with organizationId can create category
router.post("/create-category", authenticate, requireRole(UserRole.ORG_ADMIN), requireOrganization, createCategoryController);
// GET ALL
router.get("/all-categories", authenticate, requireRole(UserRole.ORG_ADMIN, UserRole.STAFF), requireOrganization, getAllCategoriesController);
// GET BY ID
router.get("/category/:id", authenticate, requireRole(UserRole.ORG_ADMIN, UserRole.STAFF), requireOrganization, getCategoryByIdController);
// UPDATE CATEGORY
router.put("/update-category/:id", authenticate, requireRole(UserRole.ORG_ADMIN), requireOrganization, updateCategoryController);
// DELETE CATEGORY 
router.delete("/delete-category/:id", authenticate, requireRole(UserRole.ORG_ADMIN), requireOrganization, deleteCategoryController);
export const categoryRoutes = router;
//# sourceMappingURL=category.routes.js.map
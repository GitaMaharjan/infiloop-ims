import { createCategoryService, deleteCategoryService, getAllCategoriesService, getCategoryByIdService, updateCategoryService } from "./category.service.js";
import { UserRole } from "../../../models/user.model.js";
import { sendError, sendSuccess } from "../../../utils/response.js";
import { Category } from "./category.model.js";
export const createCategoryController = async (req, res) => {
    try {
        const authReq = req; // type assertion
        const { name } = req.body;
        const user = authReq.user;
        if (!name || typeof name !== "string") {
            return sendError(res, "Category name is required", 400);
        }
        if (user.role !== UserRole.ORG_ADMIN) {
            return sendError(res, "You are not authorized to create categories", 403);
        }
        // Must have organizationId
        if (!user.organizationId) {
            return sendError(res, "User must belong to an organization", 400);
        }
        const newCategory = await createCategoryService(name, user.organizationId);
        return sendSuccess(res, newCategory, 201);
    }
    catch (error) {
        return sendError(res, error.message, 400);
    }
};
export const getAllCategoriesController = async (req, res) => {
    try {
        const authReq = req;
        const organizationId = authReq.user.organizationId;
        if (!organizationId) {
            throw new Error("You are not associated with organization");
        }
        const categories = await getAllCategoriesService(organizationId);
        return sendSuccess(res, categories);
    }
    catch (error) {
        sendError(res, error.message, 500);
    }
};
export const getCategoryByIdController = async (req, res) => {
    try {
        const authReq = req;
        const categoryId = authReq.params.id;
        const organizationId = authReq.user.organizationId;
        if (!organizationId) {
            throw new Error("You are not associated with organization");
        }
        const category = await getCategoryByIdService(categoryId, organizationId);
        if (!category) {
            return sendError(res, "Category not found");
        }
        return sendSuccess(res, category);
    }
    catch (error) {
        return sendError(res, error.message, 404);
    }
};
export const updateCategoryController = async (req, res) => {
    try {
        const authReq = req;
        const { name } = req.body;
        const categoryId = authReq.params.id;
        const user = authReq.user;
        if (!user.organizationId) {
            return sendError(res, "User must belong to an organization", 400);
        }
        if (!name || typeof name !== "string") {
            return sendError(res, "Category name is required", 400);
        }
        if (user.role !== UserRole.ORG_ADMIN) {
            return sendError(res, "You are not authorized to update categories", 403);
        }
        const updatedCategory = await updateCategoryService(categoryId, name, user.organizationId);
        return sendSuccess(res, updatedCategory);
    }
    catch (error) {
        return sendError(res, error.message, 400);
    }
};
export const deleteCategoryController = async (req, res) => {
    try {
        const authReq = req;
        const categoryId = authReq.params.id;
        const user = authReq.user;
        if (!user.organizationId) {
            return sendError(res, "User must belong to an organization", 400);
        }
        if (user.role !== UserRole.ORG_ADMIN) {
            return sendError(res, "You are not authorized to delete categories", 403);
        }
        const deletedCategory = await deleteCategoryService(categoryId, user.organizationId);
        return sendSuccess(res, deletedCategory);
    }
    catch (error) {
        return sendError(res, error.message, 400);
    }
};
//# sourceMappingURL=category.controller.js.map
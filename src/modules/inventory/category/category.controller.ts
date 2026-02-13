import type { Request, Response } from "express";
import { createCategoryService, getAllCategoriesService } from "./category.service.js";
import { UserRole, type IUser } from "../../../models/user.model.js";
import { sendError, sendSuccess } from "../../../utils/response.js";
import type { Types } from "mongoose";


export interface AuthRequest extends Request {
    user: IUser; // now TS knows req.user exists
}

export const createCategoryController = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest; // type assertion

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

        const newCategory = await createCategoryService(name, user.organizationId)
        return sendSuccess(res, newCategory, 201);
    } catch (error: any) {
        return sendError(res, error.message, 400);

    }
}

export const getAllCategoriesControleller = async (req: Request, res: Response) => {
    try {
        const authReq = req as AuthRequest;
        const organizationId = authReq.user.organizationId as Types.ObjectId
        if (!organizationId) {
            throw new Error("You are not associated with organization")
        }

        const categories = await getAllCategoriesService(organizationId)
        return sendSuccess(res, categories)
    } catch (error: any) {
        sendError(res, error.message, 500)
    }
}
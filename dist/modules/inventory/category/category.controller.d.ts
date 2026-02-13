import type { Request, Response } from "express";
import { type IUser } from "../../../models/user.model.js";
export interface AuthRequest extends Request {
    user: IUser;
}
export declare const createCategoryController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllCategoriesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCategoryByIdController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateCategoryController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteCategoryController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=category.controller.d.ts.map
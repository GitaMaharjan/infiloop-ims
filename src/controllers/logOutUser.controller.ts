import type { Request, Response } from "express";
import { logOutUserService } from "../services/logOutUser.service.js";

export const logOutUserController = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        await logOutUserService(refreshToken);

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });

    } catch (error: any) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }
};
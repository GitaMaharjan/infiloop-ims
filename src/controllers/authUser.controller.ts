import type { Request, Response } from "express";
import { loginUserService } from "../services/authUser.service.js";

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const result = await loginUserService(email, password);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            ...result
        });

    } catch (error: any) {
        return res.status(401).json({ success: false, message: error.message });
    }
};

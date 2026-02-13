import type { Request, Response } from "express";
import { loginUserService, registerOrganizationWithAdmin } from "../services/authOrganizationUser.service.js";

export const registerOrganizationWithAdminController = async (req: Request, res: Response) => {
    try {
        const { name, address, contactPerson, password } = req.body;

        if (!name || !contactPerson?.email || !contactPerson?.name || !password) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const result = await registerOrganizationWithAdmin({ name, address, contactPerson, password });

        return res.status(201).json({
            success: true,
            ...result
        });
    } catch (error: any) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

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




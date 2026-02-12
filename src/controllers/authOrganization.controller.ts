import type { Request, Response } from "express";
import { registerOrganizationWithAdmin } from "../services/authOrganization.service.js";

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



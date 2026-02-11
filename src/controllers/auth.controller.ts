import type { Request, Response } from "express";
import { loginService, registerService } from "../services/auth.service.js";

export const LoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        // Validation check
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Please provide email and password" });
        }
        const loginResult = await loginService(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            ...loginResult
        })

    } catch (error: any) {
        res.status(401).json({ success: false, error: error.message });
    }


}

export const RegisterController = async (req: Request, res: Response) => {
    const { fullName, email, password, role, organizationId } = req.body;

    try {
        if (!fullName || !email || !password || !role) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const registerResult = await registerService(fullName, email, password, role, organizationId);
        res.status(201).json({
            message: 'User registered successfully',
            ...registerResult
        })
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
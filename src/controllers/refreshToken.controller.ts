import type { Request, Response } from "express";
import { User } from '../models/user.model.js';
import { generateAccessToken, hashToken } from '../utils/token.js';



export const refreshTokenController = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false, error: "Missing refresh token"
            })
        }

        //hash token and find User
        const hashedToken = hashToken(refreshToken)
        const user = await User.findOne({ refreshToken: hashedToken, deletedAt: null })

        if (!user) return res.status(401).json({ success: false, error: "Invalid refresh token" });

        const accessToken = generateAccessToken({
            userId: user._id,
            role: user.role,
            organizationId: user.organizationId
        })
        res.status(200).json({
            success: true, accessToken
        })
    } catch (error: any) {
        res.status(500).json({
            success: false, error: error.message
        })
    }
}
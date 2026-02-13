import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/index.js";
import type { Types } from "mongoose";

export interface TokenPayload {
    userId: Types.ObjectId;
    role: string;
    organizationId: Types.ObjectId | null;
}

/**
 * Generate short-lived access token
 * Used for authenticating API requests
 */
export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, config.jwtSecret!, {
        expiresIn: "1h", // access token valid for 1 hour
    });
};

/**
 * Generate long-lived refresh token
 * Used to get a new access token without logging in again
 */
export const generateRefreshToken = (userId: Types.ObjectId): string => {
    return jwt.sign({ userId }, config.jwtRefreshSecret!, {
        expiresIn: "7d", // refresh token valid for 7 days
    });
};

/**
 * Hash refresh token before storing in DB
 * This ensures token safety if DB is leaked
 */
export const hashToken = (token: string): string => {
    return crypto.createHash("sha256").update(token).digest("hex");
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, config.jwtSecret!) as TokenPayload
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, config.jwtRefreshSecret!) as TokenPayload;
};

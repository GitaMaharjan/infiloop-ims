import jwt from "jsonwebtoken";
import crypto from "crypto";
import { config } from "../config/index.js";
/**
 * Generate short-lived access token
 * Used for authenticating API requests
 */
export const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: "1h", // access token valid for 1 hour
    });
};
/**
 * Generate long-lived refresh token
 * Used to get a new access token without logging in again
 */
export const generateRefreshToken = (userId) => {
    return jwt.sign({ userId }, config.jwtRefreshSecret, {
        expiresIn: "7d", // refresh token valid for 7 days
    });
};
/**
 * Hash refresh token before storing in DB
 * This ensures token safety if DB is leaked
 */
export const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
};
/**
 * Verify access token
 */
export const verifyAccessToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};
/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.jwtRefreshSecret);
};
//# sourceMappingURL=token.js.map
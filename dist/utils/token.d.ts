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
export declare const generateAccessToken: (payload: TokenPayload) => string;
/**
 * Generate long-lived refresh token
 * Used to get a new access token without logging in again
 */
export declare const generateRefreshToken: (userId: Types.ObjectId) => string;
/**
 * Hash refresh token before storing in DB
 * This ensures token safety if DB is leaked
 */
export declare const hashToken: (token: string) => string;
/**
 * Verify access token
 */
export declare const verifyAccessToken: (token: string) => TokenPayload;
/**
 * Verify refresh token
 */
export declare const verifyRefreshToken: (token: string) => TokenPayload;
//# sourceMappingURL=token.d.ts.map
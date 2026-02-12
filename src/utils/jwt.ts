import { config } from "../config/index.js";
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface TokenPayload {
    userId: Types.ObjectId;
    role: string;
    organizationId: Types.ObjectId | null;
}
console.log("JWT Secret:", config.jwtSecret);

export const signToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, config.jwtSecret as string, { expiresIn: '1h' });
}

export const verifyToken = (token: string): TokenPayload => {
    return jwt.verify(token, config.jwtSecret!) as TokenPayload;
};
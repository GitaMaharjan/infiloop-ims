import { config } from "../config/index.js";
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
console.log("JWT Secret:", config.jwtSecret);
export const signToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};
export const verifyToken = (token) => {
    return jwt.verify(token, config.jwtSecret);
};
//# sourceMappingURL=jwt.js.map
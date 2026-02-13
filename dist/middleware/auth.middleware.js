import { verifyRefreshToken } from "../utils/token.js";
export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }
    try {
        const payload = verifyRefreshToken(token);
        req.user = {
            userId: payload.userId.toString(),
            role: payload.role,
            organizationId: payload.organizationId ? payload.organizationId.toString() : null,
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
    }
    console.log("Authorization header:", authHeader);
    console.log("Extracted token:", token);
    console.log("Type of token:", typeof token);
};
// Middleware to check user role
export const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, error: 'Forbidden: Insufficient permissions' });
        }
        next();
    };
};
// Middleware to enforce organization context
export const requireOrganization = (req, res, next) => {
    if (!req.user || !req.user.organizationId) {
        return res.status(403).json({ success: false, error: 'Forbidden: Organization context required' });
    }
    next();
};
//# sourceMappingURL=auth.middleware.js.map
import type { Response } from "express";

export const sendSuccess = (res: Response, data: any, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        data,
        requestId: (res.req as any).id || null,
    });
};

export const sendError = (res: Response, message: string, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        error: message,
        requestId: (res.req as any).id || null,
    });
};

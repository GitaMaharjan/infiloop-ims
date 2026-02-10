import { type Request, type Response, type NextFunction } from "express";

export const globalErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {

    console.error("Global error handler caught an error:", err);

    // If response already sent, delegate to Express default handler

    if (res.headersSent) {
        return next(err);
    }
    const statusCode = (err as any)?.statusCode || 500;
    const message = (err as any)?.message || "Internal Server Error";

    return res.status(statusCode).json({
        sucess: false,
        error: message,
        requestId: req.headers["x-request-id"] || null,
    });
}

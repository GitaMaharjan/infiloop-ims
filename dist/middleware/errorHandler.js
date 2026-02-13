import {} from "express";
export const globalErrorHandler = (err, req, res, next) => {
    console.error("Global error handler caught an error:", err);
    // If response already sent, delegate to Express default handler
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";
    return res.status(statusCode).json({
        sucess: false,
        error: message,
        requestId: req.headers["x-request-id"] || null,
    });
};
//# sourceMappingURL=errorHandler.js.map
export const sendSuccess = (res, data, statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        data,
        requestId: res.req.id || null,
    });
};
export const sendError = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({
        success: false,
        error: message,
        requestId: res.req.id || null,
    });
};
//# sourceMappingURL=response.js.map
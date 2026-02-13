import { Router } from "express";
const router = Router();
router.get("/", (_req, _res, next) => {
    const error = new Error("This is a test error");
    error.statusCode = 400;
    return next(error);
});
export const errorHandlerRoutes = router;
//# sourceMappingURL=errorHandler.routes.js.map
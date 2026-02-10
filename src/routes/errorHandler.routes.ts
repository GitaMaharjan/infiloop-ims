
import type { Request, Response, NextFunction } from "express";
import { Router } from "express";

const router = Router();
router.get("/", (_req: Request, _res: Response, next) => {
    const error = new Error("This is a test error");
    (error as any).statusCode = 400;
    return next(error);
});

export const errorHandlerRoutes = router;
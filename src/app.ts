import express from "express";
import type { Request, Response } from "express";
import { requestLogger } from "./middleware/requestLogger.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import router from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(requestLogger)



app.use("/api/v1", router)

// Global error handler
app.use(globalErrorHandler);

export default app;
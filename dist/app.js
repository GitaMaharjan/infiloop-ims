import express from "express";
import { requestLogger } from "./middleware/requestLogger.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();
app.use(express.json());
app.use(requestLogger);
app.use("/api/v1", router);
// Global error handler
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map
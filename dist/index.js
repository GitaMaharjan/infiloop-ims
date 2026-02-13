import app from "./app.js";
import mongoose from "mongoose";
import { config } from "./config/index.js";
// MongoDB connection
async function connectDB() {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("MongoDB connection error:", error.message);
        }
        else {
            console.error("Unknown MongoDB connection error", error);
        }
        process.exit(1); // Stop server if DB fails
    }
}
// Start server only after DB is ready
async function startServer() {
    await connectDB();
    app.listen(config.port, () => {
        console.log(`🚀 Server running on port ${config.port}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map
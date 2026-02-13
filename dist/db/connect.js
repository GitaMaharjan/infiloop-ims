import mongoose from "mongoose";
import { config } from "../config/index.js";
export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri);
        console.log("MongoDB connected successfully");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDb:", error.message);
        }
        else {
            console.error("Unknown error connecting to MongoDb:", error);
        }
        process.exit(1); // Exit with failure
    }
};
//# sourceMappingURL=connect.js.map
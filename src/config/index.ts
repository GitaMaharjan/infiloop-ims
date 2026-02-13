// Import dotenv to load environment variables
import dotenv from "dotenv";

// Load variables from .env into process.env
dotenv.config();

/**
 * Central configuration object
 * Stores all critical environment variables in one place
 */
export const config = {
    // Server port, fallback to 4000
    port: Number(process.env.PORT) || 4000,

    // MongoDB connection URI (required)
    mongoUri: process.env.MONGO_URI as string,

    // JWT secret key (required for authentication)
    jwtSecret: process.env.JWT_SECRET as string,

    // JWT secret key for refresh
    jwtRefreshSecret: process.env.JWT_SECRET as string,

    // Environment type: 'development', 'production', or 'test'
    env: process.env.NODE_ENV || "development",

    // JWT token expiration time (optional, default to '1h')
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',
};

// Safety check: Ensure critical environment variables are set
if (!config.mongoUri || !config.jwtSecret) {
    throw new Error("Missing required environment variables: MONGO_URI or JWT_SECRET");
}

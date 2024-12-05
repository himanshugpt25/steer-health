"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../utils/logger");
/**
 * Cached database connection instance
 * Used to maintain a single connection across multiple function invocations
 */
let cachedConnection = null;
/**
 * Establishes or retrieves a connection to MongoDB
 * Implements connection pooling for efficient resource usage
 *
 * @returns Promise<typeof mongoose> - Mongoose connection instance
 * @throws Error if connection fails
 */
const getDbConnection = async () => {
    // Return existing connection if available
    if (cachedConnection) {
        return cachedConnection;
    }
    try {
        // Establish new connection with optimized settings for serverless environment
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare', {
            serverSelectionTimeoutMS: 5000, // Fail fast if server selection takes too long
            socketTimeoutMS: 45000, // Close idle connections after 45 seconds
        });
        // Cache the connection for reuse
        cachedConnection = conn;
        logger_1.logger.info(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    }
    catch (error) {
        logger_1.logger.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
exports.getDbConnection = getDbConnection;

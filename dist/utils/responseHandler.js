"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
const logger_1 = require("./logger");
/**
 * Utility class to handle API responses consistently
 */
class ResponseHandler {
    /**
     * Send a success response
     */
    static success(res, data, message, status = 200) {
        const response = {
            success: true,
            data,
            message
        };
        res.status(status).json(response);
    }
    /**
     * Send an error response
     */
    static error(res, error, status = 500) {
        const errorMessage = error instanceof Error ? error.message : error;
        logger_1.logger.error(errorMessage);
        const response = {
            success: false,
            error: errorMessage
        };
        res.status(status).json(response);
    }
}
exports.ResponseHandler = ResponseHandler;

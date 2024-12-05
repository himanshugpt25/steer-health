"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const appointmentRoutes_js_1 = __importDefault(require("./routes/appointmentRoutes.js"));
const server_js_1 = require("./config/server.js");
const errorHandler_js_1 = require("./middleware/errorHandler.js");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
/**
 * Creates and configures an Express application
 * Centralizes server setup for both local development and cloud deployment
 *
 * @returns Configured Express application
 */
const createServer = () => {
    const app = (0, express_1.default)();
    // Apply server configuration
    (0, server_js_1.configureServer)(app);
    // Mount API routes
    app.use('/api', userRoutes_js_1.default);
    app.use('/api', appointmentRoutes_js_1.default);
    // Global error handler
    app.use(errorHandler_js_1.errorHandler);
    return app;
};
// if (process.env.NODE_ENV === 'development') {
//   const app = createServer();
//   const port = process.env.PORT || 3000;
//   app.listen(port,() => {
//     logger.info(`Server is running on port ${port}`);
//     logger.info(`Environment: ${process.env.NODE_ENV}`);
//   });
// }
exports.default = createServer;

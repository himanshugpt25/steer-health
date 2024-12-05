"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureServer = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_js_1 = require("./cors.js");
const rateLimit_js_1 = require("./rateLimit.js");
/**
 * Configures and applies middleware to the Express application
 * Centralizes server configuration for consistent setup across environments
 *
 * @param app - Express application instance
 * @returns Configured Express application
 */
const configureServer = (app) => {
    // Security middleware
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)(cors_js_1.corsOptions));
    app.use((0, express_rate_limit_1.default)(rateLimit_js_1.rateLimitConfig));
    // Body parsing middleware
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    return app;
};
exports.configureServer = configureServer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
/**
 * CORS configuration options
 * Defines allowed origins, methods, and headers for cross-origin requests
 * Critical for HIPAA compliance by restricting access to trusted sources
 */
exports.corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
};

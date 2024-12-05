"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION = exports.APPOINTMENT_TYPES = void 0;
/**
 * Application-wide constants
 */
exports.APPOINTMENT_TYPES = ['consultation', 'followup', 'emergency', 'routine'];
exports.VALIDATION = {
    NAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 50
    },
    POLICY_NUMBER: {
        MIN_LENGTH: 5,
        MAX_LENGTH: 50
    }
};

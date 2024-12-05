"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAppointmentCreation = exports.validateInsuranceUpdate = exports.validateUserCreation = void 0;
const express_validator_1 = require("express-validator");
// Validate user creation request
exports.validateUserCreation = [
    (0, express_validator_1.body)('firstName')
        .trim()
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('lastName')
        .trim()
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),
    (0, express_validator_1.body)('dateOfBirth')
        .isISO8601()
        .withMessage('Valid date of birth is required')
        .custom((value) => {
        const date = new Date(value);
        const now = new Date();
        if (date > now) {
            throw new Error('Date of birth cannot be in the future');
        }
        return true;
    }),
    validateRequest
];
// Validate insurance update request
exports.validateInsuranceUpdate = [
    (0, express_validator_1.param)('patientId').notEmpty().withMessage('Patient ID is required'),
    (0, express_validator_1.body)('policyNumber')
        .trim()
        .notEmpty()
        .withMessage('Policy number is required')
        .isLength({ min: 5, max: 50 })
        .withMessage('Policy number must be between 5 and 50 characters'),
    validateRequest
];
// Validate appointment creation request
exports.validateAppointmentCreation = [
    (0, express_validator_1.body)('patientId').notEmpty().withMessage('Patient ID is required'),
    (0, express_validator_1.body)('bookingType')
        .trim()
        .notEmpty()
        .withMessage('Booking type is required')
        .isIn(['consultation', 'followup', 'emergency', 'routine'])
        .withMessage('Invalid booking type'),
    (0, express_validator_1.body)('appointmentTime')
        .isISO8601()
        .withMessage('Valid appointment time is required')
        .custom((value) => {
        const date = new Date(value);
        const now = new Date();
        if (date <= now) {
            throw new Error('Appointment time must be in the future');
        }
        return true;
    }),
    validateRequest
];
// Generic validation request handler
function validateRequest(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

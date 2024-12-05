import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

// Validate user creation request
export const validateUserCreation = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('dateOfBirth')
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
export const validateInsuranceUpdate = [
  param('patientId').notEmpty().withMessage('Patient ID is required'),
  body('policyNumber')
    .trim()
    .notEmpty()
    .withMessage('Policy number is required')
    .isLength({ min: 5, max: 50 })
    .withMessage('Policy number must be between 5 and 50 characters'),
  validateRequest
];

// Validate appointment creation request
export const validateAppointmentCreation = [
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('bookingType')
    .trim()
    .notEmpty()
    .withMessage('Booking type is required')
    .isIn(['consultation', 'followup', 'emergency', 'routine'])
    .withMessage('Invalid booking type'),
  body('appointmentTime')
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
function validateRequest(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
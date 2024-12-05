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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
/**
 * Mongoose schema definition for the Appointment model
 * Includes field definitions, validations, and relationships
 */
const AppointmentSchema = new mongoose_1.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true,
        default: () => (0, uuid_1.v4)() // Automatically generate UUID for new appointments
    },
    patientId: {
        type: String,
        required: true,
        ref: 'User' // Reference to User model for population
    },
    bookingType: {
        type: String,
        required: true
    },
    appointmentTime: {
        type: Date,
        required: true
    },
    additionalInfo: {
        type: String
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled'], // Restrict to valid status values
        default: 'scheduled'
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});
// Create and export the Appointment model
exports.Appointment = mongoose_1.default.model('Appointment', AppointmentSchema);

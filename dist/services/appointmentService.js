"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const Appointment_1 = require("../models/Appointment");
const User_1 = require("../models/User");
/**
 * Service layer for handling appointment-related business logic
 */
class AppointmentService {
    /**
     * Create a new appointment booking
     */
    static async createAppointment(appointmentData) {
        const { patientId } = appointmentData;
        const user = await User_1.User.findOne({ patientId });
        if (!user) {
            throw new Error('Patient not found');
        }
        const appointment = await Appointment_1.Appointment.create({
            ...appointmentData,
            appointmentTime: new Date(appointmentData.appointmentTime)
        });
        return appointment;
    }
}
exports.AppointmentService = AppointmentService;

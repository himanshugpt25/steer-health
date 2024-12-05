"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointment = void 0;
const appointmentService_1 = require("../services/appointmentService");
const responseHandler_1 = require("../utils/responseHandler");
const database_1 = require("../config/database");
/**
 * Appointment-related controller methods
 */
const createAppointment = async (req, res) => {
    try {
        await (0, database_1.getDbConnection)();
        const appointment = await appointmentService_1.AppointmentService.createAppointment(req.body);
        responseHandler_1.ResponseHandler.success(res, {
            bookingId: appointment.bookingId,
            appointmentTime: appointment.appointmentTime
        }, 'Appointment created successfully', 201);
    }
    catch (error) {
        responseHandler_1.ResponseHandler.error(res, error, error.message === 'Patient not found' ? 404 : 500);
    }
};
exports.createAppointment = createAppointment;

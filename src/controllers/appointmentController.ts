import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointmentService';
import { ResponseHandler } from '../utils/responseHandler';
import { getDbConnection } from '../config/database';

/**
 * Appointment-related controller methods
 */
export const createAppointment = async (req: Request, res: Response): Promise<void> => {
  try {
    await getDbConnection();
    const appointment = await AppointmentService.createAppointment(req.body);
    
    ResponseHandler.success(
      res,
      {
        bookingId: appointment.bookingId,
        appointmentTime: appointment.appointmentTime
      },
      'Appointment created successfully',
      201
    );
  } catch (error: any) {
    ResponseHandler.error(
      res,
      error,
      error.message === 'Patient not found' ? 404 : 500
    );
  }
};
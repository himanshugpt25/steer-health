import { Appointment } from '../models/Appointment';
import { User } from '../models/User';
import { AppointmentData } from '../types';

/**
 * Service layer for handling appointment-related business logic
 */
export class AppointmentService {
  /**
   * Create a new appointment booking
   */
  static async createAppointment(appointmentData: AppointmentData) {
    const { patientId } = appointmentData;

    const user = await User.findOne({ patientId });
    if (!user) {
      throw new Error('Patient not found');
    }

    const appointment = await Appointment.create({
      ...appointmentData,
      appointmentTime: new Date(appointmentData.appointmentTime)
    });

    return appointment;
  }
}
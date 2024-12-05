/**
 * Common type definitions used across the application
 */

// User related types
export interface UserData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  policyNumber?: string;
}

// Appointment related types
export interface AppointmentData {
  patientId: string;
  bookingType: AppointmentType;
  appointmentTime: string;
  additionalInfo?: string;
}

export type AppointmentType = 'consultation' | 'followup' | 'emergency' | 'routine';

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
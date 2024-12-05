import { Router } from 'express';
import { createAppointment } from '../controllers/appointmentController';
import { validateAppointmentCreation } from '../middleware/validation';

const router = Router();

router.post('/appointments', validateAppointmentCreation, createAppointment);

export default router;
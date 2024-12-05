import { Router } from 'express';
import { findOrCreateUser, updateInsurance } from '../controllers/userController';
import { validateUserCreation, validateInsuranceUpdate } from '../middleware/validation';

const router = Router();

router.post('/users', validateUserCreation, findOrCreateUser);
router.put('/users/:patientId/insurance', validateInsuranceUpdate, updateInsurance);

export default router;
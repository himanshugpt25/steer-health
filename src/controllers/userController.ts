import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { ResponseHandler } from '../utils/responseHandler';
import { getDbConnection } from '../config/database';

/**
 * User-related controller methods
 */
export const findOrCreateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await getDbConnection();
    const user = await UserService.findOrCreateUser(req.body);
    
    ResponseHandler.success(
      res,
      { patientId: user.patientId, policyNumber: user.policyNumber },
      'User retrieved/created successfully',
      user.createdAt === user.updatedAt ? 201 : 200
    );
  } catch (error: any) {
    ResponseHandler.error(res, error);
  }
};

export const updateInsurance = async (req: Request, res: Response): Promise<void> => {
  try {
    await getDbConnection();
    const { patientId } = req.params;
    const { policyNumber } = req.body;
    
    const updatedUser = await UserService.updateInsurance(patientId, policyNumber);
    
    ResponseHandler.success(
      res,
      { patientId: updatedUser.patientId, policyNumber: updatedUser.policyNumber },
      'Insurance updated successfully'
    );
  } catch (error: any) {
    ResponseHandler.error(
      res,
      error,
      error.message === 'User not found' ? 404 : 
      error.message === 'Policy number already in use' ? 400 : 500
    );
  }
};
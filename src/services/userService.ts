import { User } from '../models/User';
import { UserData } from '../types';
import { logger } from '../utils/logger';

/**
 * Service layer for handling user-related business logic
 */
export class UserService {
  /**
   * Find or create a user based on their details
   */
  static async findOrCreateUser(userData: UserData) {
    const { firstName, lastName, dateOfBirth } = userData;

    const existingUser = await User.findOne({
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth)
    });

    if (existingUser) {
      return existingUser;
    }

    return User.create({
      firstName,
      lastName,
      dateOfBirth: new Date(dateOfBirth)
    });
  }

  /**
   * Update user's insurance policy
   */
  static async updateInsurance(patientId: string, policyNumber: string) {
    const existingUserWithPolicy = await User.findOne({
      policyNumber,
      patientId: { $ne: patientId }
    });

    if (existingUserWithPolicy) {
      throw new Error('Policy number already in use');
    }

    const updatedUser = await User.findOneAndUpdate(
      { patientId },
      { policyNumber },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }
}
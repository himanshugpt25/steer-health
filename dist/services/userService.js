"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../models/User");
/**
 * Service layer for handling user-related business logic
 */
class UserService {
    /**
     * Find or create a user based on their details
     */
    static async findOrCreateUser(userData) {
        const { firstName, lastName, dateOfBirth } = userData;
        const existingUser = await User_1.User.findOne({
            firstName,
            lastName,
            dateOfBirth: new Date(dateOfBirth)
        });
        if (existingUser) {
            return existingUser;
        }
        return User_1.User.create({
            firstName,
            lastName,
            dateOfBirth: new Date(dateOfBirth)
        });
    }
    /**
     * Update user's insurance policy
     */
    static async updateInsurance(patientId, policyNumber) {
        const existingUserWithPolicy = await User_1.User.findOne({
            policyNumber,
            patientId: { $ne: patientId }
        });
        if (existingUserWithPolicy) {
            throw new Error('Policy number already in use');
        }
        const updatedUser = await User_1.User.findOneAndUpdate({ patientId }, { policyNumber }, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    }
}
exports.UserService = UserService;

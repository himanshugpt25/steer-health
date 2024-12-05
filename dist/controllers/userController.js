"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateInsurance = exports.findOrCreateUser = void 0;
const userService_1 = require("../services/userService");
const responseHandler_1 = require("../utils/responseHandler");
const database_1 = require("../config/database");
/**
 * User-related controller methods
 */
const findOrCreateUser = async (req, res) => {
    try {
        await (0, database_1.getDbConnection)();
        const user = await userService_1.UserService.findOrCreateUser(req.body);
        responseHandler_1.ResponseHandler.success(res, { patientId: user.patientId, policyNumber: user.policyNumber }, 'User retrieved/created successfully', user.createdAt === user.updatedAt ? 201 : 200);
    }
    catch (error) {
        responseHandler_1.ResponseHandler.error(res, error);
    }
};
exports.findOrCreateUser = findOrCreateUser;
const updateInsurance = async (req, res) => {
    try {
        await (0, database_1.getDbConnection)();
        const { patientId } = req.params;
        const { policyNumber } = req.body;
        const updatedUser = await userService_1.UserService.updateInsurance(patientId, policyNumber);
        responseHandler_1.ResponseHandler.success(res, { patientId: updatedUser.patientId, policyNumber: updatedUser.policyNumber }, 'Insurance updated successfully');
    }
    catch (error) {
        responseHandler_1.ResponseHandler.error(res, error, error.message === 'User not found' ? 404 :
            error.message === 'Policy number already in use' ? 400 : 500);
    }
};
exports.updateInsurance = updateInsurance;

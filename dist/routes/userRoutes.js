"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/users', validation_1.validateUserCreation, userController_1.findOrCreateUser);
router.put('/users/:patientId/insurance', validation_1.validateInsuranceUpdate, userController_1.updateInsurance);
exports.default = router;

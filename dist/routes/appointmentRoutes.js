"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointmentController_1 = require("../controllers/appointmentController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/appointments', validation_1.validateAppointmentCreation, appointmentController_1.createAppointment);
exports.default = router;

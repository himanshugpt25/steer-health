import { http } from '@google-cloud/functions-framework';
import createServer from './server.js';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Entry point for Google Cloud Functions
 * Exports the Express application as a Cloud Function
 * Uses the same server configuration as local development
 */
const app = createServer();
http('appointmentBot', app);

export { app as appointmentBot };
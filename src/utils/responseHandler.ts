import { Response } from 'express';
import { ApiResponse } from '../types';
import { logger } from './logger';

/**
 * Utility class to handle API responses consistently
 */
export class ResponseHandler {
  /**
   * Send a success response
   */
  static success<T>(res: Response, data: T, message?: string, status = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message
    };
    res.status(status).json(response);
  }

  /**
   * Send an error response
   */
  static error(res: Response, error: string | Error, status = 500): void {
    const errorMessage = error instanceof Error ? error.message : error;
    logger.error(errorMessage);
    
    const response: ApiResponse = {
      success: false,
      error: errorMessage
    };
    res.status(status).json(response);
  }
}
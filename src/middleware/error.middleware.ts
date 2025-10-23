
import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err);

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'A record with this value already exists',
      });
    }
    
    // Foreign key constraint violation
    if (err.code === 'P2003') {
      return res.status(400).json({
        success: false,
        error: 'Invalid reference to related record',
      });
    }

    // Record not found
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        error: 'Record not found',
      });
    }
  }

  // Multer errors
  if (err.name === 'MulterError') {
    if (err.message.includes('File too large')) {
      return res.status(400).json({
        success: false,
        error: 'File size is too large. Maximum size is 5MB',
      });
    }
    return res.status(400).json({
      success: false,
      error: err.message,
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
};

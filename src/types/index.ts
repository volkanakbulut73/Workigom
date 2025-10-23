import { Request } from 'express';
import { User } from '@prisma/client';

// Extend Express Request type with user
export interface AuthRequest extends Request {
  user?: User;
}

// JWT Payload type
export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

// API Response type
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

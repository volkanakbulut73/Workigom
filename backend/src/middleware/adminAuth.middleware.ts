import { Response, NextFunction } from 'express';
import { sendError } from '../utils/response';
import { UserRole } from '@prisma/client';
import { AuthRequest } from '../types';

/**
 * Admin authorization middleware
 * Checks if the authenticated user has ADMIN role
 * Must be used after the authenticate middleware
 */
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Check if user is authenticated
    if (!req.user) {
      return sendError(res, 'Kimlik doğrulaması gerekli', 401);
    }

    // Check if user has ADMIN role
    if (req.user.role !== UserRole.ADMIN) {
      return sendError(res, 'Bu işlem için yönetici yetkisi gerekli', 403);
    }

    next();
  } catch (error) {
    return sendError(res, 'Yetkilendirme başarısız', 403);
  }
};

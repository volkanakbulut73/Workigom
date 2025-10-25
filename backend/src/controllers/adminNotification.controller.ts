import { Response } from 'express';
import { AuthRequest } from '../types';
import { sendSuccess, sendError } from '../utils/response';
import prisma from '../config/database';
import { UserRole, NotificationType } from '@prisma/client';

/**
 * Target types for admin notifications
 */
export type NotificationTargetType = 
  | 'ALL' 
  | 'ALL_INDIVIDUALS' 
  | 'ALL_COMPANIES' 
  | 'SINGLE_INDIVIDUAL' 
  | 'SINGLE_COMPANY';

/**
 * Interface for send notification request body
 */
interface SendNotificationRequest {
  targetType: NotificationTargetType;
  targetId?: string;
  title: string;
  message: string;
  link?: string;
}

/**
 * Send notification to users
 * POST /api/admin/send-notification
 */
export const sendNotification = async (req: AuthRequest, res: Response) => {
  try {
    const { targetType, targetId, title, message, link }: SendNotificationRequest = req.body;

    let targetUserIds: string[] = [];

    // Find target users based on targetType
    switch (targetType) {
      case 'ALL':
        // Get all users
        const allUsers = await prisma.user.findMany({
          select: { id: true }
        });
        targetUserIds = allUsers.map(user => user.id);
        break;

      case 'ALL_INDIVIDUALS':
        // Get all individual users
        const individuals = await prisma.user.findMany({
          where: { role: UserRole.INDIVIDUAL },
          select: { id: true }
        });
        targetUserIds = individuals.map(user => user.id);
        break;

      case 'ALL_COMPANIES':
        // Get all corporate users
        const companies = await prisma.user.findMany({
          where: { role: UserRole.CORPORATE },
          select: { id: true }
        });
        targetUserIds = companies.map(user => user.id);
        break;

      case 'SINGLE_INDIVIDUAL':
        // Validate targetId is provided
        if (!targetId) {
          return sendError(res, 'SINGLE_INDIVIDUAL için targetId gerekli', 400);
        }

        // Check if user exists and is an individual
        const individual = await prisma.user.findUnique({
          where: { id: targetId }
        });

        if (!individual) {
          return sendError(res, 'Kullanıcı bulunamadı', 404);
        }

        if (individual.role !== UserRole.INDIVIDUAL) {
          return sendError(res, 'Belirtilen kullanıcı bir bireysel kullanıcı değil', 400);
        }

        targetUserIds = [targetId];
        break;

      case 'SINGLE_COMPANY':
        // Validate targetId is provided
        if (!targetId) {
          return sendError(res, 'SINGLE_COMPANY için targetId gerekli', 400);
        }

        // Check if user exists and is a corporate user
        const company = await prisma.user.findUnique({
          where: { id: targetId }
        });

        if (!company) {
          return sendError(res, 'Kullanıcı bulunamadı', 404);
        }

        if (company.role !== UserRole.CORPORATE) {
          return sendError(res, 'Belirtilen kullanıcı bir kurumsal kullanıcı değil', 400);
        }

        targetUserIds = [targetId];
        break;

      default:
        return sendError(res, 'Geçersiz targetType', 400);
    }

    // Check if there are users to notify
    if (targetUserIds.length === 0) {
      return sendError(res, 'Bildirim gönderilecek kullanıcı bulunamadı', 400);
    }

    // Create notifications for all target users
    const notifications = targetUserIds.map(userId => ({
      userId,
      type: NotificationType.SYSTEM,
      title,
      content: message,
      link: link || null,
      isRead: false,
    }));

    // Bulk insert notifications
    await prisma.notification.createMany({
      data: notifications
    });

    return sendSuccess(
      res,
      {
        count: targetUserIds.length,
        targetType,
        targetUserIds: targetType.startsWith('SINGLE') ? targetUserIds : undefined
      },
      `Bildirim başarıyla ${targetUserIds.length} kullanıcıya gönderildi`,
      201
    );
  } catch (error) {
    console.error('Send notification error:', error);
    return sendError(res, 'Bildirim gönderilirken bir hata oluştu', 500);
  }
};

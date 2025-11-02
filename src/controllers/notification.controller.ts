import { Request, Response } from 'express';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/response';
import prisma from '../config/database';

export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'User not authenticated', 401);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const isRead = req.query.isRead === 'true' ? true : req.query.isRead === 'false' ? false : undefined;

    const where: any = { userId: req.user.id };
    if (isRead !== undefined) where.isRead = isRead;

    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where, skip, take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.notification.count({ where })
    ]);

    sendPaginatedResponse(res, notifications, page, limit, total);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to get notifications', 500);
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) return sendError(res, 'Notification not found', 404);
    if (req.user?.id !== notification.userId) return sendError(res, 'Unauthorized', 403);

    const updated = await prisma.notification.update({
      where: { id },
      data: { isRead: true }
    });

    sendSuccess(res, updated, 'Notification marked as read');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to mark notification as read', 500);
  }
};

export const markAllAsRead = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'User not authenticated', 401);

    await prisma.notification.updateMany({
      where: { userId: req.user.id, isRead: false },
      data: { isRead: true }
    });

    sendSuccess(res, null, 'All notifications marked as read');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to mark all notifications as read', 500);
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await prisma.notification.findUnique({ where: { id } });
    if (!notification) return sendError(res, 'Notification not found', 404);
    if (req.user?.id !== notification.userId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    await prisma.notification.delete({ where: { id } });
    sendSuccess(res, null, 'Notification deleted successfully');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete notification', 500);
  }
};

export const getUnreadCount = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'User not authenticated', 401);

    const count = await prisma.notification.count({
      where: { userId: req.user.id, isRead: false }
    });

    sendSuccess(res, { count });
  } catch (error: any) {
    sendError(res, error.message || 'Failed to get unread count', 500);
  }
};

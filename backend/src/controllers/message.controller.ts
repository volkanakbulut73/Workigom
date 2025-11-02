import { Request, Response } from 'express';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/response';
import prisma from '../config/database';

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'User not authenticated', 401);
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const otherUserId = req.query.otherUserId as string;

    const where: any = {
      OR: [
        { senderId: req.user.id },
        { receiverId: req.user.id }
      ]
    };

    if (otherUserId) {
      where.OR = [
        { senderId: req.user.id, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: req.user.id }
      ];
    }

    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where, skip, take: limit,
        include: {
          sender: { select: { id: true, name: true, email: true, avatar: true } },
          receiver: { select: { id: true, name: true, email: true, avatar: true } }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.message.count({ where })
    ]);

    sendPaginatedResponse(res, messages, page, limit, total);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to get messages', 500);
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'User not authenticated', 401);
    const { receiverId, content } = req.body;

    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
    if (!receiver) return sendError(res, 'Receiver not found', 404);

    const message = await prisma.message.create({
      data: { senderId: req.user.id, receiverId, content },
      include: {
        sender: { select: { id: true, name: true, email: true, avatar: true } },
        receiver: { select: { id: true, name: true, email: true, avatar: true } }
      }
    });

    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'MESSAGE',
        title: 'Yeni Mesaj',
        content: `${req.user.name} size bir mesaj gönderdi.`,
        link: `/messages`,
      }
    });

    sendSuccess(res, message, 'Message sent successfully', 201);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to send message', 500);
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await prisma.message.findUnique({ where: { id } });
    if (!message) return sendError(res, 'Message not found', 404);
    if (req.user?.id !== message.receiverId) return sendError(res, 'Unauthorized', 403);

    const updated = await prisma.message.update({
      where: { id },
      data: { isRead: true }
    });

    sendSuccess(res, updated, 'Message marked as read');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to mark message as read', 500);
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await prisma.message.findUnique({ where: { id } });
    if (!message) return sendError(res, 'Message not found', 404);
    if (req.user?.id !== message.senderId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    await prisma.message.delete({ where: { id } });
    sendSuccess(res, null, 'Message deleted successfully');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete message', 500);
  }
};

export const getConversations = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'User not authenticated', 401);

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: req.user.id },
          { receiverId: req.user.id }
        ]
      },
      include: {
        sender: { select: { id: true, name: true, email: true, avatar: true } },
        receiver: { select: { id: true, name: true, email: true, avatar: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    const conversationMap = new Map();
    messages.forEach(msg => {
      const otherUserId = msg.senderId === req.user!.id ? msg.receiverId : msg.senderId;
      if (!conversationMap.has(otherUserId)) {
        conversationMap.set(otherUserId, {
          user: msg.senderId === req.user!.id ? msg.receiver : msg.sender,
          lastMessage: msg,
          unreadCount: 0
        });
      }
      if (msg.receiverId === req.user!.id && !msg.isRead) {
        conversationMap.get(otherUserId).unreadCount++;
      }
    });

    const conversations = Array.from(conversationMap.values());
    sendSuccess(res, conversations);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to get conversations', 500);
  }
};

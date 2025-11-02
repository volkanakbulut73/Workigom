import { Request, Response } from 'express';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/response';
import { hashPassword } from '../utils/password';
import prisma from '../config/database';
import { AuthRequest } from '../types';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const role = req.query.role as string;

    const where = role ? { role: role as any } : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          role: true,
          avatar: true,
          isVerified: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ]);

    sendPaginatedResponse(res, users, page, limit, total);
  } catch (error: any) {
    console.error('Get all users error:', error);
    sendError(res, error.message || 'Failed to get users', 500);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    sendSuccess(res, user);
  } catch (error: any) {
    console.error('Get user by id error:', error);
    sendError(res, error.message || 'Failed to get user', 500);
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, phone, email } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return sendError(res, 'User not found', 404);
    }

    // Check if user is authorized to update
    if (req.user?.id !== id && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name,
        phone,
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    sendSuccess(res, updatedUser, 'User updated successfully');
  } catch (error: any) {
    console.error('Update user error:', error);
    sendError(res, error.message || 'Failed to update user', 500);
  }
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return sendError(res, 'User not found', 404);
    }

    // Check if user is authorized to update
    if (req.user?.id !== id && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    if (!req.file) {
      return sendError(res, 'No file uploaded', 400);
    }

    const avatarPath = `/uploads/avatars/${req.file.filename}`;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        avatar: avatarPath,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        avatar: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    sendSuccess(res, updatedUser, 'Avatar updated successfully');
  } catch (error: any) {
    console.error('Update avatar error:', error);
    sendError(res, error.message || 'Failed to update avatar', 500);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    await prisma.user.delete({
      where: { id }
    });

    sendSuccess(res, null, 'User deleted successfully');
  } catch (error: any) {
    console.error('Delete user error:', error);
    sendError(res, error.message || 'Failed to delete user', 500);
  }
};

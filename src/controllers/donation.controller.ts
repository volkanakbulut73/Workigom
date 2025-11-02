import { Request, Response } from 'express';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/response';
import prisma from '../config/database';
import { DonationStatus, FoodType } from '@prisma/client';

export const getAllDonations = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status as DonationStatus;
    const foodType = req.query.foodType as FoodType;
    const search = req.query.search as string;

    const where: any = {};
    if (status) where.status = status;
    if (foodType) where.foodType = foodType;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        skip,
        take: limit,
        include: {
          donor: {
            select: { id: true, name: true, email: true, phone: true, avatar: true }
          },
          receiver: {
            select: { id: true, name: true, email: true, phone: true, avatar: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.donation.count({ where })
    ]);

    sendPaginatedResponse(res, donations, page, limit, total);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to get donations', 500);
  }
};

export const getDonationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        donor: { select: { id: true, name: true, email: true, phone: true, avatar: true } },
        receiver: { select: { id: true, name: true, email: true, phone: true, avatar: true } }
      }
    });

    if (!donation) return sendError(res, 'Donation not found', 404);
    sendSuccess(res, donation);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to get donation', 500);
  }
};

export const createDonation = async (req: Request, res: Response) => {
  try {
    if (!req.user) return sendError(res, 'User not authenticated', 401);
    const { title, description, foodType, quantity, location, address, expiryDate } = req.body;

    const donation = await prisma.donation.create({
      data: {
        title, description, foodType, quantity, location, address,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        donorId: req.user.id,
      },
      include: {
        donor: { select: { id: true, name: true, email: true, avatar: true } }
      }
    });

    sendSuccess(res, donation, 'Donation created successfully', 201);
  } catch (error: any) {
    sendError(res, error.message || 'Failed to create donation', 500);
  }
};

export const updateDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await prisma.donation.findUnique({ where: { id } });
    if (!existing) return sendError(res, 'Donation not found', 404);
    if (req.user?.id !== existing.donorId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    const donation = await prisma.donation.update({
      where: { id },
      data: req.body,
      include: {
        donor: { select: { id: true, name: true, email: true, avatar: true } },
        receiver: { select: { id: true, name: true, email: true, avatar: true } }
      }
    });

    sendSuccess(res, donation, 'Donation updated successfully');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to update donation', 500);
  }
};

export const requestDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!req.user) return sendError(res, 'User not authenticated', 401);

    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) return sendError(res, 'Donation not found', 404);
    if (donation.status !== 'AVAILABLE') return sendError(res, 'Donation not available', 400);

    const updated = await prisma.donation.update({
      where: { id },
      data: { status: DonationStatus.RESERVED, receiverId: req.user.id }
    });

    await prisma.notification.create({
      data: {
        userId: donation.donorId,
        type: 'DONATION_REQUEST',
        title: 'Yeni Bağış Talebi',
        content: `${req.user.name} "${donation.title}" bağışını talep etti.`,
        link: `/donations/${id}`,
      }
    });

    sendSuccess(res, updated, 'Donation requested successfully');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to request donation', 500);
  }
};

export const completeDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) return sendError(res, 'Donation not found', 404);
    if (req.user?.id !== donation.donorId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    const updated = await prisma.donation.update({
      where: { id },
      data: { status: DonationStatus.COMPLETED }
    });

    if (donation.receiverId) {
      await prisma.notification.create({
        data: {
          userId: donation.receiverId,
          type: 'DONATION_APPROVED',
          title: 'Bağış Tamamlandı',
          content: `"${donation.title}" bağışı tamamlandı.`,
          link: `/donations/${id}`,
        }
      });
    }

    sendSuccess(res, updated, 'Donation completed successfully');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to complete donation', 500);
  }
};

export const deleteDonation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const donation = await prisma.donation.findUnique({ where: { id } });
    if (!donation) return sendError(res, 'Donation not found', 404);
    if (req.user?.id !== donation.donorId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    await prisma.donation.delete({ where: { id } });
    sendSuccess(res, null, 'Donation deleted successfully');
  } catch (error: any) {
    sendError(res, error.message || 'Failed to delete donation', 500);
  }
};

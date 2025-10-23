
import { Request, Response } from 'express';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/response';
import prisma from '../config/database';
import { JobStatus, JobUrgency } from '@prisma/client';

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status as JobStatus;
    const urgency = req.query.urgency as JobUrgency;
    const search = req.query.search as string;
    const isUrgent = req.query.isUrgent === 'true';

    const where: any = {};
    if (status) where.status = status;
    if (urgency) where.urgency = urgency;
    if (isUrgent !== undefined) where.isUrgent = isUrgent;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        include: {
          employer: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            }
          },
          applications: {
            select: {
              id: true,
              status: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.job.count({ where })
    ]);

    sendPaginatedResponse(res, jobs, page, limit, total);
  } catch (error: any) {
    console.error('Get all jobs error:', error);
    sendError(res, error.message || 'Failed to get jobs', 500);
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          }
        },
        applications: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
              }
            }
          }
        }
      }
    });

    if (!job) {
      return sendError(res, 'Job not found', 404);
    }

    sendSuccess(res, job);
  } catch (error: any) {
    console.error('Get job by id error:', error);
    sendError(res, error.message || 'Failed to get job', 500);
  }
};

export const createJob = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'User not authenticated', 401);
    }

    const {
      title,
      description,
      company,
      location,
      salary,
      hourlyRate,
      duration,
      type,
      urgency,
      isUrgent,
      category,
      requirements,
      startTime,
    } = req.body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        company,
        location,
        salary: salary ? parseFloat(salary) : null,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : null,
        duration,
        type,
        status: req.user.role === 'ADMIN' ? JobStatus.ACTIVE : JobStatus.PENDING,
        urgency: urgency || JobUrgency.MEDIUM,
        isUrgent: isUrgent || false,
        category,
        requirements: requirements || [],
        startTime: startTime ? new Date(startTime) : null,
        employerId: req.user.id,
        approvedAt: req.user.role === 'ADMIN' ? new Date() : null,
      },
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          }
        }
      }
    });

    sendSuccess(res, job, 'Job created successfully', 201);
  } catch (error: any) {
    console.error('Create job error:', error);
    sendError(res, error.message || 'Failed to create job', 500);
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      company,
      location,
      salary,
      hourlyRate,
      duration,
      type,
      status,
      urgency,
      isUrgent,
      category,
      requirements,
      startTime,
    } = req.body;

    const existingJob = await prisma.job.findUnique({
      where: { id }
    });

    if (!existingJob) {
      return sendError(res, 'Job not found', 404);
    }

    // Check authorization
    if (req.user?.id !== existingJob.employerId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    const job = await prisma.job.update({
      where: { id },
      data: {
        title,
        description,
        company,
        location,
        salary: salary ? parseFloat(salary) : undefined,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        duration,
        type,
        status,
        urgency,
        isUrgent,
        category,
        requirements,
        startTime: startTime ? new Date(startTime) : undefined,
      },
      include: {
        employer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          }
        }
      }
    });

    sendSuccess(res, job, 'Job updated successfully');
  } catch (error: any) {
    console.error('Update job error:', error);
    sendError(res, error.message || 'Failed to update job', 500);
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.findUnique({
      where: { id }
    });

    if (!job) {
      return sendError(res, 'Job not found', 404);
    }

    // Check authorization
    if (req.user?.id !== job.employerId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    await prisma.job.delete({
      where: { id }
    });

    sendSuccess(res, null, 'Job deleted successfully');
  } catch (error: any) {
    console.error('Delete job error:', error);
    sendError(res, error.message || 'Failed to delete job', 500);
  }
};

export const approveJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.update({
      where: { id },
      data: {
        status: JobStatus.ACTIVE,
        approvedAt: new Date(),
      }
    });

    sendSuccess(res, job, 'Job approved successfully');
  } catch (error: any) {
    console.error('Approve job error:', error);
    sendError(res, error.message || 'Failed to approve job', 500);
  }
};

export const rejectJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const job = await prisma.job.update({
      where: { id },
      data: {
        status: JobStatus.REJECTED,
      }
    });

    sendSuccess(res, job, 'Job rejected');
  } catch (error: any) {
    console.error('Reject job error:', error);
    sendError(res, error.message || 'Failed to reject job', 500);
  }
};

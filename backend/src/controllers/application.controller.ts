
import { Request, Response } from 'express';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/response';
import prisma from '../config/database';
import { ApplicationStatus } from '@prisma/client';

export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const status = req.query.status as ApplicationStatus;
    const jobId = req.query.jobId as string;
    const userId = req.query.userId as string;

    const where: any = {};
    if (status) where.status = status;
    if (jobId) where.jobId = jobId;
    if (userId) where.userId = userId;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        skip,
        take: limit,
        include: {
          job: {
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
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatar: true,
            }
          }
        },
        orderBy: { appliedAt: 'desc' }
      }),
      prisma.application.count({ where })
    ]);

    sendPaginatedResponse(res, applications, page, limit, total);
  } catch (error: any) {
    console.error('Get all applications error:', error);
    sendError(res, error.message || 'Failed to get applications', 500);
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: {
          include: {
            employer: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                avatar: true,
              }
            }
          }
        },
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
    });

    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    sendSuccess(res, application);
  } catch (error: any) {
    console.error('Get application by id error:', error);
    sendError(res, error.message || 'Failed to get application', 500);
  }
};

export const createApplication = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'User not authenticated', 401);
    }

    const { jobId, coverLetter } = req.body;

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });

    if (!job) {
      return sendError(res, 'Job not found', 404);
    }

    // Check if user already applied
    const existingApplication = await prisma.application.findFirst({
      where: {
        jobId,
        userId: req.user.id,
      }
    });

    if (existingApplication) {
      return sendError(res, 'You have already applied for this job', 400);
    }

    let resumePath = null;
    if (req.file) {
      resumePath = `/uploads/resumes/${req.file.filename}`;
    }

    const application = await prisma.application.create({
      data: {
        jobId,
        userId: req.user.id,
        coverLetter,
        resume: resumePath,
      },
      include: {
        job: {
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
        },
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
    });

    // Create notification for employer
    await prisma.notification.create({
      data: {
        userId: job.employerId,
        type: 'JOB_APPLICATION',
        title: 'Yeni İş Başvurusu',
        content: `${req.user.name} "${job.title}" pozisyonuna başvurdu.`,
        link: `/applications/${application.id}`,
      }
    });

    sendSuccess(res, application, 'Application submitted successfully', 201);
  } catch (error: any) {
    console.error('Create application error:', error);
    sendError(res, error.message || 'Failed to create application', 500);
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existingApplication = await prisma.application.findUnique({
      where: { id },
      include: {
        job: true,
        user: true,
      }
    });

    if (!existingApplication) {
      return sendError(res, 'Application not found', 404);
    }

    // Check authorization - only job employer or admin can update
    if (req.user?.id !== existingApplication.job.employerId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    const application = await prisma.application.update({
      where: { id },
      data: { status },
      include: {
        job: {
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
        },
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
    });

    // Create notification for applicant
    let notificationTitle = 'Başvuru Durumu Güncellendi';
    let notificationContent = `"${application.job.title}" pozisyonuna başvurunuz `;
    
    if (status === 'ASSIGNED') {
      notificationTitle = 'İşe Atandınız!';
      notificationContent += 'kabul edildi. Tebrikler!';
    } else if (status === 'REJECTED') {
      notificationTitle = 'Başvuru Reddedildi';
      notificationContent += 'reddedildi.';
    } else if (status === 'COMPLETED') {
      notificationTitle = 'İş Tamamlandı';
      notificationContent += 'tamamlandı olarak işaretlendi.';
    }

    await prisma.notification.create({
      data: {
        userId: application.userId,
        type: 'JOB_ASSIGNMENT',
        title: notificationTitle,
        content: notificationContent,
        link: `/jobs/${application.jobId}`,
      }
    });

    sendSuccess(res, application, 'Application status updated successfully');
  } catch (error: any) {
    console.error('Update application status error:', error);
    sendError(res, error.message || 'Failed to update application status', 500);
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findUnique({
      where: { id }
    });

    if (!application) {
      return sendError(res, 'Application not found', 404);
    }

    // Check authorization
    if (req.user?.id !== application.userId && req.user?.role !== 'ADMIN') {
      return sendError(res, 'Unauthorized', 403);
    }

    await prisma.application.delete({
      where: { id }
    });

    sendSuccess(res, null, 'Application deleted successfully');
  } catch (error: any) {
    console.error('Delete application error:', error);
    sendError(res, error.message || 'Failed to delete application', 500);
  }
};

import { Request, Response } from 'express';
import { hashPassword } from '../utils/password';
import { sendSuccess, sendError } from '../utils/response';
import prisma from '../config/database';
import { UserRole } from '@prisma/client';

// Default admin credentials
const ADMIN_EMAIL = 'admin@workigom.com';
const ADMIN_PASSWORD = 'Admin123!';
const ADMIN_NAME = 'Admin User';
const ADMIN_PHONE = '+90 555 000 0000';

/**
 * Setup Admin User
 * 
 * This endpoint creates a default admin user if none exists in the database.
 * Security: Only works if no admin exists (prevents unauthorized admin creation).
 * 
 * @route POST /api/admin/setup
 * @access Public (but only works if no admin exists)
 */
export const setupAdmin = async (req: Request, res: Response) => {
  try {
    console.log('🔧 Admin Setup Request received');

    // Step 1: Check if any admin exists in the database
    const existingAdmin = await prisma.user.findFirst({
      where: { role: UserRole.ADMIN }
    });

    if (existingAdmin) {
      console.log('⚠️ Admin already exists, setup not allowed');
      return sendError(
        res,
        'Admin user already exists. This endpoint can only be used when no admin exists in the system.',
        403
      );
    }

    // Step 2: Check if the specific admin email exists
    const existingUser = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL }
    });

    if (existingUser) {
      console.log('ℹ️ User exists, promoting to ADMIN');
      const updatedUser = await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { role: UserRole.ADMIN },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true
        }
      });

      console.log('✅ User promoted to ADMIN successfully');
      return sendSuccess(
        res,
        {
          user: updatedUser,
          credentials: {
            email: ADMIN_EMAIL,
            password: 'Use your existing password'
          }
        },
        'User promoted to admin successfully',
        200
      );
    }

    // Step 3: Create new admin user
    console.log('🆕 Creating new admin user');
    const hashedPassword = await hashPassword(ADMIN_PASSWORD);

    const admin = await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: ADMIN_NAME,
        phone: ADMIN_PHONE,
        role: UserRole.ADMIN,
        isVerified: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    console.log('✅ Admin user created successfully');

    return sendSuccess(
      res,
      {
        user: admin,
        credentials: {
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD
        },
        warning: '⚠️ Please change the password after first login!'
      },
      'Admin user created successfully',
      201
    );

  } catch (error) {
    console.error('❌ Error in admin setup:', error);
    return sendError(res, 'Failed to setup admin user', 500);
  }
};

/**
 * Check Admin Status
 * 
 * This endpoint checks if an admin user exists in the system.
 * 
 * @route GET /api/admin/setup/status
 * @access Public
 */
export const checkAdminStatus = async (req: Request, res: Response) => {
  try {
    const adminExists = await prisma.user.findFirst({
      where: { role: UserRole.ADMIN },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });

    if (adminExists) {
      return sendSuccess(
        res,
        {
          adminExists: true,
          admin: {
            email: adminExists.email,
            name: adminExists.name,
            createdAt: adminExists.createdAt
          }
        },
        'Admin user exists',
        200
      );
    }

    return sendSuccess(
      res,
      {
        adminExists: false,
        message: 'You can create an admin user using POST /api/admin/setup'
      },
      'No admin user found',
      200
    );

  } catch (error) {
    console.error('❌ Error checking admin status:', error);
    return sendError(res, 'Failed to check admin status', 500);
  }
};

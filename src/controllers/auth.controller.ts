import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken, generateRefreshToken, generateVerifyToken, generateResetToken } from '../utils/jwt';
import { sendSuccess, sendError } from '../utils/response';
import prisma from '../config/database';
import { UserRole } from '@prisma/client';
import { AuthRequest } from '../types';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return sendError(res, 'Email already registered', 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verifyToken = generateVerifyToken();

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: role || UserRole.INDIVIDUAL,
        verifyToken,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true,
      }
    });

    // Generate tokens
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    sendSuccess(res, {
      user,
      token,
      refreshToken,
      message: 'Registration successful. Please verify your email.'
    }, 'User registered successfully', 201);
  } catch (error: any) {
    console.error('Register error:', error);
    sendError(res, error.message || 'Registration failed', 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Generate tokens
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    sendSuccess(res, {
      user: userWithoutPassword,
      token,
      refreshToken,
    }, 'Login successful');
  } catch (error: any) {
    console.error('Login error:', error);
    sendError(res, error.message || 'Login failed', 500);
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const user = await prisma.user.findFirst({
      where: { verifyToken: token }
    });

    if (!user) {
      return sendError(res, 'Invalid verification token', 400);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
      }
    });

    sendSuccess(res, null, 'Email verified successfully');
  } catch (error: any) {
    console.error('Verify email error:', error);
    sendError(res, error.message || 'Email verification failed', 500);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const resetToken = generateResetToken();
    const resetTokenExp = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExp,
      }
    });

    // TODO: Send email with reset token

    sendSuccess(res, { resetToken }, 'Password reset token sent to email');
  } catch (error: any) {
    console.error('Forgot password error:', error);
    sendError(res, error.message || 'Password reset request failed', 500);
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExp: {
          gt: new Date(),
        }
      }
    });

    if (!user) {
      return sendError(res, 'Invalid or expired reset token', 400);
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExp: null,
      }
    });

    sendSuccess(res, null, 'Password reset successful');
  } catch (error: any) {
    console.error('Reset password error:', error);
    sendError(res, error.message || 'Password reset failed', 500);
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return sendError(res, 'User not authenticated', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
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
    console.error('Get current user error:', error);
    sendError(res, error.message || 'Failed to get user', 500);
  }
};

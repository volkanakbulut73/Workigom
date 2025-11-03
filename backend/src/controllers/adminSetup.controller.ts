import { Request, Response } from 'express';
import prisma from '../config/database';
import { hashPassword } from '../utils/password';
import { sendSuccess, sendError } from '../utils/response';
import { UserRole } from '@prisma/client';

// 🔐 Varsayılan admin bilgileri
const ADMIN_EMAIL = 'admin@workigom.com';
const ADMIN_PASSWORD = 'Admin123!';
const ADMIN_NAME = 'Admin User';
const ADMIN_PHONE = '+90 555 000 0000';

/**
 * 🔧 Admin Kullanıcısı Oluşturma veya Yükseltme
 * 
 * Endpoint: POST /api/admin/setup
 * 
 * - Eğer hiç admin yoksa varsayılan admin oluşturur.
 * - Eğer admin varsa işlem yapmaz (403 döner).
 * - Eğer aynı emailde kullanıcı varsa, rolünü admin yapar.
 */
export const setupAdmin = async (req: Request, res: Response) => {
  try {
    console.log('🔧 Admin setup isteği alındı');

    // 1️⃣ Var olan admin var mı kontrol et
    const existingAdmin = await prisma.user.findFirst({
      where: { role: UserRole.ADMIN }
    });

    if (existingAdmin) {
      console.log('⚠️ Admin zaten mevcut, yeni admin oluşturulmadı');
      return sendError(
        res,
        'Admin zaten mevcut. Bu endpoint yalnızca ilk kurulumda kullanılabilir.',
        403
      );
    }

    // 2️⃣ Aynı e-postaya sahip kullanıcı var mı kontrol et
    const existingUser = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL }
    });

    // 2.a Eğer kullanıcı varsa, rolünü admin yap
    if (existingUser) {
      console.log('ℹ️ Kullanıcı bulundu, admin rolüne yükseltiliyor...');
      const updatedUser = await prisma.user.update({
        where: { email: ADMIN_EMAIL },
        data: { role: UserRole.ADMIN },
        select: { id: true, email: true, name: true, role: true, createdAt: true }
      });

      console.log('✅ Kullanıcı admin yapıldı');
      return sendSuccess(res, 'Kullanıcı admin olarak güncellendi', {
        user: updatedUser,
        credentials: {
          email: ADMIN_EMAIL,
          password: 'Mevcut şifrenizi kullanın'
        }
      });
    }

    // 3️⃣ Yeni admin oluştur
    console.log('🆕 Yeni admin oluşturuluyor...');
    const hashedPassword = await hashPassword(ADMIN_PASSWORD);

    const admin = await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: hashedPassword,
        name: ADMIN_NAME,
        phone: ADMIN_PHONE,
        role: UserRole.ADMIN,
        isVerified: true
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    console.log('✅ Admin başarıyla oluşturuldu');
    return sendSuccess(res, 'Admin başarıyla oluşturuldu', {
      user: admin,
      credentials: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      },
      warning: '⚠️ İlk girişten sonra şifrenizi değiştirin!'
    }, 201);

  } catch (error: any) {
    console.error('❌ Admin setup hatası:', error);
    return sendError(res, 'Admin setup işlemi başarısız oldu', 500);
  }
};

/**
 * 👀 Admin Durumu Kontrolü
 * 
 * Endpoint: GET /api/admin/setup/status
 * 
 * - Admin mevcut mu kontrol eder.
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
      return sendSuccess(res, 'Admin mevcut', {
        adminExists: true,
        admin: adminExists
      });
    }

    return send

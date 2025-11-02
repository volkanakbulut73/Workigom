#!/usr/bin/env ts-node

/**
 * Create Admin User Script
 * 
 * This script creates a default admin user if it doesn't exist.
 * 
 * Default Admin Credentials:
 * Email: admin@workigom.com
 * Password: Admin123!
 * 
 * Usage:
 * npx ts-node scripts/create-admin.ts
 */

import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Default admin credentials
const ADMIN_EMAIL = 'admin@workigom.com';
const ADMIN_PASSWORD = 'Admin123!';
const ADMIN_NAME = 'Admin User';
const ADMIN_PHONE = '+90 555 000 0000';

async function createAdmin() {
  try {
    console.log('🔧 Creating Admin User...\n');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL }
    });

    if (existingAdmin) {
      if (existingAdmin.role === UserRole.ADMIN) {
        console.log('ℹ️ Admin user already exists with ADMIN role');
        console.log(`   Email: ${ADMIN_EMAIL}`);
        console.log(`   Password: ${ADMIN_PASSWORD}`);
        return;
      } else {
        // User exists but is not an admin, promote them
        console.log(`ℹ️ User exists with role ${existingAdmin.role}, promoting to ADMIN...`);
        const updatedUser = await prisma.user.update({
          where: { email: ADMIN_EMAIL },
          data: { role: UserRole.ADMIN }
        });
        console.log('✅ User promoted to ADMIN successfully');
        console.log(`   Email: ${ADMIN_EMAIL}`);
        console.log(`   Password: Use your existing password`);
        return;
      }
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

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

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📧 Admin Credentials:');
    console.log('─'.repeat(50));
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('─'.repeat(50));
    console.log('');
    console.log('⚠️ IMPORTANT: Please change the password after first login!');
    console.log('');
    console.log('Admin Details:');
    console.log(JSON.stringify(admin, null, 2));

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    throw error;
  }
}

async function main() {
  await createAdmin();
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

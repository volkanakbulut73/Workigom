#!/usr/bin/env ts-node

/**
 * Promote User to Admin Script
 * 
 * This script promotes an existing user to ADMIN role.
 * 
 * Usage:
 * 1. With email: npx ts-node scripts/promote-to-admin.ts user@example.com
 * 2. Interactive: npx ts-node scripts/promote-to-admin.ts
 */

import { PrismaClient, UserRole } from '@prisma/client';
import readline from 'readline';

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function promoteToAdmin(email: string) {
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.error(`❌ User with email "${email}" not found`);
      return false;
    }

    if (user.role === UserRole.ADMIN) {
      console.log(`ℹ️ User "${email}" is already an ADMIN`);
      return true;
    }

    // Promote to admin
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: UserRole.ADMIN },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    });

    console.log('✅ User successfully promoted to ADMIN:');
    console.log(JSON.stringify(updatedUser, null, 2));
    return true;
  } catch (error) {
    console.error('❌ Error promoting user:', error);
    return false;
  }
}

async function listAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (users.length === 0) {
      console.log('No users found in database');
      return;
    }

    console.log('\n📋 All Users:');
    console.log('─'.repeat(80));
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email}`);
      console.log(`   Name: ${user.name}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Created: ${user.createdAt.toISOString()}`);
      console.log('─'.repeat(80));
    });
  } catch (error) {
    console.error('❌ Error listing users:', error);
  }
}

async function main() {
  console.log('🔧 Promote User to Admin Script');
  console.log('');

  // Check if email was provided as command line argument
  const email = process.argv[2];

  if (email) {
    // Direct promotion
    await promoteToAdmin(email);
  } else {
    // Interactive mode
    console.log('📋 Listing all users...\n');
    await listAllUsers();
    console.log('');

    const userEmail = await question('Enter the email of the user to promote to ADMIN (or "exit" to quit): ');

    if (userEmail.toLowerCase() === 'exit') {
      console.log('Exiting...');
    } else if (userEmail.trim()) {
      await promoteToAdmin(userEmail.trim());
    } else {
      console.log('❌ No email provided');
    }
  }

  rl.close();
}

main()
  .catch((e) => {
    console.error('❌ Script error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

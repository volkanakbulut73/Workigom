
import { PrismaClient, UserRole, JobStatus, JobUrgency, DonationStatus, FoodType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@workigom.com' },
    update: {},
    create: {
      email: 'admin@workigom.com',
      password: adminPassword,
      name: 'Admin User',
      phone: '+90 555 000 0000',
      role: UserRole.ADMIN,
      isVerified: true,
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create Corporate Users (Employers/Donors)
  const corporatePassword = await bcrypt.hash('company123', 10);
  const company1 = await prisma.user.upsert({
    where: { email: 'company1@workigom.com' },
    update: {},
    create: {
      email: 'company1@workigom.com',
      password: corporatePassword,
      name: 'Tech Solutions Ltd.',
      phone: '+90 555 111 1111',
      role: UserRole.CORPORATE,
      isVerified: true,
    },
  });
  console.log('✅ Corporate user 1 created:', company1.email);

  const company2 = await prisma.user.upsert({
    where: { email: 'company2@workigom.com' },
    update: {},
    create: {
      email: 'company2@workigom.com',
      password: corporatePassword,
      name: 'Restoran Lezzet',
      phone: '+90 555 222 2222',
      role: UserRole.CORPORATE,
      isVerified: true,
    },
  });
  console.log('✅ Corporate user 2 created:', company2.email);

  // Create Individual Users (Job Seekers/Donation Receivers)
  const individualPassword = await bcrypt.hash('user123', 10);
  const individual1 = await prisma.user.upsert({
    where: { email: 'mehmet@example.com' },
    update: {},
    create: {
      email: 'mehmet@example.com',
      password: individualPassword,
      name: 'Mehmet Yılmaz',
      phone: '+90 555 333 3333',
      role: UserRole.INDIVIDUAL,
      isVerified: true,
    },
  });
  console.log('✅ Individual user 1 created:', individual1.email);

  const individual2 = await prisma.user.upsert({
    where: { email: 'ayse@example.com' },
    update: {},
    create: {
      email: 'ayse@example.com',
      password: individualPassword,
      name: 'Ayşe Demir',
      phone: '+90 555 444 4444',
      role: UserRole.INDIVIDUAL,
      isVerified: true,
    },
  });
  console.log('✅ Individual user 2 created:', individual2.email);

  // Create additional test users for easy testing
  const testPassword = await bcrypt.hash('Test123!', 10);
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: testPassword,
      name: 'Test User',
      phone: '+90 555 555 5555',
      role: UserRole.INDIVIDUAL,
      isVerified: true,
    },
  });
  console.log('✅ Test user created:', testUser.email);

  const donorPassword = await bcrypt.hash('Donor123!', 10);
  const donorUser = await prisma.user.upsert({
    where: { email: 'donor@example.com' },
    update: {},
    create: {
      email: 'donor@example.com',
      password: donorPassword,
      name: 'Donor User',
      phone: '+90 555 666 6666',
      role: UserRole.CORPORATE,
      isVerified: true,
    },
  });
  console.log('✅ Donor user created:', donorUser.email);

  const seekerPassword = await bcrypt.hash('Seeker123!', 10);
  const seekerUser = await prisma.user.upsert({
    where: { email: 'seeker@example.com' },
    update: {},
    create: {
      email: 'seeker@example.com',
      password: seekerPassword,
      name: 'Job Seeker',
      phone: '+90 555 777 7777',
      role: UserRole.INDIVIDUAL,
      isVerified: true,
    },
  });
  console.log('✅ Seeker user created:', seekerUser.email);

  // Create Jobs
  const job1 = await prisma.job.create({
    data: {
      title: 'Yazılım Geliştirici',
      description: 'React ve Node.js deneyimi olan full-stack developer aranıyor.',
      company: company1.name,
      location: 'İstanbul, Türkiye',
      salary: 15000,
      hourlyRate: 100,
      duration: '6 ay',
      type: 'full-time',
      status: JobStatus.ACTIVE,
      urgency: JobUrgency.HIGH,
      isUrgent: true,
      category: 'Teknoloji',
      requirements: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      startTime: new Date('2024-11-01'),
      approvedAt: new Date(),
      employerId: company1.id,
    },
  });
  console.log('✅ Job 1 created:', job1.title);

  const job2 = await prisma.job.create({
    data: {
      title: 'Garson',
      description: 'Deneyimli garson aranıyor. Hafta sonları çalışabilir olmalı.',
      company: company2.name,
      location: 'Ankara, Türkiye',
      salary: 8000,
      hourlyRate: 50,
      duration: '3 ay',
      type: 'part-time',
      status: JobStatus.ACTIVE,
      urgency: JobUrgency.MEDIUM,
      isUrgent: false,
      category: 'Hizmet',
      requirements: ['İletişim becerileri', 'Müşteri odaklılık'],
      startTime: new Date('2024-10-25'),
      approvedAt: new Date(),
      employerId: company2.id,
    },
  });
  console.log('✅ Job 2 created:', job2.title);

  // Create Applications
  await prisma.application.create({
    data: {
      jobId: job1.id,
      userId: individual1.id,
      status: 'PENDING',
      coverLetter: 'React ve Node.js konusunda 3 yıllık deneyimim var.',
    },
  });
  console.log('✅ Application 1 created');

  await prisma.application.create({
    data: {
      jobId: job2.id,
      userId: individual2.id,
      status: 'ASSIGNED',
      coverLetter: '2 yıl restoran deneyimim var.',
    },
  });
  console.log('✅ Application 2 created');

  // Create Donations
  await prisma.donation.create({
    data: {
      title: 'Ev Yapımı Yemek',
      description: '10 kişilik ev yapımı mantı ve çorba',
      foodType: FoodType.COOKED_MEAL,
      quantity: '10 porsiyon',
      location: 'İstanbul, Kadıköy',
      address: 'Kadıköy Moda Cad. No:123',
      status: DonationStatus.AVAILABLE,
      expiryDate: new Date('2024-10-23'),
      donorId: company2.id,
    },
  });
  console.log('✅ Donation 1 created');

  await prisma.donation.create({
    data: {
      title: 'Paket Gıda Yardımı',
      description: 'Konserve, makarna, pirinç içeren gıda paketi',
      foodType: FoodType.PACKAGED_FOOD,
      quantity: '5 paket',
      location: 'Ankara, Çankaya',
      address: 'Çankaya Kızılay Meydanı',
      status: DonationStatus.AVAILABLE,
      expiryDate: new Date('2025-01-01'),
      donorId: company1.id,
    },
  });
  console.log('✅ Donation 2 created');

  // Create Messages
  await prisma.message.create({
    data: {
      senderId: company1.id,
      receiverId: individual1.id,
      content: 'Merhaba, başvurunuz değerlendiriliyor. Yakında dönüş yapacağız.',
    },
  });
  console.log('✅ Message 1 created');

  // Create Notifications
  await prisma.notification.create({
    data: {
      userId: individual1.id,
      type: 'JOB_APPLICATION',
      title: 'Yeni İş Başvurusu',
      content: 'Yazılım Geliştirici pozisyonuna başvurunuz alındı.',
      link: `/jobs/${job1.id}`,
    },
  });
  console.log('✅ Notification 1 created');

  await prisma.notification.create({
    data: {
      userId: individual2.id,
      type: 'JOB_ASSIGNMENT',
      title: 'İşe Atandınız!',
      content: 'Garson pozisyonuna atandınız. Tebrikler!',
      link: `/jobs/${job2.id}`,
    },
  });
  console.log('✅ Notification 2 created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

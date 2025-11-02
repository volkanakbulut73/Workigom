
import { PrismaClient, UserRole, JobStatus, JobUrgency, DonationStatus, FoodType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');
  console.log('');

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

  const company3 = await prisma.user.upsert({
    where: { email: 'company3@workigom.com' },
    update: {},
    create: {
      email: 'company3@workigom.com',
      password: corporatePassword,
      name: 'Yapı Market A.Ş.',
      phone: '+90 555 333 3333',
      role: UserRole.CORPORATE,
      isVerified: true,
    },
  });
  console.log('✅ Corporate user 3 created:', company3.email);

  const company4 = await prisma.user.upsert({
    where: { email: 'company4@workigom.com' },
    update: {},
    create: {
      email: 'company4@workigom.com',
      password: corporatePassword,
      name: 'E-Ticaret Global',
      phone: '+90 555 444 4444',
      role: UserRole.CORPORATE,
      isVerified: true,
    },
  });
  console.log('✅ Corporate user 4 created:', company4.email);

  // Create Individual Users (Job Seekers/Donation Receivers)
  const individualPassword = await bcrypt.hash('user123', 10);
  const individual1 = await prisma.user.upsert({
    where: { email: 'mehmet@example.com' },
    update: {},
    create: {
      email: 'mehmet@example.com',
      password: individualPassword,
      name: 'Mehmet Yılmaz',
      phone: '+90 555 555 5555',
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
      phone: '+90 555 666 6666',
      role: UserRole.INDIVIDUAL,
      isVerified: true,
    },
  });
  console.log('✅ Individual user 2 created:', individual2.email);

  const individual3 = await prisma.user.upsert({
    where: { email: 'ali@example.com' },
    update: {},
    create: {
      email: 'ali@example.com',
      password: individualPassword,
      name: 'Ali Kaya',
      phone: '+90 555 777 7777',
      role: UserRole.INDIVIDUAL,
      isVerified: true,
    },
  });
  console.log('✅ Individual user 3 created:', individual3.email);

  const individual4 = await prisma.user.upsert({
    where: { email: 'fatma@example.com' },
    update: {},
    create: {
      email: 'fatma@example.com',
      password: individualPassword,
      name: 'Fatma Şahin',
      phone: '+90 555 888 8888',
      role: UserRole.INDIVIDUAL,
      isVerified: true,
    },
  });
  console.log('✅ Individual user 4 created:', individual4.email);

  const individual5 = await prisma.user.upsert({
    where: { email: 'can@example.com' },
    update: {},
    create: {
      email: 'can@example.com',
      password: individualPassword,
      name: 'Can Özdemir',
      phone: '+90 555 999 9999',
      role: UserRole.INDIVIDUAL,
      isVerified: true,
    },
  });
  console.log('✅ Individual user 5 created:', individual5.email);

  console.log('');
  console.log('📋 Creating Jobs...');
  
  // Create Jobs
  const job1 = await prisma.job.create({
    data: {
      title: 'Yazılım Geliştirici',
      description: 'React ve Node.js deneyimi olan full-stack developer aranıyor. Modern web teknolojileri ile ilgilenen, takım çalışmasına yatkın adaylar aramaktayız.',
      company: company1.name,
      location: 'İstanbul, Türkiye',
      salary: 25000,
      hourlyRate: 150,
      duration: '12 ay',
      type: 'full-time',
      status: JobStatus.ACTIVE,
      urgency: JobUrgency.HIGH,
      isUrgent: true,
      category: 'Teknoloji',
      requirements: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST API'],
      startTime: new Date('2025-11-01'),
      approvedAt: new Date(),
      employerId: company1.id,
    },
  });
  console.log('✅ Job 1 created:', job1.title);

  const job2 = await prisma.job.create({
    data: {
      title: 'Garson',
      description: 'Deneyimli garson aranıyor. Hafta sonları çalışabilir olmalı. Müşteri memnuniyeti odaklı çalışma.',
      company: company2.name,
      location: 'Ankara, Türkiye',
      salary: 17000,
      hourlyRate: 60,
      duration: '6 ay',
      type: 'part-time',
      status: JobStatus.ACTIVE,
      urgency: JobUrgency.MEDIUM,
      isUrgent: false,
      category: 'Hizmet',
      requirements: ['İletişim becerileri', 'Müşteri odaklılık', 'Temizlik ve düzen'],
      startTime: new Date('2025-10-28'),
      approvedAt: new Date(),
      employerId: company2.id,
    },
  });
  console.log('✅ Job 2 created:', job2.title);

  const job3 = await prisma.job.create({
    data: {
      title: 'Depo Elemanı',
      description: 'Yapı market deposunda çalışacak, fiziksel olarak sağlıklı, forklift sertifikası olan eleman aranıyor.',
      company: company3.name,
      location: 'İzmir, Türkiye',
      salary: 18000,
      hourlyRate: 70,
      duration: '12 ay',
      type: 'full-time',
      status: JobStatus.ACTIVE,
      urgency: JobUrgency.HIGH,
      isUrgent: true,
      category: 'Lojistik',
      requirements: ['Forklift sertifikası', 'Fiziksel dayanıklılık', 'Takım çalışması'],
      startTime: new Date('2025-11-05'),
      approvedAt: new Date(),
      employerId: company3.id,
    },
  });
  console.log('✅ Job 3 created:', job3.title);

  const job4 = await prisma.job.create({
    data: {
      title: 'Müşteri Temsilcisi',
      description: 'E-ticaret müşteri hizmetleri departmanında çalışacak, telefon ve mail ile müşteri desteği verecek eleman.',
      company: company4.name,
      location: 'İstanbul, Türkiye (Uzaktan)',
      salary: 16000,
      hourlyRate: 55,
      duration: '6 ay',
      type: 'full-time',
      status: JobStatus.ACTIVE,
      urgency: JobUrgency.MEDIUM,
      isUrgent: false,
      category: 'Müşteri Hizmetleri',
      requirements: ['İyi iletişim', 'Bilgisayar kullanımı', 'Problem çözme'],
      startTime: new Date('2025-11-10'),
      approvedAt: new Date(),
      employerId: company4.id,
    },
  });
  console.log('✅ Job 4 created:', job4.title);

  const job5 = await prisma.job.create({
    data: {
      title: 'Grafik Tasarımcı',
      description: 'Sosyal medya içerikleri ve web tasarımı için deneyimli grafik tasarımcı arıyoruz.',
      company: company1.name,
      location: 'İstanbul, Türkiye (Hibrit)',
      salary: 20000,
      hourlyRate: 100,
      duration: '9 ay',
      type: 'contract',
      status: JobStatus.ACTIVE,
      urgency: JobUrgency.LOW,
      isUrgent: false,
      category: 'Tasarım',
      requirements: ['Adobe Creative Suite', 'UI/UX bilgisi', 'Portfolyo'],
      startTime: new Date('2025-12-01'),
      approvedAt: new Date(),
      employerId: company1.id,
    },
  });
  console.log('✅ Job 5 created:', job5.title);

  console.log('');
  console.log('📝 Creating Applications...');
  
  // Create Applications
  await prisma.application.create({
    data: {
      jobId: job1.id,
      userId: individual1.id,
      status: 'PENDING',
      coverLetter: 'React ve Node.js konusunda 3 yıllık deneyimim var. Daha önce e-ticaret ve fintech projelerinde çalıştım.',
    },
  });
  console.log('✅ Application 1 created (Mehmet -> Yazılım Geliştirici)');

  await prisma.application.create({
    data: {
      jobId: job2.id,
      userId: individual2.id,
      status: 'ASSIGNED',
      coverLetter: '2 yıl restoran deneyimim var. Müşteri memnuniyeti odaklı çalışmayı severim.',
    },
  });
  console.log('✅ Application 2 created (Ayşe -> Garson)');

  await prisma.application.create({
    data: {
      jobId: job3.id,
      userId: individual3.id,
      status: 'PENDING',
      coverLetter: 'Forklift sertifikam var ve 2 yıldır lojistik sektöründeyim.',
    },
  });
  console.log('✅ Application 3 created (Ali -> Depo Elemanı)');

  await prisma.application.create({
    data: {
      jobId: job4.id,
      userId: individual4.id,
      status: 'PENDING',
      coverLetter: 'Müşteri hizmetleri konusunda deneyimliyim. İyi bir iletişimciyim.',
    },
  });
  console.log('✅ Application 4 created (Fatma -> Müşteri Temsilcisi)');

  await prisma.application.create({
    data: {
      jobId: job5.id,
      userId: individual5.id,
      status: 'ASSIGNED',
      coverLetter: 'Grafik tasarım konusunda 4 yıllık deneyimim var. Portfolyomu gönderebilirim.',
    },
  });
  console.log('✅ Application 5 created (Can -> Grafik Tasarımcı)');

  console.log('');
  console.log('🍲 Creating Donations...');
  
  // Create Donations
  await prisma.donation.create({
    data: {
      title: 'Ev Yapımı Yemek',
      description: '10 kişilik ev yapımı mantı ve çorba. Bugün yapıldı, taze.',
      foodType: FoodType.COOKED_MEAL,
      quantity: '10 porsiyon',
      location: 'İstanbul, Kadıköy',
      address: 'Kadıköy Moda Cad. No:123',
      status: DonationStatus.AVAILABLE,
      expiryDate: new Date('2025-10-27'),
      donorId: company2.id,
    },
  });
  console.log('✅ Donation 1 created (Restoran Lezzet)');

  await prisma.donation.create({
    data: {
      title: 'Paket Gıda Yardımı',
      description: 'Konserve, makarna, pirinç, fasulye içeren gıda paketi',
      foodType: FoodType.PACKAGED_FOOD,
      quantity: '5 paket',
      location: 'Ankara, Çankaya',
      address: 'Çankaya Kızılay Meydanı',
      status: DonationStatus.AVAILABLE,
      expiryDate: new Date('2026-01-01'),
      donorId: company1.id,
    },
  });
  console.log('✅ Donation 2 created (Tech Solutions)');

  await prisma.donation.create({
    data: {
      title: 'Taze Ekmek ve Börekler',
      description: '20 adet taze ekmek ve çeşitli börekler',
      foodType: FoodType.BAKERY,
      quantity: '20 adet ekmek, 15 adet börek',
      location: 'İzmir, Karşıyaka',
      address: 'Karşıyaka Çarşı Meydanı',
      status: DonationStatus.AVAILABLE,
      expiryDate: new Date('2025-10-26'),
      donorId: company3.id,
    },
  });
  console.log('✅ Donation 3 created (Yapı Market)');

  await prisma.donation.create({
    data: {
      title: 'Süt Ürünleri Paketi',
      description: 'Süt, yoğurt, peynir içeren gıda paketi',
      foodType: FoodType.DAIRY,
      quantity: '10 paket',
      location: 'İstanbul, Beşiktaş',
      address: 'Beşiktaş Barbaros Bulvarı',
      status: DonationStatus.AVAILABLE,
      expiryDate: new Date('2025-11-05'),
      donorId: company4.id,
    },
  });
  console.log('✅ Donation 4 created (E-Ticaret Global)');

  await prisma.donation.create({
    data: {
      title: 'Sebze Meyve Paketi',
      description: 'Taze sebze ve meyveler (domates, salatalık, elma, portakal)',
      foodType: FoodType.FRESH_PRODUCE,
      quantity: '15 kg',
      location: 'Ankara, Kızılay',
      address: 'Kızılay Meydanı No:45',
      status: DonationStatus.RESERVED,
      expiryDate: new Date('2025-10-30'),
      donorId: company2.id,
      receiverId: individual1.id,
    },
  });
  console.log('✅ Donation 5 created (Restoran Lezzet -> Reserved by Mehmet)');

  console.log('');
  console.log('💬 Creating Messages...');
  
  // Create Messages
  await prisma.message.create({
    data: {
      senderId: company1.id,
      receiverId: individual1.id,
      content: 'Merhaba Mehmet Bey, başvurunuz değerlendiriliyor. Yakında dönüş yapacağız.',
    },
  });
  console.log('✅ Message 1 created (Tech Solutions -> Mehmet)');

  await prisma.message.create({
    data: {
      senderId: individual1.id,
      receiverId: company1.id,
      content: 'Teşekkür ederim, olumlu dönüşünüzü bekliyorum.',
    },
  });
  console.log('✅ Message 2 created (Mehmet -> Tech Solutions)');

  await prisma.message.create({
    data: {
      senderId: company2.id,
      receiverId: individual2.id,
      content: 'Ayşe Hanım, işe başlama tarihiniz 28 Ekim. Detaylar için aramızı bekleyin.',
    },
  });
  console.log('✅ Message 3 created (Restoran Lezzet -> Ayşe)');

  await prisma.message.create({
    data: {
      senderId: company1.id,
      receiverId: individual5.id,
      content: 'Can Bey, portfolyonuzu inceledik. Mülakat için sizinle görüşmek isteriz.',
    },
  });
  console.log('✅ Message 4 created (Tech Solutions -> Can)');

  console.log('');
  console.log('🔔 Creating Notifications...');
  
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

  await prisma.notification.create({
    data: {
      userId: individual3.id,
      type: 'JOB_APPLICATION',
      title: 'Başvurunuz Alındı',
      content: 'Depo Elemanı pozisyonuna başvurunuz değerlendirmeye alındı.',
      link: `/jobs/${job3.id}`,
    },
  });
  console.log('✅ Notification 3 created');

  await prisma.notification.create({
    data: {
      userId: individual1.id,
      type: 'DONATION_APPROVED',
      title: 'Bağış Talebiniz Onaylandı',
      content: 'Sebze Meyve Paketi talebiniz onaylandı. Teslimat bilgileri mesajlarınızda.',
      link: '/donations',
    },
  });
  console.log('✅ Notification 4 created');

  await prisma.notification.create({
    data: {
      userId: company1.id,
      type: 'MESSAGE',
      title: 'Yeni Mesajınız Var',
      content: 'Mehmet Yılmaz size mesaj gönderdi.',
      link: '/messages',
    },
  });
  console.log('✅ Notification 5 created');

  await prisma.notification.create({
    data: {
      userId: individual5.id,
      type: 'JOB_ASSIGNMENT',
      title: 'İşe Atandınız!',
      content: 'Grafik Tasarımcı pozisyonuna atandınız. Mülakat için bekleyin.',
      link: `/jobs/${job5.id}`,
    },
  });
  console.log('✅ Notification 6 created');

  console.log('');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🎉 Database seeding completed successfully!');
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('');
  console.log('📊 Summary:');
  console.log('   - 1 Admin user');
  console.log('   - 4 Corporate users (Employers/Donors)');
  console.log('   - 5 Individual users (Job Seekers/Donation Receivers)');
  console.log('   - 5 Jobs');
  console.log('   - 5 Applications');
  console.log('   - 5 Donations');
  console.log('   - 4 Messages');
  console.log('   - 6 Notifications');
  console.log('');
  console.log('🔐 Default Passwords:');
  console.log('   - Admin: admin123');
  console.log('   - Corporate users: company123');
  console.log('   - Individual users: user123');
  console.log('═══════════════════════════════════════════════════════════════');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

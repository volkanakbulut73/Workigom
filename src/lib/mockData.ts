export interface JobApplication {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  appliedAt: string;
  status: 'pending' | 'assigned' | 'completed' | 'rejected';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  hourlyRate: number;
  duration: string;
  urgency: 'high' | 'medium' | 'low';
  description: string;
  requirements: string[];
  postedAt: string;
  startTime: string;
  category: string;
  applicants?: number;
  status?: 'active' | 'pending' | 'rejected';
  isUrgent?: boolean;
  companyId?: string;
  approvedAt?: string;
  applications?: JobApplication[];
}

export interface UrgentJobRequest {
  id: string;
  jobData: Job;
  requestedAt: string;
  requestedBy: string;
  companyName: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'pending' | 'accepted' | 'rejected';
  appliedAt: string;
  earnings?: number;
}

export interface AssignedPersonnel {
  id: string;
  jobId: string;
  jobTitle: string;
  personnelId: string;
  personnelName: string;
  personnelPhone: string;
  personnelEmail: string;
  assignedAt: string;
  scheduledDate: string;
  status: 'assigned' | 'completed';
  dailyRate: number;
  companyId?: string;
}

export interface UrgentJobAcceptance {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyId: string;
  category: string;
  location: string;
  dailyRate: number;
  duration: string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  acceptedAt: string;
  status: 'pending' | 'assigned' | 'rejected';
  assignedBy?: string;
  assignedAt?: string;
}

export interface CompanyStats {
  companyId: string;
  totalPersonnelSent: number;
  totalEarnings: number;
  completedJobs: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'company' | 'admin';
  joinedAt: string;
  activeJobs?: number;
}

// Demo Kullanıcılar
export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string; // Şifre eklendi
  phone: string;
  role: 'individual' | 'corporate';
  avatar?: string;
  profileImage?: string; // Kullanıcı tarafından yüklenen profil resmi
}

export const demoIndividualUsers: DemoUser[] = [
  {
    id: 'IND001',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@email.com',
    password: 'ahmet123',
    phone: '+90 532 123 4567',
    role: 'individual'
  },
  {
    id: 'IND002',
    name: 'Ayşe Demir',
    email: 'ayse.demir@email.com',
    password: 'ayse123',
    phone: '+90 533 234 5678',
    role: 'individual'
  },
  {
    id: 'IND003',
    name: 'Mehmet Kaya',
    email: 'mehmet.kaya@email.com',
    password: 'mehmet123',
    phone: '+90 534 345 6789',
    role: 'individual'
  }
];

export const demoCorporateUsers: DemoUser[] = [
  {
    id: 'COMP001',
    name: 'Elite Temizlik A.Ş.',
    email: 'info@elitetemizlik.com',
    password: 'elite123',
    phone: '+90 212 555 0001',
    role: 'corporate'
  },
  {
    id: 'COMP002',
    name: 'Güvenlik Plus Ltd.',
    email: 'iletisim@guvenlikplus.com',
    password: 'guvenlik123',
    phone: '+90 212 555 0002',
    role: 'corporate'
  },
  {
    id: 'COMP003',
    name: 'TeknoServis A.Ş.',
    email: 'destek@teknoservis.com',
    password: 'tekno123',
    phone: '+90 212 555 0003',
    role: 'corporate'
  }
];

// Kullanıcı Doğrulama Fonksiyonu
export function authenticateUser(email: string, password: string, role: 'individual' | 'corporate'): DemoUser | null {
  const users = role === 'individual' ? demoIndividualUsers : demoCorporateUsers;
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  if (user) {
    // userProfiles'dan kalıcı kullanıcı verilerini yükle
    const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    const savedProfile = userProfiles[user.email] || {};
    
    return {
      ...user,
      profileImage: savedProfile.profileImage || user.profileImage || '',
      bio: savedProfile.bio || user.bio,
      skills: savedProfile.skills || user.skills,
      location: savedProfile.location || user.location,
      name: savedProfile.name || user.name,
      phone: savedProfile.phone || user.phone
    };
  }
  
  return user || null;
}

// Tüm kullanıcıları listele (şifre olmadan)
export function getAllUsers(role: 'individual' | 'corporate') {
  return role === 'individual' ? demoIndividualUsers : demoCorporateUsers;
}

// Demo Acil İş İlanları (Her şirketten)
export const demoUrgentJobs: Job[] = [
  {
    id: 'DEMO-JOB-001',
    title: 'Ofis Temizliği - Acil',
    company: 'Elite Temizlik A.Ş.',
    companyId: 'COMP001',
    location: 'Levent, İstanbul',
    hourlyRate: 125,
    duration: '6 saat',
    urgency: 'high',
    description: 'Bugün akşam 18:00\'de başlayacak ofis temizliği için deneyimli eleman aranıyor.',
    requirements: ['Ofis temizlik deneyimi', 'Kendi malzemeleri', 'Hemen başlayabilir'],
    postedAt: '15 dakika önce',
    startTime: 'Bugün, 18:00',
    category: 'Temizlik',
    applicants: 0,
    status: 'active',
    approvedAt: new Date().toISOString(),
    applications: []
  },
  {
    id: 'DEMO-JOB-002',
    title: 'Güvenlik Görevlisi - Gece Vardiyası',
    company: 'Güvenlik Plus Ltd.',
    companyId: 'COMP002',
    location: 'Maslak, İstanbul',
    hourlyRate: 150,
    duration: '12 saat',
    urgency: 'high',
    description: 'Bu gece 22:00\'de başlayacak gece vardiyası için güvenlik görevlisi aranıyor.',
    requirements: ['Güvenlik sertifikası', 'Gece çalışabilir', 'Temiz sabıka'],
    postedAt: '30 dakika önce',
    startTime: 'Bu gece, 22:00',
    category: 'Güvenlik',
    applicants: 0,
    status: 'active',
    approvedAt: new Date().toISOString(),
    applications: []
  },
  {
    id: 'DEMO-JOB-003',
    title: 'Bilgisayar Teknik Servisi',
    company: 'TeknoServis A.Ş.',
    companyId: 'COMP003',
    location: 'Şişli, İstanbul',
    hourlyRate: 200,
    duration: '4 saat',
    urgency: 'high',
    description: 'Acil bilgisayar arızası için teknik eleman aranıyor. Network ve donanım bilgisi gerekli.',
    requirements: ['Bilgisayar donanım bilgisi', 'Network kurulumu', 'Hemen müsait'],
    postedAt: '45 dakika önce',
    startTime: 'Bugün, 15:00',
    category: 'Teknik',
    applicants: 0,
    status: 'active',
    approvedAt: new Date().toISOString(),
    applications: []
  }
];

// Demo verileri localStorage'a yükle
export function initializeDemoData() {
  // Sadece ilk açılışta yükle
  if (!localStorage.getItem('demoDataInitialized')) {
    // Demo kullanıcıları yükle
    const allDemoUsers = [...demoIndividualUsers, ...demoCorporateUsers];
    localStorage.setItem('demoUsers', JSON.stringify(allDemoUsers));
    
    // Acil iş ilanlarını yükle
    const existingJobs = JSON.parse(localStorage.getItem('approvedUrgentJobs') || '[]');
    if (existingJobs.length === 0) {
      localStorage.setItem('approvedUrgentJobs', JSON.stringify(demoUrgentJobs));
    }
    
    // Company stats başlangıç değerleri
    const companyStats = {
      COMP001: { totalPersonnelSent: 0, totalEarnings: 0, completedJobs: 0 },
      COMP002: { totalPersonnelSent: 0, totalEarnings: 0, completedJobs: 0 },
      COMP003: { totalPersonnelSent: 0, totalEarnings: 0, completedJobs: 0 }
    };
    
    if (!localStorage.getItem('companyStats')) {
      localStorage.setItem('companyStats', JSON.stringify(companyStats.COMP001));
    }
    
    if (!localStorage.getItem('allCompanyStats')) {
      localStorage.setItem('allCompanyStats', JSON.stringify(companyStats));
    }
    
    // Flag oluştur
    localStorage.setItem('demoDataInitialized', 'true');
  }
}

// Detailed User Database Interfaces
export interface IndividualUser {
  id: string;
  role: 'employee';
  personalInfo: {
    firstName: string;
    lastName: string;
    displayName: string; // For privacy: "Ahmet Y."
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    profilePhoto?: string;
  };
  location: {
    city: string;
    district: string;
    address: string;
  };
  workInfo: {
    categories: string[]; // Temizlik, Teknik, Güvenlik, Diğer
    skills: string[];
    experience: string; // "1-3 yıl", "3-5 yıl", etc.
    availability: 'immediate' | 'flexible' | 'planned';
    preferredWorkHours: string[];
  };
  stats: {
    totalJobsCompleted: number;
    totalEarnings: number;
    averageRating: number;
    totalReviews: number;
    successRate: number;
    responseTime: string;
  };
  foodDonation: {
    donationsGiven: number;
    donationsReceived: number;
    goldenHeartBadges: number;
    totalDonatedAmount: number;
    totalReceivedAmount: number;
  };
  financials: {
    balance: number;
    totalWithdrawn: number;
    pendingPayments: number;
  };
  settings: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      showFullName: boolean;
      showPhone: boolean;
      showLocation: boolean;
    };
  };
  verification: {
    emailVerified: boolean;
    phoneVerified: boolean;
    identityVerified: boolean;
  };
  joinedAt: string;
  lastActive: string;
}

export interface CorporateUser {
  id: string;
  role: 'company';
  companyInfo: {
    companyName: string;
    legalName: string;
    taxNumber: string;
    tradeRegistryNumber: string;
    email: string;
    phone: string;
    website?: string;
    logo?: string;
  };
  contactPerson: {
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    phone: string;
  };
  location: {
    city: string;
    district: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  businessInfo: {
    industry: string;
    employeeCount: string; // "1-10", "11-50", etc.
    foundedYear: number;
    description: string;
  };
  stats: {
    totalJobsPosted: number;
    activeJobs: number;
    totalHires: number;
    averageRating: number;
    totalReviews: number;
    responseTime: string;
  };
  financials: {
    totalSpent: number;
    pendingPayments: number;
    subscriptionPlan: 'free' | 'basic' | 'premium' | 'enterprise';
    subscriptionExpiresAt?: string;
  };
  settings: {
    notifications: {
      email: boolean;
      sms: boolean;
      newApplications: boolean;
    };
    autoApprove: boolean;
  };
  verification: {
    emailVerified: boolean;
    phoneVerified: boolean;
    companyVerified: boolean;
    taxVerified: boolean;
  };
  joinedAt: string;
  lastActive: string;
}

export interface AdminUser {
  id: string;
  role: 'admin';
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  permissions: {
    manageUsers: boolean;
    manageJobs: boolean;
    managePayments: boolean;
    viewAnalytics: boolean;
    systemSettings: boolean;
  };
  joinedAt: string;
  lastActive: string;
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Ofis Temizliği',
    company: 'TemizPro Hizmetleri',
    location: 'İş Merkezi',
    hourlyRate: 160,
    duration: '3 saat',
    urgency: 'high',
    description: 'Hemen başlayabilecek ofis temizlik elemanı aranıyor. Kurumsal ofis binası, standart temizlik görevleri.',
    requirements: ['Temizlik deneyimi', 'Hemen başlayabilir', 'Kendi ulaşımı olan'],
    postedAt: '1 saat önce',
    startTime: 'Bugün, 18:00',
    category: 'Temizlik',
    applicants: 3
  },
  {
    id: '2',
    title: 'Elektrik Tesisatı Bakımı',
    company: 'TeknikServis A.Ş.',
    location: 'Sanayi Bölgesi',
    hourlyRate: 250,
    duration: '4 saat',
    urgency: 'high',
    description: 'Acil elektrik arızası için deneyimli elektrikçi aranıyor. Endüstriyel tesis deneyimi tercih edilir.',
    requirements: ['Elektrik sertifikası', 'Endüstriyel deneyim', 'Hemen başlayabilir'],
    postedAt: '30 dakika önce',
    startTime: 'Bugün, 14:00',
    category: 'Teknik',
    applicants: 2
  },
  {
    id: '3',
    title: 'Güvenlik Görevlisi - Gece Vardiyası',
    company: 'Elit Güvenlik',
    location: 'AVM Plaza',
    hourlyRate: 180,
    duration: '8 saat',
    urgency: 'high',
    description: 'Gece vardiyası için deneyimli güvenlik görevlisi aranıyor. Geçerli güvenlik sertifikası şart.',
    requirements: ['Güvenlik sertifikası', 'Gece vardiyasında çalışabilir', 'Temiz sabıka kaydı'],
    postedAt: '2 saat önce',
    startTime: 'Bu gece, 22:00',
    category: 'Güvenlik',
    applicants: 5
  },
  {
    id: '4',
    title: 'Klima Montajı',
    company: 'İklim Teknik',
    location: 'Merkez',
    hourlyRate: 300,
    duration: '3 saat',
    urgency: 'medium',
    description: 'Yarın klima montajı için destek eleman aranıyor. Teknik bilgi ve deneyim gerekli.',
    requirements: ['Klima montaj deneyimi', 'Yüksekten çalışabilir', 'Kendi aletleri'],
    postedAt: '4 saat önce',
    startTime: 'Yarın, 10:00',
    category: 'Teknik',
    applicants: 4
  },
  {
    id: '5',
    title: 'Etkinlik Organizasyonu Desteği',
    company: 'Event Pro',
    location: 'Kongre Merkezi',
    hourlyRate: 150,
    duration: '5 saat',
    urgency: 'medium',
    description: 'Hafta sonu etkinliği için genel organizasyon desteği. Kurulum ve söküm işlerinde destek.',
    requirements: ['Etkinlik deneyimi artı', 'Fiziksel olarak aktif', 'Takım çalışmasına yatkın'],
    postedAt: '6 saat önce',
    startTime: 'Cumartesi, 09:00',
    category: 'Diğer',
    applicants: 8
  },
  {
    id: '6',
    title: 'Peyzaj Bakım İşleri',
    company: 'Yeşil Bahçe Hizmetleri',
    location: 'Siteler Bölgesi',
    hourlyRate: 140,
    duration: '4 saat',
    urgency: 'low',
    description: 'Site bahçe bakım işleri için eleman aranıyor. Çim biçme, budama ve sulama.',
    requirements: ['Bahçe işlerinden anlar', 'Fiziksel olarak fit', 'Yarın müsait'],
    postedAt: '8 saat önce',
    startTime: 'Yarın, 08:00',
    category: 'Diğer',
    applicants: 6
  },
  {
    id: '7',
    title: 'Apartman Temizliği',
    company: 'Temiz Ev Hizmetleri',
    location: 'Konutlar Mahallesi',
    hourlyRate: 150,
    duration: '6 saat',
    urgency: 'medium',
    description: 'Apartman ortak alan temizliği için deneyimli eleman. Merdiven, koridor ve dış alanlar.',
    requirements: ['Temizlik deneyimi', 'Detay odaklı', 'Kendi malzemeleri'],
    postedAt: '3 saat önce',
    startTime: 'Bugün, 15:00',
    category: 'Temizlik',
    applicants: 7
  },
  {
    id: '8',
    title: 'Kamera Sistemi Kurulumu',
    company: 'Dijital Güvenlik Sistemleri',
    location: 'İş Merkezi',
    hourlyRate: 280,
    duration: '5 saat',
    urgency: 'high',
    description: 'Güvenlik kamera sistemi kurulumu için teknik eleman. IP kamera deneyimi şart.',
    requirements: ['Kamera sistem bilgisi', 'Kablo çekme deneyimi', 'Yarın müsait'],
    postedAt: '1 saat önce',
    startTime: 'Yarın, 09:00',
    category: 'Teknik',
    applicants: 3
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    jobTitle: 'Garson - Akşam Vardiyası',
    company: 'Gurme Mutfak',
    status: 'pending',
    appliedAt: '1 saat önce'
  },
  {
    id: '2',
    jobId: '2',
    jobTitle: 'Ofis Temizliği',
    company: 'TemizPro Hizmetleri',
    status: 'accepted',
    appliedAt: '2 gün önce',
    earnings: 480
  },
  {
    id: '3',
    jobId: '3',
    jobTitle: 'Kurye - Teslimat',
    company: 'HızlıKargo Lojistik',
    status: 'pending',
    appliedAt: '3 saat önce'
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@email.com',
    role: 'employee',
    joinedAt: '2024-01-15',
    activeJobs: 3
  },
  {
    id: '2',
    name: 'Ayşe Kaya',
    email: 'ayse.kaya@email.com',
    role: 'employee',
    joinedAt: '2024-02-20',
    activeJobs: 5
  },
  {
    id: '3',
    name: 'Gurme Mutfak',
    email: 'iletisim@gurmemutfak.com',
    role: 'company',
    joinedAt: '2024-01-05',
    activeJobs: 2
  },
  {
    id: '4',
    name: 'TemizPro Hizmetleri',
    email: 'info@temizpro.com',
    role: 'company',
    joinedAt: '2024-02-01',
    activeJobs: 4
  },
  {
    id: '5',
    name: 'Mehmet Demir',
    email: 'mehmet.demir@email.com',
    role: 'employee',
    joinedAt: '2024-03-10',
    activeJobs: 1
  }
];

// Food Donation Types and Mock Data
export interface FoodDonationRequest {
  id: string;
  userId: string;
  userName: string;
  userInitials: string;
  menuAmount: number;
  minSupportRate: number;
  userPayAmount: number;
  description: string;
  status: 'waiting' | 'donor_matched' | 'payment_pending' | 'qr_pending' | 'qr_uploaded' | 'payment_confirmed' | 'completed';
  postedAt: string;
  donorId?: string;
  donorName?: string;
  donorInitials?: string;
  supportRate?: number;
  isFullSupport?: boolean;
  qrImageUrl?: string;
  qrExpiresAt?: string;
  qrUploadedAt?: string;
  matchedAt?: string;
  completedAt?: string;
  thanked?: boolean;
}

export interface UserProfile {
  userId: string;
  userName: string;
  goldenHeartCount: number;
  totalDonationsGiven: number;
  totalDonationsReceived: number;
}

export const mockFoodDonationRequests: FoodDonationRequest[] = [
  {
    id: '1',
    userId: 'IND001',
    userName: 'Ahmet Y.',
    userInitials: 'AY',
    menuAmount: 1000,
    minSupportRate: 20,
    userPayAmount: 800,
    description: 'Yaklaşık 1000 TL tutarında yemek yiyeceğim',
    status: 'waiting',
    postedAt: '2 saat önce'
  },
  {
    id: '2',
    userId: 'IND002',
    userName: 'Zeynep K.',
    userInitials: 'ZK',
    menuAmount: 750,
    minSupportRate: 20,
    userPayAmount: 600,
    description: 'Ailece yemek için destek bekliyorum',
    status: 'waiting',
    postedAt: '5 saat önce'
  },
  {
    id: '3',
    userId: 'IND003',
    userName: 'Mehmet D.',
    userInitials: 'MD',
    menuAmount: 500,
    minSupportRate: 20,
    userPayAmount: 400,
    description: 'Öğle yemeği için destek',
    status: 'waiting',
    postedAt: '1 gün önce'
  },
  {
    id: '4',
    userId: 'IND004',
    userName: 'Ayşe T.',
    userInitials: 'AT',
    menuAmount: 1200,
    minSupportRate: 20,
    userPayAmount: 960,
    description: 'Özel gün yemeği için destek arıyorum',
    status: 'waiting',
    postedAt: '3 saat önce'
  }
];

// Detailed User Database
export const mockIndividualUsers: IndividualUser[] = [
  {
    id: 'IND001',
    role: 'employee',
    personalInfo: {
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      displayName: 'Ahmet Y.',
      email: 'ahmet.yilmaz@email.com',
      phone: '+90 532 123 4567',
      dateOfBirth: '1995-03-15',
      gender: 'male',
      profilePhoto: 'https://i.pravatar.cc/150?img=12'
    },
    location: {
      city: 'İstanbul',
      district: 'Kadıköy',
      address: 'Moda Mahallesi, Bahariye Caddesi No: 45'
    },
    workInfo: {
      categories: ['Temizlik', 'Diğer'],
      skills: ['Ofis Temizliği', 'Ev Temizliği', 'Organizasyon', 'Detaylı Çalışma'],
      experience: '3-5 yıl',
      availability: 'flexible',
      preferredWorkHours: ['09:00-17:00', '18:00-22:00']
    },
    stats: {
      totalJobsCompleted: 47,
      totalEarnings: 23500,
      averageRating: 4.8,
      totalReviews: 35,
      successRate: 96,
      responseTime: '2 saat'
    },
    foodDonation: {
      donationsGiven: 8,
      donationsReceived: 3,
      goldenHeartBadges: 2,
      totalDonatedAmount: 4500,
      totalReceivedAmount: 1800
    },
    financials: {
      balance: 3250,
      totalWithdrawn: 20250,
      pendingPayments: 480
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      privacy: {
        showFullName: false,
        showPhone: false,
        showLocation: true
      }
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true
    },
    joinedAt: '2024-01-15T10:30:00Z',
    lastActive: '2025-10-19T14:25:00Z'
  },
  {
    id: 'IND002',
    role: 'employee',
    personalInfo: {
      firstName: 'Ayşe',
      lastName: 'Kaya',
      displayName: 'Ayşe K.',
      email: 'ayse.kaya@email.com',
      phone: '+90 535 987 6543',
      dateOfBirth: '1992-07-22',
      gender: 'female',
      profilePhoto: 'https://i.pravatar.cc/150?img=5'
    },
    location: {
      city: 'İstanbul',
      district: 'Beşiktaş',
      address: 'Etiler Mahallesi, Nispetiye Caddesi No: 78'
    },
    workInfo: {
      categories: ['Güvenlik', 'Diğer'],
      skills: ['Güvenlik', 'Etkinlik Yönetimi', 'İletişim', 'Problem Çözme'],
      experience: '5+ yıl',
      availability: 'immediate',
      preferredWorkHours: ['22:00-06:00', 'Gece vardiyası']
    },
    stats: {
      totalJobsCompleted: 89,
      totalEarnings: 45200,
      averageRating: 4.9,
      totalReviews: 67,
      successRate: 98,
      responseTime: '1 saat'
    },
    foodDonation: {
      donationsGiven: 12,
      donationsReceived: 5,
      goldenHeartBadges: 5,
      totalDonatedAmount: 7800,
      totalReceivedAmount: 2400
    },
    financials: {
      balance: 5600,
      totalWithdrawn: 39600,
      pendingPayments: 1440
    },
    settings: {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        showFullName: false,
        showPhone: false,
        showLocation: true
      }
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true
    },
    joinedAt: '2024-02-20T09:15:00Z',
    lastActive: '2025-10-19T16:40:00Z'
  },
  {
    id: 'IND003',
    role: 'employee',
    personalInfo: {
      firstName: 'Mehmet',
      lastName: 'Demir',
      displayName: 'Mehmet D.',
      email: 'mehmet.demir@email.com',
      phone: '+90 543 456 7890',
      dateOfBirth: '1988-11-08',
      gender: 'male',
      profilePhoto: 'https://i.pravatar.cc/150?img=33'
    },
    location: {
      city: 'Ankara',
      district: 'Çankaya',
      address: 'Kızılay Mahallesi, Atatürk Bulvarı No: 123'
    },
    workInfo: {
      categories: ['Teknik'],
      skills: ['Elektrik', 'Klima Montajı', 'Teknik Servis', 'Arıza Giderme'],
      experience: '5+ yıl',
      availability: 'planned',
      preferredWorkHours: ['08:00-17:00']
    },
    stats: {
      totalJobsCompleted: 134,
      totalEarnings: 78900,
      averageRating: 5.0,
      totalReviews: 98,
      successRate: 99,
      responseTime: '30 dakika'
    },
    foodDonation: {
      donationsGiven: 15,
      donationsReceived: 2,
      goldenHeartBadges: 8,
      totalDonatedAmount: 12500,
      totalReceivedAmount: 1200
    },
    financials: {
      balance: 12400,
      totalWithdrawn: 66500,
      pendingPayments: 0
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      privacy: {
        showFullName: true,
        showPhone: true,
        showLocation: true
      }
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true
    },
    joinedAt: '2024-03-10T11:20:00Z',
    lastActive: '2025-10-19T13:15:00Z'
  },
  {
    id: 'IND004',
    role: 'employee',
    personalInfo: {
      firstName: 'Zeynep',
      lastName: 'Kara',
      displayName: 'Zeynep K.',
      email: 'zeynep.kara@email.com',
      phone: '+90 555 234 5678',
      dateOfBirth: '1997-05-30',
      gender: 'female',
      profilePhoto: 'https://i.pravatar.cc/150?img=9'
    },
    location: {
      city: 'İzmir',
      district: 'Karşıyaka',
      address: 'Bostanlı Mahallesi, Cemal Gürsel Caddesi No: 56'
    },
    workInfo: {
      categories: ['Temizlik', 'Diğer'],
      skills: ['Temizlik', 'Organizasyon', 'Hızlı Çalışma', 'Müşteri İlişkileri'],
      experience: '1-3 yıl',
      availability: 'flexible',
      preferredWorkHours: ['10:00-18:00', '14:00-22:00']
    },
    stats: {
      totalJobsCompleted: 28,
      totalEarnings: 14200,
      averageRating: 4.7,
      totalReviews: 21,
      successRate: 94,
      responseTime: '3 saat'
    },
    foodDonation: {
      donationsGiven: 3,
      donationsReceived: 7,
      goldenHeartBadges: 1,
      totalDonatedAmount: 1800,
      totalReceivedAmount: 4200
    },
    financials: {
      balance: 2100,
      totalWithdrawn: 12100,
      pendingPayments: 320
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        push: false
      },
      privacy: {
        showFullName: false,
        showPhone: false,
        showLocation: true
      }
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      identityVerified: false
    },
    joinedAt: '2024-06-12T15:45:00Z',
    lastActive: '2025-10-19T10:30:00Z'
  },
  {
    id: 'IND005',
    role: 'employee',
    personalInfo: {
      firstName: 'Can',
      lastName: 'Öztürk',
      displayName: 'Can Ö.',
      email: 'can.ozturk@email.com',
      phone: '+90 542 678 9012',
      dateOfBirth: '1990-09-18',
      gender: 'male',
      profilePhoto: 'https://i.pravatar.cc/150?img=14'
    },
    location: {
      city: 'Bursa',
      district: 'Osmangazi',
      address: 'Heykel Mahallesi, Atatürk Caddesi No: 89'
    },
    workInfo: {
      categories: ['Güvenlik', 'Teknik'],
      skills: ['Güvenlik Sistemleri', 'Kamera Kurulumu', 'Fiziksel Güvenlik', 'Teknik Destek'],
      experience: '3-5 yıl',
      availability: 'immediate',
      preferredWorkHours: ['00:00-24:00']
    },
    stats: {
      totalJobsCompleted: 62,
      totalEarnings: 34800,
      averageRating: 4.8,
      totalReviews: 48,
      successRate: 97,
      responseTime: '1.5 saat'
    },
    foodDonation: {
      donationsGiven: 6,
      donationsReceived: 4,
      goldenHeartBadges: 3,
      totalDonatedAmount: 3600,
      totalReceivedAmount: 2000
    },
    financials: {
      balance: 4200,
      totalWithdrawn: 30600,
      pendingPayments: 720
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        push: true
      },
      privacy: {
        showFullName: false,
        showPhone: true,
        showLocation: true
      }
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      identityVerified: true
    },
    joinedAt: '2024-04-05T13:00:00Z',
    lastActive: '2025-10-19T15:20:00Z'
  }
];

export const mockCorporateUsers: CorporateUser[] = [
  {
    id: 'CORP001',
    role: 'company',
    companyInfo: {
      companyName: 'TemizPro Hizmetleri',
      legalName: 'TemizPro Temizlik Hizmetleri A.Ş.',
      taxNumber: '1234567890',
      tradeRegistryNumber: 'TR-123456',
      email: 'info@temizpro.com',
      phone: '+90 212 555 1234',
      website: 'www.temizpro.com',
      logo: 'https://via.placeholder.com/200x200/0367A6/FFFFFF?text=TP'
    },
    contactPerson: {
      firstName: 'Murat',
      lastName: 'Aydın',
      position: 'İnsan Kaynakları Müdürü',
      email: 'murat.aydin@temizpro.com',
      phone: '+90 532 555 6789'
    },
    location: {
      city: 'İstanbul',
      district: 'Şişli',
      address: 'Mecidiyeköy Mahallesi, Büyükdere Caddesi No: 234',
      coordinates: {
        lat: 41.0629,
        lng: 28.9869
      }
    },
    businessInfo: {
      industry: 'Temizlik ve Bakım Hizmetleri',
      employeeCount: '51-100',
      foundedYear: 2018,
      description: 'Kurumsal temizlik hizmetlerinde 7 yıllık deneyim. Ofis, AVM ve hastane temizlik çözümleri sunuyoruz.'
    },
    stats: {
      totalJobsPosted: 156,
      activeJobs: 8,
      totalHires: 142,
      averageRating: 4.6,
      totalReviews: 89,
      responseTime: '4 saat'
    },
    financials: {
      totalSpent: 125400,
      pendingPayments: 3200,
      subscriptionPlan: 'premium',
      subscriptionExpiresAt: '2026-01-15T23:59:59Z'
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        newApplications: true
      },
      autoApprove: false
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      companyVerified: true,
      taxVerified: true
    },
    joinedAt: '2024-02-01T10:00:00Z',
    lastActive: '2025-10-19T16:30:00Z'
  },
  {
    id: 'CORP002',
    role: 'company',
    companyInfo: {
      companyName: 'TeknikServis A.Ş.',
      legalName: 'Teknik Servis ve Bakım Hizmetleri A.Ş.',
      taxNumber: '9876543210',
      tradeRegistryNumber: 'TR-654321',
      email: 'iletisim@teknikservis.com',
      phone: '+90 216 444 5678',
      website: 'www.teknikservis.com',
      logo: 'https://via.placeholder.com/200x200/012840/FFFFFF?text=TS'
    },
    contactPerson: {
      firstName: 'Serkan',
      lastName: 'Çelik',
      position: 'Operasyon Müdürü',
      email: 'serkan.celik@teknikservis.com',
      phone: '+90 535 444 3210'
    },
    location: {
      city: 'İstanbul',
      district: 'Ümraniye',
      address: 'Sanayi Mahallesi, Teknopark Caddesi No: 45',
      coordinates: {
        lat: 41.0196,
        lng: 29.1214
      }
    },
    businessInfo: {
      industry: 'Teknik Servis ve Bakım',
      employeeCount: '11-50',
      foundedYear: 2015,
      description: 'Elektrik, klima, ısıtma sistemleri ve endüstriyel bakım hizmetleri. 7/24 acil servis.'
    },
    stats: {
      totalJobsPosted: 234,
      activeJobs: 12,
      totalHires: 218,
      averageRating: 4.8,
      totalReviews: 156,
      responseTime: '2 saat'
    },
    financials: {
      totalSpent: 289600,
      pendingPayments: 8400,
      subscriptionPlan: 'enterprise',
      subscriptionExpiresAt: '2026-05-20T23:59:59Z'
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        newApplications: true
      },
      autoApprove: false
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      companyVerified: true,
      taxVerified: true
    },
    joinedAt: '2024-01-05T09:30:00Z',
    lastActive: '2025-10-19T14:45:00Z'
  },
  {
    id: 'CORP003',
    role: 'company',
    companyInfo: {
      companyName: 'Elit Güvenlik',
      legalName: 'Elit Güvenlik Hizmetleri Ltd. Şti.',
      taxNumber: '5555444333',
      tradeRegistryNumber: 'TR-789456',
      email: 'info@elitguvenlik.com',
      phone: '+90 212 777 8899',
      website: 'www.elitguvenlik.com',
      logo: 'https://via.placeholder.com/200x200/3F9BBF/FFFFFF?text=EG'
    },
    contactPerson: {
      firstName: 'Kemal',
      lastName: 'Yıldız',
      position: 'Genel Müdür',
      email: 'kemal.yildiz@elitguvenlik.com',
      phone: '+90 542 777 6655'
    },
    location: {
      city: 'İstanbul',
      district: 'Ataşehir',
      address: 'Yeni Sahra Mahallesi, Atatürk Caddesi No: 156',
      coordinates: {
        lat: 40.9884,
        lng: 29.1264
      }
    },
    businessInfo: {
      industry: 'Güvenlik Hizmetleri',
      employeeCount: '101-250',
      foundedYear: 2012,
      description: 'Özel güvenlik, etkinlik güvenliği ve kamera sistemleri kurulumu. ISO 9001 belgeli firma.'
    },
    stats: {
      totalJobsPosted: 412,
      activeJobs: 18,
      totalHires: 389,
      averageRating: 4.7,
      totalReviews: 267,
      responseTime: '3 saat'
    },
    financials: {
      totalSpent: 456700,
      pendingPayments: 12600,
      subscriptionPlan: 'enterprise',
      subscriptionExpiresAt: '2026-03-15T23:59:59Z'
    },
    settings: {
      notifications: {
        email: true,
        sms: false,
        newApplications: true
      },
      autoApprove: false
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      companyVerified: true,
      taxVerified: true
    },
    joinedAt: '2023-11-20T14:20:00Z',
    lastActive: '2025-10-19T17:00:00Z'
  },
  {
    id: 'CORP004',
    role: 'company',
    companyInfo: {
      companyName: 'Event Pro',
      legalName: 'Event Pro Organizasyon Ltd. Şti.',
      taxNumber: '7778889990',
      tradeRegistryNumber: 'TR-147258',
      email: 'contact@eventpro.com',
      phone: '+90 212 333 4455',
      website: 'www.eventpro.com',
      logo: 'https://via.placeholder.com/200x200/10B981/FFFFFF?text=EP'
    },
    contactPerson: {
      firstName: 'Elif',
      lastName: 'Arslan',
      position: 'Etkinlik Koordinatörü',
      email: 'elif.arslan@eventpro.com',
      phone: '+90 533 222 3344'
    },
    location: {
      city: 'İstanbul',
      district: 'Beyoğlu',
      address: 'Asmalımescit Mahallesi, İstiklal Caddesi No: 234',
      coordinates: {
        lat: 41.0333,
        lng: 28.9769
      }
    },
    businessInfo: {
      industry: 'Etkinlik ve Organizasyon',
      employeeCount: '11-50',
      foundedYear: 2019,
      description: 'Kurumsal etkinlikler, konserler, konferanslar ve özel günler için organizasyon hizmetleri.'
    },
    stats: {
      totalJobsPosted: 98,
      activeJobs: 5,
      totalHires: 87,
      averageRating: 4.5,
      totalReviews: 62,
      responseTime: '5 saat'
    },
    financials: {
      totalSpent: 67800,
      pendingPayments: 2100,
      subscriptionPlan: 'basic',
      subscriptionExpiresAt: '2025-12-01T23:59:59Z'
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        newApplications: false
      },
      autoApprove: false
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      companyVerified: true,
      taxVerified: false
    },
    joinedAt: '2024-05-15T11:45:00Z',
    lastActive: '2025-10-18T20:15:00Z'
  },
  {
    id: 'CORP005',
    role: 'company',
    companyInfo: {
      companyName: 'Hotel Plaza',
      legalName: 'Plaza Otel İşletmeleri A.Ş.',
      taxNumber: '2223334445',
      tradeRegistryNumber: 'TR-369258',
      email: 'hr@hotelplaza.com',
      phone: '+90 212 888 9999',
      website: 'www.hotelplaza.com',
      logo: 'https://via.placeholder.com/200x200/EF4444/FFFFFF?text=HP'
    },
    contactPerson: {
      firstName: 'Deniz',
      lastName: 'Kaya',
      position: 'İK Müdürü',
      email: 'deniz.kaya@hotelplaza.com',
      phone: '+90 544 888 7777'
    },
    location: {
      city: 'İstanbul',
      district: 'Taksim',
      address: 'Gümüşsuyu Mahallesi, Cumhuriyet Caddesi No: 45',
      coordinates: {
        lat: 41.0377,
        lng: 28.9869
      }
    },
    businessInfo: {
      industry: 'Otel ve Konaklama',
      employeeCount: '51-100',
      foundedYear: 2008,
      description: '5 yıldızlı butik otel. 120 oda kapasitesi, restoran, spa ve konferans salonları.'
    },
    stats: {
      totalJobsPosted: 187,
      activeJobs: 7,
      totalHires: 165,
      averageRating: 4.4,
      totalReviews: 124,
      responseTime: '6 saat'
    },
    financials: {
      totalSpent: 178900,
      pendingPayments: 5600,
      subscriptionPlan: 'premium',
      subscriptionExpiresAt: '2026-02-28T23:59:59Z'
    },
    settings: {
      notifications: {
        email: true,
        sms: false,
        newApplications: true
      },
      autoApprove: true
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      companyVerified: true,
      taxVerified: true
    },
    joinedAt: '2023-10-10T08:00:00Z',
    lastActive: '2025-10-19T12:30:00Z'
  },
  {
    id: 'CORP006',
    role: 'company',
    companyInfo: {
      companyName: 'Test Şirketi',
      legalName: 'Test Acil İş İlanları A.Ş.',
      taxNumber: '1122334455',
      tradeRegistryNumber: 'TR-TEST123',
      email: 'info@testsirket.com',
      phone: '+90 212 555 9999',
      website: 'www.testsirket.com',
      logo: 'https://via.placeholder.com/200x200/10B981/FFFFFF?text=TEST'
    },
    contactPerson: {
      firstName: 'Test',
      lastName: 'Yönetici',
      position: 'Genel Müdür',
      email: 'test@testsirket.com',
      phone: '+90 555 999 8888'
    },
    location: {
      city: 'İstanbul',
      district: 'Beşiktaş',
      address: 'Levent Mahallesi, Test Caddesi No: 1',
      coordinates: {
        lat: 41.0766,
        lng: 29.0093
      }
    },
    businessInfo: {
      industry: 'Çok Sektörlü Test Şirketi',
      employeeCount: '11-50',
      foundedYear: 2024,
      description: 'Acil iş ilanı sistemi test şirketi. Temizlik, teknik servis ve güvenlik hizmetleri.'
    },
    stats: {
      totalJobsPosted: 0,
      activeJobs: 0,
      totalHires: 0,
      averageRating: 5.0,
      totalReviews: 0,
      responseTime: '1 saat'
    },
    financials: {
      totalSpent: 0,
      pendingPayments: 0,
      subscriptionPlan: 'premium',
      subscriptionExpiresAt: '2026-12-31T23:59:59Z'
    },
    settings: {
      notifications: {
        email: true,
        sms: true,
        newApplications: true
      },
      autoApprove: false
    },
    verification: {
      emailVerified: true,
      phoneVerified: true,
      companyVerified: true,
      taxVerified: true
    },
    joinedAt: '2025-10-19T00:00:00Z',
    lastActive: '2025-10-19T17:00:00Z'
  }
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: 'ADMIN001',
    role: 'admin',
    personalInfo: {
      firstName: 'Volkan',
      lastName: 'Admin',
      email: 'admin@workigom.com',
      phone: '+90 555 000 0001'
    },
    permissions: {
      manageUsers: true,
      manageJobs: true,
      managePayments: true,
      viewAnalytics: true,
      systemSettings: true
    },
    joinedAt: '2023-01-01T00:00:00Z',
    lastActive: '2025-10-19T17:30:00Z'
  },
  {
    id: 'ADMIN002',
    role: 'admin',
    personalInfo: {
      firstName: 'Selin',
      lastName: 'Moderatör',
      email: 'moderator@workigom.com',
      phone: '+90 555 000 0002'
    },
    permissions: {
      manageUsers: true,
      manageJobs: true,
      managePayments: false,
      viewAnalytics: true,
      systemSettings: false
    },
    joinedAt: '2023-06-15T10:00:00Z',
    lastActive: '2025-10-19T16:15:00Z'
  }
];

// Urgent Job Requests for Admin Approval
export const mockUrgentJobRequests: UrgentJobRequest[] = [
  {
    id: 'URG001',
    jobData: {
      id: 'JOB_URG001',
      title: 'Acil Ofis Temizliği - Sabah Vardiyası',
      company: 'TemizPro Hizmetleri',
      companyId: 'CORP001',
      location: 'Maslak, İstanbul',
      hourlyRate: 180,
      duration: '4 saat',
      urgency: 'high',
      description: 'Büyük bir toplantı öncesi ofis temizliği gerekiyor. Profesyonel ekipman ve deneyim şart.',
      requirements: ['Ofis temizlik deneyimi', 'Hemen başlayabilir', 'Profesyonel ekipman'],
      postedAt: 'Şimdi',
      startTime: 'Bugün, 09:00',
      category: 'Temizlik',
      status: 'pending',
      isUrgent: true
    },
    requestedAt: '2025-10-19T08:30:00Z',
    requestedBy: 'CORP001',
    companyName: 'TemizPro Hizmetleri',
    status: 'pending'
  },
  {
    id: 'URG002',
    jobData: {
      id: 'JOB_URG002',
      title: 'Elektrik Arızası - Acil Müdahale',
      company: 'TeknikServis A.Ş.',
      companyId: 'CORP002',
      location: 'Ümraniye, İstanbul',
      hourlyRate: 300,
      duration: '3 saat',
      urgency: 'high',
      description: 'Fabrikada elektrik kesintisi var. Acil elektrikçi gerekiyor. Endüstriyel deneyim şart.',
      requirements: ['Elektrik sertifikası', 'Endüstriyel deneyim', 'Acil müdahale deneyimi'],
      postedAt: '10 dakika önce',
      startTime: 'Hemen',
      category: 'Teknik',
      status: 'pending',
      isUrgent: true
    },
    requestedAt: '2025-10-19T08:15:00Z',
    requestedBy: 'CORP002',
    companyName: 'TeknikServis A.Ş.',
    status: 'pending'
  },
  {
    id: 'URG003',
    jobData: {
      id: 'JOB_URG003',
      title: 'Güvenlik Görevlisi - Gece Vardiyası',
      company: 'Elit Güvenlik',
      companyId: 'CORP003',
      location: 'Ataşehir, İstanbul',
      hourlyRate: 200,
      duration: '8 saat',
      urgency: 'high',
      description: 'AVM güvenlik için acil eleman. Bu gece başlayacak. Güvenlik sertifikası zorunlu.',
      requirements: ['Güvenlik sertifikası', 'Gece vardiyası deneyimi', 'Bu gece müsait'],
      postedAt: '30 dakika önce',
      startTime: 'Bu gece, 22:00',
      category: 'Güvenlik',
      status: 'pending',
      isUrgent: true
    },
    requestedAt: '2025-10-19T07:45:00Z',
    requestedBy: 'CORP003',
    companyName: 'Elit Güvenlik',
    status: 'pending'
  }
];

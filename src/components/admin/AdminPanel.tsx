import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner@2.0.3";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  AlertTriangle,
  Bell,
  Building2,
  CreditCard,
  Receipt,
  Settings,
  HelpCircle,
  UserCheck,
  Clock,
  BriefcaseBusiness,
  CheckCircle,
  XCircle,
  Send,
  MapPin,
  DollarSign,
  Edit,
  Save,
  UserPlus,
  Phone,
  Mail,
  Check,
  ChevronsUpDown
} from "lucide-react";
import { mockUrgentJobRequests, UrgentJobRequest, JobApplication, AssignedPersonnel } from "../../lib/mockData";

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

type AdminPage = 'dashboard' | 'job-listings' | 'users' | 'urgent-requests' | 'urgent-job-acceptances' | 'notifications' | 'company-accounts' | 'pending-payments' | 'payment-notification' | 'settings';

// Company Dashboard Component
function CompanyDashboardView({ companyId, companyName }: { companyId: string, companyName: string }) {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [monthlyPersonnel, setMonthlyPersonnel] = useState<AssignedPersonnel[]>([]);
  const [totalPersonnel, setTotalPersonnel] = useState(0);

  useEffect(() => {
    // Varsayılan olarak bu ay
    const currentDate = new Date();
    const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(currentMonthKey);
  }, []);

  useEffect(() => {
    // Şirkete atanan tüm personelleri al
    const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const companyAssigned = assigned.filter((p: AssignedPersonnel) => p.companyId === companyId);
    setTotalPersonnel(companyAssigned.length);

    if (!selectedMonth) {
      setMonthlyPersonnel([]);
      return;
    }

    // Seçilen aya göre filtrele
    const filtered = companyAssigned.filter((p: AssignedPersonnel) => {
      const assignedDate = new Date(p.assignedAt);
      const assignedMonthKey = `${assignedDate.getFullYear()}-${String(assignedDate.getMonth() + 1).padStart(2, '0')}`;
      return assignedMonthKey === selectedMonth;
    });

    // En son atananlar en başta
    filtered.sort((a: AssignedPersonnel, b: AssignedPersonnel) => 
      new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
    );

    setMonthlyPersonnel(filtered);
  }, [companyId, selectedMonth]);

  // Ay listesi oluştur (son 12 ay)
  const getMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthName = date.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });
      options.push({ value: monthKey, label: monthName });
    }
    
    return options;
  };

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{companyName}</h2>
            <p className="text-blue-100">Şirket Detayları</p>
          </div>
        </div>
      </Card>

      {/* Month Selector and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border-0 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Ay Seçin</h3>
            <Badge className="bg-blue-100 text-blue-700 border-0">
              {monthlyPersonnel.length} Personel
            </Badge>
          </div>
          
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="Ay seçin" />
            </SelectTrigger>
            <SelectContent>
              {getMonthOptions().map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        <Card className="p-6 bg-emerald-50 border-0 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-emerald-600 mb-1">Toplam Personel</p>
              <p className="text-3xl font-semibold text-emerald-700">{totalPersonnel}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-xl">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-xs text-emerald-600">Tüm zamanlar</p>
        </Card>
      </div>

      {/* Assigned Personnel List */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atanan Personeller</h3>
        
        {monthlyPersonnel.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Bu ay için atanan personel yok</p>
          </div>
        ) : (
          <div className="space-y-3">
            {monthlyPersonnel.map((personnel) => (
              <Card key={personnel.id} className="p-4 border border-gray-200 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {personnel.personnelName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1">{personnel.personnelName}</h4>
                      <p className="text-sm text-gray-600 mb-2">{personnel.jobTitle}</p>
                      
                      <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{personnel.personnelPhone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          <span>{personnel.personnelEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>Başlangıç: {personnel.scheduledDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          <span>Atandı: {new Date(personnel.assignedAt).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Badge className={
                    personnel.status === 'completed' 
                      ? 'bg-green-100 text-green-700 border-0' 
                      : 'bg-blue-100 text-blue-700 border-0'
                  }>
                    {personnel.status === 'completed' ? 'Tamamlandı' : 'Atandı'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export function AdminPanel({ onNavigate }: AdminPanelProps) {
  const [activePage, setActivePage] = useState<AdminPage>('dashboard');
  const [urgentRequests, setUrgentRequests] = useState<UrgentJobRequest[]>([]);
  const [editingDescription, setEditingDescription] = useState<string | null>(null);
  const [editedDescriptionText, setEditedDescriptionText] = useState<string>('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('all');
  const [companyList, setCompanyList] = useState<{id: string, name: string}[]>([]);
  const [companySearchOpen, setCompanySearchOpen] = useState(false);

  // Load company list
  useEffect(() => {
    // Mock şirket verileri - gerçek uygulamada API'den gelecek
    const companies = [
      { id: 'COMP001', name: 'Elite Temizlik' },
      { id: 'COMP002', name: 'Güvenlik Plus' },
      { id: 'COMP003', name: 'TeknoServis A.Ş.' },
      { id: 'COMP004', name: 'ABC Temizlik Hizmetleri' },
      { id: 'COMP005', name: 'Altın Güvenlik Ltd.' },
      { id: 'COMP006', name: 'Bayrak Teknik Servis' },
      { id: 'COMP007', name: 'Best Hotel Group' },
      { id: 'COMP008', name: 'Çınar Bakım Hizmetleri' },
      { id: 'COMP009', name: 'Delta Güvenlik' },
      { id: 'COMP010', name: 'Ege Temizlik A.Ş.' },
      { id: 'COMP011', name: 'Flamingo Restaurant Chain' },
      { id: 'COMP012', name: 'Global Security Services' },
      { id: 'COMP013', name: 'Hotel Lux International' },
      { id: 'COMP014', name: 'İstanbul Teknik Bakım' },
      { id: 'COMP015', name: 'Jasmin Temizlik' },
      { id: 'COMP016', name: 'Koç Güvenlik Sistemleri' },
      { id: 'COMP017', name: 'Lale Otel Zinciri' },
      { id: 'COMP018', name: 'Metro Teknik Hizmetler' },
      { id: 'COMP019', name: 'Nova Cleaning Services' },
      { id: 'COMP020', name: 'Özgür Güvenlik A.Ş.' },
      { id: 'COMP021', name: 'Plaza Yönetim Hizmetleri' },
      { id: 'COMP022', name: 'Royal Hotel Management' },
      { id: 'COMP023', name: 'Safir Temizlik Ltd.' },
      { id: 'COMP024', name: 'Tekno Fix Servis' },
      { id: 'COMP025', name: 'Universal Security Group' }
    ];
    
    // localStorage'dan şirket listesini de alıp ekleyebiliriz
    const users = JSON.parse(localStorage.getItem('demoUsers') || '[]');
    const corporateUsers = users.filter((u: any) => u.role === 'corporate');
    corporateUsers.forEach((user: any) => {
      if (!companies.find(c => c.id === user.id)) {
        companies.push({ id: user.id, name: user.name });
      }
    });
    
    setCompanyList(companies);
  }, []);

  // Load urgent job requests from localStorage and mockData
  useEffect(() => {
    const localRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const allRequests = [...mockUrgentJobRequests, ...localRequests];
    const pendingRequests = allRequests.filter(req => req.status === 'pending');
    
    // En son gönderilen talep en başta görünsün (tarih bazlı sıralama)
    pendingRequests.sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
    
    setUrgentRequests(pendingRequests);
  }, [activePage]);

  const handleApproveRequest = (requestId: string) => {
    const request = urgentRequests.find(req => req.id === requestId);
    if (!request) return;

    // Talebi onayla ve approved jobs listesine ekle
    const approvedJobs = JSON.parse(localStorage.getItem('approvedUrgentJobs') || '[]');
    approvedJobs.push({
      ...request.jobData,
      status: 'active',
      approvedAt: new Date().toISOString()
    });
    localStorage.setItem('approvedUrgentJobs', JSON.stringify(approvedJobs));

    // Talep durumunu güncelle
    const updatedRequests = urgentRequests.filter(req => req.id !== requestId);
    setUrgentRequests(updatedRequests);

    // localStorage'daki talepleri güncelle
    const localRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const updatedLocalRequests = localRequests.map((req: UrgentJobRequest) => 
      req.id === requestId ? { ...req, status: 'approved', reviewedAt: new Date().toISOString() } : req
    );
    localStorage.setItem('urgentJobRequests', JSON.stringify(updatedLocalRequests));

    toast.success('✅ İş ilanı onaylandı!', {
      description: 'Talep tüm bireysel kullanıcılara bildirim olarak gönderildi.'
    });
  };

  const handleRejectRequest = (requestId: string) => {
    const request = urgentRequests.find(req => req.id === requestId);
    if (!request) return;

    // Talep durumunu güncelle
    const updatedRequests = urgentRequests.filter(req => req.id !== requestId);
    setUrgentRequests(updatedRequests);

    // localStorage'daki talepleri güncelle
    const localRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const updatedLocalRequests = localRequests.map((req: UrgentJobRequest) => 
      req.id === requestId ? { 
        ...req, 
        status: 'rejected', 
        reviewedAt: new Date().toISOString(),
        rejectionReason: 'Admin tarafından reddedildi'
      } : req
    );
    localStorage.setItem('urgentJobRequests', JSON.stringify(updatedLocalRequests));

    toast.error('❌ İş ilanı reddedildi', {
      description: `${request.companyName} şirketine bildirim gönderildi.`
    });
  };

  const handleEditDescription = (requestId: string, currentDescription: string) => {
    setEditingDescription(requestId);
    setEditedDescriptionText(currentDescription);
  };

  const handleSaveDescription = (requestId: string) => {
    // urgentRequests state'ini güncelle
    const updatedRequests = urgentRequests.map(req => 
      req.id === requestId 
        ? { ...req, jobData: { ...req.jobData, description: editedDescriptionText } }
        : req
    );
    setUrgentRequests(updatedRequests);

    // localStorage'daki talepleri güncelle
    const localRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const updatedLocalRequests = localRequests.map((req: UrgentJobRequest) => 
      req.id === requestId 
        ? { ...req, jobData: { ...req.jobData, description: editedDescriptionText } }
        : req
    );
    localStorage.setItem('urgentJobRequests', JSON.stringify(updatedLocalRequests));

    setEditingDescription(null);
    toast.success('✅ Açıklama güncellendi');
  };

  const handleCancelEdit = () => {
    setEditingDescription(null);
    setEditedDescriptionText('');
  };

  const handleAssignPersonnel = (requestId: string, application: JobApplication) => {
    const request = urgentRequests.find(req => req.id === requestId);
    if (!request) return;

    // AssignedPersonnel kaydı oluştur
    const assignedPersonnel: AssignedPersonnel = {
      id: Date.now().toString(),
      jobId: request.jobData.id,
      jobTitle: request.jobData.title,
      personnelId: application.userId,
      personnelName: application.userName,
      personnelPhone: application.userPhone,
      personnelEmail: application.userEmail,
      assignedAt: new Date().toISOString(),
      scheduledDate: request.jobData.startTime,
      status: 'assigned',
      dailyRate: Math.round(request.jobData.hourlyRate * 8),
      companyId: request.jobData.companyId || request.requestedBy
    };

    // Atanan personeli localStorage'a kaydet
    const assignedList = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    assignedList.push(assignedPersonnel);
    localStorage.setItem('assignedPersonnel', JSON.stringify(assignedList));

    // Şirket istatistiklerini güncelle
    const companyId = request.jobData.companyId || request.requestedBy;
    const allCompanyStats = JSON.parse(localStorage.getItem('allCompanyStats') || '{}');
    if (!allCompanyStats[companyId]) {
      allCompanyStats[companyId] = { totalPersonnelSent: 0, totalEarnings: 0, completedJobs: 0 };
    }
    allCompanyStats[companyId].totalPersonnelSent = (allCompanyStats[companyId].totalPersonnelSent || 0) + 1;
    localStorage.setItem('allCompanyStats', JSON.stringify(allCompanyStats));
    
    // Mevcut şirket için aktif stats'ı da güncelle
    localStorage.setItem('companyStats', JSON.stringify(allCompanyStats[companyId]));

    // Başvuru durumunu 'assigned' olarak güncelle
    const urgentJobRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const updatedRequests = urgentJobRequests.map((req: UrgentJobRequest) => {
      if (req.id === requestId && req.jobData.applications) {
        return {
          ...req,
          jobData: {
            ...req.jobData,
            applications: req.jobData.applications.map(app => 
              app.id === application.id ? { ...app, status: 'assigned' } : app
            )
          }
        };
      }
      return req;
    });
    localStorage.setItem('urgentJobRequests', JSON.stringify(updatedRequests));

    // State'i güncelle
    setUrgentRequests(updatedRequests.filter((req: UrgentJobRequest) => req.status === 'pending'));

    toast.success('👤 Personel atandı!', {
      description: `${application.userName} şirket hesabında görüntülenebilir.`
    });
  };

  const menuItems = [
    { 
      id: 'dashboard' as AdminPage, 
      label: 'Kontrol Paneli', 
      icon: LayoutDashboard,
      count: null
    },
    { 
      id: 'job-listings' as AdminPage, 
      label: 'İş İlanları', 
      icon: Briefcase,
      count: 15
    },
    { 
      id: 'users' as AdminPage, 
      label: 'Kullanıcılar', 
      icon: Users,
      count: 25
    },
    { 
      id: 'urgent-requests' as AdminPage, 
      label: 'Acil Talepler', 
      icon: AlertTriangle,
      count: urgentRequests.length
    },
    { 
      id: 'urgent-job-acceptances' as AdminPage, 
      label: 'Acil İş Kabulleri', 
      icon: UserCheck,
      count: null
    },
    { 
      id: 'notifications' as AdminPage, 
      label: 'Bildirimler', 
      icon: Bell,
      count: 3
    },
    { 
      id: 'company-accounts' as AdminPage, 
      label: 'Kurumsal Hesaplar', 
      icon: Building2,
      count: 8
    },
    { 
      id: 'pending-payments' as AdminPage, 
      label: 'Bekleyen Ödemeler', 
      icon: CreditCard,
      count: 2
    },
    { 
      id: 'payment-notification' as AdminPage, 
      label: 'Ödeme Bildirimi', 
      icon: Receipt,
      count: null
    },
    { 
      id: 'settings' as AdminPage, 
      label: 'Ayarlar', 
      icon: Settings,
      count: null
    }
  ];

  const stats = [
    {
      title: 'Toplam Kullanıcı',
      value: '25',
      icon: Users,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Bekleyen İşler',
      value: '3',
      icon: Clock,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Aktif İşler',
      value: '12',
      icon: BriefcaseBusiness,
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Acil Talepler',
      value: urgentRequests.length.toString(),
      icon: AlertTriangle,
      iconColor: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  const recentActivities = [
    {
      title: 'Temizlik Elemanı',
      status: 'aktif',
      statusColor: 'bg-blue-600'
    },
    {
      title: 'Kargo Dağıtım',
      status: 'bekliyor',
      statusColor: 'bg-orange-500'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 overflow-y-auto">
        <div className="p-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-green-50 text-green-900' 
                      : 'hover:bg-gray-50 text-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : ''}`} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  
                  {item.count !== null && (
                    <Badge 
                      className={`
                        text-xs px-2 py-0.5 border-0
                        ${isActive ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}
                      `}
                    >
                      {item.count}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {activePage === 'dashboard' && (
            <>
              {/* Page Title */}
              <h1 className="text-3xl font-semibold text-gray-900 mb-8">Kontrol Paneli</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index} className="p-6 bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                          <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
                        </div>
                        <div className={`${stat.bgColor} p-3 rounded-xl`}>
                          <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Activities */}
              <Card className="p-6 bg-white border-0 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Son Aktiviteler</h2>
                
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${activity.statusColor}`}></div>
                        <span className="text-gray-900">{activity.title}</span>
                      </div>
                      
                      <Badge 
                        className={`
                          text-xs px-3 py-1 font-medium
                          ${activity.status === 'aktif' 
                            ? 'bg-blue-600 text-white hover:bg-blue-700 border-0' 
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200 border-0'
                          }
                        `}
                      >
                        {activity.status === 'aktif' ? 'Aktif' : 'Bekliyor'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activePage === 'job-listings' && (
            <>
              <h1 className="text-3xl font-semibold text-gray-900 mb-8">İş İlanları</h1>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="space-y-4">
                  {[
                    { title: 'Temizlik Elemanı', company: 'ABC Ltd.', status: 'Aktif', applicants: 12 },
                    { title: 'Kargo Dağıtım', company: 'XYZ A.Ş.', status: 'Bekliyor', applicants: 8 },
                    { title: 'Güvenlik Görevlisi', company: 'Güvenlik Şirketi', status: 'Aktif', applicants: 15 },
                  ].map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">{job.applicants} başvuru</span>
                        <Badge className={job.status === 'Aktif' ? 'bg-green-100 text-green-700 border-0' : 'bg-orange-100 text-orange-700 border-0'}>
                          {job.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activePage === 'users' && (
            <>
              <h1 className="text-3xl font-semibold text-gray-900 mb-8">Kullanıcılar</h1>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="space-y-4">
                  {[
                    { name: 'Ahmet Yılmaz', email: 'ahmet@example.com', role: 'Bireysel', status: 'Aktif' },
                    { name: 'Ayşe Demir', email: 'ayse@example.com', role: 'Bireysel', status: 'Aktif' },
                    { name: 'ABC Ltd.', email: 'info@abc.com', role: 'Kurumsal', status: 'Aktif' },
                    { name: 'Mehmet Kaya', email: 'mehmet@example.com', role: 'Bireysel', status: 'Pasif' },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge className={user.status === 'Aktif' ? 'bg-green-100 text-green-700 border-0' : 'bg-gray-100 text-gray-700 border-0'}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activePage === 'urgent-requests' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-900">Acil Talepler</h1>
                <Badge className="bg-red-100 text-red-700 border-0 px-4 py-2 text-base">
                  {urgentRequests.length} Bekleyen Talep
                </Badge>
              </div>

              {urgentRequests.length === 0 ? (
                <Card className="p-12 bg-white border-0 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Bekleyen talep yok</h3>
                  <p className="text-gray-600">Tüm acil iş talepleri işlendi.</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {urgentRequests.map((request) => (
                    <Card key={request.id} className="p-0 bg-white border-2 border-red-200 shadow-lg overflow-hidden">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b border-red-200">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-red-600 text-white border-0">
                                🚨 ACİL
                              </Badge>
                              <Badge variant="outline" className="border-gray-300">
                                {request.jobData.category}
                              </Badge>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {request.jobData.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Building2 className="w-4 h-4" />
                                <span>{request.companyName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{request.jobData.postedAt}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Job Details Grid */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <MapPin className="w-4 h-4" />
                              <span>Konum</span>
                            </div>
                            <p className="font-semibold text-gray-900">{request.jobData.location}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <Clock className="w-4 h-4" />
                              <span>Çalışma Saati</span>
                            </div>
                            <p className="font-semibold text-gray-900">{request.jobData.duration}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <DollarSign className="w-4 h-4" />
                              <span>Günlük Ücret</span>
                            </div>
                            <p className="font-semibold text-gray-900">{Math.round(request.jobData.hourlyRate * 8)} ₺</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                              <Clock className="w-4 h-4" />
                              <span>Başlangıç</span>
                            </div>
                            <p className="font-semibold text-gray-900">{request.jobData.startTime}</p>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-6">
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">İş Açıklaması</h4>
                            {editingDescription !== request.id && (
                              <Button
                                onClick={() => handleEditDescription(request.id, request.jobData.description)}
                                variant="outline"
                                size="sm"
                                className="border-blue-300 text-blue-700 hover:bg-blue-50"
                              >
                                <Edit className="w-4 h-4 mr-1" />
                                Düzenle
                              </Button>
                            )}
                          </div>
                          
                          {editingDescription === request.id ? (
                            <div className="space-y-3">
                              <Textarea
                                value={editedDescriptionText}
                                onChange={(e) => setEditedDescriptionText(e.target.value)}
                                rows={6}
                                className="w-full border-blue-300 focus:border-blue-500 focus:ring-blue-500"
                              />
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleSaveDescription(request.id)}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Save className="w-4 h-4 mr-1" />
                                  Kaydet
                                </Button>
                                <Button
                                  onClick={handleCancelEdit}
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300"
                                >
                                  İptal
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-700 leading-relaxed">{request.jobData.description}</p>
                          )}
                        </div>

                        {request.jobData.requirements && request.jobData.requirements.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-semibold text-gray-900 mb-2">Gereksinimler</h4>
                            <div className="flex flex-wrap gap-2">
                              {request.jobData.requirements.map((req, idx) => (
                                <Badge key={idx} variant="outline" className="border-gray-300">
                                  {req}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <p className="text-sm text-blue-900">
                            <strong>Talep Zamanı:</strong> {new Date(request.requestedAt).toLocaleString('tr-TR')}
                          </p>
                        </div>

                        {/* Başvuranlar Listesi */}
                        {request.jobData.applications && request.jobData.applications.length > 0 && (
                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-4">
                              <UserCheck className="w-5 h-5 text-blue-600" />
                              <h4 className="font-semibold text-gray-900">
                                Başvuranlar ({request.jobData.applications.length})
                              </h4>
                            </div>
                            
                            <div className="space-y-3">
                              {request.jobData.applications.map((application) => (
                                <Card key={application.id} className="p-4 bg-gradient-to-r from-blue-50 to-white border-blue-200">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-2">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                                          {application.userName.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                          <p className="font-semibold text-gray-900">{application.userName}</p>
                                          <Badge className={
                                            application.status === 'assigned' 
                                              ? 'bg-green-100 text-green-700 border-0' 
                                              : 'bg-blue-100 text-blue-700 border-0'
                                          }>
                                            {application.status === 'assigned' ? 'Atandı' : 'Bekliyor'}
                                          </Badge>
                                        </div>
                                      </div>
                                      
                                      <div className="ml-12 space-y-1 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                          <Phone className="w-3 h-3" />
                                          <span>{application.userPhone}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Mail className="w-3 h-3" />
                                          <span>{application.userEmail}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Clock className="w-3 h-3" />
                                          <span>Başvuru: {new Date(application.appliedAt).toLocaleString('tr-TR')}</span>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    {application.status !== 'assigned' && (
                                      <Button
                                        onClick={() => handleAssignPersonnel(request.id, application)}
                                        size="sm"
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                                      >
                                        <UserPlus className="w-4 h-4 mr-1" />
                                        Personel Ata
                                      </Button>
                                    )}
                                  </div>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleApproveRequest(request.id)}
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md h-12"
                          >
                            <Send className="w-5 h-5 mr-2" />
                            Bildirim Olarak Gönder
                          </Button>
                          <Button
                            onClick={() => handleRejectRequest(request.id)}
                            variant="outline"
                            className="flex-1 border-2 border-red-300 text-red-700 hover:bg-red-50 h-12"
                          >
                            <XCircle className="w-5 h-5 mr-2" />
                            Reddet
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {activePage === 'notifications' && (
            <>
              <h1 className="text-3xl font-semibold text-gray-900 mb-8">Bildirimler</h1>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="space-y-4">
                  {[
                    { message: 'Yeni kullanıcı kaydı: Zeynep Şahin', time: '5 dakika önce', read: false },
                    { message: 'Yeni iş ilanı yayınlandı: Kargo Dağıtım', time: '1 saat önce', read: false },
                    { message: 'Ödeme alındı: ABC Ltd. - 500 TL', time: '3 saat önce', read: true },
                  ].map((notification, index) => (
                    <div key={index} className={`p-4 border rounded-xl ${notification.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'}`}>
                      <p className="text-gray-900">{notification.message}</p>
                      <p className="text-sm text-gray-600 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activePage === 'company-accounts' && (
            <>
              {/* Page Title and Company Selector */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-900">Kurumsal Hesaplar</h1>
                
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-gray-600" />
                  <Popover open={companySearchOpen} onOpenChange={setCompanySearchOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={companySearchOpen}
                        className="w-64 justify-between bg-white hover:bg-gray-50"
                      >
                        <span className="truncate">
                          {selectedCompanyId === 'all' 
                            ? 'Tüm Şirketler' 
                            : companyList.find(c => c.id === selectedCompanyId)?.name || 'Şirket seçin'
                          }
                        </span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-0">
                      <Command>
                        <CommandInput placeholder="Şirket ara..." />
                        <CommandList>
                          <CommandEmpty>Şirket bulunamadı.</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value="all"
                              onSelect={() => {
                                setSelectedCompanyId('all');
                                setCompanySearchOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedCompanyId === 'all' ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                              Tüm Şirketler
                            </CommandItem>
                            {companyList.map((company) => (
                              <CommandItem
                                key={company.id}
                                value={company.name}
                                onSelect={() => {
                                  setSelectedCompanyId(company.id);
                                  setCompanySearchOpen(false);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${
                                    selectedCompanyId === company.id ? 'opacity-100' : 'opacity-0'
                                  }`}
                                />
                                {company.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Company Specific View */}
              {selectedCompanyId !== 'all' && (
                <CompanyDashboardView 
                  companyId={selectedCompanyId} 
                  companyName={companyList.find(c => c.id === selectedCompanyId)?.name || ''}
                />
              )}

              {/* All Companies List - Only show when "all" is selected */}
              {selectedCompanyId === 'all' && (
                <Card className="p-6 bg-white border-0 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Tüm Kurumsal Hesaplar</h2>
                  <div className="space-y-4">
                    {companyList.map((company, index) => {
                      // Her şirket için istatistikleri al
                      const allCompanyStats = JSON.parse(localStorage.getItem('allCompanyStats') || '{}');
                      const stats = allCompanyStats[company.id] || { totalPersonnelSent: 0, totalEarnings: 0, completedJobs: 0 };
                      
                      return (
                        <div 
                          key={company.id} 
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedCompanyId(company.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                              {company.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{company.name}</h3>
                              <p className="text-sm text-gray-600">{stats.totalPersonnelSent} personel • {stats.completedJobs} tamamlanan iş</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border-0">Aktif</Badge>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}
            </>
          )}

          {activePage === 'pending-payments' && (
            <>
              <h1 className="text-3xl font-semibold text-gray-900 mb-8">Bekleyen Ödemeler</h1>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="space-y-4">
                  {[
                    { company: 'ABC Ltd.', amount: '1,500 TL', date: '25 Ekim 2025', invoice: '#INV-001' },
                    { company: 'Hotel Plaza', amount: '3,200 TL', date: '23 Ekim 2025', invoice: '#INV-002' },
                  ].map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-orange-200 bg-orange-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900">{payment.company}</h3>
                        <p className="text-sm text-gray-600">{payment.invoice} • {payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{payment.amount}</p>
                        <Badge className="bg-orange-600 text-white border-0 mt-1">Bekliyor</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {activePage === 'payment-notification' && (
            <>
              <h1 className="text-3xl font-semibold text-gray-900 mb-8">Ödeme Bildirimi</h1>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Şirket Seç</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>ABC Ltd.</option>
                    <option>XYZ A.Ş.</option>
                    <option>Hotel Plaza</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tutar (TL)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    rows={4}
                    placeholder="Ödeme detayları..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors">
                  Bildirim Gönder
                </button>
              </Card>
            </>
          )}

          {activePage === 'urgent-job-acceptances' && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-semibold text-gray-900">Acil İş Kabulleri</h1>
              </div>

              {(() => {
                const acceptances = JSON.parse(localStorage.getItem('urgentJobAcceptances') || '[]');
                
                // İşlere göre grupla
                const jobGroups = acceptances.reduce((acc: any, acceptance: any) => {
                  if (!acc[acceptance.jobId]) {
                    acc[acceptance.jobId] = {
                      jobId: acceptance.jobId,
                      jobTitle: acceptance.jobTitle,
                      company: acceptance.company,
                      companyId: acceptance.companyId,
                      category: acceptance.category,
                      location: acceptance.location,
                      dailyRate: acceptance.dailyRate,
                      duration: acceptance.duration,
                      acceptances: []
                    };
                  }
                  acc[acceptance.jobId].acceptances.push(acceptance);
                  return acc;
                }, {});

                const jobGroupsArray = Object.values(jobGroups);

                if (jobGroupsArray.length === 0) {
                  return (
                    <Card className="p-12 bg-white border-0 shadow-sm text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserCheck className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Henüz kabul yok</h3>
                      <p className="text-gray-600">Personeller acil işleri kabul ettiğinde burada görünecek.</p>
                    </Card>
                  );
                }

                return (
                  <div className="space-y-6">
                    {jobGroupsArray.map((group: any) => (
                      <Card key={group.jobId} className="p-0 bg-white border-0 shadow-lg overflow-hidden">
                        {/* Job Header */}
                        <div className="bg-gradient-to-r from-[#012840] to-[#0367A6] text-white p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-white/20 text-white border-0">
                                  {group.category}
                                </Badge>
                                <Badge className="bg-amber-500 text-white border-0">
                                  {group.acceptances.filter((a: any) => a.status === 'pending').length} Bekleyen
                                </Badge>
                              </div>
                              <h3 className="text-xl font-semibold mb-2">
                                {group.jobTitle}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-white/80">
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  <span>{group.company}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{group.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4" />
                                  <span>{group.dailyRate} ₺/gün</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{group.duration}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Personnel List */}
                        <div className="p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">
                            Kabul Eden Personeller ({group.acceptances.length})
                          </h4>
                          
                          <div className="space-y-3">
                            {group.acceptances.map((acceptance: any) => (
                              <div 
                                key={acceptance.id}
                                className={`p-4 border-2 rounded-xl transition-all ${
                                  acceptance.status === 'assigned' 
                                    ? 'border-green-200 bg-green-50' 
                                    : acceptance.status === 'rejected'
                                    ? 'border-gray-200 bg-gray-50'
                                    : 'border-blue-200 bg-blue-50 hover:shadow-md'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                      <div className="w-10 h-10 bg-gradient-to-br from-[#0367A6] to-[#3F9BBF] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-semibold">
                                          {acceptance.userName.split(' ').map((n: string) => n[0]).join('')}
                                        </span>
                                      </div>
                                      <div className="flex-1">
                                        <h5 className="font-semibold text-gray-900">{acceptance.userName}</h5>
                                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                          <div className="flex items-center gap-1">
                                            <Phone className="w-3 h-3" />
                                            <span>{acceptance.userPhone}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            <span>{acceptance.userEmail}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                                      <Clock className="w-3 h-3" />
                                      <span>Kabul edildi: {new Date(acceptance.acceptedAt).toLocaleDateString('tr-TR', { 
                                        day: 'numeric', 
                                        month: 'long', 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                      })}</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2 ml-4">
                                    {acceptance.status === 'pending' && (
                                      <Button
                                        onClick={() => {
                                          // Personeli ata
                                          const assignedPersonnel: AssignedPersonnel = {
                                            id: Date.now().toString(),
                                            jobId: group.jobId,
                                            jobTitle: group.jobTitle,
                                            personnelId: acceptance.userId,
                                            personnelName: acceptance.userName,
                                            personnelPhone: acceptance.userPhone,
                                            personnelEmail: acceptance.userEmail,
                                            assignedAt: new Date().toISOString(),
                                            scheduledDate: new Date().toISOString(),
                                            status: 'assigned',
                                            dailyRate: group.dailyRate,
                                            companyId: group.companyId
                                          };

                                          // Atanan personeli kaydet
                                          const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
                                          assigned.unshift(assignedPersonnel);
                                          localStorage.setItem('assignedPersonnel', JSON.stringify(assigned));

                                          // Company stats güncelle
                                          const companyStats = JSON.parse(localStorage.getItem('companyStats') || '{}');
                                          companyStats.totalPersonnelSent = (companyStats.totalPersonnelSent || 0) + 1;
                                          localStorage.setItem('companyStats', JSON.stringify(companyStats));

                                          // Acceptance durumunu güncelle
                                          const acceptances = JSON.parse(localStorage.getItem('urgentJobAcceptances') || '[]');
                                          const updated = acceptances.map((a: any) => 
                                            a.id === acceptance.id 
                                              ? { ...a, status: 'assigned', assignedAt: new Date().toISOString(), assignedBy: 'Admin' }
                                              : a
                                          );
                                          localStorage.setItem('urgentJobAcceptances', JSON.stringify(updated));

                                          toast.success('Personel atandı!', {
                                            description: `${acceptance.userName} ${group.company} şirketine atandı`
                                          });

                                          // Sayfayı yenile
                                          setActivePage('dashboard');
                                          setTimeout(() => setActivePage('urgent-job-acceptances'), 0);
                                        }}
                                        className="bg-gradient-to-r from-[#0367A6] to-[#3F9BBF] hover:from-[#012840] hover:to-[#0367A6] text-white border-0"
                                        size="sm"
                                      >
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Personeli Ata
                                      </Button>
                                    )}
                                    
                                    {acceptance.status === 'assigned' && (
                                      <Badge className="bg-green-600 text-white border-0">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Atandı
                                      </Badge>
                                    )}

                                    {acceptance.status === 'rejected' && (
                                      <Badge className="bg-gray-400 text-white border-0">
                                        <XCircle className="w-3 h-3 mr-1" />
                                        Reddedildi
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                );
              })()}
            </>
          )}

          {activePage === 'settings' && (
            <>
              <h1 className="text-3xl font-semibold text-gray-900 mb-8">Ayarlar</h1>
              <Card className="p-6 bg-white border-0 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Genel Ayarlar</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                        <span className="text-gray-700">E-posta Bildirimleri</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                        <span className="text-gray-700">SMS Bildirimleri</span>
                        <input type="checkbox" className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                        <span className="text-gray-700">Push Bildirimleri</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Platform Ayarları</h3>
                    <div className="space-y-3">
                      <div className="p-3 border border-gray-200 rounded-xl">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Komisyon Oranı (%)</label>
                        <input
                          type="number"
                          defaultValue="10"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="p-3 border border-gray-200 rounded-xl">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Minimum İlan Ücreti (TL)</label>
                        <input
                          type="number"
                          defaultValue="50"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>
      </main>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110">
        <HelpCircle className="w-6 h-6" />
      </button>
    </div>
  );
}

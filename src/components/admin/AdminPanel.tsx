import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "../ui/sheet";
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
  ChevronsUpDown,
  Menu
} from "lucide-react";
import { mockUrgentJobRequests, UrgentJobRequest, JobApplication, AssignedPersonnel, demoIndividualUsers, demoCorporateUsers } from "../../lib/mockData";
import { SendNotificationForm } from "./SendNotificationForm";
import { JobListingsManagement } from "./JobListingsManagement";

interface AdminPanelProps {
  onNavigate: (page: string) => void;
}

type AdminPage = 'dashboard' | 'job-listings' | 'job-listings-management' | 'urgent-requests' | 'urgent-job-acceptances' | 'notifications' | 'company-accounts' | 'individual-accounts' | 'pending-payments' | 'settings';

// Individual Dashboard Component
function IndividualDashboardView({ userId, userName }: { userId: string, userName: string }) {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [monthlyJobs, setMonthlyJobs] = useState<AssignedPersonnel[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [paymentDescription, setPaymentDescription] = useState<string>('');
  const [accountData, setAccountData] = useState<any>(null);

  useEffect(() => {
    // Varsayılan olarak bu ay
    const currentDate = new Date();
    const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(currentMonthKey);
    loadAccountData();
  }, [userId]);

  useEffect(() => {
    // Kullanıcıya atanan tüm işleri al
    const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const userAssigned = assigned.filter((p: AssignedPersonnel) => p.personnelId === userId);
    setTotalJobs(userAssigned.length);

    if (!selectedMonth) {
      setMonthlyJobs([]);
      return;
    }

    // Seçilen aya göre filtrele
    const filtered = userAssigned.filter((p: AssignedPersonnel) => {
      const assignedDate = new Date(p.assignedAt);
      const assignedMonthKey = `${assignedDate.getFullYear()}-${String(assignedDate.getMonth() + 1).padStart(2, '0')}`;
      return assignedMonthKey === selectedMonth;
    });

    // En son atananlar en başta
    filtered.sort((a: AssignedPersonnel, b: AssignedPersonnel) => 
      new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
    );

    setMonthlyJobs(filtered);
  }, [userId, selectedMonth]);

  const loadAccountData = () => {
    const individualAccounts = JSON.parse(localStorage.getItem('individualAccounts') || '{}');
    if (!individualAccounts[userId]) {
      individualAccounts[userId] = {
        totalEarnings: 0,
        paymentHistory: []
      };
    }
    setAccountData(individualAccounts[userId]);
  };

  const handleAddPayment = () => {
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0) {
      toast.error('❌ Geçerli bir tutar girin');
      return;
    }

    const individualAccounts = JSON.parse(localStorage.getItem('individualAccounts') || '{}');
    if (!individualAccounts[userId]) {
      individualAccounts[userId] = {
        totalEarnings: 0,
        paymentHistory: []
      };
    }

    const newPayment = {
      id: Date.now().toString(),
      amount: amount,
      date: new Date().toISOString(),
      description: paymentDescription || 'Ödeme',
      type: 'earning'
    };

    individualAccounts[userId].totalEarnings += amount;
    individualAccounts[userId].paymentHistory.unshift(newPayment);

    localStorage.setItem('individualAccounts', JSON.stringify(individualAccounts));

    // Kullanıcıya bildirim gönder
    const notification = {
      id: Date.now().toString(),
      type: 'payment_notification',
      icon: 'DollarSign',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      title: 'Ödeme Alındı',
      message: `${amount.toLocaleString('tr-TR')} ₺ ödeme hesabınıza yatırıldı. ${paymentDescription ? `Açıklama: ${paymentDescription}` : ''} Toplam kazancınız: ${individualAccounts[userId].totalEarnings.toLocaleString('tr-TR')} ₺`,
      time: 'Şimdi',
      createdAt: new Date().toISOString(),
      isNew: true,
      badge: 'Ödeme',
      badgeColor: 'bg-green-600',
      sentBy: 'Admin',
      targetType: 'SINGLE_INDIVIDUAL',
      userId: userId,
      userRole: 'individual'
    };

    const allNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    allNotifications.push(notification);
    localStorage.setItem('adminNotifications', JSON.stringify(allNotifications));

    toast.success('✅ Ödeme kaydedildi!', {
      description: `${amount.toLocaleString('tr-TR')} ₺ kazanç eklendi ve kullanıcıya bildirim gönderildi`
    });

    setPaymentAmount('');
    setPaymentDescription('');
    loadAccountData();
  };

  // Toplam kazançları hesapla
  const calculateTotalEarnings = () => {
    const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const userAssigned = assigned.filter((p: AssignedPersonnel) => p.personnelId === userId && p.status === 'completed');
    const jobEarnings = userAssigned.reduce((total: number, p: AssignedPersonnel) => total + p.dailyRate, 0);
    
    // Admin tarafından eklenen ödemeleri de dahil et
    const individualAccounts = JSON.parse(localStorage.getItem('individualAccounts') || '{}');
    const adminPayments = individualAccounts[userId]?.totalEarnings || 0;
    
    return jobEarnings + adminPayments;
  };

  const calculateMonthlyEarnings = () => {
    return monthlyJobs
      .filter(p => p.status === 'completed')
      .reduce((total, p) => total + p.dailyRate, 0);
  };

  const totalEarnings = calculateTotalEarnings();
  const monthlyEarnings = calculateMonthlyEarnings();
  const completedCount = monthlyJobs.filter(p => p.status === 'completed').length;

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
      {/* User Header */}
      <Card className="p-4 lg:p-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{userName}</h2>
            <p className="text-purple-100">Bireysel Kullanıcı Detayları</p>
          </div>
        </div>
      </Card>

      {/* Kazanç Özeti */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6 bg-purple-50 border-0 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-purple-600 mb-1">Toplam İş</p>
              <p className="text-3xl font-semibold text-purple-700">{totalJobs}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-purple-600">Tüm zamanlar</p>
        </Card>

        <Card className="p-6 bg-green-50 border-0 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-green-600 mb-1">Toplam Kazanç</p>
              <p className="text-3xl font-semibold text-green-700">₺{totalEarnings.toLocaleString('tr-TR')}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600">İşler + Admin Ödemeleri</p>
        </Card>
      </div>

      {/* Ödeme Kayıt Formu */}
      <Card className="p-4 lg:p-6 bg-white border-0 shadow-sm">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Ödeme Kaydı Ekle</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="individualPaymentAmount">Ödeme Tutarı (₺)</Label>
            <Input
              id="individualPaymentAmount"
              type="number"
              placeholder="0.00"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="individualPaymentDescription">Açıklama (Opsiyonel)</Label>
            <Input
              id="individualPaymentDescription"
              type="text"
              placeholder="Ödeme açıklaması"
              value={paymentDescription}
              onChange={(e) => setPaymentDescription(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleAddPayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Ödeme Kaydet
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">💰 Bu tutar kullanıcının toplam kazancına eklenecektir</p>
      </Card>

      {/* Ödeme Geçmişi Tablosu */}
      {accountData && accountData.paymentHistory.length > 0 && (
        <Card className="p-6 bg-white border-0 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ödeme Geçmişi</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tutar</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tarih</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Açıklama</th>
                </tr>
              </thead>
              <tbody>
                {accountData.paymentHistory.map((payment: any) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-green-600 font-semibold">
                      +₺{payment.amount.toLocaleString('tr-TR')}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(payment.date).toLocaleDateString('tr-TR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {payment.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Month Selector and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-white border-0 shadow-sm lg:col-span-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Aylık İşler</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                {monthlyJobs.length} İş
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                {completedCount} Tamamlandı
              </Badge>
              <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                ₺{monthlyEarnings.toLocaleString('tr-TR')}
              </Badge>
            </div>
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
      </div>

      {/* Job List */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atanan İşler</h3>
        
        {monthlyJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Bu ay için atanan iş yok</p>
          </div>
        ) : (
          <div className="space-y-3">
            {monthlyJobs.map((job) => (
              <Card key={job.id} className={`p-4 border transition-colors ${
                job.status === 'completed' 
                  ? 'border-green-200 bg-green-50/30' 
                  : 'border-gray-200 hover:border-purple-300'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{job.jobTitle}</h4>
                    
                    <div className="space-y-1 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>Başlangıç: {job.scheduledDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>Atandı: {new Date(job.assignedAt).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        <span className="font-semibold text-green-600">₺{job.dailyRate.toLocaleString('tr-TR')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Badge className={
                    job.status === 'completed' 
                      ? 'bg-green-100 text-green-700 border-0' 
                      : 'bg-purple-100 text-purple-700 border-0'
                  }>
                    {job.status === 'completed' ? 'Tamamlandı' : 'Atandı'}
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

// Company Dashboard Component
function CompanyDashboardView({ companyId, companyName }: { companyId: string, companyName: string }) {
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [monthlyPersonnel, setMonthlyPersonnel] = useState<AssignedPersonnel[]>([]);
  const [totalPersonnel, setTotalPersonnel] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [paymentDescription, setPaymentDescription] = useState<string>('');
  const [accountData, setAccountData] = useState<any>(null);
  const [editingBalance, setEditingBalance] = useState(false);
  const [balanceAmount, setBalanceAmount] = useState<string>('');

  useEffect(() => {
    // Varsayılan olarak bu ay
    const currentDate = new Date();
    const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(currentMonthKey);
    loadAccountData();
  }, [companyId]);

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

  const loadAccountData = () => {
    const companyAccounts = JSON.parse(localStorage.getItem('companyAccounts') || '{}');
    if (!companyAccounts[companyId]) {
      companyAccounts[companyId] = {
        totalPayments: 0,
        remainingBalance: 0,
        paymentHistory: []
      };
    }
    setAccountData(companyAccounts[companyId]);
  };

  const handleUpdateBalance = () => {
    const amount = parseFloat(balanceAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error('❌ Geçerli bir tutar girin');
      return;
    }

    const companyAccounts = JSON.parse(localStorage.getItem('companyAccounts') || '{}');
    if (!companyAccounts[companyId]) {
      companyAccounts[companyId] = {
        totalPayments: 0,
        remainingBalance: 0,
        paymentHistory: []
      };
    }

    companyAccounts[companyId].remainingBalance = amount;
    localStorage.setItem('companyAccounts', JSON.stringify(companyAccounts));

    toast.success('✅ Kalan bakiye güncellendi!', {
      description: `Yeni bakiye: ${amount.toLocaleString('tr-TR')} ₺`
    });

    setEditingBalance(false);
    setBalanceAmount('');
    loadAccountData();
  };

  const handleAddPayment = () => {
    const amount = parseFloat(paymentAmount);
    if (!amount || amount <= 0) {
      toast.error('❌ Geçerli bir tutar girin');
      return;
    }

    const companyAccounts = JSON.parse(localStorage.getItem('companyAccounts') || '{}');
    if (!companyAccounts[companyId]) {
      companyAccounts[companyId] = {
        totalPayments: 0,
        remainingBalance: 0,
        paymentHistory: []
      };
    }

    const newPayment = {
      id: Date.now().toString(),
      amount: amount,
      date: new Date().toISOString(),
      description: paymentDescription || 'Ödeme',
      type: 'deduction'
    };

    companyAccounts[companyId].totalPayments += amount;
    companyAccounts[companyId].remainingBalance -= amount;
    companyAccounts[companyId].paymentHistory.unshift(newPayment);

    localStorage.setItem('companyAccounts', JSON.stringify(companyAccounts));

    // Şirkete bildirim gönder
    const notification = {
      id: Date.now().toString(),
      type: 'payment_notification',
      icon: 'DollarSign',
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      title: 'Gelen Ödeme Kaydı',
      message: `${amount.toLocaleString('tr-TR')} ₺ ödeme kaydedildi. ${paymentDescription ? `Açıklama: ${paymentDescription}` : ''} Yeni bakiyeniz: ${companyAccounts[companyId].remainingBalance.toLocaleString('tr-TR')} ₺`,
      time: 'Şimdi',
      createdAt: new Date().toISOString(),
      isNew: true,
      badge: 'Ödeme',
      badgeColor: 'bg-red-600',
      sentBy: 'Admin',
      targetType: 'SINGLE_COMPANY',
      userId: companyId,
      userRole: 'corporate'
    };

    const allNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    allNotifications.push(notification);
    localStorage.setItem('adminNotifications', JSON.stringify(allNotifications));

    toast.success('✅ Ödeme kaydedildi!', {
      description: `${amount.toLocaleString('tr-TR')} ₺ bakiyeden düşüldü ve şirkete bildirim gönderildi`
    });

    setPaymentAmount('');
    setPaymentDescription('');
    loadAccountData();
  };

  // Toplam ödenen ücretleri hesapla
  const calculateTotalPayments = () => {
    const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const companyAssigned = assigned.filter((p: AssignedPersonnel) => p.companyId === companyId && p.status === 'completed');
    return companyAssigned.reduce((total: number, p: AssignedPersonnel) => total + p.dailyRate, 0);
  };

  const calculateMonthlyPayments = () => {
    return monthlyPersonnel
      .filter(p => p.status === 'completed')
      .reduce((total, p) => total + p.dailyRate, 0);
  };

  const totalPayments = calculateTotalPayments();
  const monthlyPayments = calculateMonthlyPayments();
  const completedCount = monthlyPersonnel.filter(p => p.status === 'completed').length;

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

  if (!accountData) return null;

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card className="p-4 lg:p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{companyName}</h2>
            <p className="text-blue-100">Şirket Detayları ve Cari Hesap</p>
          </div>
        </div>
      </Card>

      {/* Cari Hesap Özeti */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6 bg-blue-50 border-0 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-blue-600 mb-1">Personel Ödemeleri</p>
              <p className="text-3xl font-semibold text-blue-700">₺{totalPayments.toLocaleString('tr-TR')}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <Receipt className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-blue-600">Tamamlanan işler</p>
        </Card>

        <Card className="p-6 bg-orange-50 border-0 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <p className="text-sm text-orange-600 mb-2">Kalan Bakiye Tutarı</p>
              {editingBalance ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={balanceAmount}
                    onChange={(e) => setBalanceAmount(e.target.value)}
                    className="w-40 h-9 text-lg font-semibold bg-white border-orange-300"
                  />
                  <Button 
                    size="sm"
                    onClick={handleUpdateBalance}
                    className="bg-green-600 hover:bg-green-700 text-white h-9"
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingBalance(false);
                      setBalanceAmount('');
                    }}
                    className="h-9"
                  >
                    <XCircle className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-semibold text-orange-700">₺{accountData.remainingBalance.toLocaleString('tr-TR')}</p>
                  <Button 
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingBalance(true);
                      setBalanceAmount(accountData.remainingBalance.toString());
                    }}
                    className="text-orange-600 hover:text-orange-700 hover:bg-orange-100"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="bg-orange-100 p-3 rounded-xl">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-orange-600">Manuel düzenlenebilir</p>
        </Card>
      </div>

      {/* Gelen Ödeme Kayıt Formu */}
      <Card className="p-4 lg:p-6 bg-white border-0 shadow-sm">
        <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-4">Gelen Ödeme Kaydı Ekle</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="paymentAmount">Gelen Ödeme Tutarı (₺)</Label>
            <Input
              id="paymentAmount"
              type="number"
              placeholder="0.00"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="paymentDescription">Açıklama (Opsiyonel)</Label>
            <Input
              id="paymentDescription"
              type="text"
              placeholder="Ödeme açıklaması"
              value={paymentDescription}
              onChange={(e) => setPaymentDescription(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleAddPayment}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Ödeme Kaydet
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">⚠️ Bu tutar kalan bakiyeden otomatik düşülecektir</p>
      </Card>

      {/* Ödeme Geçmişi Tablosu */}
      <Card className="p-6 bg-white border-0 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cari Hesap Tablosu</h3>
        
        {accountData.paymentHistory.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">Henüz ödeme kaydı yok</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Gelen Ödeme</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Ödeme Tarihi</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Açıklama</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Kalan Bakiye Tutarı</th>
                </tr>
              </thead>
              <tbody>
                {accountData.paymentHistory.map((payment: any, index: number) => {
                  // Her ödemeden sonra kalan bakiyeyi hesapla
                  let runningBalance = accountData.remainingBalance;
                  for (let i = 0; i < index; i++) {
                    runningBalance += accountData.paymentHistory[i].amount;
                  }
                  
                  return (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-red-600 font-semibold">
                        -₺{payment.amount.toLocaleString('tr-TR')}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {new Date(payment.date).toLocaleDateString('tr-TR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 px-4 text-gray-600 text-sm">
                        {payment.description}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-orange-600">
                        ₺{Math.max(0, runningBalance).toLocaleString('tr-TR')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Month Selector and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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

        <Card className="p-6 bg-purple-50 border-0 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-purple-600 mb-1">Ödenen Ücret</p>
              <p className="text-3xl font-semibold text-purple-700">₺{totalPayments.toLocaleString('tr-TR')}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-purple-600">Tüm zamanlar</p>
        </Card>

        <Card className="p-6 bg-white border-0 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-900">Ay Seçin</h3>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-700 border-0 text-xs">
                {monthlyPersonnel.length} Personel
              </Badge>
              <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                {completedCount} Tamamlandı
              </Badge>
              <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                ₺{monthlyPayments.toLocaleString('tr-TR')}
              </Badge>
            </div>
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Bildirim gönderme state'leri
  const [notificationTargetType, setNotificationTargetType] = useState<string>('ALL');
  const [notificationTargetId, setNotificationTargetId] = useState<string>('');
  const [notificationTitle, setNotificationTitle] = useState<string>('');
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [notificationLink, setNotificationLink] = useState<string>('');

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

  const handleSendNotification = () => {
    // Validasyon
    if (!notificationTitle.trim()) {
      toast.error('❌ Lütfen bildirim başlığı girin');
      return;
    }
    if (!notificationMessage.trim()) {
      toast.error('❌ Lütfen bildirim mesajı girin');
      return;
    }
    if ((notificationTargetType === 'SINGLE_INDIVIDUAL' || notificationTargetType === 'SINGLE_COMPANY') && !notificationTargetId) {
      toast.error('❌ Lütfen hedef kullanıcı/şirket seçin');
      return;
    }

    // Bildirim oluştur
    const notification = {
      id: Date.now().toString(),
      type: 'admin_announcement',
      icon: 'Bell',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      title: notificationTitle,
      message: notificationMessage,
      link: notificationLink || null,
      time: 'Şimdi',
      createdAt: new Date().toISOString(),
      isNew: true,
      badge: 'Admin',
      badgeColor: 'bg-purple-600',
      sentBy: 'Admin',
      targetType: notificationTargetType
    };

    // Hedef kullanıcıları belirle
    const users = JSON.parse(localStorage.getItem('demoUsers') || '[]');
    let targetUsers: any[] = [];

    switch (notificationTargetType) {
      case 'ALL':
        targetUsers = users;
        break;
      case 'ALL_INDIVIDUALS':
        targetUsers = users.filter((u: any) => u.role === 'individual');
        break;
      case 'ALL_COMPANIES':
        targetUsers = users.filter((u: any) => u.role === 'corporate');
        break;
      case 'SINGLE_INDIVIDUAL':
        targetUsers = users.filter((u: any) => u.id === notificationTargetId && u.role === 'individual');
        break;
      case 'SINGLE_COMPANY':
        targetUsers = users.filter((u: any) => u.id === notificationTargetId && u.role === 'corporate');
        break;
    }

    // Her hedef kullanıcı için bildirimi kaydet
    const allNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    targetUsers.forEach(user => {
      allNotifications.push({
        ...notification,
        userId: user.id,
        userRole: user.role
      });
    });
    localStorage.setItem('adminNotifications', JSON.stringify(allNotifications));

    // Başarı mesajı
    const targetCount = targetUsers.length;
    const targetLabel = 
      notificationTargetType === 'ALL' ? 'Tüm kullanıcılara' :
      notificationTargetType === 'ALL_INDIVIDUALS' ? 'Tüm bireysel kullanıcılara' :
      notificationTargetType === 'ALL_COMPANIES' ? 'Tüm kurumsal kullanıcılara' :
      notificationTargetType === 'SINGLE_INDIVIDUAL' ? 'Seçili bireysel kullanıcıya' :
      'Seçili kurumsal kullanıcıya';

    toast.success(`✅ Bildirim gönderildi!`, {
      description: `${targetLabel} (${targetCount} kullanıcı)`
    });

    // Formu temizle
    setNotificationTitle('');
    setNotificationMessage('');
    setNotificationLink('');
    setNotificationTargetType('ALL');
    setNotificationTargetId('');
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
      id: 'job-listings-management' as AdminPage, 
      label: 'İş İlanları Yönetimi', 
      icon: Briefcase,
      count: null
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
      label: 'Bildirim Gönder', 
      icon: Bell,
      count: null
    },
    { 
      id: 'company-accounts' as AdminPage, 
      label: 'Kurumsal Hesaplar', 
      icon: Building2,
      count: 8
    },
    { 
      id: 'individual-accounts' as AdminPage, 
      label: 'Bireysel Hesaplar', 
      icon: UserPlus,
      count: 5
    },
    { 
      id: 'pending-payments' as AdminPage, 
      label: 'Bekleyen Ödemeler', 
      icon: CreditCard,
      count: 2
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



  // Menu render function
  const renderMenuItems = (onItemClick?: () => void) => (
    <nav className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => {
              setActivePage(item.id);
              if (onItemClick) onItemClick();
            }}
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
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 fixed left-0 top-0 bottom-0 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 px-4">Admin Panel</h2>
          {renderMenuItems()}
        </div>
      </aside>

      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="border-gray-300">
                <Menu className="w-5 h-5 text-gray-900" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6 z-50">
              <SheetTitle className="text-xl font-bold text-gray-900 mb-6">Menü</SheetTitle>
              <SheetDescription className="sr-only">Admin panel navigasyon menüsü</SheetDescription>
              {renderMenuItems(() => setMobileMenuOpen(false))}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 p-4 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto">
          {activePage === 'dashboard' && (
            <>
              {/* Page Title */}
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 lg:mb-8">Kontrol Paneli</h1>

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
              <Card className="p-4 lg:p-6 bg-white border-0 shadow-sm">
                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4 lg:mb-6">Son Aktiviteler</h2>
                
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
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 lg:mb-8">İş İlanları</h1>
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

          {activePage === 'job-listings-management' && (
            <JobListingsManagement />
          )}

          {activePage === 'urgent-requests' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">Acil Talepler</h1>
                <Badge className="bg-red-100 text-red-700 border-0 px-4 py-2 text-base">
                  {urgentRequests.length} Bekleyen Talep
                </Badge>
              </div>

              {urgentRequests.length === 0 ? (
                <Card className="p-8 lg:p-12 bg-white border-0 shadow-sm text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Bekleyen talep yok</h3>
                  <p className="text-sm lg:text-base text-gray-600">Tüm acil iş talepleri işlendi.</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {urgentRequests.map((request) => (
                    <Card key={request.id} className="p-0 bg-white border-2 border-red-200 shadow-lg overflow-hidden">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 lg:p-6 border-b border-red-200">
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
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
                      <div className="p-4 lg:p-6">
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
            <SendNotificationForm />
          )}

          {activePage === 'company-accounts' && (
            <>
              {/* Page Title and Company Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">Kurumsal Hesaplar</h1>
                
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
                <Card className="p-4 lg:p-6 bg-white border-0 shadow-sm">
                  <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-4">Tüm Kurumsal Hesaplar</h2>
                  <div className="space-y-4">
                    {companyList.map((company, index) => {
                      // Her şirket için istatistikleri al
                      const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
                      const companyPersonnel = assigned.filter((p: AssignedPersonnel) => p.companyId === company.id);
                      const completedPersonnel = companyPersonnel.filter((p: AssignedPersonnel) => p.status === 'completed');
                      const totalPayments = completedPersonnel.reduce((sum: number, p: AssignedPersonnel) => sum + p.dailyRate, 0);
                      
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
                              <p className="text-sm text-gray-600">{companyPersonnel.length} personel • {completedPersonnel.length} tamamlandı • ₺{totalPayments.toLocaleString('tr-TR')} ödendi</p>
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

          {activePage === 'individual-accounts' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">Bireysel Hesaplar</h1>
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
                          ? 'Tüm Kullanıcılar' 
                          : demoIndividualUsers.find(u => u.id === selectedCompanyId)?.name || 'Kullanıcı seçin'
                        }
                      </span>
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <Command>
                      <CommandInput placeholder="Kullanıcı ara..." />
                      <CommandList>
                        <CommandEmpty>Kullanıcı bulunamadı.</CommandEmpty>
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
                            Tüm Kullanıcılar
                          </CommandItem>
                          {demoIndividualUsers.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.name}
                              onSelect={() => {
                                setSelectedCompanyId(user.id);
                                setCompanySearchOpen(false);
                              }}
                            >
                              <Check
                                className={`mr-2 h-4 w-4 ${
                                  selectedCompanyId === user.id ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                              {user.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Individual User Specific View */}
              {selectedCompanyId !== 'all' && (
                <IndividualDashboardView 
                  userId={selectedCompanyId} 
                  userName={demoIndividualUsers.find(u => u.id === selectedCompanyId)?.name || ''}
                />
              )}

              {/* All Users List - Only show when "all" is selected */}
              {selectedCompanyId === 'all' && (
                <Card className="p-6 bg-white border-0 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Tüm Bireysel Hesaplar</h2>
                  <div className="space-y-4">
                    {demoIndividualUsers.map((user) => {
                      // Her kullanıcı için istatistikleri al
                      const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
                      const userJobs = assigned.filter((p: AssignedPersonnel) => p.personnelId === user.id);
                      const completedJobs = userJobs.filter((p: AssignedPersonnel) => p.status === 'completed');
                      const totalEarnings = completedJobs.reduce((sum: number, p: AssignedPersonnel) => sum + p.dailyRate, 0);
                      
                      return (
                        <div 
                          key={user.id} 
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedCompanyId(user.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{user.name}</h3>
                              <p className="text-sm text-gray-600">{userJobs.length} iş • {completedJobs.length} tamamlandı • ₺{totalEarnings.toLocaleString('tr-TR')} kazanç</p>
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
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 lg:mb-8">Bekleyen Ödemeler</h1>
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

          {activePage === 'urgent-job-acceptances' && (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">Acil İş Kabulleri</h1>
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
                    <Card className="p-8 lg:p-12 bg-white border-0 shadow-sm text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserCheck className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">Henüz kabul yok</h3>
                      <p className="text-sm lg:text-base text-gray-600">Personeller acil işleri kabul ettiğinde burada görünecek.</p>
                    </Card>
                  );
                }

                return (
                  <div className="space-y-6">
                    {jobGroupsArray.map((group: any) => (
                      <Card key={group.jobId} className="p-0 bg-white border-0 shadow-lg overflow-hidden">
                        {/* Job Header */}
                        <div className="bg-gradient-to-r from-[#012840] to-[#0367A6] text-white p-4 lg:p-6">
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
                              <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-xs lg:text-sm text-white/80">
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
                        <div className="p-4 lg:p-6">
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
                                        <div className="flex flex-wrap items-center gap-2 lg:gap-3 text-xs lg:text-sm text-gray-600 mt-1">
                                          <div className="flex items-center gap-1">
                                            <Phone className="w-3 h-3" />
                                            <span className="truncate max-w-[120px] lg:max-w-none">{acceptance.userPhone}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <Mail className="w-3 h-3" />
                                            <span className="truncate max-w-[150px] lg:max-w-none">{acceptance.userEmail}</span>
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

                                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 ml-2 sm:ml-4">
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
              <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-6 lg:mb-8">Ayarlar</h1>
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

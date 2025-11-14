import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { MapPin, Calendar, Building2, Edit, Zap, Users, DollarSign, CreditCard, Star, Clock, Phone, Mail, CheckCircle } from "lucide-react";
import { AssignedPersonnel } from "../../lib/mockData";

interface CompanyHomeProps {
  onNavigate: (page: string, personnelId?: string) => void;
}

export function CompanyHome({ onNavigate }: CompanyHomeProps) {
  const [assignedPersonnel, setAssignedPersonnel] = useState<AssignedPersonnel[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [companyName, setCompanyName] = useState('Test Şirketi');
  const [totalPayments, setTotalPayments] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);
  
  useEffect(() => {
    loadCompanyData();
    
    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      loadCompanyData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  const loadCompanyData = () => {
    // Mevcut şirket bilgisini al
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const companyId = currentUser.id || 'COMP001';
    setCompanyName(currentUser.name || 'Test Şirketi');
    
    // Atanan personelleri yükle
    const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    // Sadece bu şirketin personellerini filtrele
    const companyAssigned = assigned.filter((p: AssignedPersonnel) => 
      p.companyId === companyId || (!p.companyId && companyId === 'COMP001') // eski veriler için
    );
    // En son atananlar en başta olsun
    const sortedAssigned = companyAssigned.sort((a: AssignedPersonnel, b: AssignedPersonnel) => 
      new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
    );
    setAssignedPersonnel(sortedAssigned);
    
    // Tamamlanan iş sayısını yükle
    const allCompanyStats = JSON.parse(localStorage.getItem('allCompanyStats') || '{}');
    const companyStats = allCompanyStats[companyId] || { totalPersonnelSent: 0, totalEarnings: 0, completedJobs: 0 };
    setCompletedCount(companyStats.completedJobs || 0);
    
    // Cari hesap bilgilerini yükle
    const companyAccounts = JSON.parse(localStorage.getItem('companyAccounts') || '{}');
    const account = companyAccounts[companyId] || { totalPayments: 0, remainingBalance: 0, paymentHistory: [] };
    
    // Toplam giden ödemeler
    setTotalPayments(account.totalPayments);
    
    // Kalan bakiye (admin tarafından ayarlanan)
    setRemainingBalance(Math.max(0, account.remainingBalance));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20 lg:pb-6">
      {/* Compact Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white px-4 lg:px-6 pt-4 pb-6 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm p-3 border-0 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white text-lg mb-0.5">{companyName}</h3>
                <div className="flex items-center gap-3 text-white/80 text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>Beşiktaş, İstanbul</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    <span>4.6</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 h-8 px-2 text-xs flex-shrink-0"
              >
                <Edit className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 -mt-3 space-y-3">
        {/* CTA Card */}
        <Card className="bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white p-4 border-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden relative rounded-2xl hover:scale-[1.02] transition-all">
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h4 className="text-white text-sm font-semibold">Günlük personel ihtiyacınız mı var?</h4>
              <Zap className="w-6 h-6 text-[#FFF176] flex-shrink-0" />
            </div>
            <p className="text-white/90 mb-3 text-xs leading-relaxed">
              Yakındaki çalışanlar anında bildirim alsın
            </p>
            <Button
              onClick={() => onNavigate('post-job')}
              size="sm"
              className="bg-white text-[#4DD0E1] hover:bg-white/90 hover:scale-105 w-full h-8 text-xs rounded-xl font-medium shadow-md"
            >
              <Zap className="w-3 h-3 mr-1.5" />
              İş Talebi Oluştur
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
        </Card>

        {/* Job Applications Card */}
        <Card 
          className="p-3 border-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-gradient-to-r from-[#B39DDB]/10 to-[#FFF176]/10 cursor-pointer hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all rounded-2xl hover:scale-[1.02]"
          onClick={() => onNavigate('job-applications')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] flex items-center justify-center flex-shrink-0 shadow-md">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[#333333] text-sm mb-0 font-semibold">İş Başvuruları</h4>
                <p className="text-[#757575] text-xs">
                  {(() => {
                    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                    const allApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
                    const companyApplications = allApplications.filter((app: any) => app.companyId === currentUser.id);
                    return companyApplications.length;
                  })()} başvuru
                </p>
              </div>
            </div>
            <Badge className="bg-[#4DD0E1] text-white text-xs rounded-full">Görüntüle →</Badge>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <Card 
            className="p-3 border-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-[#FFF9E6] cursor-pointer hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-all rounded-2xl hover:scale-[1.02]"
            onClick={() => onNavigate('gelen-personeller')}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <Badge className="bg-blue-50 text-blue-600 border-0 text-xs px-1.5 py-0">Bu Ay</Badge>
            </div>
            <div className="text-xl text-[#012840] mb-0.5">
              {(() => {
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                const companyId = currentUser.id || 'COMP001';
                const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
                const companyAssigned = assigned.filter((p: any) => 
                  p.companyId === companyId || (!p.companyId && companyId === 'COMP001')
                );
                
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();
                
                const thisMonthCount = companyAssigned.filter((p: any) => {
                  const assignedDate = new Date(p.assignedAt);
                  return assignedDate.getMonth() === currentMonth && assignedDate.getFullYear() === currentYear;
                }).length;
                
                return thisMonthCount;
              })()}
            </div>
            <div className="text-xs text-[#0367A6]">Gelen Personel</div>
          </Card>

          <Card className="p-3 border-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-[#FFF9E6] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-shadow rounded-2xl hover:scale-[1.02]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-red-600" />
              </div>
              <Badge className="bg-red-50 text-red-600 border-0 text-xs px-1.5 py-0">↓</Badge>
            </div>
            <div className="text-xl text-[#012840] mb-0.5">{(totalPayments / 1000).toFixed(1)}K₺</div>
            <div className="text-xs text-[#0367A6]">Giden Ödeme</div>
          </Card>

          <Card className="p-3 border-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-[#FFF9E6] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-shadow rounded-2xl hover:scale-[1.02]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <CreditCard className="w-4 h-4 text-orange-600" />
              </div>
              <Badge className="bg-orange-50 text-orange-600 border-0 text-xs px-1.5 py-0">💰</Badge>
            </div>
            <div className="text-xl text-[#012840] mb-0.5">{(remainingBalance / 1000).toFixed(1)}K₺</div>
            <div className="text-xs text-[#0367A6]">Kalan Bakiye Tutarı</div>
          </Card>

          <Card className="p-3 border-0 shadow-[0_4px_12px_rgba(0,0,0,0.08)] bg-[#FFF9E6] hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-shadow rounded-2xl hover:scale-[1.02]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <Badge className="bg-amber-50 text-amber-600 border-0 text-xs px-1.5 py-0">★</Badge>
            </div>
            <div className="text-xl text-[#012840] mb-0.5">4.6</div>
            <div className="text-xs text-[#0367A6]">Puan</div>
          </Card>
        </div>

        {/* Assigned Personnel */}
        <div className="pb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#012840]" />
              <h4 className="text-[#012840]">Atanan Personeller</h4>
              <Badge className="bg-blue-50 text-blue-700 border-0 text-xs">{assignedPersonnel.length}</Badge>
            </div>
          </div>

          {assignedPersonnel.length === 0 ? (
            <Card className="p-6 border-0 shadow-sm text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600">Henüz atanan personel yok</p>
              <p className="text-xs text-gray-500 mt-1">Admin atadığında burada görünecek</p>
            </Card>
          ) : (
            <Card className="border-0 shadow-sm overflow-hidden">
              {assignedPersonnel.map((personnel, index) => (
                <div 
                  key={personnel.id} 
                  className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer ${
                    index > 0 ? 'border-t border-gray-100' : ''
                  }`}
                  onClick={() => onNavigate('assigned-personnel-detail', personnel.id)}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                        {personnel.personnelName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#012840] text-sm">{personnel.personnelName}</h4>
                        <p className="text-xs text-[#0367A6]">{personnel.jobTitle}</p>
                      </div>
                    </div>
                    <Badge className={
                      personnel.status === 'completed' 
                        ? 'bg-green-50 text-green-700 border-0 text-xs' 
                        : 'bg-blue-50 text-blue-700 border-0 text-xs'
                    }>
                      {personnel.status === 'completed' ? '✓' : '●'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-0.5 text-xs text-[#0367A6] ml-11">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />
                      <span>{personnel.personnelPhone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      <span>{personnel.scheduledDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
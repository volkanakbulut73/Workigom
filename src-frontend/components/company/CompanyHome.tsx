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
  
  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
      {/* Header with Profile */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">Profil</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>

          <Card className="bg-white p-5 lg:p-6 border-0 shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-[#0367A6] to-[#012840] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-[#012840]">{companyName}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#0367A6] text-[#0367A6] hover:bg-[#0367A6] hover:text-white flex-shrink-0"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Profili Düzenle
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-[#0367A6]">
                    <MapPin className="w-4 h-4" />
                    <span>Beşiktaş, İstanbul</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0367A6]">
                    <Calendar className="w-4 h-4" />
                    <span>Üyelik: Ekim 2025</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#0367A6]">
                    <Building2 className="w-4 h-4" />
                    <span>Çok Sektörlü Test Şirketi</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4 space-y-4">
        {/* CTA Card */}
        <Card className="bg-gradient-to-br from-[#3F9BBF] via-[#0367A6] to-[#012840] text-white p-6 border-0 shadow-xl overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-white">Acil Personel mi Lazım?</h3>
              <Zap className="w-8 h-8 text-white/80 flex-shrink-0" />
            </div>
            <p className="text-white/90 mb-4 text-sm lg:text-base leading-relaxed">
              Acil iş talebinizi hemen yayınlayın, yakındaki uygun çalışanlar anında bildirim alsın.
            </p>
            <Button
              onClick={() => onNavigate('post-job')}
              className="bg-white text-[#0367A6] hover:bg-white/90 shadow-md"
            >
              <Zap className="w-4 h-4 mr-2" />
              Acil İş Talebi Oluştur
            </Button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="p-4 border-0 shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onNavigate('gelen-personeller')}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-[#3F9BBF]/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#3F9BBF]" />
              </div>
              <Badge className="bg-[#C9E2F2] text-[#0367A6] border-0">Bu Ay</Badge>
            </div>
            <div className="text-2xl font-semibold text-[#012840] mb-1">
              {(() => {
                const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
                const companyId = currentUser.id || 'COMP001';
                const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
                const companyAssigned = assigned.filter((p: any) => 
                  p.companyId === companyId || (!p.companyId && companyId === 'COMP001')
                );
                
                // Bu ay filtresi
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
            <div className="text-sm text-[#0367A6]">Acil Gelen Personel</div>
          </Card>

          <Card className="p-4 border-0 shadow-md bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-emerald-600" />
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-0">Ödendi</Badge>
            </div>
            <div className="text-2xl font-semibold text-[#012840] mb-1">28.000₺</div>
            <div className="text-sm text-[#0367A6]">Toplam Ödeme</div>
          </Card>

          <Card className="p-4 border-0 shadow-md bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-orange-600" />
              </div>
              <Badge className="bg-orange-50 text-orange-600 border-0">Bekliyor</Badge>
            </div>
            <div className="text-2xl font-semibold text-[#012840] mb-1">12.500₺</div>
            <div className="text-sm text-[#0367A6]">Kalan Ödeme</div>
          </Card>

          <Card className="p-4 border-0 shadow-md bg-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-amber-500" />
              </div>
              <Badge className="bg-amber-50 text-amber-600 border-0">Değerlendirme</Badge>
            </div>
            <div className="text-2xl font-semibold text-[#012840] mb-1">4.6</div>
            <div className="text-sm text-[#0367A6]">Ortalama Puan</div>
          </Card>
        </div>

        {/* Assigned Personnel */}
        <div className="pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-[#012840]" />
            <h3 className="text-[#012840]">Atanan Personeller</h3>
            <Badge className="bg-blue-100 text-blue-700 border-0">{assignedPersonnel.length}</Badge>
          </div>
          <p className="text-sm text-[#0367A6] mb-3">Admin tarafından atanan personeller ve iş detayları</p>

          {assignedPersonnel.length === 0 ? (
            <Card className="p-8 border-0 shadow-md text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Henüz atanan personel yok</p>
              <p className="text-sm text-gray-500 mt-1">Admin personel atadığında burada görünecek</p>
            </Card>
          ) : (
            <Card className="border-0 shadow-md overflow-hidden">
              {assignedPersonnel.map((personnel, index) => (
                <div 
                  key={personnel.id} 
                  className={`p-4 hover:bg-[#C9E2F2]/20 transition-colors cursor-pointer ${
                    index > 0 ? 'border-t border-[#C9E2F2]' : ''
                  }`}
                  onClick={() => onNavigate('assigned-personnel-detail', personnel.id)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold">
                          {personnel.personnelName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[#012840]">{personnel.personnelName}</h4>
                          <p className="text-sm text-[#0367A6]">{personnel.jobTitle}</p>
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
                  
                  <div className="space-y-1 text-sm text-[#0367A6]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span>{personnel.personnelPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>Tarih: {personnel.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>Atandı: {new Date(personnel.assignedAt).toLocaleString('tr-TR')}</span>
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

import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Clock, MapPin, DollarSign, Calendar, CheckCircle, Star } from "lucide-react";
import { mockApplications, mockJobs, AssignedPersonnel, mockUrgentJobRequests } from "../../lib/mockData";

interface JobsPageProps {
  onNavigate: (page: string) => void;
}

export function JobsPage({ onNavigate }: JobsPageProps) {
  const [assignedJobs, setAssignedJobs] = useState<AssignedPersonnel[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    // localStorage'dan atanmış işleri al
    const allAssignedPersonnel = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    // Kullanıcının kendi işlerini filtrele
    const userJobs = allAssignedPersonnel.filter(
      (job: AssignedPersonnel) => job.personnelId === currentUser.id
    );
    setAssignedJobs(userJobs);
    
    // Varsayılan olarak mevcut ayı seç
    const currentDate = new Date();
    const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(currentMonthKey);
  }, []);

  useEffect(() => {
    // Tamamlanan işleri filtrele ve detaylarını ekle
    loadCompletedJobs();
  }, [assignedJobs, selectedMonth]);

  const loadCompletedJobs = () => {
    // Sadece tamamlanmış işleri al
    let completedJobs = assignedJobs.filter(job => job.status === 'completed');
    
    // Seçili aya göre filtrele
    if (selectedMonth) {
      completedJobs = completedJobs.filter((job: AssignedPersonnel) => {
        const jobDate = new Date(job.assignedAt);
        const jobMonthKey = `${jobDate.getFullYear()}-${String(jobDate.getMonth() + 1).padStart(2, '0')}`;
        return jobMonthKey === selectedMonth;
      });
    }
    
    // En yeni işler en başta
    completedJobs.sort((a: AssignedPersonnel, b: AssignedPersonnel) => 
      new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
    );
    
    // İş detaylarını ekle
    const jobsWithDetails = completedJobs.map((job: AssignedPersonnel) => {
      const urgentJobRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || JSON.stringify(mockUrgentJobRequests));
      const jobRequest = urgentJobRequests.find((req: any) => req.id === job.requestId);
      return {
        ...job,
        jobDetails: jobRequest
      };
    });
    
    setFilteredJobs(jobsWithDetails);
  };

  // Kullanılabilir ayları hesapla
  const getAvailableMonths = () => {
    const completedJobs = assignedJobs.filter(job => job.status === 'completed');
    const months = new Set<string>();
    
    completedJobs.forEach((job: AssignedPersonnel) => {
      const date = new Date(job.assignedAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    });
    
    // Son 12 ayı ekle (iş olmasa bile)
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    }
    
    return Array.from(months).sort().reverse();
  };

  const formatMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
  };

  // Toplam kazanç hesaplama (sadece tamamlanan işler)
  const completedJobs = assignedJobs.filter(job => job.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, job) => sum + job.dailyRate, 0);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0367A6] to-[#012840] text-white p-6">
        <h1 className="mb-1">İşlerim</h1>
        <p className="text-[#C9E2F2]">Başvurularınızı ve kazançlarınızı takip edin</p>
      </div>

      {/* Earnings Summary */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card className="p-5 bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tamamlanan İşler</p>
                <div className="text-3xl text-emerald-700">{completedJobs.length}</div>
              </div>
            </div>
            <div className="pt-3 border-t border-emerald-200">
              <p className="text-xs text-gray-600">Toplam Kazanç</p>
              <div className="text-2xl text-green-600">₺{totalEarnings.toLocaleString('tr-TR')}</div>
            </div>
          </Card>

          <Card className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-amber-500 flex items-center justify-center">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ortalama Puan</p>
                <div className="text-3xl text-amber-700">4.8</div>
              </div>
            </div>
            <div className="pt-3 border-t border-amber-200">
              <p className="text-xs text-gray-600">Son İşler</p>
              <div className="text-2xl text-amber-600">5.0 ⭐</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tamamlanan İşler */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[#012840]">Tamamlanan Acil İşler</h2>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ay seçin" />
            </SelectTrigger>
            <SelectContent>
              {getAvailableMonths().map((month) => (
                <SelectItem key={month} value={month}>
                  {formatMonthLabel(month)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredJobs.length === 0 ? (
            <Card className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground">Bu ayda tamamlanmış iş yok</p>
              <p className="text-sm text-muted-foreground">İş tamamladıkça burada görünecek</p>
            </Card>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="p-4 border-green-200 bg-green-50/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-2 flex-1">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="mb-1 text-[#012840]">
                        {job.jobDetails?.position || 'Pozisyon Belirtilmemiş'}
                      </h3>
                      <p className="text-sm text-[#0367A6]">
                        {job.jobDetails?.companyName || 'Şirket Belirtilmemiş'}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white border-0">Tamamlandı</Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-[#0367A6]">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(job.assignedAt).toLocaleDateString('tr-TR', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  {job.jobDetails?.location && (
                    <div className="flex items-center gap-2 text-[#3F9BBF]">
                      <MapPin className="w-4 h-4" />
                      <span>{job.jobDetails.location}</span>
                    </div>
                  )}
                  {job.jobDetails?.startTime && (
                    <div className="flex items-center gap-2 text-[#3F9BBF]">
                      <Clock className="w-4 h-4" />
                      <span>{job.jobDetails.startTime}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                  <div>
                    <p className="text-sm text-gray-600">İş Tamamlandı</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Puan 5.0 ⭐</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Kazanç</p>
                    <div className="text-2xl text-green-600">₺{job.dailyRate.toLocaleString('tr-TR')}</div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

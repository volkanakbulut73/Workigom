import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, User, Phone, Mail, Calendar, Clock, DollarSign, Briefcase, MapPin, CheckCircle, Building2 } from "lucide-react";
import { AssignedPersonnel } from "../../lib/mockData";
import { toast } from "sonner@2.0.3";

interface AssignedPersonnelDetailProps {
  personnelId: string;
  onNavigate: (page: string) => void;
}

export function AssignedPersonnelDetail({ personnelId, onNavigate }: AssignedPersonnelDetailProps) {
  const [personnel, setPersonnel] = useState<AssignedPersonnel | null>(null);

  useEffect(() => {
    const assignedList = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const found = assignedList.find((p: AssignedPersonnel) => p.id === personnelId);
    setPersonnel(found || null);
  }, [personnelId]);

  const handleCompleteJob = () => {
    if (!personnel) return;

    // Personel durumunu 'completed' olarak güncelle
    const assignedList = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const updatedList = assignedList.map((p: AssignedPersonnel) => 
      p.id === personnelId ? { ...p, status: 'completed' } : p
    );
    localStorage.setItem('assignedPersonnel', JSON.stringify(updatedList));

    // Şirket istatistiklerini güncelle
    const companyStats = JSON.parse(localStorage.getItem('companyStats') || '{}');
    const updatedStats = {
      companyId: companyStats.companyId || 'COMP001',
      totalPersonnelSent: (companyStats.totalPersonnelSent || 0) + 1,
      totalEarnings: (companyStats.totalEarnings || 0) + personnel.dailyRate,
      completedJobs: (companyStats.completedJobs || 0) + 1
    };
    localStorage.setItem('companyStats', JSON.stringify(updatedStats));

    toast.success('✅ İş tamamlandı olarak işaretlendi!', {
      description: `${personnel.personnelName} başarıyla görevini tamamladı.`
    });

    setTimeout(() => {
      onNavigate('company-home');
    }, 1500);
  };

  if (!personnel) {
    return (
      <div className="p-4">
        <p>Personel bulunamadı</p>
        <Button onClick={() => onNavigate('company-home')}>Ana Sayfaya Dön</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('company-home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="flex-1">Personel Detayları</h2>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Personnel Profile */}
        <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full flex items-center justify-center text-white text-2xl font-semibold flex-shrink-0">
              {personnel.personnelName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h3 className="text-[#012840] mb-2">{personnel.personnelName}</h3>
              <Badge className={
                personnel.status === 'completed' 
                  ? 'bg-green-600 text-white border-0' 
                  : 'bg-blue-600 text-white border-0'
              }>
                {personnel.status === 'completed' ? '✓ Tamamlandı' : 'Atandı'}
              </Badge>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="flex items-center gap-3 text-[#0367A6]">
              <Phone className="w-5 h-5" />
              <div>
                <div className="text-sm text-gray-600">Telefon</div>
                <div className="font-medium">{personnel.personnelPhone}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-[#0367A6]">
              <Mail className="w-5 h-5" />
              <div>
                <div className="text-sm text-gray-600">E-posta</div>
                <div className="font-medium">{personnel.personnelEmail}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Job Details */}
        <Card className="p-6 border-0 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-[#0367A6]" />
            <h3 className="text-[#012840]">İş Detayları</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#3F9BBF] mt-1" />
              <div>
                <div className="text-sm text-gray-600">Pozisyon</div>
                <div className="font-medium text-[#012840]">{personnel.jobTitle}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#3F9BBF] mt-1" />
              <div>
                <div className="text-sm text-gray-600">Planlanan Tarih</div>
                <div className="font-medium text-[#012840]">{personnel.scheduledDate}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#3F9BBF] mt-1" />
              <div>
                <div className="text-sm text-gray-600">Atanma Tarihi</div>
                <div className="font-medium text-[#012840]">
                  {new Date(personnel.assignedAt).toLocaleString('tr-TR')}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-emerald-600 mt-1" />
              <div>
                <div className="text-sm text-gray-600">Günlük Ücret</div>
                <div className="text-2xl font-semibold text-emerald-600">{personnel.dailyRate} ₺</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-6 border-0 shadow-md">
          <h3 className="text-[#012840] mb-4">Süreç Takibi</h3>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div className="w-0.5 h-12 bg-green-200"></div>
              </div>
              <div className="flex-1 pt-1">
                <p className="font-medium text-[#012840]">Admin tarafından atandı</p>
                <p className="text-sm text-gray-600">
                  {new Date(personnel.assignedAt).toLocaleString('tr-TR')}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  personnel.status === 'completed' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <CheckCircle className="w-5 h-5" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p className={`font-medium ${
                  personnel.status === 'completed' ? 'text-[#012840]' : 'text-gray-400'
                }`}>
                  İş tamamlandı
                </p>
                {personnel.status === 'completed' ? (
                  <p className="text-sm text-gray-600">Görev başarıyla tamamlandı</p>
                ) : (
                  <p className="text-sm text-gray-400">Personel göreve geldiğinde işaretleyin</p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Action Button */}
        {personnel.status !== 'completed' && (
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="text-center mb-4">
              <h3 className="text-[#012840] mb-2">İş Tamamlandı mı?</h3>
              <p className="text-sm text-gray-600">
                Personel belirtilen tarihte göreve gelip işi tamamladıysa onaylayın
              </p>
            </div>
            <Button 
              onClick={handleCompleteJob}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white h-12"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              İş Tamamlandı
            </Button>
          </Card>
        )}

        {personnel.status === 'completed' && (
          <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#012840] mb-2">İş Tamamlandı!</h3>
              <p className="text-sm text-gray-600">
                Bu iş başarıyla tamamlandı olarak işaretlendi
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

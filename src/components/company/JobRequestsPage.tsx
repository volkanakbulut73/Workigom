import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowLeft, Users, Clock, DollarSign, MapPin, Eye, CheckCircle, Calendar } from "lucide-react";
import { mockJobs, AssignedPersonnel } from "../../lib/mockData";

interface JobRequestsPageProps {
  onNavigate: (page: string) => void;
}

export function JobRequestsPage({ onNavigate }: JobRequestsPageProps) {
  const [assignedPersonnel, setAssignedPersonnel] = useState<AssignedPersonnel[]>([]);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    // localStorage'dan atanmış personelleri al
    const allAssignedPersonnel = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    // Şirketin personellerini filtrele
    const companyPersonnel = allAssignedPersonnel.filter(
      (p: AssignedPersonnel) => p.companyId === currentUser.id
    );
    setAssignedPersonnel(companyPersonnel);
  }, []);

  const companyJobs = mockJobs.slice(0, 3);
  const activeJobs = assignedPersonnel.filter(p => p.status === 'assigned');
  const completedJobs = assignedPersonnel.filter(p => p.status === 'completed');
  const totalEarnings = completedJobs.reduce((sum, job) => sum + job.dailyRate, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onNavigate('company-home')}
              className="lg:hidden text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-white flex-1">İş İlanlarım</h1>
            <Badge className="bg-white text-[#0367A6] border-0">
              {companyJobs.length + assignedPersonnel.length}
            </Badge>
          </div>
          <p className="text-white/80 text-sm lg:ml-0 ml-12">İşlerinizi ve personellerinizi yönetin</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Özet Kartı */}
        {completedJobs.length > 0 && (
          <Card className="p-5 bg-gradient-to-r from-[#C9E2F2]/30 to-[#C9E2F2]/50 border-[#3F9BBF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Toplam Harcama</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl text-[#012840]">₺{totalEarnings}</span>
                  <span className="text-sm text-gray-600">bu ay</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Tamamlanan İşler</p>
                <div className="text-3xl text-green-600">{completedJobs.length}</div>
              </div>
            </div>
          </Card>
        )}

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Aktif ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="completed">Tamamlanan ({completedJobs.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4 space-y-3">
            {activeJobs.length === 0 ? (
              <Card className="p-8 text-center border-0 shadow-md">
                <p className="text-gray-600 mb-2">Aktif iş yok</p>
                <p className="text-sm text-gray-500">Yeni iş ilanı verin veya personel atayın</p>
              </Card>
            ) : (
              activeJobs.map((job) => (
                <Card key={job.id} className="p-5 border-0 shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-[#012840] mb-1">{job.jobTitle}</h3>
                      <p className="text-sm text-[#0367A6]">{job.personnelName}</p>
                    </div>
                    <Badge className="bg-[#0367A6] text-white border-0">Atandı</Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[#0367A6]">
                      <Calendar className="w-4 h-4" />
                      <span>{job.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#3F9BBF]">
                      <Clock className="w-4 h-4" />
                      <span>Atandı: {new Date(job.assignedAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <DollarSign className="w-4 h-4" />
                      <span>₺{job.dailyRate}/gün</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <Button 
                      size="sm"
                      onClick={() => onNavigate('view-applications')}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Detayları Görüntüle
                    </Button>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-3">
            {completedJobs.length === 0 ? (
              <Card className="p-8 text-center border-0 shadow-md">
                <p className="text-gray-600 mb-2">Henüz tamamlanmış iş yok</p>
                <p className="text-sm text-gray-500">İşler tamamlandıkça burada görünecek</p>
              </Card>
            ) : (
              completedJobs.map((job) => (
                <Card key={job.id} className="p-5 border-green-200 bg-green-50/30 shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h3 className="text-[#012840] mb-1">{job.jobTitle}</h3>
                        <p className="text-sm text-[#0367A6]">{job.personnelName}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-600 text-white border-0">Tamamlandı</Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-[#0367A6]">
                      <Calendar className="w-4 h-4" />
                      <span>{job.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#3F9BBF]">
                      <Clock className="w-4 h-4" />
                      <span>Atandı: {new Date(job.assignedAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">İş Tamamlandı</p>
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span>Başarılı</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Ödenen Ücret</p>
                        <div className="text-2xl text-green-600">₺{job.dailyRate}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

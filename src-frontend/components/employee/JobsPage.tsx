import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Clock, MapPin, DollarSign, Calendar } from "lucide-react";
import { mockApplications, mockJobs } from "../../lib/mockData";

interface JobsPageProps {
  onNavigate: (page: string) => void;
}

export function JobsPage({ onNavigate }: JobsPageProps) {
  const activeApplications = mockApplications.filter(app => app.status === 'pending' || app.status === 'accepted');
  const completedApplications = mockApplications.filter(app => app.status === 'accepted' && app.earnings);

  const totalEarnings = completedApplications.reduce((sum, app) => sum + (app.earnings || 0), 0);

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0367A6] to-[#012840] text-white p-6">
        <h1 className="mb-1">İşlerim</h1>
        <p className="text-[#C9E2F2]">Başvurularınızı ve kazançlarınızı takip edin</p>
      </div>

      {/* Earnings Summary */}
      <div className="px-4 py-6">
        <Card className="p-5 bg-gradient-to-r from-[#C9E2F2]/30 to-[#C9E2F2]/50 border-[#3F9BBF]">
          <p className="text-muted-foreground mb-1">Toplam Kazanç</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl text-green-600">₺{totalEarnings}</span>
            <span className="text-muted-foreground">bu ay</span>
          </div>
          <div className="mt-3 pt-3 border-t border-green-200 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Tamamlanan</p>
              <div>{completedApplications.length}</div>
            </div>
            <div>
              <p className="text-muted-foreground">Aktif İşler</p>
              <div>{activeApplications.length}</div>
            </div>
            <div>
              <p className="text-muted-foreground">Ort. Puan</p>
              <div>4.8 ⭐</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Jobs Tabs */}
      <div className="px-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Aktif ({activeApplications.length})</TabsTrigger>
            <TabsTrigger value="completed">Tamamlanan ({completedApplications.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-4 space-y-3">
            {activeApplications.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Aktif iş yok</p>
                <p className="text-muted-foreground">Başlamak için acil işlere göz atın</p>
              </Card>
            ) : (
              activeApplications.map((application) => {
                const job = mockJobs.find(j => j.id === application.jobId);
                return (
                  <Card key={application.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="mb-1">{application.jobTitle}</h3>
                        <p className="text-muted-foreground">{application.company}</p>
                      </div>
                      <Badge variant={application.status === 'accepted' ? 'default' : 'outline'}>
                        {application.status === 'accepted' ? 'Onaylandı' : 'Beklemede'}
                      </Badge>
                    </div>

                    {job && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{job.startTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-600">
                          <DollarSign className="w-4 h-4" />
                          <span>Günlük {Math.round(job.hourlyRate * 8)} TL</span>
                        </div>
                      </div>
                    )}

                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-muted-foreground">Başvuru: {application.appliedAt}</p>
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4 space-y-3">
            {completedApplications.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Henüz tamamlanmış iş yok</p>
                <p className="text-muted-foreground">İlk işinizi tamamlayın, burada görünsün</p>
              </Card>
            ) : (
              completedApplications.map((application) => (
                <Card key={application.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="mb-1">{application.jobTitle}</h3>
                      <p className="text-muted-foreground">{application.company}</p>
                    </div>
                    <Badge variant="secondary">Ödendi</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground">Tamamlandı</p>
                      <div>Puan 5.0 ⭐</div>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Kazanç</p>
                      <div className="text-green-600">₺{application.earnings}</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-muted-foreground">15 Ekim 2025'te tamamlandı</p>
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

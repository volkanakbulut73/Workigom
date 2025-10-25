import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Clock, MapPin, DollarSign, ArrowLeft, Users, Calendar, CheckCircle2 } from "lucide-react";
import { mockJobs, Job, JobApplication } from "../../lib/mockData";
import { toast } from "sonner";

interface JobDetailPageProps {
  jobId: string;
  onNavigate: (page: string) => void;
}

export function JobDetailPage({ jobId, onNavigate }: JobDetailPageProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // Önce mockJobs'tan bak
    let foundJob = mockJobs.find(j => j.id === jobId);
    
    // Bulamazsan approvedUrgentJobs'tan bak
    if (!foundJob) {
      const approvedJobs = JSON.parse(localStorage.getItem('approvedUrgentJobs') || '[]');
      foundJob = approvedJobs.find((j: Job) => j.id === jobId);
    }
    
    setJob(foundJob || null);
    
    // Kullanıcının daha önce başvurup başvurmadığını kontrol et
    if (foundJob?.applications) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const userApplied = foundJob.applications.some(app => app.userId === (currentUser.id || 'IND001'));
      setHasApplied(userApplied);
    }
  }, [jobId]);

  if (!job) {
    return (
      <div className="p-4">
        <p>İş bulunamadı</p>
        <Button onClick={() => onNavigate('home')}>Ana Sayfaya Dön</Button>
      </div>
    );
  }

  const handleApply = () => {
    // Kullanıcı bilgilerini al
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const newApplication: JobApplication = {
      id: Date.now().toString(),
      userId: currentUser.id || 'IND001',
      userName: currentUser.name || 'Ahmet Yılmaz',
      userPhone: currentUser.phone || '+90 532 123 4567',
      userEmail: currentUser.email || 'ahmet.yilmaz@email.com',
      appliedAt: new Date().toISOString(),
      status: 'pending'
    };

    // Acil iş kabulü kaydı oluştur (admin panelinde görünecek)
    const acceptance = {
      id: Date.now().toString(),
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      companyId: job.companyId || 'COMP001',
      category: job.category,
      location: job.location,
      dailyRate: job.hourlyRate * 8, // Günlük ücret
      duration: job.duration,
      userId: currentUser.id || 'IND001',
      userName: currentUser.name || 'Ahmet Yılmaz',
      userPhone: currentUser.phone || '+90 532 123 4567',
      userEmail: currentUser.email || 'ahmet.yilmaz@email.com',
      acceptedAt: new Date().toISOString(),
      status: 'pending'
    };

    const acceptances = JSON.parse(localStorage.getItem('urgentJobAcceptances') || '[]');
    acceptances.unshift(acceptance);
    localStorage.setItem('urgentJobAcceptances', JSON.stringify(acceptances));

    // Başvuruyu kaydet
    const approvedJobs = JSON.parse(localStorage.getItem('approvedUrgentJobs') || '[]');
    const updatedJobs = approvedJobs.map((j: Job) => {
      if (j.id === jobId) {
        return {
          ...j,
          applications: [...(j.applications || []), newApplication],
          applicants: (j.applicants || 0) + 1
        };
      }
      return j;
    });
    localStorage.setItem('approvedUrgentJobs', JSON.stringify(updatedJobs));

    // urgentJobRequests'i de güncelle
    const urgentRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const updatedRequests = urgentRequests.map((req: any) => {
      if (req.jobData.id === jobId) {
        return {
          ...req,
          jobData: {
            ...req.jobData,
            applications: [...(req.jobData.applications || []), newApplication],
            applicants: (req.jobData.applicants || 0) + 1
          }
        };
      }
      return req;
    });
    localStorage.setItem('urgentJobRequests', JSON.stringify(updatedRequests));

    setHasApplied(true);
    toast.success('✅ İşi kabul ettiniz!', {
      description: 'Admin tarafından değerlendirilecek.'
    });
  };

  const handleReject = () => {
    toast.info('İşe başvuru yapmadınız');
    setTimeout(() => onNavigate('urgent-jobs'), 1000);
  };

  return (
    <div className="pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('urgent-jobs')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="flex-1">İş Detayları</h2>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Job Header */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="mb-2">{job.title}</h2>
              <h3 className="text-muted-foreground">{job.company}</h3>
            </div>
            <Badge 
              variant={job.urgency === 'high' ? 'destructive' : 'secondary'}
            >
              {job.urgency === 'high' ? 'Acil' : 'Müsait'}
            </Badge>
          </div>

          <div className="space-y-3 pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-green-600">Günlük {Math.round(job.hourlyRate * 8)} TL</div>
                <p className="text-muted-foreground">Ücret bilgisi</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#0367A6]" />
              <div>
                <div>{job.startTime}</div>
                <p className="text-muted-foreground">Başlangıç zamanı</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#3F9BBF]" />
              <div>
                <div>{job.duration}</div>
                <p className="text-muted-foreground">Süre</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#012840]" />
              <div>
                <div>{job.location}</div>
                <p className="text-muted-foreground">Konum</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#3F9BBF]" />
              <div>
                <div>{job.applicants} başvuru</div>
                <p className="text-muted-foreground">{job.postedAt} yayınlandı</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card className="p-5">
          <h3 className="mb-3">Açıklama</h3>
          <p className="text-muted-foreground">{job.description}</p>
        </Card>

        {/* Requirements */}
        <Card className="p-5">
          <h3 className="mb-3">Gereksinimler</h3>
          <div className="space-y-2">
            {job.requirements.map((req, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{req}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Earnings Estimate */}
        <Card className="p-5 bg-[#C9E2F2]/30 border-[#3F9BBF]">
          <h3 className="mb-2">Tahmini Kazanç</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl text-[#0367A6]">{Math.round(job.hourlyRate * 8)} TL</span>
            <span className="text-muted-foreground">bu iş için</span>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {hasApplied ? (
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle2 className="w-5 h-5" />
                <div>
                  <p className="font-medium">Başvuru Gönderildi</p>
                  <p className="text-sm">Şirket başvurunuzu değerlendiriyor</p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                onClick={handleApply}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Kabul Et
              </Button>
              <Button 
                className="flex-1"
                variant="outline"
                onClick={handleReject}
              >
                İptal Et
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

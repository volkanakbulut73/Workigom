import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Briefcase, MapPin, DollarSign, Clock, Calendar, Building2, CheckCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface JobListing {
  id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  duration: string;
  urgency: string;
  description: string;
  requirements: string[];
  postedAt: string;
  startTime: string;
  status: string;
  isUrgent: boolean;
  company: string;
  companyId: string;
  approvedAt: string;
  applications?: any[];
}

interface JobListingsPageProps {
  onNavigate: (page: string) => void;
}

export function JobListingsPage({ onNavigate }: JobListingsPageProps) {
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  useEffect(() => {
    loadJobListings();
  }, []);

  const loadJobListings = () => {
    const listings = JSON.parse(localStorage.getItem('approvedJobListings') || '[]');
    // En yeni ilanlar önce
    const sortedListings = listings.sort((a: JobListing, b: JobListing) => 
      new Date(b.approvedAt).getTime() - new Date(a.approvedAt).getTime()
    );
    setJobListings(sortedListings);
  };

  const handleApply = () => {
    if (!selectedJob) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    if (!currentUser.email) {
      toast.error('Lütfen giriş yapın');
      return;
    }

    // Başvuruyu oluştur
    const application = {
      id: `APP_${Date.now()}`,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      companyId: selectedJob.companyId,
      companyName: selectedJob.company,
      userId: currentUser.id || currentUser.email,
      userName: currentUser.name || 'Kullanıcı',
      userEmail: currentUser.email,
      userPhone: currentUser.phone || '',
      appliedAt: new Date().toISOString(),
      status: 'pending'
    };

    // Job Applications'a ekle
    const allApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    allApplications.push(application);
    localStorage.setItem('jobApplications', JSON.stringify(allApplications));

    // İlana başvuru sayısını ekle
    const allListings = JSON.parse(localStorage.getItem('approvedJobListings') || '[]');
    const updatedListings = allListings.map((job: JobListing) => {
      if (job.id === selectedJob.id) {
        const applications = job.applications || [];
        return {
          ...job,
          applications: [...applications, application]
        };
      }
      return job;
    });
    localStorage.setItem('approvedJobListings', JSON.stringify(updatedListings));

    toast.success('✅ Başvurunuz gönderildi!', {
      description: 'Şirket en kısa sürede size dönüş yapacaktır'
    });

    setShowApplyDialog(false);
    setSelectedJob(null);
    loadJobListings();
  };

  const hasApplied = (jobId: string) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const userId = currentUser.id || currentUser.email;
    return allApplications.some((app: any) => 
      app.jobId === jobId && (app.userId === userId || app.userId === currentUser.email)
    );
  };

  if (jobListings.length === 0) {
    return (
      <div className="min-h-screen bg-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white px-4 lg:px-6 pt-6 pb-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white">İş İlanları</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-6">
          <Card className="p-12 text-center border-dashed">
            <Briefcase className="w-12 h-12 text-[#3F9BBF] mx-auto mb-4" />
            <h3 className="text-[#012840] mb-2">Henüz İlan Yok</h3>
            <p className="text-[#3F9BBF]">
              Şu anda aktif iş ilanı bulunmuyor
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white px-4 lg:px-6 pt-6 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-2">İş İlanları</h1>
          <p className="text-white/90 text-sm">
            {jobListings.length} aktif ilan
          </p>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-4xl mx-auto px-4 lg:px-6 -mt-4">
        <div className="space-y-4">
          {jobListings.map((job) => {
            const applied = hasApplied(job.id);
            
            return (
              <Card key={job.id} className="p-5 border-0 shadow-md bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-[#012840] mb-1">{job.title}</h3>
                    <div className="flex items-center gap-2 text-[#0367A6]">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm">{job.company}</span>
                    </div>
                  </div>
                  {job.isUrgent && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      Acil
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-2 text-[#3F9BBF]">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#3F9BBF]">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">₺{job.hourlyRate.toFixed(2)}/saat</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#3F9BBF]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{job.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#3F9BBF]">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{job.startTime}</span>
                  </div>
                </div>

                {job.description && (
                  <div className="mb-4 p-3 bg-[#C9E2F2]/20 rounded-lg">
                    <p className="text-sm text-[#012840]">{job.description}</p>
                  </div>
                )}

                {applied ? (
                  <Button
                    size="sm"
                    className="w-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100 cursor-default"
                    disabled
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Başvuru Yapıldı
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-[#012840] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF] text-white"
                    onClick={() => {
                      setSelectedJob(job);
                      setShowApplyDialog(true);
                    }}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Başvur
                  </Button>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Apply Confirmation Dialog */}
      <AlertDialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Başvuruyu Onayla</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedJob && (
                <>
                  <strong>{selectedJob.title}</strong> pozisyonuna başvurmak istediğinizden emin misiniz?
                  <br /><br />
                  <strong>Şirket:</strong> {selectedJob.company}<br />
                  <strong>Konum:</strong> {selectedJob.location}<br />
                  <strong>Ücret:</strong> ₺{selectedJob.hourlyRate.toFixed(2)}/saat
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleApply}
              className="bg-gradient-to-r from-[#012840] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF]"
            >
              Başvuruyu Gönder
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

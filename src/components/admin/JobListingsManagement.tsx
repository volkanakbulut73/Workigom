import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Briefcase, MapPin, DollarSign, Clock, Calendar, Send, X } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface UrgentJobRequest {
  id: string;
  jobData: {
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
    isStaffPosition?: boolean;
    company: string;
    companyId: string;
  };
  requestedAt: string;
  requestedBy: string;
  companyName: string;
  status: 'pending' | 'approved' | 'rejected';
}

export function JobListingsManagement() {
  const [jobRequests, setJobRequests] = useState<UrgentJobRequest[]>([]);
  const [selectedJob, setSelectedJob] = useState<UrgentJobRequest | null>(null);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  useEffect(() => {
    loadJobRequests();
  }, []);

  const loadJobRequests = () => {
    const requests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const pendingRequests = requests.filter((req: UrgentJobRequest) => req.status === 'pending');
    setJobRequests(pendingRequests);
  };

  const handleApproveAndNotify = (request: UrgentJobRequest) => {
    // İlanı onayla ve bildirim gönder
    const allRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const updatedRequests = allRequests.map((req: UrgentJobRequest) => 
      req.id === request.id 
        ? { ...req, status: 'approved', approvedAt: new Date().toISOString() }
        : req
    );
    localStorage.setItem('urgentJobRequests', JSON.stringify(updatedRequests));

    // Onaylı ilanları bireysel kullanıcılar için sakla
    const approvedJobs = JSON.parse(localStorage.getItem('approvedJobListings') || '[]');
    const newJob = {
      ...request.jobData,
      approvedAt: new Date().toISOString(),
      applications: []
    };
    approvedJobs.push(newJob);
    localStorage.setItem('approvedJobListings', JSON.stringify(approvedJobs));

    // Tüm bireysel kullanıcılara bildirim gönder
    const notifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    const ilanTipi = request.jobData.isStaffPosition ? 'Personel İlanı' : 'Acil İş';
    const newNotification = {
      id: `NOTIF_${Date.now()}`,
      title: `🎯 Yeni ${ilanTipi}!`,
      message: `${request.companyName} - ${request.jobData.title}`,
      description: `${request.jobData.location} konumunda yeni iş fırsatı! Saatlik ücret: ₺${request.jobData.hourlyRate.toFixed(2)}`,
      createdAt: new Date().toISOString(),
      time: 'Şimdi',
      type: 'job-listing',
      jobId: request.jobData.id,
      targetRole: 'individual', // Sadece bireysel kullanıcılar için
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      badge: 'Yeni İlan',
      badgeColor: 'bg-blue-600',
      isNew: true,
      timestamp: Date.now()
    };
    notifications.push(newNotification);
    localStorage.setItem('adminNotifications', JSON.stringify(notifications));

    toast.success('✅ İlan onaylandı ve bildirim gönderildi!', {
      description: 'Tüm bireysel kullanıcılar bilgilendirildi'
    });

    loadJobRequests();
  };

  const handleReject = () => {
    if (!selectedJob) return;

    // İlanı reddet ve listeden kaldır
    const allRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    const updatedRequests = allRequests.map((req: UrgentJobRequest) => 
      req.id === selectedJob.id 
        ? { ...req, status: 'rejected', rejectedAt: new Date().toISOString() }
        : req
    );
    localStorage.setItem('urgentJobRequests', JSON.stringify(updatedRequests));

    toast.success('İlan reddedildi', {
      description: 'İş ilanı sistemden kaldırıldı'
    });

    setShowRejectDialog(false);
    setSelectedJob(null);
    loadJobRequests();
  };

  if (jobRequests.length === 0) {
    return (
      <div className="p-6">
        <h2 className="mb-6 text-[#012840]">İş İlanları Yönetimi</h2>
        <Card className="p-12 text-center border-dashed">
          <Briefcase className="w-12 h-12 text-[#3F9BBF] mx-auto mb-4" />
          <h3 className="text-[#012840] mb-2">Bekleyen İlan Yok</h3>
          <p className="text-[#3F9BBF]">
            Şu anda onay bekleyen iş ilanı bulunmuyor
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-[#012840]">İş İlanları Yönetimi</h2>
        <p className="text-[#3F9BBF] mt-1">
          {jobRequests.length} ilan onay bekliyor
        </p>
      </div>

      <div className="space-y-4">
        {jobRequests.map((request) => (
          <Card key={request.id} className="p-6 border-0 shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="text-[#012840]">{request.jobData.title}</h3>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                    Onay Bekliyor
                  </Badge>
                  {request.jobData.isStaffPosition ? (
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                      Personel İlanı
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      Acil İş
                    </Badge>
                  )}
                </div>
                <p className="text-[#0367A6] mb-1">{request.companyName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-[#3F9BBF]">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{request.jobData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#3F9BBF]">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">₺{request.jobData.hourlyRate.toFixed(2)}/saat</span>
              </div>
              <div className="flex items-center gap-2 text-[#3F9BBF]">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{request.jobData.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-[#3F9BBF]">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{request.jobData.startTime}</span>
              </div>
            </div>

            {request.jobData.description && (
              <div className="mb-4 p-3 bg-[#C9E2F2]/30 rounded-lg">
                <p className="text-sm text-[#012840]">{request.jobData.description}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-[#012840] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF] text-white"
                onClick={() => handleApproveAndNotify(request)}
              >
                <Send className="w-4 h-4 mr-2" />
                Onayla ve Bildirim Gönder
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50"
                onClick={() => {
                  setSelectedJob(request);
                  setShowRejectDialog(true);
                }}
              >
                <X className="w-4 h-4 mr-2" />
                Reddet
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>İlanı Reddet</AlertDialogTitle>
            <AlertDialogDescription>
              Bu iş ilanını reddetmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              className="bg-red-600 hover:bg-red-700"
            >
              Reddet
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

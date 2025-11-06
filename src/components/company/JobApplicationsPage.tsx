import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Briefcase, Users, Mail, Phone, MapPin, User, ArrowLeft, Award, Star, TrendingUp, Briefcase as BriefcaseIcon } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  appliedAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  location?: string;
  bio?: string;
  skills?: string[];
  profileImage?: string;
}

interface JobApplicationsPageProps {
  onNavigate: (page: string) => void;
}

export function JobApplicationsPage({ onNavigate }: JobApplicationsPageProps) {
  const [applications, setApplications] = useState<{ [jobId: string]: JobApplication[] }>({});
  const [jobTitles, setJobTitles] = useState<{ [jobId: string]: string }>({});
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    
    // Bu şirkete yapılan başvuruları filtrele
    const companyApplications = allApplications.filter(
      (app: JobApplication) => app.companyId === currentUser.id
    );

    // İş ilanına göre grupla
    const groupedByJob: { [jobId: string]: JobApplication[] } = {};
    const titles: { [jobId: string]: string } = {};
    
    companyApplications.forEach((app: JobApplication) => {
      if (!groupedByJob[app.jobId]) {
        groupedByJob[app.jobId] = [];
        titles[app.jobId] = app.jobTitle;
      }
      groupedByJob[app.jobId].push(app);
    });

    setApplications(groupedByJob);
    setJobTitles(titles);
  };

  const handleViewProfile = (userEmail: string) => {
    // userProfiles'dan kullanıcı bilgilerini al
    const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    const profile = userProfiles[userEmail];
    
    // Eğer profil yoksa, currentUser veya mock data'dan bilgileri oluştur
    if (profile) {
      setSelectedUser({
        name: profile.name || 'Kullanıcı',
        email: userEmail,
        phone: profile.phone || '',
        location: profile.location || '',
        bio: profile.bio || '',
        skills: profile.skills || [],
        profileImage: profile.profileImage || ''
      });
    } else {
      // Başvuru bilgilerinden profil oluştur
      const application = Object.values(applications)
        .flat()
        .find(app => app.userEmail === userEmail);
      
      if (application) {
        setSelectedUser({
          name: application.userName,
          email: application.userEmail,
          phone: application.userPhone,
          location: '',
          bio: '',
          skills: [],
          profileImage: ''
        });
      }
    }
    
    setShowProfileDialog(true);
  };

  const handleAcceptApplication = (application: JobApplication) => {
    const allApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const updatedApplications = allApplications.map((app: JobApplication) => 
      app.id === application.id 
        ? { ...app, status: 'accepted' }
        : app
    );
    localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
    
    // Başvuruyu yapan kullanıcıya mesaj olarak bildirim gönder
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const newMessage = {
      id: `MSG_${Date.now()}`,
      sender: application.companyName,
      senderRole: 'corporate',
      recipient: application.userId,
      recipientRole: 'individual',
      subject: `${application.jobTitle} Başvurunuz Hakkında`,
      message: 'İş başvurunuz değerlendirmeye alınmıştır. En kısa sürede sizinle iletişime geçilecektir.',
      timestamp: Date.now(),
      time: 'Şimdi',
      isRead: false,
      isNew: true,
      jobId: application.jobId,
      companyName: application.companyName,
      jobTitle: application.jobTitle
    };
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    toast.success('✅ Başvuru kabul edildi!', {
      description: 'Kullanıcıya mesaj gönderildi'
    });
    
    loadApplications();
  };

  const handleRejectApplication = (application: JobApplication) => {
    const allApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const updatedApplications = allApplications.map((app: JobApplication) => 
      app.id === application.id 
        ? { ...app, status: 'rejected' }
        : app
    );
    localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
    
    // Başvuruyu yapan kullanıcıya mesaj gönder
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    const newMessage = {
      id: `MSG_${Date.now()}`,
      sender: application.companyName,
      senderRole: 'corporate',
      recipient: application.userId,
      recipientRole: 'individual',
      subject: `${application.jobTitle} Başvurunuz Hakkında`,
      message: 'Maalesef başvurunuz bu pozisyon için uygun bulunmadı. Diğer fırsatlar için ilanlarımızı takip edin.',
      timestamp: Date.now(),
      time: 'Şimdi',
      isRead: false,
      isNew: true,
      jobId: application.jobId,
      companyName: application.companyName,
      jobTitle: application.jobTitle
    };
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));
    
    toast.success('Başvuru reddedildi', {
      description: 'Kullanıcıya mesaj gönderildi'
    });
    
    loadApplications();
  };

  const jobCount = Object.keys(applications).length;
  const totalApplications = Object.values(applications).flat().length;

  return (
    <div className="min-h-screen bg-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 lg:p-6 flex items-center gap-3 max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('company-home')}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h2 className="text-[#012840]">İş Başvuruları</h2>
            <p className="text-[#3F9BBF] text-sm mt-1">
              {jobCount} ilan, {totalApplications} başvuru
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-6">
        {jobCount === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <Users className="w-12 h-12 text-[#3F9BBF] mx-auto mb-4" />
            <h3 className="text-[#012840] mb-2">Henüz Başvuru Yok</h3>
            <p className="text-[#3F9BBF]">
              İş ilanlarınıza yapılan başvurular burada görünecek
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(applications).map(([jobId, apps]) => (
              <Card key={jobId} className="p-6 border-0 shadow-md">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#012840] to-[#0367A6] flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#012840]">{jobTitles[jobId]}</h3>
                    <p className="text-sm text-[#3F9BBF]">
                      {apps.length} başvuru
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {apps.map((app) => (
                    <div 
                      key={app.id} 
                      className="p-4 bg-[#C9E2F2]/20 rounded-lg hover:bg-[#C9E2F2]/30 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12 border-2 border-white">
                          <AvatarFallback className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white">
                            {app.userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <button
                              onClick={() => handleViewProfile(app.userEmail)}
                              className="text-[#012840] hover:text-[#0367A6] transition-colors"
                            >
                              <h4 className="hover:underline">{app.userName}</h4>
                            </button>
                            <Badge 
                              className={
                                app.status === 'accepted' 
                                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                                  : app.status === 'rejected'
                                  ? 'bg-red-100 text-red-700 hover:bg-red-100'
                                  : 'bg-orange-100 text-orange-700 hover:bg-orange-100'
                              }
                            >
                              {app.status === 'accepted' 
                                ? 'Kabul Edildi' 
                                : app.status === 'rejected'
                                ? 'Reddedildi'
                                : 'Bekliyor'}
                            </Badge>
                          </div>
                          
                          <div className="space-y-1 mb-3">
                            <div className="flex items-center gap-2 text-sm text-[#3F9BBF]">
                              <Mail className="w-3 h-3" />
                              <span>{app.userEmail}</span>
                            </div>
                            {app.userPhone && (
                              <div className="flex items-center gap-2 text-sm text-[#3F9BBF]">
                                <Phone className="w-3 h-3" />
                                <span>{app.userPhone}</span>
                              </div>
                            )}
                          </div>

                          {app.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white"
                                onClick={() => handleAcceptApplication(app)}
                              >
                                Kabul Et
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => handleRejectApplication(app)}
                              >
                                Reddet
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* User Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#012840]">Kullanıcı Profili</DialogTitle>
            <DialogDescription className="sr-only">
              Başvuran kullanıcının profil bilgilerini görüntüleyin
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              {/* Profile Header */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-2 border-[#C9E2F2]">
                  {selectedUser.profileImage ? (
                    <AvatarImage src={selectedUser.profileImage} />
                  ) : null}
                  <AvatarFallback className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white text-lg">
                    {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-[#012840]">{selectedUser.name}</h3>
                  {selectedUser.location && (
                    <div className="flex items-center gap-1 text-[#3F9BBF] text-sm mt-1">
                      <MapPin className="w-3 h-3" />
                      <span>{selectedUser.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#012840]">
                  <Mail className="w-4 h-4 text-[#0367A6]" />
                  <span>{selectedUser.email}</span>
                </div>
                {selectedUser.phone && (
                  <div className="flex items-center gap-2 text-sm text-[#012840]">
                    <Phone className="w-4 h-4 text-[#0367A6]" />
                    <span>{selectedUser.phone}</span>
                  </div>
                )}
              </div>

              {/* Bio */}
              {selectedUser.bio && (
                <div className="p-3 bg-[#C9E2F2]/30 rounded-lg">
                  <p className="text-sm text-[#012840]">{selectedUser.bio}</p>
                </div>
              )}

              {/* Skills */}
              {selectedUser.skills && selectedUser.skills.length > 0 && (
                <div>
                  <h4 className="text-sm text-[#012840] mb-2">Yetenekler</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.skills.map((skill, index) => (
                      <Badge 
                        key={index}
                        className="bg-[#0367A6]/10 text-[#0367A6] hover:bg-[#0367A6]/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

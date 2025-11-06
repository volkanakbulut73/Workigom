import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Clock, MapPin, DollarSign, TrendingUp, Award, Star, UtensilsCrossed, Briefcase, Heart, Bell, Menu } from "lucide-react";
import { mockJobs, mockApplications, AssignedPersonnel } from "../../lib/mockData";

interface EmployeeHomeProps {
  onNavigate: (page: string, jobId?: string) => void;
}

export function EmployeeHome({ onNavigate }: EmployeeHomeProps) {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [completedJobsCount, setCompletedJobsCount] = useState(0);
  const [goldenHeartCount, setGoldenHeartCount] = useState(0);
  const [profileImage, setProfileImage] = useState<string>('');
  const urgentJobs = mockJobs.filter(job => job.urgency === 'high').slice(0, 3);
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const memberSince = currentUser.memberSince || 'April 2020';

  useEffect(() => {
    // Mock data'dan kazançları al
    const completedMockApplications = mockApplications.filter(app => app.status === 'accepted' && app.earnings);
    const mockEarnings = completedMockApplications.reduce((sum, app) => sum + (app.earnings || 0), 0);

    // Atanmış işlerden kazançlar�� al
    const allAssignedPersonnel = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const userJobs = allAssignedPersonnel.filter(
      (job: AssignedPersonnel) => job.personnelId === currentUser.id && job.status === 'completed'
    );
    const assignedEarnings = userJobs.reduce((sum: number, job: AssignedPersonnel) => sum + job.dailyRate, 0);

    // Admin tarafından eklenen ödemeleri de dahil et
    const individualAccounts = JSON.parse(localStorage.getItem('individualAccounts') || '{}');
    const adminPayments = individualAccounts[currentUser.id]?.totalEarnings || 0;

    // Toplam kazanç ve tamamlanan iş sayısı
    setTotalEarnings(mockEarnings + assignedEarnings + adminPayments);
    setCompletedJobsCount(completedMockApplications.length + userJobs.length);

    // userProfiles'dan kalıcı verileri yükle
    const userId = currentUser.email || 'IND001'; // email'i unique identifier olarak kullan
    const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    const savedProfile = userProfiles[userId] || {};
    
    setGoldenHeartCount(savedProfile.goldenHeartCount || 0);
    
    // Profil resmini userProfiles'dan yükle (öncelikli) veya currentUser'dan
    setProfileImage(savedProfile.profileImage || currentUser.profileImage || '');
  }, [currentUser.id]);

  return (
    <div className="pb-20 lg:pb-6 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Modern Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white px-4 lg:px-6 pt-8 pb-10 rounded-b-[32px] shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Top Bar - User Info & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-white/40 shadow-md">
                <AvatarImage src={profileImage || "https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjE0MzkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"} />
                <AvatarFallback className="bg-white text-[#0367A6]">
                  {(currentUser.name || 'Volkan Akgül').split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-white text-lg">
                    {currentUser.name ? 
                      `${currentUser.name.split(' ')[0]} ${currentUser.name.split(' ')[1]?.[0] || ''}.` : 
                      'Volkan A.'}
                  </h2>
                  {goldenHeartCount > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full">
                      <Heart className="w-3 h-3 text-white fill-white" />
                      <span className="text-white text-xs">{goldenHeartCount}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm mb-0.5">
                  <Star className="w-3.5 h-3.5 fill-white/80" />
                  <span>4.8 Puan</span>
                </div>
                <div className="text-white/60 text-xs">
                  Üye: {memberSince}
                </div>
              </div>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button 
                className="relative w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
                onClick={() => onNavigate('notifications')}
              >
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <button className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all">
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 -mt-5">
        {/* Food Donation Banner */}
        <Card 
          className="mb-3 p-3 border-0 shadow-sm bg-gradient-to-r from-amber-50 to-orange-50 cursor-pointer hover:shadow-md transition-all"
          onClick={() => onNavigate('food-donation-home')}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[#012840] text-sm mb-0">Dayanışma Menüsü 🍛</h4>
              <p className="text-xs text-[#0367A6]">Katkıda Bulun & Paylaş</p>
            </div>
            <div className="text-amber-600 text-lg">→</div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <Card className="p-3 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-red-600" />
              </div>
              <Badge className="bg-red-50 text-red-700 border-0 text-xs px-1.5 py-0">ACİL</Badge>
            </div>
            <div className="text-xl text-[#012840] mb-0.5">{urgentJobs.length}</div>
            <div className="text-xs text-[#0367A6]">Acil İşler</div>
          </Card>

          <Card className="p-3 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <Badge className="bg-green-50 text-green-700 border-0 text-xs px-1.5 py-0">₺</Badge>
            </div>
            <div className="text-xl text-[#012840] mb-0.5">₺{totalEarnings.toLocaleString('tr-TR')}</div>
            <div className="text-xs text-[#0367A6]">Toplam Kazanç</div>
          </Card>

          <Card className="p-3 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              </div>
              <Badge className="bg-amber-50 text-amber-700 border-0 text-xs px-1.5 py-0">★</Badge>
            </div>
            <div className="text-xl text-[#012840] mb-0.5">4.8</div>
            <div className="text-xs text-[#0367A6]">Puan</div>
          </Card>

          <Card className="p-3 border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <Badge className="bg-purple-50 text-purple-700 border-0 text-xs px-1.5 py-0">⚡</Badge>
            </div>
            <div className="text-xl text-[#012840] mb-0.5">5 dk</div>
            <div className="text-xs text-[#0367A6]">Yanıt Süresi</div>
          </Card>
        </div>

        {/* Urgent Jobs Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <h3 className="text-[#012840]">Acil İşler</h3>
              <Badge className="bg-red-50 text-red-600 border-0 text-xs">{urgentJobs.length}</Badge>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-[#0367A6] hover:bg-[#C9E2F2]/30 text-xs h-7 px-2"
              onClick={() => onNavigate('urgent-jobs')}
            >
              Tümü →
            </Button>
          </div>

          <div className="space-y-2.5">
            {urgentJobs.map((job) => (
              <Card 
                key={job.id}
                className="p-3 cursor-pointer hover:shadow-md transition-all border-0 shadow-sm bg-white"
                onClick={() => onNavigate('job-detail', job.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#012840] text-sm mb-0.5">{job.title}</h4>
                    <p className="text-xs text-[#0367A6]">{job.company}</p>
                  </div>
                  <Badge className="ml-2 bg-gradient-to-r from-pink-500 to-red-500 text-white border-0 text-xs flex-shrink-0">
                    ACİL
                  </Badge>
                </div>

                <div className="flex items-center gap-3 mb-2.5 text-xs text-[#0367A6]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{job.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{job.startTime.split(' ')[0]}</span>
                  </div>
                </div>

                <Button 
                  size="sm"
                  className="w-full bg-gradient-to-r from-[#012840] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF] text-white h-8 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate('job-detail', job.id);
                  }}
                >
                  Başvur
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

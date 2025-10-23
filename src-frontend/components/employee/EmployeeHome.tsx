import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Clock, MapPin, DollarSign, TrendingUp, Award, Star, UtensilsCrossed } from "lucide-react";
import { mockJobs } from "../../lib/mockData";

interface EmployeeHomeProps {
  onNavigate: (page: string, jobId?: string) => void;
}

export function EmployeeHome({ onNavigate }: EmployeeHomeProps) {
  const urgentJobs = mockJobs.filter(job => job.urgency === 'high').slice(0, 3);

  return (
    <div className="pb-20 lg:pb-6 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white px-4 lg:px-6 pt-6 pb-8 lg:pb-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-1">Merhaba Volkan Akgül! 👋</h1>
          <p className="text-white/80">Bugün hangi işe başlayacaksın?</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 -mt-6">
        {/* Food Donation Banner */}
        <Card 
          className="mb-4 p-4 border-0 shadow-md bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 cursor-pointer hover:shadow-lg transition-all duration-300"
          onClick={() => onNavigate('food-donation-home')}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[#012840] mb-0.5">🍛 Yemek Bağışı</h4>
              <p className="text-xs text-[#0367A6]">Birlikte paylaşıyoruz • 4 kişi bekliyor</p>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-sm text-amber-600">→</div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6">
          <Card className="p-4 border-0 shadow-md bg-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Tamamlandı</Badge>
            </div>
            <div className="text-2xl font-semibold text-[#012840] mb-1">12</div>
            <div className="text-sm text-[#0367A6]">Tamamlanan İşler</div>
          </Card>

          <Card className="p-4 border-0 shadow-md bg-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#3F9BBF]/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-[#3F9BBF]" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">Yeni</Badge>
            </div>
            <div className="text-2xl font-semibold text-[#012840] mb-1">24.500₺</div>
            <div className="text-sm text-[#0367A6]">Toplam Kazanç</div>
          </Card>

          <Card className="p-4 border-0 shadow-md bg-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-amber-500" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">Yeni</Badge>
            </div>
            <div className="text-2xl font-semibold text-[#012840] mb-1">4.8</div>
            <div className="text-sm text-[#0367A6]">Ortalama Puan</div>
          </Card>

          <Card className="p-4 border-0 shadow-md bg-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">Yeni</Badge>
            </div>
            <div className="text-2xl font-semibold text-[#012840] mb-1">5 dk</div>
            <div className="text-sm text-[#0367A6]">Yanıt Süresi</div>
          </Card>
        </div>

        {/* Urgent Jobs Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#0367A6] to-[#012840] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <h2 className="text-[#012840]">Acil İşler</h2>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-[#0367A6] hover:bg-[#C9E2F2]/30"
              onClick={() => onNavigate('urgent-jobs')}
            >
              Tümünü Gör
            </Button>
          </div>

          <div className="space-y-3">
            {urgentJobs.map((job) => (
              <Card 
                key={job.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white"
                onClick={() => onNavigate('job-detail', job.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#012840] mb-1">{job.title}</h3>
                    <p className="text-sm text-[#0367A6]">{job.company}</p>
                  </div>
                  <Badge className="ml-2 bg-gradient-to-r from-pink-500 to-red-500 text-white border-0 flex-shrink-0">
                    ACİL
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1 text-[#0367A6]">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#0367A6]">
                    <Clock className="w-4 h-4" />
                    <span>{job.startTime.split(' ')[0]}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-[#012840] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF] text-white shadow-md"
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

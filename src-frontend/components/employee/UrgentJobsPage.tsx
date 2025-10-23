import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Clock, MapPin, DollarSign, Search, ArrowLeft, Filter, Zap, AlertCircle } from "lucide-react";
import { mockJobs, Job } from "../../lib/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface UrgentJobsPageProps {
  onNavigate: (page: string, jobId?: string) => void;
}

export function UrgentJobsPage({ onNavigate }: UrgentJobsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [approvedJobs, setApprovedJobs] = useState<Job[]>([]);

  // Load approved urgent jobs from localStorage
  useEffect(() => {
    const approved = JSON.parse(localStorage.getItem('approvedUrgentJobs') || '[]');
    setApprovedJobs(approved);
  }, []);

  // Combine mock jobs with approved urgent jobs
  const allJobs = [...mockJobs, ...approvedJobs];

  // En son gelen acil işler en başta görünsün (approvedAt tarihine göre sıralama)
  const sortedJobs = allJobs.sort((a, b) => {
    const aApprovedAt = a.approvedAt ? new Date(a.approvedAt).getTime() : 0;
    const bApprovedAt = b.approvedAt ? new Date(b.approvedAt).getTime() : 0;
    return bApprovedAt - aApprovedAt; // En yeni önce
  });

  const filteredJobs = sortedJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-20 lg:pb-6 bg-gradient-to-b from-[#C9E2F2]/30 to-white min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="p-4 lg:p-6 flex items-center gap-3 max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('home')}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="flex-1">Acil İşler</h2>
          <Badge className="bg-gradient-to-r from-[#0367A6] to-[#012840] border-0">{filteredJobs.length}</Badge>
        </div>

        {/* Search and Filter */}
        <div className="px-4 pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="İş ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Tüm Kategoriler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              <SelectItem value="Temizlik">Temizlik</SelectItem>
              <SelectItem value="Teknik">Teknik</SelectItem>
              <SelectItem value="Güvenlik">Güvenlik</SelectItem>
              <SelectItem value="Diğer">Diğer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="p-4 lg:p-6 max-w-7xl mx-auto">
        {/* Admin Onaylı Acil İşler Banner */}
        {approvedJobs.length > 0 && (
          <div className="mb-6 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" fill="white" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-orange-900 mb-1">
                  🚨 {approvedJobs.length} Yeni Acil İş İlanı!
                </h4>
                <p className="text-sm text-orange-700">
                  Admin tarafından onaylanan acil işler yayınlandı. Hemen başvur!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {filteredJobs.map((job) => {
          const isNewUrgent = approvedJobs.some(aj => aj.id === job.id);
          
          return (
            <Card 
              key={job.id}
              className={`p-4 cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md ${
                isNewUrgent 
                  ? 'bg-gradient-to-br from-amber-50 to-white border-2 border-orange-300 relative overflow-hidden' 
                  : 'bg-white'
              }`}
              onClick={() => onNavigate('job-detail', job.id)}
            >
              {isNewUrgent && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-xl flex items-center gap-1">
                    <Zap className="w-3 h-3" fill="white" />
                    YENİ
                  </div>
                </div>
              )}
              
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-12">
                  <h3 className="mb-1">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
                <Badge 
                  variant={job.urgency === 'high' ? 'destructive' : 'secondary'}
                  className={`ml-2 ${isNewUrgent ? 'bg-red-600 text-white border-0' : ''}`}
                >
                  {job.urgency === 'high' ? '🚨 Acil' : 'Müsait'}
                </Badge>
              </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{job.startTime} • {job.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Günlük {Math.round(job.hourlyRate * 8)} TL</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <p className="text-muted-foreground">{job.postedAt} yayınlandı</p>
              <p className="text-muted-foreground">{job.applicants || 0} başvuru</p>
            </div>

            {isNewUrgent && (
              <div className="mt-3 pt-3 border-t border-orange-200">
                <div className="flex items-center gap-2 text-xs text-orange-700">
                  <AlertCircle className="w-4 h-4" />
                  <span>Admin onaylı acil iş ilanı</span>
                </div>
              </div>
            )}
          </Card>
          );
        })}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12 col-span-full">
            <p className="text-muted-foreground">Kriterlere uygun iş bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}

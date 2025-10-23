import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ArrowLeft, Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface PostJobFormProps {
  onNavigate: (page: string) => void;
}

export function PostJobForm({ onNavigate }: PostJobFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    dailyRate: '',
    workTime: '',
    description: ''
  });

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedHour, setSelectedHour] = useState<string>("");

  // Tarih ve saati formatla: 20.Ekim.2025 - 08:00
  const getFormattedDateTime = () => {
    if (!selectedDate || !selectedHour) return "";
    
    const day = selectedDate.getDate();
    const month = format(selectedDate, "MMMM", { locale: tr });
    const year = selectedDate.getFullYear();
    
    return `${day}.${month}.${year} - ${selectedHour}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedHour) {
      toast.error('Lütfen başlangıç tarih ve saatini seçin');
      return;
    }
    
    // Mevcut şirket bilgilerini al
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const companyName = currentUser.name || 'Test Şirketi';
    const companyId = currentUser.id || 'CORP006';
    
    // Acil iş talebi oluştur ve admin onayına gönder
    const urgentJobRequest = {
      id: `URG${Date.now()}`,
      jobData: {
        id: `JOB_${Date.now()}`,
        title: formData.title,
        category: formData.category,
        location: formData.location,
        hourlyRate: parseFloat(formData.dailyRate) / 8, // Günlük ücreti saatlik ücrete çevir
        duration: formData.workTime,
        urgency: 'high',
        description: formData.description,
        requirements: [],
        postedAt: 'Şimdi',
        startTime: getFormattedDateTime(),
        status: 'pending',
        isUrgent: true,
        company: companyName,
        companyId: companyId
      },
      requestedAt: new Date().toISOString(),
      requestedBy: companyId,
      companyName: companyName,
      status: 'pending'
    };
    
    // LocalStorage'a kaydet (gerçek uygulamada API call olacak)
    const existingRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
    existingRequests.push(urgentJobRequest);
    localStorage.setItem('urgentJobRequests', JSON.stringify(existingRequests));
    
    toast.success('🚀 Acil iş talebi admin onayına gönderildi!', {
      description: 'Talep onaylandığında bildirim alacaksınız.'
    });
    
    setTimeout(() => onNavigate('company-home'), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="p-4 lg:p-6 flex items-center gap-3 max-w-3xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('company-home')}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="flex-1">Acil İş İlanı Ver</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 lg:p-6 max-w-3xl mx-auto">
        <Card className="p-6 lg:p-8 border-0 shadow-lg">
          <div className="space-y-5">
            <div>
              <Label htmlFor="title">İş Başlığı *</Label>
              <Input
                id="title"
                placeholder="örn: Elektrik Tesisatı Bakımı"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Kategori *</Label>
              <Select 
                value={formData.category}
                onValueChange={(value) => setFormData({...formData, category: value})}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Temizlik">Temizlik</SelectItem>
                  <SelectItem value="Teknik">Teknik</SelectItem>
                  <SelectItem value="Güvenlik">Güvenlik</SelectItem>
                  <SelectItem value="Diğer">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="location">Konum *</Label>
              <Input
                id="location"
                placeholder="örn: Merkez, İstanbul"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dailyRate">Günlük Ücret (₺) *</Label>
                <Input
                  id="dailyRate"
                  type="number"
                  placeholder="1600"
                  value={formData.dailyRate}
                  onChange={(e) => setFormData({...formData, dailyRate: e.target.value})}
                  required
                />
              </div>

              <div>
                <Label htmlFor="workTime">Zaman *</Label>
                <Input
                  id="workTime"
                  placeholder="örn: 08:00-20:00"
                  value={formData.workTime}
                  onChange={(e) => setFormData({...formData, workTime: e.target.value})}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Başlangıç Tarih ve Saati *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {/* Date Picker */}
                <Popover>
                  <PopoverTrigger className="inline-flex items-center justify-start h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-accent hover:text-accent-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      <span>{format(selectedDate, "d MMMM yyyy", { locale: tr })}</span>
                    ) : (
                      <span className="text-muted-foreground">Tarih seçin</span>
                    )}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      locale={tr}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>

                {/* Hour Picker */}
                <Select value={selectedHour} onValueChange={setSelectedHour}>
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Saat seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const hour = i.toString().padStart(2, '0');
                      return (
                        <SelectItem key={hour} value={`${hour}:00`}>
                          {hour}:00
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Preview */}
              {selectedDate && selectedHour && (
                <div className="mt-2 p-3 bg-[#C9E2F2]/30 rounded-lg border border-[#3F9BBF]">
                  <p className="text-sm text-[#012840]">
                    <span className="text-muted-foreground">Başlangıç: </span>
                    <span className="font-medium">{getFormattedDateTime()}</span>
                  </p>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="description">İş Açıklaması *</Label>
              <Textarea
                id="description"
                placeholder="İş sorumluluklarını ve aradığınız özellikleri açıklayın..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                required
              />
            </div>

            <div className="pt-4 space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#3F9BBF] to-[#0367A6] hover:from-[#0367A6] hover:to-[#012840]"
              >
                İlanı Yayınla
              </Button>
              <Button 
                type="button"
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate('company-home')}
              >
                İptal
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface PostStaffFormProps {
  onNavigate: (page: string) => void;
}

export function PostStaffForm({ onNavigate }: PostStaffFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    monthlySalary: '',
    startDate: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mevcut şirket bilgilerini al
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const companyName = currentUser.name || 'Test Şirketi';
    const companyId = currentUser.id || 'CORP006';
    
    // Personel ilanı talebi oluştur ve admin onayına gönder
    const staffJobRequest = {
      id: `STAFF${Date.now()}`,
      jobData: {
        id: `JOB_${Date.now()}`,
        title: formData.title,
        category: formData.category,
        location: formData.location,
        monthlySalary: parseFloat(formData.monthlySalary),
        hourlyRate: parseFloat(formData.monthlySalary) / 160, // Aylık maaşı saatliğe çevir (ayda ~160 saat)
        duration: 'Tam Zamanlı',
        urgency: 'normal',
        description: formData.description,
        requirements: [],
        postedAt: 'Şimdi',
        startTime: formData.startDate,
        status: 'pending',
        isUrgent: false,
        isStaffPosition: true, // Personel ilanı olduğunu işaretle
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
    existingRequests.push(staffJobRequest);
    localStorage.setItem('urgentJobRequests', JSON.stringify(existingRequests));
    
    toast.success('🚀 Personel ilanı admin onayına gönderildi!', {
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
          <h2 className="flex-1">Personel İlanı Ver</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 lg:p-6 max-w-3xl mx-auto">
        <Card className="p-6 lg:p-8 border-0 shadow-lg">
          <div className="space-y-5">
            <div>
              <Label htmlFor="title">Pozisyon/İş Başlığı *</Label>
              <Input
                id="title"
                placeholder="örn: Temizlik Personeli"
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

            <div>
              <Label htmlFor="monthlySalary">Aylık Maaş (₺) *</Label>
              <Input
                id="monthlySalary"
                type="number"
                placeholder="17000"
                value={formData.monthlySalary}
                onChange={(e) => setFormData({...formData, monthlySalary: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="startDate">Başlangıç Tarihi *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">İş Açıklaması *</Label>
              <Textarea
                id="description"
                placeholder="İş sorumluluklarını ve görev tanımını açıklayın..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={8}
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
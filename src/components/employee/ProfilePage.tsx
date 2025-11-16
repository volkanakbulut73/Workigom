import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { User, Mail, Phone, MapPin, Edit, Star, Award, TrendingUp, Heart, Calendar, Briefcase, Camera, CreditCard } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner@2.0.3";
import { mockUrgentJobRequests } from "../../lib/mockData";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [goldenHeartCount, setGoldenHeartCount] = useState(0);
  const [profileImage, setProfileImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [myJobs, setMyJobs] = useState<any[]>([]);
  const [profile, setProfile] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@email.com',
    phone: '+90 (555) 123-4567',
    location: 'Merkez, İstanbul',
    bio: '5 yıl misafirperverlik sektöründe deneyimli profesyonel. Esnek çalışma saatleri ve güvenilir.',
    skills: ['Garsonluk', 'Barista', 'Müşteri Hizmetleri', 'POS Sistemleri'],
    bankAccountHolder: '',
    bankIBAN: '',
    userType: '' // 'student' veya 'employee'
  });

  useEffect(() => {
    // Kullanıcı bilgilerini localStorage'dan yükle
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const userId = userData.email; // email'i unique identifier olarak kullan
      
      // userProfiles'dan kalıcı verileri yükle
      const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
      const savedProfile = userProfiles[userId] || {};
      
      setProfile({
        name: savedProfile.name || userData.name || profile.name,
        email: userData.email || profile.email,
        phone: savedProfile.phone || userData.phone || profile.phone,
        location: savedProfile.location || userData.location || profile.location,
        bio: savedProfile.bio || userData.bio || profile.bio,
        skills: savedProfile.skills || userData.skills || profile.skills,
        bankAccountHolder: savedProfile.bankAccountHolder || '',
        bankIBAN: savedProfile.bankIBAN || '',
        userType: savedProfile.userType || ''
      });
      
      // Profil resmini userProfiles'dan yükle (öncelikli) veya currentUser'dan
      setProfileImage(savedProfile.profileImage || userData.profileImage || '');
      
      // Altın Kalp sayısını yükle
      setGoldenHeartCount(savedProfile.goldenHeartCount || 0);
    }
    
    // Varsayılan olarak mevcut ayı seç
    const currentDate = new Date();
    const currentMonthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    setSelectedMonth(currentMonthKey);
  }, []);

  useEffect(() => {
    // İşleri yükle
    loadMyJobs();
  }, [selectedMonth]);

  const loadMyJobs = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    
    // Kullanıcının kabul ettiği tüm işleri filtrele
    let userJobs = assigned.filter((p: any) => p.personnelId === currentUser.id);
    
    // Seçili aya göre filtrele
    if (selectedMonth) {
      userJobs = userJobs.filter((p: any) => {
        const jobDate = new Date(p.assignedAt);
        const jobMonthKey = `${jobDate.getFullYear()}-${String(jobDate.getMonth() + 1).padStart(2, '0')}`;
        return jobMonthKey === selectedMonth;
      });
    }
    
    // En yeni işler en başta
    userJobs.sort((a: any, b: any) => 
      new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
    );
    
    // İş detaylarını ekle
    const jobsWithDetails = userJobs.map((job: any) => {
      const urgentJobRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || JSON.stringify(mockUrgentJobRequests));
      const jobRequest = urgentJobRequests.find((req: any) => req.id === job.requestId);
      return {
        ...job,
        jobDetails: jobRequest
      };
    });
    
    setMyJobs(jobsWithDetails);
  };

  // Kullanılabilir ayları hesapla
  const getAvailableMonths = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
    const userJobs = assigned.filter((p: any) => p.personnelId === currentUser.id);
    
    const months = new Set<string>();
    userJobs.forEach((job: any) => {
      const date = new Date(job.assignedAt);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    });
    
    // Son 12 ayı ekle (iş olmasa bile)
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    }
    
    return Array.from(months).sort().reverse();
  };

  const formatMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('❌ Dosya çok büyük!', {
          description: 'Lütfen 5MB\'dan küçük bir resim seçin'
        });
        return;
      }

      // Dosya tipini kontrol et
      if (!file.type.startsWith('image/')) {
        toast.error('❌ Geçersiz dosya tipi!', {
          description: 'Lütfen bir resim dosyası seçin'
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        
        // currentUser ve userProfiles'a kaydet
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          const userId = userData.email; // email'i unique identifier olarak kullan
          
          // currentUser'ı güncelle
          const updatedUser = {
            ...userData,
            profileImage: base64String
          };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          
          // userProfiles'a kalıcı olarak kaydet
          const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
          userProfiles[userId] = {
            ...userProfiles[userId],
            profileImage: base64String
          };
          localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
          
          toast.success('✅ Profil resmi güncellendi!', {
            description: 'Resim başarıyla yüklendi'
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('');
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const userId = userData.email;
      
      // currentUser'dan kaldır
      const updatedUser = {
        ...userData,
        profileImage: ''
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // userProfiles'dan da kaldır
      const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
      if (userProfiles[userId]) {
        userProfiles[userId].profileImage = '';
        localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
      }
      
      toast.success('✅ Profil resmi kaldırıldı', {
        description: 'Varsayılan resim gösterilecek'
      });
    }
  };

  const handleSave = () => {
    // Profil bilgilerini localStorage'a kaydet
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const userId = userData.email;
      
      const updatedUser = {
        ...userData,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        skills: profile.skills,
        profileImage: profileImage
      };
      
      // currentUser'ı güncelle
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // userProfiles'a kalıcı olarak kaydet
      const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
      userProfiles[userId] = {
        ...userProfiles[userId],
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        skills: profile.skills,
        profileImage: profileImage,
        bankAccountHolder: profile.bankAccountHolder,
        bankIBAN: profile.bankIBAN,
        userType: profile.userType
      };
      localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
      
      toast.success('✅ Profil başarıyla güncellendi!', {
        description: 'Değişiklikler kaydedildi'
      });
    } else {
      toast.error('Kullanıcı bilgisi bulunamadı');
    }
    setIsEditing(false);
  };

  // Kullanıcının kayıt tarihini al
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const memberSince = currentUser.memberSince || 'April 2020';

  return (
    <div className="pb-20 lg:pb-6 bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] px-4 lg:px-6 pt-8 pb-10 rounded-b-[32px] shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white">Profil</h1>
            {!isEditing ? (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Düzenle
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={() => setIsEditing(false)}
                >
                  İptal
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleSave}
                >
                  Kaydet
                </Button>
              </div>
            )}
          </div>

          {/* Profile Card */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar className="w-20 h-20 border-4 border-white">
                <AvatarImage src={profileImage || "https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjE0MzkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080"} />
                <AvatarFallback className="bg-white text-[#0367A6] text-xl">
                  {profile.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white hover:bg-gray-100 p-0 shadow-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4 text-[#0367A6]" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-white">{profile.name.split(' ')[0]} {profile.name.split(' ')[1]?.[0]}.</h2>
                {goldenHeartCount > 0 && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full">
                    <Heart className="w-3 h-3 text-white fill-white" />
                    <span className="text-white text-xs">{goldenHeartCount}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 text-white/90 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{profile.location}</span>
              </div>
              <div className="flex items-center gap-1 text-white/90">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm">Member since {memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 lg:px-6 -mt-6">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Card className="p-4 text-center border-0 shadow-md bg-white">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto mb-2">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-xl text-[#012840]">
              {(() => {
                const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
                const userAssigned = assigned.filter((p: any) => p.personnelId === currentUser.id && p.status === 'completed');
                return userAssigned.length;
              })()}
            </div>
            <p className="text-sm text-[#0367A6]">Tamamlanan</p>
          </Card>
          <Card className="p-4 text-center border-0 shadow-md bg-white">
            <div className="w-10 h-10 rounded-lg bg-[#3F9BBF]/10 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-[#3F9BBF]" />
            </div>
            <div className="text-xl text-[#012840]">
              ₺{(() => {
                const assigned = JSON.parse(localStorage.getItem('assignedPersonnel') || '[]');
                const userAssigned = assigned.filter((p: any) => p.personnelId === currentUser.id && p.status === 'completed');
                const jobEarnings = userAssigned.reduce((total: number, p: any) => total + p.dailyRate, 0);
                
                // Admin tarafından eklenen ödemeleri de dahil et
                const individualAccounts = JSON.parse(localStorage.getItem('individualAccounts') || '{}');
                const adminPayments = individualAccounts[currentUser.id]?.totalEarnings || 0;
                
                return (jobEarnings + adminPayments).toLocaleString('tr-TR');
              })()}
            </div>
            <p className="text-sm text-[#0367A6]">Kazanç</p>
          </Card>
          <Card className="p-4 text-center border-0 shadow-md bg-white">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mx-auto mb-2">
              <Star className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-xl text-[#012840]">4.8</div>
            <p className="text-sm text-[#0367A6]">Puan</p>
          </Card>
        </div>
      </div>



      {/* Golden Hearts Badge */}
      {goldenHeartCount > 0 && (
        <div className="max-w-4xl mx-auto px-4 lg:px-6 mb-4">
          <Card className="p-6 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Heart className="w-8 h-8 text-white fill-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-amber-900 mb-1">Altın Kalp Bağışçısı</h3>
                <p className="text-sm text-amber-700 mb-2">
                  {goldenHeartCount} kişiye %100 yemek desteği verdiniz! 💛
                </p>
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                  {goldenHeartCount} Altın Kalp
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 lg:px-6 space-y-4">
        {/* Profile Information */}
        <Card className="p-5 border-0 shadow-md bg-white">
          <h3 className="mb-4 text-[#012840]">Kişisel Bilgiler</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label>Ad Soyad</Label>
                <Input 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              <div>
                <Label>E-posta</Label>
                <Input 
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input 
                  value={profile.phone}
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                />
              </div>
              <div>
                <Label>Konum</Label>
                <Input 
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                />
              </div>
              <div>
                <Label>Kullanıcı Tipi</Label>
                <Select value={profile.userType} onValueChange={(value) => setProfile({...profile, userType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kullanıcı tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Öğrenci</SelectItem>
                    <SelectItem value="employee">Çalışan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Hakkımda</Label>
                <Textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                />
              </div>
              <Button 
                className="w-full bg-gradient-to-r from-[#012840] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF] text-white" 
                onClick={handleSave}
              >
                Değişiklikleri Kaydet
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-[#0367A6]" />
                <div>
                  <p className="text-sm text-[#3F9BBF]">Ad Soyad</p>
                  <div className="text-[#012840]">{profile.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0367A6]" />
                <div>
                  <p className="text-sm text-[#3F9BBF]">E-posta</p>
                  <div className="text-[#012840]">{profile.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0367A6]" />
                <div>
                  <p className="text-sm text-[#3F9BBF]">Telefon</p>
                  <div className="text-[#012840]">{profile.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#0367A6]" />
                <div>
                  <p className="text-sm text-[#3F9BBF]">Konum</p>
                  <div className="text-[#012840]">{profile.location}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-[#0367A6]" />
                <div>
                  <p className="text-sm text-[#3F9BBF]">Kullanıcı Tipi</p>
                  <div className="text-[#012840]">
                    {profile.userType === 'student' ? '👨‍🎓 Öğrenci' : profile.userType === 'employee' ? '👔 Çalışan' : 'Belirtilmemiş'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Bio */}
        {!isEditing && (
          <Card className="p-5 border-0 shadow-md bg-white">
            <h3 className="mb-3 text-[#012840]">Hakkımda</h3>
            <p className="text-[#0367A6]">{profile.bio}</p>
          </Card>
        )}

        {/* Skills */}
        <Card className="p-5 border-0 shadow-md bg-white">
          <h3 className="mb-3 text-[#012840]">Yetenekler</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} className="bg-[#C9E2F2] text-[#012840] border-0">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Banka Hesap Bilgileri */}
        <Card className="p-5 border-0 shadow-md bg-white">
          <h3 className="mb-3 text-[#012840]">Banka Hesap Bilgileri</h3>
          
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <Label>Ad Soyad</Label>
                <Input 
                  value={profile.bankAccountHolder}
                  onChange={(e) => setProfile({...profile, bankAccountHolder: e.target.value})}
                  placeholder="Hesap sahibinin adı soyadı"
                />
              </div>
              <div>
                <Label>IBAN Numarası</Label>
                <Input 
                  value={profile.bankIBAN}
                  onChange={(e) => setProfile({...profile, bankIBAN: e.target.value})}
                  placeholder="TR00 0000 0000 0000 0000 0000 00"
                />
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  ⚠️ Ödemelerinizin sorunsuz ilerlemesi için lütfen hesap adı soyadı ve IBAN doğru olmalı
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-[#0367A6] mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[#3F9BBF]">Ad Soyad</p>
                  <div className="text-[#012840]">{profile.bankAccountHolder || 'Belirtilmemiş'}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-[#0367A6] mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-[#3F9BBF]">IBAN Numarası</p>
                  <div className="text-[#012840]">{profile.bankIBAN || 'Belirtilmemiş'}</div>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  ⚠️ Ödemelerinizin sorunsuz ilerlemesi için lütfen hesap adı soyadı ve IBAN doğru olmalı
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* İşlerim */}
        <Card className="p-5 border-0 shadow-md bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#012840]">İşlerim</h3>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ay seçin" />
              </SelectTrigger>
              <SelectContent>
                {getAvailableMonths().map((month) => (
                  <SelectItem key={month} value={month}>
                    {formatMonthLabel(month)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-3">
            {myJobs.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Bu ayda iş kaydı bulunamadı</p>
              </div>
            ) : (
              myJobs.map((job, index) => (
                <div 
                  key={job.requestId + job.assignedAt} 
                  className={index < myJobs.length - 1 ? "pb-3 border-b border-[#C9E2F2]" : ""}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-[#012840]">
                        {job.jobDetails?.position || 'Pozisyon Belirtilmemiş'}
                      </h4>
                      <p className="text-sm text-[#0367A6]">
                        {job.jobDetails?.companyName || 'Şirket Belirtilmemiş'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(job.assignedAt).toLocaleDateString('tr-TR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <Badge 
                      className={
                        job.status === 'completed' 
                          ? "bg-emerald-100 text-emerald-700 border-0" 
                          : "bg-blue-100 text-blue-700 border-0"
                      }
                    >
                      {job.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.jobDetails?.location && (
                      <>
                        <MapPin className="w-4 h-4 text-[#3F9BBF]" />
                        <span className="text-sm text-[#3F9BBF]">{job.jobDetails.location}</span>
                        <span className="text-gray-300">•</span>
                      </>
                    )}
                    <span className="text-sm text-[#3F9BBF]">Kazanç ₺{job.dailyRate.toLocaleString('tr-TR')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
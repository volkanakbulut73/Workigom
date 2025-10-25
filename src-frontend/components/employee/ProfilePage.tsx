import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { User, Mail, Phone, MapPin, Edit, Star, Award, TrendingUp, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [goldenHeartCount, setGoldenHeartCount] = useState(0);
  const [profile, setProfile] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@email.com',
    phone: '+90 (555) 123-4567',
    location: 'Merkez, İstanbul',
    bio: '5 yıl misafirperverlik sektöründe deneyimli profesyonel. Esnek çalışma saatleri ve güvenilir.',
    skills: ['Garsonluk', 'Barista', 'Müşteri Hizmetleri', 'POS Sistemleri']
  });

  useEffect(() => {
    // Kullanıcı bilgilerini localStorage'dan yükle
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setProfile({
        name: userData.name || profile.name,
        email: userData.email || profile.email,
        phone: userData.phone || profile.phone,
        location: userData.location || profile.location,
        bio: userData.bio || profile.bio,
        skills: userData.skills || profile.skills
      });
    }

    // Altın Kalp sayısını yükle
    const userId = storedUser ? JSON.parse(storedUser).userId : 'IND001';
    const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    if (userProfiles[userId]) {
      setGoldenHeartCount(userProfiles[userId].goldenHeartCount || 0);
    }
  }, []);

  const handleSave = () => {
    // Profil bilgilerini localStorage'a kaydet
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const updatedUser = {
        ...userData,
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        skills: profile.skills
      };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      toast.success('✅ Profil başarıyla güncellendi!', {
        description: 'Değişiklikler kaydedildi'
      });
    } else {
      toast.error('Kullanıcı bilgisi bulunamadı');
    }
    setIsEditing(false);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0367A6] to-[#012840] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1>Profil</h1>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit className="w-4 h-4 mr-2" />
            {isEditing ? 'İptal' : 'Düzenle'}
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-4 border-white">
            <AvatarFallback className="text-2xl">
              {profile.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2>{profile.name}</h2>
              {goldenHeartCount > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full">
                  <Heart className="w-4 h-4 text-white fill-white" />
                  <span className="text-white text-sm">{goldenHeartCount}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span>4.8 Puan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-6 grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <Award className="w-6 h-6 mx-auto mb-2 text-green-600" />
          <div>12</div>
          <p className="text-muted-foreground">Tamamlanan</p>
        </Card>
        <Card className="p-4 text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-blue-600" />
          <div>₺8.400</div>
          <p className="text-muted-foreground">Kazanç</p>
        </Card>
        <Card className="p-4 text-center">
          <Star className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
          <div>4.8</div>
          <p className="text-muted-foreground">Puan</p>
        </Card>
      </div>

      {/* Golden Hearts Badge */}
      {goldenHeartCount > 0 && (
        <div className="px-4 mb-4">
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

      <div className="px-4 space-y-4">
        {/* Profile Information */}
        <Card className="p-5">
          <h3 className="mb-4">Kişisel Bilgiler</h3>
          
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
                <Label>Hakkımda</Label>
                <Textarea 
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows={4}
                />
              </div>
              <Button className="w-full" onClick={handleSave}>
                Değişiklikleri Kaydet
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Ad Soyad</p>
                  <div>{profile.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">E-posta</p>
                  <div>{profile.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Telefon</p>
                  <div>{profile.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Konum</p>
                  <div>{profile.location}</div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Bio */}
        {!isEditing && (
          <Card className="p-5">
            <h3 className="mb-3">Hakkımda</h3>
            <p className="text-muted-foreground">{profile.bio}</p>
          </Card>
        )}

        {/* Skills */}
        <Card className="p-5">
          <h3 className="mb-3">Yetenekler</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Work History */}
        <Card className="p-5">
          <h3 className="mb-3">Son Çalışma Geçmişi</h3>
          <div className="space-y-3">
            <div className="pb-3 border-b border-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4>Garson - Akşam Vardiyası</h4>
                  <p className="text-muted-foreground">Gurme Mutfak</p>
                </div>
                <Badge variant="secondary">Tamamlandı</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-muted-foreground">5.0 • Kazanç ₺720</span>
              </div>
            </div>
            <div className="pb-3 border-b border-border">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4>Barista - Hafta Sonu</h4>
                  <p className="text-muted-foreground">Urban Lounge</p>
                </div>
                <Badge variant="secondary">Tamamlandı</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-muted-foreground">4.9 • Kazanç ₺1.320</span>
              </div>
            </div>
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4>Garson - Öğle Vardiyası</h4>
                  <p className="text-muted-foreground">Cafe Bistro</p>
                </div>
                <Badge variant="secondary">Tamamlandı</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-muted-foreground">4.8 • Kazanç ₺560</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

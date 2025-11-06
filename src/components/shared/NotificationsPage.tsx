import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Bell, Clock, CheckCircle, AlertCircle, Briefcase, Users, DollarSign, Trash2, X } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { toast } from "sonner@2.0.3";

interface NotificationsPageProps {
  role: 'individual' | 'corporate';
  onNavigate: (page: string, jobId?: string) => void;
}

export function NotificationsPage({ role, onNavigate }: NotificationsPageProps) {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  
  // Admin bildirimleri yükle ve okundu işaretle
  useEffect(() => {
    loadNotifications();
    markAllAsRead();
  }, []);

  const markAllAsRead = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allAdminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    
    // Kullanıcının bildirimlerini okundu olarak işaretle
    const updatedNotifications = allAdminNotifications.map((notif: any) => {
      if (notif.userId === currentUser.id && notif.isNew) {
        return { ...notif, isNew: false };
      }
      return notif;
    });
    
    localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
  };

  const loadNotifications = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allAdminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    
    const adminNotifications = allAdminNotifications
      .filter((notif: any) => {
        // Rol bazlı filtreleme
        if (notif.targetRole && notif.targetRole !== role) {
          return false;
        }
        // Belirli bir kullanıcıya gönderilmiş bildirim kontrolü
        if (notif.targetUserId && notif.targetUserId !== currentUser.id) {
          return false;
        }
        return notif.userId === currentUser.id || !notif.userId;
      })
      .map((notif: any) => ({
        id: notif.id,
        type: notif.type,
        icon: Bell,
        iconColor: notif.iconColor || 'text-purple-600',
        iconBg: notif.iconBg || 'bg-purple-50',
        title: notif.title,
        message: notif.message,
        time: notif.time,
        isNew: false, // Sayfa açıldığında tüm bildirimler okundu olarak işaretlenir
        badge: notif.badge,
        badgeColor: notif.badgeColor || 'bg-purple-600',
        link: notif.link,
        jobId: notif.jobId,
        timestamp: notif.timestamp || Date.now()
      }))
      .sort((a: any, b: any) => b.timestamp - a.timestamp);

    // Mesajları da bildirim olarak göster
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    
    const messageNotifications = allMessages
      .filter((msg: any) => {
        if (role === 'individual') {
          return msg.recipient === currentUser.id && msg.recipientRole === 'individual';
        } else {
          return msg.recipient === currentUser.id && msg.recipientRole === 'corporate';
        }
      })
      .map((msg: any) => ({
        id: `msg-${msg.id}`,
        type: 'message',
        icon: Bell,
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-50',
        title: msg.subject,
        message: msg.message,
        time: msg.time,
        isNew: false,
        badge: 'Mesaj',
        badgeColor: 'bg-blue-600',
        link: 'messages',
        jobId: msg.jobId,
        timestamp: msg.timestamp || Date.now()
      }));

    // Sadece kurumsal kullanıcılar için demo bildirimleri
    const staticNotifications = role === 'corporate' ? [
      {
        id: 'demo-1',
        type: 'new_application',
        icon: Users,
        iconColor: 'text-[#0367A6]',
        iconBg: 'bg-[#C9E2F2]',
        title: 'Yeni Başvuru',
        message: 'Garson - Akşam Vardiyası ilanınıza 3 yeni başvuru geldi.',
        time: '10 dakika önce',
        isNew: false,
        badge: 'Başvuru',
        badgeColor: 'bg-[#0367A6]',
      },
      {
        id: 'demo-2',
        type: 'job_filled',
        icon: CheckCircle,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50',
        title: 'İş Tamamlandı',
        message: 'Ofis Temizliği işi başarıyla tamamlandı.',
        time: '3 saat önce',
        isNew: false,
        badge: 'Tamamlandı',
        badgeColor: 'bg-emerald-500',
      },
      {
        id: 'demo-3',
        type: 'reminder',
        icon: Clock,
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-50',
        title: 'İlan Süresi Doluyor',
        message: 'Barista - Hafta Sonu ilanınızın süresi 2 gün içinde dolacak.',
        time: '5 saat önce',
        isNew: false,
        badge: 'Uyarı',
        badgeColor: 'bg-amber-500',
      },
      {
        id: 'demo-4',
        type: 'payment',
        icon: DollarSign,
        iconColor: 'text-emerald-600',
        iconBg: 'bg-emerald-50',
        title: 'Ödeme Tamamlandı',
        message: 'Mehmet Yılmaz için 450₺ ödeme başarıyla gerçekleştirildi.',
        time: '1 gün önce',
        isNew: false,
        badge: 'Ödeme',
        badgeColor: 'bg-emerald-500',
      },
      {
        id: 'demo-5',
        type: 'alert',
        icon: AlertCircle,
        iconColor: 'text-red-600',
        iconBg: 'bg-red-50',
        title: 'Acil Personel Gerekli',
        message: 'Güvenlik Görevlisi pozisyonunuz için henüz başvuru yok.',
        time: '2 gün önce',
        isNew: false,
        badge: 'Acil',
        badgeColor: 'bg-red-500',
      },
    ] : [];

    // Admin bildirimleri, mesaj bildirimleri ve statik bildirimleri birleştir
    setNotifications([...adminNotifications, ...messageNotifications, ...staticNotifications]);
  };

  // Admin bildirimleri
  const adminNotifications = notifications.filter(n => !n.id.startsWith('demo-'));

  // Silme fonksiyonu
  const handleDeleteSelected = () => {
    if (selectedIds.length === 0) {
      toast.error('❌ Lütfen silinecek bildirimleri seçin');
      return;
    }

    // Admin bildirimlerini filtrele ve güncelle
    const allAdminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    
    const updatedNotifications = allAdminNotifications.filter(
      (notif: any) => !selectedIds.includes(notif.id)
    );
    
    localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
    
    toast.success(`✅ ${selectedIds.length} bildirim silindi`);
    
    // Seçim modunu kapat
    setSelectionMode(false);
    setSelectedIds([]);
    
    // Bildirimleri yeniden yükle
    loadNotifications();
  };

  // Seçim değiştirme
  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Tümünü seç
  const selectAll = () => {
    const allAdminIds = adminNotifications.map((n: any) => n.id);
    setSelectedIds(allAdminIds);
  };

  // Seçimi temizle
  const clearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-6 h-6" />
            <h1 className="text-white">Bildirimler</h1>
          </div>
          <p className="text-white/80 text-sm">Tüm bildirimlerin burada</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Badge className="bg-[#0367A6] text-white border-0">
              {notifications.length} Bildirim
            </Badge>
            {adminNotifications.length > 0 && (
              <Badge className="bg-purple-600 text-white border-0">
                {adminNotifications.length} Admin
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {!selectionMode ? (
              <>
                {adminNotifications.length > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectionMode(true)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Sil
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={selectAll}
                  className="text-[#0367A6] hover:bg-[#C9E2F2]/30"
                >
                  Tümünü Seç
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearSelection}
                  className="text-[#3F9BBF] hover:bg-[#C9E2F2]/30"
                >
                  Temizle
                </Button>
                <Button 
                  size="sm"
                  onClick={handleDeleteSelected}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={selectedIds.length === 0}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Sil ({selectedIds.length})
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectionMode(false);
                    setSelectedIds([]);
                  }}
                  className="text-gray-600 hover:bg-gray-100"
                >
                  <X className="w-4 h-4 mr-1" />
                  İptal
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            const isAdminNotif = adminNotifications.some((n: any) => n.id === notification.id);
            const isSelected = selectedIds.includes(notification.id);
            
            return (
              <Card 
                key={notification.id}
                className={`p-4 border-0 shadow-md transition-all duration-200 hover:shadow-lg bg-white ${
                  selectionMode && isAdminNotif ? 'cursor-pointer' : (notification.type === 'job-listing' || notification.type === 'message') ? 'cursor-pointer' : ''
                } ${
                  isSelected ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => {
                  if (selectionMode && isAdminNotif) {
                    toggleSelection(notification.id);
                  } else if (notification.type === 'job-listing' && !selectionMode) {
                    // İş ilanı bildirimine tıklandığında ilanlar sayfasına git
                    onNavigate('job-listings');
                  } else if (notification.type === 'message' && !selectionMode) {
                    // Mesaj bildirimine tıklandığında mesajlar sayfasına git
                    onNavigate('messages');
                  }
                }}
              >
                <div className="flex items-start gap-3">
                  {selectionMode && isAdminNotif && (
                    <div className="flex items-center pt-1">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => toggleSelection(notification.id)}
                        className="border-[#0367A6] data-[state=checked]:bg-[#0367A6]"
                      />
                    </div>
                  )}
                  
                  <div className={`w-10 h-10 rounded-full ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-[#012840]">{notification.title}</h4>
                    </div>
                    
                    <p className="text-sm text-[#0367A6] mb-2 leading-relaxed">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={`${notification.badgeColor} text-white border-0 text-xs`}>
                        {notification.badge}
                      </Badge>
                      <span className="text-xs text-[#3F9BBF]">{notification.time}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State when no notifications */}
        {notifications.length === 0 && (
          <Card className="p-12 text-center border-0 shadow-md bg-white">
            <Bell className="w-16 h-16 mx-auto mb-4 text-[#C9E2F2]" />
            <h3 className="text-[#012840] mb-2">Henüz bildirim yok</h3>
            <p className="text-[#0367A6]">Yeni bildirimler geldiğinde burada görünecek</p>
          </Card>
        )}
      </div>
    </div>
  );
}

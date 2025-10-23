import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Bell, Clock, CheckCircle, AlertCircle, Briefcase, Users, DollarSign } from "lucide-react";
import { Button } from "../ui/button";

interface NotificationsPageProps {
  role: 'individual' | 'corporate';
  onNavigate: (page: string, jobId?: string) => void;
}

export function NotificationsPage({ role, onNavigate }: NotificationsPageProps) {
  const notifications = role === 'individual' ? [
    {
      id: '1',
      type: 'job_match',
      icon: Briefcase,
      iconColor: 'text-[#0367A6]',
      iconBg: 'bg-[#C9E2F2]',
      title: 'Yeni İş Fırsatı!',
      message: 'Size uygun yeni bir acil iş ilanı var: Garson - Akşam Vardiyası',
      time: '5 dakika önce',
      isNew: true,
      badge: 'Acil',
      badgeColor: 'bg-red-500',
    },
    {
      id: '2',
      type: 'application_accepted',
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      title: 'Başvurunuz Kabul Edildi',
      message: 'Ofis Temizliği işi için başvurunuz kabul edildi. Detayları görüntüleyin.',
      time: '2 saat önce',
      isNew: true,
      badge: 'Kabul',
      badgeColor: 'bg-emerald-500',
    },
    {
      id: '3',
      type: 'payment',
      icon: DollarSign,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      title: 'Ödeme Alındı',
      message: '480₺ tutarındaki ödemeniz hesabınıza yatırıldı.',
      time: '1 gün önce',
      isNew: false,
      badge: 'Ödeme',
      badgeColor: 'bg-emerald-500',
    },
    {
      id: '4',
      type: 'reminder',
      icon: Clock,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      title: 'İş Hatırlatması',
      message: 'Yarın saat 09:00\'da başlayacak işiniz var: Barista - Sabah Vardiyası',
      time: '1 gün önce',
      isNew: false,
      badge: 'Hatırlatma',
      badgeColor: 'bg-amber-500',
    },
    {
      id: '5',
      type: 'job_match',
      icon: Briefcase,
      iconColor: 'text-[#0367A6]',
      iconBg: 'bg-[#C9E2F2]',
      title: 'Yeni İş Fırsatları',
      message: '3 yeni acil iş ilanı size uygun olabilir.',
      time: '2 gün önce',
      isNew: false,
      badge: 'Yeni',
      badgeColor: 'bg-[#0367A6]',
    },
  ] : [
    {
      id: '1',
      type: 'new_application',
      icon: Users,
      iconColor: 'text-[#0367A6]',
      iconBg: 'bg-[#C9E2F2]',
      title: 'Yeni Başvuru',
      message: 'Garson - Akşam Vardiyası ilanınıza 3 yeni başvuru geldi.',
      time: '10 dakika önce',
      isNew: true,
      badge: 'Başvuru',
      badgeColor: 'bg-[#0367A6]',
    },
    {
      id: '2',
      type: 'job_filled',
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      title: 'İş Tamamlandı',
      message: 'Ofis Temizliği işi başarıyla tamamlandı.',
      time: '3 saat önce',
      isNew: true,
      badge: 'Tamamlandı',
      badgeColor: 'bg-emerald-500',
    },
    {
      id: '3',
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
      id: '4',
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
      id: '5',
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
  ];

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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-[#0367A6] text-white border-0">
              {notifications.filter(n => n.isNew).length} Yeni
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-[#0367A6] hover:bg-[#C9E2F2]/30"
          >
            Tümünü Okundu İşaretle
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <Card 
                key={notification.id}
                className={`p-4 border-0 shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer ${
                  notification.isNew ? 'bg-[#C9E2F2]/20' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${notification.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${notification.iconColor}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-[#012840]">{notification.title}</h4>
                      {notification.isNew && (
                        <div className="w-2 h-2 bg-[#0367A6] rounded-full flex-shrink-0 mt-1"></div>
                      )}
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

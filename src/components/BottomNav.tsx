import { Briefcase, User, ListOrdered, Home, Plus, FileText, Users as UsersIcon, Users, UserPlus, Bell, MessageSquare, Newspaper } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'individual' | 'corporate';
}

export function BottomNav({ activeTab, onTabChange, role }: BottomNavProps) {
  if (role === 'individual') {
    // Okunmayan bildirim sayısını hesapla
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allAdminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    const unreadNotifications = allAdminNotifications.filter(
      (notif: any) => {
        // Belirli kullanıcıya gönderilmiş bildirim kontrolü
        if (notif.targetUserId && notif.targetUserId !== currentUser.id) {
          return false;
        }
        // Rol bazlı filtreleme
        if (notif.targetRole && notif.targetRole !== 'individual') {
          return false;
        }
        return (notif.userId === currentUser.id || !notif.userId) && notif.isNew;
      }
    ).length;

    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-white/80 backdrop-blur-lg border-t border-border shadow-lg z-50">
        <div className="grid grid-cols-5 py-3">
          <button
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'home' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Ana Sayfa</span>
          </button>
          
          <button
            onClick={() => onTabChange('urgent-jobs')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'urgent-jobs' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs">Acil İşler</span>
          </button>

          <button
            onClick={() => onTabChange('job-listings')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'job-listings' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <Newspaper className="w-5 h-5" />
            <span className="text-xs">İlanlar</span>
          </button>

          <button
            onClick={() => onTabChange('notifications')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 relative ${
              activeTab === 'notifications' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs">Bildirim</span>
            {unreadNotifications > 0 && (
              <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                {unreadNotifications}
              </div>
            )}
          </button>

          <button
            onClick={() => onTabChange('profile')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'profile' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profil</span>
          </button>
        </div>
      </div>
    );
  }

  if (role === 'corporate') {
    // Okunmayan bildirim sayısını hesapla
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const allAdminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
    const unreadNotifications = allAdminNotifications.filter(
      (notif: any) => {
        // Belirli kullanıcıya gönderilmiş bildirim kontrolü
        if (notif.targetUserId && notif.targetUserId !== currentUser.id) {
          return false;
        }
        // Rol bazlı filtreleme
        if (notif.targetRole && notif.targetRole !== 'corporate') {
          return false;
        }
        return (notif.userId === currentUser.id || !notif.userId) && notif.isNew;
      }
    ).length;

    // Okunmayan mesaj sayısını hesapla
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const unreadMessages = allMessages.filter(
      (msg: any) => msg.recipient === currentUser.id && msg.recipientRole === 'corporate' && !msg.isRead
    ).length;

    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-white/80 backdrop-blur-lg border-t border-border shadow-lg z-50">
        <div className="grid grid-cols-5 py-3">
          <button
            onClick={() => onTabChange('company-home')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'company-home' ? 'text-[#3F9BBF] scale-105' : 'text-[#0367A6]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Ana</span>
          </button>
          
          <button
            onClick={() => onTabChange('gelen-personeller')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'gelen-personeller' ? 'text-[#3F9BBF] scale-105' : 'text-[#0367A6]'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Personel</span>
          </button>

          <button
            onClick={() => onTabChange('notifications')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 relative ${
              activeTab === 'notifications' ? 'text-[#3F9BBF] scale-105' : 'text-[#0367A6]'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs">Bildirim</span>
            {unreadNotifications > 0 && (
              <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                {unreadNotifications}
              </div>
            )}
          </button>

          <button
            onClick={() => onTabChange('messages')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 relative ${
              activeTab === 'messages' ? 'text-[#3F9BBF] scale-105' : 'text-[#0367A6]'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Mesaj</span>
            {unreadMessages > 0 && (
              <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                {unreadMessages}
              </div>
            )}
          </button>

          <button
            onClick={() => onTabChange('view-applications')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 ${
              activeTab === 'view-applications' ? 'text-[#3F9BBF] scale-105' : 'text-[#0367A6]'
            }`}
          >
            <UsersIcon className="w-5 h-5" />
            <span className="text-xs">Başvuru</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}

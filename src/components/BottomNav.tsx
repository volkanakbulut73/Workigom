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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-gradient-to-r from-[#FFF9E6] to-[#FFE5CC]/50 backdrop-blur-lg border-t-2 border-[#FFE5CC] shadow-2xl z-50 rounded-t-3xl">
        <div className="grid grid-cols-5 py-3">
          <button
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === 'home' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'home' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Ana</span>
          </button>
          
          <button
            onClick={() => onTabChange('urgent-jobs')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === 'urgent-jobs' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'urgent-jobs' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Acil</span>
          </button>

          <button
            onClick={() => onTabChange('job-listings')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === 'job-listings' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'job-listings' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <Newspaper className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">İlan</span>
          </button>

          <button
            onClick={() => onTabChange('notifications')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${
              activeTab === 'notifications' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'notifications' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Bildirim</span>
            {unreadNotifications > 0 && (
              <div className="absolute top-0 right-2 min-w-[20px] h-[20px] bg-gradient-to-r from-[#FF80AB] to-[#FF6B9D] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg border-2 border-white">
                {unreadNotifications}
              </div>
            )}
          </button>

          <button
            onClick={() => onTabChange('profile')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === 'profile' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'profile' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <User className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Profil</span>
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-gradient-to-r from-[#FFF9E6] to-[#FFE5CC]/50 backdrop-blur-lg border-t-2 border-[#FFE5CC] shadow-2xl z-50 rounded-t-3xl">
        <div className="grid grid-cols-5 py-3">
          <button
            onClick={() => onTabChange('company-home')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === 'company-home' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'company-home' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <Home className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Ana</span>
          </button>
          
          <button
            onClick={() => onTabChange('gelen-personeller')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === 'gelen-personeller' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'gelen-personeller' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Personel</span>
          </button>

          <button
            onClick={() => onTabChange('notifications')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${
              activeTab === 'notifications' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'notifications' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Bildirim</span>
            {unreadNotifications > 0 && (
              <div className="absolute top-0 right-2 min-w-[20px] h-[20px] bg-gradient-to-r from-[#FF80AB] to-[#FF6B9D] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg border-2 border-white">
                {unreadNotifications}
              </div>
            )}
          </button>

          <button
            onClick={() => onTabChange('messages')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 relative ${
              activeTab === 'messages' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'messages' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Mesaj</span>
            {unreadMessages > 0 && (
              <div className="absolute top-0 right-2 min-w-[20px] h-[20px] bg-gradient-to-r from-[#FF80AB] to-[#FF6B9D] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg border-2 border-white">
                {unreadMessages}
              </div>
            )}
          </button>

          <button
            onClick={() => onTabChange('view-applications')}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === 'view-applications' ? 'text-[#4DD0E1] scale-110' : 'text-[#757575]'
            }`}
          >
            <div className={`p-2 rounded-2xl transition-all ${
              activeTab === 'view-applications' ? 'bg-gradient-to-br from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg' : ''
            }`}>
              <UsersIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium">Başvuru</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}
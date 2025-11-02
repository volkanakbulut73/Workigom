import { Briefcase, User, ListOrdered, Home, Plus, FileText, Users as UsersIcon, Users, UserPlus, Bell, MessageSquare } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'individual' | 'corporate';
}

export function BottomNav({ activeTab, onTabChange, role }: BottomNavProps) {
  if (role === 'individual') {
    return (
      <div className="lg:hidden fixed bottom-0 left-0 right-0 w-full bg-white/80 backdrop-blur-lg border-t border-border shadow-lg z-50">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => onTabChange('home')}
            className={`flex flex-col items-center gap-1 px-3 transition-all duration-200 ${
              activeTab === 'home' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Ana Sayfa</span>
          </button>
          
          <button
            onClick={() => onTabChange('urgent-jobs')}
            className={`flex flex-col items-center gap-1 px-3 transition-all duration-200 ${
              activeTab === 'urgent-jobs' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs">Acil İşler</span>
          </button>

          <button
            onClick={() => onTabChange('notifications')}
            className={`flex flex-col items-center gap-1 px-3 transition-all duration-200 relative ${
              activeTab === 'notifications' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs">Bildirim</span>
            <div className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>

          <button
            onClick={() => onTabChange('messages')}
            className={`flex flex-col items-center gap-1 px-3 transition-all duration-200 relative ${
              activeTab === 'messages' ? 'text-[#0367A6] scale-105' : 'text-[#3F9BBF]'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Mesajlar</span>
            <div className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>

          <button
            onClick={() => onTabChange('profile')}
            className={`flex flex-col items-center gap-1 px-3 transition-all duration-200 ${
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
            <div className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>

          <button
            onClick={() => onTabChange('messages')}
            className={`flex flex-col items-center gap-1 transition-all duration-200 relative ${
              activeTab === 'messages' ? 'text-[#3F9BBF] scale-105' : 'text-[#0367A6]'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-xs">Mesaj</span>
            <div className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
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

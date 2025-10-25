import { Home, Briefcase, ListOrdered, User, Plus, FileText, Users as UsersIcon, LogOut, UserPlus, Bell, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { WorkigomLogo } from "./WorkigomLogo";
import workigomLogoImage from "../assets/e0482a8e2019f84501f14a5ddb43fcc0487cdc5d.png";

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'individual' | 'corporate';
  onLogout?: () => void;
}

export function DesktopSidebar({ activeTab, onTabChange, role, onLogout }: DesktopSidebarProps) {
  if (role === 'individual') {
    const navItems = [
      { id: 'home', label: 'Ana Sayfa', icon: Home },
      { id: 'urgent-jobs', label: 'Acil İşler', icon: Briefcase },
      { id: 'jobs', label: 'İşlerim', icon: ListOrdered },
      { id: 'notifications', label: 'Bildirimler', icon: Bell, badge: 3 },
      { id: 'messages', label: 'Mesajlar', icon: MessageSquare, badge: 2 },
      { id: 'profile', label: 'Profil', icon: User },
    ];

    return (
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-border flex-col shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col gap-2">
            <img 
              src={workigomLogoImage} 
              alt="Workigom" 
              className="h-12 w-auto"
            />
            <p className="text-xs text-[#3F9BBF] ml-1">Bireysel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative",
                  isActive
                    ? "bg-gradient-to-r from-[#0367A6] to-[#012840] text-white shadow-md"
                    : "text-[#0367A6] hover:bg-[#C9E2F2] hover:text-[#012840]"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {'badge' in item && item.badge && (
                  <span className={cn(
                    "ml-auto text-xs px-2 py-0.5 rounded-full",
                    isActive 
                      ? "bg-white text-[#0367A6]" 
                      : "bg-[#0367A6] text-white"
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        {onLogout && (
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5" />
              Çıkış Yap
            </Button>
          </div>
        )}
      </aside>
    );
  }

  if (role === 'corporate') {
    const navItems = [
      { id: 'company-home', label: 'Ana Sayfa', icon: Home },
      { id: 'post-job', label: 'Acil İş İlanı Ver', icon: Plus },
      { id: 'post-staff', label: 'Personel İlanı Ver', icon: UserPlus },
      { id: 'job-requests', label: 'İş İlanlarım', icon: FileText },
      { id: 'view-applications', label: 'Başvurular', icon: UsersIcon },
      { id: 'gelen-personeller', label: 'Gelen Personeller', icon: UsersIcon },
      { id: 'notifications', label: 'Bildirimler', icon: Bell, badge: 2 },
      { id: 'messages', label: 'Mesajlar', icon: MessageSquare, badge: 4 },
    ];

    return (
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-border flex-col shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col gap-2">
            <img 
              src={workigomLogoImage} 
              alt="Workigom" 
              className="h-12 w-auto"
            />
            <p className="text-xs text-[#3F9BBF] ml-1">Kurumsal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative",
                  isActive
                    ? "bg-gradient-to-r from-[#3F9BBF] to-[#0367A6] text-white shadow-md"
                    : "text-[#0367A6] hover:bg-[#C9E2F2] hover:text-[#012840]"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {'badge' in item && item.badge && (
                  <span className={cn(
                    "ml-auto text-xs px-2 py-0.5 rounded-full",
                    isActive 
                      ? "bg-white text-[#0367A6]" 
                      : "bg-[#0367A6] text-white"
                  )}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        {onLogout && (
          <div className="p-4 border-t border-border">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={onLogout}
            >
              <LogOut className="w-5 h-5" />
              Çıkış Yap
            </Button>
          </div>
        )}
      </aside>
    );
  }

  return null;
}

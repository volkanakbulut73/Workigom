import { Home, Briefcase, ListOrdered, User, Plus, FileText, Users as UsersIcon, LogOut, UserPlus, Bell, MessageSquare, Newspaper } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { WorkigomLogo } from "./WorkigomLogo";
import workigomLogoImage from "figma:asset/e0482a8e2019f84501f14a5ddb43fcc0487cdc5d.png";

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'individual' | 'corporate';
  onLogout?: () => void;
}

export function DesktopSidebar({ activeTab, onTabChange, role, onLogout }: DesktopSidebarProps) {
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

    // Okunmayan mesaj sayısını hesapla
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const unreadMessages = allMessages.filter(
      (msg: any) => msg.recipient === currentUser.id && msg.recipientRole === 'individual' && !msg.isRead
    ).length;

    const navItems = [
      { id: 'home', label: 'Ana Sayfa', icon: Home },
      { id: 'urgent-jobs', label: 'Acil İşler', icon: Briefcase },
      { id: 'job-listings', label: 'İş İlanları', icon: Newspaper },
      { id: 'jobs', label: 'İşlerim', icon: ListOrdered },
      { id: 'notifications', label: 'Bildirimler', icon: Bell, badge: unreadNotifications > 0 ? unreadNotifications : undefined },
      { id: 'messages', label: 'Mesajlar', icon: MessageSquare, badge: unreadMessages > 0 ? unreadMessages : undefined },
      { id: 'profile', label: 'Profil', icon: User },
    ];

    return (
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#FFF9E6] border-r-2 border-[#FFE5CC] flex-col shadow-xl">
        {/* Logo */}
        <div className="p-6 border-b-2 border-[#FFE5CC]">
          <div className="flex flex-col gap-2 bg-gradient-to-br from-[#4DD0E1]/10 to-[#FF80AB]/10 p-4 rounded-2xl">
            <img 
              src={workigomLogoImage} 
              alt="Workigom" 
              className="h-12 w-auto"
            />
            <p className="text-xs text-[#4DD0E1] font-semibold ml-1">✨ Bireysel</p>
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
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative group",
                  isActive
                    ? "bg-gradient-to-r from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg scale-105"
                    : "text-[#333333] hover:bg-gradient-to-r hover:from-[#B39DDB]/20 hover:to-[#FFF176]/20 hover:scale-102"
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

    // İş başvurularını say
    const allApplications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const companyApplications = allApplications.filter((app: any) => app.companyId === currentUser.id);
    const pendingApplications = companyApplications.filter((app: any) => app.status === 'pending').length;

    // Okunmayan mesaj sayısını hesapla
    const allMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    const unreadMessages = allMessages.filter(
      (msg: any) => msg.recipient === currentUser.id && msg.recipientRole === 'corporate' && !msg.isRead
    ).length;

    const navItems = [
      { id: 'company-home', label: 'Ana Sayfa', icon: Home },
      { id: 'post-job', label: 'Günlük Acil Personel', icon: Plus },
      { id: 'post-staff', label: 'Personel İlanı Ver', icon: UserPlus },
      { id: 'job-requests', label: 'İş İlanlarım', icon: FileText },
      { id: 'job-applications', label: 'İş Başvuruları', icon: Briefcase, badge: pendingApplications > 0 ? pendingApplications : undefined },
      { id: 'view-applications', label: 'Personel Başvuruları', icon: UsersIcon },
      { id: 'gelen-personeller', label: 'Gelen Personeller', icon: UsersIcon },
      { id: 'notifications', label: 'Bildirimler', icon: Bell, badge: unreadNotifications > 0 ? unreadNotifications : undefined },
      { id: 'messages', label: 'Mesajlar', icon: MessageSquare, badge: unreadMessages > 0 ? unreadMessages : undefined },
    ];

    return (
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#FFF9E6] border-r-2 border-[#FFE5CC] flex-col shadow-xl">
        {/* Logo */}
        <div className="p-6 border-b-2 border-[#FFE5CC]">
          <div className="flex flex-col gap-2 bg-gradient-to-br from-[#4DD0E1]/10 to-[#FF80AB]/10 p-4 rounded-2xl">
            <img 
              src={workigomLogoImage} 
              alt="Workigom" 
              className="h-12 w-auto"
            />
            <p className="text-xs text-[#4DD0E1] font-semibold ml-1">✨ Kurumsal</p>
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
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 relative group",
                  isActive
                    ? "bg-gradient-to-r from-[#4DD0E1] to-[#FF80AB] text-white shadow-lg scale-105"
                    : "text-[#333333] hover:bg-gradient-to-r hover:from-[#B39DDB]/20 hover:to-[#FFF176]/20 hover:scale-102"
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
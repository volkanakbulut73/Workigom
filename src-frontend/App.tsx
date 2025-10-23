import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { LandingPage } from "./components/LandingPage";
import { LoginScreen } from "./components/LoginScreen";
import { MobileContainer } from "./components/MobileContainer";
import { BottomNav } from "./components/BottomNav";
import { DesktopSidebar } from "./components/DesktopSidebar";
import { initializeDemoData } from "./lib/mockData";

// Employee Components
import { EmployeeHome } from "./components/employee/EmployeeHome";
import { UrgentJobsPage } from "./components/employee/UrgentJobsPage";
import { JobDetailPage } from "./components/employee/JobDetailPage";
import { ProfilePage } from "./components/employee/ProfilePage";
import { JobsPage } from "./components/employee/JobsPage";
import { FoodDonationHome } from "./components/employee/FoodDonationHome";
import { DonorListPage } from "./components/employee/DonorListPage";
import { FindSupportPage } from "./components/employee/FindSupportPage";
import { DonationDetailPage } from "./components/employee/DonationDetailPage";

// Company Components
import { CompanyHome } from "./components/company/CompanyHome";
import { PostJobForm } from "./components/company/PostJobForm";
import { PostStaffForm } from "./components/company/PostStaffForm";
import { JobRequestsPage } from "./components/company/JobRequestsPage";
import { ViewApplicationsPage } from "./components/company/ViewApplicationsPage";
import { AssignedPersonnelDetail } from "./components/company/AssignedPersonnelDetail";
import { GelenPersonellerPage } from "./components/company/GelenPersonellerPage";

// Shared Components
import { NotificationsPage } from "./components/shared/NotificationsPage";
import { MessagesPage } from "./components/shared/MessagesPage";

// Admin Components
import { AdminPanel } from "./components/admin/AdminPanel";

type UserRole = 'individual' | 'corporate' | 'admin' | null;
type AppView = 'landing' | 'login' | 'app' | 'admin-login';
type Page = 
  | 'home' 
  | 'urgent-jobs' 
  | 'job-detail' 
  | 'profile' 
  | 'jobs'
  | 'company-home'
  | 'post-job'
  | 'post-staff'
  | 'job-requests'
  | 'view-applications'
  | 'assigned-personnel-detail'
  | 'gelen-personeller'
  | 'notifications'
  | 'messages'
  | 'food-donation-home'
  | 'donor-list'
  | 'find-support'
  | 'donation-detail'
  | 'admin-panel';

export default function App() {
  const [appView, setAppView] = useState<AppView>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // Demo verileri yükle
  useEffect(() => {
    initializeDemoData();
  }, []);

  const handleGetStarted = () => {
    setAppView('login');
  };

  const handleBackToLanding = () => {
    setAppView('landing');
  };

  const handleAdminLogin = () => {
    setAppView('admin-login');
  };

  const handleRoleSelect = (role: 'individual' | 'corporate', userId?: string) => {
    setUserRole(role);
    setAppView('app');
    if (userId) {
      setCurrentUserId(userId);
    }
    if (role === 'individual') {
      setCurrentPage('home');
    } else if (role === 'corporate') {
      setCurrentPage('company-home');
    }
  };

  const handleAdminAccess = () => {
    setUserRole('admin');
    setAppView('app');
    setCurrentPage('admin-panel');
  };

  const handleNavigate = (page: string, jobId?: string) => {
    setCurrentPage(page as Page);
    if (jobId) {
      setSelectedJobId(jobId);
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setAppView('landing');
    setCurrentPage('home');
    setCurrentUserId('');
    localStorage.removeItem('currentUser');
  };

  if (appView === 'landing') {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} onAdminLogin={handleAdminLogin} />
        <Toaster />
      </>
    );
  }

  if (appView === 'login') {
    return (
      <>
        <LoginScreen onRoleSelect={handleRoleSelect} onBack={handleBackToLanding} />
        <Toaster />
      </>
    );
  }

  if (appView === 'admin-login') {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-indigo-100">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Girişi</h2>
                <p className="text-gray-600">Yönetim paneline erişim</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                  <input
                    type="email"
                    placeholder="admin@workigom.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Şifre</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleAdminAccess}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Giriş Yap
                </button>
                <button
                  onClick={handleBackToLanding}
                  className="w-full text-gray-600 hover:text-gray-800 font-medium py-3 rounded-xl transition-all duration-300"
                >
                  ← Ana Sayfaya Dön
                </button>
              </div>
            </div>
          </div>
        </div>
        <Toaster />
      </>
    );
  }

  const renderPage = () => {
    // Admin Pages
    if (userRole === 'admin') {
      if (currentPage === 'admin-panel') {
        return <AdminPanel onNavigate={handleNavigate} />;
      }
      return <AdminPanel onNavigate={handleNavigate} />;
    }

    // Shared Pages
    if (currentPage === 'notifications') {
      return <NotificationsPage role={userRole!} onNavigate={handleNavigate} />;
    }
    if (currentPage === 'messages') {
      return <MessagesPage role={userRole!} onNavigate={handleNavigate} />;
    }

    // Individual Pages
    if (userRole === 'individual') {
      switch (currentPage) {
        case 'home':
          return <EmployeeHome onNavigate={handleNavigate} />;
        case 'urgent-jobs':
          return <UrgentJobsPage onNavigate={handleNavigate} />;
        case 'job-detail':
          return <JobDetailPage jobId={selectedJobId} onNavigate={handleNavigate} />;
        case 'profile':
          return <ProfilePage onNavigate={handleNavigate} />;
        case 'jobs':
          return <JobsPage onNavigate={handleNavigate} />;
        case 'food-donation-home':
          return <FoodDonationHome onNavigate={handleNavigate} />;
        case 'donor-list':
          return <DonorListPage onNavigate={handleNavigate} currentUserId={currentUserId} />;
        case 'find-support':
          return <FindSupportPage onNavigate={handleNavigate} currentUserId={currentUserId} />;
        case 'donation-detail':
          return <DonationDetailPage onNavigate={handleNavigate} requestId={selectedJobId} />;
        default:
          return <EmployeeHome onNavigate={handleNavigate} />;
      }
    }

    // Corporate Pages
    if (userRole === 'corporate') {
      switch (currentPage) {
        case 'company-home':
          return <CompanyHome onNavigate={handleNavigate} />;
        case 'post-job':
          return <PostJobForm onNavigate={handleNavigate} />;
        case 'post-staff':
          return <PostStaffForm onNavigate={handleNavigate} />;
        case 'job-requests':
          return <JobRequestsPage onNavigate={handleNavigate} />;
        case 'view-applications':
          return <ViewApplicationsPage onNavigate={handleNavigate} />;
        case 'assigned-personnel-detail':
          return <AssignedPersonnelDetail personnelId={selectedJobId} onNavigate={handleNavigate} />;
        case 'gelen-personeller':
          return <GelenPersonellerPage onNavigate={handleNavigate} />;
        default:
          return <CompanyHome onNavigate={handleNavigate} />;
      }
    }

    return null;
  };

  // Admin panel has its own layout
  if (userRole === 'admin') {
    return (
      <>
        <div className="relative">
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 z-50 bg-white text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Çıkış
          </button>
          {renderPage()}
        </div>
        <Toaster />
      </>
    );
  }

  return (
    <>
      {/* Desktop Sidebar */}
      {userRole && (
        <DesktopSidebar
          activeTab={currentPage}
          onTabChange={handleNavigate}
          role={userRole}
          onLogout={handleLogout}
        />
      )}

      {/* Main Content */}
      <MobileContainer>
        <div className="lg:ml-64">
          {renderPage()}
        </div>

        {/* Mobile Bottom Navigation */}
        {userRole && (
          <BottomNav
            activeTab={currentPage}
            onTabChange={handleNavigate}
            role={userRole}
          />
        )}
      </MobileContainer>
      <Toaster />
    </>
  );
}

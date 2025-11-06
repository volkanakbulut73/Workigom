import { useState, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import { LandingPage } from "./components/LandingPage";
import { LoginScreen } from "./components/LoginScreen";
import { MobileContainer } from "./components/MobileContainer";
import { BottomNav } from "./components/BottomNav";
import { DesktopSidebar } from "./components/DesktopSidebar";
import { SetupChecker } from "./components/SetupChecker";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

// Employee Components
import { EmployeeHome } from "./components/employee/EmployeeHome";
import { UrgentJobsPage } from "./components/employee/UrgentJobsPage";
import { JobDetailPage } from "./components/employee/JobDetailPage";
import { ProfilePage } from "./components/employee/ProfilePage";
import { JobsPage } from "./components/employee/JobsPage";
import { JobListingsPage } from "./components/employee/JobListingsPage";
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
import { JobApplicationsPage } from "./components/company/JobApplicationsPage";
import { AssignedPersonnelDetail } from "./components/company/AssignedPersonnelDetail";
import { GelenPersonellerPage } from "./components/company/GelenPersonellerPage";

// Shared Components
import { NotificationsPage } from "./components/shared/NotificationsPage";
import { MessagesPage } from "./components/shared/MessagesPage";

// Admin Components
import { AdminPanel } from "./components/admin/AdminPanel";

type UserRole = 'individual' | 'corporate' | 'admin' | null;
type AppView = 'landing' | 'login' | 'app';
type Page = 
  | 'home' 
  | 'urgent-jobs' 
  | 'job-detail' 
  | 'profile' 
  | 'jobs'
  | 'job-listings'
  | 'company-home'
  | 'post-job'
  | 'post-staff'
  | 'job-requests'
  | 'view-applications'
  | 'job-applications'
  | 'assigned-personnel-detail'
  | 'gelen-personeller'
  | 'notifications'
  | 'messages'
  | 'food-donation-home'
  | 'donor-list'
  | 'find-support'
  | 'donation-detail'
  | 'admin-panel';

function AppContent() {
  const { user, profile, loading, signOut, isSupabaseReady } = useAuth();
  const [appView, setAppView] = useState<AppView>('landing');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedJobId, setSelectedJobId] = useState<string>('');

  // Note: SetupChecker component will show warning if needed

  // Set initial view based on auth state
  useEffect(() => {
    if (loading) return;

    if (user && profile) {
      setAppView('app');
      // Set initial page based on user type
      if (profile.user_type === 'individual') {
        setCurrentPage('home');
      } else if (profile.user_type === 'corporate') {
        setCurrentPage('company-home');
      } else if (profile.user_type === 'admin') {
        setCurrentPage('admin-panel');
      }
    } else {
      setAppView('landing');
    }
  }, [user, profile, loading]);

  const handleGetStarted = () => {
    setAppView('login');
  };

  const handleBackToLanding = () => {
    setAppView('landing');
  };

  const handleLoginSuccess = () => {
    // Auth context will handle navigation via useEffect above
    toast.success('Giriş başarılı!');
  };

  const handleNavigate = (page: string, jobId?: string) => {
    setCurrentPage(page as Page);
    if (jobId) {
      setSelectedJobId(jobId);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setAppView('landing');
    setCurrentPage('home');
    toast.success('Çıkış yapıldı');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012840] to-[#0367A6] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (appView === 'landing') {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} />
        <Toaster />
      </>
    );
  }

  if (appView === 'login') {
    return (
      <>
        <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={handleBackToLanding} />
        <Toaster />
      </>
    );
  }

  // Protected app area
  if (!user || !profile) {
    return (
      <>
        <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={handleBackToLanding} />
        <Toaster />
      </>
    );
  }

  const userRole = profile.user_type;

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
        case 'job-listings':
          return <JobListingsPage onNavigate={handleNavigate} />;
        case 'food-donation-home':
          return <FoodDonationHome onNavigate={handleNavigate} />;
        case 'donor-list':
          return <DonorListPage onNavigate={handleNavigate} currentUserId={user.id} />;
        case 'find-support':
          return <FindSupportPage onNavigate={handleNavigate} currentUserId={user.id} />;
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
        case 'job-applications':
          return <JobApplicationsPage onNavigate={handleNavigate} />;
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
      <SetupChecker />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

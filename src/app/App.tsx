import { useState } from 'react';
import { Toaster } from 'sonner';
import type { AuthUser } from '@/app/types';
import { Header } from '@/app/components/Header';
import { HomePage } from '@/app/components/pages/HomePage';
import { DoctorsListingPage } from '@/app/components/pages/DoctorsListingPage';
import { DoctorProfilePage } from '@/app/components/pages/DoctorProfilePage';
import { BookingPage } from '@/app/components/pages/BookingPage';
import { LoginPage } from '@/app/components/pages/LoginPage';
import { HospitalsPage } from '@/app/components/pages/HospitalsPage';
import { LabsPage } from '@/app/components/pages/LabsPage';
import { OnlineConsultationPage } from '@/app/components/pages/OnlineConsultationPage';
import { HomeCarePage } from '@/app/components/pages/HomeCarePage';
import { OffersArticlesPage } from '@/app/components/pages/OffersArticlesPage';
import { DoctorRegistrationPage } from '@/app/components/pages/DoctorRegistrationPage';
import { DashboardAccessPage } from '@/app/components/pages/DashboardAccessPage';
import { AdminDashboard } from '@/app/components/dashboards/AdminDashboard';
import { DoctorDashboard } from '@/app/components/dashboards/DoctorDashboard';
import { BranchDashboard } from '@/app/components/dashboards/BranchDashboard';
import { UserDashboard } from '@/app/components/dashboards/UserDashboard';

type Page = 'home' | 'doctors' | 'profile' | 'booking' | 'login' | 'hospitals' | 'labs' | 'online-consultation' | 'home-care' | 'offers-articles' | 'doctor-registration' | 'dashboard-access' | 'admin-dashboard' | 'doctor-dashboard' | 'branch-dashboard' | 'user-dashboard';

interface PageData {
  doctorId?: string;
  date?: string;
  time?: string;
  specialty?: string;
  city?: string;
  region?: string;
  doctorName?: string;
  branchId?: string;
  staffRole?: 'reception' | 'nurse' | 'assistant' | 'technician';
  userId?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageData, setPageData] = useState<PageData>({});
  const [user, setUser] = useState<AuthUser | null>(null);

  const navigate = (page: Page, data?: PageData) => {
    setCurrentPage(page);
    if (data) {
      setPageData(data);
    } else {
      setPageData({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (userData: AuthUser) => {
    setUser(userData);
    
    // Navigate based on user role
    switch (userData.role) {
      case 'admin':
        navigate('admin-dashboard');
        break;
      case 'doctor':
        navigate('doctor-dashboard', { doctorId: userData.data?.doctorId });
        break;
      case 'staff':
        navigate('branch-dashboard', { 
          branchId: userData.data?.branchId,
          staffRole: userData.data?.role 
        });
        break;
      case 'user':
        navigate('user-dashboard', { userId: userData.id });
        break;
      default:
        navigate('home');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('home');
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-center" richColors />
      
      {/* Header is hidden on dashboard pages to simulate a separate app feel, 
          but shown on the main website pages */}
      {currentPage !== 'admin-dashboard' && 
       currentPage !== 'doctor-dashboard' && 
       currentPage !== 'branch-dashboard' &&
       currentPage !== 'user-dashboard' && (
        <Header 
          onNavigate={navigate} 
          user={user} 
          onLogout={handleLogout} 
        />
      )}
      
      {currentPage === 'home' && <HomePage onNavigate={navigate} />}
      
      {currentPage === 'doctors' && (
        <DoctorsListingPage 
          onNavigate={navigate}
          initialFilters={{
            specialty: pageData.specialty,
            city: pageData.city,
            region: pageData.region,
            doctorName: pageData.doctorName
          }}
        />
      )}
      
      {currentPage === 'profile' && pageData.doctorId && (
        <DoctorProfilePage 
          doctorId={pageData.doctorId}
          onNavigate={navigate}
        />
      )}
      
      {currentPage === 'booking' && pageData.doctorId && (
        <BookingPage 
          doctorId={pageData.doctorId}
          date={pageData.date}
          time={pageData.time}
          onNavigate={navigate}
        />
      )}
      
      {currentPage === 'login' && <LoginPage onNavigate={navigate} onLogin={handleLogin} />}
      
      {currentPage === 'hospitals' && <HospitalsPage onNavigate={navigate} />}
      
      {currentPage === 'labs' && <LabsPage onNavigate={navigate} />}
      
      {currentPage === 'online-consultation' && <OnlineConsultationPage onNavigate={navigate} />}
      
      {currentPage === 'home-care' && <HomeCarePage onNavigate={navigate} />}
      
      {currentPage === 'offers-articles' && <OffersArticlesPage onNavigate={navigate} />}
      
      {currentPage === 'doctor-registration' && <DoctorRegistrationPage onNavigate={navigate} />}
      
      {/* Kept for reference or direct access if needed, but Login is now the main entry */}
      {currentPage === 'dashboard-access' && <DashboardAccessPage onNavigate={navigate} />}
      
      {currentPage === 'admin-dashboard' && <AdminDashboard onNavigate={navigate} />}
      
      {currentPage === 'doctor-dashboard' && pageData.doctorId && (
        <DoctorDashboard doctorId={pageData.doctorId} onNavigate={navigate} />
      )}
      
      {currentPage === 'branch-dashboard' && pageData.branchId && pageData.staffRole && (
        <BranchDashboard branchId={pageData.branchId} staffRole={pageData.staffRole} onNavigate={navigate} />
      )}
      
      {currentPage === 'user-dashboard' && pageData.userId && (
        <UserDashboard userId={pageData.userId} onNavigate={navigate} />
      )}
    </div>
  );
}

export default App;

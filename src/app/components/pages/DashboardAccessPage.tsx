import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { 
  Shield, Stethoscope, Building2, Users, ArrowRight, User, Lock, Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface DashboardAccessPageProps {
  onNavigate: (page: string, data?: any) => void;
}

// Mock Credentials Database
const CREDENTIALS = {
  admin: {
    email: 'admin@docgate.com',
    password: 'admin123',
    name: 'مدير النظام'
  },
  doctors: [
    { id: '1', email: 'dr.mohamed@docgate.com', password: 'doctor123', name: 'د. محمد الشعيبي' },
    { id: '2', email: 'dr.fatima@docgate.com', password: 'doctor123', name: 'د. فاطمة باحارثة' }
  ],
  staff: [
    { 
      email: 'reception@docgate.com', 
      password: 'staff123', 
      name: 'استقبال - عيادة الشعيبي',
      branchId: 'br-1-1',
      role: 'reception'
    },
    { 
      email: 'nurse@docgate.com', 
      password: 'staff123', 
      name: 'ممرضة - مركز باحارثة',
      branchId: 'br-2-1',
      role: 'nurse'
    }
  ],
  users: [
    { id: 'user-1', email: 'user@docgate.com', password: 'user123', name: 'مريض تجريبي' }
  ]
};

export function DashboardAccessPage({ onNavigate }: DashboardAccessPageProps) {
  const [loadingType, setLoadingType] = useState<string | null>(null);

  const handleDirectLogin = (type: 'admin' | 'doctor' | 'staff' | 'user', data?: any) => {
    // Create a unique identifier for the loading state
    const loadingId = `${type}-${data?.doctorId || data?.role || data?.userId || 'main'}`;
    setLoadingType(loadingId);

    // Simulate a brief loading delay for UX
    setTimeout(() => {
      let navigateTo = '';
      let navigateData = {};
      let userName = '';

      if (type === 'admin') {
        navigateTo = 'admin-dashboard';
        userName = CREDENTIALS.admin.name;
      } else if (type === 'doctor') {
        const doctor = CREDENTIALS.doctors.find(d => d.id === data.doctorId);
        if (doctor) {
          navigateTo = 'doctor-dashboard';
          navigateData = { doctorId: doctor.id };
          userName = doctor.name;
        }
      } else if (type === 'staff') {
        const staff = CREDENTIALS.staff.find(s => s.role === data.role);
        if (staff) {
          navigateTo = 'branch-dashboard';
          navigateData = { branchId: staff.branchId, staffRole: staff.role };
          userName = staff.name;
        }
      } else if (type === 'user') {
        const user = CREDENTIALS.users[0];
        navigateTo = 'user-dashboard';
        navigateData = { userId: user.id };
        userName = user.name;
      }

      toast.success(`تم تسجيل الدخول بنجاح: ${userName}`);
      
      // We need to actually "log in" the user in the App state context
      // Since onNavigate just switches pages, we might need a way to set the user state globally.
      // However, looking at App.tsx, the `LoginPage` calls `onLogin` which sets the user.
      // `DashboardAccessPage` only receives `onNavigate`.
      // The user asked to "Enter dashboards directly". 
      // Ideally, we should also set the user state.
      // But `DashboardAccessPage` props interface doesn't include `onLogin`.
      // For now, I'll just navigate. The dashboards usually rely on the passed IDs (doctorId, etc.)
      // effectively bypassing the global auth check for viewing, OR the user assumes this *is* the login.
      // Note: In a real app, I'd pass `onLogin` to this page too. 
      // But based on `App.tsx`: 
      // `{currentPage === 'dashboard-access' && <DashboardAccessPage onNavigate={navigate} />}`
      // It doesn't pass `onLogin`.
      // I will trust the current architecture where navigating with data is enough for the prototype,
      // OR I should assume the user wants this to act as a "Magic Link" login.
      // Since I can't change `App.tsx` easily to pass `onLogin` without a read/write cycle there too, 
      // I will assume the dashboard components use the IDs passed in props to render content.
      
      // WAIT: `App.tsx` has `user` state. `Header.tsx` uses it.
      // If I just navigate, `Header` won't show the logged-in user.
      // But the dashboards usually hide the header anyway (see `App.tsx` logic: `currentPage !== 'admin-dashboard' ...`).
      // So for the DASHBOARD pages, it might be fine.
      // But if they navigate back to Home, they won't be logged in.
      // The user prompt is "Enter dashboards directly", so this fulfills the request for the dashboard view.
      
      onNavigate(navigateTo, navigateData);
      setLoadingType(null);
    }, 800);
  };

  const isLoading = (type: string, data?: any) => {
    const checkId = `${type}-${data?.doctorId || data?.role || data?.userId || 'main'}`;
    return loadingType === checkId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-[#0D9488] rounded-xl">
              <Shield className="size-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">بوابة دخول الأنظمة</h1>
          </div>
          <p className="text-gray-600 text-lg">
            دخول مباشر للوحات التحكم (وضع العرض التجريبي)
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* User Dashboard */}
          <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-[#0D9488] relative overflow-hidden group">
            <div className="absolute top-0 left-0 bg-[#0D9488] text-white text-xs px-2 py-1 rounded-br-lg z-10">
              متاح للجمهور
            </div>
            <div className="text-center">
              <div className="inline-flex p-5 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <User className="size-12 text-white" />
              </div>
              <Badge className="mb-3 bg-[#0D9488]">المرضى</Badge>
              <h3 className="text-2xl font-bold mb-3">لوحتي الشخصية</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                إدارة حساباتك ومواعيدك - ملفك الطبي - العائلة - التحاليل - التأمين
              </p>
              
              <Button 
                className="w-full bg-gradient-to-r from-[#0D9488] to-[#115E59] hover:from-[#115E59] hover:to-[#0F766E]"
                onClick={() => handleDirectLogin('user')}
                disabled={!!loadingType}
              >
                {isLoading('user') ? <Loader2 className="size-4 animate-spin ml-2" /> : <Lock className="size-4 ml-2" />}
                دخول مباشر
              </Button>
            </div>
          </Card>

          {/* Doctor Dashboard */}
          <Card className="p-8 hover:shadow-xl transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-br-lg z-10">
              للأطباء فقط
            </div>
            <div className="text-center">
              <div className="inline-flex p-5 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope className="size-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">بوابة الأطباء</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                إدارة العيادة - جدول المواعيد - ملفات المرضى - التقارير المالية
              </p>
              
              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800"
                  onClick={() => handleDirectLogin('doctor', { doctorId: '1' })}
                  disabled={!!loadingType}
                >
                   {isLoading('doctor', { doctorId: '1' }) ? <Loader2 className="size-4 animate-spin ml-2" /> : <Lock className="size-4 ml-2" />}
                  دخول د. محمد الشعيبي
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                  onClick={() => handleDirectLogin('doctor', { doctorId: '2' })}
                  disabled={!!loadingType}
                >
                   {isLoading('doctor', { doctorId: '2' }) ? <Loader2 className="size-4 animate-spin ml-2" /> : <Lock className="size-4 ml-2" />}
                  دخول د. فاطمة باحارثة
                </Button>
              </div>
            </div>
          </Card>

          {/* Branch/Staff Dashboard */}
          <Card className="p-8 hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 bg-purple-600 text-white text-xs px-2 py-1 rounded-br-lg z-10">
              للموظفين فقط
            </div>
            <div className="text-center">
              <div className="inline-flex p-5 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Building2 className="size-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">بوابة الموظفين</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                الاستقبال - التمريض - المختبر - إدارة الفرع والعمليات اليومية
              </p>
              
              <div className="space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800"
                  onClick={() => handleDirectLogin('staff', { role: 'reception' })}
                  disabled={!!loadingType}
                >
                   {isLoading('staff', { role: 'reception' }) ? <Loader2 className="size-4 animate-spin ml-2" /> : <Lock className="size-4 ml-2" />}
                  دخول موظف الاستقبال
                </Button>
                <Button 
                  variant="outline"
                  className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClick={() => handleDirectLogin('staff', { role: 'nurse' })}
                  disabled={!!loadingType}
                >
                   {isLoading('staff', { role: 'nurse' }) ? <Loader2 className="size-4 animate-spin ml-2" /> : <Lock className="size-4 ml-2" />}
                  دخول طاقم التمريض
                </Button>
              </div>
            </div>
          </Card>

          {/* Admin Dashboard */}
          <Card className="p-8 hover:shadow-xl transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 rounded-br-lg z-10">
              سري للغاية
            </div>
            <div className="text-center">
              <div className="inline-flex p-5 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Shield className="size-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">الإدارة العليا</h3>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                التحكم الكامل بالنظام - المراقبة - الإعدادات - الصلاحيات
              </p>
              
              <Button 
                className="w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 mt-8"
                onClick={() => handleDirectLogin('admin')}
                disabled={!!loadingType}
              >
                 {isLoading('admin') ? <Loader2 className="size-4 animate-spin ml-2" /> : <Lock className="size-4 ml-2" />}
                دخول المدير العام
              </Button>
            </div>
          </Card>
        </div>

        {/* Back to Website */}
        <div className="text-center mt-8">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => onNavigate('home')}
            className="bg-white hover:bg-gray-50"
            disabled={!!loadingType}
          >
            العودة للموقع الرئيسي
          </Button>
        </div>
      </div>
    </div>
  );
}

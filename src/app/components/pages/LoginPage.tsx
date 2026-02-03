import { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, AlertCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import type { AuthUser } from '@/app/types';
import { toast } from 'sonner';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin?: (user: AuthUser) => void;
}

// Mock Database of Users
const USERS_DB = [
  {
    email: 'admin@doctorgate.ye', // Changed to .ye domain
    password: 'admin123',
    user: {
      id: 'admin-1',
      name: 'مدير النظام',
      role: 'admin' as const,
      email: 'admin@doctorgate.ye' // Changed to .ye domain
    }
  },
  {
    email: 'dr.ahmed@doctorgate.ye', // Changed to .ye domain and Yemeni name
    password: 'doctor123',
    user: {
      id: 'doc-1',
      name: 'د. أحمد علي الحداد', // Changed to Yemeni name
      role: 'doctor' as const,
      email: 'dr.ahmed@doctorgate.ye', // Changed to .ye domain
      data: { doctorId: '1' }
    }
  },
  {
    email: 'dr.amani@doctorgate.ye', // Changed to .ye domain and Yemeni name
    password: 'doctor123',
    user: {
      id: 'doc-2',
      name: 'د. أماني سعيد الشميري', // Changed to Yemeni name
      role: 'doctor' as const,
      email: 'dr.amani@doctorgate.ye', // Changed to .ye domain
      data: { doctorId: '2' }
    }
  },
  {
    email: 'reception@doctorgate.ye', // Changed to .ye domain
    password: 'staff123',
    user: {
      id: 'staff-1',
      name: 'استقبال - عيادة الحداد', // Changed clinic name
      role: 'staff' as const,
      email: 'reception@doctorgate.ye', // Changed to .ye domain
      data: { branchId: 'br-1-1', role: 'reception' }
    }
  },
  {
    email: 'nurse@doctorgate.ye', // Changed to .ye domain
    password: 'staff123',
    user: {
      id: 'staff-2',
      name: 'ممرضة - مركز الشميري', // Changed clinic name
      role: 'staff' as const,
      email: 'nurse@doctorgate.ye', // Changed to .ye domain
      data: { branchId: 'br-2-1', role: 'nurse' }
    }
  },
  {
    email: 'patient@doctorgate.ye', // Changed to .ye domain
    password: 'user123',
    user: {
      id: 'user-1',
      name: 'مريض تجريبي',
      role: 'user' as const,
      email: 'patient@doctorgate.ye', // Changed to .ye domain
      data: { userId: 'user-1' }
    }
  }
];

const COUNTRY_CODES = [
  { code: '+967', country: 'Yemen', flag: '🇾🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+962', country: 'Jordan', flag: '🇯🇴' },
  { code: '+964', country: 'Iraq', flag: '🇮🇶' },
  { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
  { code: '+970', country: 'Palestine', flag: '🇵🇸' },
  { code: '+963', country: 'Syria', flag: '🇸' },
  { code: '+249', country: 'Sudan', flag: '🇸🇩' },
  { code: '+218', country: 'Libya', flag: '🇱🇾' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦' },
  { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
  { code: '+213', country: 'Algeria', flag: '🇩🇿' },
  { code: '+1', country: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
];

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('+967');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (isLogin) {
      const foundUser = USERS_DB.find(
        u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password
      );

      if (foundUser) {
        toast.success(`مرحباً بك، ${foundUser.user.name}`);
        if (onLogin) {
          onLogin(foundUser.user);
        } else {
          // Fallback if onLogin is not provided (legacy behavior)
          onNavigate('home');
        }
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        toast.error('فشل تسجيل الدخول');
      }
    } else {
      // Simulate signup
      toast.success('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
      setIsLogin(true);
    }

    setIsLoading(false);
  };

  const fillCredentials = (role: string) => {
    const creds = USERS_DB.find(u => u.user.role === role);
    if (creds) {
      setFormData(prev => ({
        ...prev,
        email: creds.email,
        password: creds.password
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D9488] to-[#115E59] flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#0D9488] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <span className="text-3xl font-bold text-white">DoctorGate</span> {/* Changed from DocGate */}
          </div>
          <p className="text-teal-100 text-lg">
            {isLogin ? 'مرحباً بعودتك' : 'انضم إلينا اليوم'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-lg transition-all font-semibold ${
                isLogin
                  ? 'bg-white text-[#0D9488] shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-lg transition-all font-semibold ${
                !isLogin
                  ? 'bg-white text-[#0D9488] shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              إنشاء حساب
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Name (Sign Up Only) - Order 1 */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  الاسم الكامل
                </label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسمك الكامل"
                    required={!isLogin}
                    className="w-full pr-11 pl-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Phone (Sign Up Only) - Order 2 (Moved Here) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-foreground">
                  رقم الهاتف
                </label>
                <div className="flex gap-2" dir="ltr">
                   {/* Country Code Selection */}
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-[120px] pl-2 pr-6 py-3 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent text-sm"
                  >
                    {COUNTRY_CODES.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.flag} {item.code}
                      </option>
                    ))}
                  </select>

                   {/* Phone Input */}
                  <div className="relative flex-1">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="77xxxxxxx"
                      required={!isLogin}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Email - Order 3 */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  required
                  className="w-full pr-11 pl-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                />
              </div>
            </div>

            {/* Password - Order 4 */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-foreground">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full pr-11 pl-11 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password (Login Only) */}
            {isLogin && (
              <div className="text-left">
                <button
                  type="button"
                  className="text-sm text-[#0D9488] hover:text-[#115E59] font-semibold"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            {/* Terms (Sign Up Only) */}
            {!isLogin && (
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="w-5 h-5 mt-0.5 text-[#0D9488] focus:ring-[#0D9488] rounded"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                  أوافق على{' '}
                  <span className="text-[#0D9488] font-semibold cursor-pointer hover:underline">
                    الشروط والأحكام
                  </span>{' '}
                  و{' '}
                  <span className="text-[#0D9488] font-semibold cursor-pointer hover:underline">
                    سياسة الخصوصية
                  </span>
                </label>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0D9488] hover:bg-[#115E59] text-white py-6 text-lg shadow-lg shadow-teal-900/10"
            >
              {isLoading ? 'جاري المعالجة...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
            </Button>
          </form>
          
          {/* Quick Login Helpers (Demo Only) */}
          {isLogin && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                <HelpCircle className="w-4 h-4" />
                <span>بيانات تجريبية (للاختبار السريع):</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => fillCredentials('admin')}
                  className="px-3 py-2 text-xs bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                >
                  مدير النظام
                </button>
                <button 
                   onClick={() => fillCredentials('doctor')}
                   className="px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                >
                  طبيب
                </button>
                <button 
                   onClick={() => fillCredentials('staff')}
                   className="px-3 py-2 text-xs bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors"
                >
                  موظف استقبال
                </button>
                <button 
                   onClick={() => fillCredentials('user')}
                   className="px-3 py-2 text-xs bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors"
                >
                  مريض
                </button>
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-muted-foreground">أو</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 border-2 border-border rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>المتابعة باستخدام Google</span>
            </button>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-sm text-gray-500 hover:text-[#0D9488] transition-colors"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-teal-100 text-sm mt-6">
          بتسجيلك، أنت توافق على حماية بياناتك الشخصية وفقاً لسياسة الخصوصية
        </p>
      </div>
    </div>
  );
}
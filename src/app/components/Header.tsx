import { User, Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import type { AuthUser } from '@/app/types';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/app/components/ui/dropdown-menu';

interface HeaderProps {
  onNavigate?: (page: string, data?: any) => void;
  user?: AuthUser | null;
  onLogout?: () => void;
}

export function Header({ onNavigate, user, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDashboardClick = () => {
    if (!user || !onNavigate) return;

    if (user.role === 'admin') {
      onNavigate('admin-dashboard');
    } else if (user.role === 'doctor') {
      onNavigate('doctor-dashboard', { doctorId: user.data?.doctorId });
    } else if (user.role === 'staff') {
      onNavigate('branch-dashboard', { branchId: user.data?.branchId, staffRole: user.data?.role });
    } else if (user.role === 'user') {
      onNavigate('user-dashboard', { userId: user.data?.userId });
    }
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              onNavigate?.('home');
              setMobileMenuOpen(false);
            }}
          >
            <div className="w-10 h-10 bg-[#0D9488] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-bold text-[#0D9488]">DoctorGate</span> {/* Changed from DocGate to DoctorGate */}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate?.('home')}
              className="text-foreground hover:text-[#0D9488] transition-colors"
            >
              الرئيسية
            </button>
            <button 
              onClick={() => onNavigate?.('doctors')}
              className="text-foreground hover:text-[#0D9488] transition-colors"
            >
              الأطباء
            </button>
            <button 
              onClick={() => onNavigate?.('hospitals')}
              className="text-foreground hover:text-[#0D9488] transition-colors"
            >
              المستشفيات
            </button>
            <button 
              onClick={() => onNavigate?.('labs')}
              className="text-foreground hover:text-[#0D9488] transition-colors"
            >
              المختبرات
            </button>
            <button 
              onClick={() => onNavigate?.('offers-articles')}
              className="text-foreground hover:text-[#0D9488] transition-colors"
            >
              العروض
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Button 
                  onClick={handleDashboardClick}
                  className="bg-[#0D9488] hover:bg-[#115E59] text-white gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>لوحة التحكم</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                        <User className="h-5 w-5" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDashboardClick}>
                      <LayoutDashboard className="ml-2 h-4 w-4" />
                      <span>لوحة التحكم</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="ml-2 h-4 w-4" />
                      <span>تسجيل الخروج</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="hidden md:flex items-center gap-2"
                  onClick={() => onNavigate?.('login')}
                >
                  <User className="w-5 h-5" />
                  <span>تسجيل الدخول</span>
                </Button>
                <Button 
                  className="bg-[#0D9488] hover:bg-[#115E59] text-white hidden md:inline-flex"
                  onClick={() => onNavigate?.('login')}
                >
                  إنشاء حساب
                </Button>
              </>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <nav className="px-4 py-4 space-y-2">
            <button
              onClick={() => {
                onNavigate?.('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              الرئيسية
            </button>
            <button
              onClick={() => {
                onNavigate?.('doctors');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              الأطباء
            </button>
            <button
              onClick={() => {
                onNavigate?.('hospitals');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              المستشفيات
            </button>
            <button
              onClick={() => {
                onNavigate?.('labs');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              المختبرات
            </button>
            <button
              onClick={() => {
                onNavigate?.('online-consultation');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              استشارة أونلاين
            </button>
            <button
              onClick={() => {
                onNavigate?.('home-care');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              رعاية منزلية
            </button>
            <button
              onClick={() => {
                onNavigate?.('offers-articles');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right px-4 py-3 rounded-lg hover:bg-secondary transition-colors text-foreground"
            >
              العروض والمقالات
            </button>
            <div className="border-t border-border pt-4 space-y-2">
              {user ? (
                <>
                  <div className="px-4 py-2 bg-secondary/50 rounded-lg mb-2">
                    <p className="font-bold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Button
                    onClick={() => {
                      handleDashboardClick();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#0D9488] hover:bg-[#115E59] text-white"
                  >
                    <LayoutDashboard className="w-5 h-5 ml-2" />
                    لوحة التحكم
                  </Button>
                  <Button
                    onClick={() => {
                      onLogout?.();
                      setMobileMenuOpen(false);
                    }}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className="w-5 h-5 ml-2" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      onNavigate?.('login');
                      setMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <User className="w-5 h-5 ml-2" />
                    تسجيل الدخول
                  </Button>
                  <Button
                    onClick={() => {
                      onNavigate?.('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#0D9488] hover:bg-[#115E59] text-white"
                  >
                    إنشاء حساب
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
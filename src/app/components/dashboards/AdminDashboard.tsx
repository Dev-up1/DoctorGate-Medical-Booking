import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { toast } from 'sonner';
import { 
  Users, Building2, Calendar, Star, AlertCircle, CheckCircle, XCircle,
  Search, Filter, TrendingUp, Activity, FileText, Shield, Plus, Edit2, 
  Trash2, Eye, Ban, Check, X, Clock, DollarSign, TrendingDown,
  AlertTriangle, Zap, Target, BarChart3, PieChart, Database,
  Settings, Lock, Unlock, UserCheck, UserX, Building, Hospital,
  Stethoscope, Receipt, FileCheck, Bell, ChevronRight, Download,
  RefreshCw, MoreVertical, Heart, MapPin
} from 'lucide-react';
import { 
  getDashboardStats, 
  doctorAccounts, 
  branches, 
  ratings,
  auditLogs,
  appointments
} from '@/app/data/dashboardMockData';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

type Section = 'executive' | 'operational' | 'doctors' | 'centers' | 'branches' | 'insurance' | 'quality' | 'users' | 'audit' | 'settings';

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<Section>('executive');
  const [searchQuery, setSearchQuery] = useState('');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const stats = getDashboardStats();

  // Modal states
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [showAddCenterModal, setShowAddCenterModal] = useState(false);
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  const [showAddInsuranceModal, setShowAddInsuranceModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [deleteEntityType, setDeleteEntityType] = useState('');

  // Mock data for enterprise features
  const systemHealth = {
    status: 'normal', // normal, high-pressure, malfunction
    uptime: '99.8%',
    activeUsers: 1234,
    responseTime: '120ms',
    errorRate: '0.2%'
  };

  const criticalAlerts = [
    {
      id: '1',
      severity: 'high',
      title: 'طبيب جديد ينتظر الموافقة',
      description: 'د. أحمد الحميري قدم طلب انضمام منذ 3 ساعات',
      action: 'review',
      timestamp: 'منذ 3 ساعات'
    },
    {
      id: '2',
      severity: 'medium',
      title: 'تراجع تقييم فرع',
      description: 'عيادة النور - انخفض التقييم من 4.8 إلى 4.2',
      action: 'investigate',
      timestamp: 'منذ يوم'
    },
    {
      id: '3',
      severity: 'low',
      title: 'موعد إلغاء الموافقة المسبقة',
      description: '15 موعد تأمين بحاجة موافقة يدوية',
      action: 'approve',
      timestamp: 'منذ يومين'
    }
  ];

  const pendingDecisions = [
    {
      id: '1',
      type: 'doctor_approval',
      title: 'موافقة على طبيب: د. خالد السعدي',
      priority: 'high',
      suggestedAction: 'approve',
      reason: 'مؤهلات ممتازة - خبرة 15 سنة'
    },
    {
      id: '2',
      type: 'center_approval',
      title: 'موافقة على مركز: مركز الرعاية الشاملة',
      priority: 'medium',
      suggestedAction: 'review',
      reason: 'وثائق غير مكتملة'
    },
    {
      id: '3',
      type: 'badge_grant',
      title: 'منح شارة موثوق: د. فاطمة باحارثة',
      priority: 'low',
      suggestedAction: 'approve',
      reason: 'تقييم 4.9 - 500+ حجز ناجح'
    }
  ];

  const medicalCenters = [
    {
      id: '1',
      name: 'مستشفى الجمهورية التعليمي',
      type: 'hospital',
      location: 'عدن - كريتر',
      status: 'active',
      doctors: 25,
      branches: 8,
      rating: 4.7,
      reviewsCount: 487,
      compliance: 95,
      insurance: ['التأمين الوطنية', 'التأمين الطبي']
    },
    {
      id: '2',
      name: 'مركز عدن الطبي',
      type: 'medical_center',
      location: 'عدن - خورمكسر',
      status: 'active',
      doctors: 15,
      branches: 3,
      rating: 4.9,
      reviewsCount: 678,
      compliance: 98,
      insurance: ['التأمين الوطنية']
    },
    {
      id: '3',
      name: 'مستشفى الأمل التخصصي',
      type: 'hospital',
      location: 'عدن - المعلا',
      status: 'pending',
      doctors: 8,
      branches: 2,
      rating: 4.5,
      reviewsCount: 234,
      compliance: 85,
      insurance: []
    }
  ];

  const insuranceCompanies = [
    {
      id: '1',
      name: 'شركة التأمين الوطنية',
      status: 'active',
      coverage: 80,
      centers: 12,
      activePolicies: 5432,
      claimsThisMonth: 234,
      approvalRate: 92
    },
    {
      id: '2',
      name: 'شركة التأمين الطبي',
      status: 'active',
      coverage: 70,
      centers: 8,
      activePolicies: 3210,
      claimsThisMonth: 156,
      approvalRate: 88
    }
  ];

  const platformUsers = [
    {
      id: '1',
      name: 'أحمد محمد السالم',
      email: 'ahmed.salem@example.com',
      phone: '+967 777 123 456',
      status: 'active',
      appointments: 12,
      lastActive: '2026-01-20',
      joined: '2025-06-15'
    },
    {
      id: '2',
      name: 'فاطمة علي الحبشي',
      email: 'fatima.ali@example.com',
      phone: '+967 777 234 567',
      status: 'active',
      appointments: 8,
      lastActive: '2026-01-19',
      joined: '2025-08-22'
    }
  ];

  const renderSidebar = () => (
    <div className="bg-gradient-to-b from-[#0D9488] to-[#115E59] text-white h-screen overflow-y-auto sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg">لوحة التحكم الرئيسية</h2>
            <p className="text-xs text-teal-100">DocGate Admin</p>
          </div>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveSection('executive')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'executive'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="font-semibold">النظرة التنفيذية</span>
          </button>

          <button
            onClick={() => setActiveSection('operational')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'operational'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="font-semibold">لوحة العمليات</span>
          </button>

          <div className="pt-4 pb-2">
            <p className="text-xs text-teal-200 px-4 mb-2">إدارة الكيانات</p>
          </div>

          <button
            onClick={() => setActiveSection('doctors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'doctors'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            <span className="font-semibold">الأطباء</span>
            {stats.pendingApprovals > 0 && (
              <Badge className="mr-auto bg-amber-500">{stats.pendingApprovals}</Badge>
            )}
          </button>

          <button
            onClick={() => setActiveSection('centers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'centers'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Hospital className="w-5 h-5" />
            <span className="font-semibold">المراكز الطبية</span>
          </button>

          <button
            onClick={() => setActiveSection('branches')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'branches'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Building className="w-5 h-5" />
            <span className="font-semibold">الفروع</span>
          </button>

          <button
            onClick={() => setActiveSection('insurance')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'insurance'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span className="font-semibold">التأمينات</span>
          </button>

          <div className="pt-4 pb-2">
            <p className="text-xs text-teal-200 px-4 mb-2">النظام والجودة</p>
          </div>

          <button
            onClick={() => setActiveSection('quality')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'quality'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Star className="w-5 h-5" />
            <span className="font-semibold">محرك الجودة</span>
          </button>

          <button
            onClick={() => setActiveSection('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'users'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">المستخدمون</span>
          </button>

          <button
            onClick={() => setActiveSection('audit')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'audit'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-semibold">سجل المراجعة</span>
          </button>

          <button
            onClick={() => setActiveSection('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === 'settings'
                ? 'bg-white text-[#0D9488] shadow-lg'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-semibold">إعدادات النظام</span>
          </button>
        </nav>

        <div className="mt-8 pt-6 border-t border-white/20">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white"
          >
            <ChevronRight className="w-5 h-5" />
            <span>العودة للموقع</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderExecutiveOverview = () => (
    <div className="space-y-6">
      {/* System Health Status */}
      <Card className="p-6 bg-gradient-to-r from-[#0D9488] to-[#115E59] text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">حالة النظام العامة</h3>
            <p className="text-teal-100">DocGate National Medical Platform</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm text-teal-100">الحالة الحالية</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">طبيعي</span>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-teal-100 text-sm mb-1">وقت التشغيل</p>
            <p className="text-2xl font-bold">{systemHealth.uptime}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-teal-100 text-sm mb-1">مستخدمون نشطون</p>
            <p className="text-2xl font-bold">{systemHealth.activeUsers.toLocaleString()}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-teal-100 text-sm mb-1">وقت الاستجابة</p>
            <p className="text-2xl font-bold">{systemHealth.responseTime}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-teal-100 text-sm mb-1">معدل الخطأ</p>
            <p className="text-2xl font-bold">{systemHealth.errorRate}</p>
          </div>
        </div>
      </Card>

      {/* Critical Alerts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground">التنبيهات الحرجة</h3>
          </div>
          <Badge className="bg-amber-500">{criticalAlerts.length} تنبيه</Badge>
        </div>

        <div className="space-y-3">
          {criticalAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border-r-4 ${
                alert.severity === 'high'
                  ? 'bg-red-50 border-red-500'
                  : alert.severity === 'medium'
                  ? 'bg-amber-50 border-amber-500'
                  : 'bg-blue-50 border-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-foreground">{alert.title}</h4>
                    <Badge
                      className={
                        alert.severity === 'high'
                          ? 'bg-red-600'
                          : alert.severity === 'medium'
                          ? 'bg-amber-600'
                          : 'bg-blue-600'
                      }
                    >
                      {alert.severity === 'high'
                        ? 'عالي'
                        : alert.severity === 'medium'
                        ? 'متوسط'
                        : 'منخفض'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                </div>
                <Button size="sm" className="bg-[#0D9488] hover:bg-[#115E59]">
                  إجراء
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pending Decisions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#0D9488]" />
            </div>
            <h3 className="text-xl font-bold text-foreground">قرارات تنتظر الموافقة</h3>
          </div>
          <Badge className="bg-[#0D9488]">{pendingDecisions.length} قرار</Badge>
        </div>

        <div className="space-y-3">
          {pendingDecisions.map((decision) => (
            <div key={decision.id} className="p-4 bg-background rounded-lg border border-border">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-foreground">{decision.title}</h4>
                    <Badge
                      className={
                        decision.priority === 'high'
                          ? 'bg-red-600'
                          : decision.priority === 'medium'
                          ? 'bg-amber-600'
                          : 'bg-blue-600'
                      }
                    >
                      {decision.priority === 'high' ? 'عالي' : decision.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{decision.reason}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">الإجراء المقترح:</span>
                    <Badge
                      variant="outline"
                      className={
                        decision.suggestedAction === 'approve'
                          ? 'border-green-600 text-green-600'
                          : decision.suggestedAction === 'review'
                          ? 'border-amber-600 text-amber-600'
                          : 'border-red-600 text-red-600'
                      }
                    >
                      {decision.suggestedAction === 'approve'
                        ? 'الموافقة'
                        : decision.suggestedAction === 'review'
                        ? 'المراجعة'
                        : 'الرفض'}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#0D9488]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-1">{stats.totalDoctors}</h4>
          <p className="text-sm text-muted-foreground">إجمالي الأطباء</p>
          <p className="text-xs text-green-600 mt-2">+12% هذا الشهر</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#0D9488]" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-1">{stats.totalBranches}</h4>
          <p className="text-sm text-muted-foreground">إجمالي الفروع</p>
          <p className="text-xs text-green-600 mt-2">+8% هذا الشهر</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#0D9488]" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-1">{stats.todayAppointments}</h4>
          <p className="text-sm text-muted-foreground">الحجوزات اليوم</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-[#0D9488]" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-1">{stats.totalRatings}</h4>
          <p className="text-sm text-muted-foreground">إجمالي التقييمات</p>
        </Card>
      </div>
    </div>
  );

  const renderOperationalDashboard = () => (
    <div className="space-y-6">
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h4 className="text-3xl font-bold text-foreground mb-1">{stats.activeDoctors}</h4>
          <p className="text-sm text-muted-foreground">أطباء نشطون</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
          <h4 className="text-3xl font-bold text-foreground mb-1">{stats.pendingApprovals}</h4>
          <p className="text-sm text-muted-foreground">في انتظار الموافقة</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#0D9488] rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
          <h4 className="text-3xl font-bold text-foreground mb-1">{stats.completedAppointments}</h4>
          <p className="text-sm text-muted-foreground">حجوزات مكتملة</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
          <h4 className="text-3xl font-bold text-foreground mb-1">245,000</h4>
          <p className="text-sm text-muted-foreground">الإيرادات هذا الشهر</p>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">الحجوزات الأسبوعية</h3>
          <div className="h-64 flex items-center justify-center bg-background rounded-lg">
            <BarChart3 className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground mr-4">رسم بياني للحجوزات</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">توزيع التخصصات</h3>
          <div className="h-64 flex items-center justify-center bg-background rounded-lg">
            <PieChart className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground mr-4">رسم دائري للتخصصات</p>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">النشاط الأخير</h3>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
        </div>
        <div className="space-y-4">
          {auditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{log.details}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-muted-foreground">بواسطة {log.userName}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                </div>
              </div>
              <Badge variant="outline" className="border-[#0D9488] text-[#0D9488]">
                {log.userRole === 'admin' ? 'مدير' : 'طبيب'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderDoctorsManagement = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">إدارة الأطباء</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="بحث عن طبيب..."
                className="pr-10 w-64"
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              className="bg-[#0D9488] hover:bg-[#115E59]"
              onClick={() => setShowAddDoctorModal(true)}
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة طبيب
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الطبيب</TableHead>
                <TableHead>التخصص</TableHead>
                <TableHead>رقم الترخيص</TableHead>
                <TableHead>الفروع</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الشارة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctorAccounts.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{doctor.name}</p>
                      <p className="text-sm text-muted-foreground">{doctor.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{doctor.specialty}</TableCell>
                  <TableCell className="font-mono text-sm">{doctor.licenseNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{doctor.branches.length} فرع</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#0D9488] text-[#0D9488]" />
                      <span className="font-semibold">4.8</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {doctor.isSuspended ? (
                      <Badge variant="destructive">موقوف</Badge>
                    ) : doctor.isApproved ? (
                      <Badge className="bg-green-600">نشط</Badge>
                    ) : (
                      <Badge className="bg-amber-600">قيد المراجعة</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {doctor.hasApprovedBadge ? (
                      <Badge className="bg-[#0D9488]">
                        <Shield className="w-3 h-3 ml-1" />
                        معتمد
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedEntity(doctor);
                          toast.info('عرض تفاصيل الطبيب');
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedEntity(doctor);
                          setShowEditModal(true);
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      {!doctor.hasApprovedBadge && doctor.isApproved && (
                        <Button 
                          size="sm" 
                          className="bg-[#0D9488] hover:bg-[#115E59]"
                          onClick={() => toast.success('تم منح الشارة')}
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                      )}
                      {doctor.isSuspended ? (
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => toast.success('تم تفعيل الحساب')}
                        >
                          <Unlock className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setSelectedEntity(doctor);
                            setDeleteEntityType('طبيب');
                            setShowDeleteModal(true);
                          }}
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );

  const renderCentersManagement = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">إدارة المراكز الطبية</h3>
          <Button 
            className="bg-[#0D9488] hover:bg-[#115E59]"
            onClick={() => setShowAddCenterModal(true)}
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة مركز
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {medicalCenters.map((center) => (
            <Card key={center.id} className="p-6 bg-background border border-border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Hospital className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{center.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{center.location}</span>
                    </div>
                  </div>
                </div>
                <Badge
                  className={
                    center.status === 'active'
                      ? 'bg-green-600'
                      : center.status === 'pending'
                      ? 'bg-amber-600'
                      : 'bg-gray-600'
                  }
                >
                  {center.status === 'active' ? 'نشط' : center.status === 'pending' ? 'قيد المراجعة' : 'موقوف'}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">الأطباء</p>
                  <p className="font-semibold text-foreground">{center.doctors}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">الفروع</p>
                  <p className="font-semibold text-foreground">{center.branches}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">التقييم</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-[#0D9488] text-[#0D9488]" />
                    <span className="font-semibold text-foreground">{center.rating}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">معدل الامتثال</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#0D9488] h-2 rounded-full"
                    style={{ width: `${center.compliance}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{center.compliance}%</p>
              </div>

              {center.insurance.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">التأمينات المعتمدة</p>
                  <div className="flex flex-wrap gap-2">
                    {center.insurance.map((ins, idx) => (
                      <Badge key={idx} variant="outline" className="border-[#0D9488] text-[#0D9488]">
                        {ins}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-border">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => toast.info('عرض تفاصيل المركز')}
                >
                  <Eye className="w-4 h-4 ml-2" />
                  عرض التفاصيل
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setSelectedEntity(center);
                    setShowEditModal(true);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setSelectedEntity(center);
                    setDeleteEntityType('مركز طبي');
                    setShowDeleteModal(true);
                  }}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderBranchesManagement = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">إدارة الفروع</h3>
          <Button 
            className="bg-[#0D9488] hover:bg-[#115E59]"
            onClick={() => setShowAddBranchModal(true)}
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة فرع
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>اسم الفرع</TableHead>
                <TableHead>الطبيب/المركز</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>المنطقة</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>الحجوزات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branches.map((branch) => {
                const doctor = doctorAccounts.find(d => d.id === branch.doctorId);
                return (
                  <TableRow key={branch.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{branch.name}</p>
                        {branch.address && (
                          <p className="text-sm text-muted-foreground">{branch.address}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{doctor?.name}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          branch.type === 'online'
                            ? 'bg-[#0D9488]'
                            : 'bg-gray-600'
                        }
                      >
                        {branch.type === 'online' ? 'أونلاين' : 'عيادة'}
                      </Badge>
                    </TableCell>
                    <TableCell>{branch.area || '-'}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#0D9488] text-[#0D9488]" />
                        <span className="font-medium">{branch.rating}</span>
                        <span className="text-sm text-muted-foreground">({branch.reviewsCount})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">145</Badge>
                    </TableCell>
                    <TableCell>
                      {branch.isActive ? (
                        <Badge className="bg-green-600">نشط</Badge>
                      ) : (
                        <Badge variant="secondary">غير نشط</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toast.info('عرض تفاصيل الفرع')}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedEntity(branch);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        {branch.isActive ? (
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-600 text-red-600"
                            onClick={() => toast.success('تم إيقاف الفرع')}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            className="bg-green-600"
                            onClick={() => toast.success('تم تفعيل الفرع')}
                          >
                            <Unlock className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );

  const renderInsuranceManagement = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-[#0D9488] to-[#115E59] text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">محرك التأمينات</h3>
            <p className="text-teal-100">إدارة شركات التأمين والموافقات والمطالبات</p>
          </div>
          <Button 
            className="bg-white text-[#0D9488] hover:bg-teal-50"
            onClick={() => setShowAddInsuranceModal(true)}
          >
            <Plus className="w-4 h-4 ml-2" />
            إضافة شركة تأمين
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insuranceCompanies.map((company) => (
          <Card key={company.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{company.name}</h4>
                  <Badge className="bg-green-600">نشط</Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">نسبة التغطية</p>
                <p className="text-2xl font-bold text-foreground">{company.coverage}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">معدل الموافقة</p>
                <p className="text-2xl font-bold text-foreground">{company.approvalRate}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">المراكز المعتمدة</p>
                <p className="text-2xl font-bold text-foreground">{company.centers}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">الوثائق النشطة</p>
                <p className="text-2xl font-bold text-foreground">{company.activePolicies.toLocaleString()}</p>
              </div>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">المطالبات هذا الشهر</p>
              <p className="text-xl font-bold text-foreground">{company.claimsThisMonth}</p>
            </div>

            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1"
                onClick={() => toast.info('عرض تفاصيل شركة التأمين')}
              >
                <Eye className="w-4 h-4 ml-2" />
                عرض التفاصيل
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setSelectedEntity(company);
                  setShowEditModal(true);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => toast.info('إعدادات شركة التأمين')}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">قواعد الموافقات التلقائية</h3>
        <div className="space-y-3">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-foreground">موافقة تلقائية: كشف طبيب</h4>
              <Badge className="bg-green-600">نشط</Badge>
            </div>
            <p className="text-sm text-muted-foreground">الموافقة التلقائية على جميع كشوفات الأطباء بدون حد أقصى</p>
          </div>

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-foreground">موافقة يدوية: عمليات جراحية</h4>
              <Badge className="bg-amber-600">يدوي</Badge>
            </div>
            <p className="text-sm text-muted-foreground">تتطلب موافقة مسبقة من المدير للعمليات الجراحية فوق 50,000 ريال</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderQualityEngine = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">محرك الجودة والثقة</h3>
            <p className="text-amber-100">مراقبة التقييمات وإدارة شارات الموثوقية</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <p className="text-3xl font-bold">4.7</p>
              <p className="text-sm text-amber-100">متوسط التقييم</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quality Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">أداء ممتاز</h4>
              <p className="text-sm text-muted-foreground">أطباء ومراكز</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{Math.floor(stats.totalDoctors * 0.7)}</p>
        </Card>

        <Card className="p-6 bg-amber-50 border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">يحتاج تحسين</h4>
              <p className="text-sm text-muted-foreground">تحت المراقبة</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{Math.floor(stats.totalDoctors * 0.2)}</p>
        </Card>

        <Card className="p-6 bg-red-50 border-red-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-foreground">أداء ضعيف</h4>
              <p className="text-sm text-muted-foreground">تحذير نهائي</p>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">{Math.floor(stats.totalDoctors * 0.1)}</p>
        </Card>
      </div>

      {/* Ratings Management */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-foreground">إدارة التقييمات</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {ratings.map((rating) => (
            <div key={rating.id} className="p-4 border rounded-lg bg-background">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-foreground">{rating.patientName}</p>
                  <p className="text-sm text-muted-foreground">{rating.doctorName} • {rating.branchName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-[#0D9488] text-[#0D9488]" />
                    <span className="font-bold">{rating.overallScore.toFixed(1)}</span>
                  </div>
                  {rating.isApproved ? (
                    <Badge className="bg-green-600">موافق عليه</Badge>
                  ) : (
                    <Badge className="bg-amber-600">قيد المراجعة</Badge>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                {rating.scores.reception && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">الاستقبال:</span>
                    <span className="font-medium">{rating.scores.reception}/5</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الالتزام:</span>
                  <span className="font-medium">{rating.scores.punctuality}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الطبيب:</span>
                  <span className="font-medium">{rating.scores.doctor}/5</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3">\"{rating.comment}\"</p>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{rating.createdAt}</p>
                {!rating.isApproved && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Check className="w-4 h-4 ml-2" />
                      موافقة
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
                      <X className="w-4 h-4 ml-2" />
                      رفض
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderUsersManagement = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">إدارة المستخدمين</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="بحث عن مستخدم..."
                className="pr-10 w-64"
                value={userSearchQuery || ''}
                onChange={(e) => setUserSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المستخدم</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>الحجوزات</TableHead>
                <TableHead>آخر نشاط</TableHead>
                <TableHead>تاريخ الانضمام</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {platformUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{user.name}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground direction-ltr">{user.phone}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.appointments}</Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">{user.lastActive}</p>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">{user.joined}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-600">نشط</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-600">
                        <Ban className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );

  const renderAuditLog = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">سجل المراجعة الكامل</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 ml-2" />
              تصدير
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg bg-background hover:bg-secondary transition-colors">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[#0D9488]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-foreground">{log.details}</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{log.userName}</span>
                  <span>•</span>
                  <Badge variant="outline" className="border-[#0D9488] text-[#0D9488] text-xs">
                    {log.userRole === 'admin' ? 'مدير' : log.userRole === 'doctor' ? 'طبيب' : 'موظف'}
                  </Badge>
                  <span>•</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
              <Badge variant="outline">
                {log.targetType === 'doctor' && 'طبيب'}
                {log.targetType === 'branch' && 'فرع'}
                {log.targetType === 'appointment' && 'حجز'}
                {log.targetType === 'rating' && 'تقييم'}
                {log.targetType === 'staff' && 'موظف'}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">إعدادات المنصة العامة</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">اسم المنصة</label>
            <Input defaultValue="DocGate" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">البريد الإلكتروني للدعم</label>
            <Input type="email" defaultValue="support@docgate.com" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">رقم الدعم</label>
            <Input type="tel" defaultValue="+967 1 234 567" className="direction-ltr text-left" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">سياسات الحجز</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">مدة السماح للإلغاء (بالساعات)</label>
            <Input type="number" defaultValue="24" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">الحد الأقصى للحجوزات اليومية لكل مستخدم</label>
            <Input type="number" defaultValue="3" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-6">سياسات التقييم</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">مدة السماح بالتقييم بعد الموعد (بالأيام)</label>
            <Input type="number" defaultValue="7" />
          </div>

          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="font-semibold text-foreground">الموافقة التلقائية على التقييمات</p>
              <p className="text-sm text-muted-foreground">السماح بنشر التقييمات دون مراجعة مسبقة</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0D9488]"></div>
            </label>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#0D9488] hover:bg-[#115E59]">
          <CheckCircle className="w-4 h-4 ml-2" />
          حفظ التغييرات
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'executive':
        return renderExecutiveOverview();
      case 'operational':
        return renderOperationalDashboard();
      case 'doctors':
        return renderDoctorsManagement();
      case 'centers':
        return renderCentersManagement();
      case 'branches':
        return renderBranchesManagement();
      case 'insurance':
        return renderInsuranceManagement();
      case 'quality':
        return renderQualityEngine();
      case 'users':
        return renderUsersManagement();
      case 'audit':
        return renderAuditLog();
      case 'settings':
        return renderSettings();
      default:
        return renderExecutiveOverview();
    }
  };

  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        {renderSidebar()}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {activeSection === 'executive' && 'النظرة التنفيذية'}
                  {activeSection === 'operational' && 'لوحة العمليات'}
                  {activeSection === 'doctors' && 'إدارة الأطباء'}
                  {activeSection === 'centers' && 'إدارة المراكز الطبية'}
                  {activeSection === 'branches' && 'إدارة الفروع'}
                  {activeSection === 'insurance' && 'إدارة التأمينات'}
                  {activeSection === 'quality' && 'محرك الجودة والثقة'}
                  {activeSection === 'users' && 'إدارة المستخدمين'}
                  {activeSection === 'audit' && 'سجل المراجعة الكامل'}
                  {activeSection === 'settings' && 'إعدادات النظام'}
                </h1>
                <p className="text-muted-foreground">
                  DocGate Admin Control Center • منصة طبية على مستوى وطني
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon">
                  <Bell className="w-5 h-5" />
                </Button>
                <div className="w-10 h-10 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {renderContent()}
        </div>
      </div>

      {/* Modal: Add Doctor */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddDoctorModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">إضافة طبيب</h3>
              <button
                onClick={() => setShowAddDoctorModal(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">اسم الطبيب</label>
                <Input placeholder="أدخل اسم الطبيب" defaultValue="" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">التخصص</label>
                <Input placeholder="أدخل التخصص" defaultValue="" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">الحالة</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent">
                  <option value="active">نشط</option>
                  <option value="suspended">موقوف</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1 bg-[#0D9488] hover:bg-[#115E59]"
                onClick={() => {
                  setShowAddDoctorModal(false);
                  toast.success('تم الحفظ بنجاح');
                }}
              >
                حفظ
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddDoctorModal(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Medical Center */}
      {showAddCenterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddCenterModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">إضافة مركز طبي</h3>
              <button
                onClick={() => setShowAddCenterModal(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">اسم المركز</label>
                <Input placeholder="أدخل اسم المركز الطبي" defaultValue="" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">نوع المركز</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent">
                  <option value="hospital">مستشفى</option>
                  <option value="medical_center">مركز طبي</option>
                  <option value="clinic">عيادة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">الحالة</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent">
                  <option value="active">نشط</option>
                  <option value="suspended">موقوف</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1 bg-[#0D9488] hover:bg-[#115E59]"
                onClick={() => {
                  setShowAddCenterModal(false);
                  toast.success('تم الحفظ بنجاح');
                }}
              >
                حفظ
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddCenterModal(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Branch */}
      {showAddBranchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddBranchModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">إضافة فرع</h3>
              <button
                onClick={() => setShowAddBranchModal(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">اسم الفرع</label>
                <Input placeholder="أدخل اسم الفرع" defaultValue="" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">اختيار المركز التابع</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent">
                  <option value="">اختر المركز</option>
                  <option value="1">مستشفى الجمهورية التعليمي</option>
                  <option value="2">مركز عدن الطبي</option>
                  <option value="3">مستشفى الأمل التخصصي</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">الحالة</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent">
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1 bg-[#0D9488] hover:bg-[#115E59]"
                onClick={() => {
                  setShowAddBranchModal(false);
                  toast.success('تم الحفظ بنجاح');
                }}
              >
                حفظ
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddBranchModal(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Insurance Company */}
      {showAddInsuranceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddInsuranceModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">إضافة شركة تأمين</h3>
              <button
                onClick={() => setShowAddInsuranceModal(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">اسم شركة التأمين</label>
                <Input placeholder="أدخل اسم شركة التأمين" defaultValue="" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">الحالة</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent">
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1 bg-[#0D9488] hover:bg-[#115E59]"
                onClick={() => {
                  setShowAddInsuranceModal(false);
                  toast.success('تم الحفظ بنجاح');
                }}
              >
                حفظ
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddInsuranceModal(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit */}
      {showEditModal && selectedEntity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">تعديل</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">الاسم</label>
                <Input defaultValue={selectedEntity.name || ''} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">التخصص/النوع</label>
                <Input defaultValue={selectedEntity.specialty || selectedEntity.type || ''} />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">الحالة</label>
                <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent">
                  <option value="active">نشط</option>
                  <option value="suspended">موقوف</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                className="flex-1 bg-[#0D9488] hover:bg-[#115E59]"
                onClick={() => {
                  setShowEditModal(false);
                  toast.success('تم الحفظ بنجاح');
                }}
              >
                حفظ
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowEditModal(false)}
              >
                إلغاء
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">تأكيد الحذف</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-center text-lg text-foreground">هل أنت متأكد من الحذف؟</p>
              <p className="text-center text-sm text-muted-foreground mt-2">
                لا يمكن التراجع عن هذا الإجراء
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteModal(false)}
              >
                إلغاء
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => {
                  setShowDeleteModal(false);
                  toast.success('تم الحذف بنجاح');
                }}
              >
                حذف
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

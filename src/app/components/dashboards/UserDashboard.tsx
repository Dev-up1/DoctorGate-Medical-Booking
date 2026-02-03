import { useState } from 'react';
import { 
  LayoutDashboard, Calendar, FileText, Users, TestTube, Video, Star, 
  CreditCard, Settings, Shield, ChevronRight, Phone, MapPin, Clock,
  Download, Eye, Plus, Edit2, Trash2, X, User, Mail, Heart, Activity,
  Pill, Syringe, FileCheck, AlertCircle, CheckCircle2, Building2
} from 'lucide-react';

interface UserDashboardProps {
  userId: string;
  onNavigate: (page: string, data?: any) => void;
}

type Tab = 'overview' | 'appointments' | 'medical-profile' | 'family' | 'lab-results' | 'online-consultations' | 'ratings' | 'payments' | 'settings' | 'insurance';

export function UserDashboard({ userId, onNavigate }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [ratingValue, setRatingValue] = useState(0);

  // Mock data
  const user = {
    name: 'أحمد محمد السالم',
    email: 'ahmed.salem@example.com',
    phone: '+967 777 123 456',
    bloodType: 'O+',
    birthDate: '1990-05-15',
    nationalId: '1234567890',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  };

  const upcomingAppointments = [
    {
      id: '1',
      doctor: 'د. محمد الشعيبي',
      specialty: 'طب الأسنان',
      date: '2026-01-22',
      time: '10:00',
      location: 'عدن - المعلا',
      type: 'كشف عيادة',
      status: 'confirmed',
      canRate: false,
      appointmentDate: new Date('2026-01-22')
    },
    {
      id: '2',
      doctor: 'د. سارة المحمدي',
      specialty: 'طب الأطفال',
      date: '2026-01-25',
      time: '14:00',
      location: 'عدن - الشيخ عثمان',
      type: 'كشف عيادة',
      status: 'confirmed',
      canRate: false,
      appointmentDate: new Date('2026-01-25')
    }
  ];

  const pastAppointments = [
    {
      id: '3',
      doctor: 'د. فاطمة باحارثة',
      specialty: 'أمراض النساء والولادة',
      date: '2026-01-15',
      time: '11:00',
      location: 'عدن - كريتر',
      type: 'كشف عيادة',
      status: 'completed',
      canRate: true,
      rated: false,
      appointmentDate: new Date('2026-01-15'),
      daysAgo: 5
    },
    {
      id: '4',
      doctor: 'د. خالد النقيب',
      specialty: 'جراحة العظام',
      date: '2026-01-10',
      time: '15:00',
      location: 'عدن - المنصورة',
      type: 'كشف عيادة',
      status: 'completed',
      canRate: false,
      rated: true,
      rating: 5,
      appointmentDate: new Date('2026-01-10'),
      daysAgo: 10
    }
  ];

  const familyMembers = [
    {
      id: '1',
      name: 'فاطمة أحمد السالم',
      relation: 'الزوجة',
      birthDate: '1992-08-20',
      bloodType: 'A+',
      phone: '+967 777 234 567'
    },
    {
      id: '2',
      name: 'محمد أحمد السالم',
      relation: 'الإبن',
      birthDate: '2015-03-10',
      bloodType: 'O+',
      phone: ''
    }
  ];

  const labResults = [
    {
      id: '1',
      testName: 'تحليل دم شامل',
      lab: 'مختبر النيل الطبي',
      date: '2026-01-18',
      status: 'متاح',
      viewed: false
    },
    {
      id: '2',
      testName: 'أشعة صدر',
      lab: 'مركز الشفاء للأشعة',
      date: '2026-01-12',
      status: 'متاح',
      viewed: true
    }
  ];

  const medicalHistory = {
    chronicDiseases: ['ضغط الدم', 'السكري'],
    allergies: ['البنسلين'],
    surgeries: ['استئصال الزائدة الدودية - 2015'],
    currentMedications: ['ميتفورمين 500 ملجم', 'لوسارتان 50 ملجم']
  };

  const onlineConsultations = [
    {
      id: '1',
      doctor: 'د. نادية باشراحيل',
      specialty: 'الطب النفسي',
      date: '2026-01-23',
      time: '16:00',
      duration: '30 دقيقة',
      status: 'scheduled',
      price: 7500
    }
  ];

  const insuranceInfo = {
    provider: 'شركة التأمين الوطنية',
    policyNumber: 'INS-2026-12345',
    validUntil: '2026-12-31',
    coverage: 80,
    services: ['كشف الطبيب', 'الأدوية', 'التحاليل', 'الأشعة'],
    network: ['مستشفى الجمهورية', 'مركز عدن الطبي', 'مختبر النيل']
  };

  const handleRateAppointment = (appointment: any) => {
    setSelectedAppointment(appointment);
    setRatingValue(0);
    setShowRatingModal(true);
  };

  const submitRating = () => {
    // Here would be API call to submit rating
    console.log('Rating submitted:', ratingValue, 'for appointment:', selectedAppointment.id);
    setShowRatingModal(false);
    setSelectedAppointment(null);
    setRatingValue(0);
  };

  const renderSidebar = () => (
    <div className="bg-white rounded-xl shadow-md border border-border p-6">
      <div className="flex flex-col items-center mb-6">
        <img
          src={user.profileImage}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-[#0D9488] mb-4"
        />
        <h3 className="font-bold text-lg text-foreground">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>

      <nav className="space-y-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'overview'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>نظرة عامة</span>
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'appointments'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span>مواعيدي</span>
        </button>

        <button
          onClick={() => setActiveTab('medical-profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'medical-profile'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>الملف الطبي الموحد</span>
        </button>

        <button
          onClick={() => setActiveTab('family')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'family'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>إدارة العائلة</span>
        </button>

        <button
          onClick={() => setActiveTab('lab-results')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'lab-results'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <TestTube className="w-5 h-5" />
          <span>نتائج التحاليل والأشعة</span>
        </button>

        <button
          onClick={() => setActiveTab('online-consultations')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'online-consultations'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Video className="w-5 h-5" />
          <span>الاستشارات الأونلاين</span>
        </button>

        <button
          onClick={() => setActiveTab('ratings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'ratings'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Star className="w-5 h-5" />
          <span>التقييمات</span>
        </button>

        <button
          onClick={() => setActiveTab('payments')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'payments'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span>المدفوعات</span>
        </button>

        <button
          onClick={() => setActiveTab('insurance')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'insurance'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Shield className="w-5 h-5" />
          <span>التأمينات</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#0D9488] text-white'
              : 'text-foreground hover:bg-secondary'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span>الإعدادات</span>
        </button>
      </nav>

      <div className="mt-6 pt-6 border-t border-border">
        <button
          onClick={() => onNavigate('home')}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-[#0D9488] hover:bg-secondary rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
          <span>العودة للرئيسية</span>
        </button>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#0D9488]" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-1">{upcomingAppointments.length}</h4>
          <p className="text-sm text-muted-foreground">المواعيد القادمة</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-[#0D9488]" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-1">{familyMembers.length + 1}</h4>
          <p className="text-sm text-muted-foreground">أفراد العائلة</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <TestTube className="w-6 h-6 text-[#0D9488]" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-1">{labResults.filter(r => !r.viewed).length}</h4>
          <p className="text-sm text-muted-foreground">نتائج جديدة</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-[#0D9488]" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-foreground mb-1">{pastAppointments.filter(a => a.canRate && !a.rated).length}</h4>
          <p className="text-sm text-muted-foreground">في انتظار التقييم</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">المواعيد القادمة</h3>
          <button
            onClick={() => setActiveTab('appointments')}
            className="text-[#0D9488] hover:text-[#115E59] text-sm font-semibold"
          >
            عرض الكل
          </button>
        </div>

        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center gap-4 p-4 bg-background rounded-lg">
                <div className="flex-1">
                  <h4 className="font-bold text-foreground mb-1">{appointment.doctor}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{appointment.specialty}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    مؤكد
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">لا توجد مواعيد قادمة</p>
            <button
              onClick={() => onNavigate('doctors')}
              className="mt-4 px-6 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors"
            >
              احجز موعد جديد
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => onNavigate('doctors')}
          className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all text-right group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-lg flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-foreground mb-2 group-hover:text-[#0D9488] transition-colors">
            احجز موعد جديد
          </h4>
          <p className="text-sm text-muted-foreground">ابحث عن طبيب واحجز موعد</p>
        </button>

        <button
          onClick={() => onNavigate('labs')}
          className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all text-right group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-lg flex items-center justify-center mb-4">
            <TestTube className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-foreground mb-2 group-hover:text-[#0D9488] transition-colors">
            احجز تحليل طبي
          </h4>
          <p className="text-sm text-muted-foreground">اختر المختبر واحجز تحليلك</p>
        </button>

        <button
          onClick={() => onNavigate('online-consultation')}
          className="bg-white rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all text-right group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-lg flex items-center justify-center mb-4">
            <Video className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-bold text-foreground mb-2 group-hover:text-[#0D9488] transition-colors">
            استشارة أونلاين
          </h4>
          <p className="text-sm text-muted-foreground">تحدث مع طبيب عبر الإنترنت</p>
        </button>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">المواعيد القادمة</h3>
        
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-foreground">{appointment.doctor}</h4>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      مؤكد
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{appointment.specialty}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.type}</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-semibold">
                  إلغاء الموعد
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">لا توجد مواعيد قادمة</p>
            <button
              onClick={() => onNavigate('doctors')}
              className="px-6 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors"
            >
              احجز موعد جديد
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">المواعيد السابقة</h3>
        
        {pastAppointments.length > 0 ? (
          <div className="space-y-4">
            {pastAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-start gap-4 p-4 bg-background rounded-lg border border-border">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-foreground">{appointment.doctor}</h4>
                    {appointment.rated && (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (appointment.rating || 0)
                                ? 'fill-[#0D9488] text-[#0D9488]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{appointment.specialty}</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-[#0D9488]" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {appointment.canRate && !appointment.rated && appointment.daysAgo <= 7 && (
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs text-amber-600 font-semibold">
                        {7 - appointment.daysAgo} أيام متبقية للتقييم
                      </span>
                      <button
                        onClick={() => handleRateAppointment(appointment)}
                        className="px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors text-sm font-semibold"
                      >
                        قيّم الزيارة
                      </button>
                    </div>
                  )}
                  {appointment.rated && (
                    <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      تم التقييم
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">لا توجد مواعيد سابقة</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderMedicalProfile = () => (
    <div className="space-y-6">
      {/* Personal Health Info */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">المعلومات الصحية الأساسية</h3>
          <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <Edit2 className="w-5 h-5 text-[#0D9488]" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-muted-foreground block mb-2">فصيلة الدم</label>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-red-600" />
              </div>
              <span className="font-semibold text-foreground">{user.bloodType}</span>
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground block mb-2">تاريخ الميلاد</label>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#0D9488]" />
              </div>
              <span className="font-semibold text-foreground">{user.birthDate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chronic Diseases */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">الأمراض المزمنة</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors">
            <Plus className="w-4 h-4" />
            <span>إضافة</span>
          </button>
        </div>

        {medicalHistory.chronicDiseases.length > 0 ? (
          <div className="space-y-3">
            {medicalHistory.chronicDiseases.map((disease, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-foreground">{disease}</span>
                </div>
                <button className="p-1 hover:bg-white rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-6 text-muted-foreground">لا توجد أمراض مزمنة مسجلة</p>
        )}
      </div>

      {/* Allergies */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">الحساسية والموانع</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors">
            <Plus className="w-4 h-4" />
            <span>إضافة</span>
          </button>
        </div>

        {medicalHistory.allergies.length > 0 ? (
          <div className="space-y-3">
            {medicalHistory.allergies.map((allergy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span className="text-foreground font-semibold">{allergy}</span>
                </div>
                <button className="p-1 hover:bg-amber-100 rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-6 text-muted-foreground">لا توجد حساسية مسجلة</p>
        )}
      </div>

      {/* Current Medications */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">الأدوية الحالية</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors">
            <Plus className="w-4 h-4" />
            <span>إضافة</span>
          </button>
        </div>

        {medicalHistory.currentMedications.length > 0 ? (
          <div className="space-y-3">
            {medicalHistory.currentMedications.map((medication, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <Pill className="w-5 h-5 text-[#0D9488]" />
                  <span className="text-foreground">{medication}</span>
                </div>
                <button className="p-1 hover:bg-white rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-6 text-muted-foreground">لا توجد أدوية حالية</p>
        )}
      </div>

      {/* Surgeries */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">العمليات الجراحية السابقة</h3>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors">
            <Plus className="w-4 h-4" />
            <span>إضافة</span>
          </button>
        </div>

        {medicalHistory.surgeries.length > 0 ? (
          <div className="space-y-3">
            {medicalHistory.surgeries.map((surgery, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <Syringe className="w-5 h-5 text-[#0D9488]" />
                  <span className="text-foreground">{surgery}</span>
                </div>
                <button className="p-1 hover:bg-white rounded transition-colors">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-6 text-muted-foreground">لا توجد عمليات جراحية مسجلة</p>
        )}
      </div>
    </div>
  );

  const renderFamily = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-foreground">أفراد العائلة</h3>
          <button
            onClick={() => setShowAddFamilyModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة فرد</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current User */}
          <div className="p-6 bg-gradient-to-br from-teal-50 to-white rounded-xl border-2 border-[#0D9488]">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0D9488]"
              />
              <div>
                <h4 className="font-bold text-foreground">{user.name}</h4>
                <p className="text-sm text-[#0D9488] font-semibold">أنت (الحساب الأساسي)</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Activity className="w-4 h-4 text-[#0D9488]" />
                <span>فصيلة الدم: {user.bloodType}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4 text-[#0D9488]" />
                <span>تاريخ الميلاد: {user.birthDate}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-[#0D9488]" />
                <span className="direction-ltr">{user.phone}</span>
              </div>
            </div>
          </div>

          {/* Family Members */}
          {familyMembers.map((member) => (
            <div key={member.id} className="p-6 bg-background rounded-xl border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-[#0D9488]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{member.name}</h4>
                    <p className="text-sm text-muted-foreground">{member.relation}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-white rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4 text-[#0D9488]" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="w-4 h-4 text-[#0D9488]" />
                  <span>فصيلة الدم: {member.bloodType}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-[#0D9488]" />
                  <span>تاريخ الميلاد: {member.birthDate}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-[#0D9488]" />
                    <span className="direction-ltr">{member.phone}</span>
                  </div>
                )}
              </div>
              <button
                onClick={() => onNavigate('doctors')}
                className="w-full mt-4 px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors"
              >
                احجز موعد
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLabResults = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">نتائج التحاليل والأشعة</h3>

        {labResults.length > 0 ? (
          <div className="space-y-4">
            {labResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    result.viewed ? 'bg-gray-100' : 'bg-teal-50'
                  }`}>
                    <TestTube className={`w-6 h-6 ${result.viewed ? 'text-gray-400' : 'text-[#0D9488]'}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-foreground">{result.testName}</h4>
                      {!result.viewed && (
                        <span className="px-2 py-0.5 bg-[#0D9488] text-white rounded text-xs font-semibold">
                          جديد
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{result.lab}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-[#0D9488]" />
                      <span>{result.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>عرض</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors">
                    <Download className="w-4 h-4" />
                    <span>تحميل</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <TestTube className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">لا توجد نتائج متاحة</p>
            <button
              onClick={() => onNavigate('labs')}
              className="px-6 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors"
            >
              احجز تحليل طبي
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderOnlineConsultations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">الاستشارات الأونلاين</h3>

        {onlineConsultations.length > 0 ? (
          <div className="space-y-4">
            {onlineConsultations.map((consultation) => (
              <div key={consultation.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-[#0D9488]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{consultation.doctor}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{consultation.specialty}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#0D9488]" />
                        <span>{consultation.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-[#0D9488]" />
                        <span>{consultation.time}</span>
                      </div>
                      <span>({consultation.duration})</span>
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <button className="px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors">
                    الانضمام للمكالمة
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">لا توجد استشارات أونلاين محجوزة</p>
            <button
              onClick={() => onNavigate('online-consultation')}
              className="px-6 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors"
            >
              احجز استشارة أونلاين
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderRatings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">تقييماتي للأطباء</h3>

        {pastAppointments.filter(a => a.rated).length > 0 ? (
          <div className="space-y-4">
            {pastAppointments.filter(a => a.rated).map((appointment) => (
              <div key={appointment.id} className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{appointment.doctor}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= (appointment.rating || 0)
                            ? 'fill-[#0D9488] text-[#0D9488]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>تاريخ الزيارة: {appointment.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">لم تقم بتقييم أي زيارة بعد</p>
          </div>
        )}
      </div>

      {/* Appointments Pending Rating */}
      {pastAppointments.filter(a => a.canRate && !a.rated).length > 0 && (
        <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            <h3 className="text-xl font-bold text-foreground">في انتظار التقييم</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            لديك {pastAppointments.filter(a => a.canRate && !a.rated).length} زيارة في انتظار التقييم (متاح لمدة 7 أيام فقط)
          </p>
          <div className="space-y-3">
            {pastAppointments.filter(a => a.canRate && !a.rated).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <h4 className="font-bold text-foreground">{appointment.doctor}</h4>
                  <p className="text-sm text-muted-foreground">{appointment.date}</p>
                </div>
                <button
                  onClick={() => handleRateAppointment(appointment)}
                  className="px-4 py-2 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors"
                >
                  قيّم الآن
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderInsurance = () => (
    <div className="space-y-6">
      {/* Insurance Card */}
      <div className="bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h3 className="text-2xl font-bold">بطاقة التأمين</h3>
              <p className="text-teal-100 text-sm">{insuranceInfo.provider}</p>
            </div>
          </div>
          <div className="text-left">
            <p className="text-teal-100 text-sm mb-1">رقم البوليصة</p>
            <p className="text-xl font-bold direction-ltr">{insuranceInfo.policyNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-teal-100 text-sm mb-1">اسم المؤمن</p>
            <p className="font-semibold text-lg">{user.name}</p>
          </div>
          <div className="text-left">
            <p className="text-teal-100 text-sm mb-1">صالح حتى</p>
            <p className="font-semibold text-lg">{insuranceInfo.validUntil}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-teal-400/30">
          <div>
            <p className="text-teal-100 text-sm mb-1">نسبة التغطية</p>
            <p className="text-2xl font-bold">{insuranceInfo.coverage}%</p>
          </div>
          <button className="px-6 py-2 bg-white text-[#0D9488] rounded-lg hover:bg-teal-50 transition-colors font-semibold">
            تحميل البطاقة
          </button>
        </div>
      </div>

      {/* Coverage Details */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">الخدمات المشمولة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {insuranceInfo.services.map((service, index) => (
            <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-foreground">{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Network Providers */}
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">مقدمي الخدمة المعتمدين</h3>
        <div className="space-y-3">
          {insuranceInfo.network.map((provider, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#0D9488]" />
                <span className="text-foreground">{provider}</span>
              </div>
              <button className="px-4 py-2 text-[#0D9488] hover:bg-white rounded-lg transition-colors text-sm font-semibold">
                عرض التفاصيل
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">المعلومات الشخصية</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">الاسم الكامل</label>
            <input
              type="text"
              defaultValue={user.name}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              defaultValue={user.email}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">رقم الهاتف</label>
            <input
              type="tel"
              defaultValue={user.phone}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent direction-ltr text-left"
            />
          </div>
          <button className="w-full md:w-auto px-6 py-3 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors font-semibold">
            حفظ التغييرات
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">تغيير كلمة المرور</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">كلمة المرور الحالية</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">كلمة المرور الجديدة</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">تأكيد كلمة المرور الجديدة</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
            />
          </div>
          <button className="w-full md:w-auto px-6 py-3 bg-[#0D9488] text-white rounded-lg hover:bg-[#115E59] transition-colors font-semibold">
            تحديث كلمة المرور
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'appointments':
        return renderAppointments();
      case 'medical-profile':
        return renderMedicalProfile();
      case 'family':
        return renderFamily();
      case 'lab-results':
        return renderLabResults();
      case 'online-consultations':
        return renderOnlineConsultations();
      case 'ratings':
        return renderRatings();
      case 'insurance':
        return renderInsurance();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0D9488] to-[#115E59] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">لوحة التحكم الشخصية</h1>
              <p className="text-teal-100">مرحباً بك، {user.name}</p>
            </div>
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-[#0D9488] rounded-xl hover:bg-teal-50 transition-colors font-semibold"
            >
              <ChevronRight className="w-5 h-5" />
              <span>الرئيسية</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {renderSidebar()}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowRatingModal(false)}
              className="absolute top-4 left-4 p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">قيّم زيارتك</h3>
            
            <div className="mb-6">
              <h4 className="font-bold text-foreground mb-2">{selectedAppointment.doctor}</h4>
              <p className="text-sm text-muted-foreground">{selectedAppointment.specialty}</p>
              <p className="text-sm text-muted-foreground">تاريخ الزيارة: {selectedAppointment.date}</p>
            </div>

            <div className="mb-6">
              <p className="text-center text-foreground font-semibold mb-4">كيف كانت تجربتك مع الطبيب؟</p>
              <div className="flex items-center justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRatingValue(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-12 h-12 ${
                        star <= ratingValue
                          ? 'fill-[#0D9488] text-[#0D9488]'
                          : 'text-gray-300 hover:text-[#0D9488]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-foreground mb-2">
                تعليقك (اختياري)
              </label>
              <textarea
                rows={4}
                placeholder="شارك تجربتك مع الطبيب..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-[#0D9488] focus:border-transparent resize-none"
              ></textarea>
            </div>

            <button
              onClick={submitRating}
              disabled={ratingValue === 0}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                ratingValue > 0
                  ? 'bg-[#0D9488] text-white hover:bg-[#115E59]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              إرسال التقييم
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

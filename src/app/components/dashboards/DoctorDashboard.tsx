import { useState, useRef } from 'react';
import { Card } from '@/app/components/ui/card';

const doctorProfileImage = "https://edfwxxagmsyzsbjtuvdu.supabase.co/storage/v1/object/public/Medical-Appointments/WhatsApp%20Image%202026-01-24%20at%202.32.00%20PM.jpeg";
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Switch } from '@/app/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { 
  Building2, Calendar, Star, DollarSign, Users,
  Plus, Edit, Trash2, MapPin, Phone, Clock, Video, Upload,
  FileText, Shield, Activity, CheckCircle, Menu, X, User, ChevronRight, AlertTriangle
} from 'lucide-react';
import { 
  getDoctorDashboardStats,
  getBranchesByDoctorId,
  getAppointmentsByDoctorId,
  getRatingsByDoctorId,
  doctorAccounts
} from '@/app/data/dashboardMockData';

interface DoctorDashboardProps {
  doctorId: string;
  onNavigate: (page: string) => void;
}

export function DoctorDashboard({ doctorId, onNavigate }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState(doctorProfileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dashboard State
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  
  const doctor = doctorAccounts.find(d => d.id === doctorId);
  const stats = getDoctorDashboardStats(doctorId);
  const branches = getBranchesByDoctorId(doctorId);
  const appointments = getAppointmentsByDoctorId(doctorId);
  const ratings = getRatingsByDoctorId(doctorId);

  if (!doctor) {
    return <div>Doctor not found</div>;
  }

  // Navigation Items
  const menuItems = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'ratings', label: 'التقييمات', icon: Star },
    { id: 'appointments', label: 'الحجوزات', icon: Calendar },
    { id: 'branches', label: 'الفروع', icon: Building2 },
    { id: 'overview', label: 'نظرة عامة', icon: Activity },
  ];

  // Helper Components
  const StatCard = ({ icon: Icon, title, value, subtitle, color }: any) => (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold mb-2">{value}</h3>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="size-6 text-white" />
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row" dir="rtl">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white p-4 flex items-center justify-between border-b shadow-sm z-30 sticky top-0">
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu className="size-6 text-gray-700" />
        </Button>
        <span className="font-bold text-lg text-gray-800">
          {menuItems.find(i => i.id === activeTab)?.label || 'لوحة التحكم'}
        </span>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </div>

      {/* Warning Banner (Simulated) */}
      {!doctor.isApproved && (
        <div className="md:hidden bg-red-400 text-white p-3 text-xs text-center font-bold flex items-center justify-center gap-2">
          <AlertTriangle className="size-4 fill-yellow-400 text-yellow-400" />
          <span>تنبيه! حسابك مازال قيد المراجعة وحتى يتم قبوله يرجى التأكد من إكمال الملف.</span>
        </div>
      )}

      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={`
        fixed md:sticky top-0 right-0 h-full w-[280px] bg-white z-50 shadow-2xl md:shadow-none md:border-l border-gray-200
        transition-transform duration-300 ease-in-out transform flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-5 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-amber-500">لوحة التحكم</h2>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Doctor Info (Sidebar) */}
        <div className="p-6 text-center border-b bg-gray-50/50">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <img 
              src={profileImage} 
              alt={doctor.name} 
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
            />
            {doctor.isApproved && (
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full border-2 border-white">
                <Shield className="size-3" />
              </div>
            )}
          </div>
          <h3 className="font-bold text-gray-900 truncate">{doctor.name}</h3>
          <p className="text-xs text-gray-500">{doctor.specialty}</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                    ${activeTab === item.id 
                      ? 'bg-amber-50 text-amber-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <item.icon className={`size-5 ${activeTab === item.id ? 'text-amber-500' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                  {activeTab === item.id && <ChevronRight className="size-4 mr-auto text-amber-500" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t mt-auto">
          <Button 
            variant="outline" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100"
            onClick={() => onNavigate('home')}
          >
            تسجيل الخروج
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen p-4 md:p-8 w-full max-w-full">
        <div className="max-w-4xl mx-auto">
          
          {/* CONTENT: PROFILE */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               {/* Mobile-Style Profile Header with Circular Image */}
               <div className="bg-white rounded-3xl shadow-sm p-6 mb-6 text-center relative overflow-hidden border border-gray-100">
                 <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-teal-50 to-cyan-50 opacity-50 z-0"></div>
                 <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto bg-white p-1 rounded-full shadow-lg mb-4 mt-4 relative group">
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <button 
                        onClick={triggerFileInput}
                        className="absolute bottom-0 right-0 bg-teal-500 text-white p-2 rounded-full shadow-md hover:bg-teal-600 transition-colors z-20"
                        title="Change Profile Picture"
                      >
                        <Edit className="size-4" />
                      </button>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
                    <p className="text-gray-500 text-sm mb-2">{doctor.specialty}</p>
                    <div className="flex justify-center gap-2 mb-4">
                      {doctor.isApproved ? (
                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                          <CheckCircle className="size-3" /> معتمد
                        </span>
                      ) : (
                        <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                          <Clock className="size-3" /> قيد المراجعة
                        </span>
                      )}
                    </div>
                 </div>
               </div>

               {/* Profile Form */}
               <Card className="p-6 border-none shadow-sm">
                 <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">الاسم *</Label>
                      <Input defaultValue="Ali Alzaher" className="bg-white" />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">البريد الإلكتروني *</Label>
                      <Input defaultValue="ali.azzaher@gmail.com" className="bg-white" />
                    </div>

                    {/* Doctor Link */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs text-red-500">رابط الطبيب *</Label>
                      <Input defaultValue="771342939" className="bg-white text-left" dir="ltr" />
                      <p className="text-blue-500 text-xs text-left cursor-pointer hover:underline pt-1" dir="ltr">رابط الطبيب</p>
                    </div>

                    {/* Specialty */}
                    <div className="space-y-1">
                       <Label className="text-gray-500 text-xs">أضف تخصص</Label>
                       <Select defaultValue="general">
                         <SelectTrigger className="bg-white">
                           <SelectValue placeholder="اختر التخصص" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="general">طب عام</SelectItem>
                           <SelectItem value="digestive">جهاز هضمي</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>

                    {/* Specialty Description */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">وصف التخصص</Label>
                      <div className="flex gap-2">
                        <Input placeholder="وصف التخصص" className="bg-white" />
                        <Button size="icon" className="bg-teal-500 hover:bg-teal-600 rounded-full h-10 w-10 shrink-0">
                          <Plus className="size-5 text-white" />
                        </Button>
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">رقم الجوال *</Label>
                      <Input defaultValue="782434513" className="bg-white text-left" dir="ltr" />
                    </div>

                    {/* Gender */}
                    <div className="space-y-1">
                       <Label className="text-gray-500 text-xs text-red-500">الجنس *</Label>
                       <Select defaultValue="male">
                         <SelectTrigger className="bg-white">
                           <SelectValue placeholder="اختر الجنس" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="male">ذكر</SelectItem>
                           <SelectItem value="female">أنثى</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs text-red-500">كلمة المرور *</Label>
                      <Input type="password" placeholder="كلمة المرور" className="bg-white" />
                    </div>

                    {/* University */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">الجامعة</Label>
                      <Input placeholder="الجامعة" className="bg-white" />
                    </div>

                    {/* Graduation Year */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">سنة التخرج</Label>
                      <Input placeholder="سنة التخرج" className="bg-white" />
                    </div>

                    {/* Qualification */}
                    <div className="space-y-1">
                       <Label className="text-gray-500 text-xs">المؤهل</Label>
                       <Select>
                         <SelectTrigger className="bg-white">
                           <SelectValue placeholder="اختر المؤهل" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="bachelor">بكالوريوس</SelectItem>
                           <SelectItem value="master">ماجستير</SelectItem>
                           <SelectItem value="phd">دكتوراه</SelectItem>
                         </SelectContent>
                       </Select>
                    </div>

                    {/* File Upload 1 */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">شهادة مزاولة المهنة + الشهادة الجامعية</Label>
                      <div className="flex items-center gap-2 border rounded-md p-1 bg-white">
                         <Button variant="secondary" size="sm" className="bg-gray-200 hover:bg-gray-300 text-gray-700 h-8">Choose Files</Button>
                         <span className="text-xs text-gray-500">No file chosen</span>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">أضف خبرة</Label>
                      <div className="flex gap-2">
                        <Input placeholder="خبرة جديدة" className="bg-white" />
                        <Button size="icon" className="bg-teal-500 hover:bg-teal-600 rounded-full h-10 w-10 shrink-0">
                          <Plus className="size-5 text-white" />
                        </Button>
                      </div>
                    </div>

                    {/* Certificates */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">أضف شهادة</Label>
                      <div className="flex gap-2">
                        <Input placeholder="شهادة جديدة" className="bg-white" />
                        <Button size="icon" className="bg-teal-500 hover:bg-teal-600 rounded-full h-10 w-10 shrink-0">
                          <Plus className="size-5 text-white" />
                        </Button>
                      </div>
                    </div>

                    {/* Conferences */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">أضف مؤتمر</Label>
                      <div className="flex gap-2">
                        <Input placeholder="مؤتمر جديد" className="bg-white" />
                        <Button size="icon" className="bg-teal-500 hover:bg-teal-600 rounded-full h-10 w-10 shrink-0">
                          <Plus className="size-5 text-white" />
                        </Button>
                      </div>
                    </div>

                     {/* File Upload 2 */}
                    <div className="space-y-1">
                      <Label className="text-gray-500 text-xs">شهادة مزاولة المهنة + الشهادة الجامعية</Label>
                      <div className="flex items-center gap-2 border rounded-md p-1 bg-white">
                         <Button variant="secondary" size="sm" className="bg-gray-200 hover:bg-gray-300 text-gray-700 h-8">Choose Files</Button>
                         <span className="text-xs text-gray-500">No file chosen</span>
                      </div>
                    </div>

                    <div className="pt-4 pb-8">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg rounded-md shadow-sm">
                        حفظ
                      </Button>
                    </div>
                 </div>
               </Card>
            </div>
          )}

          {/* CONTENT: RATINGS */}
          {activeTab === 'ratings' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-bold mb-4">التقييمات والمراجعات</h2>
              <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center">
                 <div>
                   <div className="flex justify-center items-center gap-1 mb-1">
                     <Star className="size-6 text-yellow-400 fill-yellow-400" />
                     <span className="text-2xl font-bold text-gray-900">{stats.averageRating}</span>
                   </div>
                   <p className="text-xs text-gray-500">متوسط التقييم</p>
                 </div>
                 <div className="border-x border-gray-100">
                   <p className="text-2xl font-bold text-gray-900 mb-1">{stats.totalRatings}</p>
                   <p className="text-xs text-gray-500">العدد الكلي</p>
                 </div>
                 <div>
                   <p className="text-2xl font-bold text-green-600 mb-1">98%</p>
                   <p className="text-xs text-gray-500">رضا المرضى</p>
                 </div>
              </div>

              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div key={rating.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {rating.patientName.charAt(0)}
                        </div>
                        <div>
                           <h4 className="font-bold text-sm">{rating.patientName}</h4>
                           <div className="flex items-center gap-1">
                             {[...Array(5)].map((_, i) => (
                               <Star key={i} className={`size-3 ${i < Math.round(rating.overallScore) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                             ))}
                           </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{rating.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                      "{rating.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">جدول الحجوزات</h2>
                <Button size="sm" variant="outline">تصفية</Button>
              </div>

              <Card className="p-0 overflow-hidden border-none shadow-sm rounded-2xl">
                 <div className="overflow-x-auto">
                   <Table>
                     <TableHeader className="bg-gray-50">
                       <TableRow>
                         <TableHead className="text-right">المريض</TableHead>
                         <TableHead className="text-right">الوقت</TableHead>
                         <TableHead className="text-right">الحالة</TableHead>
                         <TableHead className="text-center">إجراء</TableHead>
                       </TableRow>
                     </TableHeader>
                     <TableBody>
                       {appointments.map((apt) => (
                         <TableRow key={apt.id} className="hover:bg-gray-50">
                           <TableCell>
                             <div className="font-medium">{apt.patientName}</div>
                             <div className="text-xs text-gray-500">{apt.type === 'online' ? 'أونلاين' : 'عيادة'}</div>
                           </TableCell>
                           <TableCell>
                             <div className="font-medium">{apt.time}</div>
                             <div className="text-xs text-gray-500">{apt.date}</div>
                           </TableCell>
                           <TableCell>
                             <Badge className={`
                               ${apt.status === 'confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 
                                 apt.status === 'pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
                                 'bg-gray-100 text-gray-700'}
                             `}>
                               {apt.status === 'confirmed' ? 'مؤكد' : apt.status === 'pending' ? 'انتظار' : apt.status}
                             </Badge>
                           </TableCell>
                           <TableCell className="text-center">
                             <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                               <Edit className="size-4 text-gray-400" />
                             </Button>
                           </TableCell>
                         </TableRow>
                       ))}
                     </TableBody>
                   </Table>
                 </div>
              </Card>
            </div>
          )}

          {/* CONTENT: BRANCHES */}
          {activeTab === 'branches' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">الفروع والعيادات</h2>
                <Button onClick={() => setIsAddBranchOpen(true)} className="bg-teal-600 hover:bg-teal-700 rounded-full h-10 w-10 p-0 shadow-lg">
                  <Plus className="size-5" />
                </Button>
              </div>

              <div className="grid gap-4">
                {branches.map((branch) => (
                  <div key={branch.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${branch.type === 'online' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                          {branch.type === 'online' ? <Video className="size-6" /> : <Building2 className="size-6" />}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{branch.name}</h3>
                          <p className="text-xs text-gray-500">{branch.address || 'استشارة عن بعد'}</p>
                        </div>
                      </div>
                      <Switch checked={branch.isActive} />
                    </div>
                    
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
                       <Button variant="outline" size="sm" className="flex-1 text-xs">تعديل الجدول</Button>
                       <Button variant="outline" size="sm" className="flex-1 text-xs">الموظفين ({branch.staff.length})</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTENT: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in">
              <h2 className="text-2xl font-bold mb-4">نظرة عامة</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  icon={Calendar}
                  title="مواعيد اليوم"
                  value={stats.todayAppointments}
                  color="bg-blue-500"
                />
                <StatCard
                  icon={Users}
                  title="إجمالي المرضى"
                  value={stats.totalPatients}
                  color="bg-purple-500"
                />
                <StatCard
                  icon={DollarSign}
                  title="الإيرادات"
                  value={stats.revenue}
                  color="bg-green-500"
                />
                <StatCard
                  icon={Star}
                  title="التقييم"
                  value={stats.averageRating}
                  color="bg-orange-500"
                />
              </div>

              <Card className="p-6 rounded-2xl border-none shadow-sm">
                 <h3 className="font-bold mb-4">النشاط الأخير</h3>
                 <div className="space-y-4">
                    {/* Mock Activity Feed */}
                    <div className="flex gap-4">
                      <div className="w-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">موعد جديد محجوز</p>
                        <p className="text-xs text-gray-500">منذ 15 دقيقة • مريض جديد</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">تم تأكيد الحجز</p>
                        <p className="text-xs text-gray-500">منذ ساعة • د. محمد</p>
                      </div>
                    </div>
                 </div>
              </Card>
            </div>
          )}

        </div>
      </main>

      {/* Add Branch Dialog (Kept simple) */}
      <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen}>
         <DialogContent className="max-w-md rounded-2xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة فرع جديد</DialogTitle>
              <DialogDescription>أدخل بيانات الفرع الجديد</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>اسم الفرع</Label>
                <Input placeholder="مثال: عيادة المنصورة" />
              </div>
              <Button onClick={() => setIsAddBranchOpen(false)} className="w-full">حفظ</Button>
            </div>
         </DialogContent>
      </Dialog>

    </div>
  );
}

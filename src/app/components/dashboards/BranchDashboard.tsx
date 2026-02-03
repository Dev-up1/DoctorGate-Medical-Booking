import { useState } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { 
  Calendar, Clock, Users, Phone, CheckCircle, XCircle,
  Search, Activity, TrendingUp, UserCheck
} from 'lucide-react';
import { 
  branches,
  getAppointmentsByBranchId,
  getStaffByBranchId,
  doctorAccounts
} from '@/app/data/dashboardMockData';

interface BranchDashboardProps {
  branchId: string;
  staffRole: 'reception' | 'nurse' | 'assistant' | 'technician';
  onNavigate: (page: string) => void;
}

export function BranchDashboard({ branchId, staffRole, onNavigate }: BranchDashboardProps) {
  const [activeTab, setActiveTab] = useState('appointments');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-01-22');

  const branch = branches.find(b => b.id === branchId);
  const appointments = getAppointmentsByBranchId(branchId);
  const staff = getStaffByBranchId(branchId);

  if (!branch) {
    return <div>Branch not found</div>;
  }

  const doctor = doctorAccounts.find(d => d.id === branch.doctorId);
  
  // Filter appointments by date
  const todayAppointments = appointments.filter(a => a.date === selectedDate);
  const completedToday = todayAppointments.filter(a => a.status === 'completed').length;
  const pendingToday = todayAppointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length;

  // Statistics Cards
  const StatCard = ({ icon: Icon, title, value, color }: any) => (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="size-6 text-white" />
        </div>
      </div>
    </Card>
  );

  // Role-based permissions
  const canCheckIn = staffRole === 'reception';
  const canUpdateStatus = staffRole === 'reception' || staffRole === 'nurse';

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{branch.name}</h1>
              <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-gray-600">{doctor?.name}</p>
                <span className="text-gray-400">•</span>
                <Badge variant="secondary">
                  {staffRole === 'reception' && 'موظف استقبال'}
                  {staffRole === 'nurse' && 'ممرض/ة'}
                  {staffRole === 'assistant' && 'مساعد طبي'}
                  {staffRole === 'technician' && 'فني'}
                </Badge>
              </div>
            </div>
            <Button onClick={() => onNavigate('home')} variant="outline">
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Calendar}
            title="حجوزات اليوم"
            value={todayAppointments.length}
            color="bg-blue-600"
          />
          <StatCard
            icon={CheckCircle}
            title="مكتمل"
            value={completedToday}
            color="bg-green-600"
          />
          <StatCard
            icon={Activity}
            title="قيد الانتظار"
            value={pendingToday}
            color="bg-orange-600"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="appointments">الحجوزات</TabsTrigger>
            <TabsTrigger value="schedule">الجدول الزمني</TabsTrigger>
            {canCheckIn && <TabsTrigger value="checkin">تسجيل الحضور</TabsTrigger>}
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">حجوزات اليوم</h3>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                    <Input
                      placeholder="بحث عن مريض..."
                      className="pr-10 w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-40"
                  />
                </div>
              </div>

              {todayAppointments.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="size-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">لا توجد حجوزات لهذا اليوم</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>الوقت</TableHead>
                        <TableHead>اسم المريض</TableHead>
                        <TableHead>رقم الهاتف</TableHead>
                        <TableHead>نوع الدفع</TableHead>
                        <TableHead>الحالة</TableHead>
                        <TableHead>الملاحظات</TableHead>
                        {canUpdateStatus && <TableHead>الإجراءات</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todayAppointments
                        .filter(apt => 
                          searchQuery === '' || 
                          apt.patientName.includes(searchQuery) ||
                          apt.patientPhone.includes(searchQuery)
                        )
                        .map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Clock className="size-4 text-gray-500" />
                                <span className="font-medium">{appointment.time}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-medium">{appointment.patientName}</p>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Phone className="size-4 text-gray-500" />
                                <span className="text-sm">{appointment.patientPhone}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={appointment.paymentMethod === 'cash' ? 'secondary' : 'default'}>
                                {appointment.paymentMethod === 'cash' ? 'نقدي' : 'إلكتروني'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {appointment.status === 'pending' && (
                                <Badge variant="secondary">قيد الانتظار</Badge>
                              )}
                              {appointment.status === 'confirmed' && (
                                <Badge className="bg-blue-600">مؤكد</Badge>
                              )}
                              {appointment.status === 'completed' && (
                                <Badge className="bg-green-600">مكتمل</Badge>
                              )}
                              {appointment.status === 'cancelled' && (
                                <Badge variant="destructive">ملغي</Badge>
                              )}
                              {appointment.status === 'no-show' && (
                                <Badge variant="destructive">لم يحضر</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              <p className="text-sm text-gray-600 max-w-xs truncate">
                                {appointment.notes || '-'}
                              </p>
                            </TableCell>
                            {canUpdateStatus && (
                              <TableCell>
                                <div className="flex gap-2">
                                  {appointment.status === 'pending' && (
                                    <Button size="sm" className="bg-blue-600">تأكيد</Button>
                                  )}
                                  {appointment.status === 'confirmed' && (
                                    <>
                                      <Button size="sm" className="bg-green-600">إتمام</Button>
                                      <Button size="sm" variant="outline" className="text-red-600">
                                        لم يحضر
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            )}
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-6">الجدول الزمني الأسبوعي</h3>
              <div className="grid gap-4">
                {branch.schedule.map((day) => (
                  <div key={day.day} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold">{day.day}</h4>
                      {day.isAvailable ? (
                        <Badge className="bg-green-600">متاح</Badge>
                      ) : (
                        <Badge variant="secondary">مغلق</Badge>
                      )}
                    </div>
                    
                    {day.isAvailable ? (
                      <div className="grid grid-cols-6 gap-2">
                        {day.slots.map((slot, index) => (
                          <div
                            key={index}
                            className={`p-2 text-center rounded text-sm ${
                              slot.isBooked
                                ? 'bg-red-100 text-red-700 font-medium'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            {slot.time}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">لا يوجد مواعيد متاحة في هذا اليوم</p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Check-in Tab (Reception only) */}
          {canCheckIn && (
            <TabsContent value="checkin">
              <Card className="p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-blue-100 rounded-full mb-4">
                      <UserCheck className="size-12 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">تسجيل حضور المريض</h3>
                    <p className="text-gray-600">ابحث عن المريض وقم بتسجيل حضوره</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">بحث عن حجز</label>
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                        <Input
                          placeholder="اسم المريض أو رقم الهاتف..."
                          className="pr-12 text-lg py-6"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                    </div>

                    {searchQuery && (
                      <div className="border rounded-lg divide-y">
                        {appointments
                          .filter(apt => 
                            apt.status === 'confirmed' &&
                            apt.date === selectedDate &&
                            (apt.patientName.includes(searchQuery) || apt.patientPhone.includes(searchQuery))
                          )
                          .map((appointment) => (
                            <div key={appointment.id} className="p-4 hover:bg-gray-50">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-bold text-lg">{appointment.patientName}</p>
                                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <Clock className="size-4" />
                                      {appointment.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Phone className="size-4" />
                                      {appointment.patientPhone}
                                    </span>
                                  </div>
                                </div>
                                <Button className="bg-green-600">
                                  <CheckCircle className="size-4 ml-2" />
                                  تسجيل الحضور
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-6">
                      <div className="p-4 bg-green-50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-green-700">{completedToday}</p>
                        <p className="text-sm text-green-600 mt-1">تم الحضور اليوم</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg text-center">
                        <p className="text-3xl font-bold text-blue-700">{pendingToday}</p>
                        <p className="text-sm text-blue-600 mt-1">في انتظار الحضور</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {/* Branch Info Card */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-bold mb-4">معلومات الفرع</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">اسم الفرع</p>
              <p className="font-medium">{branch.name}</p>
            </div>
            {branch.area && (
              <div>
                <p className="text-sm text-gray-600 mb-1">المنطقة</p>
                <p className="font-medium">{branch.area}</p>
              </div>
            )}
            {branch.phone && (
              <div>
                <p className="text-sm text-gray-600 mb-1">رقم الهاتف</p>
                <p className="font-medium">{branch.phone}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">عدد الموظفين</p>
              <p className="font-medium">{staff.length} موظف</p>
            </div>
          </div>

          {staff.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-bold mb-3">فريق العمل</h4>
              <div className="grid grid-cols-2 gap-3">
                {staff.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-white rounded-lg">
                      <Users className="size-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-gray-600">
                        {member.role === 'reception' && 'موظف استقبال'}
                        {member.role === 'nurse' && 'ممرض/ة'}
                        {member.role === 'assistant' && 'مساعد طبي'}
                        {member.role === 'technician' && 'فني'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

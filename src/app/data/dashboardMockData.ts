// Dashboard Mock Data for DocGate Platform

export interface Branch {
  id: string;
  doctorId: string;
  type: 'physical' | 'online';
  name: string;
  address?: string;
  area?: string;
  phone?: string;
  schedule: BranchSchedule[];
  prices: {
    cash?: number;
    insurance?: number;
    online?: number;
  };
  insurances: string[];
  staff: Staff[];
  isActive: boolean;
  createdAt: string;
  rating: number;
  reviewsCount: number;
}

export interface BranchSchedule {
  day: string; // السبت, الأحد, etc.
  slots: TimeSlot[];
  isAvailable: boolean;
}

export interface TimeSlot {
  time: string;
  isBooked: boolean;
  appointmentId?: string;
}

export interface Staff {
  id: string;
  branchId: string;
  name: string;
  role: 'reception' | 'nurse' | 'assistant' | 'technician';
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  branchId: string;
  branchName: string;
  date: string;
  time: string;
  type: 'physical' | 'online';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  paymentMethod: 'cash' | 'online';
  paymentStatus: 'pending' | 'paid';
  price: number;
  notes?: string;
  createdAt: string;
  completedAt?: string;
  canRate: boolean;
}

export interface Rating {
  id: string;
  appointmentId: string;
  doctorId: string;
  doctorName: string;
  branchId: string;
  branchName: string;
  patientId: string;
  patientName: string;
  type: 'physical' | 'online';
  scores: {
    reception?: number; // Physical only
    punctuality: number;
    doctor: number;
  };
  overallScore: number;
  comment: string;
  createdAt: string;
  isApproved: boolean;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: 'admin' | 'doctor' | 'staff';
  action: string;
  targetType: 'doctor' | 'branch' | 'appointment' | 'rating' | 'staff';
  targetId: string;
  details: string;
  timestamp: string;
}

export interface DoctorAccount {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  nationalId: string;
  licenseNumber: string;
  isApproved: boolean;
  isSuspended: boolean;
  hasApprovedBadge: boolean;
  branches: string[]; // branch IDs
  certificates: string[];
  cv?: string;
  createdAt: string;
  lastLogin: string;
}

// Mock Branches Data
export const branches: Branch[] = [
  {
    id: 'br-1-1',
    doctorId: '1',
    type: 'physical',
    name: 'عيادة الحداد لطب الأسنان - المعلا', // Changed from الشعيبي
    address: 'شارع المعلا الرئيسي، بجوار مستشفى الجمهورية',
    area: 'المعلا',
    phone: '+967 2 254789',
    schedule: [
      { day: 'السبت', slots: [{ time: '09:00', isBooked: false }, { time: '10:00', isBooked: true, appointmentId: 'app-1' }], isAvailable: true },
      { day: 'الأحد', slots: [{ time: '09:00', isBooked: false }, { time: '10:00', isBooked: false }], isAvailable: true },
      { day: 'الاثنين', slots: [{ time: '09:00', isBooked: false }], isAvailable: true },
      { day: 'الثلاثاء', slots: [{ time: '09:00', isBooked: false }], isAvailable: true },
      { day: 'الأربعاء', slots: [{ time: '09:00', isBooked: false }], isAvailable: true },
      { day: 'الخميس', slots: [], isAvailable: false },
      { day: 'الجمعة', slots: [], isAvailable: false }
    ],
    prices: { cash: 5000, insurance: 4000 },
    insurances: ['التأمين الصحي الوطني', 'تأمين اليمن'],
    staff: [
      { id: 'st-1', branchId: 'br-1-1', name: 'أمل محمد', role: 'reception', phone: '+967 777 123456', email: 'amal@clinic.ye', isActive: true, createdAt: '2025-01-01' }
    ],
    isActive: true,
    createdAt: '2024-06-15',
    rating: 4.9,
    reviewsCount: 245
  },
  {
    id: 'br-1-online',
    doctorId: '1',
    type: 'online',
    name: 'استشارة أونلاين - د. أحمد الحداد', // Changed from د. محمد الشعيبي
    schedule: [
      { day: 'السبت', slots: [{ time: '20:00', isBooked: false }, { time: '21:00', isBooked: false }], isAvailable: true },
      { day: 'الأحد', slots: [{ time: '20:00', isBooked: false }], isAvailable: true }
    ],
    prices: { online: 8000 },
    insurances: [],
    staff: [],
    isActive: true,
    createdAt: '2025-01-10',
    rating: 4.8,
    reviewsCount: 45
  },
  {
    id: 'br-2-1',
    doctorId: '2',
    type: 'physical',
    name: 'مركز الشميري النسائي', // Changed from مركز باحارثة
    address: 'كريتر، شارع الحرية',
    area: 'كريتر',
    phone: '+967 2 265432',
    schedule: [
      { day: 'السبت', slots: [{ time: '09:00', isBooked: false }], isAvailable: true },
      { day: 'الأحد', slots: [{ time: '09:00', isBooked: false }], isAvailable: true }
    ],
    prices: { cash: 6000, insurance: 5000 },
    insurances: ['التأمين الصحي الوطني'],
    staff: [
      { id: 'st-2', branchId: 'br-2-1', name: 'سعاد أحمد', role: 'nurse', phone: '+967 777 234567', email: 'suad@clinic.ye', isActive: true, createdAt: '2025-01-01' }
    ],
    isActive: true,
    createdAt: '2024-03-20',
    rating: 4.8,
    reviewsCount: 312
  }
];

// Mock Appointments Data
export const appointments: Appointment[] = [
  {
    id: 'app-1',
    patientId: 'p-1',
    patientName: 'خالد علي السعدي',
    patientPhone: '+967 777 111222',
    doctorId: '1',
    doctorName: 'د. أحمد علي الحداد', // Changed from د. محمد أحمد الشعيبي
    branchId: 'br-1-1',
    branchName: 'عيادة الحداد لطب الأسنان - المعلا', // Changed from عيادة الشعيبي
    date: '2026-01-22',
    time: '10:00',
    type: 'physical',
    status: 'confirmed',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    price: 5000,
    notes: 'ألم في الضرس الأيسر',
    createdAt: '2026-01-18',
    canRate: false
  },
  {
    id: 'app-2',
    patientId: 'p-2',
    patientName: 'فاطمة حسن باوزير',
    patientPhone: '+967 777 222333',
    doctorId: '1',
    doctorName: 'د. محمد أحمد الشعيبي',
    branchId: 'br-1-1',
    branchName: 'عيادة الشعيبي لطب الأسنان - المعلا',
    date: '2026-01-15',
    time: '09:00',
    type: 'physical',
    status: 'completed',
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    price: 5000,
    createdAt: '2026-01-10',
    completedAt: '2026-01-15',
    canRate: true
  },
  {
    id: 'app-3',
    patientId: 'p-3',
    patientName: 'سارة محمد العمودي',
    patientPhone: '+967 777 333444',
    doctorId: '1',
    doctorName: 'د. أحمد علي الحداد', // Changed from د. محمد أحمد الشعيبي
    branchId: 'br-1-online',
    branchName: 'استشارة أونلاين - د. أحمد الحداد', // Changed from د. محمد الشعيبي
    date: '2026-01-23',
    time: '20:00',
    type: 'online',
    status: 'confirmed',
    paymentMethod: 'online',
    paymentStatus: 'paid',
    price: 8000,
    notes: 'استشارة عن تقويم الأسنان',
    createdAt: '2026-01-19',
    canRate: false
  },
  {
    id: 'app-4',
    patientId: 'p-4',
    patientName: 'أحمد صالح النقيب',
    patientPhone: '+967 777 444555',
    doctorId: '2',
    doctorName: 'د. أماني سعيد الشميري', // Changed from د. فاطمة علي باحارثة
    branchId: 'br-2-1',
    branchName: 'مركز الشميري النسائي', // Changed from مركز باحارثة
    date: '2026-01-21',
    time: '09:00',
    type: 'physical',
    status: 'pending',
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    price: 6000,
    createdAt: '2026-01-19',
    canRate: false
  }
];

// Mock Ratings Data
export const ratings: Rating[] = [
  {
    id: 'rat-1',
    appointmentId: 'app-2',
    doctorId: '1',
    doctorName: 'د. محمد أحمد الشعيبي',
    branchId: 'br-1-1',
    branchName: 'عيادة الشعيبي لطب الأسنان - المعلا',
    patientId: 'p-2',
    patientName: 'فاطمة حسن باوزير',
    type: 'physical',
    scores: {
      reception: 5,
      punctuality: 5,
      doctor: 5
    },
    overallScore: 5.0,
    comment: 'خدمة ممتازة ودكتور متميز، أنصح بالزيارة',
    createdAt: '2026-01-16',
    isApproved: true
  },
  {
    id: 'rat-2',
    appointmentId: 'app-100',
    doctorId: '1',
    doctorName: 'د. محمد أحمد الشعيبي',
    branchId: 'br-1-1',
    branchName: 'عيادة الشعيبي لطب الأسنان - المعلا',
    patientId: 'p-5',
    patientName: 'محمد سعيد الكاف',
    type: 'physical',
    scores: {
      reception: 4,
      punctuality: 5,
      doctor: 5
    },
    overallScore: 4.7,
    comment: 'تجربة جيدة بشكل عام',
    createdAt: '2026-01-12',
    isApproved: true
  }
];

// Mock Audit Logs
export const auditLogs: AuditLog[] = [
  {
    id: 'log-1',
    userId: 'admin-1',
    userName: 'مدير النظام',
    userRole: 'admin',
    action: 'approved_badge',
    targetType: 'doctor',
    targetId: '1',
    details: 'تم منح شارة الطبيب المعتمد للدكتور محمد الشعيبي',
    timestamp: '2026-01-20 14:30:00'
  },
  {
    id: 'log-2',
    userId: '1',
    userName: 'د. محمد أحمد الشعيبي',
    userRole: 'doctor',
    action: 'created_branch',
    targetType: 'branch',
    targetId: 'br-1-online',
    details: 'تم إنشاء فرع جديد: استشارة أونلاين',
    timestamp: '2026-01-10 09:15:00'
  },
  {
    id: 'log-3',
    userId: 'admin-1',
    userName: 'مدير النظام',
    userRole: 'admin',
    action: 'moderated_rating',
    targetType: 'rating',
    targetId: 'rat-1',
    details: 'تم الموافقة على التقييم',
    timestamp: '2026-01-16 11:00:00'
  },
  {
    id: 'log-4',
    userId: '1',
    userName: 'د. محمد أحمد الشعيبي',
    userRole: 'doctor',
    action: 'added_staff',
    targetType: 'staff',
    targetId: 'st-1',
    details: 'تم إضافة موظفة استقبال: أمل محمد',
    timestamp: '2026-01-05 10:20:00'
  }
];

// Mock Doctor Accounts
export const doctorAccounts: DoctorAccount[] = [
  {
    id: '1',
    name: 'د. محمد أحمد الشعيبي',
    specialty: 'طب الأسنان',
    email: 'dr.shaabi@docgate.ye',
    phone: '+967 777 123456',
    nationalId: '01234567890',
    licenseNumber: 'DEN-2024-001',
    isApproved: true,
    isSuspended: false,
    hasApprovedBadge: true,
    branches: ['br-1-1', 'br-1-online'],
    certificates: ['cert-1.pdf', 'cert-2.pdf'],
    cv: 'cv-dr-shaabi.pdf',
    createdAt: '2024-06-15',
    lastLogin: '2026-01-20'
  },
  {
    id: '2',
    name: 'د. أماني سعيد الشميري', // Changed from د. فاطمة علي باحارثة
    specialty: 'أمراض النساء والولادة',
    email: 'dr.baharitha@docgate.ye',
    phone: '+967 777 234567',
    nationalId: '01234567891',
    licenseNumber: 'GYN-2024-002',
    isApproved: true,
    isSuspended: false,
    hasApprovedBadge: true,
    branches: ['br-2-1'],
    certificates: ['cert-3.pdf'],
    createdAt: '2024-03-20',
    lastLogin: '2026-01-19'
  },
  {
    id: '3',
    name: 'د. خالد سعيد النقيب',
    specialty: 'جراحة العظام',
    email: 'dr.naqeeb@docgate.ye',
    phone: '+967 777 345678',
    nationalId: '01234567892',
    licenseNumber: 'ORT-2024-003',
    isApproved: true,
    isSuspended: false,
    hasApprovedBadge: false,
    branches: [],
    certificates: [],
    createdAt: '2025-12-01',
    lastLogin: '2026-01-18'
  }
];

// Helper functions
export const getAppointmentsByDoctorId = (doctorId: string) => 
  appointments.filter(app => app.doctorId === doctorId);

export const getAppointmentsByBranchId = (branchId: string) =>
  appointments.filter(app => app.branchId === branchId);

export const getRatingsByDoctorId = (doctorId: string) =>
  ratings.filter(rating => rating.doctorId === doctorId);

export const getBranchesByDoctorId = (doctorId: string) =>
  branches.filter(branch => branch.doctorId === doctorId);

export const getStaffByBranchId = (branchId: string) =>
  branches.find(branch => branch.id === branchId)?.staff || [];

// Dashboard statistics
export const getDashboardStats = () => ({
  totalDoctors: doctorAccounts.length,
  totalBranches: branches.length,
  totalAppointments: appointments.length,
  totalRatings: ratings.length,
  pendingApprovals: doctorAccounts.filter(d => !d.isApproved).length,
  activeDoctors: doctorAccounts.filter(d => !d.isSuspended).length,
  todayAppointments: appointments.filter(a => a.date === '2026-01-22').length,
  completedAppointments: appointments.filter(a => a.status === 'completed').length
});

export const getDoctorDashboardStats = (doctorId: string) => {
  const doctorAppointments = getAppointmentsByDoctorId(doctorId);
  const doctorBranches = getBranchesByDoctorId(doctorId);
  const doctorRatings = getRatingsByDoctorId(doctorId);
  
  return {
    totalBranches: doctorBranches.length,
    totalAppointments: doctorAppointments.length,
    totalRatings: doctorRatings.length,
    averageRating: doctorRatings.length > 0 
      ? (doctorRatings.reduce((sum, r) => sum + r.overallScore, 0) / doctorRatings.length).toFixed(1)
      : '0.0',
    pendingAppointments: doctorAppointments.filter(a => a.status === 'pending').length,
    todayAppointments: doctorAppointments.filter(a => a.date === '2026-01-22').length,
    completedToday: doctorAppointments.filter(a => a.date === '2026-01-22' && a.status === 'completed').length,
    revenue: doctorAppointments
      .filter(a => a.status === 'completed' && a.paymentStatus === 'paid')
      .reduce((sum, a) => sum + a.price, 0)
  };
};
import { useState } from 'react';
import { yemeniDoctors } from '@/app/data/mockData';
import { Footer } from '@/app/components/Footer';
import { CheckCircle2, Calendar, Clock, MapPin, CreditCard, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface BookingPageProps {
  doctorId: string;
  date?: string;
  time?: string;
  onNavigate: (page: string, data?: any) => void;
}

export function BookingPage({ doctorId, date, time, onNavigate }: BookingPageProps) {
  const doctor = yemeniDoctors.find(d => d.id === doctorId);
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [isBooked, setIsBooked] = useState(false);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">الطبيب غير موجود</h2>
          <Button onClick={() => onNavigate('doctors')}>
            العودة إلى قائمة الأطباء
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return `${days[date.getDay()]}، ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSubmit = () => {
    // Simulate booking confirmation
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-border text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              تم تأكيد حجزك بنجاح!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              تم إرسال رسالة تأكيد الحجز إلى بريدك الإلكتروني ورقم هاتفك
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-right">
              <h3 className="font-bold text-lg mb-4 text-foreground">تفاصيل الحجز</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">الطبيب:</span>
                  <span className="font-semibold text-foreground">{doctor.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">التخصص:</span>
                  <span className="font-semibold text-foreground">{doctor.specialty}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">التاريخ:</span>
                  <span className="font-semibold text-foreground">{formatDate(date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">الوقت:</span>
                  <span className="font-semibold text-foreground">{time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">العيادة:</span>
                  <span className="font-semibold text-foreground">{doctor.clinicName}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-blue-200">
                  <span className="text-muted-foreground">المبلغ المدفوع:</span>
                  <span className="font-bold text-xl text-[#0070cd]">{doctor.price.toLocaleString()} ريال</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => onNavigate('home')}
                className="flex-1 bg-[#0070cd] hover:bg-[#0056a3] text-white"
              >
                العودة إلى الرئيسية
              </Button>
              <Button
                onClick={() => onNavigate('doctors')}
                variant="outline"
                className="flex-1"
              >
                حجز موعد آخر
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('profile', { doctorId })}
            className="text-[#0070cd] hover:text-[#0056a3] flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-[#0070cd] text-white' : 'bg-secondary text-muted-foreground'
              }`}>
                1
              </div>
              <span className="hidden sm:inline text-sm font-semibold">معلومات الحجز</span>
            </div>
            <div className="w-16 h-1 bg-secondary"></div>
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-[#0070cd] text-white' : 'bg-secondary text-muted-foreground'
              }`}>
                2
              </div>
              <span className="hidden sm:inline text-sm font-semibold">بياناتك</span>
            </div>
            <div className="w-16 h-1 bg-secondary"></div>
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-[#0070cd] text-white' : 'bg-secondary text-muted-foreground'
              }`}>
                3
              </div>
              <span className="hidden sm:inline text-sm font-semibold">الدفع</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-border">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">تفاصيل الموعد</h2>
                  
                  {/* Doctor Info */}
                  <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg mb-6">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-foreground">{doctor.name}</h3>
                      <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                      <Calendar className="w-6 h-6 text-[#0070cd]" />
                      <div>
                        <p className="text-sm text-muted-foreground">التاريخ</p>
                        <p className="font-semibold text-foreground">{formatDate(date)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                      <Clock className="w-6 h-6 text-[#0070cd]" />
                      <div>
                        <p className="text-sm text-muted-foreground">الوقت</p>
                        <p className="font-semibold text-foreground">{time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                      <MapPin className="w-6 h-6 text-[#0070cd]" />
                      <div>
                        <p className="text-sm text-muted-foreground">العيادة</p>
                        <p className="font-semibold text-foreground">{doctor.clinicName}</p>
                        <p className="text-sm text-muted-foreground">{doctor.location}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 bg-[#0070cd] hover:bg-[#0056a3] text-white py-6"
                  >
                    التالي
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">معلوماتك الشخصية</h2>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        <User className="w-4 h-4 inline ml-2" />
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        value={bookingData.name}
                        onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                        placeholder="أدخل اسمك الكامل"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070cd] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        <Phone className="w-4 h-4 inline ml-2" />
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        placeholder="+967 xxxxxxxxx"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070cd] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        <Mail className="w-4 h-4 inline ml-2" />
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                        placeholder="example@email.com"
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070cd] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        ملاحظات إضافية (اختياري)
                      </label>
                      <textarea
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                        placeholder="أي ملاحظات تود إخبار الطبيب بها"
                        rows={4}
                        className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0070cd] focus:border-transparent resize-none"
                      />
                    </div>
                  </form>

                  <div className="flex gap-4 mt-6">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1"
                    >
                      السابق
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-[#0070cd] hover:bg-[#0056a3] text-white"
                      disabled={!bookingData.name || !bookingData.phone}
                    >
                      التالي
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">طريقة الدفع</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="border-2 border-[#0070cd] rounded-lg p-4 bg-blue-50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input type="radio" checked readOnly className="w-5 h-5 text-[#0070cd]" />
                        <CreditCard className="w-6 h-6 text-[#0070cd]" />
                        <div>
                          <p className="font-semibold text-foreground">الدفع عند الزيارة</p>
                          <p className="text-sm text-muted-foreground">ادفع مباشرة في العيادة</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-2 border-border rounded-lg p-4 opacity-50 cursor-not-allowed">
                      <div className="flex items-center gap-3">
                        <input type="radio" disabled className="w-5 h-5" />
                        <CreditCard className="w-6 h-6" />
                        <div>
                          <p className="font-semibold text-foreground">الدفع الإلكتروني</p>
                          <p className="text-sm text-muted-foreground">قريباً</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="flex-1"
                    >
                      السابق
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="flex-1 bg-[#0070cd] hover:bg-[#0056a3] text-white"
                    >
                      تأكيد الحجز
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-20">
              <h3 className="font-bold text-lg mb-4">ملخص الحجز</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">سعر الكشف</span>
                  <span className="font-semibold text-foreground">{doctor.price.toLocaleString()} ريال</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">رسوم الخدمة</span>
                  <span className="font-semibold text-foreground">0 ريال</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-bold text-foreground">المجموع</span>
                  <span className="font-bold text-xl text-[#0070cd]">{doctor.price.toLocaleString()} ريال</span>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>حجز فوري ومؤكد</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>إلغاء مجاني</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>دفع آمن</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
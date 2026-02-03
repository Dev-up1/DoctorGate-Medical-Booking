import { useState } from 'react';
import { yemeniDoctors } from '@/app/data/mockData';
import { Footer } from '@/app/components/Footer';
import { MapPin, Star, Award, GraduationCap, Calendar, Clock, Phone, Building2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface DoctorProfilePageProps {
  doctorId: string;
  onNavigate: (page: string, data?: any) => void;
}

export function DoctorProfilePage({ doctorId, onNavigate }: DoctorProfilePageProps) {
  const doctor = yemeniDoctors.find(d => d.id === doctorId);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

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

  const getNextWeekDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = getNextWeekDates();

  const formatDate = (date: Date) => {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: date.getMonth() + 1,
      full: date.toISOString().split('T')[0]
    };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('doctors')}
            className="text-[#0070cd] hover:text-[#0056a3] flex items-center gap-2 mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة إلى قائمة الأطباء
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Card */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-xl object-cover border-4 border-secondary"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-foreground mb-2">{doctor.name}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{doctor.specialty}</p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg">
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-amber-700">{doctor.rating}</span>
                    </div>
                    <span className="text-muted-foreground">({doctor.reviewsCount} تقييم)</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-[#0070cd]" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="w-5 h-5 text-[#0070cd]" />
                      <span>{doctor.clinicName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-5 h-5 text-[#0070cd]" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Doctor */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">نبذة عن الطبيب</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{doctor.bio}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#0070cd]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">الخبرة</h4>
                    <p className="text-muted-foreground">{doctor.experience} سنة خبرة</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-[#0070cd]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">المؤهلات</h4>
                    <p className="text-muted-foreground">{doctor.education}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">ساعات العمل</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-foreground">السبت - الخميس</span>
                  <span className="text-muted-foreground">9:00 صباحاً - 5:00 مساءً</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-foreground">الجمعة</span>
                  <span className="text-red-500 font-semibold">مغلق</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-20">
              <div className="text-center mb-6 pb-6 border-b border-border">
                <p className="text-sm text-muted-foreground mb-2">سعر الكشف</p>
                <p className="text-3xl font-bold text-[#0070cd]">{doctor.price.toLocaleString()} ريال</p>
              </div>

              <h3 className="font-bold text-lg mb-4">اختر موعدك</h3>

              {/* Date Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3">التاريخ</h4>
                <div className="grid grid-cols-3 gap-2">
                  {dates.map((date) => {
                    const formatted = formatDate(date);
                    const isSelected = selectedDate === formatted.full;
                    return (
                      <button
                        key={formatted.full}
                        onClick={() => setSelectedDate(formatted.full)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-[#0070cd] bg-blue-50 text-[#0070cd]'
                            : 'border-border hover:border-[#0070cd]/50'
                        }`}
                      >
                        <div className="text-xs text-muted-foreground mb-1">{formatted.day}</div>
                        <div className="font-bold">{formatted.date}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-muted-foreground mb-3">الوقت</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {doctor.availableTimes.map((time) => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 text-sm transition-all ${
                            isSelected
                              ? 'border-[#0070cd] bg-blue-50 text-[#0070cd] font-semibold'
                              : 'border-border hover:border-[#0070cd]/50'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-[#0070cd] hover:bg-[#0056a3] text-white py-6 text-lg"
                disabled={!selectedDate || !selectedTime}
                onClick={() => onNavigate('booking', { 
                  doctorId: doctor.id,
                  date: selectedDate,
                  time: selectedTime
                })}
              >
                <Calendar className="w-5 h-5 ml-2" />
                تأكيد الحجز
              </Button>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>حجز فوري ومؤكد</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>إلغاء مجاني حتى 24 ساعة</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>دفع آمن ومحمي</span>
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
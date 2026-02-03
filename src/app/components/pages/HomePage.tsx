import { SearchBar } from '@/app/components/SearchBar';
import { DoctorCard } from '@/app/components/DoctorCard';
import { Footer } from '@/app/components/Footer';
import { services, yemeniDoctors, specialtiesForHomepage, areasForHomepage, topMedicalCenters } from '@/app/data/mockData';
import { Shield, Users, Award, Calendar, Star, CheckCircle2, ChevronRight, Phone, MapPin, Building2, Stethoscope, TestTube, Tag, Video, FileText, Activity } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const handleSearch = (specialty: string, city: string, region: string, doctorName: string) => {
    onNavigate('doctors', { specialty, city, region, doctorName });
  };

  const mostBookedDoctors = yemeniDoctors.filter(d => d.reviewsCount > 250).slice(0, 6);

  const handleServiceClick = (serviceId: string) => {
    switch (serviceId) {
      case '1':
        onNavigate('doctors');
        break;
      case '2':
        onNavigate('hospitals');
        break;
      case '3':
        onNavigate('labs');
        break;
      case '4':
        onNavigate('offers-articles');
        break;
      case '5':
        onNavigate('online-consultation');
        break;
      case '6':
        onNavigate('offers-articles');
        break;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Premium Medical Background */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden">
        {/* Premium Medical Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1758691461932-d0aa0ebf6b31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGRvY3RvciUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3Njg1MjgwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Medical Consultation"
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D9488]/92 via-[#115E59]/90 to-[#0F766E]/92"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              احجز موعدك الطبي بسهولة وأمان
            </h1>
            <p className="text-xl md:text-2xl text-teal-50 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              ابحث عن أفضل الأطباء والمراكز الطبية في عدن واحجز موعدك خلال دقائق
            </p>
          </div>

          {/* Floating Search Card with Enhanced Shadow */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl">
              <SearchBar onSearch={handleSearch} variant="hero" />
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f8f9fb"/>
          </svg>
        </div>
      </section>

      {/* Services Section - Icon-Based Premium Cards */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">خدماتنا الطبية</h2>
            <p className="text-lg text-muted-foreground">
              نوفر لك مجموعة متكاملة من الخدمات الطبية عالية الجودة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Service 1: Doctor Booking */}
            <button
              onClick={() => handleServiceClick('1')}
              className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#0D9488] p-8 text-right"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">حجز طبيب</h3>
                  <p className="text-sm text-muted-foreground">احجز موعد مع طبيب متخصص</p>
                </div>
              </div>
            </button>

            {/* Service 2: Medical Centers */}
            <button
              onClick={() => handleServiceClick('2')}
              className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#0D9488] p-8 text-right"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">المستشفيات والمراكز الطبية</h3>
                  <p className="text-sm text-muted-foreground">ابحث واحجز داخل المستشفيات والمراكز</p>
                </div>
              </div>
            </button>

            {/* Service 3: Labs & Radiology */}
            <button
              onClick={() => handleServiceClick('3')}
              className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#0D9488] p-8 text-right"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <div className="relative">
                    <TestTube className="w-8 h-8 text-white" />
                    <Activity className="w-4 h-4 text-white absolute -bottom-1 -left-1" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">المختبرات والأشعة</h3>
                  <p className="text-sm text-muted-foreground">احجز تحاليل وفحوصات طبية</p>
                </div>
              </div>
            </button>

            {/* Service 4: Offers */}
            <button
              onClick={() => handleServiceClick('4')}
              className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#0D9488] p-8 text-right"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">العروض</h3>
                  <p className="text-sm text-muted-foreground">تصفح العروض والخصومات الطبية</p>
                </div>
              </div>
            </button>

            {/* Service 5: Online Consultation */}
            <button
              onClick={() => handleServiceClick('5')}
              className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#0D9488] p-8 text-right"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">استشارة أونلاين</h3>
                  <p className="text-sm text-muted-foreground">تحدث مع طبيب عبر الإنترنت</p>
                </div>
              </div>
            </button>

            {/* Service 6: Medical Content */}
            <button
              onClick={() => handleServiceClick('6')}
              className="relative group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#0D9488] p-8 text-right"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">محتوى طبي</h3>
                  <p className="text-sm text-muted-foreground">مقالات ونصائح طبية موثوقة</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-4">
                <Users className="w-8 h-8 text-[#0D9488]" />
              </div>
              <h4 className="font-bold text-3xl text-foreground mb-1">500+</h4>
              <p className="text-sm text-muted-foreground">طبيب متخصص</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-4">
                <Calendar className="w-8 h-8 text-[#0D9488]" />
              </div>
              <h4 className="font-bold text-3xl text-foreground mb-1">50,000+</h4>
              <p className="text-sm text-muted-foreground">موعد محجوز</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-4">
                <Shield className="w-8 h-8 text-[#0D9488]" />
              </div>
              <h4 className="font-bold text-3xl text-foreground mb-1">100%</h4>
              <p className="text-sm text-muted-foreground">حجز آمن</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-full mb-4">
                <Award className="w-8 h-8 text-[#0D9488]" />
              </div>
              <h4 className="font-bold text-3xl text-foreground mb-1">4.8</h4>
              <p className="text-sm text-muted-foreground">تقييم العملاء</p>
            </div>
          </div>
        </div>
      </section>

      {/* Book by Specialty - Premium Image Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">احجز كشف حسب التخصص</h2>
            <p className="text-lg text-muted-foreground">
              اختر التخصص الطبي واحجز مع أفضل الأطباء في عدن
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {specialtiesForHomepage.map((specialty) => {
              return (
                <button
                  key={specialty.id}
                  onClick={() => onNavigate('doctors', { specialty: specialty.fullName })}
                  className="relative group overflow-hidden rounded-2xl aspect-square bg-gray-200 hover:shadow-2xl transition-all duration-300 border border-border hover:border-[#0D9488]"
                >
                  {/* Image */}
                  <img
                    src={specialty.image}
                    alt={specialty.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"></div>
                  {/* Text */}
                  <div className="absolute inset-0 flex items-end justify-center p-5">
                    <h3 className="text-white font-bold text-base md:text-lg text-center leading-tight drop-shadow-lg">
                      {specialty.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('doctors')}
              className="text-[#0D9488] hover:text-[#115E59] font-semibold inline-flex items-center gap-2 transition-colors text-lg"
            >
              عرض جميع التخصصات
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* Most Booked Doctors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">الأطباء الأكثر اختياراً</h2>
              <p className="text-lg text-muted-foreground">
                الأطباء الأكثر حجزاً وتقييماً في عدن
              </p>
            </div>
            <button
              onClick={() => onNavigate('doctors')}
              className="hidden md:flex text-[#0D9488] hover:text-[#115E59] font-semibold items-center gap-2 transition-colors"
            >
              أظهر المزيد
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mostBookedDoctors.map((doctor) => (
              <div key={doctor.id} className="relative">
                {doctor.reviewsCount > 400 && (
                  <div className="absolute -top-2 -right-2 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    الأكثر حجزاً
                  </div>
                )}
                {doctor.rating >= 4.9 && (
                  <div className="absolute top-6 -right-2 z-10 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    تقييم مرتفع
                  </div>
                )}
                <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-xl object-cover border-2 border-secondary flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-foreground mb-1 truncate">{doctor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold text-foreground">{doctor.rating}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">({doctor.reviewsCount})</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                        <span className="truncate">{doctor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4 text-[#0D9488] flex-shrink-0" />
                        <span className="direction-ltr">{doctor.phone}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate('profile', { doctorId: doctor.id })}
                      className="w-full bg-[#0D9488] hover:bg-[#115E59] text-white py-3 rounded-lg font-semibold transition-colors shadow-sm"
                    >
                      احجز الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('doctors')}
              className="text-[#0D9488] hover:text-[#115E59] font-semibold inline-flex items-center gap-2 transition-colors text-lg"
            >
              أظهر المزيد
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* Most Booked Medical Centers - NEW SECTION */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">المراكز الأكثر اختياراً</h2>
            <p className="text-lg text-muted-foreground">
              أفضل المستشفيات والمراكز الطبية في عدن
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMedicalCenters.map((center) => (
              <button
                key={center.id}
                onClick={() => onNavigate('hospitals')}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-border hover:border-[#0D9488] group text-right"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={center.image}
                    alt={center.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-foreground">{center.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-foreground mb-3">{center.name}</h3>
                  <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#0D9488]" />
                      <span>{center.specialtiesCount} تخصص طبي</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#0D9488]" />
                      <span>{center.area}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <span className="text-[#0D9488] font-semibold inline-flex items-center gap-2">
                      عرض الأطباء
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              كل احتياجاتك الطبية على DoctorGate {/* Changed from DocGate */}
            </h2>
            <p className="text-lg text-muted-foreground">
              نوفر لك تجربة حجز طبية آمنة وموثوقة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                تقييمات حقيقية من المرضى
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                تقييمات من مرضى حجزوا عبر DocGate وزاروا الطبيب فعلياً.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                حجزك مؤكد مع الدكتور
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                يتم تأكيد الحجز فور اختيار الموعد التاح.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-border hover:shadow-2xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                احجز مجاناً وادفع في العيادة
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                نفس سعر الكشف داخل العيادة بدون أي رسوم إضافية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Registration CTA */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0D9488] to-[#115E59] rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-12 text-white flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  هل أنت طبيب؟ انضم إلى DoctorGate {/* Changed from DocGate */}
                </h2>
                <p className="text-xl text-teal-100 mb-8 leading-relaxed">
                  وسّع قاعدة مرضاك وكن جزءاً من منصة طبية موثوقة تخدم آلاف العائلات في عدن.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-lg">وصول يومي لمرضى حقيقيين</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-lg">إدارة مواعيدك بسهولة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0" />
                    <span className="text-lg">صفحة احترافية تعزز ثقة المرضى بك</span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('doctor-registration')}
                  className="bg-white text-[#0D9488] px-8 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-colors text-lg shadow-xl inline-flex items-center gap-2 w-fit"
                >
                  انضم كطبيب الآن
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
              </div>
              <div className="relative h-full min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1758691461530-b215ed4ede6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Professional Doctor"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Quick Access - Specialties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            اختر التخصص واحجز كشف دكتور
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'دكتور جلدية',
              'دكتور أسنان',
              'دكتور نفسي',
              'دكتور أطفال وحديثي الولادة',
              'دكتور مخ وأعصاب',
              'دكتور عظام',
              'دكتور نساء وتوليد',
              'دكتور أنف وأن وحجة',
              'دكتور قلب وأوعية دموية'
            ].map((specialty, index) => (
              <button
                key={index}
                onClick={() => onNavigate('doctors')}
                className="text-right p-4 bg-white rounded-lg border border-border hover:border-[#0D9488] hover:shadow-md transition-all text-foreground hover:text-[#0D9488]"
              >
                {specialty}
              </button>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={() => onNavigate('doctors')}
              className="text-[#0D9488] hover:text-[#115E59] font-semibold inline-flex items-center gap-2 transition-colors"
            >
              عرض المزيد ...
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* SEO Quick Access - Areas */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            اختر المنطقة واحجز كشف دكتور
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {areasForHomepage.map((area) => (
              <button
                key={area.id}
                onClick={() => onNavigate('doctors', { city: area.name })}
                className="bg-white rounded-xl p-6 border border-border hover:border-[#0D9488] hover:shadow-lg transition-all text-center group"
              >
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#0D9488] transition-colors">
                  {area.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {area.doctorsCount} طبيب
                </p>
              </button>
            ))}
          </div>
          <div className="mt-6">
            <button
              onClick={() => onNavigate('doctors')}
              className="text-[#0D9488] hover:text-[#115E59] font-semibold inline-flex items-center gap-2 transition-colors"
            >
              عرض المزيد ...
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0D9488] to-[#115E59] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ابدأ رحلتك الصحية اليوم
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المرضى الذين يثقون في DoctorGate لحجز مواعيدهم الطبية {/* Changed from DocGate */}
          </p>
          <button
            onClick={() => onNavigate('doctors')}
            className="bg-white text-[#0D9488] px-10 py-4 rounded-xl font-semibold hover:bg-teal-50 transition-colors text-lg shadow-xl"
          >
            احجز موعدك الآن
          </button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />

      {/* Floating Dashboard Access Button */}
      <button
        onClick={() => onNavigate('dashboard-access')}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-[#0D9488] to-[#115E59] text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2 font-semibold"
        title="دخول لوحات التحكم"
      >
        <Shield className="size-5" />
        <span className="hidden sm:inline">لوحات التحكم</span>
      </button>
    </div>
  );
}
import { Footer } from '@/app/components/Footer';
import { homeServices, type HomeService } from '@/app/data/mockData';
import { Stethoscope, TestTube2, Home, Activity, CheckCircle, Clock, Shield, Phone } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { HomeCareBookingModal } from '@/app/components/HomeCareBookingModal';
import { useState } from 'react';

interface HomeCarePageProps {
  onNavigate: (page: string, data?: any) => void;
}

const iconMap = {
  stethoscope: Stethoscope,
  testTube: TestTube2,
  home: Home,
  activity: Activity
};

export function HomeCarePage({ onNavigate }: HomeCarePageProps) {
  const [bookingService, setBookingService] = useState<HomeService | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBookingSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl animate-slide-in">
          <p className="font-semibold">تم تأكيد الحجز بنجاح!</p>
        </div>
      )}

      {/* Booking Modal */}
      {bookingService && (
        <HomeCareBookingModal
          serviceTitle={bookingService.title}
          servicePrice={bookingService.price}
          onClose={() => setBookingService(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0070cd] to-[#0056a3] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                خدمات الرعاية المنزلية
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                احصل على رعاية طبية متخصصة في راحة منزلك مع فريق طبي محترف ومعدات حديثة
              </p>
              <Button
                size="lg"
                className="bg-white text-[#0070cd] hover:bg-blue-50 font-semibold"
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              >
                اطلب زيارة منزلية
              </Button>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                  <Home className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Home Care */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">لماذا الرعاية المنزلية؟</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              نوفر لك رعاية طبية شاملة في منزلك بأعلى معايير الجودة والأمان
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-border">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Home className="w-7 h-7 text-[#0070cd]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">راحة المنزل</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                تلقى العلاج في بيئتك المريحة دون الحاجة للخروج
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-border">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Shield className="w-7 h-7 text-[#0070cd]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">رعاية آمنة</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                فريق طبي مدرب ومعقم بأعلى معايير السلامة
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-border">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Clock className="w-7 h-7 text-[#0070cd]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">متاح 24/7</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                خدماتنا متاحة في أي وقت تحتاجه
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-border">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <CheckCircle className="w-7 h-7 text-[#0070cd]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">احترافية عالية</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                كادر طبي متخصص وخبرة طويلة في الرعاية المنزلية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">خدماتنا المنزلية</h2>
            <p className="text-lg text-muted-foreground">
              مجموعة شاملة من الخدمت الطبية المنزلية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {homeServices.map((service) => (
              <ServiceCard key={service.id} service={service} onBook={() => setBookingService(service)} />
            ))}
          </div>
        </div>
      </section>

      {/* How to Book */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">كيفية طلب الخدمة</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              احجز خدمة الرعاية المنزلية بخطوات بسيطة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0070cd]/10 to-[#0070cd]/5 rounded-full mb-6">
                <span className="text-3xl font-bold text-[#0070cd]">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">اختر الخدمة</h3>
              <p className="text-muted-foreground leading-relaxed">
                حدد نوع الخدمة الطبية المنزلية التي تحتاجها
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0070cd]/10 to-[#0070cd]/5 rounded-full mb-6">
                <span className="text-3xl font-bold text-[#0070cd]">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">حدد الموعد</h3>
              <p className="text-muted-foreground leading-relaxed">
                اختر الوقت والتاريخ المناسب للزيارة المنزلية
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0070cd]/10 to-[#0070cd]/5 rounded-full mb-6">
                <span className="text-3xl font-bold text-[#0070cd]">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">استقبل الفريق</h3>
              <p className="text-muted-foreground leading-relaxed">
                الفريق الطبي سيصل إلى منزلك في الموعد المحدد
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0070cd] to-[#0056a3] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                هل تحتاج رعاية طبية في المنزل؟
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                تواصل معنا الآن واحجز زيارة منزلية مع أفضل الكوادر الطبية
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-[#0070cd] hover:bg-blue-50 font-semibold"
                >
                  احجز زيارة منزلية
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل بنا
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                    <span className="text-lg">فريق طبي متخصص</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                    <span className="text-lg">معدات طبية حديثة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                    <span className="text-lg">خدمة سريعة وموثوقة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-white" />
                    <span className="text-lg">أسعار مناسبة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

interface ServiceCardProps {
  service: HomeService;
  onBook: () => void;
}

function ServiceCard({ service, onBook }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Home;

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0070cd]/10 to-[#0070cd]/5 rounded-full flex items-center justify-center flex-shrink-0 group-hover:from-[#0070cd]/20 group-hover:to-[#0070cd]/10 transition-colors">
            <IconComponent className="w-8 h-8 text-[#0070cd]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {service.description}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#0070cd]">
                {service.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">ريال يمني</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">الخدمات المشمولة:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#0070cd] mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button className="w-full bg-[#0070cd] hover:bg-[#0056a3] text-white" onClick={onBook}>
          احجز الآن
        </Button>
      </div>
    </div>
  );
}
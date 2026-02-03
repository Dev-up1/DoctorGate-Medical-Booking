import { Footer } from '@/app/components/Footer';
import { DoctorCard } from '@/app/components/DoctorCard';
import { yemeniDoctors } from '@/app/data/mockData';
import { Video, CheckCircle, Clock, Shield, MessageCircle } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface OnlineConsultationPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function OnlineConsultationPage({ onNavigate }: OnlineConsultationPageProps) {
  // Get doctors available for online consultation (let's say first 6)
  const onlineDoctors = yemeniDoctors.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0070cd] to-[#0056a3] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                استشارة طبية أونلاين
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                تحدث مع أفضل الأطباء عبر مكالمة فيديو من منزلك بكل سهولة وأمان
              </p>
              <Button
                size="lg"
                className="bg-white text-[#0070cd] hover:bg-blue-50 font-semibold"
                onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
              >
                ابدأ استشارتك الآن
              </Button>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                  <Video className="w-32 h-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">كيف تعمل الاستشارة الأونلاين؟</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              احصل على استشارة طبية متخصصة في 3 خطوات بسيطة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0070cd]/10 to-[#0070cd]/5 rounded-full mb-6">
                <span className="text-3xl font-bold text-[#0070cd]">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">اختر الطبيب</h3>
              <p className="text-muted-foreground leading-relaxed">
                اختر الطبيب المناسب من قائمة الأطباء المتاحين للاستشارة الأونلاين
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0070cd]/10 to-[#0070cd]/5 rounded-full mb-6">
                <span className="text-3xl font-bold text-[#0070cd]">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">احجز موعدك</h3>
              <p className="text-muted-foreground leading-relaxed">
                اختر الوقت المناسب لك واحجز موعد الاستشارة الطبية عبر الفيديو
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#0070cd]/10 to-[#0070cd]/5 rounded-full mb-6">
                <span className="text-3xl font-bold text-[#0070cd]">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">ابدأ الاستشارة</h3>
              <p className="text-muted-foreground leading-relaxed">
                تحدث مع الطبيب عبر مكالمة فيديو واحصل على التشخيص والعلاج المناسب
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">لماذا الاستشارة الأونلاين؟</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border border-border">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-[#0070cd]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">وفر وقتك</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                لا حاجة للانتظار أو السفر، استشر الطبيب من منزلك
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border border-border">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-[#0070cd]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">آمن ومضمون</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                جميع الاستشارات آمنة ومشفرة وسرية تماماً
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border border-border">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-[#0070cd]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">تشخيص دقيق</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                احصل على تشخيص طبي دقيق ووصفة علاجية فورية
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border border-border">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-7 h-7 text-[#0070cd]" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">متابعة مستمرة</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                تابع حالتك الصحية مع الطبيب بشكل مستمر
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Doctors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              أطباء متاحون للاستشارة الأونلاين
            </h2>
            <p className="text-lg text-muted-foreground">
              اختر من بين نخبة من الأطباء المتخصصين
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlineDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={(id) => onNavigate('booking', { doctorId: id })}
                onViewProfile={(id) => onNavigate('profile', { doctorId: id })}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('doctors')}
              className="border-[#0070cd] text-[#0070cd] hover:bg-blue-50"
            >
              عرض جميع الأطباء
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#0070cd] to-[#0056a3] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            هل لديك استفسار طبي؟
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            تواصل مع طبيب متخصص الآن واحصل على استشارة طبية فورية
          </p>
          <Button
            size="lg"
            className="bg-white text-[#0070cd] hover:bg-blue-50 font-semibold px-10"
            onClick={() => onNavigate('doctors')}
          >
            ابدأ الاستشارة الآن
          </Button>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

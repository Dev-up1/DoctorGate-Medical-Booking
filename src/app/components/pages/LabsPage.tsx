import { Footer } from '@/app/components/Footer';
import { labs, type Lab, cities } from '@/app/data/mockData';
import { Star, MapPin, PhoneCall, Clock, Home, TestTube2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useState } from 'react';
import { LabBookingModal } from '@/app/components/LabBookingModal';

interface LabsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function LabsPage({ onNavigate }: LabsPageProps) {
  const [selectedArea, setSelectedArea] = useState<string>('الكل');
  const [bookingLab, setBookingLab] = useState<Lab | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredLabs = selectedArea === 'الكل'
    ? labs
    : labs.filter(l => l.area === selectedArea);

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
      {bookingLab && (
        <LabBookingModal
          labName={bookingLab.name}
          onClose={() => setBookingLab(null)}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0070cd] to-[#0056a3] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            المختبرات والأشعة الطبية
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            احجز تحاليلك الطبية والأشعة في أفضل المختبرات المعتمدة في عدن
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <span className="text-sm font-semibold text-muted-foreground flex items-center">
              المنطقة:
            </span>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedArea(city)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedArea === city
                    ? 'bg-[#0070cd] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <TestTube2 className="w-6 h-6 text-[#0070cd]" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">نتائج سريعة</h4>
                <p className="text-sm text-muted-foreground">نتائج دقيقة في نفس اليوم</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-[#0070cd]" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">زيارات منزلية</h4>
                <p className="text-sm text-muted-foreground">خدمة سحب العينات في المنزل</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-[#0070cd]" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">معتمدة</h4>
                <p className="text-sm text-muted-foreground">مختبرات معتمدة وموثوقة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Labs Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-muted-foreground">
              عرض {filteredLabs.length} مختبر ومركز تشخيص
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredLabs.map((lab) => (
              <LabCard key={lab.id} lab={lab} onBook={() => setBookingLab(lab)} />
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

interface LabCardProps {
  lab: Lab;
  onBook: () => void;
}

function LabCard({ lab, onBook }: LabCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={lab.image}
          alt={lab.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {lab.homeVisit && (
          <Badge className="absolute top-4 right-4 bg-green-500 text-white">
            زيارة منزلية
          </Badge>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{lab.name}</h3>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{lab.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({lab.reviewsCount} تقييم)
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2 text-sm">
            <MapPin className="w-4 h-4 text-[#0070cd] mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{lab.location}</span>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <Clock className="w-4 h-4 text-[#0070cd] mt-0.5" />
            <span className="text-muted-foreground">{lab.openingHours}</span>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <PhoneCall className="w-4 h-4 text-[#0070cd] mt-0.5" />
            <span className="text-muted-foreground direction-ltr">{lab.phone}</span>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-semibold text-[#0070cd]">
            نتائج التحاليل: {lab.resultsTime}
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-foreground mb-2">الخدمات المتاحة:</h4>
          <div className="flex flex-wrap gap-2">
            {lab.services.map((service, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-gray-100 text-gray-700"
              >
                {service}
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full bg-[#0070cd] hover:bg-[#0056a3] text-white" onClick={onBook}>
          احجز الآن
        </Button>
      </div>
    </div>
  );
}
import { Footer } from '@/app/components/Footer';
import { hospitals, type Hospital } from '@/app/data/mockData';
import { Star, MapPin, Bed, PhoneCall, Clock } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useState } from 'react';
import { cities } from '@/app/data/mockData';

interface HospitalsPageProps {
  onNavigate: (page: string, data?: any) => void;
}

export function HospitalsPage({ onNavigate }: HospitalsPageProps) {
  const [selectedArea, setSelectedArea] = useState<string>('الكل');

  const filteredHospitals = selectedArea === 'الكل'
    ? hospitals
    : hospitals.filter(h => h.area === selectedArea);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0070cd] to-[#0056a3] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            المستشفيات والمراكز الطبية
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            اكتشف أفضل المستشفيات والمراكز الطبية في عدن مع خدمات طبية شاملة ومتخصصة
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

      {/* Hospitals Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-muted-foreground">
              عرض {filteredHospitals.length} مستشفى ومركز طبي
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredHospitals.map((hospital) => (
              <HospitalCard
                key={hospital.id}
                hospital={hospital}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}

interface HospitalCardProps {
  hospital: Hospital;
  onNavigate: (page: string, data?: any) => void;
}

function HospitalCard({ hospital, onNavigate }: HospitalCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-border group">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={hospital.image}
            alt={hospital.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hospital.emergency && (
            <Badge className="absolute top-4 right-4 bg-red-500 text-white">
              طوارئ 24/7
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">
              {hospital.name}
            </h3>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-foreground">{hospital.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({hospital.reviewsCount} تقييم)
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-[#0070cd] mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{hospital.location}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Bed className="w-4 h-4 text-[#0070cd]" />
                <span className="text-muted-foreground">{hospital.beds} سرير</span>
              </div>

              <div className="flex items-start gap-2 text-sm">
                <PhoneCall className="w-4 h-4 text-[#0070cd] mt-0.5" />
                <span className="text-muted-foreground direction-ltr">{hospital.phone}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {hospital.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {hospital.specialties.slice(0, 4).map((specialty, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-blue-50 text-[#0070cd] hover:bg-blue-100"
                >
                  {specialty}
                </Badge>
              ))}
              {hospital.specialties.length > 4 && (
                <Badge variant="secondary" className="text-xs">
                  +{hospital.specialties.length - 4}
                </Badge>
              )}
            </div>
          </div>

          <Button
            onClick={() => onNavigate('doctors')}
            className="w-full bg-[#0070cd] hover:bg-[#0056a3] text-white"
          >
            عرض الأطباء
          </Button>
        </div>
      </div>
    </div>
  );
}

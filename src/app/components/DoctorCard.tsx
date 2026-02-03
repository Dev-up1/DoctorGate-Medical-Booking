import { MapPin, Star, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import type { Doctor } from '@/app/data/mockData';

interface DoctorCardProps {
  doctor: Doctor;
  onBook?: (doctorId: string) => void;
  onViewProfile?: (doctorId: string) => void;
}

export function DoctorCard({ doctor, onBook, onViewProfile }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-border hover:border-[#0D9488]/30">
      <div className="p-6">
        <div className="flex gap-4 mb-4">
          {/* Doctor Image */}
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-24 h-24 rounded-xl object-cover border-2 border-secondary"
          />

          {/* Doctor Info */}
          <div className="flex-1">
            <h3 
              className="font-bold text-lg text-foreground mb-1 cursor-pointer hover:text-[#0D9488] transition-colors"
              onClick={() => onViewProfile?.(doctor.id)}
            >
              {doctor.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">{doctor.specialty}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-amber-700">{doctor.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({doctor.reviewsCount} تقييم)
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{doctor.location}</span>
            </div>
          </div>
        </div>

        {/* Price & Booking */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">سعر الكشف</p>
            <p className="text-xl font-bold text-[#0D9488]">{doctor.price.toLocaleString()} ريال</p>
          </div>
          <Button
            onClick={() => onBook?.(doctor.id)}
            className="bg-[#0D9488] hover:bg-[#115E59] text-white px-6"
          >
            <Calendar className="w-5 h-5 ml-2" />
            احجز الآن
          </Button>
        </div>
      </div>
    </div>
  );
}
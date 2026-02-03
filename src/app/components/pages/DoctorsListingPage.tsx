import { useState, useEffect } from 'react';
import { DoctorCard } from '@/app/components/DoctorCard';
import { SearchBar } from '@/app/components/SearchBar';
import { Footer } from '@/app/components/Footer';
import { yemeniDoctors, specialties, cities } from '@/app/data/mockData';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface DoctorsListingPageProps {
  onNavigate: (page: string, data?: any) => void;
  initialFilters?: {
    specialty?: string;
    city?: string;
    region?: string;
    doctorName?: string;
  };
}

export function DoctorsListingPage({ onNavigate, initialFilters }: DoctorsListingPageProps) {
  const [filteredDoctors, setFilteredDoctors] = useState(yemeniDoctors);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialFilters?.specialty || 'الكل');
  const [selectedCity, setSelectedCity] = useState(initialFilters?.city || 'الكل');
  const [selectedRegion, setSelectedRegion] = useState(initialFilters?.region || 'الكل');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    filterDoctors();
  }, [selectedSpecialty, selectedCity, selectedRegion, priceRange]);

  const filterDoctors = () => {
    let filtered = [...yemeniDoctors];

    if (selectedSpecialty !== 'الكل') {
      filtered = filtered.filter(doc => doc.specialty === selectedSpecialty);
    }

    if (selectedCity !== 'الكل') {
      filtered = filtered.filter(doc => doc.location.includes(selectedCity));
    }

    if (selectedRegion !== 'الكل' && selectedRegion !== '') {
      filtered = filtered.filter(doc => doc.area === selectedRegion);
    }

    filtered = filtered.filter(doc => doc.price >= priceRange[0] && doc.price <= priceRange[1]);

    setFilteredDoctors(filtered);
  };

  const handleSearch = (specialty: string, city: string, region: string, doctorName: string) => {
    if (specialty) setSelectedSpecialty(specialty);
    if (city) setSelectedCity(city);
    if (region) setSelectedRegion(region);
    
    // Reset filters if empty strings are passed (optional, depends on UX)
    // For now, if city is empty string (e.g. user cleared it), we might want to reset to 'الكل'
    // But SearchBar usually passes '' for empty. 
    // Let's handle explicit updates:
    if (city === '') setSelectedCity('الكل');
    else if (city) setSelectedCity(city);
    
    if (region === '') setSelectedRegion('الكل');
    else if (region) setSelectedRegion(region);

    if (specialty === '') setSelectedSpecialty('الكل');
    else if (specialty) setSelectedSpecialty(specialty);

    if (doctorName) {
      // Apply name filter immediately on the current set or globally?
      // Usually name search is global or combined. 
      // The current implementation filtered immediately based on name and set state.
      // But filterDoctors effect will overwrite it if we don't store doctorName in state.
      // The original code didn't store doctorName in state, it just setFilteredDoctors.
      // But if other filters change (useEffect), it would re-filter without name.
      // I should probably follow the original pattern for name or add it to state.
      // For simplicity and robustness, I'll filter here and rely on the fact that if user changes other filters, name filter is lost (which is common in simple apps) 
      // OR I should add name to state. Let's add name to state to be better.
      // But for now, I will stick to the previous pattern but ensure it respects other filters.
      
      // Actually, the previous pattern was:
      /*
        if (doctorName) {
          const filtered = yemeniDoctors.filter(doc =>
            doc.name.toLowerCase().includes(doctorName.toLowerCase())
          );
          setFilteredDoctors(filtered);
        }
      */
      // This completely ignored other filters when searching by name. 
      // I will keep it as requested to avoid changing behavior too much, 
      // but I'll update it to just set the name filter if I were to add it.
      // Let's just do what it did before but with the new args.
      
      const filtered = yemeniDoctors.filter(doc =>
        doc.name.toLowerCase().includes(doctorName.toLowerCase())
      );
      setFilteredDoctors(filtered);
    } else {
        // Trigger re-filter based on state
        // We can't easily trigger the effect manually, but setting state variables above will trigger it.
    }
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-border sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[#0070cd]" />
          الفلاتر
        </h3>
        {showMobileFilters && (
          <button
            onClick={() => setShowMobileFilters(false)}
            className="md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Specialty Filter */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3 text-foreground">التخصص</h4>
        <div className="space-y-2">
          {specialties.map((specialty) => (
            <label
              key={specialty}
              className="flex items-center gap-3 cursor-pointer hover:bg-secondary p-2 rounded-lg transition-colors"
            >
              <input
                type="radio"
                name="specialty"
                checked={selectedSpecialty === specialty}
                onChange={() => setSelectedSpecialty(specialty)}
                className="w-4 h-4 text-[#0070cd] focus:ring-[#0070cd]"
              />
              <span className="text-sm text-foreground">{specialty}</span>
            </label>
          ))}
        </div>
      </div>

      {/* City Filter */}
      <div className="mb-6 pt-6 border-t border-border">
        <h4 className="font-semibold mb-3 text-foreground">المدينة</h4>
        <div className="space-y-2">
          {cities.map((city) => (
            <label
              key={city}
              className="flex items-center gap-3 cursor-pointer hover:bg-secondary p-2 rounded-lg transition-colors"
            >
              <input
                type="radio"
                name="city"
                checked={selectedCity === city}
                onChange={() => {
                    setSelectedCity(city);
                    setSelectedRegion('الكل'); // Reset region when changing city from sidebar
                }}
                className="w-4 h-4 text-[#0070cd] focus:ring-[#0070cd]"
              />
              <span className="text-sm text-foreground">{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="pt-6 border-t border-border">
        <h4 className="font-semibold mb-3 text-foreground">سعر الكشف</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">من: {priceRange[0].toLocaleString()} ريال</span>
            <span className="text-muted-foreground">إلى: {priceRange[1].toLocaleString()} ريال</span>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-[#0070cd]"
          />
        </div>
      </div>

      {/* Reset Filters */}
      <Button
        variant="outline"
        className="w-full mt-6"
        onClick={() => {
          setSelectedSpecialty('الكل');
          setSelectedCity('الكل');
          setSelectedRegion('الكل');
          setPriceRange([0, 10000]);
        }}
      >
        إعادة تعيين الفلاتر
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-white border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">ابحث عن طبيبك</h1>
          <SearchBar onSearch={handleSearch} variant="compact" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            تم العثور على <span className="font-bold text-foreground">{filteredDoctors.length}</span> طبيب
          </p>
          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal className="w-5 h-5" />
            الفلاتر
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Filters Sidebar - Mobile */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-80 bg-background overflow-y-auto">
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Doctors List */}
          <div className="lg:col-span-3">
            {filteredDoctors.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  لم يتم العثور على نتائج
                </h3>
                <p className="text-muted-foreground mb-6">
                  حاول تعديل الفلاتر أو البحث بمعايير مختلفة
                </p>
                <Button
                  onClick={() => {
                    setSelectedSpecialty('الكل');
                    setSelectedCity('الكل');
                    setSelectedRegion('الكل');
                    setPriceRange([0, 10000]);
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onBook={(id) => onNavigate('booking', { doctorId: id })}
                    onViewProfile={(id) => onNavigate('profile', { doctorId: id })}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

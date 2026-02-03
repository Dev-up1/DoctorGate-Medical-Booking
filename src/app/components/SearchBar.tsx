import { Search, MapPin, Stethoscope, UserSearch, Map } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';

interface SearchBarProps {
  onSearch?: (specialty: string, city: string, region: string, doctorName: string) => void;
  variant?: 'hero' | 'compact';
}

const CITY_REGIONS: Record<string, string[]> = {
  "عدن": [
    "كريتر", "المعلا", "خورمكسر", "الشيخ", "المنصورة", "انماء", "مدينة الشعب", "البريقة"
  ],
  "المكلا": [
    "فوة", "الديس", "روكب", "بويش", "خلف", "السلام", "40 شقة", "جول مسحة"
  ],
  "أبين": [
    "زنجبار", "خنفر", "جعار", "أحور", "شقرة", "لودر", "الوضيع", "مودية"
  ],
  "لحج": [
    "الحوطة", "تبن", "صبر", "المسيمير", "طور الباحة", "المقاطرة", "القبيطة", "كرش"
  ],
  "الضالع": [
    "الضالع (المدينة)", "قعطبة", "دمت", "جحاف", "الحصين", "الأزارق"
  ],
  "شبوة": [
    "عتق", "نصاب", "بيحان", "عين", "مرخة العليا", "مرخة السفلى", "حبان", "رضوم"
  ],
  "سيئون": [
    "سيئون (المدينة)", "مريمة", "الحوطة", "بور", "مدودة", "شحوح", "ساه"
  ]
};

export function SearchBar({ onSearch, variant = 'hero' }: SearchBarProps) {
  const [specialty, setSpecialty] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    setRegion(''); // Reset region when city changes
  };

  const handleSearch = () => {
    onSearch?.(specialty, city, region, doctorName);
  };

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 flex items-center gap-3 flex-wrap lg:flex-nowrap">
        <div className="flex-1 min-w-[150px]">
          <div className="relative">
            <Stethoscope className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="التخصص"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full pr-9 pl-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent text-black"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[150px]">
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full pr-9 pl-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white appearance-none cursor-pointer text-black"
            >
              <option value="">كل المدن</option>
              {Object.keys(CITY_REGIONS).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex-1 min-w-[150px]">
          <div className="relative">
            <Map className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              disabled={!city}
              className="w-full pr-9 pl-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white appearance-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 text-black"
            >
              <option value="">كل المناطق</option>
              {city && CITY_REGIONS[city]?.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
        <Button 
          onClick={handleSearch}
          className="bg-[#0D9488] hover:bg-[#115E59] text-white px-6 shrink-0"
        >
          <Search className="w-4 h-4 ml-2" />
          بحث
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Doctor Name */}
        <div className="md:order-1">
          <label className="block text-sm mb-2 text-foreground">اسم الطبيب</label>
          <div className="relative">
            <UserSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="ابحث باسم الطبيب"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent text-black"
            />
          </div>
        </div>

        {/* City */}
        <div className="md:order-2">
          <label className="block text-sm mb-2 text-foreground">المدينة</label>
          <div className="relative">
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white appearance-none cursor-pointer text-black"
            >
              <option value="">اختر المدينة</option>
              {Object.keys(CITY_REGIONS).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Region */}
        <div className="md:order-3">
          <label className="block text-sm mb-2 text-foreground">المنطقة</label>
          <div className="relative">
            <Map className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              disabled={!city}
              className="w-full pr-10 pl-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white appearance-none cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 text-black"
            >
              <option value="">اختر المنطقة</option>
              {city && CITY_REGIONS[city]?.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Specialty */}
        <div className="md:order-4">
          <label className="block text-sm mb-2 text-foreground">التخصص</label>
          <div className="relative">
            <Stethoscope className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-transparent bg-white appearance-none cursor-pointer text-black"
            >
              <option value="">اختر التخصص</option>
              <option value="طب الأسنان">طب الأسنان</option>
              <option value="أمراض النساء والولادة">أمراض النساء والولادة</option>
              <option value="جراحة العظام">جراحة العظام</option>
              <option value="طب الأطفال">طب الأطفال</option>
              <option value="الباطنية والقلب">الباطنية والقلب</option>
              <option value="الأمراض الجلدية">الأمراض الجلدية</option>
              <option value="العيون">العيون</option>
              <option value="الطب النفسي">الطب النفسي</option>
            </select>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleSearch}
        className="w-full bg-[#0D9488] hover:bg-[#115E59] text-white py-6 text-lg"
        size="lg"
      >
        <Search className="w-6 h-6 ml-2" />
        ابحث عن طبيب
      </Button>
    </div>
  );
}

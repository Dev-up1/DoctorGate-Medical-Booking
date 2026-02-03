export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  location: string;
  area: string;
  price: number;
  image: string;
  experience: number;
  education: string;
  bio: string;
  availableTimes: string[];
  clinicName: string;
  phone: string;
}

export const yemeniDoctors: Doctor[] = [
  {
    id: "1",
    name: "د. أحمد علي الحداد", // Changed from د. محمد أحمد الشعيبي
    specialty: "طب الأسنان",
    rating: 4.9,
    reviewsCount: 245,
    location: "عدن - المعلا",
    area: "المعلا",
    price: 5000,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    experience: 15,
    education: "بكالوريوس طب وجراحة الفم والأسنان - جامعة عدن",
    bio: "طبيب أسنان متخصص في تجميل الأسنان والتركيبات الثابتة والمتحركة مع خبرة واسعة في علاج اللثة والجذور",
    availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    clinicName: "عيادة الحداد لطب الأسنان", // Changed from عيادة الشعيبي
    phone: "+967 2 254789"
  },
  {
    id: "2",
    name: "د. أماني سعيد الشميري", // Changed from د. فاطمة علي باحارثة
    specialty: "أمراض النساء والولادة",
    rating: 4.8,
    reviewsCount: 312,
    location: "عدن - كريتر",
    area: "كريتر",
    price: 6000,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    experience: 18,
    education: "بكالوريوس طب وجراحة - جامعة عدن، زمالة أمراض النساء",
    bio: "استشارية أمراض النساء والولادة متخصصة في متابعة الحمل والولادة الطبيعية وعلاج تأخر الإنجاب",
    availableTimes: ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00"],
    clinicName: "مركز الشميري النسائي", // Changed from مركز باحارثة
    phone: "+967 2 265432"
  },
  {
    id: "3",
    name: "د. خالد سعيد النقيب",
    specialty: "جراحة العظام",
    rating: 4.7,
    reviewsCount: 189,
    location: "عدن - المنصورة",
    area: "المنصورة",
    price: 7000,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    experience: 20,
    education: "بكالوريوس الطب والجراحة - جامعة عدن، ماجستير جراحة العظام",
    bio: "استشاري جراحة العظام والمفاصل متخصص في إصابات الملاعب وجراحة المفاصل بالمنظار",
    availableTimes: ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    clinicName: "عيادة النقيب للعظام",
    phone: "+967 2 278965"
  },
  {
    id: "4",
    name: "د. سارة حسن المحمدي",
    specialty: "طب الأطفال",
    rating: 4.9,
    reviewsCount: 428,
    location: "عدن - الشيخ عثمان",
    area: "الشيخ عثمان",
    price: 4500,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    experience: 12,
    education: "بكالوريوس طب الأطفال - جامعة عدن",
    bio: "طبيبة أطفال متخصصة في رعاية الأطفال حديثي الولادة والتطعيمات ومتابعة النمو والتطور",
    availableTimes: ["09:00", "10:00", "11:00", "12:00", "13:00", "15:00"],
    clinicName: "عيادة المحمدي للأطفال",
    phone: "+967 2 289654"
  },
  {
    id: "5",
    name: "د. أحمد عبدالله الحكيمي",
    specialty: "الباطنية والقلب",
    rating: 4.8,
    reviewsCount: 267,
    location: "عدن - خورمكسر",
    area: "خورمكسر",
    price: 8000,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
    experience: 22,
    education: "بكالوريوس الطب والجراحة - جامعة عدن، دكتوراه أمراض القلب",
    bio: "استشاري أمراض القلب والباطنية متخصص في تشخيص وعلاج أمراض القلب والشرايين وارتفاع ضغط الدم",
    availableTimes: ["10:00", "11:00", "14:00", "15:00", "16:00"],
    clinicName: "مركز الحكيمي للقلب",
    phone: "+967 2 295432"
  },
  {
    id: "6",
    name: "د. ليلى محمد العولقي",
    specialty: "الأمراض الجلدية",
    rating: 4.9,
    reviewsCount: 356,
    location: "عدن - كريتر",
    area: "كريتر",
    price: 5500,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    experience: 14,
    education: "بكالوريوس الطب والجراحة - جامعة عدن، دبلوم الأمراض الجلدية",
    bio: "استشارية الأمراض الجلدية والتجميل متخصصة في علاج حب الشباب والبشرة والليزر الطبي",
    availableTimes: ["09:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
    clinicName: "عيادة العولقي للجلدية والتجميل",
    phone: "+967 2 276543"
  },
  {
    id: "7",
    name: "د. ياسر صالح الفضلي",
    specialty: "العيون",
    rating: 4.7,
    reviewsCount: 198,
    location: "عدن - المنصورة",
    area: "المنصورة",
    price: 6500,
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
    experience: 16,
    education: "بكالوريوس طب وجراحة العيون - جامعة عدن",
    bio: "استشاري طب وجراحة العيون متخصص في جراحة المياه البيضاء والزرقاء وتصحيح النظر بالليزر",
    availableTimes: ["10:00", "11:00", "12:00", "15:00", "16:00"],
    clinicName: "مركز الفضلي للعيون",
    phone: "+967 2 287654"
  },
  {
    id: "8",
    name: "د. نادية حسين باشراحيل",
    specialty: "الطب النفسي",
    rating: 4.8,
    reviewsCount: 234,
    location: "عدن - الشيخ عثمان",
    area: "الشيخ عثمان",
    price: 7500,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    experience: 19,
    education: "بكالوريوس الطب النفسي - جامعة عدن، ماجستير العلاج النفسي",
    bio: "استشارية الطب النفسي والعلاج النفسي متخصصة في علاج القلق والاكتئاب والاضطرابات النفسية",
    availableTimes: ["09:00", "10:00", "14:00", "15:00", "16:00", "17:00"],
    clinicName: "عيادة باشراحيل النفسية",
    phone: "+967 2 298765"
  },
  {
    id: "9",
    name: "د. عمر عبدالرحمن السقاف",
    specialty: "الأنف والأذن والحنجرة",
    rating: 4.6,
    reviewsCount: 176,
    location: "عدن - خورمكسر",
    area: "خورمكسر",
    price: 5500,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    experience: 13,
    education: "بكالوريوس الطب والجراحة - جامعة عدن، تخصص الأنف والأذن",
    bio: "استشاري الأنف والأذن والحنجرة متخصص في علاج الجيوب الأنفية واللحمية والتهابات الأذن",
    availableTimes: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    clinicName: "عيادة السقاف التخصصية",
    phone: "+967 2 291234"
  },
  {
    id: "10",
    name: "د. منى أحمد باوزير",
    specialty: "التغذية العلاجية",
    rating: 4.9,
    reviewsCount: 289,
    location: "عدن - المعلا",
    area: "المعلا",
    price: 4000,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    experience: 10,
    education: "بكالوريوس التغذية العلاجية - جامعة عدن",
    bio: "خصائية تغذية علاجية متخصصة في علاج السمنة والنحافة والأنظمة الغذائية الصحية",
    availableTimes: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
    clinicName: "مركز باوزير للتغذية",
    phone: "+967 2 256789"
  },
  {
    id: "11",
    name: "د. طارق سعيد الحبيشي",
    specialty: "المسالك البولية",
    rating: 4.7,
    reviewsCount: 167,
    location: "عدن - كريتر",
    area: "كريتر",
    price: 6500,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
    experience: 17,
    education: "بكالوريوس الطب والجراحة - جامعة عدن، دبلوم المسالك البولية",
    bio: "استشاري المسالك البولية متخصص في علاج حصوات الكلى والمثانة والبروستاتا",
    availableTimes: ["10:00", "11:00", "14:00", "15:00", "16:00"],
    clinicName: "عيادة الحبيشي للمسالك",
    phone: "+967 2 267890"
  },
  {
    id: "12",
    name: "د. هدى محسن الكاف",
    specialty: "الروماتيزم",
    rating: 4.8,
    reviewsCount: 211,
    location: "عدن - المنصورة",
    area: "المنصورة",
    price: 7000,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    experience: 15,
    education: "بكالوريوس الطب والجراحة - جامعة عدن، ماجستير الروماتيزم",
    bio: "استشارية الروماتيزم وأمراض المفاصل متخصصة في علاج التهاب المفاصل والذئبة الحمراء",
    availableTimes: ["09:00", "10:00", "11:00", "15:00", "16:00"],
    clinicName: "مركز الكاف للروماتيزم",
    phone: "+967 2 278901"
  }
];

export const specialties = [
  "الكل",
  "طب الأسنان",
  "أمراض النساء والولادة",
  "جراحة العظام",
  "طب الأطفال",
  "الباطنية والقلب",
  "الأمراض الجلدية",
  "العيون",
  "الطب النفسي",
  "الأنف والأذن والحنجرة",
  "التغذية العلاجية",
  "المسالك البولية",
  "الروماتيزم"
];

export const specialtiesForHomepage = [
  {
    id: "1",
    name: "جلدية",
    fullName: "الأمراض الجلدية",
    icon: "skin",
    image: "https://images.unsplash.com/photo-1606501161752-e4be315c8b60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "2",
    name: "أسنان",
    fullName: "طب الأسنان",
    icon: "tooth",
    image: "https://images.unsplash.com/photo-1655636248613-37fe4583a573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "3",
    name: "نفسي",
    fullName: "الطب النفسي",
    icon: "brain",
    image: "https://images.unsplash.com/photo-1592947945242-69312358628b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "4",
    name: "أطفال وحديثي الولادة",
    fullName: "طب الأطفال",
    icon: "baby",
    image: "https://images.unsplash.com/photo-1632053005736-6bd9cfc4daf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "5",
    name: "مخ وأعصاب",
    fullName: "الأعصاب",
    icon: "brain",
    image: "https://images.unsplash.com/photo-1758691463165-ca9b5bc2b28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "6",
    name: "عظام",
    fullName: "جراحة العظام",
    icon: "bone",
    image: "https://images.unsplash.com/photo-1582380375444-275b280990a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "7",
    name: "نساء وتوليد",
    fullName: "أمراض النساء والولادة",
    icon: "pregnancy",
    image: "https://images.unsplash.com/photo-1643758320039-1957929059c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "8",
    name: "أنف وأذن وحنجرة",
    fullName: "الأنف والأذن والحنجرة",
    icon: "ear",
    image: "https://images.unsplash.com/photo-1576765974277-be5f035d4604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  }
];

export const areasForHomepage = [
  {
    id: "1",
    name: "كريتر",
    doctorsCount: 145
  },
  {
    id: "2",
    name: "المنصورة",
    doctorsCount: 128
  },
  {
    id: "3",
    name: "الشيخ عثمان",
    doctorsCount: 112
  },
  {
    id: "4",
    name: "خورمكسر",
    doctorsCount: 98
  }
];

export const cities = [
  "الكل",
  "عدن",
  "كريتر",
  "المنصورة",
  "الشيخ عثمان",
  "خورمكسر",
  "المعلا"
];

export const services = [
  {
    id: "1",
    title: "حجز طبيب",
    description: "احجز موعد مع طبيب متخصص",
    icon: "stethoscope",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "2",
    title: "المستشفيات والمراكز الطبية",
    description: "ابحث واحجز داخل المستشفيات والمراكز",
    icon: "building2",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "3",
    title: "المختبرات والأشعة",
    description: "احجز تحاليل وفحوصات طبية",
    icon: "testTube",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "4",
    title: "العروض",
    description: "تصفح العروض والخصومات الطبية",
    icon: "tag",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "5",
    title: "استشارة أونلاين",
    description: "تحدث مع طبيب عبر الإنترنت",
    icon: "video",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  },
  {
    id: "6",
    title: "محتوى طبي",
    description: "مقالات ونصائح طبية موثوقة",
    icon: "fileText",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
  }
];

export const topMedicalCenters = [
  {
    id: "1",
    name: "مركز عدن الطبي",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop",
    specialtiesCount: 15,
    area: "خورمكسر",
    rating: 4.9,
    doctorsCount: 45
  },
  {
    id: "2",
    name: "مستشفى الكويت الجامعي",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    specialtiesCount: 18,
    area: "المنصورة",
    rating: 4.8,
    doctorsCount: 52
  },
  {
    id: "3",
    name: "مستشفى الجمهورية التعليمي",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=600&fit=crop",
    specialtiesCount: 20,
    area: "كريتر",
    rating: 4.7,
    doctorsCount: 68
  },
  {
    id: "4",
    name: "مستشفى الأمل التخصصي",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop",
    specialtiesCount: 8,
    area: "المعلا",
    rating: 4.5,
    doctorsCount: 22
  }
];

export interface Hospital {
  id: string;
  name: string;
  location: string;
  area: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  image: string;
  beds: number;
  emergency: boolean;
  phone: string;
  description: string;
}

export const hospitals: Hospital[] = [
  {
    id: "1",
    name: "مستشفى الجمهورية التعليمي",
    location: "عدن - كريتر",
    area: "كريتر",
    rating: 4.7,
    reviewsCount: 487,
    specialties: ["الباطنية", "الجراحة", "النساء والولادة", "الأطفال", "الطوارئ"],
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&h=600&fit=crop",
    beds: 350,
    emergency: true,
    phone: "+967 2 254000",
    description: "مستشفى حكومي تعليمي متخصص يقدم جميع الخدمات الطبية على مدار الساعة"
  },
  {
    id: "2",
    name: "مستشفى الكويت الجامعي",
    location: "عدن - المنصورة",
    area: "المنصورة",
    rating: 4.8,
    reviewsCount: 523,
    specialties: ["القلب", "العظام", "المسالك البولية", "الجراحة العامة"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop",
    beds: 280,
    emergency: true,
    phone: "+967 2 265000",
    description: "مستشفى جامعي متطور يوفر خدمات تشخيصية وعلاجية متقدمة"
  },
  {
    id: "3",
    name: "مستشفى الوحدة الخاص",
    location: "عدن - الشيخ عثمان",
    area: "الشيخ عثمان",
    rating: 4.6,
    reviewsCount: 312,
    specialties: ["الولادة", "الأطفال", "الجراحة", "العيون"],
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&h=600&fit=crop",
    beds: 120,
    emergency: true,
    phone: "+967 2 278000",
    description: "مستشفى خاص متخصص في خدمات الولادة والرعاية الصحية الشاملة"
  },
  {
    id: "4",
    name: "مركز عدن الطبي",
    location: "عدن - خورمكسر",
    area: "خورمكسر",
    rating: 4.9,
    reviewsCount: 678,
    specialties: ["القلب", "الأعصاب", "الكلى", "الأورام"],
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop",
    beds: 200,
    emergency: true,
    phone: "+967 2 290000",
    description: "مركز طبي متخصص بأحدث المعدات والتقنيات الطبية"
  },
  {
    id: "5",
    name: "مستشفى الأمل التخصصي",
    location: "عدن - المعلا",
    area: "المعلا",
    rating: 4.5,
    reviewsCount: 234,
    specialties: ["الجلدية", "التجميل", "الليزر", "الأسنان"],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop",
    beds: 80,
    emergency: false,
    phone: "+967 2 256000",
    description: "مستشفى متخصص في الطب التجميلي والعلاجات المتقدمة"
  }
];

export interface Lab {
  id: string;
  name: string;
  location: string;
  area: string;
  rating: number;
  reviewsCount: number;
  services: string[];
  image: string;
  phone: string;
  openingHours: string;
  homeVisit: boolean;
  resultsTime: string;
}

export const labs: Lab[] = [
  {
    id: "1",
    name: "مختبر النيل الطبي",
    location: "عدن - كريتر",
    area: "كريتر",
    rating: 4.8,
    reviewsCount: 456,
    services: ["التحاليل الطبية", "الأشعة السينية", "الأشعة التلفزيونية", "تخطيط القلب"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop",
    phone: "+967 2 267000",
    openingHours: "السبت - الخميس: 7:00 ص - 8:00 م",
    homeVisit: true,
    resultsTime: "نفس اليوم"
  },
  {
    id: "2",
    name: "مركز الشفاء للأشعة والتحاليل",
    location: "عدن - المنصورة",
    area: "المنصورة",
    rating: 4.9,
    reviewsCount: 589,
    services: ["الرنين المغناطيسي", "الأشعة المقطعية", "التحاليل الشاملة", "الأشعة الصوتية"],
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=800&h=600&fit=crop",
    phone: "+967 2 279000",
    openingHours: "السبت - الخميس: 8:00 ص - 6:00 م",
    homeVisit: true,
    resultsTime: "2-4 ساعات"
  },
  {
    id: "3",
    name: "مختبر الحياة المتقدم",
    location: "عدن - الشيخ عثمان",
    area: "الشيخ عثمان",
    rating: 4.7,
    reviewsCount: 378,
    services: ["تحاليل الدم", "تحاليل الهرمونات", "الأشعة السينية", "الموجات فوق الصوتية"],
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop",
    phone: "+967 2 289000",
    openingHours: "يومياً: 7:00 ص - 10:00 م",
    homeVisit: true,
    resultsTime: "خلال 24 ساعة"
  },
  {
    id: "4",
    name: "مركز التشخيص الطبي",
    location: "عدن - خورمكسر",
    area: "خورمكسر",
    rating: 4.6,
    reviewsCount: 267,
    services: ["تحاليل شاملة", "الأشعة التشخيصية", "تخطيط القلب", "قياس السمع"],
    image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=600&fit=crop",
    phone: "+967 2 295000",
    openingHours: "السبت - الخميس: 8:00 ص - 5:00 م",
    homeVisit: false,
    resultsTime: "نفس اليوم"
  }
];

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "أهمية الفحص الدوري للأسنان",
    excerpt: "تعرف على أهمية الفحص الدوري للأسنان وكيف يساعد في الوقاية من مشاكل الأسنان واللثة",
    category: "طب الأسنان",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=600&fit=crop",
    author: "د. أحمد الحداد", // Changed from د. محمد الشعيبي
    date: "2026-01-10",
    readTime: "5 دقائق"
  },
  {
    id: "2",
    title: "التغذية السليمة للأطفال",
    excerpt: "دليل شامل للتغذية السليمة للأطفال في مراحل النمو المختلفة",
    category: "طب الأطفال",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=600&fit=crop",
    author: "د. سارة المحمدي",
    date: "2026-01-08",
    readTime: "7 دقائق"
  },
  {
    id: "3",
    title: "الوقاية من أمراض القلب",
    excerpt: "نصائح عملية للوقاية من أمراض القلب والشرايين",
    category: "أمراض القلب",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&h=600&fit=crop",
    author: "د. أحمد الحكيمي",
    date: "2026-01-05",
    readTime: "6 دقائق"
  },
  {
    id: "4",
    title: "العناية بالبشرة في فصل الصيف",
    excerpt: "طرق العناية بالبشرة وحمايتها من أشعة الشمس الضارة",
    category: "الأمراض الجلدية",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&h=600&fit=crop",
    author: "د. ليلى العولقي",
    date: "2026-01-03",
    readTime: "4 دقائق"
  },
  {
    id: "5",
    title: "الصحة النفسية وأهميتها",
    excerpt: "فهم أهمية الصحة النفسية وطرق العناية بها",
    category: "الطب النفسي",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
    author: "د. نادية باشراحيل",
    date: "2026-01-01",
    readTime: "8 دقائق"
  }
];

export interface Offer {
  id: string;
  title: "string";
  description: "string";
  originalPrice: number;
  discountedPrice: number;
  discount: "string";
  validUntil: "string";
  image: "string";
  category: "string";
}

export const offers: Offer[] = [
  {
    id: "1",
    title: "فحص شامل للأسنان",
    description: "فحص كامل + تنظيف + استشارة مجانية",
    originalPrice: 15000,
    discountedPrice: 8000,
    discount: "47%",
    validUntil: "2026-01-31",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
    category: "طب الأسنان"
  },
  {
    id: "2",
    title: "باقة الفحص الشامل",
    description: "تحاليل دم + أشعة + استشارة طبيب باطني",
    originalPrice: 25000,
    discountedPrice: 15000,
    discount: "40%",
    validUntil: "2026-02-15",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop",
    category: "تحاليل طبية"
  },
  {
    id: "3",
    title: "متابعة الحمل",
    description: "3 زيارات + أشعة صوتية + تحاليل",
    originalPrice: 30000,
    discountedPrice: 20000,
    discount: "33%",
    validUntil: "2026-03-01",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=600&fit=crop",
    category: "النساء والولادة"
  }
];

export interface HomeService {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: string;
  features: string[];
}

export const homeServices: HomeService[] = [
  {
    id: "1",
    title: "زيارة طبيب منزلية",
    description: "طبيب يزورك في منزلك للكشف والاستشارة",
    price: 15000,
    icon: "stethoscope",
    features: ["فحص طبي شامل", "تشخيص دقيق", "وصف العلاج", "متابعة الحالة"]
  },
  {
    id: "2",
    title: "تحاليل منزلية",
    description: "سحب عينات في المنزل وإرسال النتائج",
    price: 8000,
    icon: "testTube",
    features: ["سحب عينات احترافي", "نتائج سريعة", "جميع أنواع التحاليل", "متوفر يومياً"]
  },
  {
    id: "3",
    title: "تمريض منزلي",
    description: "ممرض أو ممرضة لتقديم الرعاية في المنزل",
    price: 10000,
    icon: "home",
    features: ["حقن وريدية وعضلية", "تغيير الضمادات", "متابعة العلامات الحيوية", "رعاية ما بعد العمليات"]
  },
  {
    id: "4",
    title: "علاج طبيعي منزلي",
    description: "جلسات علاج طبيعي في راحة منزلك",
    price: 12000,
    icon: "activity",
    features: ["تمارين علاجية", "تأهيل ما بعد الإصابة", "علاج الآلام", "خطة علاجية مخصصة"]
  }
];
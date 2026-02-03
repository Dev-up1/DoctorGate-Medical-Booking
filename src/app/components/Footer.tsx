import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0D9488] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#115E59] to-[#0F766E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold">DocGate</span>
            </div>
            <p className="text-teal-100 leading-relaxed mb-6">
              منصة طبية متخصصة تربط المرضى بأفضل الأطباء والمراكز الطبية في اليمن
            </p>
            
            {/* Official Contact Number - Prominent Display */}
            <div className="bg-[#115E59]/30 border border-teal-200/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-teal-200 mb-2">للحجز والاستفسار</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <a href="tel:+9672240555" className="text-xl font-bold text-white hover:text-teal-100 transition-colors direction-ltr block">
                    224-0555 (02) 967+
                  </a>
                  <p className="text-xs text-teal-200">متاح على مدار الساعة</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">الخدمات</h4>
            <ul className="space-y-2 text-teal-100">
              <li 
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => onNavigate?.('doctors')}
              >
                كشف عيادة
              </li>
              <li 
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => onNavigate?.('online-consultation')}
              >
                استشارة أونلاين
              </li>
              <li 
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => onNavigate?.('labs')}
              >
                المختبرات والأشعة
              </li>
              <li 
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => onNavigate?.('home-care')}
              >
                الرعاية المنزلية
              </li>
              <li 
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => onNavigate?.('hospitals')}
              >
                المستشفيات
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">روابط سريعة</h4>
            <ul className="space-y-2 text-teal-100">
              <li 
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => onNavigate?.('home')}
              >
                من نحن
              </li>
              <li 
                className="hover:text-white cursor-pointer transition-colors"
                onClick={() => onNavigate?.('doctor-registration')}
              >
                انضم كطبيب
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">تواصل معنا</li>
              <li className="hover:text-white cursor-pointer transition-colors">الشروط والأحكام</li>
              <li className="hover:text-white cursor-pointer transition-colors">سياسة الخصوصية</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-lg">تواصل معنا</h4>
            <ul className="space-y-3 text-teal-100">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <span>كريتر، عدن، اليمن</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <a href="mailto:info@docgate.ye" className="hover:text-white transition-colors">
                  info@docgate.ye
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <a href="tel:+9672240555" className="hover:text-white transition-colors direction-ltr">
                  224-0555 (02) 967+
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-teal-700 pt-8 text-center text-teal-100">
          <p>© 2026 DocGate. جميع الحقوق محفوظة - منصة طبية يمنية موثوقة</p>
        </div>
      </div>
    </footer>
  );
}
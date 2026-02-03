import { useState } from 'react';
import { X, MapPin, Building2, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { cities } from '@/app/data/mockData';

interface LabBookingModalProps {
  labName: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function LabBookingModal({ labName, onClose, onSuccess }: LabBookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedTest, setSelectedTest] = useState('');

  const tests = [
    'تحليل دم شامل',
    'تحليل بول',
    'تحليل سكري',
    'تحليل كوليسترول',
    'تحليل وظائف الكلى',
    'تحليل وظائف الكبد',
    'أشعة سينية',
    'أشعة مقطعية',
    'أشعة رنين مغناطيسي',
    'موجات فوق صوتية'
  ];

  const dates = [
    'اليوم - الأحد 15 يناير',
    'غداً - الإثنين 16 يناير',
    'الثلاثاء 17 يناير',
    'الأربعاء 18 يناير',
    'الخميس 19 يناير'
  ];

  const times = [
    '08:00 ص',
    '09:00 ص',
    '10:00 ص',
    '11:00 ص',
    '12:00 م',
    '02:00 م',
    '03:00 م',
    '04:00 م',
    '05:00 م'
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = () => {
    onSuccess();
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedTest !== '';
      case 2:
        return selectedCity !== '';
      case 3:
        return selectedDate !== '';
      case 4:
        return selectedTime !== '';
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">حجز موعد - {labName}</h2>
            <p className="text-sm text-muted-foreground mt-1">الخطوة {step} من 4</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-all ${
                  s <= step ? 'bg-[#0070cd]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-6 h-6 text-[#0070cd]" />
                <h3 className="text-xl font-bold text-foreground">اختر نوع الفحص</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tests.map((test) => (
                  <button
                    key={test}
                    onClick={() => setSelectedTest(test)}
                    className={`p-4 rounded-lg border-2 text-right transition-all ${
                      selectedTest === test
                        ? 'border-[#0070cd] bg-blue-50 text-[#0070cd]'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{test}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-[#0070cd]" />
                <h3 className="text-xl font-bold text-foreground">اختر المنطقة</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cities.slice(1).map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`p-4 rounded-lg border-2 text-right transition-all ${
                      selectedCity === city
                        ? 'border-[#0070cd] bg-blue-50 text-[#0070cd]'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{city}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-[#0070cd]" />
                <h3 className="text-xl font-bold text-foreground">اختر اليوم</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-4 rounded-lg border-2 text-right transition-all ${
                      selectedDate === date
                        ? 'border-[#0070cd] bg-blue-50 text-[#0070cd]'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{date}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-6 h-6 text-[#0070cd]" />
                <h3 className="text-xl font-bold text-foreground">اختر الموعد</h3>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      selectedTime === time
                        ? 'border-[#0070cd] bg-blue-50 text-[#0070cd] font-semibold'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Booking Summary */}
              {selectedTime && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#0070cd]" />
                    ملخص الحجز
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">نوع الفحص:</span>
                      <span className="font-medium text-foreground">{selectedTest}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">المنطقة:</span>
                      <span className="font-medium text-foreground">{selectedCity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">اليوم:</span>
                      <span className="font-medium text-foreground">{selectedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الموعد:</span>
                      <span className="font-medium text-foreground">{selectedTime}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-border p-6 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 rounded-lg border border-border hover:bg-gray-50 transition-colors font-semibold"
            >
              السابق
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-colors ${
              canProceed()
                ? 'bg-[#0070cd] hover:bg-[#0056a3] text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {step === 4 ? 'تأكيد الحجز' : 'التالي'}
          </button>
        </div>
      </div>
    </div>
  );
}

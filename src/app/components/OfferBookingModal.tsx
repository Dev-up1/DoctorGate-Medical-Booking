import { useState } from 'react';
import { X, MapPin, Calendar, Clock, CheckCircle2, User, Phone, Mail } from 'lucide-react';

interface OfferBookingModalProps {
  offerTitle: string;
  offerPrice: number;
  onClose: () => void;
  onSuccess: () => void;
}

export function OfferBookingModal({ offerTitle, offerPrice, onClose, onSuccess }: OfferBookingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: ''
  });

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
    if (step < 3) {
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
        return formData.name && formData.phone && formData.email;
      case 2:
        return formData.date !== '';
      case 3:
        return formData.time !== '';
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
            <h2 className="text-2xl font-bold text-foreground">احجز العرض</h2>
            <p className="text-sm text-muted-foreground mt-1">{offerTitle}</p>
            <p className="text-lg font-bold text-[#0070cd] mt-2">{offerPrice.toLocaleString()} ريال يمني</p>
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
            {[1, 2, 3].map((s) => (
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
                <User className="w-6 h-6 text-[#0070cd]" />
                <h3 className="text-xl font-bold text-foreground">بياناتك الشخصية</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#0070cd] focus:ring-2 focus:ring-[#0070cd]/20 outline-none transition-all"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    رقم الجوال *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#0070cd] focus:ring-2 focus:ring-[#0070cd]/20 outline-none transition-all direction-ltr"
                    placeholder="+967 xxx xxx xxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border focus:border-[#0070cd] focus:ring-2 focus:ring-[#0070cd]/20 outline-none transition-all direction-ltr"
                    placeholder="example@email.com"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-[#0070cd]" />
                <h3 className="text-xl font-bold text-foreground">اختر اليوم</h3>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {dates.map((date) => (
                  <button
                    key={date}
                    onClick={() => setFormData({ ...formData, date })}
                    className={`p-4 rounded-lg border-2 text-right transition-all ${
                      formData.date === date
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

          {step === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-6 h-6 text-[#0070cd]" />
                <h3 className="text-xl font-bold text-foreground">اختر الموعد</h3>
              </div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => setFormData({ ...formData, time })}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      formData.time === time
                        ? 'border-[#0070cd] bg-blue-50 text-[#0070cd] font-semibold'
                        : 'border-border hover:border-gray-300'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              {/* Booking Summary */}
              {formData.time && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#0070cd]" />
                    ملخص الحجز
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">العرض:</span>
                      <span className="font-medium text-foreground">{offerTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">السعر:</span>
                      <span className="font-medium text-[#0070cd]">{offerPrice.toLocaleString()} ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الاسم:</span>
                      <span className="font-medium text-foreground">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">اليوم:</span>
                      <span className="font-medium text-foreground">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">الموعد:</span>
                      <span className="font-medium text-foreground">{formData.time}</span>
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
            {step === 3 ? 'تأكيد الحجز' : 'التالي'}
          </button>
        </div>
      </div>
    </div>
  );
}

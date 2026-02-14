import { Globe, TrendingUp, Zap } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: <Globe className="w-10 h-10 text-blue-600" />,
      title: 'עיצוב אתרים',
      description: 'אתרים מותאמים אישית שבנויים להמרות, מהירות וצמיחה. חנויות מסחר, אתרי עסקים ודפי נחיתה שהופכים מבקרים ללקוחות.',
      benefits: ['עיצוב Mobile-First', 'אופטימיזציה ל-SEO', 'ממוקד המרות', 'טעינה מהירה'],
      gradient: 'from-blue-50/50 to-blue-100/30',
      borderColor: 'border-blue-200/50',
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-teal-600" />,
      title: 'פרסום ממומן',
      description: 'קמפיינים שיווקיים ב-Meta, TikTok ו-Google. ניהול מודעות אסטרטגי ממוקד ROI, יצירת לידים וצמיחת הכנסות.',
      benefits: ['אסטרטגיית קמפיינים', 'יצירה ובדיקת מודעות', 'טרגוט קהלים', 'מעקב ביצועים'],
      gradient: 'from-teal-50/50 to-teal-100/30',
      borderColor: 'border-teal-200/50',
    },
    {
      icon: <Zap className="w-10 h-10 text-purple-600" />,
      title: 'חבילת אתר + מודעות',
      description: 'מערכת צמיחה מלאה המשלבת אתר ממיר עם פרסום ממומן אסטרטגי. הפתרון המלא לעסקים מוכנים לצמיחה.',
      benefits: ['גישה משולבת', 'מעקב מאוחד', 'ROI מקסימלי', 'ניהול מקצה לקצה'],
      gradient: 'from-purple-50/50 to-purple-100/30',
      borderColor: 'border-purple-200/50',
    },
  ];

  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20" dir="rtl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            שירותים לצמיחה
          </h2>
          <p className="text-2xl text-gray-500 max-w-2xl mx-auto font-light">
            בחר את השירות שמתאים ליעדי העסק שלך
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-3xl p-10 border-2 ${service.borderColor} hover:shadow-2xl hover:scale-105 transition-all duration-500 group overflow-hidden`}
              dir="rtl"
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="mb-6 inline-block p-4 bg-white/80 rounded-2xl shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-5">{service.title}</h3>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{service.description}</p>
                <ul className="space-y-3 mb-10">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="text-gray-700 flex items-center gap-3">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full"></span>
                      <span className="font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-l from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                  קבל הצעת מחיר
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

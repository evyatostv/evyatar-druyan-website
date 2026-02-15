import { Globe, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

export function Services() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const copy = {
    he: {
      title: 'שירותים שמייצרים תוצאות',
      subtitle: 'פתרונות ממוקדים לצמיחה אמיתית בעסק',
      cta: 'לקבלת הצעה',
      cards: [
        {
          icon: <Globe className="w-9 h-9 text-blue-600" />,
          title: 'עיצוב ופיתוח אתרים',
          description:
            'אתרי תדמית, חנויות ודפי נחיתה שבנויים לביצועים: מהירים, נגישים וממוקדי המרה.',
          benefits: ['עיצוב רספונסיבי מלא', 'מבנה SEO נקי', 'חוויית משתמש מדויקת', 'ביצועים גבוהים'],
          gradient: 'from-blue-50/50 to-blue-100/30',
          borderColor: 'border-blue-200/50',
          path: '/services/website-design',
        },
        {
          icon: <TrendingUp className="w-9 h-9 text-teal-600" />,
          title: 'פרסום ממומן',
          description:
            'ניהול קמפיינים ב-Meta, Google ו-TikTok עם שליטה בתקציב, שיפור מתמשך ותשואה מדידה.',
          benefits: ['אסטרטגיית קמפיין', 'קריאייטיב ובדיקות', 'פילוח קהלים מדויק', 'דוחות ברורים'],
          gradient: 'from-teal-50/50 to-teal-100/30',
          borderColor: 'border-teal-200/50',
          path: '/services/paid-advertising',
        },
        {
          icon: <Zap className="w-9 h-9 text-purple-600" />,
          title: 'חבילה מלאה: אתר + מודעות',
          description:
            'מערכת אחת שמחברת בין תשתית דיגיטלית חזקה לבין קמפיינים שמביאים לידים איכותיים.',
          benefits: ['תהליך מקצה לקצה', 'שפה מותגית אחידה', 'מעקב תוצאות מאוחד', 'קצב צמיחה מהיר יותר'],
          gradient: 'from-purple-50/50 to-purple-100/30',
          borderColor: 'border-purple-200/50',
          path: '/services/full-package',
        },
      ],
    },
    en: {
      title: 'Services Built for Growth',
      subtitle: 'Focused solutions for measurable business impact',
      cta: 'Get a Proposal',
      cards: [
        {
          icon: <Globe className="w-9 h-9 text-blue-600" />,
          title: 'Website Design & Development',
          description:
            'High-performing websites, ecommerce builds, and landing pages designed for speed and conversion.',
          benefits: ['Fully responsive design', 'Clean SEO structure', 'Precise UX flow', 'Fast performance'],
          gradient: 'from-blue-50/50 to-blue-100/30',
          borderColor: 'border-blue-200/50',
          path: '/services/website-design',
        },
        {
          icon: <TrendingUp className="w-9 h-9 text-teal-600" />,
          title: 'Paid Advertising',
          description:
            'Performance campaigns on Meta, Google, and TikTok with strategic testing and clear ROI visibility.',
          benefits: ['Campaign strategy', 'Creative testing', 'Audience targeting', 'Clear reporting'],
          gradient: 'from-teal-50/50 to-teal-100/30',
          borderColor: 'border-teal-200/50',
          path: '/services/paid-advertising',
        },
        {
          icon: <Zap className="w-9 h-9 text-purple-600" />,
          title: 'Full Package: Website + Ads',
          description:
            'An integrated system that aligns your digital foundation with campaigns that generate qualified leads.',
          benefits: ['End-to-end execution', 'Unified brand language', 'Shared analytics view', 'Faster growth loop'],
          gradient: 'from-purple-50/50 to-purple-100/30',
          borderColor: 'border-purple-200/50',
          path: '/services/full-package',
        },
      ],
    },
  }[language];

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-20 sm:py-24 lg:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            {copy.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto font-light">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {copy.cards.map((service, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-9 border-2 ${service.borderColor} hover:shadow-2xl transition-all duration-500 group overflow-hidden h-full`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-5 inline-block p-3 bg-white/80 rounded-2xl shadow-sm">{service.icon}</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed text-base sm:text-lg">{service.description}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {service.benefits.map((benefit, i) => (
                    <li key={i} className="text-gray-700 flex items-center gap-3">
                      <span className="w-2 h-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full" />
                      <span className="font-medium text-sm sm:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={service.path}
                  className="block text-center w-full bg-gradient-to-l from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-6 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg"
                >
                  {copy.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

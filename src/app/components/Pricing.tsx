import { Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

export function Pricing() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const copy = {
    he: {
      title: 'אפשרויות עבודה',
      subtitle: 'בוחרים מסלול שמתאים לשלב שבו העסק נמצא עכשיו',
      note: 'כל מסלול מתחיל בתשלום פתיחה. המחיר הסופי נקבע לפי היקף הפרויקט.',
      basedOn: 'מותאם להיקף העבודה',
      popular: 'הפופולרי ביותר',
      plans: [
        {
          name: 'אתר בלבד',
          tagline: 'לעסקים שצריכים אתר מקצועי שממיר',
          price: 'הצעה מותאמת',
          features: [
            'עיצוב ופיתוח אתר מלא',
            'התאמה מלאה למובייל',
            'הגדרות SEO בסיסיות',
            'מהירות טעינה גבוהה',
            'חיבור טפסים ואנליטיקס',
            '30 ימי תמיכה אחרי השקה',
          ],
          cta: 'מתחילים פרויקט',
          highlighted: false,
        },
        {
          name: 'אתר + מודעות התחלתיות',
          tagline: 'אתר חדש עם קמפיין ראשון מוכן לעלייה',
          price: 'הצעה מותאמת',
          features: [
            'כל מה שכלול במסלול אתר',
            'הקמת חשבונות פרסום',
            'אסטרטגיית קמפיין ראשונית',
            'קריאייטיב למודעות',
            'הקמת מעקב המרות',
            'השקה מבוקרת עם ניטור',
          ],
          cta: 'שומרים מקום',
          highlighted: true,
        },
        {
          name: 'ניהול צמיחה מלא',
          tagline: 'ליווי שוטף של אתר, קמפיינים ואופטימיזציה',
          price: 'הצעה מותאמת',
          features: [
            'כל מה שכלול במסלול המשולב',
            'ניהול קמפיינים חודשי',
            'בדיקות A/B שוטפות',
            'אופטימיזציית תקציב וקריאייטיב',
            'דוחות ביצועים חודשיים',
            'עדיפות מלאה בתמיכה',
          ],
          cta: 'בונים תוכנית',
          highlighted: false,
        },
      ],
    },
    en: {
      title: 'Work Packages',
      subtitle: 'Choose the setup that matches your current business stage',
      note: 'Every package starts with an initial payment. Final pricing depends on project scope.',
      basedOn: 'Customized to project scope',
      popular: 'Most Popular',
      plans: [
        {
          name: 'Website Only',
          tagline: 'For businesses that need a professional conversion-focused site',
          price: 'Custom Proposal',
          features: [
            'Full website design and development',
            'Complete mobile responsiveness',
            'Core SEO setup',
            'High loading performance',
            'Forms and analytics setup',
            '30 days of post-launch support',
          ],
          cta: 'Start a Project',
          highlighted: false,
        },
        {
          name: 'Website + Launch Ads',
          tagline: 'A new site plus your first ad campaign ready to launch',
          price: 'Custom Proposal',
          features: [
            'Everything in Website package',
            'Ad account setup',
            'Initial campaign strategy',
            'Ad creative production',
            'Conversion tracking setup',
            'Controlled launch and monitoring',
          ],
          cta: 'Reserve a Spot',
          highlighted: true,
        },
        {
          name: 'Full Growth Management',
          tagline: 'Ongoing website, campaigns, and optimization support',
          price: 'Custom Proposal',
          features: [
            'Everything in combined package',
            'Monthly campaign management',
            'Continuous A/B testing',
            'Budget and creative optimization',
            'Monthly performance reports',
            'Priority support',
          ],
          cta: 'Build a Plan',
          highlighted: false,
        },
      ],
    },
  }[language];

  return (
    <section className="bg-gradient-to-b from-gray-50/30 to-white py-20 sm:py-24 lg:py-20 sm:py-24 lg:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            {copy.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto font-light">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {copy.plans.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-6 sm:p-8 lg:p-9 transition-all duration-500 ${
                pkg.highlighted
                  ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white shadow-2xl shadow-blue-600/30 xl:scale-105 z-10'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-4 sm:-top-5 right-1/2 transform translate-x-1/2">
                  <div className="bg-gradient-to-r from-teal-400 to-emerald-400 text-gray-900 text-xs sm:text-sm font-bold px-5 py-2 rounded-full shadow-lg">
                    {copy.popular}
                  </div>
                </div>
              )}

              <div className="relative z-10 h-full flex flex-col">
                <h3 className={`text-2xl sm:text-3xl font-bold mb-2.5 ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.name}
                </h3>
                <p className={`mb-6 text-base sm:text-lg ${pkg.highlighted ? 'text-blue-50' : 'text-gray-600'}`}>{pkg.tagline}</p>
                <div className="mb-8">
                  <div className={`text-3xl sm:text-4xl font-bold ${pkg.highlighted ? 'text-white' : 'text-gray-900'}`}>{pkg.price}</div>
                  <p className={`text-xs sm:text-sm mt-2 ${pkg.highlighted ? 'text-blue-100' : 'text-gray-500'}`}>{copy.basedOn}</p>
                </div>

                <ul className="space-y-3.5 mb-8 flex-1">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 ${pkg.highlighted ? 'bg-white/20' : 'bg-blue-50'} rounded-full p-1`}>
                        <Check className={`w-4 h-4 ${pkg.highlighted ? 'text-white' : 'text-blue-600'}`} />
                      </div>
                      <span className={`text-sm sm:text-base ${pkg.highlighted ? 'text-blue-50' : 'text-gray-700'}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`w-full px-6 py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    pkg.highlighted
                      ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-xl'
                      : 'bg-gradient-to-l from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg'
                  }`}
                >
                  {isRTL ? (
                    <>
                      {pkg.cta}
                      <ArrowLeft className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="w-5 h-5" />
                      {pkg.cta}
                    </>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 text-center">
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{copy.note}</p>
        </div>
      </div>
    </section>
  );
}

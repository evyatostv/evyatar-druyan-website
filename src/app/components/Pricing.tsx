import { Check, ArrowLeft } from 'lucide-react';

export function Pricing() {
  const packages = [
    {
      name: 'אתר בלבד',
      tagline: 'לעסקים שזקוקים לנוכחות מקצועית באינטרנט',
      price: 'הצעת מחיר מותאמת',
      features: [
        'עיצוב אתר מותאם אישית',
        'מותאם למובייל',
        'אופטימיזציה ל-SEO',
        'מהירות טעינה גבוהה',
        'טפסים ואינטגרציות',
        'מערכת ניהול תוכן',
        'הגדרת אנליטיקס',
        '30 יום תמיכה לאחר השקה',
      ],
      cta: 'התחל עם פיקדון',
      highlighted: false,
    },
    {
      name: 'אתר + הקמת מודעות',
      tagline: 'אתר בתוספת הקמפיין הראשון שלך מוכן להשקה',
      price: 'הצעת מחיר מותאמת',
      features: [
        'כל מה שכלול באתר בלבד',
        'הקמת חשבון מודעות ומעקב',
        'אסטרטגיה ותכנון קמפיין',
        'עיצוב קריאייטיב למודעות',
        'מחקר וטרגוט קהלים',
        'אופטימיזציה לדף נחיתה',
        'הגדרת מעקב המרות',
        'השקת קמפיין ראשוני',
      ],
      cta: 'שמור מקום',
      highlighted: true,
    },
    {
      name: 'ניהול צמיחה מלא',
      tagline: 'מערכת צמיחה מלאה עם אופטימיזציה שוטפת',
      price: 'הצעת מחיר מותאמת',
      features: [
        'כל מה שכלול באתר + מודעות',
        'ניהול מודעות חודשי',
        'בדיקות A/B ואופטימיזציה',
        'דוחות ביצועים',
        'אופטימיזציית תקציב',
        'עדכון ובדיקת קריאייטיבים',
        'ייעוץ אסטרטגי',
        'תמיכה עדיפות',
      ],
      cta: 'שמור מקום',
      highlighted: false,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50/30 to-white py-28">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20" dir="rtl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            אפשרויות השקעה
          </h2>
          <p className="text-2xl text-gray-500 max-w-2xl mx-auto font-light">
            בחר את החבילה שמתאימה ליעדי הצמיחה שלך
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-10 transition-all duration-500 ${
                pkg.highlighted
                  ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white shadow-2xl shadow-blue-600/40 scale-105 lg:scale-110 z-10'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl'
              }`}
              dir="rtl"
            >
              {pkg.highlighted && (
                <div className="absolute -top-5 right-1/2 transform translate-x-1/2">
                  <div className="bg-gradient-to-r from-teal-400 to-emerald-400 text-gray-900 text-sm font-bold px-6 py-2 rounded-full shadow-lg">
                    הכי פופולרי
                  </div>
                </div>
              )}
              
              {/* Glow effect for highlighted package */}
              {pkg.highlighted && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
              )}
              
              <div className="relative z-10">
                <h3
                  className={`text-3xl font-bold mb-3 ${
                    pkg.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`mb-8 text-lg ${
                    pkg.highlighted ? 'text-blue-50' : 'text-gray-600'
                  }`}
                >
                  {pkg.tagline}
                </p>
                <div className="mb-10">
                  <div
                    className={`text-4xl font-bold ${
                      pkg.highlighted ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {pkg.price}
                  </div>
                  <p
                    className={`text-sm mt-2 ${
                      pkg.highlighted ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    מבוסס על היקף הפרויקט
                  </p>
                </div>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 ${
                        pkg.highlighted ? 'bg-white/20' : 'bg-blue-50'
                      } rounded-full p-1`}>
                        <Check
                          className={`w-4 h-4 ${
                            pkg.highlighted ? 'text-white' : 'text-blue-600'
                          }`}
                        />
                      </div>
                      <span
                        className={`text-lg ${pkg.highlighted ? 'text-blue-50' : 'text-gray-700'}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full px-8 py-5 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    pkg.highlighted
                      ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-xl hover:shadow-2xl hover:scale-105'
                      : 'bg-gradient-to-l from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg hover:shadow-xl hover:scale-105'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  {pkg.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg">
            כל החבילות דורשות פיקדון להתחלת העבודה. תמחור סופי מבוסס על מורכבות הפרויקט ודרישות העסק.
          </p>
        </div>
      </div>
    </section>
  );
}

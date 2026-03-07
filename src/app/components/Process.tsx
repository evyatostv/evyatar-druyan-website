import { Search, Palette, Rocket, BarChart3 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Process() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const copy = {
    he: {
      title: 'איך התהליך עובד',
      subtitle: 'מסלול עבודה ברור משלב האסטרטגיה ועד אופטימיזציה שוטפת',
      noteTitle: 'חשוב לדעת',
      note: 'העבודה מתחילה אחרי תשלום פתיחה. כך נשמרת מחויבות הדדית ואפשר להקצות זמן ייעודי לפרויקט.',
      steps: [
        {
          icon: <Search className="w-7 h-7" />,
          number: '01',
          title: 'אפיון ומחקר',
          description: 'מגדירים מטרות, קהל יעד והזדמנויות עסקיות כדי לבנות כיוון חד וברור.',
        },
        {
          icon: <Palette className="w-7 h-7" />,
          number: '02',
          title: 'עיצוב ופיתוח',
          description: 'מתרגמים את האסטרטגיה למסכים, חוויית משתמש ותשתית טכנית מהירה ומדוייקת.',
        },
        {
          icon: <Rocket className="w-7 h-7" />,
          number: '03',
          title: 'השקה חכמה',
          description: 'מעלים לאוויר עם מדידה מלאה, בדיקות תקינות ותשתית מוכנה לצמיחה.',
        },
        {
          icon: <BarChart3 className="w-7 h-7" />,
          number: '04',
          title: 'שיפור מתמשך',
          description: 'משפרים על בסיס נתונים אמיתיים כדי להגדיל המרות, לידים והכנסות לאורך זמן.',
        },
      ],
    },
    en: {
      title: 'How the Process Works',
      subtitle: 'A clear workflow from strategy to continuous optimization',
      noteTitle: 'Important',
      note: 'Work starts after an initial payment. This creates mutual commitment and secures dedicated project time.',
      steps: [
        {
          icon: <Search className="w-7 h-7" />,
          number: '01',
          title: 'Discovery',
          description: 'We define business goals, target audience, and opportunities before anything gets built.',
        },
        {
          icon: <Palette className="w-7 h-7" />,
          number: '02',
          title: 'Design & Build',
          description: 'We turn strategy into UI, UX flow, and a high-performance technical implementation.',
        },
        {
          icon: <Rocket className="w-7 h-7" />,
          number: '03',
          title: 'Smart Launch',
          description: 'We launch with full tracking, QA checks, and a stable structure ready to scale.',
        },
        {
          icon: <BarChart3 className="w-7 h-7" />,
          number: '04',
          title: 'Optimization',
          description: 'We improve using real data to increase conversions, lead quality, and revenue.',
        },
      ],
    },
  }[language];

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-20 sm:py-24 lg:py-28 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            {copy.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto font-light">{copy.subtitle}</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
            {copy.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-6 sm:p-8 border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 h-full group">
                  <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-5 sm:mb-6 mx-auto shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-500">
                    {step.number}
                  </div>

                  <div className="text-gray-700 mb-4 flex justify-center">
                    <div className="p-3 bg-white rounded-2xl shadow-sm">{step.icon}</div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center text-sm sm:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-10 sm:mt-14 bg-gradient-to-l from-blue-50 to-teal-50 ${isRTL ? 'border-r-4' : 'border-l-4'} border-blue-600 p-5 sm:p-8 rounded-3xl`}>
          <p className="text-gray-700 text-base sm:text-lg">
            <span className="font-bold text-gray-900">{copy.noteTitle}:</span> {copy.note}
          </p>
        </div>
      </div>
    </section>
  );
}

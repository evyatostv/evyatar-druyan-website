import { Target, Zap, LineChart, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const copy = {
    he: {
      title: 'צמיחה עסקית לפני הכול',
      p1: 'אנחנו בונים אתרים ומערכי שיווק שמשרתים יעדים עסקיים ברורים: יותר פניות, יותר לקוחות, יותר יציבות.',
      p2: 'כל פרויקט משלב חשיבה אסטרטגית, ביצוע מדויק ומדידה מתמשכת, כדי שהעיצוב יוביל לתוצאה ולא רק ייראה טוב.',
      why: 'למה לעבוד איתנו',
      values: [
        { icon: <Target className="w-6 h-6" />, title: 'חשיבה עסקית', description: 'כל החלטה מחוברת למטרות ולתוצאות.' },
        { icon: <Zap className="w-6 h-6" />, title: 'ביצוע מהיר', description: 'עובדים יעיל, בלי סחבת ובלי רעש מיותר.' },
        { icon: <LineChart className="w-6 h-6" />, title: 'מדידה אמיתית', description: 'מסתמכים על נתונים ולא על תחושות.' },
        { icon: <Shield className="w-6 h-6" />, title: 'שקיפות מלאה', description: 'תקשורת ברורה לאורך כל הדרך.' },
      ],
      bullets: [
        'תהליך מסודר עם שלבי עבודה ברורים',
        'שילוב של עיצוב, פיתוח ושיווק תחת קו אחד',
        'מיקוד במדדים שחשובים לעסק',
        'ליווי גם אחרי העלייה לאוויר',
      ],
    },
    en: {
      title: 'Business Growth Comes First',
      p1: 'We build websites and marketing systems around clear business goals: more inquiries, better clients, and stable growth.',
      p2: 'Every project combines strategy, precise execution, and ongoing measurement so design turns into real outcomes.',
      why: 'Why Work With Us',
      values: [
        { icon: <Target className="w-6 h-6" />, title: 'Business Focus', description: 'Every decision is tied to measurable outcomes.' },
        { icon: <Zap className="w-6 h-6" />, title: 'Fast Execution', description: 'Clean delivery without unnecessary friction.' },
        { icon: <LineChart className="w-6 h-6" />, title: 'Data-Led', description: 'We optimize based on evidence, not assumptions.' },
        { icon: <Shield className="w-6 h-6" />, title: 'Full Transparency', description: 'Clear communication throughout the process.' },
      ],
      bullets: [
        'Structured process with clear milestones',
        'Design, development, and marketing in one flow',
        'Focus on metrics that matter to your business',
        'Post-launch support and optimization',
      ],
    },
  }[language];

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-20 sm:py-24 lg:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
              {copy.title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-5 sm:mb-7 leading-relaxed">{copy.p1}</p>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed">{copy.p2}</p>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {copy.values.map((value, index) => (
                <div key={index} className="flex gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-blue-600 flex-shrink-0 bg-blue-50 p-2.5 sm:p-3 rounded-xl">{value.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-base sm:text-lg">{value.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-3xl p-7 sm:p-10 text-white shadow-2xl shadow-blue-600/35">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">{copy.why}</h3>
                <ul className="space-y-4 sm:space-y-5">
                  {copy.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-3 sm:gap-4">
                      <div className="w-2.5 h-2.5 bg-teal-300 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-teal-300/50" />
                      <span className="text-base sm:text-lg leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

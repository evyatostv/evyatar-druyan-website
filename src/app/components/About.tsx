import { Target, Zap, LineChart, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function About() {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const values = [
    {
      icon: <Target className="w-7 h-7" />,
      title: 'ממוקד ביצועים',
      description: 'כל החלטה מונחית על ידי נתונים, תוצאות ו-ROI.',
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'חושב עסקית',
      description: 'אני מבין שהמטרות שלך חורגות מעיצוב—מדובר בהכנסות.',
    },
    {
      icon: <LineChart className="w-7 h-7" />,
      title: 'מונחה תוצאות',
      description: 'הצלחה נמדדת בהמרות, לידים ומדדי צמיחה.',
    },
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'שותף מעורב',
      description: 'תקשורת ישירה, בלי אמצעים, מחויב להצלחה שלך.',
    },
  ];

  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
              בנוי לצמיחה, לא רק אסתטיקה
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              אני מתמחה ביצירת אתרים ומערכות שיווק שמניבות תוצאות מדידות לעסקים מוכנים לצמוח. הגישה שלי משלבת עיצוב אסטרטגי, אופטימיזציית המרות ושיווק ביצועים כדי לעזור לך להשיג את יעדי ההכנסות שלך.
            </p>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              בין אם אתה צריך אתר ממיר, קמפיין פרסום אסטרטגי או מערכת צמיחה מלאה, אני מביא את המומחיות הטכנית והחשיבה העסקית כדי לספק תוצאות שחשובות לשורה התחתונה שלך.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex gap-4 p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="text-blue-600 flex-shrink-0 bg-blue-50 p-3 rounded-xl">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-3xl p-12 text-white shadow-2xl shadow-blue-600/40">
              {/* Subtle glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-8">למה לעבוד איתי</h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-teal-300 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-teal-300/50"></div>
                    <span className="text-lg leading-relaxed">גישה ישירה—בלי מנהלי חשבון או שכבות תקשורת</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-teal-300 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-teal-300/50"></div>
                    <span className="text-lg leading-relaxed">גישה אסטרטגית המשלבת עיצוב, פיתוח ושיווק</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-teal-300 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-teal-300/50"></div>
                    <span className="text-lg leading-relaxed">התמקדות במדדים שחשובים: המרות, לידים והכנסות</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-teal-300 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-teal-300/50"></div>
                    <span className="text-lg leading-relaxed">מחויב להצלחה שלך עם תקשורת שקופה</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-3 h-3 bg-teal-300 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-teal-300/50"></div>
                    <span className="text-lg leading-relaxed">רקורד מוכח באספקת צמיחה עסקית מדידה</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Search, Palette, Rocket, BarChart3 } from 'lucide-react';

export function Process() {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      number: '01',
      title: 'גילוי',
      description: 'ניתוח יעדי העסק, קהל היעד, המתחרים והביצועים הנוכחיים לבניית בסיס אסטרטגי.',
    },
    {
      icon: <Palette className="w-8 h-8" />,
      number: '02',
      title: 'עיצוב ובנייה',
      description: 'עיצוב ופיתוח מותאם אישית ממוקד המרות, חווית משתמש וביצועים. כל אלמנט משרת את יעדי העסק.',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      number: '03',
      title: 'השקה',
      description: 'השקה אסטרטגית עם מעקב, אנליטיקה ואופטימיזציית המרות במקום מיום אחד.',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      number: '04',
      title: 'אופטימיזציה והרחבה',
      description: 'בדיקות, שיפורים והרחבה מתמשכת המבוססת על נתוני ביצועים אמיתיים למקסימום תוצאות.',
    },
  ];

  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20" dir="rtl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            איך אנחנו עובדים
          </h2>
          <p className="text-2xl text-gray-500 max-w-2xl mx-auto font-light">
            תהליך מוכח שמתוכנן להשפעה מקסימלית
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-200 via-teal-200 to-purple-200"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative" dir="rtl">
                <div className="bg-gradient-to-br from-white to-gray-50/50 rounded-3xl p-8 border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 h-full group">
                  {/* Circle number indicator */}
                  <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-6 mx-auto shadow-lg shadow-blue-600/30 group-hover:scale-110 transition-transform duration-500">
                    {step.number}
                  </div>
                  
                  <div className="text-gray-700 mb-5 flex justify-center">
                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-center">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 bg-gradient-to-l from-blue-50 to-teal-50 border-r-4 border-blue-600 p-8 rounded-3xl" dir="rtl">
          <p className="text-gray-700 text-lg">
            <span className="font-bold text-gray-900">שים לב:</span> העבודה מתחילה לאחר תשלום התחלתי או פיקדון. זה מבטיח מחויבות ומאפשר לי להקצות זמן ייעודי לפרויקט שלך.
          </p>
        </div>
      </div>
    </section>
  );
}

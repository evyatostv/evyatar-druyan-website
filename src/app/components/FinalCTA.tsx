import { ArrowLeft, Mail } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 py-28 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <div dir="rtl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            מוכן להצמיח את העסק שלך?
          </h2>
          <p className="text-2xl text-blue-50 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            בוא נדבר על הפרויקט שלך, היעדים וכיצד נוכל לבנות אתר ומערכת שיווק שמניבים הכנסות אמיתיות לעסק שלך.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button className="group bg-white text-blue-700 hover:bg-blue-50 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-3 hover:scale-105">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              בקש הצעת מחיר
            </button>
            <button className="bg-blue-800/80 backdrop-blur-sm hover:bg-blue-700 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 border-2 border-blue-400/30 hover:border-blue-400/50 flex items-center gap-3 hover:scale-105">
              <Mail className="w-5 h-5" />
              שלח הודעה
            </button>
          </div>
          <p className="text-blue-100 mt-10 text-lg font-light">
            העבודה מתחילה לאחר פיקדון. זמינות מוגבלת—שמור את המקום שלך היום.
          </p>
        </div>
      </div>
    </section>
  );
}

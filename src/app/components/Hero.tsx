import { ArrowLeft, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router';

export function Hero() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50/30 py-24 md:py-40 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-teal-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-teal-100/30 to-blue-100/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center" dir={isRTL ? 'rtl' : 'ltr'}>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tight">
            {isRTL ? 'אתרים שמייצרים הכנסות' : 'Websites That Generate Revenue'}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            {isRTL
              ? 'עיצוב אתרים מקצועי, פלטפורמות מסחר, דפי נחיתה ממירים ופרסום ממומן ב-Meta, TikTok ו-Google'
              : 'Professional website design, ecommerce platforms, high-converting landing pages and paid advertising on Meta, TikTok, and Google'}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/contact"
              className="group bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 flex items-center gap-3"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {isRTL ? 'בקש הצעת מחיר וזמינות' : 'Request Pricing and Availability'}
            </Link>
            <Link
              to="/case-studies"
              className="bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-900 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg flex items-center gap-3"
            >
              <Eye className="w-5 h-5" />
              {isRTL ? 'צפה בעבודות שלי' : 'View My Work'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
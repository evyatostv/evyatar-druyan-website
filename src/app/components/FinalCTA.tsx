import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router';
import { useSiteContent } from '../context/SiteContentContext';
import { useLanguage } from '../context/LanguageContext';

export function FinalCTA() {
  const { content } = useSiteContent();
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const copy = {
    he: {
      title: 'מוכנים להתקדם שלב?',
      subtitle: 'נדבר על היעדים שלכם ונבנה תוכנית דיגיטלית שמביאה תוצאות בפועל.',
      ctaPrimary: 'לבקשת הצעה',
      ctaSecondary: 'שליחת מייל',
      note: 'העבודה מתחילה לאחר תשלום פתיחה. מספר המקומות החודשי מוגבל.',
    },
    en: {
      title: 'Ready for the Next Step?',
      subtitle: 'Let’s review your goals and build a digital plan that drives real outcomes.',
      ctaPrimary: 'Request a Proposal',
      ctaSecondary: 'Send an Email',
      note: 'Work starts after an initial payment. Monthly availability is limited.',
    },
  }[language];

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 py-20 sm:py-24 lg:py-20 sm:py-24 lg:py-28 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-10 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-8 leading-tight tracking-tight">
          {copy.title}
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-blue-50 mb-9 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          {copy.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
          <Link
            to="/contact"
            className="group bg-white text-blue-700 hover:bg-blue-50 px-7 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-xl flex items-center gap-3"
          >
            {isRTL ? (
              <>
                {copy.ctaPrimary}
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                {copy.ctaPrimary}
              </>
            )}
          </Link>
          <a
            href={`mailto:${content.siteInfo.email}`}
            className="bg-blue-800/80 backdrop-blur-sm hover:bg-blue-700 text-white px-7 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 border-2 border-blue-400/30 hover:border-blue-400/50 flex items-center gap-3"
          >
            <Mail className="w-5 h-5" />
            {copy.ctaSecondary}
          </a>
        </div>
        <p className="text-blue-100 mt-8 sm:mt-10 text-sm sm:text-base lg:text-lg font-light">{copy.note}</p>
      </div>
    </section>
  );
}

import { ArrowLeft, Eye } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

export function Hero() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  return (
    <section className="druyan-hero relative overflow-hidden py-24 md:py-32" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="hero-noise" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="space-y-7">
            <p className="hero-label">
              <span>{isRTL ? 'סטודיו דיגיטל ובניית אתרים' : 'Digital Studio & Web Design'}</span>
            </p>

            <h1 className="hero-title leading-[0.88]">
              {isRTL ? (
                <>
                  <span className="hero-line hero-line-1">דרוין</span>
                  <span className="hero-line hero-line-2">עיצובים</span>
                </>
              ) : (
                <>
                  <span className="hero-line hero-line-1">DRUYAN</span>
                  <span className="hero-line hero-line-2">DESIGN</span>
                </>
              )}
            </h1>

            <p className="hero-subtitle max-w-2xl text-lg text-neutral-700 md:text-xl">
              {isRTL
                ? 'זהות מותג חזקה, אתרים מהירים ודפי נחיתה שמביאים תוצאות. עיצוב, פיתוח ואסטרטגיה במקום אחד.'
                : 'Bold brand identity, fast websites, and landing pages that convert. Strategy, design, and development in one place.'}
            </p>

            <div className="name-play" aria-label="Druyan Design bilingual brand">
              <span>Druyan Design</span>
              <span>דרוין עיצובים</span>
              <span>Druyan Design</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/contact" className="hero-btn hero-btn-primary">
                <ArrowLeft className="h-5 w-5" />
                {isRTL ? 'בואו נבנה משהו מיוחד' : "Let's Build Something Special"}
              </Link>
              <Link to="/case-studies" className="hero-btn hero-btn-secondary">
                <Eye className="h-5 w-5" />
                {isRTL ? 'צפו בעבודות האחרונות' : 'See Recent Work'}
              </Link>
            </div>
          </div>

          <div className="hero-art-wrap">
            <div className="hero-logo" role="img" aria-label="Druyan Design logo">
              <div className="logo-shape logo-quarter" />
              <div className="logo-shape logo-circle" />
              <div className="logo-shape logo-half" />
              <div className="logo-shape logo-pillar" />
            </div>

            <p className="hero-signature">
              {isRTL ? 'דרוין עיצובים' : 'Druyan Design'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

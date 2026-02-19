import { useParams, Link } from 'react-router';
import { ArrowRight, ExternalLink, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';

export function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const { content } = useSiteContent();

  const projects = content.projects;
  const project = projects.find((item) => item.id === id) || projects[0];

  if (!project) {
    return null;
  }

  const copy = {
    he: {
      overview: 'סקירת הפרויקט',
      result: 'התוצאה',
      visit: 'צפה באתר',
      ctaTitle: 'מוכנים לפרויקט הבא?',
      ctaText: 'בואו נבנה אתר שעובד בשביל העסק שלכם.',
      ctaBtn: 'בקשו הצעה',
    },
    en: {
      overview: 'Project Overview',
      result: 'Result',
      visit: 'Visit Website',
      ctaTitle: 'Ready for your next project?',
      ctaText: 'Let us build a website that works for your business.',
      ctaBtn: 'Request Proposal',
    },
  }[language];

  return (
    <div className="pt-20 bg-white">
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-5 py-2 rounded-full font-semibold mb-6">
            {isRTL ? project.categoryHe : project.categoryEn}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
            {isRTL ? project.titleHe : project.titleEn}
          </h1>

          <div className="rounded-3xl overflow-hidden shadow-2xl mb-10">
            <ImageWithFallback
              src={project.image}
              alt={isRTL ? project.titleHe : project.titleEn}
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border-2 border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{copy.overview}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {isRTL ? project.descriptionHe : project.descriptionEn}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-7 h-7 text-teal-200" />
                <h2 className="text-2xl font-bold">{copy.result}</h2>
              </div>
              <p className="text-3xl font-extrabold mb-6">{isRTL ? project.resultHe : project.resultEn}</p>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 px-5 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
                >
                  {copy.visit}
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center" dir={isRTL ? 'rtl' : 'ltr'}>
          <h3 className="text-4xl font-bold text-gray-900 mb-6">{copy.ctaTitle}</h3>
          <p className="text-xl text-gray-600 mb-8">{copy.ctaText}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {copy.ctaBtn}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

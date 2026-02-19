import { ArrowLeft, Globe } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';

function formatDisplayUrl(url: string) {
  return url.replace(/^https?:\/\//i, '').replace(/^www\./i, '').replace(/\/$/, '');
}

export function Portfolio() {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const { content } = useSiteContent();
  const projects = content.projects;

  const copy = {
    he: {
      title: 'פרוייקטים עם תוצאה מדידה',
      subtitle: 'פרויקטים אמיתיים שהשפיעו על צמיחה, מכירות ולידים',
      cta: 'לכל הפרוייקטים',
    },
    en: {
      title: 'Case Studies with Measurable Impact',
      subtitle: 'Real projects that improved growth, sales, and lead quality',
      cta: 'View All Case Studies',
    },
  }[language];

  return (
    <section className="bg-gradient-to-b from-gray-50/40 to-white py-20 sm:py-24 lg:py-20 sm:py-24 lg:py-28" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-14 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight">
            {copy.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto font-light">{copy.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative h-52 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                <ImageWithFallback
                  src={project.image}
                  alt={isRTL ? project.titleHe : project.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <div className="inline-block text-xs sm:text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full font-semibold mb-4">
                  {isRTL ? project.categoryHe : project.categoryEn}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{isRTL ? project.titleHe : project.titleEn}</h3>
                <div className="mt-auto flex items-center gap-3 text-gray-700 bg-gradient-to-l from-green-50 to-emerald-50 px-4 sm:px-5 py-3 rounded-2xl">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  <span className="font-bold text-base sm:text-lg break-all">
                    {project.liveUrl ? formatDisplayUrl(project.liveUrl) : isRTL ? project.resultHe : project.resultEn}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/case-studies"
            className="bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-7 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl inline-flex items-center gap-3"
          >
            <ArrowLeft className="w-5 h-5" />
            {copy.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

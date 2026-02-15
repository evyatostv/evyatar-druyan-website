import { Link } from 'react-router';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';

export function CaseStudies() {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const { content } = useSiteContent();
  const projects = content.projects;

  return (
    <div className="pt-20 bg-gradient-to-b from-gray-50/30 to-white">
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-20" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {isRTL ? 'מקרי בוחן' : 'Case Studies'}
            </h1>
            <p className="text-2xl text-gray-500 max-w-3xl mx-auto font-light">
              {isRTL
                ? 'פרויקטים אמיתיים עם תוצאות מדידות והשפעה עסקית מוכחת'
                : 'Real projects with measurable results and proven business impact'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/case-studies/${project.id}`}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                  <ImageWithFallback
                    src={project.image}
                    alt={isRTL ? project.titleHe : project.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-8">
                  <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full font-semibold mb-4">
                    {isRTL ? project.categoryHe : project.categoryEn}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{isRTL ? project.titleHe : project.titleEn}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{isRTL ? project.descriptionHe : project.descriptionEn}</p>
                  <div className="flex items-center gap-3 text-gray-700 bg-gradient-to-l from-green-50 to-emerald-50 px-5 py-3 rounded-2xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-lg">{isRTL ? project.resultHe : project.resultEn}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

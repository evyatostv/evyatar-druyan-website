import { Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';

export function Insights() {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const { content } = useSiteContent();
  const articles = content.articles;

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-gray-50">
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-20" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {isRTL ? 'תובנות' : 'Insights'}
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              {isRTL
                ? 'אסטרטגיות, טיפים ותובנות לצמיחה דיגיטלית'
                : 'Strategies, tips, and insights for digital growth'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                to={`/insights/${article.slug}`}
                className="group bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full font-semibold mb-4">
                  {isRTL ? article.categoryHe : article.categoryEn}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {isRTL ? article.titleHe : article.titleEn}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{isRTL ? article.excerptHe : article.excerptEn}</p>
                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{isRTL ? article.dateHe : article.dateEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{isRTL ? article.readTimeHe : article.readTimeEn}</span>
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

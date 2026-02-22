import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';

export function InsightDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const isRTL = language === 'he';
  const { content } = useSiteContent();

  const fallback = content.articles[0];
  const article = content.articles.find((item) => item.slug === slug) || fallback;

  if (!article) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{t('noArticlesFound')}</p>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl" dir={isRTL ? 'rtl' : 'ltr'}>
          <Link to="/insights" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8">
            {isRTL ? (
              <>
                {t('backToInsights')}
                <ArrowLeft className="w-4 h-4" />
              </>
            ) : (
              <>
                <ArrowLeft className="w-4 h-4" />
                {t('backToInsights')}
              </>
            )}
          </Link>

          <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full font-semibold mb-5">
            {isRTL ? article.categoryHe : article.categoryEn}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
            {isRTL ? article.titleHe : article.titleEn}
          </h1>

          <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
            {(isRTL ? article.contentHe : article.contentEn)
              .split('\n')
              .filter(Boolean)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}

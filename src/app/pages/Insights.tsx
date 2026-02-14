import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';

export function Insights() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const articles = isRTL
    ? [
        {
          title: '5 אלמנטים קריטיים באתר ממיר',
          excerpt: 'למד מה הופך אתר לכלי צמיחה עסקי אמיתי ולא סתם נוכחות דיגיטלית.',
          category: 'עיצוב אתרים',
          date: '15 פברואר 2026',
          readTime: '5 דק׳',
          slug: 'critical-website-elements',
        },
        {
          title: 'איך להפחית עלות רכישה ב-Meta Ads',
          excerpt: 'אסטרטגיות מוכחות לשיפור ROI בקמפיינים ממומנים ב-Meta.',
          category: 'פרסום ממומן',
          date: '10 פברואר 2026',
          readTime: '7 דק׳',
          slug: 'reduce-meta-ads-cost',
        },
        {
          title: 'מדוע אתר מהיר = יותר המרות',
          excerpt: 'הקשר בין מהירות אתר לשיעורי המרה והשפעתו על הכנסות.',
          category: 'אופטימיזציה',
          date: '5 פברואר 2026',
          readTime: '4 דק׳',
          slug: 'website-speed-conversions',
        },
        {
          title: 'בניית משפך שיווקי שמניב תוצאות',
          excerpt: 'כיצד לתכנן ולהפעיל משפך שיווקי שממיר מבקרים ללקוחות.',
          category: 'אסטרטגיה',
          date: '1 פברואר 2026',
          readTime: '6 דק׳',
          slug: 'marketing-funnel-guide',
        },
      ]
    : [
        {
          title: '5 Critical Elements of a Converting Website',
          excerpt: 'Learn what turns a website into a real business growth tool, not just digital presence.',
          category: 'Website Design',
          date: 'February 15, 2026',
          readTime: '5 min',
          slug: 'critical-website-elements',
        },
        {
          title: 'How to Reduce Acquisition Cost in Meta Ads',
          excerpt: 'Proven strategies for improving ROI in Meta paid campaigns.',
          category: 'Paid Advertising',
          date: 'February 10, 2026',
          readTime: '7 min',
          slug: 'reduce-meta-ads-cost',
        },
        {
          title: 'Why Fast Website = More Conversions',
          excerpt: 'The relationship between website speed and conversion rates and its impact on revenue.',
          category: 'Optimization',
          date: 'February 5, 2026',
          readTime: '4 min',
          slug: 'website-speed-conversions',
        },
        {
          title: 'Building a Marketing Funnel That Delivers Results',
          excerpt: 'How to plan and execute a marketing funnel that converts visitors into customers.',
          category: 'Strategy',
          date: 'February 1, 2026',
          readTime: '6 min',
          slug: 'marketing-funnel-guide',
        },
      ];

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-gray-50">
      <section className="py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {isRTL ? 'תובנות' : 'Insights'}
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              {isRTL
                ? 'אסטרטגיות, טיפים ותובנות לצמיחה דיגיטלית'
                : 'Strategies, tips, and insights for digital growth'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article, index) => (
              <Link
                key={index}
                to={`/insights/${article.slug}`}
                className="group bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full font-semibold mb-4">
                  {article.category}
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center gap-6 text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{article.readTime}</span>
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

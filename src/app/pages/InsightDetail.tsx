import { Link, useParams } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const articleData: Record<string, Record<'he' | 'en', { title: string; category: string; content: string[] }>> = {
  'critical-website-elements': {
    he: {
      title: '5 אלמנטים קריטיים באתר ממיר',
      category: 'עיצוב אתרים',
      content: [
        'אתר ממיר צריך מבנה ברור, מסר חד והנעה לפעולה שנראית מיד.',
        'מהירות טעינה, אמון (הוכחות חברתיות), ותהליך יצירת קשר פשוט הם גורמי מפתח.',
      ],
    },
    en: {
      title: '5 Critical Elements of a Converting Website',
      category: 'Website Design',
      content: [
        'A converting website needs clear structure, sharp messaging, and visible calls to action.',
        'Load speed, trust signals, and a simple contact path are key performance drivers.',
      ],
    },
  },
  'reduce-meta-ads-cost': {
    he: {
      title: 'איך להפחית עלות רכישה ב-Meta Ads',
      category: 'פרסום ממומן',
      content: [
        'הפחתת עלות רכישה מתחילה במדידה מדויקת של אירועי המרה וקהלים איכותיים.',
        'בדיקות קריאייטיב רציפות ושיפור דפי נחיתה מורידים עלויות לאורך זמן.',
      ],
    },
    en: {
      title: 'How to Reduce Acquisition Cost in Meta Ads',
      category: 'Paid Advertising',
      content: [
        'Lower acquisition costs start with accurate conversion tracking and high-quality audience targeting.',
        'Continuous creative testing and landing page optimization reduce costs over time.',
      ],
    },
  },
  'website-speed-conversions': {
    he: {
      title: 'מדוע אתר מהיר = יותר המרות',
      category: 'אופטימיזציה',
      content: [
        'זמן טעינה משפיע ישירות על נטישה ועל הסיכוי שמשתמש ישלים רכישה או ישאיר ליד.',
        'שיפור ביצועים טכניים מעלה גם חוויית משתמש וגם ROI מפרסום.',
      ],
    },
    en: {
      title: 'Why Fast Website = More Conversions',
      category: 'Optimization',
      content: [
        'Load time directly impacts bounce rate and a user\'s likelihood to convert.',
        'Technical performance improvements increase both user experience and paid traffic ROI.',
      ],
    },
  },
  'marketing-funnel-guide': {
    he: {
      title: 'בניית משפך שיווקי שמניב תוצאות',
      category: 'אסטרטגיה',
      content: [
        'משפך יעיל מחבר בין קמפיינים, דפי נחיתה, אוטומציה ומעקב המרות.',
        'כאשר כל שלב מותאם למטרה עסקית, איכות הלידים ושיעור הסגירה משתפרים.',
      ],
    },
    en: {
      title: 'Building a Marketing Funnel That Delivers Results',
      category: 'Strategy',
      content: [
        'An effective funnel aligns campaigns, landing pages, automation, and conversion tracking.',
        'When each stage is optimized for a business goal, lead quality and close rates improve.',
      ],
    },
  },
};

export function InsightDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const safeSlug = slug && articleData[slug] ? slug : 'critical-website-elements';
  const article = articleData[safeSlug][language];

  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl" dir={isRTL ? 'rtl' : 'ltr'}>
          <Link to="/insights" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-8">
            <ArrowLeft className="w-4 h-4" />
            {isRTL ? 'חזרה לתובנות' : 'Back to Insights'}
          </Link>

          <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full font-semibold mb-5">
            {article.category}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 tracking-tight">
            {article.title}
          </h1>

          <div className="space-y-6 text-xl text-gray-700 leading-relaxed">
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

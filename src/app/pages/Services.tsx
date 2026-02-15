import { useParams, Link } from 'react-router';
import { ArrowLeft, Check, Globe, TrendingUp, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const servicesData: Record<string, any> = {
  'website-design': {
    icon: Globe,
    he: {
      title: 'עיצוב אתרים',
      tagline: 'אתרים מותאמים אישית שבנויים להמרות ולצמיחה',
      description: 'אנחנו מתמחים ביצירת אתרים שלא רק נראים מעולה אלא גם מניבים תוצאות עסקיות מדידות. כל פרויקט מתוכנן אסטרטגית עם התמקדות בחווית משתמש, אופטימיזציית המרות וביצועים טכניים.',
      deliverables: {
        title: 'מה מקבלים',
        items: [
          'עיצוב UI/UX מותאם אישית',
          'פיתוח רספונסיבי מלא',
          'אופטימיזציה ל-SEO ומהירות',
          'מערכת ניהול תוכן (CMS)',
          'אינטגרציות וטפסים',
          'הגדרת אנליטיקס ומעקב',
          'אבטחה ומהירות',
          'הדרכה ותיעוד',
        ],
      },
      workflow: {
        title: 'תהליך העבודה',
        steps: [
          {
            title: 'גילוי ואסטרטגיה',
            description: 'ניתוח עומק של העסק, קהל היעד, מתחרים ויעדים עסקיים. בניית אסטרטגיה דיגיטלית ברורה.',
          },
          {
            title: 'תכנון ומיפוי',
            description: 'יצירת ארכיטקטורת מידע, מיפוי נתיבי משתמש ותכנון תוכן אסטרטגי.',
          },
          {
            title: 'עיצוב ופרוטוטייפ',
            description: 'עיצוב ממשק משתמש מודרני, יצירת פרוטוטייפים אינטראקטיביים ובדיקות משתמשים.',
          },
          {
            title: 'פיתוח ובנייה',
            description: 'פיתוח טכני מתקדם עם התמקדות בביצועים, נגישות ואופטימיזציה.',
          },
          {
            title: 'בדיקות והשקה',
            description: 'בדיקות מקיפות, אופטימיזציה סופית והשקה אסטרטגית.',
          },
          {
            title: 'תמיכה ואופטימיזציה',
            description: '30 יום תמיכה מלאה, מעקב אחר ביצועים ואופטימיזציה מתמשכת.',
          },
        ],
      },
      forWho: {
        title: 'למי זה מתאים',
        items: [
          'עסקים שרוצים נוכחות דיגיטלית מקצועית',
          'חנויות מסחר מקוונות שזקוקות לפלטפורמה ממירה',
          'סטארט-אפים וחברות SaaS שמחפשות דף נחיתה חזק',
          'עסקי שירותים שרוצים למשוך לקוחות איכותיים',
          'מותגים שמבינים שאתר הוא נכס עסקי, לא סתם כרטיס ביקור',
        ],
      },
      positioning: {
        title: 'הגישה שלנו',
        description: 'אנחנו לא עוסקים רק בעיצוב יפה. אנחנו בונים אתרים כמו מערכות צמיחה עסקית. כל החלטת עיצוב, כל אלמנט ממשק, כל מילה בתוכן - הכל משרת מטרה עסקית ברורה: להניב תוצאות מדידות.',
      },
    },
    en: {
      title: 'Website Design',
      tagline: 'Custom websites built for conversions and growth',
      description: 'We specialize in creating websites that not only look great but also deliver measurable business results. Every project is strategically planned with focus on user experience, conversion optimization, and technical performance.',
      deliverables: {
        title: 'What You Get',
        items: [
          'Custom UI/UX design',
          'Full responsive development',
          'SEO and speed optimization',
          'Content management system (CMS)',
          'Integrations and forms',
          'Analytics and tracking setup',
          'Security and performance',
          'Training and documentation',
        ],
      },
      workflow: {
        title: 'Our Workflow',
        steps: [
          {
            title: 'Discovery & Strategy',
            description: 'In-depth analysis of business, target audience, competitors, and goals. Building a clear digital strategy.',
          },
          {
            title: 'Planning & Mapping',
            description: 'Creating information architecture, user journey mapping, and strategic content planning.',
          },
          {
            title: 'Design & Prototype',
            description: 'Modern UI design, interactive prototypes creation, and user testing.',
          },
          {
            title: 'Development & Build',
            description: 'Advanced technical development with focus on performance, accessibility, and optimization.',
          },
          {
            title: 'Testing & Launch',
            description: 'Comprehensive testing, final optimization, and strategic launch.',
          },
          {
            title: 'Support & Optimization',
            description: '30 days full support, performance monitoring, and ongoing optimization.',
          },
        ],
      },
      forWho: {
        title: 'Who This Is For',
        items: [
          'Businesses wanting professional digital presence',
          'Online stores needing converting platform',
          'Startups and SaaS companies looking for strong landing page',
          'Service businesses wanting to attract quality clients',
          'Brands understanding website is business asset, not just business card',
        ],
      },
      positioning: {
        title: 'Our Approach',
        description: "We're not just about beautiful design. We build websites as business growth systems. Every design decision, every interface element, every word of content - everything serves a clear business purpose: to deliver measurable results.",
      },
    },
  },
  // Add other services similarly...
};

export function ServiceDetail() {
  const { service } = useParams<{ service: string }>();
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const safeService = service && servicesData[service] ? service : 'website-design';
  const data = servicesData[safeService][language];
  const IconComponent = servicesData[safeService].icon;

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center" dir={isRTL ? 'rtl' : 'ltr'}>
            {IconComponent && (
              <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl mb-8">
                <IconComponent className="w-16 h-16 text-blue-600" />
              </div>
            )}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {data.title}
            </h1>
            <p className="text-3xl text-gray-600 mb-10 font-light max-w-3xl mx-auto">
              {data.tagline}
            </p>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">
              {data.deliverables.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {data.deliverables.items.map((item: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:shadow-lg transition-all"
                >
                  <div className="bg-blue-50 p-2 rounded-xl">
                    <Check className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-12 text-center">
              {data.workflow.title}
            </h2>
            <div className="space-y-6">
              {data.workflow.steps.map((step: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* For Who & Positioning */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-10 border-2 border-blue-100" dir={isRTL ? 'rtl' : 'ltr'}>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">{data.forWho.title}</h2>
              <ul className="space-y-4">
                {data.forWho.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 text-lg">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl p-10" dir={isRTL ? 'rtl' : 'ltr'}>
              <h2 className="text-4xl font-bold mb-8">{data.positioning.title}</h2>
              <p className="text-xl leading-relaxed text-gray-200">{data.positioning.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h3 className="text-5xl font-extrabold text-white mb-8">
              {isRTL ? 'מוכן להתחיל?' : 'Ready to Get Started?'}
            </h3>
            <p className="text-2xl text-blue-50 mb-10">
              {isRTL
                ? 'בוא נדבר על הפרויקט שלך ונבנה משהו שמניב תוצאות'
                : "Let's discuss your project and build something that delivers results"}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-white text-blue-700 hover:bg-blue-50 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {isRTL ? (
                <>
                  <ArrowLeft className="w-5 h-5" />
                  בקש הצעה מותאמת
                </>
              ) : (
                <>
                  Request Custom Proposal
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

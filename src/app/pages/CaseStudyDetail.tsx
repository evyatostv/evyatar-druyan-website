import { useParams, Link } from 'react-router';
import { ArrowRight, TrendingUp, Target, Lightbulb, Rocket, BarChart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const caseStudyData: Record<string, any> = {
  'ecommerce-redesign': {
    he: {
      title: 'עיצוב מחדש של חנות מסחר',
      category: 'עיצוב אתרים',
      client: 'חנות אופנה מקוונת',
      duration: '8 שבועות',
      image: 'https://images.unsplash.com/photo-1612831661941-254341b885e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wfGVufDF8fHx8MTc3MTA5NDQxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      challenge: {
        title: 'האתגר',
        description: 'חנות אופנה מקוונת חוותה שיעור המרה נמוך של 0.8% ושיעור נטישת עגלות גבוה של 78%. האתר היה מיושן, איטי וחוויית המשתמש במובייל לא הייתה אופטימלית.',
        points: [
          'ממשק משתמש מיושן שלא השתנה 4 שנים',
          'זמן טעינה של 8.2 שניות בממוצע',
          'שיעור המרה של 0.8% בלבד',
          '78% נטישת עגלות קניות',
          'חוויית מובייל לא רספונסיבית',
        ],
      },
      solution: {
        title: 'הפתרון',
        description: 'בניית אתר מסחר חדש לחלוטין עם התמקדות בחווית משתמש, מהירות ואופטימיזציית המרות. השתמשנו בעיצוב מודרני, מינימליסטי עם נתיב רכישה ברור.',
        points: [
          'עיצוב מחדש מלא עם ממשק נקי ואינטואיטיבי',
          'אופטימיזציה טכנית להפחתת זמן הטעינה ל-1.3 שניות',
          'תהליך רכישה מפושט ל-3 צעדים',
          'אינטגרציה של המלצות מוצרים חכמות',
          'מערכת סינון ושיוך מתקדמת',
        ],
      },
      process: {
        title: 'התהליך',
        steps: [
          {
            title: 'מחקר וניתוח',
            description: 'ניתוח התנהגות משתמשים, מפות חום, ראיונות עם לקוחות ובדיקת מתחרים.',
          },
          {
            title: 'אסטרטגיה ומיפוי',
            description: 'בניית ארכיטקטורת מידע חדשה, מיפוי נתיבי משתמש ותכנון חווית רכישה.',
          },
          {
            title: 'עיצוב UI/UX',
            description: 'יצירת מערכת עיצוב מודרנית, פרוטוטייפים אינטראקטיביים ובדיקות משתמשים.',
          },
          {
            title: 'פיתוח ואופטימיזציה',
            description: 'פיתוח מהיר עם התמקדות בביצועים, אינטגרציות ואופטימיזציה טכנית.',
          },
        ],
      },
      results: {
        title: 'התוצאות',
        metrics: [
          { label: 'עלייה בהמרות', value: '+142%', icon: TrendingUp },
          { label: 'הפחתת נטישת עגלות', value: '-45%', icon: Target },
          { label: 'זמן טעינה', value: '1.3s', icon: Rocket },
          { label: 'עלייה בהכנסות', value: '+$380K', icon: BarChart },
        ],
        description: 'תוך 3 חודשים מההשקה, החנות חוותה עלייה דרמטית בביצועים עם שיפור של 142% בשיעור ההמרה והפחתה של 45% בנטישת עגלות. ההכנסות החודשיות עלו ב-$380,000.',
      },
    },
    en: {
      title: 'Ecommerce Store Redesign',
      category: 'Website Design',
      client: 'Online Fashion Retailer',
      duration: '8 Weeks',
      image: 'https://images.unsplash.com/photo-1612831661941-254341b885e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wfGVufDF8fHx8MTc3MTA5NDQxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      challenge: {
        title: 'The Challenge',
        description: 'An online fashion retailer was experiencing a low conversion rate of 0.8% and a high cart abandonment rate of 78%. The website was outdated, slow, and mobile user experience was not optimal.',
        points: [
          'Outdated interface unchanged for 4 years',
          'Average load time of 8.2 seconds',
          'Only 0.8% conversion rate',
          '78% cart abandonment',
          'Non-responsive mobile experience',
        ],
      },
      solution: {
        title: 'The Solution',
        description: 'Built a completely new ecommerce site with focus on user experience, speed, and conversion optimization. Used modern, minimalist design with clear purchase path.',
        points: [
          'Complete redesign with clean, intuitive interface',
          'Technical optimization reducing load time to 1.3 seconds',
          'Simplified checkout process to 3 steps',
          'Smart product recommendations integration',
          'Advanced filtering and sorting system',
        ],
      },
      process: {
        title: 'The Process',
        steps: [
          {
            title: 'Research & Analysis',
            description: 'User behavior analysis, heat maps, customer interviews, and competitor research.',
          },
          {
            title: 'Strategy & Mapping',
            description: 'Building new information architecture, user journey mapping, and purchase experience planning.',
          },
          {
            title: 'UI/UX Design',
            description: 'Creating modern design system, interactive prototypes, and user testing.',
          },
          {
            title: 'Development & Optimization',
            description: 'Rapid development with focus on performance, integrations, and technical optimization.',
          },
        ],
      },
      results: {
        title: 'The Results',
        metrics: [
          { label: 'Conversion Increase', value: '+142%', icon: TrendingUp },
          { label: 'Cart Abandonment Reduction', value: '-45%', icon: Target },
          { label: 'Load Time', value: '1.3s', icon: Rocket },
          { label: 'Revenue Increase', value: '+$380K', icon: BarChart },
        ],
        description: 'Within 3 months of launch, the store experienced dramatic performance improvements with a 142% increase in conversion rate and 45% reduction in cart abandonment. Monthly revenue increased by $380,000.',
      },
    },
  },
  // Add more case studies data here...
};

export function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const safeId = id && caseStudyData[id] ? id : 'ecommerce-redesign';
  const data = caseStudyData[safeId][language];

  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-5 py-2 rounded-full font-semibold mb-6">
              {data.category}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
              {data.title}
            </h1>
            <div className="flex gap-8 text-lg text-gray-600 mb-10">
              <div>
                <span className="font-semibold text-gray-900">
                  {isRTL ? 'לקוח:' : 'Client:'}
                </span>{' '}
                {data.client}
              </div>
              <div>
                <span className="font-semibold text-gray-900">
                  {isRTL ? 'משך:' : 'Duration:'}
                </span>{' '}
                {data.duration}
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={data.image}
              alt={data.title}
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start" dir={isRTL ? 'rtl' : 'ltr'}>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-red-50 rounded-2xl">
                  <Target className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">{data.challenge.title}</h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">{data.challenge.description}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-gray-100">
              <ul className="space-y-4">
                {data.challenge.points.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 text-lg">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border-2 border-blue-100">
              <ul className="space-y-4">
                {data.solution.points.map((point: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700 text-lg">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-blue-50 rounded-2xl">
                  <Lightbulb className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">{data.solution.title}</h2>
              </div>
              <p className="text-xl text-gray-700 leading-relaxed">{data.solution.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16" dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">{data.process.title}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {data.process.steps.map((step: any, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border-2 border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl font-bold text-blue-100 mb-4">0{index + 1}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16" dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-5xl font-extrabold text-white mb-6">{data.results.title}</h2>
            <p className="text-2xl text-blue-50 max-w-3xl mx-auto leading-relaxed">
              {data.results.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {data.results.metrics.map((metric: any, index: number) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border-2 border-white/20"
              >
                <metric.icon className="w-10 h-10 text-teal-300 mx-auto mb-4" />
                <div className="text-5xl font-bold text-white mb-3">{metric.value}</div>
                <div className="text-blue-100 font-semibold">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <div dir={isRTL ? 'rtl' : 'ltr'}>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              {isRTL ? 'מוכן לתוצאות דומות?' : 'Ready for Similar Results?'}
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              {isRTL
                ? 'בוא נדבר על הפרויקט שלך וכיצד נוכל להשיג תוצאות מדידות לעסק שלך'
                : "Let's discuss your project and how we can achieve measurable results for your business"}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isRTL ? (
                <>
                  <ArrowRight className="w-5 h-5" />
                  בקש הצעה
                </>
              ) : (
                <>
                  Request Proposal
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

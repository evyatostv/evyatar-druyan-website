import { Link } from 'react-router';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

export function CaseStudies() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const projects = [
    {
      id: 'ecommerce-redesign',
      image: 'https://images.unsplash.com/photo-1612831661941-254341b885e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wfGVufDF8fHx8MTc3MTA5NDQxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: isRTL ? 'עיצוב מחדש של חנות מסחר' : 'Ecommerce Store Redesign',
      category: isRTL ? 'עיצוב אתרים' : 'Website Design',
      result: isRTL ? 'עלייה של 142% בהמרות' : '142% Increase in Conversions',
      metric: '+142%',
      description: isRTL
        ? 'שדרוג מלא לחנות מסחר מקוונת עם התמקדות בחווית משתמש ואופטימיזציית המרות'
        : 'Complete overhaul of an online store with focus on user experience and conversion optimization',
    },
    {
      id: 'saas-landing',
      image: 'https://images.unsplash.com/photo-1588511986632-592db3d6c81f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdlYnNpdGUlMjBkZXNpZ24lMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcxMDk0NDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: isRTL ? 'דף נחיתה SaaS' : 'SaaS Landing Page',
      category: isRTL ? 'דף נחיתה' : 'Landing Page',
      result: isRTL ? 'פי 3.2 יותר לידים איכותיים' : '3.2x More Qualified Leads',
      metric: 'x3.2',
      description: isRTL
        ? 'דף נחיתה בעל המרה גבוהה לפלטפורמת SaaS B2B'
        : 'High-converting landing page for B2B SaaS platform',
    },
    {
      id: 'meta-ads-campaign',
      image: 'https://images.unsplash.com/photo-1759215524600-7971d6a4dac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzJTIwc2NyZWVufGVufDF8fHx8MTc3MTA5NDQxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: isRTL ? 'קמפיין Meta Ads' : 'Meta Ads Campaign',
      category: isRTL ? 'פרסום ממומן' : 'Paid Advertising',
      result: isRTL ? 'ROAS של 4.80$ ב-60 יום' : '$4.80 ROAS in 60 Days',
      metric: '$4.80',
      description: isRTL
        ? 'קמפיין פרסום ממומן אסטרטגי ב-Meta עם התמקדות ב-ROI'
        : 'Strategic Meta advertising campaign with focus on ROI',
    },
    {
      id: 'b2b-lead-generation',
      image: 'https://images.unsplash.com/photo-1510924014959-7e1849088bfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYW5kaW5nJTIwcGFnZSUyMG1vY2t1cHxlbnwxfHx8fDE3NzEwOTQ0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: isRTL ? 'יצירת לידים B2B' : 'B2B Lead Generation',
      category: isRTL ? 'אתר + מודעות' : 'Website + Ads',
      result: isRTL ? '89 לידים איכותיים ב-30 יום' : '89 Qualified Leads in 30 Days',
      metric: '89',
      description: isRTL
        ? 'מערכת משולבת של אתר ופרסום ליצירת לידים B2B איכותיים'
        : 'Integrated website and advertising system for quality B2B lead generation',
    },
    {
      id: 'mobile-app-site',
      image: 'https://images.unsplash.com/photo-1707836916010-3c4ad261936c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3MTA5NDQxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: isRTL ? 'אתר לאפליקציית מובייל' : 'Mobile App Website',
      category: isRTL ? 'עיצוב אתרים' : 'Website Design',
      result: isRTL ? 'שיפור של 67% באינטראקציה' : '67% Better Mobile Engagement',
      metric: '+67%',
      description: isRTL
        ? 'אתר שיווקי לאפליקציית מובייל עם התמקדות באינטראקציה'
        : 'Marketing website for mobile app with focus on engagement',
    },
    {
      id: 'tiktok-strategy',
      image: 'https://images.unsplash.com/photo-1684061692678-68b081bbe4ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjB3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWwlMjBjbGVhbnxlbnwxfHx8fDE3NzEwOTQ0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: isRTL ? 'אסטרטגיית TikTok Ads' : 'TikTok Ads Strategy',
      category: isRTL ? 'פרסום ממומן' : 'Paid Advertising',
      result: isRTL ? 'עלות של 2.14$ לרכישה' : '$2.14 Cost Per Acquisition',
      metric: '$2.14',
      description: isRTL
        ? 'קמפיין TikTok Ads ממוקד עם עלות רכישה נמוכה'
        : 'Targeted TikTok Ads campaign with low acquisition cost',
    },
  ];

  return (
    <div className="pt-20 bg-gradient-to-b from-gray-50/30 to-white">
      <section className="py-28">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
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
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-8">
                  <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full font-semibold mb-4">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex items-center gap-3 text-gray-700 bg-gradient-to-l from-green-50 to-emerald-50 px-5 py-3 rounded-2xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    <span className="font-bold text-lg">{project.result}</span>
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

import { ArrowLeft, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Portfolio() {
  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1612831661941-254341b885e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wfGVufDF8fHx8MTc3MTA5NDQxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'עיצוב מחדש של חנות מסחר',
      category: 'עיצוב אתרים',
      result: 'עלייה של 142% בהמרות',
      metric: '+142%',
    },
    {
      image: 'https://images.unsplash.com/photo-1588511986632-592db3d6c81f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdlYnNpdGUlMjBkZXNpZ24lMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcxMDk0NDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'דף נחיתה SaaS',
      category: 'דף נחיתה',
      result: 'פי 3.2 יותר לידים איכותיים',
      metric: 'x3.2',
    },
    {
      image: 'https://images.unsplash.com/photo-1759215524600-7971d6a4dac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzJTIwc2NyZWVufGVufDF8fHx8MTc3MTA5NDQxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'קמפיין Meta Ads',
      category: 'פרסום ממומן',
      result: 'ROAS של 4.80$ ב-60 יום',
      metric: '$4.80',
    },
    {
      image: 'https://images.unsplash.com/photo-1510924014959-7e1849088bfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYW5kaW5nJTIwcGFnZSUyMG1vY2t1cHxlbnwxfHx8fDE3NzEwOTQ0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'יצירת לידים B2B',
      category: 'אתר + מודעות',
      result: '89 לידים איכותיים ב-30 יום',
      metric: '89',
    },
    {
      image: 'https://images.unsplash.com/photo-1707836916010-3c4ad261936c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc3MTA5NDQxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'אתר לאפליקציית מובייל',
      category: 'עיצוב אתרים',
      result: 'שיפור של 67% באינטראקציה',
      metric: '+67%',
    },
    {
      image: 'https://images.unsplash.com/photo-1684061692678-68b081bbe4ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjB3b3Jrc3BhY2UlMjBwcm9mZXNzaW9uYWwlMjBjbGVhbnxlbnwxfHx8fDE3NzEwOTQ0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'אסטרטגיית TikTok Ads',
      category: 'פרסום ממומן',
      result: 'עלות של 2.14$ לרכישה',
      metric: '$2.14',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50/30 to-white py-28">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-20" dir="rtl">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            תוצאות מוכחות
          </h2>
          <p className="text-2xl text-gray-500 max-w-2xl mx-auto font-light">
            פרויקטים אמיתיים עם השפעה עסקית מדידה
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-105"
              dir="rtl"
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
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{project.title}</h3>
                <div className="flex items-center gap-3 text-gray-700 bg-gradient-to-l from-green-50 to-emerald-50 px-5 py-3 rounded-2xl">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <span className="font-bold text-lg">{project.result}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/case-studies"
            className="bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 inline-flex items-center gap-3 hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" />
            צפה במקרי בוחן מלאים
          </Link>
        </div>
      </div>
    </section>
  );
}

import { TrendingUp, DollarSign, Users, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FinalCTA } from '../components/FinalCTA';

export function Results() {
  const { language } = useLanguage();
  const isRTL = language === 'he';

  const aggregateMetrics = isRTL
    ? [
        { icon: TrendingUp, label: 'ממוצע עלייה בהמרות', value: '+127%', color: 'blue' },
        { icon: DollarSign, label: 'סה״כ הכנסות שהניבו ללקוחות', value: '$4.2M', color: 'green' },
        { icon: Users, label: 'לידים איכותיים שנוצרו', value: '2,847', color: 'purple' },
        { icon: Zap, label: 'ממוצע ROAS בקמפיינים', value: '4.6x', color: 'teal' },
      ]
    : [
        { icon: TrendingUp, label: 'Average Conversion Increase', value: '+127%', color: 'blue' },
        { icon: DollarSign, label: 'Total Revenue Generated for Clients', value: '$4.2M', color: 'green' },
        { icon: Users, label: 'Quality Leads Generated', value: '2,847', color: 'purple' },
        { icon: Zap, label: 'Average ROAS in Campaigns', value: '4.6x', color: 'teal' },
      ];

  const clientResults = isRTL
    ? [
        {
          client: 'חנות אופנה מקוונת',
          industry: 'מסחר אלקטרוני',
          results: [
            { metric: 'עלייה בהמרות', value: '+142%' },
            { metric: 'עלייה בהכנסות', value: '+$380K' },
            { metric: 'הפחתת נטישת עגלות', value: '-45%' },
          ],
        },
        {
          client: 'חברת SaaS B2B',
          industry: 'טכנולוגיה',
          results: [
            { metric: 'יותר לידים איכותיים', value: 'x3.2' },
            { metric: 'הפחתה בעלות לליד', value: '-58%' },
            { metric: 'עלייה בשיעור סגירה', value: '+89%' },
          ],
        },
        {
          client: 'סוכנות שירותים מקצועיים',
          industry: 'שירותים עסקיים',
          results: [
            { metric: 'לידים איכותיים ב-30 יום', value: '89' },
            { metric: 'ROAS', value: '$4.80' },
            { metric: 'עלות לרכישה', value: '$42' },
          ],
        },
      ]
    : [
        {
          client: 'Online Fashion Retailer',
          industry: 'Ecommerce',
          results: [
            { metric: 'Conversion Increase', value: '+142%' },
            { metric: 'Revenue Increase', value: '+$380K' },
            { metric: 'Cart Abandonment Reduction', value: '-45%' },
          ],
        },
        {
          client: 'B2B SaaS Company',
          industry: 'Technology',
          results: [
            { metric: 'More Quality Leads', value: 'x3.2' },
            { metric: 'Cost Per Lead Reduction', value: '-58%' },
            { metric: 'Close Rate Increase', value: '+89%' },
          ],
        },
        {
          client: 'Professional Services Agency',
          industry: 'Business Services',
          results: [
            { metric: 'Quality Leads in 30 Days', value: '89' },
            { metric: 'ROAS', value: '$4.80' },
            { metric: 'Cost Per Acquisition', value: '$42' },
          ],
        },
      ];

  const colorMap: Record<string, string> = {
    blue: 'from-blue-600 to-blue-700',
    green: 'from-green-600 to-emerald-600',
    purple: 'from-purple-600 to-purple-700',
    teal: 'from-teal-600 to-cyan-600',
  };

  return (
    <div className="pt-20 bg-white">
      {/* Hero */}
      <section className="py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-20" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {isRTL ? 'תוצאות מצטברות' : 'Aggregate Results'}
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              {isRTL
                ? 'ביצועים מדידים ושינוי עסקי אמיתי עבור הלקוחות שלנו'
                : 'Measurable performance and real business change for our clients'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" dir={isRTL ? 'rtl' : 'ltr'}>
            {aggregateMetrics.map((metric, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${
                  colorMap[metric.color]
                } rounded-3xl p-8 text-white text-center shadow-xl hover:scale-105 transition-transform duration-300`}
              >
                <metric.icon className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <div className="text-5xl font-extrabold mb-3">{metric.value}</div>
                <div className="text-lg font-semibold opacity-90">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Results */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <div className="text-center mb-16" dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
              {isRTL ? 'תוצאות לקוחות' : 'Client Results'}
            </h2>
            <p className="text-xl text-gray-600">
              {isRTL ? 'תוצאות אמיתיות מפרויקטים אמיתיים' : 'Real results from real projects'}
            </p>
          </div>

          <div className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
            {clientResults.map((client, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 border-2 border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{client.client}</h3>
                  <div className="inline-block text-sm bg-gradient-to-l from-blue-600 to-teal-600 text-white px-4 py-1.5 rounded-full font-semibold">
                    {client.industry}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {client.results.map((result, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-200">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{result.value}</div>
                      <div className="text-gray-600 font-semibold">{result.metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

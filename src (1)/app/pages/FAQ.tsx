import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FinalCTA } from '../components/FinalCTA';

export function FAQ() {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = isRTL
    ? [
        {
          question: 'מה כלול בעיצוב אתר?',
          answer:
            'עיצוב אתר כולל מחקר וניתוח, אסטרטגיה דיגיטלית, עיצוב UI/UX מלא, פיתוח רספונסיבי, אופטימיזציה ל-SEO, מערכת ניהול תוכן, אינטגרציות, הגדרת אנליטיקס, 30 יום תמיכה ותיעוד מלא.',
        },
        {
          question: 'כמה זמן לוקח לבנות אתר?',
          answer:
            'תלוי במורכבות הפרויקט. אתר בסיסי לוקח 4-6 שבועות, אתר מסחר 8-10 שבועות, ופרויקטים מורכבים יכולים לקחת 12+ שבועות. לוח זמנים מדויק יינתן בהצעה המותאמת.',
        },
        {
          question: 'האם אתם מציעים ייעוץ חינם או ביקורת אתר חינם?',
          answer:
            'לא. אנחנו עובדים עם עסקים רציניים שמבינים את הערך של שירותים מקצועיים. כל עבודה מתחילה לאחר הסכם ופיקדון. זה מבטיח מחויבות והקצאת זמן ייעודי לפרויקט שלך.',
        },
        {
          question: 'מה כולל ניהול פרסום ממומן?',
          answer:
            'ניהול מלא של קמפיינים ב-Meta, TikTok ו-Google כולל אסטרטגיה, יצירת מודעות, טרגוט קהלים, אופטימיזציה שוטפת, בדיקות A/B, דוחות ביצועים ויעוץ אסטרטגי מתמשך.',
        },
        {
          question: 'מה התקציב המינימלי לפרויקט?',
          answer:
            'התקציב תלוי בסוג הפרויקט והיקפו. עיצוב אתר מתחיל מ-$5K, קמפיינים ממומנים מ-$2K/חודש בנוסף לתקציב מדיה. נספק הצעת מחיר מדויקת לאחר שיחת גילוי.',
        },
        {
          question: 'האם אתם מספקים תמיכה שוטפת?',
          answer:
            'כן. כל פרויקט כולל 30 יום תמיכה מלאה לאחר השקה. ניתן להוסיף חבילות תמיכה חודשיות או ניהול צמיחה מתמשך לפי הצורך.',
        },
        {
          question: 'איזה פלטפורמות אתם משתמשים?',
          answer:
            'אנחנו בוחרים את הטכנולוגיה המתאימה ביותר לכל פרויקט. אנחנו עובדים עם פלטפורמות מודרניות כמו React, Next.js, Shopify, WordPress ועוד, תלוי בצרכים העסקיים.',
        },
        {
          question: 'האם אני אקבל את הבעלות על האתר?',
          answer:
            'כן, בהחלט. לאחר תשלום מלא, אתה מקבל בעלות מלאה על כל קוד, עיצוב, תוכן ונכסים. אנחנו גם מספקים הדרכה ותיעוד כדי שתוכל לנהל את האתר בעצמך.',
        },
      ]
    : [
        {
          question: 'What is included in website design?',
          answer:
            'Website design includes research and analysis, digital strategy, full UI/UX design, responsive development, SEO optimization, content management system, integrations, analytics setup, 30 days support, and complete documentation.',
        },
        {
          question: 'How long does it take to build a website?',
          answer:
            'Depends on project complexity. Basic website takes 4-6 weeks, ecommerce site 8-10 weeks, and complex projects can take 12+ weeks. Exact timeline will be provided in custom proposal.',
        },
        {
          question: 'Do you offer free consultations or free website audits?',
          answer:
            "No. We work with serious businesses that understand the value of professional services. All work begins after agreement and deposit. This ensures commitment and dedicated time allocation to your project.",
        },
        {
          question: 'What does paid advertising management include?',
          answer:
            'Full campaign management on Meta, TikTok, and Google including strategy, ad creation, audience targeting, ongoing optimization, A/B testing, performance reports, and continuous strategic consulting.',
        },
        {
          question: 'What is the minimum budget for a project?',
          answer:
            'Budget depends on project type and scope. Website design starts from $5K, paid campaigns from $2K/month plus media budget. We provide exact quote after discovery call.',
        },
        {
          question: 'Do you provide ongoing support?',
          answer:
            'Yes. Every project includes 30 days full support after launch. Monthly support packages or ongoing growth management can be added as needed.',
        },
        {
          question: 'Which platforms do you use?',
          answer:
            'We choose the best technology for each project. We work with modern platforms like React, Next.js, Shopify, WordPress, and more, depending on business needs.',
        },
        {
          question: 'Will I own the website?',
          answer:
            'Yes, absolutely. After full payment, you receive complete ownership of all code, design, content, and assets. We also provide training and documentation so you can manage the site yourself.',
        },
      ];

  return (
    <div className="pt-20 bg-gradient-to-b from-white to-gray-50">
      <section className="py-28">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-20" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {isRTL ? 'שאלות נפוצות' : 'Frequently Asked Questions'}
            </h1>
            <p className="text-2xl text-gray-600 font-light">
              {isRTL ? 'תשובות לשאלות הנפוצות ביותר' : 'Answers to the most common questions'}
            </p>
          </div>

          <div className="space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl border-2 border-gray-200 hover:border-blue-300 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-xl font-bold text-gray-900 pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <p className="text-lg text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

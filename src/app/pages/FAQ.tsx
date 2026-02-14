import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';
import { FinalCTA } from '../components/FinalCTA';

export function FAQ() {
  const { language } = useLanguage();
  const isRTL = language === 'he';
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { content } = useSiteContent();
  const faqs = content.faqs;

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
                key={faq.id}
                className="bg-white rounded-3xl border-2 border-gray-200 hover:border-blue-300 transition-all overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-xl font-bold text-gray-900 pr-4">{isRTL ? faq.questionHe : faq.questionEn}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <p className="text-lg text-gray-600 leading-relaxed">{isRTL ? faq.answerHe : faq.answerEn}</p>
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

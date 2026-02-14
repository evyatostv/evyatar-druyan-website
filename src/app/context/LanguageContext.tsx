import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Language = 'he' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  he: {
    // Navigation
    home: 'בית',
    services: 'שירותים',
    caseStudies: 'מקרי בוחן',
    pricing: 'תמחור',
    about: 'אודות',
    contact: 'צור קשר',
    faq: 'שאלות נפוצות',
    insights: 'תובנות',
    results: 'תוצאות',
    // Services submenu
    websiteDesign: 'עיצוב אתרים',
    paidAdvertising: 'פרסום ממומן',
    fullPackage: 'חבילה מלאה',
    // Common
    requestProposal: 'בקש הצעה',
    learnMore: 'למד עוד',
    viewWork: 'צפה בעבודות',
    getStarted: 'התחל עכשיו',
  },
  en: {
    // Navigation
    home: 'Home',
    services: 'Services',
    caseStudies: 'Case Studies',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    faq: 'FAQ',
    insights: 'Insights',
    results: 'Results',
    // Services submenu
    websiteDesign: 'Website Design',
    paidAdvertising: 'Paid Advertising',
    fullPackage: 'Full Package',
    // Common
    requestProposal: 'Request Proposal',
    learnMore: 'Learn More',
    viewWork: 'View Work',
    getStarted: 'Get Started',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('he');

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

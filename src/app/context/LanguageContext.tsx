import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

type Language = 'he' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  he: {
    home: 'בית',
    services: 'שירותים',
    caseStudies: 'פרוייקטים מובילים',
    pricing: 'תמחור',
    about: 'אודות',
    contact: 'יצירת קשר',
    faq: 'שאלות נפוצות',
    insights: 'תובנות',
    results: 'תוצאות',
    websiteDesign: 'עיצוב אתרים',
    paidAdvertising: 'פרסום ממומן',
    fullPackage: 'חבילה מלאה',
    allProjects: 'כל הפרויקטים',
    requestProposal: 'בקשו הצעה',
    learnMore: 'לפרטים נוספים',
    viewWork: 'צפו בעבודות',
    getStarted: 'מתחילים',
    languageLabel: 'EN',
    footerContact: 'יצירת קשר',
    footerServices: 'שירותים',
    footerFollow: 'לינקים',
    footerRights: 'כל הזכויות שמורות.',
    footerTrusted: 'בנוי לעסקים שרוצים תוצאות מדידות.',
    noArticlesFound: 'לא נמצאו כתבות.',
    backToInsights: 'חזרה לתובנות',
    menuOpen: 'פתחו תפריט',
    menuClose: 'סגרו תפריט',
    genericLoadError: 'לא ניתן לטעון כרגע',
    genericSubmitFallback: 'הפנייה נקלטה זמנית. במקרה הצורך נחזור אליכם ידנית.',
  },
  en: {
    home: 'Home',
    services: 'Services',
    caseStudies: 'Top Projects',
    pricing: 'Pricing',
    about: 'About',
    contact: 'Contact',
    faq: 'FAQ',
    insights: 'Insights',
    results: 'Results',
    websiteDesign: 'Website Design',
    paidAdvertising: 'Paid Advertising',
    fullPackage: 'Full Package',
    allProjects: 'All Projects',
    requestProposal: 'Request a Proposal',
    learnMore: 'Learn More',
    viewWork: 'View Work',
    getStarted: 'Get Started',
    languageLabel: 'עב',
    footerContact: 'Contact',
    footerServices: 'Services',
    footerFollow: 'Follow',
    footerRights: 'All rights reserved.',
    footerTrusted: 'Built for businesses that want measurable growth.',
    noArticlesFound: 'No articles found.',
    backToInsights: 'Back to Insights',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    genericLoadError: 'Unable to load right now',
    genericSubmitFallback: 'Submission was received temporarily. We will follow up manually if needed.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('dd-language');
    if (stored === 'he' || stored === 'en') return stored;
    return 'he';
  });

  useEffect(() => {
    localStorage.setItem('dd-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const dictionary = useMemo(() => translations[language], [language]);
  const t = (key: string): string => dictionary[key] || translations.en[key] || key;

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

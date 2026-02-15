import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type HomeSectionId =
  | 'hero'
  | 'services'
  | 'portfolio'
  | 'process'
  | 'pricing'
  | 'about'
  | 'finalCta';

export interface ProjectItem {
  id: string;
  image: string;
  titleHe: string;
  titleEn: string;
  categoryHe: string;
  categoryEn: string;
  resultHe: string;
  resultEn: string;
  descriptionHe: string;
  descriptionEn: string;
}

export interface ArticleItem {
  slug: string;
  titleHe: string;
  titleEn: string;
  excerptHe: string;
  excerptEn: string;
  categoryHe: string;
  categoryEn: string;
  dateHe: string;
  dateEn: string;
  readTimeHe: string;
  readTimeEn: string;
  contentHe: string;
  contentEn: string;
}

export interface FAQItem {
  id: string;
  questionHe: string;
  questionEn: string;
  answerHe: string;
  answerEn: string;
}

export interface LeadItem {
  id: string;
  fullName: string;
  email: string;
  company: string;
  budget: string;
  projectType: string;
  details: string;
  createdAt: string;
}

export interface SiteInfo {
  brandHe: string;
  brandEn: string;
  email: string;
  phone: string;
  locationHe: string;
  locationEn: string;
  whatsappNumber: string;
  whatsappTemplate: string;
}

export interface SiteContent {
  projects: ProjectItem[];
  articles: ArticleItem[];
  faqs: FAQItem[];
  leads: LeadItem[];
  homeSections: HomeSectionId[];
  siteInfo: SiteInfo;
}

const STORAGE_KEY = 'site-content-v1';

const defaultContent: SiteContent = {
  projects: [
    {
      id: 'ecommerce-redesign',
      image:
        'https://images.unsplash.com/photo-1612831661941-254341b885e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBlY29tbWVyY2UlMjB3ZWJzaXRlJTIwbGFwdG9wfGVufDF8fHx8MTc3MTA5NDQxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      titleHe: 'עיצוב מחדש של חנות מסחר',
      titleEn: 'Ecommerce Store Redesign',
      categoryHe: 'עיצוב אתרים',
      categoryEn: 'Website Design',
      resultHe: 'עלייה של 142% בהמרות',
      resultEn: '142% Increase in Conversions',
      descriptionHe: 'שדרוג מלא לחנות מסחר מקוונת עם התמקדות בחווית משתמש ואופטימיזציית המרות',
      descriptionEn: 'Complete overhaul of an online store with focus on user experience and conversion optimization',
    },
    {
      id: 'saas-landing',
      image:
        'https://images.unsplash.com/photo-1588511986632-592db3d6c81f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdlYnNpdGUlMjBkZXNpZ24lMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzcxMDk0NDEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      titleHe: 'דף נחיתה SaaS',
      titleEn: 'SaaS Landing Page',
      categoryHe: 'דף נחיתה',
      categoryEn: 'Landing Page',
      resultHe: 'פי 3.2 יותר לידים איכותיים',
      resultEn: '3.2x More Qualified Leads',
      descriptionHe: 'דף נחיתה בעל המרה גבוהה לפלטפורמת SaaS B2B',
      descriptionEn: 'High-converting landing page for B2B SaaS platform',
    },
    {
      id: 'meta-ads-campaign',
      image:
        'https://images.unsplash.com/photo-1759215524600-7971d6a4dac0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYW5hbHl0aWNzJTIwc2NyZWVufGVufDF8fHx8MTc3MTA5NDQxNHww&ixlib=rb-4.1.0&q=80&w=1080',
      titleHe: 'קמפיין Meta Ads',
      titleEn: 'Meta Ads Campaign',
      categoryHe: 'פרסום ממומן',
      categoryEn: 'Paid Advertising',
      resultHe: 'ROAS של 4.80$ ב-60 יום',
      resultEn: '$4.80 ROAS in 60 Days',
      descriptionHe: 'קמפיין פרסום ממומן אסטרטגי ב-Meta עם התמקדות ב-ROI',
      descriptionEn: 'Strategic Meta advertising campaign with focus on ROI',
    },
    {
      id: 'b2b-lead-generation',
      image:
        'https://images.unsplash.com/photo-1510924014959-7e1849088bfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBsYW5kaW5nJTIwcGFnZSUyMG1vY2t1cHxlbnwxfHx8fDE3NzEwOTQ0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      titleHe: 'יצירת לידים B2B',
      titleEn: 'B2B Lead Generation',
      categoryHe: 'אתר + מודעות',
      categoryEn: 'Website + Ads',
      resultHe: '89 לידים איכותיים ב-30 יום',
      resultEn: '89 Qualified Leads in 30 Days',
      descriptionHe: 'מערכת משולבת של אתר ופרסום ליצירת לידים B2B איכותיים',
      descriptionEn: 'Integrated website and advertising system for quality B2B lead generation',
    },
  ],
  articles: [
    {
      slug: 'critical-website-elements',
      titleHe: '5 אלמנטים קריטיים באתר ממיר',
      titleEn: '5 Critical Elements of a Converting Website',
      excerptHe: 'למד מה הופך אתר לכלי צמיחה עסקי אמיתי ולא סתם נוכחות דיגיטלית.',
      excerptEn: 'Learn what turns a website into a real business growth tool, not just digital presence.',
      categoryHe: 'עיצוב אתרים',
      categoryEn: 'Website Design',
      dateHe: '15 פברואר 2026',
      dateEn: 'February 15, 2026',
      readTimeHe: '5 דק׳',
      readTimeEn: '5 min',
      contentHe: 'אתר ממיר צריך מבנה ברור, מסר חד והנעה לפעולה שנראית מיד. מהירות טעינה, אמון ותהליך יצירת קשר פשוט הם גורמי מפתח.',
      contentEn: 'A converting website needs clear structure, sharp messaging, and visible calls to action. Load speed, trust signals, and a simple contact path are key drivers.',
    },
    {
      slug: 'reduce-meta-ads-cost',
      titleHe: 'איך להפחית עלות רכישה ב-Meta Ads',
      titleEn: 'How to Reduce Acquisition Cost in Meta Ads',
      excerptHe: 'אסטרטגיות מוכחות לשיפור ROI בקמפיינים ממומנים ב-Meta.',
      excerptEn: 'Proven strategies for improving ROI in Meta paid campaigns.',
      categoryHe: 'פרסום ממומן',
      categoryEn: 'Paid Advertising',
      dateHe: '10 פברואר 2026',
      dateEn: 'February 10, 2026',
      readTimeHe: '7 דק׳',
      readTimeEn: '7 min',
      contentHe: 'הפחתת עלות רכישה מתחילה במדידה מדויקת וקהלים איכותיים. בדיקות קריאייטיב ושיפור דפי נחיתה מורידים עלויות לאורך זמן.',
      contentEn: 'Lower acquisition costs start with accurate tracking and high-quality audiences. Creative testing and landing page optimization reduce costs over time.',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      questionHe: 'מה כלול בעיצוב אתר?',
      questionEn: 'What is included in website design?',
      answerHe: 'עיצוב אתר כולל מחקר וניתוח, אסטרטגיה דיגיטלית, UI/UX, פיתוח רספונסיבי, SEO, מערכת ניהול ותמיכה.',
      answerEn: 'Website design includes research, strategy, UI/UX, responsive development, SEO, CMS setup, and support.',
    },
    {
      id: 'faq-2',
      questionHe: 'כמה זמן לוקח לבנות אתר?',
      questionEn: 'How long does it take to build a website?',
      answerHe: 'לרוב 4-10 שבועות, בהתאם למורכבות הפרויקט.',
      answerEn: 'Usually 4-10 weeks, depending on project complexity.',
    },
    {
      id: 'faq-3',
      questionHe: 'האם אתם מספקים תמיכה שוטפת?',
      questionEn: 'Do you provide ongoing support?',
      answerHe: 'כן. כל פרויקט כולל תמיכה לאחר השקה, ואפשר להוסיף חבילות חודשיות.',
      answerEn: 'Yes. Every project includes post-launch support, with optional monthly plans.',
    },
  ],
  leads: [],
  homeSections: ['hero', 'services', 'portfolio', 'process', 'pricing', 'about', 'finalCta'],
  siteInfo: {
    brandHe: 'דרוין עיצובים',
    brandEn: 'Druyan Design',
    email: 'hello@yoursite.com',
    phone: '+972-50-123-4567',
    locationHe: 'תל אביב, ישראל',
    locationEn: 'Tel Aviv, Israel',
    whatsappNumber: '972501234567',
    whatsappTemplate:
      'היי {{name}}, תודה שפנית. ראיתי את הפרטים שלך לגבי {{projectType}}. אשמח לתאם שיחה קצרה.',
  },
};

interface SiteContentContextType {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt'>) => void;
  resetContent: () => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

function parseStoredContent(value: string | null): SiteContent | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as SiteContent;
    if (!parsed || !Array.isArray(parsed.projects) || !Array.isArray(parsed.articles) || !Array.isArray(parsed.faqs)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = parseStoredContent(localStorage.getItem(STORAGE_KEY));
    if (stored) {
      setContent(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content, hydrated]);

  const addLead = (lead: Omit<LeadItem, 'id' | 'createdAt'>) => {
    setContent((prev) => ({
      ...prev,
      leads: [
        {
          ...lead,
          id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
          createdAt: new Date().toISOString(),
        },
        ...prev.leads,
      ],
    }));
  };

  const resetContent = () => {
    setContent(defaultContent);
  };

  const value = useMemo(
    () => ({
      content,
      setContent,
      addLead,
      resetContent,
    }),
    [content],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within SiteContentProvider');
  }
  return context;
}

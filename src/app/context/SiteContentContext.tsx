import { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { isSupabaseConfigured, supabase, supabaseConfig } from '../../lib/supabase';
import { defaultProjectsFromCsv } from '../data/projects';

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
  liveUrl?: string;
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
  phone: string;
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
const PROJECTS_IMPORT_STORAGE_KEY = 'projects-import-version';
const PROJECTS_IMPORT_VERSION = 'projects-csv-2026-02-19';
const REMOTE_TABLE = 'site_content';
const REMOTE_ROW_ID = 'main';
const REMOTE_SAVE_DEBOUNCE_MS = 800;
const LEADS_TABLE = 'leads';
const IS_DEV = import.meta.env.DEV;

const defaultContent: SiteContent = {
  projects: defaultProjectsFromCsv,
  articles: [
    {
      slug: 'critical-website-elements',
      titleHe: '5 אלמנטים קריטיים באתר ממיר',
      titleEn: '5 Critical Elements of a Converting Website',
      excerptHe: 'מה מבדיל אתר יפה מאתר שמייצר פניות ומכירות בפועל.',
      excerptEn: 'Learn what turns a website into a real business growth tool, not just digital presence.',
      categoryHe: 'עיצוב אתרים',
      categoryEn: 'Website Design',
      dateHe: '15 פברואר 2026',
      dateEn: 'February 15, 2026',
      readTimeHe: '5 דק׳',
      readTimeEn: '5 min',
      contentHe: 'אתר שממיר צריך מסר ברור, היררכיה נכונה וקריאה לפעולה שקשה לפספס. מהירות, אמינות ותהליך יצירת קשר קצר עושים את ההבדל.',
      contentEn: 'A converting website needs clear structure, sharp messaging, and visible calls to action. Load speed, trust signals, and a simple contact path are key drivers.',
    },
    {
      slug: 'reduce-meta-ads-cost',
      titleHe: 'איך להפחית עלות רכישה ב-Meta Ads',
      titleEn: 'How to Reduce Acquisition Cost in Meta Ads',
      excerptHe: 'צעדים פרקטיים להורדת עלות רכישה ולשיפור התשואה מקמפיינים ב-Meta.',
      excerptEn: 'Proven strategies for improving ROI in Meta paid campaigns.',
      categoryHe: 'פרסום ממומן',
      categoryEn: 'Paid Advertising',
      dateHe: '10 פברואר 2026',
      dateEn: 'February 10, 2026',
      readTimeHe: '7 דק׳',
      readTimeEn: '7 min',
      contentHe: 'כדי להוריד עלות רכישה צריך מדידה נקייה, פילוח קהלים מדוייק ובדיקות קריאייטיב רציפות. כשמחברים לזה דף נחיתה טוב, הביצועים משתפרים משמעותית.',
      contentEn: 'Lower acquisition costs start with accurate tracking and high-quality audiences. Creative testing and landing page optimization reduce costs over time.',
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      questionHe: 'מה כלול בעיצוב אתר?',
      questionEn: 'What is included in website design?',
      answerHe: 'התהליך כולל אפיון, עיצוב UX/UI, פיתוח רספונסיבי, התאמות SEO, חיבור אנליטיקה וליווי בעלייה לאוויר.',
      answerEn: 'Website design includes research, strategy, UI/UX, responsive development, SEO, CMS setup, and support.',
    },
    {
      id: 'faq-2',
      questionHe: 'כמה זמן לוקח לבנות אתר?',
      questionEn: 'How long does it take to build a website?',
      answerHe: 'ברוב המקרים בין 4 ל-10 שבועות, תלוי בהיקף ובמורכבות הפרויקט.',
      answerEn: 'Usually 4-10 weeks, depending on project complexity.',
    },
    {
      id: 'faq-3',
      questionHe: 'האם אתם מספקים תמיכה שוטפת?',
      questionEn: 'Do you provide ongoing support?',
      answerHe: 'כן. כל פרויקט כולל תמיכה אחרי השקה, וניתן להוסיף ליווי חודשי שוטף לפי צורך.',
      answerEn: 'Yes. Every project includes post-launch support, with optional monthly plans.',
    },
  ],
  leads: [],
  homeSections: ['hero', 'services', 'portfolio', 'process', 'pricing', 'about', 'finalCta'],
  siteInfo: {
    brandHe: 'דרוין עיצובים',
    brandEn: 'Druyan Design',
    email: 'contact@drd.co.il',
    phone: '+972 53 553 2893',
    locationHe: 'תל אביב, ישראל',
    locationEn: 'Tel Aviv, Israel',
    whatsappNumber: '972535532893',
    whatsappTemplate:
      'היי {{name}}, תודה שפנית. ראיתי את הפרטים שלך לגבי {{projectType}}. אשמח לתאם שיחה קצרה.',
  },
};

interface SiteContentContextType {
  content: SiteContent;
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>;
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt'>) => Promise<boolean>;
  refreshLeads: () => Promise<void>;
  resetContent: () => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

function isValidSiteContentObject(parsed: unknown): parsed is SiteContent {
  if (!parsed || typeof parsed !== 'object') return false;
  const candidate = parsed as SiteContent;
  if (!Array.isArray(candidate.projects) || !Array.isArray(candidate.articles) || !Array.isArray(candidate.faqs)) {
    return false;
  }
  if (!Array.isArray(candidate.homeSections) || !candidate.siteInfo || typeof candidate.siteInfo !== 'object') {
    return false;
  }
  return true;
}

function parseStoredContent(value: string | null): SiteContent | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as unknown;
    return isValidSiteContentObject(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

const LEGACY_DEFAULT_PROJECT_IDS = new Set(['ecommerce-redesign', 'saas-landing', 'meta-ads-campaign', 'b2b-lead-generation']);
const CSV_PROJECT_IDS = new Set([
  'dr-amit-website',
  'clothing-brand-store',
  'revital-studio-website',
  'netta-zentner-portfolio',
  'yochi-engleister-portfolio',
]);

function shouldReplaceLegacyProjects(projects: ProjectItem[]) {
  if (!Array.isArray(projects) || projects.length !== LEGACY_DEFAULT_PROJECT_IDS.size) return false;
  return projects.every((project) => LEGACY_DEFAULT_PROJECT_IDS.has(project.id));
}

function hasCsvProjects(projects: ProjectItem[]) {
  if (!Array.isArray(projects) || projects.length !== CSV_PROJECT_IDS.size) return false;
  return projects.every((project) => CSV_PROJECT_IDS.has(project.id));
}

function migrateProjectsIfNeeded(content: SiteContent): SiteContent {
  if (!shouldReplaceLegacyProjects(content.projects)) return content;
  return {
    ...content,
    projects: defaultProjectsFromCsv,
  };
}

function forceCsvProjectsImport(content: SiteContent): SiteContent {
  return {
    ...content,
    projects: defaultProjectsFromCsv,
  };
}

function mergeRemotePayload(base: SiteContent, payload: unknown): SiteContent | null {
  if (!payload || typeof payload !== 'object') return null;
  const candidate = payload as Partial<SiteContent>;
  const candidateProjects = Array.isArray(candidate.projects) ? (candidate.projects as ProjectItem[]) : base.projects;
  const resolvedProjects = hasCsvProjects(candidateProjects)
    ? candidateProjects
    : shouldReplaceLegacyProjects(candidateProjects)
      ? defaultProjectsFromCsv
      : defaultProjectsFromCsv;
  const merged: SiteContent = {
    ...base,
    projects: resolvedProjects,
    articles: Array.isArray(candidate.articles) ? (candidate.articles as ArticleItem[]) : base.articles,
    faqs: Array.isArray(candidate.faqs) ? (candidate.faqs as FAQItem[]) : base.faqs,
    leads: Array.isArray(candidate.leads) ? (candidate.leads as LeadItem[]) : base.leads,
    homeSections: Array.isArray(candidate.homeSections) ? (candidate.homeSections as HomeSectionId[]) : base.homeSections,
    siteInfo:
      candidate.siteInfo && typeof candidate.siteInfo === 'object'
        ? { ...base.siteInfo, ...(candidate.siteInfo as Partial<SiteInfo>) }
        : base.siteInfo,
  };
  return normalizeContent(merged);
}

function normalizeContent(content: SiteContent): SiteContent {
  const migrated = migrateProjectsIfNeeded(content);
  const normalizedEmail =
    !migrated.siteInfo?.email || migrated.siteInfo.email === 'hello@yoursite.com'
      ? 'contact@drd.co.il'
      : migrated.siteInfo.email;

  return {
    ...migrated,
    siteInfo: {
      ...migrated.siteInfo,
      email: normalizedEmail,
    },
    leads: (migrated.leads || []).map((lead) => ({
      ...lead,
      phone: lead.phone || '',
    })),
  };
}

function isAbortError(error: unknown) {
  if (error instanceof DOMException && error.name === 'AbortError') return true;
  if (error && typeof error === 'object') {
    const message = 'message' in error ? String((error as { message?: unknown }).message || '') : '';
    const details = 'details' in error ? String((error as { details?: unknown }).details || '') : '';
    const code = 'code' in error ? String((error as { code?: unknown }).code || '') : '';
    const haystack = `${message} ${details} ${code}`.toLowerCase();
    if (haystack.includes('abort')) return true;
    if (haystack.includes('signal is aborted')) return true;
  }
  return false;
}

function debugLog(message: string, error?: unknown) {
  if (!IS_DEV) return;
  if (error) {
    console.error(message, error);
    return;
  }
  console.error(message);
}

async function loadRemoteContent(): Promise<SiteContent | null> {
  if (!supabase) return null;
  const { data: mainData, error: mainError } = await supabase
    .from(REMOTE_TABLE)
    .select('payload')
    .eq('id', REMOTE_ROW_ID)
    .maybeSingle();

  if (mainError) {
    throw mainError;
  }

  const mainPayload = mainData?.payload as unknown;
  const mergedMain = mergeRemotePayload(defaultContent, mainPayload);
  if (mergedMain) {
    return mergedMain;
  }

  const { data: latestRows, error: latestError } = await supabase
    .from(REMOTE_TABLE)
    .select('payload')
    .order('updated_at', { ascending: false })
    .limit(1);

  if (latestError) throw latestError;
  if (!latestRows || latestRows.length === 0) return null;

  return mergeRemotePayload(defaultContent, latestRows[0].payload as unknown);
}

async function canWriteRemoteContent() {
  if (!supabase) return false;
  const { data } = await supabase.auth.getSession();
  return Boolean(data.session?.user);
}

async function saveRemoteContent(content: SiteContent) {
  if (!supabase) return;
  const canWrite = await canWriteRemoteContent();
  if (!canWrite) return;
  const { error } = await supabase.from(REMOTE_TABLE).upsert(
    {
      id: REMOTE_ROW_ID,
      payload: { ...content, leads: [] },
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  );
  if (error) {
    throw error;
  }
}

async function loadRemoteLeads(): Promise<LeadItem[] | null> {
  if (!supabase) return null;
  const sessionData = await supabase.auth.getSession();
  const userId = sessionData.data.session?.user?.id;
  if (userId) {
    const { data: adminRow, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', userId)
      .maybeSingle();
    if (adminError) {
      throw adminError;
    }
    if (!adminRow) {
      throw new Error('ADMIN_ACCESS_REQUIRED');
    }
  }

  const selectVariants = [
    'id,full_name,phone,email,company,budget,project_type,details,created_at',
    'id,full_name,phone,email,company,website,message,status,source,created_at',
    'id,full_name,phone,email,company,created_at',
  ];

  let lastError: unknown = null;
  let data:
    | Array<{
        id: string;
        full_name?: string | null;
        phone?: string | null;
        email?: string | null;
        company?: string | null;
        budget?: string | null;
        project_type?: string | null;
        details?: string | null;
        website?: string | null;
        message?: string | null;
        created_at?: string | null;
      }>
    | null = null;

  for (const selectClause of selectVariants) {
    const result = await supabase.from(LEADS_TABLE).select(selectClause).order('created_at', { ascending: false });
    if (!result.error) {
      data = (result.data || []) as typeof data;
      lastError = null;
      break;
    }
    lastError = result.error;
  }

  if (lastError) throw lastError;

  return (data || []).map((row) => ({
    id: row.id,
    fullName: row.full_name || '',
    phone: row.phone || '',
    email: row.email || '',
    company: row.company || '',
    budget: row.budget || '',
    projectType: row.project_type || '',
    details: row.details || row.message || '',
    createdAt: row.created_at || new Date().toISOString(),
  }));
}

async function saveLeadRemote(lead: Omit<LeadItem, 'id' | 'createdAt'>) {
  if (!supabase) return null;
  const payloadV2 = {
    full_name: lead.fullName,
    phone: lead.phone,
    email: lead.email,
    company: lead.company,
    budget: lead.budget,
    project_type: lead.projectType,
    details: lead.details,
  };
  const payloadLegacy = {
    full_name: lead.fullName,
    phone: lead.phone,
    email: lead.email,
    company: lead.company,
    website: '',
    message: lead.details,
    status: 'new',
    source: 'website',
  };
  const payloadMinimal = {
    full_name: lead.fullName,
    phone: lead.phone,
    email: lead.email,
    company: lead.company,
  };

  const variants = [payloadV2, payloadLegacy, payloadMinimal];
  let lastError: unknown = null;
  for (const payload of variants) {
    const { error } = await supabase.from(LEADS_TABLE).insert(payload);
    if (!error) {
      return { ok: true };
    }
    lastError = error;
  }

  // Final fallback: direct REST insert without SDK abort signal handling.
  for (const payload of variants) {
    const response = await fetch(`${supabaseConfig.url}/rest/v1/${LEADS_TABLE}`, {
      method: 'POST',
      headers: {
        apikey: supabaseConfig.anonKey,
        Authorization: `Bearer ${supabaseConfig.anonKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    if (response.ok) {
      return { ok: true };
    }
    lastError = new Error(`Supabase REST insert failed (${response.status})`);
  }

  throw lastError;
}

function mapLeadRow(row: {
  id?: string | null;
  full_name?: string | null;
  phone?: string | null;
  email?: string | null;
  company?: string | null;
  budget?: string | null;
  project_type?: string | null;
  details?: string | null;
  message?: string | null;
  created_at?: string | null;
}): LeadItem {
  return {
    id: row.id || (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now())),
    fullName: row.full_name || '',
    phone: row.phone || '',
    email: row.email || '',
    company: row.company || '',
    budget: row.budget || '',
    projectType: row.project_type || '',
    details: row.details || row.message || '',
    createdAt: row.created_at || new Date().toISOString(),
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [hydrated, setHydrated] = useState(false);
  const remoteSaveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      const stored = parseStoredContent(localStorage.getItem(STORAGE_KEY));
      let next = stored ? normalizeContent(stored) : defaultContent;
      let shouldSaveImportedProjects = false;

      if (isSupabaseConfigured) {
        try {
          const remote = await loadRemoteContent();
          if (remote) {
            next = normalizeContent(remote);
          } else {
            await saveRemoteContent(next);
          }
          try {
            const remoteLeads = await loadRemoteLeads();
            if (remoteLeads) {
              next = { ...next, leads: remoteLeads };
            }
          } catch {
            // leads may be protected for non-admin sessions
          }
        } catch (error) {
          if (!isAbortError(error)) {
            debugLog('Supabase load failed, fallback to local cache.', error);
          }
        }
      }

      const importedVersion = localStorage.getItem(PROJECTS_IMPORT_STORAGE_KEY);
      if (importedVersion !== PROJECTS_IMPORT_VERSION) {
        next = forceCsvProjectsImport(next);
        localStorage.setItem(PROJECTS_IMPORT_STORAGE_KEY, PROJECTS_IMPORT_VERSION);
        shouldSaveImportedProjects = true;
      }

      if (isSupabaseConfigured && shouldSaveImportedProjects) {
        try {
          await saveRemoteContent(next);
        } catch {
          // save may be blocked for public sessions; keep local imported projects
        }
      }

      if (cancelled) return;
      setContent(next);
      setHydrated(true);
    };

    hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));

    if (!isSupabaseConfigured) return;
    if (remoteSaveTimerRef.current) {
      window.clearTimeout(remoteSaveTimerRef.current);
    }

    remoteSaveTimerRef.current = window.setTimeout(() => {
      saveRemoteContent(normalizeContent(content)).catch((error) => {
        if (!isAbortError(error)) {
          debugLog('Supabase save failed, changes remain local.', error);
        }
      });
    }, REMOTE_SAVE_DEBOUNCE_MS);

    return () => {
      if (remoteSaveTimerRef.current) {
        window.clearTimeout(remoteSaveTimerRef.current);
      }
    };
  }, [content, hydrated]);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) return;
      try {
        const remoteLeads = await loadRemoteLeads();
        if (remoteLeads) {
          setContent((prev) => ({ ...prev, leads: remoteLeads }));
        }
      } catch {
        // ignore
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;
    let channel: ReturnType<typeof supabase.channel> | null = null;
    channel = supabase
      .channel('site-content-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: REMOTE_TABLE },
        (payload) => {
          const row =
            (payload.new as { id?: string; payload?: unknown } | null) ||
            (payload.old as { id?: string; payload?: unknown } | null);
          if (!row) return;
          if (row.id && row.id !== REMOTE_ROW_ID) return;
          const next = mergeRemotePayload(defaultContent, row.payload);
          if (!next) return;
          setContent((prev) => ({
            ...prev,
            ...next,
            leads: prev.leads,
          }));
        },
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;
    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const connectRealtime = async () => {
      const sessionData = await supabase.auth.getSession();
      if (!sessionData.data.session?.user || cancelled) return;
      channel = supabase
        .channel('leads-realtime-feed')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: LEADS_TABLE },
          (payload) => {
            const lead = mapLeadRow((payload.new || {}) as Record<string, string>);
            setContent((prev) => {
              if (prev.leads.some((item) => item.id === lead.id)) {
                return prev;
              }
              return { ...prev, leads: [lead, ...prev.leads] };
            });
          },
        )
        .subscribe();
    };

    connectRealtime().catch(() => {
      // realtime may be disabled; keep app functional with manual/poll refresh
    });

    return () => {
      cancelled = true;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const refreshLeads = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    const remoteLeads = await loadRemoteLeads();
    if (remoteLeads) {
      setContent((prev) => ({ ...prev, leads: remoteLeads }));
    }
  };

  const addLead = async (lead: Omit<LeadItem, 'id' | 'createdAt'>) => {
    const fallbackLead: LeadItem = {
      ...lead,
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
    };

    setContent((prev) => ({
      ...prev,
      leads: [fallbackLead, ...prev.leads],
    }));

    if (isSupabaseConfigured) {
      try {
        await saveLeadRemote(lead);
        return true;
      } catch (error) {
        if (!isAbortError(error)) {
          debugLog('Supabase lead insert failed, lead kept locally.', error);
        }
        return false;
      }
    }
    return true;
  };

  const resetContent = () => {
    setContent(defaultContent);
  };

  const value = useMemo(
    () => ({
      content,
      setContent,
      addLead,
      refreshLeads,
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

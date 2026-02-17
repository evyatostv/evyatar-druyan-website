import { useEffect, useMemo, useState } from 'react';
import { useSiteContent, HomeSectionId, LeadItem, ProjectItem, ArticleItem, FAQItem } from '../context/SiteContentContext';
import { useLanguage } from '../context/LanguageContext';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import { getStoredAdminPushToken, isNativeAdminApp, registerAdminPushToken, requireAdminBiometric } from '../../lib/nativeAdmin';

const AUTH_STORAGE_KEY = 'admin-auth-v1';
const SESSION_STORAGE_KEY = 'admin-session-v1';
const PBKDF2_ITERATIONS = 210000;
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;
const IS_DEV = import.meta.env.DEV;

interface AdminAuthRecord {
  salt: string;
  hash: string;
  iterations: number;
}

interface AdminSessionRecord {
  expiresAt: number;
}

function bytesToBase64(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function hashPassword(password: string, saltBase64: string, iterations: number) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: base64ToBytes(saltBase64),
      iterations,
    },
    keyMaterial,
    256,
  );
  return bytesToBase64(new Uint8Array(bits));
}

function moveItem<T>(arr: T[], from: number, to: number) {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

function normalizeWhatsappNumber(number: string) {
  const clean = number.replace(/\D/g, '');
  if (!clean) return '';
  if (clean.startsWith('972')) return clean;
  if (clean.startsWith('0')) return `972${clean.slice(1)}`;
  if (clean.length === 9 && clean.startsWith('5')) return `972${clean}`;
  return clean;
}

function whatsappUrl(number: string, text: string) {
  const clean = normalizeWhatsappNumber(number);
  if (!clean) return '';
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleString(locale === 'he' ? 'he-IL' : 'en-US');
}

function safeCompare(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function toProjectTypeHebrew(value: string) {
  const normalized = (value || '').trim().toLowerCase();
  if (normalized === 'website' || normalized.includes('website')) return 'עיצוב אתר';
  if (normalized === 'ads' || normalized.includes('advert')) return 'פרסום ממומן';
  if (normalized === 'full' || normalized.includes('package')) return 'חבילה מלאה';
  if (normalized === 'עיצוב אתר' || normalized === 'פרסום ממומן' || normalized === 'חבילה מלאה') return value;
  return value || '-';
}

function toLeadErrorMessage(error: unknown, isRTL: boolean) {
  if (!IS_DEV) return isRTL ? 'לא ניתן לטעון לידים כרגע' : 'Unable to load leads right now';
  const raw =
    error instanceof Error
      ? error.message
      : error && typeof error === 'object' && 'message' in error
        ? String((error as { message?: unknown }).message || '')
        : '';
  if (raw.includes('ADMIN_ACCESS_REQUIRED')) {
    return isRTL
      ? 'למשתמש הזה אין הרשאת אדמין לטעינת לידים.'
      : 'This user is not allowed to load leads.';
  }
  return isRTL ? 'לא ניתן לטעון לידים כרגע' : 'Unable to load leads right now';
}

export function Admin() {
  const { content, setContent, refreshLeads, resetContent } = useSiteContent();
  const { language, setLanguage } = useLanguage();
  const isRTL = language === 'he';

  const [authReady, setAuthReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [setupPassword, setSetupPassword] = useState('');
  const [setupPassword2, setSetupPassword2] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [settingsMessage, setSettingsMessage] = useState('');
  const [leadsError, setLeadsError] = useState('');
  const [biometricUnlocked, setBiometricUnlocked] = useState(!isNativeAdminApp());
  const [biometricMessage, setBiometricMessage] = useState('');
  const [pushToken, setPushToken] = useState(getStoredAdminPushToken());
  const [pushBusy, setPushBusy] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'content' | 'settings'>('dashboard');

  const [newProject, setNewProject] = useState<ProjectItem>({
    id: '',
    image: '',
    titleHe: '',
    titleEn: '',
    categoryHe: '',
    categoryEn: '',
    resultHe: '',
    resultEn: '',
    descriptionHe: '',
    descriptionEn: '',
  });
  const [newArticle, setNewArticle] = useState<ArticleItem>({
    slug: '',
    titleHe: '',
    titleEn: '',
    excerptHe: '',
    excerptEn: '',
    categoryHe: '',
    categoryEn: '',
    dateHe: '',
    dateEn: '',
    readTimeHe: '',
    readTimeEn: '',
    contentHe: '',
    contentEn: '',
  });
  const [newFaq, setNewFaq] = useState<FAQItem>({
    id: '',
    questionHe: '',
    questionEn: '',
    answerHe: '',
    answerEn: '',
  });

  const authRecord = useMemo(() => {
    const value = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!value) return null;
    try {
      const parsed = JSON.parse(value) as AdminAuthRecord;
      if (!parsed.salt || !parsed.hash || !parsed.iterations) return null;
      return parsed;
    } catch {
      return null;
    }
  }, [authReady]);

  useEffect(() => {
    let mounted = true;
    if (isSupabaseConfigured && supabase) {
      const readyFallback = window.setTimeout(() => {
        if (!mounted) return;
        setAuthReady(true);
      }, 2500);

      supabase.auth
        .getSession()
        .then(({ data }) => {
          if (!mounted) return;
          setIsAuthenticated(Boolean(data.session?.user));
          setAuthReady(true);
          window.clearTimeout(readyFallback);
        })
        .catch((error) => {
          // Never keep /admin blank if session bootstrap fails.
          if (IS_DEV) {
            console.warn('Supabase session bootstrap failed. Falling back to logged-out state.', error);
          }
          if (!mounted) return;
          setIsAuthenticated(false);
          setAuthReady(true);
          window.clearTimeout(readyFallback);
        });
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(Boolean(session?.user));
        setAuthReady(true);
      });
      return () => {
        mounted = false;
        window.clearTimeout(readyFallback);
        subscription.unsubscribe();
      };
    }

    setAuthReady(true);
    const rawSession = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!rawSession) return;
    try {
      const parsed = JSON.parse(rawSession) as AdminSessionRecord;
      if (parsed.expiresAt > Date.now()) {
        setIsAuthenticated(true);
        return;
      }
    } catch {
      // invalid session data
    }
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  const setSession = () => {
    const session: AdminSessionRecord = { expiresAt: Date.now() + SESSION_MAX_AGE_MS };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  };

  const onAuthKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!isAuthenticated) {
        if (!isSupabaseConfigured && !authRecord) {
          createPassword();
        } else {
          login();
        }
      }
    }
  };

  const ensureStrongPassword = (password: string) => {
    if (password.length < 10) {
      setAuthError(isRTL ? 'הסיסמה חייבת להיות לפחות 10 תווים' : 'Password must be at least 10 characters');
      return false;
    }
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
      setAuthError(isRTL ? 'הסיסמה חייבת לכלול אות גדולה, אות קטנה ומספר' : 'Password must include uppercase, lowercase, and number');
      return false;
    }
    return true;
  };

  const createAuthRecord = async (password: string) => {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    const saltBase64 = bytesToBase64(salt);
    const hash = await hashPassword(password, saltBase64, PBKDF2_ITERATIONS);
    const record: AdminAuthRecord = {
      salt: saltBase64,
      hash,
      iterations: PBKDF2_ITERATIONS,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(record));
    return record;
  };

  const verifyPassword = async (password: string, record: AdminAuthRecord) => {
    const hash = await hashPassword(password, record.salt, record.iterations);
    return safeCompare(hash, record.hash);
  };

  const createPassword = async () => {
    setAuthError('');
    if (!ensureStrongPassword(setupPassword)) {
      return;
    }
    if (setupPassword !== setupPassword2) {
      setAuthError(isRTL ? 'הסיסמאות לא תואמות' : 'Passwords do not match');
      return;
    }

    await createAuthRecord(setupPassword);
    setSession();
    setIsAuthenticated(true);
    setAuthReady((prev) => !prev);
  };

  const login = async () => {
    setAuthError('');
    if (isSupabaseConfigured && supabase) {
      if (!loginEmail.trim()) {
        setAuthError(isRTL ? 'הכנס אימייל אדמין' : 'Enter admin email');
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      if (error) {
        setAuthError(isRTL ? 'התחברות נכשלה. בדוק אימייל/סיסמה' : 'Login failed. Check email/password');
        return;
      }
      setIsAuthenticated(true);
      return;
    }
    if (!authRecord) return;
    const isValid = await verifyPassword(loginPassword, authRecord);
    if (!isValid) {
      setAuthError(isRTL ? 'סיסמה שגויה' : 'Wrong password');
      return;
    }
    setSession();
    setIsAuthenticated(true);
  };

  const changePassword = async () => {
    setSettingsMessage('');
    setAuthError('');
    if (isSupabaseConfigured && supabase) {
      if (!ensureStrongPassword(newPassword)) {
        setSettingsMessage(isRTL ? 'סיסמה חדשה חלשה מדי' : 'New password is too weak');
        return;
      }
      if (newPassword !== newPassword2) {
        setSettingsMessage(isRTL ? 'אימות הסיסמה החדשה לא תואם' : 'New password confirmation does not match');
        return;
      }
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setSettingsMessage(isRTL ? 'עדכון סיסמה נכשל' : 'Password update failed');
        return;
      }
      setNewPassword('');
      setNewPassword2('');
      setSettingsMessage(isRTL ? 'הסיסמה עודכנה בהצלחה' : 'Password updated successfully');
      return;
    }
    if (!authRecord) return;
    const isCurrentValid = await verifyPassword(currentPassword, authRecord);
    if (!isCurrentValid) {
      setSettingsMessage(isRTL ? 'הסיסמה הנוכחית שגויה' : 'Current password is wrong');
      return;
    }
    if (!ensureStrongPassword(newPassword)) {
      setSettingsMessage(isRTL ? 'סיסמה חדשה חלשה מדי' : 'New password is too weak');
      return;
    }
    if (newPassword !== newPassword2) {
      setSettingsMessage(isRTL ? 'אימות הסיסמה החדשה לא תואם' : 'New password confirmation does not match');
      return;
    }
    await createAuthRecord(newPassword);
    setCurrentPassword('');
    setNewPassword('');
    setNewPassword2('');
    setSettingsMessage(isRTL ? 'הסיסמה עודכנה בהצלחה' : 'Password updated successfully');
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSettingsMessage(isRTL ? 'הועתק ללוח' : 'Copied to clipboard');
    } catch {
      setSettingsMessage(isRTL ? 'לא ניתן להעתיק כרגע' : 'Could not copy right now');
    }
  };

  const openLeadWhatsapp = (lead: LeadItem) => {
    const preferredNumber = lead.phone?.trim() || content.siteInfo.whatsappNumber;
    const link = whatsappUrl(preferredNumber, updateLeadMessage(lead));
    if (!link) {
      setSettingsMessage(isRTL ? 'אין מספר טלפון תקין לליד הזה' : 'No valid phone number for this lead');
      return;
    }
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const latestLead = content.leads[0];

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setIsAuthenticated(false);
    setBiometricUnlocked(!isNativeAdminApp());
    setBiometricMessage('');
    setLoginEmail('');
    setLoginPassword('');
  };

  const updateLeadMessage = (lead: LeadItem) => {
    return content.siteInfo.whatsappTemplate
      .replaceAll('{{name}}', lead.fullName || '-')
      .replaceAll('{{phone}}', lead.phone || '-')
      .replaceAll('{{company}}', lead.company || '-')
      .replaceAll('{{projectType}}', toProjectTypeHebrew(lead.projectType))
      .replaceAll('{{budget}}', lead.budget || '-');
  };

  const sectionLabels: Record<HomeSectionId, string> = {
    hero: 'Hero',
    services: 'Services',
    portfolio: 'Portfolio',
    process: 'Process',
    pricing: 'Pricing',
    about: 'About',
    finalCta: 'Final CTA',
  };

  useEffect(() => {
    if (!isAuthenticated || !isSupabaseConfigured) return;
    refreshLeads().catch((error) => {
      setLeadsError(toLeadErrorMessage(error, isRTL));
      if (IS_DEV) console.error(error);
    });
  }, [isAuthenticated, isSupabaseConfigured, refreshLeads, isRTL]);

  useEffect(() => {
    if (!isAuthenticated) {
      setBiometricUnlocked(!isNativeAdminApp());
      setBiometricMessage('');
      return;
    }
    if (!isNativeAdminApp()) {
      setBiometricUnlocked(true);
      return;
    }

    setBiometricUnlocked(false);
    setBiometricMessage('');
    requireAdminBiometric(isRTL)
      .then(() => {
        setBiometricUnlocked(true);
      })
      .catch((error) => {
        setBiometricMessage(
          error instanceof Error
            ? error.message
            : isRTL
              ? 'האימות הביומטרי נכשל.'
              : 'Biometric authentication failed.',
        );
      });
  }, [isAuthenticated, isRTL]);

  useEffect(() => {
    if (!isAuthenticated || !biometricUnlocked || !isNativeAdminApp()) return;
    setPushBusy(true);
    registerAdminPushToken(isRTL)
      .then((token) => {
        if (token) setPushToken(token);
      })
      .catch(() => {
        setPushToken(getStoredAdminPushToken());
      })
      .finally(() => {
        setPushBusy(false);
      });
  }, [isAuthenticated, biometricUnlocked, isRTL]);

  const onAdminHotkeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.altKey) return;
    const tabMap: Record<string, typeof activeTab> = {
      '1': 'dashboard',
      '2': 'leads',
      '3': 'content',
      '4': 'settings',
    };
    const nextTab = tabMap[event.key];
    if (nextTab) {
      event.preventDefault();
      setActiveTab(nextTab);
    }
  };

  if (!authReady) return null;

  if (!isSupabaseConfigured && !authRecord && !isAuthenticated) {
    return (
      <div className="admin-shell min-h-screen bg-gray-100 flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{isRTL ? 'הגדרת אדמין ראשונה' : 'First Admin Setup'}</h1>
          <p className="text-gray-600 mb-6">
            {isRTL ? 'בחר סיסמה. היא תישמר כ-Hash מוצפן (PBKDF2 + Salt) בדפדפן.' : 'Choose a password. It is stored as a hashed value (PBKDF2 + Salt) in the browser.'}
          </p>
          <div className="space-y-3">
            <input
              type="password"
              placeholder={isRTL ? 'סיסמה חדשה' : 'New password'}
              value={setupPassword}
              onChange={(e) => setSetupPassword(e.target.value)}
              onKeyDown={onAuthKeyDown}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
            <input
              type="password"
              placeholder={isRTL ? 'אימות סיסמה' : 'Confirm password'}
              value={setupPassword2}
              onChange={(e) => setSetupPassword2(e.target.value)}
              onKeyDown={onAuthKeyDown}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
            {authError && <p className="text-red-600 text-sm">{authError}</p>}
            <button onClick={createPassword} className="w-full bg-blue-600 text-white rounded-xl px-4 py-3 font-semibold hover:bg-blue-700 transition-colors">
              {isRTL ? 'צור אדמין' : 'Create Admin'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-shell min-h-screen bg-gray-100 flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{isRTL ? 'כניסת אדמין' : 'Admin Login'}</h1>
          <p className="text-gray-600 mb-6">
            {isSupabaseConfigured
              ? (isRTL ? 'התחבר עם משתמש האדמין שלך' : 'Sign in with your admin account')
              : (isRTL ? 'הכנס סיסמה כדי לנהל את האתר' : 'Enter password to manage the website')}
          </p>
          <div className="space-y-3">
            {isSupabaseConfigured && (
              <input
                type="email"
                placeholder={isRTL ? 'אימייל אדמין' : 'Admin email'}
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onKeyDown={onAuthKeyDown}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
              />
            )}
            <input
              type="password"
              placeholder={isRTL ? 'סיסמה' : 'Password'}
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={onAuthKeyDown}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />
            {authError && <p className="text-red-600 text-sm">{authError}</p>}
            <button onClick={login} className="w-full bg-blue-600 text-white rounded-xl px-4 py-3 font-semibold hover:bg-blue-700 transition-colors">
              {isRTL ? 'התחבר' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isNativeAdminApp() && !biometricUnlocked) {
    return (
      <div className="admin-shell min-h-screen bg-gray-100 flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-lg space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">{isRTL ? 'נעילה ביומטרית' : 'Biometric Lock'}</h1>
          <p className="text-gray-600">
            {isRTL ? 'לפני כניסה לדשבורד נדרש אימות Face ID / Touch ID.' : 'Face ID / Touch ID is required before opening the dashboard.'}
          </p>
          {biometricMessage && <p className="text-sm text-red-600">{biometricMessage}</p>}
          <button
            onClick={() =>
              requireAdminBiometric(isRTL)
                .then(() => {
                  setBiometricMessage('');
                  setBiometricUnlocked(true);
                })
                .catch((error) => {
                  setBiometricMessage(
                    error instanceof Error
                      ? error.message
                      : isRTL
                        ? 'האימות הביומטרי נכשל.'
                        : 'Biometric authentication failed.',
                  );
                })
            }
            className="w-full bg-blue-600 text-white rounded-xl px-4 py-3 font-semibold hover:bg-blue-700 transition-colors"
          >
            {isRTL ? 'נסו שוב' : 'Try Again'}
          </button>
          <button onClick={logout} className="w-full border border-gray-300 rounded-xl px-4 py-3 font-semibold">
            {isRTL ? 'יציאה' : 'Exit'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell min-h-screen bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'} onKeyDown={onAdminHotkeys}>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isRTL ? 'לוח ניהול' : 'Admin Dashboard'}</h1>
            <p className="text-sm text-gray-600">/admin</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm"
            >
              {language === 'he' ? 'EN' : 'עב'}
            </button>
            <button onClick={logout} className="px-3 py-2 rounded-lg border border-gray-300 text-sm">
              {isRTL ? 'התנתק' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          {[
            ['dashboard', isRTL ? 'דשבורד' : 'Dashboard'],
            ['leads', isRTL ? 'לידים' : 'Leads'],
            ['content', isRTL ? 'תוכן' : 'Content'],
            ['settings', isRTL ? 'הגדרות' : 'Settings'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`px-4 py-2 rounded-xl border text-sm font-semibold ${
                activeTab === key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300 text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white border rounded-2xl p-5"><p className="text-gray-500 text-sm">{isRTL ? 'לידים' : 'Leads'}</p><p className="text-3xl font-bold">{content.leads.length}</p></div>
              <div className="bg-white border rounded-2xl p-5"><p className="text-gray-500 text-sm">{isRTL ? 'פרויקטים' : 'Projects'}</p><p className="text-3xl font-bold">{content.projects.length}</p></div>
              <div className="bg-white border rounded-2xl p-5"><p className="text-gray-500 text-sm">{isRTL ? 'כתבות' : 'Articles'}</p><p className="text-3xl font-bold">{content.articles.length}</p></div>
              <div className="bg-white border rounded-2xl p-5"><p className="text-gray-500 text-sm">{isRTL ? 'שאלות נפוצות' : 'FAQ'}</p><p className="text-3xl font-bold">{content.faqs.length}</p></div>
            </div>
            <div className="bg-white border rounded-2xl p-5">
              <p className="text-gray-500 text-sm">{isRTL ? 'סטטוס דאטה' : 'Data Status'}</p>
              <p className="text-lg font-semibold">
                {isSupabaseConfigured
                  ? (isRTL ? 'סנכרון ענן פעיל' : 'Cloud sync enabled')
                  : (isRTL ? 'עובד לוקאלית (localStorage)' : 'Running locally (localStorage)')}
              </p>
            </div>
            <div className="bg-white border rounded-2xl p-5">
              <h2 className="text-xl font-bold mb-3">{isRTL ? 'ליד אחרון' : 'Latest Lead'}</h2>
              {!latestLead && <p className="text-gray-600">{isRTL ? 'עדיין אין לידים' : 'No leads yet'}</p>}
              {latestLead && (
                <div className="space-y-2">
                  <p className="font-semibold">{latestLead.fullName} · {latestLead.company}</p>
                  <p className="text-sm text-gray-600">{latestLead.phone || '-'} · {latestLead.email}</p>
                  <p className="text-sm text-gray-500">{formatDate(latestLead.createdAt, language)}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="bg-white border rounded-2xl p-5 space-y-4">
            <h2 className="text-xl font-bold">{isRTL ? 'לידים שהתקבלו' : 'Received Leads'}</h2>
            {leadsError && <p className="text-sm text-red-600">{leadsError}</p>}
            {isSupabaseConfigured && (
              <button
                onClick={() =>
                  refreshLeads().catch((error) => {
                    setLeadsError(toLeadErrorMessage(error, isRTL));
                  })
                }
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
              >
                {isRTL ? 'רענן לידים' : 'Refresh Leads'}
              </button>
            )}
            {content.leads.length === 0 && <p className="text-gray-600">{isRTL ? 'עדיין אין לידים' : 'No leads yet'}</p>}
            {content.leads.map((lead) => (
              <div key={lead.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <p className="font-bold text-gray-900">{lead.fullName} · {lead.company}</p>
                  <p className="text-sm text-gray-500">{formatDate(lead.createdAt, language)}</p>
                </div>
                <p className="text-sm text-gray-700">{lead.phone || '-'} · {lead.email} · {lead.projectType} · {lead.budget}</p>
                <p className="text-gray-700 mt-2">{lead.details}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => openLeadWhatsapp(lead)}
                    className="px-3 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold"
                  >
                    {isRTL ? 'שלח וואטסאפ מהיר' : 'Quick WhatsApp'}
                  </button>
                  <button onClick={() => copyText(updateLeadMessage(lead))} className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold">
                    {isRTL ? 'העתק הודעה מוכנה' : 'Copy Ready Message'}
                  </button>
                  <button
                    onClick={() => {
                      const link = whatsappUrl(lead.phone?.trim() || content.siteInfo.whatsappNumber, updateLeadMessage(lead));
                      if (!link) {
                        setSettingsMessage(isRTL ? 'אין מספר טלפון תקין לליד הזה' : 'No valid phone number for this lead');
                        return;
                      }
                      copyText(link);
                    }}
                    className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
                  >
                    {isRTL ? 'העתק לינק וואטסאפ' : 'Copy WhatsApp Link'}
                  </button>
                  <a href={`mailto:${lead.email}`} className="px-3 py-2 rounded-lg border border-gray-300 text-sm font-semibold">
                    {isRTL ? 'שלח אימייל' : 'Send Email'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <section className="bg-white border rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{isRTL ? 'פרויקטים' : 'Projects'}</h2>
                <button
                  onClick={() => {
                    if (!newProject.id.trim()) return;
                    setContent((prev) => ({ ...prev, projects: [...prev.projects, newProject] }));
                    setNewProject({ id: '', image: '', titleHe: '', titleEn: '', categoryHe: '', categoryEn: '', resultHe: '', resultEn: '', descriptionHe: '', descriptionEn: '' });
                  }}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
                >
                  {isRTL ? 'הוסף פרויקט' : 'Add Project'}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {Object.keys(newProject).map((key) => (
                  <input key={key} placeholder={`new.${key}`} value={String(newProject[key as keyof ProjectItem])} onChange={(e) => setNewProject((prev) => ({ ...prev, [key]: e.target.value }))} className="border rounded-lg px-3 py-2" />
                ))}
              </div>
              {content.projects.map((project, index) => (
                <div key={project.id} className="border rounded-xl p-3 space-y-2">
                  <div className="flex gap-2">
                    <button disabled={index === 0} onClick={() => setContent((prev) => ({ ...prev, projects: moveItem(prev.projects, index, index - 1) }))} className="px-2 py-1 border rounded disabled:opacity-40">↑</button>
                    <button disabled={index === content.projects.length - 1} onClick={() => setContent((prev) => ({ ...prev, projects: moveItem(prev.projects, index, index + 1) }))} className="px-2 py-1 border rounded disabled:opacity-40">↓</button>
                    <button onClick={() => setContent((prev) => ({ ...prev, projects: prev.projects.filter((item) => item.id !== project.id) }))} className="px-2 py-1 border rounded text-red-600">{isRTL ? 'מחק' : 'Delete'}</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {Object.keys(project).map((key) => (
                      <input
                        key={key}
                        value={String(project[key as keyof ProjectItem])}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            projects: prev.projects.map((item, i) => (i === index ? { ...item, [key]: e.target.value } : item)),
                          }))
                        }
                        className="border rounded-lg px-3 py-2"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-white border rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{isRTL ? 'כתבות' : 'Articles'}</h2>
                <button
                  onClick={() => {
                    if (!newArticle.slug.trim()) return;
                    setContent((prev) => ({ ...prev, articles: [...prev.articles, newArticle] }));
                    setNewArticle({ slug: '', titleHe: '', titleEn: '', excerptHe: '', excerptEn: '', categoryHe: '', categoryEn: '', dateHe: '', dateEn: '', readTimeHe: '', readTimeEn: '', contentHe: '', contentEn: '' });
                  }}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
                >
                  {isRTL ? 'הוסף כתבה' : 'Add Article'}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {Object.keys(newArticle).map((key) => (
                  <input key={key} placeholder={`new.${key}`} value={String(newArticle[key as keyof ArticleItem])} onChange={(e) => setNewArticle((prev) => ({ ...prev, [key]: e.target.value }))} className="border rounded-lg px-3 py-2" />
                ))}
              </div>
              {content.articles.map((article, index) => (
                <div key={article.slug} className="border rounded-xl p-3 space-y-2">
                  <div className="flex gap-2">
                    <button disabled={index === 0} onClick={() => setContent((prev) => ({ ...prev, articles: moveItem(prev.articles, index, index - 1) }))} className="px-2 py-1 border rounded disabled:opacity-40">↑</button>
                    <button disabled={index === content.articles.length - 1} onClick={() => setContent((prev) => ({ ...prev, articles: moveItem(prev.articles, index, index + 1) }))} className="px-2 py-1 border rounded disabled:opacity-40">↓</button>
                    <button onClick={() => setContent((prev) => ({ ...prev, articles: prev.articles.filter((item) => item.slug !== article.slug) }))} className="px-2 py-1 border rounded text-red-600">{isRTL ? 'מחק' : 'Delete'}</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {Object.keys(article).map((key) => (
                      <input
                        key={key}
                        value={String(article[key as keyof ArticleItem])}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            articles: prev.articles.map((item, i) => (i === index ? { ...item, [key]: e.target.value } : item)),
                          }))
                        }
                        className="border rounded-lg px-3 py-2"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="bg-white border rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">FAQ</h2>
                <button
                  onClick={() => {
                    if (!newFaq.id.trim()) return;
                    setContent((prev) => ({ ...prev, faqs: [...prev.faqs, newFaq] }));
                    setNewFaq({ id: '', questionHe: '', questionEn: '', answerHe: '', answerEn: '' });
                  }}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm"
                >
                  {isRTL ? 'הוסף שאלה' : 'Add FAQ'}
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {Object.keys(newFaq).map((key) => (
                  <input key={key} placeholder={`new.${key}`} value={String(newFaq[key as keyof FAQItem])} onChange={(e) => setNewFaq((prev) => ({ ...prev, [key]: e.target.value }))} className="border rounded-lg px-3 py-2" />
                ))}
              </div>
              {content.faqs.map((faq, index) => (
                <div key={faq.id} className="border rounded-xl p-3 space-y-2">
                  <div className="flex gap-2">
                    <button disabled={index === 0} onClick={() => setContent((prev) => ({ ...prev, faqs: moveItem(prev.faqs, index, index - 1) }))} className="px-2 py-1 border rounded disabled:opacity-40">↑</button>
                    <button disabled={index === content.faqs.length - 1} onClick={() => setContent((prev) => ({ ...prev, faqs: moveItem(prev.faqs, index, index + 1) }))} className="px-2 py-1 border rounded disabled:opacity-40">↓</button>
                    <button onClick={() => setContent((prev) => ({ ...prev, faqs: prev.faqs.filter((item) => item.id !== faq.id) }))} className="px-2 py-1 border rounded text-red-600">{isRTL ? 'מחק' : 'Delete'}</button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {Object.keys(faq).map((key) => (
                      <input
                        key={key}
                        value={String(faq[key as keyof FAQItem])}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            faqs: prev.faqs.map((item, i) => (i === index ? { ...item, [key]: e.target.value } : item)),
                          }))
                        }
                        className="border rounded-lg px-3 py-2"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <section className="bg-white border rounded-2xl p-5 space-y-3">
              <h2 className="text-xl font-bold">{isRTL ? 'מידע אתר' : 'Site Info'}</h2>
              <div className="grid md:grid-cols-2 gap-2">
                {Object.entries(content.siteInfo).map(([key, value]) => (
                  <input
                    key={key}
                    value={value}
                    onChange={(e) => setContent((prev) => ({ ...prev, siteInfo: { ...prev.siteInfo, [key]: e.target.value } }))}
                    className="border rounded-lg px-3 py-2"
                    placeholder={key}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">{isRTL ? 'תבנית וואטסאפ תומכת: {{name}}, {{phone}}, {{company}}, {{projectType}}, {{budget}}' : 'WhatsApp template supports: {{name}}, {{phone}}, {{company}}, {{projectType}}, {{budget}}'}</p>
            </section>

            <section className="bg-white border rounded-2xl p-5 space-y-3">
              <h2 className="text-xl font-bold">{isRTL ? 'סדר קומפוננטים בעמוד הבית' : 'Homepage Section Order'}</h2>
              {content.homeSections.map((section, index) => (
                <div key={section} className="flex items-center gap-2">
                  <div className="min-w-40">{sectionLabels[section]}</div>
                  <button disabled={index === 0} onClick={() => setContent((prev) => ({ ...prev, homeSections: moveItem(prev.homeSections, index, index - 1) }))} className="px-2 py-1 border rounded disabled:opacity-40">↑</button>
                  <button disabled={index === content.homeSections.length - 1} onClick={() => setContent((prev) => ({ ...prev, homeSections: moveItem(prev.homeSections, index, index + 1) }))} className="px-2 py-1 border rounded disabled:opacity-40">↓</button>
                </div>
              ))}
            </section>

            <section className="bg-white border rounded-2xl p-5 space-y-3">
              <h2 className="text-xl font-bold text-red-700">{isRTL ? 'איפוס נתונים' : 'Reset Data'}</h2>
              <p className="text-sm text-gray-600">{isRTL ? 'יחזיר את כל תוכן האתר לדיפולט וימחק לידים' : 'Restore default content and clear leads.'}</p>
              <button onClick={resetContent} className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold">{isRTL ? 'אפס הכל' : 'Reset All'}</button>
            </section>

            <section className="bg-white border rounded-2xl p-5 space-y-3">
              <h2 className="text-xl font-bold">{isRTL ? 'שינוי סיסמת אדמין' : 'Change Admin Password'}</h2>
              <div className={`grid gap-2 ${isSupabaseConfigured ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {!isSupabaseConfigured && (
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                    placeholder={isRTL ? 'סיסמה נוכחית' : 'Current password'}
                  />
                )}
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                  placeholder={isRTL ? 'סיסמה חדשה' : 'New password'}
                />
                <input
                  type="password"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                  className="border rounded-lg px-3 py-2"
                  placeholder={isRTL ? 'אימות סיסמה חדשה' : 'Confirm new password'}
                />
              </div>
              <button onClick={changePassword} className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold">
                {isRTL ? 'עדכן סיסמה' : 'Update Password'}
              </button>
              {settingsMessage && <p className="text-sm text-gray-700">{settingsMessage}</p>}
            </section>

            {isNativeAdminApp() && (
              <section className="bg-white border rounded-2xl p-5 space-y-3">
                <h2 className="text-xl font-bold">{isRTL ? 'אפליקציית אייפון - Push' : 'iPhone App - Push'}</h2>
                <p className="text-sm text-gray-600">
                  {isRTL ? 'טוקן ההתראות של המכשיר שלך:' : 'Your device push token:'}
                </p>
                <div className="border rounded-lg px-3 py-2 text-xs break-all bg-gray-50">{pushToken || (isRTL ? 'עדיין לא נוצר טוקן' : 'Token not created yet')}</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setPushBusy(true);
                      registerAdminPushToken(isRTL)
                        .then((token) => {
                          setPushToken(token);
                          setSettingsMessage(isRTL ? 'טוקן Push עודכן' : 'Push token updated');
                        })
                        .catch((error) => {
                          setSettingsMessage(error instanceof Error ? error.message : isRTL ? 'שגיאה בעדכון Push' : 'Push update failed');
                        })
                        .finally(() => {
                          setPushBusy(false);
                        });
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold disabled:opacity-60"
                    disabled={pushBusy}
                  >
                    {pushBusy ? (isRTL ? 'מעדכן...' : 'Updating...') : isRTL ? 'רענן Push' : 'Refresh Push'}
                  </button>
                  <button
                    onClick={() => copyText(pushToken)}
                    className="px-4 py-2 rounded-lg border border-gray-300 font-semibold disabled:opacity-50"
                    disabled={!pushToken}
                  >
                    {isRTL ? 'העתק טוקן' : 'Copy Token'}
                  </button>
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

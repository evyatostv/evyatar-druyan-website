import { supabaseConfig } from './supabase';

export type ShopifyService = 'maintenance' | 'build';
export type ContactMethod = 'phone' | 'email';
export type AnswerKey = 'business' | 'stage' | 'need' | 'website' | 'timing' | 'budget' | 'name' | 'contact';
export interface ShopifyAnswers {
  business: string;
  stage: string;
  need: string;
  website: string;
  timing: string;
  budget: string;
  name: string;
  contact: string;
  contactMethod: ContactMethod;
}
export interface Question {
  key: AnswerKey;
  title: string;
  hint: string;
  options?: string[];
  optional?: boolean;
  placeholder?: string;
}
export const EMPTY_ANSWERS: ShopifyAnswers = {
  business: '', stage: '', need: '', website: '', timing: '', budget: '', name: '', contact: '', contactMethod: 'phone',
};
export const SERVICE_LABELS = { maintenance: 'תחזוקת Shopify חודשית', build: 'בניית חנות Shopify' };

export function questionsFor(service: ShopifyService): Question[] {
  return [
    { key: 'business', title: 'מה העסק שלכם מוכר?', hint: 'משפט קצר יעזור להבין את העסק. אפשר להוסיף גם את שמו.', placeholder: 'למשל: סטודיו נועה — תכשיטים בעבודת יד' },
    { key: 'stage', title: service === 'maintenance' ? 'החנות כבר פועלת ב־Shopify?' : 'איפה העסק מוכר היום?',
      hint: 'כך נתאים את השיחה לשלב שבו אתם נמצאים.',
      options: service === 'maintenance' ? ['כן, החנות פעילה ב־Shopify', 'החנות עדיין בבנייה', 'האתר בפלטפורמה אחרת', 'לא בטוחים'] : ['ברשתות החברתיות', 'בחנות פיזית', 'באתר קיים', 'לקראת השקה ראשונה'] },
    { key: 'need', title: 'מה הכי חשוב לכם לקדם?', hint: 'בחרו את הדבר המרכזי. נוכל לדבר על השאר בשיחה.',
      options: service === 'maintenance' ? ['עדכוני מוצרים ותוכן', 'תיקוני תצוגה ותקלות', 'התאמות ופיצ׳רים חדשים', 'איש מקצוע לתחזוקה שוטפת'] : ['חנות חדשה למותג', 'מעבר מאתר קיים ל־Shopify', 'מעבר ממכירה בהודעות לחנות', 'תכנון החנות לקראת השקה'] },
    { key: 'website', title: 'יש קישור לחנות או לעמוד העסק?', hint: 'אפשר גם עמוד אינסטגרם. אם עדיין אין קישור, אפשר לדלג.', optional: true, placeholder: 'your-store.co.il' },
    { key: 'timing', title: 'מתי תרצו להתחיל?', hint: 'זה עוזר לבדוק התאמה ליומן. מועד תחילת העבודה ייקבע יחד.', options: ['בהקדם האפשרי', 'בחודש הקרוב', 'בהמשך, יש גמישות', 'עדיין בודקים אפשרויות'] },
    { key: 'budget', title: 'כבר הוגדר תקציב לשירות?', hint: service === 'maintenance' ? 'מדובר בשירות חודשי בתשלום, בהיקף שנסכם מראש.' : 'הקמת חנות היא פרויקט בתשלום. ההצעה תיקבע לפי הצרכים שלכם.', options: ['יש תקציב לשירות בתשלום', 'צריך להבין את ההיקף והעלות', 'רק בודקים כרגע'] },
    { key: 'name', title: 'איך קוראים לכם?', hint: 'נעים להכיר. נשארו רק פרטי הקשר.', placeholder: 'השם שלכם' },
    { key: 'contact', title: 'איך נוח לחזור אליכם?', hint: 'מספיק ערוץ אחד. נשתמש בו כדי לחזור אליכם לגבי הפנייה הזאת.' },
  ];
}

export function normalizeWebsite(value: string): string {
  const input = value.trim();
  if (!input) return '';
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || !url.hostname.includes('.')) return '';
    return url.toString();
  } catch { return ''; }
}

export function normalizePhone(value: string): string {
  const cleaned = value.replace(/[\s().-]/g, '');
  const israeli = /^0(?:[57]\d{8}|[234689]\d{7})$/;
  if (israeli.test(cleaned)) return `+972${cleaned.slice(1)}`;
  if (cleaned.startsWith('+972')) return israeli.test(`0${cleaned.slice(4)}`) ? cleaned : '';
  if (/^\+[1-9]\d{7,14}$/.test(cleaned)) return cleaned;
  return '';
}

export function validateAnswer(question: Question, answers: ShopifyAnswers): string {
  const value = answers[question.key].trim();
  if (question.optional && !value) return '';
  if (!value) return question.options ? 'בחרו את האפשרות שהכי מתאימה לכם.' : 'מלאו את השדה כדי להמשיך.';
  if (question.options && !question.options.includes(value)) return 'בחרו אחת מהאפשרויות ברשימה.';
  if (question.key === 'website' && !normalizeWebsite(value)) return 'הקישור לא נראה תקין. למשל: your-store.co.il. אפשר גם לדלג.';
  if (question.key === 'business' && (value.length < 2 || value.length > 300)) return 'כתבו תיאור קצר, בין 2 ל־300 תווים.';
  if (question.key === 'name' && (value.length < 2 || value.length > 80)) return 'מלאו שם באורך 2 עד 80 תווים.';
  if (question.key === 'contact') {
    if (answers.contactMethod === 'phone' && !normalizePhone(value)) return 'בדקו את מספר הטלפון. אפשר לכתוב 050-123-4567 או מספר עם קידומת מדינה.';
    if (answers.contactMethod === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length > 254)) return 'בדקו את כתובת האימייל, למשל name@example.com.';
  }
  return '';
}

export function attributionFrom(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};
  for (const key of ['ad', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const value = params.get(key);
    if (value && /^[a-z\d_-]{1,80}$/i.test(value)) result[key] = value;
  }
  return result;
}

export function leadSummary(service: ShopifyService, answers: ShopifyAnswers): string {
  const lines = questionsFor(service).map(q => `${q.title}\n${answers[q.key].trim() || 'לא נמסר'}`);
  return [`פנייה בנושא ${SERVICE_LABELS[service]}`, ...lines, `ערוץ חזרה מועדף: ${answers.contactMethod === 'phone' ? 'טלפון / WhatsApp' : 'אימייל'}`].join('\n\n');
}

export function whatsappFallback(service: ShopifyService, answers: ShopifyAnswers): string {
  return `https://wa.me/972535532893?text=${encodeURIComponent(leadSummary(service, answers))}`;
}

/** A 2xx from the remote insert is required; local state is never treated as delivery. */
export async function submitShopifyLead(service: ShopifyService, answers: ShopifyAnswers, id: string, attribution: Record<string, string>): Promise<void> {
  const invalid = questionsFor(service).some(q => validateAnswer(q, answers));
  if (invalid) throw new Error('Invalid form');
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  const details = `${leadSummary(service, answers)}\n\nמקור: טופס Shopify\n${Object.entries(attribution).map(([k,v]) => `${k}: ${v}`).join('\n')}\nמזהה פנייה: ${id}`;
  try {
    const response = await fetch(`${supabaseConfig.url}/rest/v1/leads`, {
      method: 'POST', signal: controller.signal,
      headers: { apikey: supabaseConfig.anonKey, Authorization: `Bearer ${supabaseConfig.anonKey}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ id, full_name: answers.name.trim(), company: answers.business.trim(),
        phone: answers.contactMethod === 'phone' ? normalizePhone(answers.contact) : '',
        email: answers.contactMethod === 'email' ? answers.contact.trim() : '', budget: answers.budget,
        project_type: service === 'maintenance' ? 'shopify-maintenance' : 'shopify-build', details }),
    });
    // Retrying a request whose response was lost uses the same UUID; a primary-key
    // conflict confirms the previously submitted record instead of creating a duplicate.
    if (response.status === 409) {
      const error = await response.json().catch(() => null);
      if (error?.code === '23505' && String(error?.message).includes('leads_pkey')) return;
    }
    if (!response.ok) throw new Error('Remote submission failed');
  } finally { window.clearTimeout(timeout); }
}

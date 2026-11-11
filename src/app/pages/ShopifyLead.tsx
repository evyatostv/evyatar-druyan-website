import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronDown, LoaderCircle, Mail, MessageCircle, Pencil, ShieldCheck } from 'lucide-react';
import { attributionFrom, EMPTY_ANSWERS, questionsFor, SERVICE_LABELS, submitShopifyLead, validateAnswer, whatsappFallback, type AnswerKey, type ContactMethod, type ShopifyAnswers, type ShopifyService } from '../../lib/shopifyLead';
import '../../styles/shopify-lead.css';

export function ShopifyLead() {
  const { service: routeService } = useParams();
  const service: ShopifyService = routeService === 'build' ? 'build' : 'maintenance';
  const navigate = useNavigate();
  const location = useLocation();
  const questions = questionsFor(service);
  const [answers, setAnswers] = useState<ShopifyAnswers>({ ...EMPTY_ANSWERS });
  const [step, setStep] = useState(0);
  const [editing, setEditing] = useState(false);
  const [servicePicker, setServicePicker] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const idRef = useRef(crypto.randomUUID());
  const sendingRef = useRef(false);
  const requestVersion = useRef(0);
  const mountedRef = useRef(true);
  const currentService = useRef(service);
  currentService.current = service;
  const previousService = useRef(service);
  const firstRender = useRef(true);
  const review = step === questions.length;
  const question = questions[Math.min(step, questions.length - 1)];
  const success = status === 'sent';
  const progress = success ? 100 : Math.round(step / questions.length * 100);

  useEffect(() => {
    mountedRef.current = true;
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    const previousDir = document.documentElement.dir;
    document.documentElement.lang = 'he';
    document.documentElement.dir = 'rtl';
    return () => { mountedRef.current = false; requestVersion.current += 1; document.title = previousTitle; document.documentElement.lang = previousLang; document.documentElement.dir = previousDir; };
  }, []);

  useEffect(() => {
    document.title = `${success ? 'הפנייה נשלחה' : review ? 'בדיקת הפרטים' : `שאלה ${step + 1} מתוך ${questions.length}`} | ${SERVICE_LABELS[service]}`;
    if (firstRender.current) { firstRender.current = false; return; }
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [step, service, success, review, questions.length]);

  useEffect(() => {
    if (previousService.current === service) return;
    previousService.current = service;
    requestVersion.current += 1;
    sendingRef.current = false;
    setAnswers(prev => ({ ...prev, stage: '', need: '' }));
    setStep(0); setError(''); setStatus('idle'); setEditing(false);
    idRef.current = crypto.randomUUID();
  }, [service]);

  const change = (key: AnswerKey, value: string) => {
    idRef.current = crypto.randomUUID();
    setAnswers(prev => ({ ...prev, [key]: value }));
    setError('');
    if (status === 'error') setStatus('idle');
  };

  const changeMethod = (method: ContactMethod) => {
    if (method === answers.contactMethod) return;
    idRef.current = crypto.randomUUID();
    setAnswers(prev => ({ ...prev, contactMethod: method, contact: '' }));
    setError('');
  };

  const next = (event: React.FormEvent) => {
    event.preventDefault();
    const message = validateAnswer(question, answers);
    if (message) { setError(message); requestAnimationFrame(() => errorRef.current?.focus()); return; }
    setError('');
    setStep(editing ? questions.length : step + 1);
    setEditing(false);
  };

  const send = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sendingRef.current || success) return;
    const invalidStep = questions.findIndex(q => validateAnswer(q, answers));
    if (invalidStep >= 0) { setEditing(true); setStep(invalidStep); setError(validateAnswer(questions[invalidStep], answers)); return; }
    sendingRef.current = true;
    const version = ++requestVersion.current;
    const isCurrentRequest = () => mountedRef.current && requestVersion.current === version && currentService.current === service;
    setStatus('sending'); setError('');
    try {
      await submitShopifyLead(service, answers, idRef.current, attributionFrom(location.search));
      if (isCurrentRequest()) setStatus('sent');
    } catch {
      if (isCurrentRequest()) {
        setStatus('error');
        setError('לא הצלחנו לאשר שהפנייה נשמרה. הפרטים נשארו כאן — אפשר לנסות שוב או להעביר אותם ב־WhatsApp.');
        requestAnimationFrame(() => errorRef.current?.focus());
      }
    } finally { if (isCurrentRequest()) sendingRef.current = false; }
  };

  return (
    <main className={`shopify-lead shopify-lead--${service}`} dir="rtl" lang="he">
      <div className="sl-atmosphere" aria-hidden="true"><span /><span /><span /></div>
      <div className="sl-shell">
        <header className="sl-header">
          <span className="sl-eyebrow">בואו נדבר על החנות שלכם</span>
          <div className="sl-service-control">
            <button type="button" className="sl-service-button" onClick={() => setServicePicker(!servicePicker)} aria-expanded={servicePicker} aria-controls="service-options" disabled={status === 'sending' || success}>
              <span className="sl-service-dot" />{SERVICE_LABELS[service]}<ChevronDown size={16} aria-hidden="true" />
            </button>
            {servicePicker && <div id="service-options" className="sl-service-options">
              {(['maintenance', 'build'] as const).map(item => <button type="button" key={item} onClick={() => { setServicePicker(false); navigate(`/shopify/${item}${location.search}`); }}>
                {SERVICE_LABELS[item]}{service === item && <Check size={16} aria-hidden="true" />}
              </button>)}
            </div>}
          </div>
        </header>

        <div className="sl-progress-wrap">
          <div className="sl-progress-label"><span>{success ? 'הפנייה נשלחה' : review ? 'הפרטים מוכנים. נשאר לשלוח.' : `שאלה ${step + 1} מתוך ${questions.length}`}</span><span>{progress}%</span></div>
          <div className="sl-progress" role="progressbar" aria-label="התקדמות בטופס" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-valuetext={success ? 'הפנייה נשלחה' : review ? 'כל השאלות הושלמו, ממתינים לשליחה' : `שאלה ${step + 1} מתוך ${questions.length}`}><span style={{ width: `${progress}%` }} /></div>
        </div>

        {success ? <section className="sl-success sl-step" aria-labelledby="sl-heading">
          <div className="sl-success-icon"><CheckCircle2 size={42} aria-hidden="true" /></div>
          <p className="sl-kicker">הפרטים הגיעו</p>
          <h1 id="sl-heading" ref={headingRef} tabIndex={-1}>תודה, {answers.name.trim().split(' ')[0]}.</h1>
          <p className="sl-intro">הפנייה התקבלה. נחזור אליכם בערוץ שבחרתם להמשך השיחה.</p>
          <p className="sl-success-contact"><span>{answers.contactMethod === 'phone' ? 'טלפון / WhatsApp' : 'אימייל'}</span><bdi>{answers.contact}</bdi></p>
          <p className="sl-small">מספר הפנייה: <bdi>{idRef.current.slice(0, 8)}</bdi></p>
        </section> : review ? <form onSubmit={send} className="sl-step sl-review" noValidate aria-labelledby="sl-heading" aria-busy={status === 'sending'}>
          <p className="sl-kicker">לפני ששולחים</p>
          <h1 id="sl-heading" ref={headingRef} tabIndex={-1}>הכול נראה נכון?</h1>
          <p className="sl-intro">רגע לפני השליחה, אפשר לעבור על הפרטים ולעדכן במידת הצורך.</p>
          <dl className="sl-review-list">{questions.map((q,index) => <div key={q.key}>
            <div><dt>{q.key === 'contact' ? (answers.contactMethod === 'phone' ? 'טלפון / WhatsApp' : 'אימייל') : q.title}</dt><dd dir={q.key === 'website' || q.key === 'contact' ? 'auto' : undefined}>{answers[q.key].trim() || 'לא נמסר'}</dd></div>
            <button type="button" className="sl-edit" aria-label={`עריכת ${q.title}`} disabled={status === 'sending'} onClick={() => { setEditing(true); setStep(index); setError(''); }}><Pencil size={16} aria-hidden="true" /><span>עריכה</span></button>
          </div>)}</dl>
          {error && <p className="sl-error" id="sl-error" role="alert" tabIndex={-1} ref={errorRef}>{error}</p>}
          <div className="sl-actions"><button className="sl-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle className="sl-spinner" size={20} aria-hidden="true" />שולחים את הפרטים…</> : <>שליחת הפרטים<ArrowLeft size={20} aria-hidden="true" /></>}</button></div>
          {status === 'error' && <a className="sl-fallback" href={whatsappFallback(service, answers)} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" />פתיחת הפנייה ב־WhatsApp<span>ההודעה תיפתח לבדיקה ולשליחה שלכם</span></a>}
          <p className="sl-small">השארת הפרטים אינה התחייבות. היקף העבודה והמחיר ייקבעו לאחר השיחה.</p>
        </form> : <form onSubmit={next} className="sl-step" noValidate aria-labelledby="sl-heading" key={`${service}-${step}`}>
          <p className="sl-kicker">{step < 4 ? 'קצת על העסק' : step < 6 ? 'מתאמים ציפיות' : 'נעים להכיר'}{question.optional && <span>לא חובה</span>}</p>
          <h1 id="sl-heading" ref={headingRef} tabIndex={-1}>{question.title}</h1>
          <p id="sl-hint" className="sl-intro">{question.hint}</p>
          <div className="sl-answer">
            {question.options ? <fieldset className="sl-options" aria-describedby={`sl-hint${error ? ' sl-error' : ''}`}><legend className="sl-sr-only">{question.title}</legend>
              {question.options.map((option,index) => <label className={`sl-option${answers[question.key] === option ? ' sl-option--selected' : ''}`} key={option}>
                <input type="radio" name={question.key} value={option} required aria-invalid={Boolean(error)} checked={answers[question.key] === option} onChange={() => change(question.key, option)} />
                <span className="sl-option-number" aria-hidden="true">{String(index + 1).padStart(2,'0')}</span><span>{option}</span><span className="sl-option-check" aria-hidden="true">{answers[question.key] === option && <Check size={18} />}</span>
              </label>)}
            </fieldset> : question.key === 'contact' ? <div>
              <fieldset className="sl-contact-method"><legend className="sl-sr-only">ערוץ חזרה מועדף</legend>{(['phone','email'] as const).map(method => <label className={answers.contactMethod === method ? 'sl-method--selected' : ''} key={method}>
                <input type="radio" name="contact-method" checked={answers.contactMethod === method} onChange={() => changeMethod(method)} />
                {method === 'phone' ? <MessageCircle size={18} aria-hidden="true" /> : <Mail size={18} aria-hidden="true" />}{method === 'phone' ? 'טלפון / WhatsApp' : 'אימייל'}
              </label>)}</fieldset>
              <label className="sl-field-label" htmlFor="sl-contact">{answers.contactMethod === 'phone' ? 'מספר טלפון' : 'כתובת אימייל'}</label>
              <input id="sl-contact" name={answers.contactMethod} required className="sl-input" type={answers.contactMethod === 'phone' ? 'tel' : 'email'} inputMode={answers.contactMethod === 'phone' ? 'tel' : 'email'} autoComplete={answers.contactMethod === 'phone' ? 'tel' : 'email'} dir="ltr" value={answers.contact} placeholder={answers.contactMethod === 'phone' ? '050-123-4567' : 'name@example.com'} onChange={e => change('contact',e.target.value)} maxLength={254} aria-describedby={`sl-hint${error ? ' sl-error' : ''}`} aria-invalid={Boolean(error)} />
            </div> : <>
              <label className="sl-sr-only" htmlFor={`sl-${question.key}`}>{question.title}</label>
              {question.key === 'business' ? <textarea id="sl-business" required className="sl-input sl-textarea" name="business" value={answers.business} onChange={e => change('business',e.target.value)} placeholder={question.placeholder} maxLength={300} rows={3} aria-describedby={`sl-hint${error ? ' sl-error' : ''}`} aria-invalid={Boolean(error)} /> :
                <input id={`sl-${question.key}`} className="sl-input" name={question.key} required={!question.optional} type="text" inputMode={question.key === 'website' ? 'url' : 'text'} autoComplete={question.key === 'name' ? 'name' : 'url'} dir={question.key === 'website' ? 'ltr' : 'auto'} value={answers[question.key]} onChange={e => change(question.key,e.target.value)} placeholder={question.placeholder} maxLength={question.key === 'website' ? 500 : 80} aria-describedby={`sl-hint${error ? ' sl-error' : ''}`} aria-invalid={Boolean(error)} />}
            </>}
          </div>
          {error && <p className="sl-error" id="sl-error" role="alert" tabIndex={-1} ref={errorRef}>{error}</p>}
          <div className="sl-actions">
            <button className="sl-primary" type="submit">{editing ? 'שמירת התיקון' : step === questions.length-1 ? 'בדיקת הפרטים' : 'ממשיכים'}<ArrowLeft size={20} aria-hidden="true" /></button>
            {question.optional && <button className="sl-text-button" type="button" onClick={() => { change('website',''); setStep(editing ? questions.length : step+1); setEditing(false); }}>דילוג</button>}
            {step > 0 && <button className="sl-back" type="button" onClick={() => { setStep(step-1); setError(''); setEditing(false); }}><ArrowRight size={16} aria-hidden="true" />חזרה</button>}
          </div>
          {step === 0 && <p className="sl-small">8 שאלות קצרות, ואז אפשר לעבור על הפרטים לפני השליחה.</p>}
        </form>}

        <footer className="sl-footer"><button type="button" onClick={() => setPrivacyOpen(!privacyOpen)} aria-expanded={privacyOpen} aria-controls="sl-privacy"><ShieldCheck size={16} aria-hidden="true" />מה קורה עם הפרטים שלי?</button>
          {privacyOpen && <div id="sl-privacy" className="sl-privacy">הפרטים משמשים לבדיקת הפנייה וליצירת קשר. הם נשמרים במערכת הלידים של העסק ולא מצורפים לרשימת דיוור. התשובות נשארות בדף עד השליחה; סגירה או רענון ימחקו טיוטה שלא נשלחה. לבירור או לבקשת מחיקה: <a href="mailto:contact@drd.co.il">contact@drd.co.il</a>.</div>}
        </footer>
      </div>
    </main>
  );
}

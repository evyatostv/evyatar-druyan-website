import { useState } from 'react';
import { Mail, Phone, MapPin, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSiteContent } from '../context/SiteContentContext';

interface ContactFormState {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  budget: string;
  projectType: string;
  details: string;
}

const initialForm: ContactFormState = {
  fullName: '',
  phone: '',
  email: '',
  company: '',
  budget: '',
  projectType: '',
  details: '',
};

export function Contact() {
  const { language, t } = useLanguage();
  const isRTL = language === 'he';
  const { addLead, content } = useSiteContent();
  const [formData, setFormData] = useState<ContactFormState>(initialForm);
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onChange = (key: keyof ContactFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');
    const success = await addLead(formData);
    if (!success) {
      setSubmitError(t('genericSubmitFallback'));
    }
    setFormData(initialForm);
    setSent(true);
    window.setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="pt-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <section className="py-20 sm:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <div className="text-center mb-16" dir={isRTL ? 'rtl' : 'ltr'}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
              {isRTL ? 'בוא נדבר על הפרויקט שלך' : "Let's Talk About Your Project"}
            </h1>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              {isRTL
                ? 'מלא את הטופס ונחזור אליך תוך 24 שעות עם הצעה מותאמת אישית'
                : 'Fill out the form and we\'ll get back to you within 24 hours with a custom proposal'}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <form onSubmit={onSubmit} className="bg-white rounded-3xl p-10 shadow-xl border-2 border-gray-100" dir={isRTL ? 'rtl' : 'ltr'}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      {isRTL ? 'שם מלא' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => onChange('fullName', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder={isRTL ? 'שם שלך' : 'Your name'}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      {isRTL ? 'טלפון' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => onChange('phone', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder={isRTL ? '050-000-0000' : '+1 555 000 0000'}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      {isRTL ? 'אימייל' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => onChange('email', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      {isRTL ? 'חברה' : 'Company'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => onChange('company', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      placeholder={isRTL ? 'שם החברה' : 'Company name'}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      {isRTL ? 'תקציב משוער' : 'Estimated Budget'}
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => onChange('budget', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                      required
                    >
                      <option value="">{isRTL ? 'בחר טווח' : 'Select range'}</option>
                      <option value="5-10k">{isRTL ? '5-10K' : '$5-10K'}</option>
                      <option value="10-25k">{isRTL ? '10-25K' : '$10-25K'}</option>
                      <option value="25-50k">{isRTL ? '25-50K' : '$25-50K'}</option>
                      <option value="50k+">{isRTL ? '50K+' : '$50K+'}</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-900 font-semibold mb-2">
                    {isRTL ? 'סוג הפרויקט' : 'Project Type'}
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => onChange('projectType', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">{isRTL ? 'בחר סוג' : 'Select type'}</option>
                    <option value="website">{isRTL ? 'עיצוב אתר' : 'Website Design'}</option>
                    <option value="ads">{isRTL ? 'פרסום ממומן' : 'Paid Advertising'}</option>
                    <option value="full">{isRTL ? 'חבילה מלאה' : 'Full Package'}</option>
                  </select>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-900 font-semibold mb-2">
                    {isRTL ? 'פרטי הפרויקט' : 'Project Details'}
                  </label>
                  <textarea
                    rows={6}
                    value={formData.details}
                    onChange={(e) => onChange('details', e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-600 focus:outline-none transition-colors resize-none"
                    placeholder={isRTL ? 'ספר לנו על הפרויקט, היעדים והציפיות שלך...' : 'Tell us about your project, goals, and expectations...'}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-5 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
                >
                  {isRTL ? (
                    <>
                      שלח בקשה
                      <ArrowLeft className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Submit Request
                      <ArrowLeft className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-center text-gray-500 mt-6">
                  {sent
                    ? isRTL
                      ? 'הבקשה נשלחה ונשמרה בלידים בהצלחה.'
                      : 'Request submitted and saved to leads successfully.'
                    : isRTL
                      ? 'נחזור אליך תוך 24 שעות עם הצעה מותאמת אישית'
                      : "We'll respond within 24 hours with a custom proposal"}
                </p>
                {submitError && <p className="text-center text-red-600 mt-2 text-sm">{submitError}</p>}
              </form>
            </div>

            <div dir={isRTL ? 'rtl' : 'ltr'}>
              <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 rounded-3xl p-10 text-white shadow-2xl h-full">
                <h3 className="text-3xl font-bold mb-8">
                  {isRTL ? 'פרטי יצירת קשר' : 'Contact Information'}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{isRTL ? 'אימייל' : 'Email'}</div>
                      <a href={`mailto:${content.siteInfo.email}`} className="text-blue-100 hover:text-white">
                        {content.siteInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{isRTL ? 'שלחו לנו הודעה בוואטסאפ' : 'Message us on WhatsApp'}</div>
                      <a
                        href={`https://wa.me/${content.siteInfo.whatsappNumber || '972535532893'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-100 hover:text-white"
                      >
                        {isRTL ? 'שלחו לנו הודעה בוואטסאפ' : 'Message us on WhatsApp'}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">{isRTL ? 'מיקום' : 'Location'}</div>
                      <div className="text-blue-100">
                        {isRTL ? content.siteInfo.locationHe : content.siteInfo.locationEn}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-blue-50 text-lg leading-relaxed">
                    {isRTL
                      ? 'עבודה מתחילה רק לאחר הסכם ופיקדון. זה מבטיח מחויבות משני הצדדים ומאפשר לנו להקצות זמן ייעודי לפרויקט שלך.'
                      : 'Work begins only after agreement and deposit. This ensures commitment from both sides and allows us to allocate dedicated time to your project.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

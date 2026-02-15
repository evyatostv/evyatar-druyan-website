import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router';
import { useSiteContent } from '../context/SiteContentContext';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { content } = useSiteContent();
  const { language, t } = useLanguage();
  const isRTL = language === 'he';

  return (
    <footer className="bg-gray-900 text-gray-300 py-14 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10" dir={isRTL ? 'rtl' : 'ltr'}>
          <div>
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-5">{t('footerContact')}</h3>
            <div className="space-y-3">
              <a href={`mailto:${content.siteInfo.email}`} className="flex items-center gap-3 hover:text-white transition-colors text-base sm:text-lg">
                <Mail className="w-5 h-5" />
                {content.siteInfo.email}
              </a>
              <a href={`tel:${content.siteInfo.phone.replace(/[^+\d]/g, '')}`} className="hover:text-white transition-colors text-base sm:text-lg block">
                {content.siteInfo.phone}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-5">{t('footerServices')}</h3>
            <ul className="space-y-2.5 text-base sm:text-lg">
              <li><Link to="/services/website-design" className="hover:text-white transition-colors">{t('websiteDesign')}</Link></li>
              <li><Link to="/services/paid-advertising" className="hover:text-white transition-colors">{t('paidAdvertising')}</Link></li>
              <li><Link to="/services/full-package" className="hover:text-white transition-colors">{t('fullPackage')}</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">{t('caseStudies')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-5">{t('footerFollow')}</h3>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all" aria-label="X">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-white bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm sm:text-base" dir={isRTL ? 'rtl' : 'ltr'}>
            <p className="text-gray-400">
              © {new Date().getFullYear()} {isRTL ? 'דרוין עיצובים' : 'Druyan Design'}. {t('footerRights')}
            </p>
            <p className="text-gray-400">{t('footerTrusted')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

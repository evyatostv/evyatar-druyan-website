import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isRTL = language === 'he';

  const isActive = (path: string) => location.pathname === path;
  const closeMenus = () => {
    setServicesOpen(false);
    setCaseStudiesOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div
          className={`flex items-center h-[4.5rem] sm:h-20 ${
            isRTL ? 'justify-between md:justify-start' : 'justify-between'
          }`}
        >
          <Link to="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-l from-blue-600 to-teal-600 bg-clip-text text-transparent">
            {isRTL ? 'דרוין עיצובים' : 'Druyan Design'}
          </Link>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl border border-gray-200 text-gray-700 hover:text-blue-600 hover:border-blue-200 transition-colors"
            aria-label={mobileMenuOpen ? t('menuClose') : t('menuOpen')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className={`hidden md:flex items-center gap-7 ${isRTL ? 'md:ms-6' : ''}`}>
            <Link
              to="/"
              onClick={closeMenus}
              className={`font-semibold transition-colors ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('home')}
            </Link>

            <div
              className="relative"
              onMouseEnter={() => {
                setServicesOpen(true);
                setCaseStudiesOpen(false);
              }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => {
                  setServicesOpen((prev) => !prev);
                  setCaseStudiesOpen(false);
                }}
                className={`font-semibold transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith('/services')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t('services')}
                <ChevronDown className="w-4 h-4" />
              </button>
              {servicesOpen && (
                <div className={`absolute top-full pt-2 w-56 ${isRTL ? 'left-0' : 'right-0'}`}>
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 py-3">
                    <Link
                      to="/services/website-design"
                      onClick={closeMenus}
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      {t('websiteDesign')}
                    </Link>
                    <Link
                      to="/services/paid-advertising"
                      onClick={closeMenus}
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      {t('paidAdvertising')}
                    </Link>
                    <Link
                      to="/services/full-package"
                      onClick={closeMenus}
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      {t('fullPackage')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <div
              className="relative"
              onMouseEnter={() => {
                setCaseStudiesOpen(true);
                setServicesOpen(false);
              }}
              onMouseLeave={() => setCaseStudiesOpen(false)}
            >
              <button
                onClick={() => {
                  setCaseStudiesOpen((prev) => !prev);
                  setServicesOpen(false);
                }}
                className={`font-semibold transition-colors flex items-center gap-1 ${
                  location.pathname.startsWith('/projects') || location.pathname.startsWith('/case-studies')
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {t('caseStudies')}
                <ChevronDown className="w-4 h-4" />
              </button>
              {caseStudiesOpen && (
                <div className={`absolute top-full pt-2 w-56 ${isRTL ? 'left-0' : 'right-0'}`}>
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 py-3">
                    <Link
                      to="/projects"
                      onClick={closeMenus}
                      className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors font-semibold"
                    >
                      {t('allProjects')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              onClick={closeMenus}
              className={`font-semibold transition-colors ${
                isActive('/pricing') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('pricing')}
            </Link>

            <Link
              to="/about"
              onClick={closeMenus}
              className={`font-semibold transition-colors ${
                isActive('/about') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('about')}
            </Link>

            <Link
              to="/insights"
              onClick={closeMenus}
              className={`font-semibold transition-colors ${
                isActive('/insights') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('insights')}
            </Link>

            <Link
              to="/faq"
              onClick={closeMenus}
              className={`font-semibold transition-colors ${
                isActive('/faq') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {t('faq')}
            </Link>

            <button
              onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">{t('languageLabel')}</span>
            </button>

            <Link
              to="/contact"
              onClick={closeMenus}
              className="bg-gradient-to-l from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              {t('requestProposal')}
            </Link>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-5 border-t border-gray-200" dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="flex flex-col gap-1 pt-4">
              <Link to="/" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                {t('home')}
              </Link>

              <button
                onClick={() => setServicesOpen((prev) => !prev)}
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{t('services')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div className={`flex flex-col gap-1 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                  <Link to="/services/website-design" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                    {t('websiteDesign')}
                  </Link>
                  <Link to="/services/paid-advertising" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                    {t('paidAdvertising')}
                  </Link>
                  <Link to="/services/full-package" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                    {t('fullPackage')}
                  </Link>
                </div>
              )}

              <button
                onClick={() => setCaseStudiesOpen((prev) => !prev)}
                className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center justify-between"
              >
                <span>{t('caseStudies')}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${caseStudiesOpen ? 'rotate-180' : ''}`} />
              </button>
              {caseStudiesOpen && (
                <div className={`flex flex-col gap-1 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                  <Link to="/projects" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                    {t('allProjects')}
                  </Link>
                </div>
              )}

              <Link to="/pricing" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                {t('pricing')}
              </Link>
              <Link to="/about" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                {t('about')}
              </Link>
              <Link to="/insights" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                {t('insights')}
              </Link>
              <Link to="/faq" onClick={closeMenus} className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
                {t('faq')}
              </Link>

              <button
                onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
                className="mt-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700"
              >
                <Globe className="w-4 h-4" />
                <span className="font-semibold">{t('languageLabel')}</span>
              </button>

              <Link
                to="/contact"
                onClick={closeMenus}
                className="mt-2 bg-gradient-to-l from-blue-600 to-blue-700 text-white px-4 py-3 rounded-full font-semibold text-center"
              >
                {t('requestProposal')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

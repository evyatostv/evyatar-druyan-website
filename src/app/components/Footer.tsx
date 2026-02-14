import { Mail, Linkedin, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12" dir="rtl">
          <div>
            <h3 className="text-white font-bold text-2xl mb-6">צור קשר</h3>
            <div className="space-y-4">
              <a href="mailto:hello@yoursite.com" className="flex items-center gap-3 hover:text-white transition-colors text-lg">
                <Mail className="w-6 h-6" />
                hello@yoursite.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-2xl mb-6">שירותים</h3>
            <ul className="space-y-3">
              <li><Link to="/services/website-design" className="hover:text-white transition-colors text-lg">עיצוב אתרים</Link></li>
              <li><Link to="/services/paid-advertising" className="hover:text-white transition-colors text-lg">פרסום ממומן</Link></li>
              <li><Link to="/services/full-package" className="hover:text-white transition-colors text-lg">חבילות צמיחה</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors text-lg">מקרי בוחן</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-2xl mb-6">התחבר</h3>
            <div className="flex gap-5">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all duration-300">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-all duration-300">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6" dir="rtl">
            <p className="text-gray-400 text-lg">
              © {new Date().getFullYear()} עיצוב אתרים ושיווק מקצועי. כל הזכויות שמורות.
            </p>
            <p className="text-gray-400 text-lg">
              מהימן על ידי עסקים ממוקדי צמיחה ותוצאות.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

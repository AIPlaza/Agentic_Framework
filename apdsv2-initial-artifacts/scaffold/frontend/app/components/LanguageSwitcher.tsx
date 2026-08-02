'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Extract current language from URL (e.g. /en/something -> en)
  const currentLang = pathname.split('/')[1] || 'en';

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (newLocale: string) => {
    // Save preference to cookie
    document.cookie = `accet-locale=${newLocale}; path=/; max-age=31536000`;
    
    // Construct new URL by replacing the old locale
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    setIsOpen(false);
    router.push(newPath);
    router.refresh();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-2xl py-1 z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2.5 text-[11px] font-sans font-bold uppercase tracking-widest transition-colors ${
                currentLang === lang.code 
                  ? 'bg-[#5EC8F2]/10 text-[#5EC8F2]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { languages } from '../i18n/index.js';

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Fecha o menu ao clicar fora.
  useEffect(() => {
    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const current = languages.find((lang) => lang.code === i18n.language);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-2xl border border-violet-100 bg-white px-4 py-2 text-xs font-semibold tracking-widest text-slate-500 shadow-sm transition hover:border-violet-300 hover:text-mauve"
      >
        <Globe size={16} aria-hidden="true" />
        <span>{current?.label ?? i18n.language}</span>
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t('language.selectorAria')}
          className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-violet-100 bg-white py-1 shadow-xl"
        >
          {languages.map((lang) => {
            const selected = lang.code === i18n.language;
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium text-slate-600 transition hover:bg-violet-50 hover:text-mauve"
                >
                  <span>{lang.label}</span>
                  {selected && <Check size={15} aria-hidden="true" className="text-mauve" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

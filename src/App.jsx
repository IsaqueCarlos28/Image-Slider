import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Background from './components/Background.jsx';
import ImageSlider from './components/ImageSlider.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import { slides } from './data/slides.js';

export default function App() {
  const { t } = useTranslation();
  const [, setIndex] = useState(2);

  const next = () => setIndex((current) => (current + 1) % slides.length);
  const previous = () => setIndex((current) => (current - 1 + slides.length) % slides.length);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-hidden text-ink">
      <Background />
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <header className="flex items-center justify-between border-b border-violet-100 py-8">
          <div className="flex items-center">
            <div className="flex h-20 items-center">
              <img
                className="size-20 transition-[width,height] duration-300 ease-out hover:size-25 motion-reduce:transition-none"
                src="/nox_respirando.svg"
                alt={t('app.logoAlt')}
              />
            </div>
            <strong className="text-mauve tracking-[.24em]">WILD / STORIES</strong>
          </div>
          <div className="flex items-center gap-4">
            <nav aria-label={t('app.navAria')} className="text-xs font-semibold tracking-widest text-slate-500">
              {t('app.nav')}
            </nav>
            <LanguageSwitcher />
          </div>
        </header>
        <main className="grid gap-16 py-20 lg:grid-cols-2 lg:items-center lg:gap-20">
          <section aria-label={t('app.presentAria')} className="space-y-7">
            <p className="text-xs font-bold tracking-[.2em] text-violet-600">
              {t('app.hero')}
            </p>
            <h1 className="max-w-xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              {t('app.heading')}
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-slate-500">
              {t('app.subtitle')}
            </p>
          </section>
          <ImageSlider />
        </main>
        <footer className="py-10 text-xs font-semibold tracking-widest text-slate-400">
          {t('app.footer')}
        </footer>
      </div>
    </div>
  );
}

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SliderControls({ index = 2, total = 5 }) {
  const { t } = useTranslation();
  const pad = (value) => String(value).padStart(2, '0');

  return (
    <div className="mt-8 flex items-center gap-3" role="group" aria-label={t('app.controlsAria')}>
      <button type="button" aria-label={t('app.previous')}
        className="grid size-13 place-items-center rounded-2xl border border-violet-100 bg-white text-mauve shadow-sm">
        <ArrowLeft size={20} />
      </button>
      <button type="button" aria-label={t('app.next')}
        className="grid size-13 place-items-center rounded-2xl bg-mauve text-white shadow-sm">
        <ArrowRight size={20} />
      </button>
      <span aria-live="polite" className="ml-auto text-sm font-bold text-mauve">
        {pad(index + 1)} / {pad(total)}
      </span>
    </div>
  );
}

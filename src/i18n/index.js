import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import ptBR from './locales/pt-BR.json';

// Idiomas disponíveis no seletor da página.
export const languages = [
  { code: 'pt-BR', label: 'Português (BR)' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];

const STORAGE_KEY = 'i18nextLng';
const DEFAULT_LANGUAGE = 'pt-BR';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    'pt-BR': { translation: ptBR },
  },
  lng: localStorage.getItem(STORAGE_KEY) || DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: languages.map((lang) => lang.code),
  interpolation: { escapeValue: false },
});

// Mantém <html lang> e o título da aba sincronizados com o idioma ativo.
const syncDocument = (language) => {
  document.documentElement.lang = language;
  document.title = i18n.t('app.title');
};

i18n.on('languageChanged', syncDocument);
syncDocument(i18n.language);

export default i18n;

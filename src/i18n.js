import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from "./locales/en.json";
import fa from "./locales/fa.json";

const storedLang = localStorage.getItem('language') || 'en';
document.documentElement.dir = storedLang === 'fa' ? 'rtl' : 'ltr';
document.documentElement.lang = storedLang;

// i18n
//   .use(initReactI18next)
//   .init({
//     lng: storedLang,
//     fallbackLng: storedLang,
//     debug: true,
//     interpolation: { escapeValue: false },
//     resources: {
//       en: { translation: en },
//       fa: { translation: fa },
//     },
//   });

i18n
  .use(initReactI18next)
  .init({
    lng: storedLang,
    fallbackLng: 'en',
    debug: true,
    interpolation: { 
      escapeValue: false
    },
    resources: {
      en: { translation: en },
      fa: { translation: fa },
    },
  });

export default i18n;

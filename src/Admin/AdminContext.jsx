import { createContext, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { labels } from './i18n';

const AdminContext = createContext(null);

// لغة اللوحة مرتبطة بـ i18next الخاص بالموقع
export function AdminProvider({ children }) {
  const { i18n } = useTranslation();
  const lang = String(i18n.language || 'ar').startsWith('ar') ? 'ar' : 'en';

  const value = {
    lang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    tr: (key) => labels[lang][key] ?? key,
    toggleLang: () => i18n.changeLanguage(lang === 'ar' ? 'en' : 'ar'),
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export const useAdmin = () => useContext(AdminContext);
export const bySort = (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0);

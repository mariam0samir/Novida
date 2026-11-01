import { createContext, useContext, useState } from 'react';
import * as mock from './data/adminData';
import { labels } from './i18n';

const AdminContext = createContext(null);

const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
export const bySort = (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0);

export function AdminProvider({ children }) {
  const [lang, setLang] = useState('ar');
  const [data, setData] = useState({
    news: mock.news,
    projects: mock.projects,
    leadership: mock.leadership,
    reports: mock.reports,
    about: mock.about,
  });
  const [chairman, setChairman] = useState(mock.chairman);

  const value = {
    lang,
    setLang,
    dir: lang === 'ar' ? 'rtl' : 'ltr',
    tr: (key) => labels[lang][key] ?? key,
    data,
    setData,
    chairman,
    setChairman,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export const useAdmin = () => useContext(AdminContext);

/**
 * إدارة مجموعة بيانات (news / projects / leadership / reports / about).
 * عند الربط مع Supabase: استبدل محتوى save / remove / toggle / move
 * باستدعاءات supabase.from(key) مع الإبقاء على نفس الواجهة.
 */
export function useCollection(key) {
  const { data, setData } = useAdmin();
  const update = (fn) => setData((d) => ({ ...d, [key]: fn(d[key]) }));

  return {
    items: data[key],

    save(item) {
      update((list) => {
        if (item.id) return list.map((x) => (x.id === item.id ? item : x));
        const created = { ...item, id: newId() };
        if ('sort_order' in item) {
          created.sort_order = list.reduce((m, x) => Math.max(m, x.sort_order ?? 0), 0) + 1;
        }
        return [...list, created];
      });
    },

    remove(id) {
      update((list) => list.filter((x) => x.id !== id));
    },

    toggle(id) {
      update((list) => list.map((x) => (x.id === id ? { ...x, active: !x.active } : x)));
    },

    move(id, dir) {
      update((list) => {
        const sorted = [...list].sort(bySort);
        const i = sorted.findIndex((x) => x.id === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= sorted.length) return list;
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
        return sorted.map((x, k) => ({ ...x, sort_order: k + 1 }));
      });
    },
  };
}

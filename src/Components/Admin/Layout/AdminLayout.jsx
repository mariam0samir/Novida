import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminProvider, useAdmin } from '../AdminContext';
import { ADMIN_PRIMARY, ADMIN_FONT } from '../adminTheme';
import AdminSidebar from './AdminSidebar';
import Icon from '../components/Icon';

export default function AdminLayout() {
  return (
    <AdminProvider>
      <AdminShell />
    </AdminProvider>
  );
}

function AdminShell() {
  const { dir, lang, setLang, tr } = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      dir={dir}
      lang={lang}
      style={{ '--admin-primary': ADMIN_PRIMARY, fontFamily: ADMIN_FONT }}
      className="min-h-screen bg-gray-50 text-gray-800"
    >
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="lg:ps-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-8">
          <button
            type="button"
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="menu"
          >
            <Icon name="menu" className="h-5 w-5" />
          </button>
          <span className="hidden text-sm text-gray-500 lg:block">{tr('adminPanel')}</span>
          <button
            type="button"
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </button>
        </header>

        <main className="mx-auto max-w-6xl p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../AdminContext';
import { signOut } from '../../services/adminApi';
import Icon from '../components/Icon';

const links = [
  { to: '/admin', key: 'dashboard', icon: 'dashboard', end: true },
  { to: '/admin/sectors', key: 'sectors', icon: 'sectors' },
  { to: '/admin/projects', key: 'projects', icon: 'projects' },
  { to: '/admin/news', key: 'news', icon: 'news' },
  { to: '/admin/leadership', key: 'leaders', icon: 'leadership' },
  { to: '/admin/reports', key: 'reports', icon: 'reports' },
  { to: '/admin/sector-showcase', key: 'sector_showcase', icon: 'showcase' },
  { to: '/admin/about', key: 'about_sections', icon: 'about' },
  { to: '/admin/chairman', key: 'chairman_message', icon: 'chairman' },
  { to: '/admin/settings', key: 'site_settings', icon: 'about' },
  { to: '/admin/ir-pages', label: { ar: 'صفحات علاقات المستثمرين', en: 'IR pages' }, icon: 'reports' },
  { to: '/admin/ir-content', label: { ar: 'محتوى علاقات المستثمرين', en: 'IR content' }, icon: 'file' },
  { to: '/admin/ir-stock', label: { ar: 'بيانات السهم', en: 'Stock data' }, icon: 'dashboard' },
];

export default function AdminSidebar({ open, onClose }) {
  const { tr, lang } = useAdmin();
  const navigate = useNavigate();

  const logout = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-gray-900/30 lg:hidden" onClick={onClose} />}

      <aside className={`${open ? 'flex' : 'hidden'} fixed inset-y-0 start-0 z-50 w-64 flex-col border-e border-gray-200 bg-white lg:flex`}>
        <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-5">
          <span className="text-lg font-bold tracking-wide text-[var(--admin-primary)]">NOVIDA</span>
          <span className="text-xs text-gray-400">{tr('adminPanel')}</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                  isActive ? 'bg-gray-100 font-semibold text-[var(--admin-primary)]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon name={l.icon} className="h-[18px] w-[18px] shrink-0" />
              {l.label ? l.label[lang] : tr(l.key)}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-200 p-3">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600"
          >
            <Icon name="logout" className="h-[18px] w-[18px]" />
            {tr('logout')}
          </button>
        </div>
      </aside>
    </>
  );
}

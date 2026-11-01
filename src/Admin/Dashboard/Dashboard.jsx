import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../AdminContext';
import { countItems, TABLES } from '../../services/adminApi';
import Icon from '../components/Icon';
import ErrorBanner from '../components/ErrorBanner';

const STATS = [
  { key: 'sectors', table: TABLES.sectors, to: '/admin/sectors', icon: 'sectors' },
  { key: 'projects', table: TABLES.projects, to: '/admin/projects', icon: 'projects' },
  { key: 'news', table: TABLES.news, to: '/admin/news', icon: 'news' },
  { key: 'leaders', table: TABLES.leaders, to: '/admin/leadership', icon: 'leadership' },
  { key: 'boardReports', table: TABLES.reports, filter: { report_type: 'board' }, to: '/admin/reports?type=board', icon: 'reports' },
  { key: 'gaReports', table: TABLES.reports, filter: { report_type: 'general_assembly' }, to: '/admin/reports?type=general_assembly', icon: 'file' },
  { key: 'sector_showcase', table: TABLES.sector_showcase, to: '/admin/sector-showcase', icon: 'showcase' },
  { key: 'about_sections', table: TABLES.about_sections, to: '/admin/about', icon: 'about' },
];

export default function Dashboard() {
  const { tr } = useAdmin();
  const [counts, setCounts] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    Promise.all(STATS.map((s) => countItems(s.table, s.filter)))
      .then((values) => alive && setCounts(Object.fromEntries(STATS.map((s, i) => [s.key, values[i]]))))
      .catch((e) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">{tr('dashboard')}</h1>
      {error && <div className="mb-4"><ErrorBanner message={error} /></div>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STATS.map((s) => (
          <Link
            key={s.key}
            to={s.to}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-[var(--admin-primary)]"
          >
            <div>
              <p className="text-sm text-gray-500">{tr(s.key)}</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{counts[s.key] ?? '–'}</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 text-[var(--admin-primary)]">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

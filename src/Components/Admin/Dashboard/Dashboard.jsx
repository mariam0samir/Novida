import { Link } from 'react-router-dom';
import { useAdmin } from '../AdminContext';
import Icon from '../components/Icon';

export default function Dashboard() {
  const { tr, data } = useAdmin();

  const stats = [
    { label: tr('news'), value: data.news.length, to: '/admin/news', icon: 'news' },
    { label: tr('projects'), value: data.projects.length, to: '/admin/projects', icon: 'projects' },
    { label: tr('boardReports'), value: data.reports.filter((r) => r.type === 'board').length, to: '/admin/reports?type=board', icon: 'reports' },
    { label: tr('gaReports'), value: data.reports.filter((r) => r.type === 'general_assembly').length, to: '/admin/reports?type=general_assembly', icon: 'file' },
    { label: tr('boardMembers'), value: data.leadership.length, to: '/admin/leadership', icon: 'leadership' },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-bold text-gray-900">{tr('dashboard')}</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:border-[var(--admin-primary)]"
          >
            <div>
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{s.value}</p>
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

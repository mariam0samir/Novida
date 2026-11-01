import { useAdmin } from '../AdminContext';
import EmptyState from './EmptyState';

/**
 * columns: [{ label, render: (row) => node, className }]
 * actions: (row, index) => node
 */
export default function DataTable({ columns, rows, actions, loading, minWidth = 680 }) {
  const { tr } = useAdmin();

  if (loading && rows.length === 0) {
    return <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">{tr('loading')}</div>;
  }
  if (rows.length === 0) return <EmptyState />;

  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm ${loading ? 'opacity-60' : ''}`}>
      <table className="w-full text-sm" style={{ minWidth }}>
        <thead className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
          <tr>
            {columns.map((c, i) => (
              <th key={i} className="px-4 py-3 text-start font-medium">{c.label}</th>
            ))}
            {actions && <th className="px-4 py-3 text-end font-medium">{tr('actions')}</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, ri) => (
            <tr key={row.id} className={row.active === false ? 'bg-gray-50/70' : ''}>
              {columns.map((c, ci) => (
                <td key={ci} className={`px-4 py-3 align-middle ${c.className || 'text-gray-600'}`}>{c.render(row)}</td>
              ))}
              {actions && (
                <td className="px-4 py-3">
                  <div className="flex justify-end">{actions(row, ri)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Thumb({ src, round = false }) {
  return (
    <div className={`shrink-0 overflow-hidden border border-gray-200 bg-gray-50 ${round ? 'h-10 w-10 rounded-full' : 'h-10 w-14 rounded-md'}`}>
      {src && <img src={src} alt="" className="h-full w-full object-cover" />}
    </div>
  );
}

export function TitleCell({ image, title, subtitle, round }) {
  return (
    <div className="flex items-center gap-3">
      <Thumb src={image} round={round} />
      <div className="min-w-0 max-w-xs">
        <p className="truncate font-medium text-gray-900">{title}</p>
        {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

import { useAdmin } from '../AdminContext';

export default function StatusBadge({ active }) {
  const { tr } = useAdmin();
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-green-500' : 'bg-gray-400'}`} />
      {active ? tr('active') : tr('hidden')}
    </span>
  );
}

import { useAdmin } from '../AdminContext';

export default function EmptyState() {
  const { tr } = useAdmin();
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-sm text-gray-500">
      {tr('empty')}
    </div>
  );
}

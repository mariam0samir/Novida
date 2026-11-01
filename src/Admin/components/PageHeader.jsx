import { useAdmin } from '../AdminContext';
import { PrimaryButton } from './Buttons';
import Icon from './Icon';

export default function PageHeader({ title, count, onAdd, addLabel }) {
  const { tr } = useAdmin();
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {count !== undefined && <p className="mt-0.5 text-sm text-gray-500">{count} {tr('items')}</p>}
      </div>
      {onAdd && (
        <PrimaryButton type="button" onClick={onAdd}>
          <Icon name="plus" />
          {addLabel || tr('addNew')}
        </PrimaryButton>
      )}
    </div>
  );
}

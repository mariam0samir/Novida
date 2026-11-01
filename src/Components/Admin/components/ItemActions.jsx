import { useAdmin } from '../AdminContext';
import Icon from './Icon';

const btn = 'rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-30 disabled:hover:bg-transparent';

/** أزرار: ترتيب (اختياري) - تفعيل/إخفاء - تعديل - حذف */
export default function ItemActions({ item, onEdit, onToggle, onDelete, onMove, isFirst, isLast }) {
  const { tr } = useAdmin();
  const confirmDelete = () => window.confirm(tr('confirmDelete')) && onDelete(item.id);

  return (
    <div className="flex items-center gap-0.5">
      {onMove && (
        <>
          <button type="button" className={btn} title={tr('moveUp')} disabled={isFirst} onClick={() => onMove(item.id, -1)}>
            <Icon name="up" />
          </button>
          <button type="button" className={btn} title={tr('moveDown')} disabled={isLast} onClick={() => onMove(item.id, 1)}>
            <Icon name="down" />
          </button>
          <span className="mx-1 h-4 w-px bg-gray-200" />
        </>
      )}
      <button type="button" className={btn} title={item.active ? tr('hide') : tr('show')} onClick={() => onToggle(item.id)}>
        <Icon name={item.active ? 'eye' : 'eyeOff'} />
      </button>
      <button type="button" className={btn} title={tr('edit')} onClick={() => onEdit(item)}>
        <Icon name="edit" />
      </button>
      <button type="button" className={`${btn} hover:!bg-red-50 hover:!text-red-600`} title={tr('delete')} onClick={confirmDelete}>
        <Icon name="trash" />
      </button>
    </div>
  );
}

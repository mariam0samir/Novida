import { useState } from 'react';
import { useAdmin } from '../AdminContext';
import Modal from './Modal';
import { SecondaryButton } from './Buttons';
import Icon from './Icon';

const btn = 'rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:opacity-30 disabled:hover:bg-transparent';

/** أزرار: ترتيب (اختياري) - تفعيل/إخفاء - تعديل - حذف */
export default function ItemActions({ item, onEdit, onToggle, onDelete, onMove, isFirst, isLast }) {
  const { tr } = useAdmin();
  const [confirming, setConfirming] = useState(false);

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
      <button type="button" className={btn} title={item.active ? tr('hide') : tr('show')} onClick={() => onToggle(item)}>
        <Icon name={item.active ? 'eye' : 'eyeOff'} />
      </button>
      <button type="button" className={btn} title={tr('edit')} onClick={() => onEdit(item)}>
        <Icon name="edit" />
      </button>
      <button type="button" className={`${btn} hover:!bg-red-50 hover:!text-red-600`} title={tr('delete')} onClick={() => setConfirming(true)}>
        <Icon name="trash" />
      </button>

      <Modal
        open={confirming}
        size="max-w-sm"
        title={tr('delete')}
        onClose={() => setConfirming(false)}
        footer={
          <>
            <SecondaryButton onClick={() => setConfirming(false)}>{tr('cancel')}</SecondaryButton>
            <button
              type="button"
              onClick={() => { setConfirming(false); onDelete(item); }}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              {tr('delete')}
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-600">{tr('confirmDelete')}</p>
      </Modal>
    </div>
  );
}

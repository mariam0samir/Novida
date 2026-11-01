import { useEffect } from 'react';
import Icon from './Icon';

export default function Modal({ open, title, onClose, children, footer, size = 'max-w-3xl' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/30 p-4" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className={`mx-auto my-6 w-full ${size} rounded-xl border border-gray-200 bg-white shadow-sm`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <Icon name="close" />
          </button>
        </div>
        <div className="space-y-5 p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-gray-100 px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}

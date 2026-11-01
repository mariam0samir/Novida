import { useState } from 'react';
import { useAdmin } from '../AdminContext';

const pickBtn =
  'inline-flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50';

// TODO Supabase: ارفع الملف إلى Storage ثم مرّر الـ public URL بدلاً من createObjectURL
const toLocalUrl = (file) => URL.createObjectURL(file);

export function ImageUpload({ label, value, onChange, round = false }) {
  const { tr } = useAdmin();
  const handle = (e) => {
    const f = e.target.files?.[0];
    if (f) onChange(toLocalUrl(f));
    e.target.value = '';
  };
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-gray-600">{label}</span>
      <div className="flex items-center gap-4">
        <div className={`shrink-0 overflow-hidden border border-gray-200 bg-gray-50 ${round ? 'h-20 w-20 rounded-full' : 'h-20 w-32 rounded-lg'}`}>
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-gray-400">{tr('noImage')}</div>
          )}
        </div>
        <div className="flex flex-col items-start gap-2">
          <label className={pickBtn}>
            {tr('chooseImage')}
            <input type="file" accept="image/*" className="hidden" onChange={handle} />
          </label>
          {value && (
            <button type="button" onClick={() => onChange('')} className="text-xs text-red-600 hover:underline">
              {tr('removeImage')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function PdfUpload({ label, value, onChange }) {
  const { tr } = useAdmin();
  const [fileName, setFileName] = useState('');
  const handle = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFileName(f.name);
      onChange(toLocalUrl(f));
    }
    e.target.value = '';
  };
  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-gray-600">{label}</span>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3">
        <label className={pickBtn}>
          {tr('chooseFile')}
          <input type="file" accept="application/pdf" className="hidden" onChange={handle} />
        </label>
        {value ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-sm text-[var(--admin-primary)] hover:underline">
            {fileName || tr('openFile')}
          </a>
        ) : (
          <span className="text-sm text-gray-400">{tr('noFile')}</span>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useAdmin } from '../AdminContext';
import { uploadFile, BUCKETS } from '../../services/adminApi';

const pickBtn =
  'inline-flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50';

/** رفع إلى Supabase Storage ثم إرجاع الـ public URL */
function useUpload(bucket, folder, onChange, onBusy) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const handle = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    onBusy?.(true);
    setError(null);
    try {
      onChange(await uploadFile(bucket, file, folder), file);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      onBusy?.(false);
    }
  };
  return { busy, error, handle };
}

export function ImageUpload({ label, value, onChange, folder, onBusy, round = false }) {
  const { tr } = useAdmin();
  const { busy, error, handle } = useUpload(BUCKETS.images, folder, (url) => onChange(url), onBusy);

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
          <label className={`${pickBtn} ${busy ? 'pointer-events-none opacity-60' : ''}`}>
            {busy ? tr('uploading') : tr('chooseImage')}
            <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={busy} />
          </label>
          {value && !busy && (
            <button type="button" onClick={() => onChange('')} className="text-xs text-red-600 hover:underline">
              {tr('removeImage')}
            </button>
          )}
          {error && <span className="text-xs text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  );
}

export function PdfUpload({ label, value, onChange, folder, onBusy }) {
  const { tr } = useAdmin();
  const [fileName, setFileName] = useState('');
  const { busy, error, handle } = useUpload(
    BUCKETS.reports,
    folder,
    (url, file) => {
      setFileName(file.name);
      onChange(url);
    },
    onBusy
  );

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-gray-600">{label}</span>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-3">
        <label className={`${pickBtn} ${busy ? 'pointer-events-none opacity-60' : ''}`}>
          {busy ? tr('uploading') : tr('chooseFile')}
          <input type="file" accept="application/pdf" className="hidden" onChange={handle} disabled={busy} />
        </label>
        {value ? (
          <a href={value} target="_blank" rel="noreferrer" className="text-sm text-[var(--admin-primary)] hover:underline">
            {fileName || tr('openFile')}
          </a>
        ) : (
          <span className="text-sm text-gray-400">{tr('noFile')}</span>
        )}
        {error && <span className="w-full text-xs text-red-600">{error}</span>}
      </div>
    </div>
  );
}

/** عدة صور (معرض) — القيمة Array من الروابط */
export function GalleryUpload({ label, hint, value, onChange, folder, onBusy }) {
  const { tr } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const images = Array.isArray(value) ? value : [];

  const handle = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (!files.length) return;
    setBusy(true);
    onBusy?.(true);
    setError(null);
    try {
      const urls = [];
      for (const f of files) urls.push(await uploadFile(BUCKETS.images, f, folder));
      onChange([...images, ...urls]);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
      onBusy?.(false);
    }
  };

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium text-gray-600">{label}</span>
      {hint && <p className="mb-2 text-xs text-gray-400">{hint}</p>}
      <div className="flex flex-wrap gap-3">
        {images.map((url, i) => (
          <div key={url + i} className="relative h-20 w-28 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
            <img src={url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, k) => k !== i))}
              className="absolute end-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs text-red-600 shadow-sm hover:bg-white"
              aria-label={tr('removeImage')}
            >
              ✕
            </button>
          </div>
        ))}
        <label className={`flex h-20 w-28 cursor-pointer items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-center text-xs text-gray-600 hover:bg-gray-50 ${busy ? 'pointer-events-none opacity-60' : ''}`}>
          {busy ? tr('uploading') : `+ ${tr('addImages')}`}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handle} disabled={busy} />
        </label>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

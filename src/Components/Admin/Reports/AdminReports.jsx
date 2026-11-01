import { useSearchParams } from 'react-router-dom';
import { useAdmin, useCollection } from '../AdminContext';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import ItemActions from '../components/ItemActions';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import Icon from '../components/Icon';
import { Bilingual, Input, Select, ActiveSwitch } from '../components/FormFields';
import { PdfUpload } from '../components/UploadFields';

const TYPES = ['board', 'general_assembly'];
const today = () => new Date().toISOString().slice(0, 10);
const empty = { type: 'board', title_ar: '', title_en: '', date: today(), year: String(new Date().getFullYear()), file_url: '', active: true };

export default function AdminReports() {
  const { tr, lang } = useAdmin();
  const { items, save, remove, toggle } = useCollection('reports');
  const editor = useEditor(empty);
  const [params, setParams] = useSearchParams();
  const type = TYPES.includes(params.get('type')) ? params.get('type') : 'board';
  const set = (k) => (v) => editor.setForm((f) => ({ ...f, [k]: v }));

  const list = items.filter((r) => r.type === type).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <PageHeader title={tr('reports')} count={items.length} onAdd={() => editor.openNew({ type })} addLabel={tr('addReport')} />

      <div className="mb-4 inline-flex rounded-lg border border-gray-200 bg-white p-1">
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setParams({ type: t })}
            className={`rounded-md px-4 py-1.5 text-sm ${
              t === type ? 'bg-[var(--admin-primary)] font-medium text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {tr(t)} ({items.filter((r) => r.type === t).length})
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3 text-start font-medium">{tr('title_' + lang)}</th>
                <th className="px-4 py-3 text-start font-medium">{tr('year')}</th>
                <th className="px-4 py-3 text-start font-medium">{tr('date')}</th>
                <th className="px-4 py-3 text-start font-medium">{tr('file')}</th>
                <th className="px-4 py-3 text-start font-medium">{tr('status')}</th>
                <th className="px-4 py-3 text-end font-medium">{tr('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {list.map((r) => (
                <tr key={r.id}>
                  <td className="px-4 py-3 font-medium text-gray-900">{r[`title_${lang}`]}</td>
                  <td className="px-4 py-3 text-gray-600">{r.year}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">{r.date}</td>
                  <td className="px-4 py-3">
                    {r.file_url ? (
                      <a href={r.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[var(--admin-primary)] hover:underline">
                        <Icon name="file" /> PDF
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3"><StatusBadge active={r.active} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <ItemActions item={r} onEdit={editor.openEdit} onToggle={toggle} onDelete={remove} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FormModal editor={editor} title={editor.isNew ? tr('addReport') : tr('editReport')} onSubmit={save}>
        <Select label={tr('type')} options={TYPES.map((t) => ({ value: t, label: tr(t) }))} {...editor.bind('type')} />
        <Bilingual editor={editor} name="title" required />
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            type="date"
            label={tr('date')}
            required
            value={editor.form?.date ?? ''}
            onChange={(e) => editor.setForm((f) => ({ ...f, date: e.target.value, year: e.target.value.slice(0, 4) || f.year }))}
          />
          <Input type="number" label={tr('year')} min="1990" max="2100" required {...editor.bind('year')} />
        </div>
        <PdfUpload label={tr('file')} value={editor.form?.file_url} onChange={set('file_url')} />
        <ActiveSwitch checked={editor.form?.active} onChange={set('active')} />
      </FormModal>
    </div>
  );
}

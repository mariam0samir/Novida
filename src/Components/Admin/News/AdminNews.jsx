import { useAdmin, useCollection } from '../AdminContext';
import { newsCategories } from '../data/adminData';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import ItemActions from '../components/ItemActions';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { Bilingual, Input, Select, ActiveSwitch } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

const empty = {
  title_ar: '', title_en: '', description_ar: '', description_en: '',
  content_ar: '', content_en: '', image_url: '',
  date: new Date().toISOString().slice(0, 10),
  category: newsCategories[0].value, active: true,
};

export default function AdminNews() {
  const { tr, lang } = useAdmin();
  const { items, save, remove, toggle } = useCollection('news');
  const editor = useEditor(empty);
  const set = (k) => (v) => editor.setForm((f) => ({ ...f, [k]: v }));

  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
  const categoryLabel = (v) => newsCategories.find((c) => c.value === v)?.[lang] ?? v;

  return (
    <div>
      <PageHeader title={tr('news')} count={items.length} onAdd={() => editor.openNew()} addLabel={tr('addNews')} />

      {sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3 text-start font-medium">{tr('title_' + lang)}</th>
                <th className="px-4 py-3 text-start font-medium">{tr('category')}</th>
                <th className="px-4 py-3 text-start font-medium">{tr('date')}</th>
                <th className="px-4 py-3 text-start font-medium">{tr('status')}</th>
                <th className="px-4 py-3 text-end font-medium">{tr('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sorted.map((n) => (
                <tr key={n.id} className={n.active ? '' : 'bg-gray-50/60'}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-16 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                        {n.image_url && <img src={n.image_url} alt="" className="h-full w-full object-cover" />}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900">{n[`title_${lang}`]}</p>
                        <p className="truncate text-xs text-gray-500">{n[`description_${lang}`]}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{categoryLabel(n.category)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">{n.date}</td>
                  <td className="px-4 py-3"><StatusBadge active={n.active} /></td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <ItemActions item={n} onEdit={editor.openEdit} onToggle={toggle} onDelete={remove} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FormModal editor={editor} title={editor.isNew ? tr('addNews') : tr('editNews')} onSubmit={save}>
        <Bilingual editor={editor} name="title" required />
        <Bilingual editor={editor} name="description" labelKey="shortDesc" textarea rows={2} />
        <Bilingual editor={editor} name="content" textarea rows={6} />
        <div className="grid gap-4 md:grid-cols-2">
          <Input type="date" label={tr('date')} required {...editor.bind('date')} />
          <Select
            label={tr('category')}
            options={newsCategories.map((c) => ({ value: c.value, label: c[lang] }))}
            {...editor.bind('category')}
          />
        </div>
        <ImageUpload label={tr('image')} value={editor.form?.image_url} onChange={set('image_url')} />
        <ActiveSwitch checked={editor.form?.active} onChange={set('active')} />
      </FormModal>
    </div>
  );
}

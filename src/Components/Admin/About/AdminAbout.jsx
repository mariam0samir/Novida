import { useAdmin, useCollection, bySort } from '../AdminContext';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import ItemActions from '../components/ItemActions';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { Bilingual, Select, ActiveSwitch } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

const empty = { title_ar: '', title_en: '', description_ar: '', description_en: '', image_url: '', image_position: 'left', sort_order: 0, active: true };

export default function AdminAbout() {
  const { tr, lang } = useAdmin();
  const { items, save, remove, toggle, move } = useCollection('about');
  const editor = useEditor(empty);
  const set = (k) => (v) => editor.setForm((f) => ({ ...f, [k]: v }));
  const sorted = [...items].sort(bySort);

  return (
    <div>
      <PageHeader title={tr('about')} count={items.length} onAdd={() => editor.openNew()} addLabel={tr('addSection')} />

      {sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {sorted.map((s, i) => (
            <div key={s.id} className={`flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center ${s.active ? '' : 'opacity-60'}`}>
              <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 sm:w-32">
                {s.image_url && <img src={s.image_url} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-400">#{s.sort_order}</span>
                  <h3 className="font-semibold text-gray-900">{s[`title_${lang}`]}</h3>
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                    {tr('imagePosition')}: {tr(s.image_position)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-gray-500">{s[`description_${lang}`]}</p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <StatusBadge active={s.active} />
                <ItemActions
                  item={s}
                  onEdit={editor.openEdit}
                  onToggle={toggle}
                  onDelete={remove}
                  onMove={move}
                  isFirst={i === 0}
                  isLast={i === sorted.length - 1}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal editor={editor} title={editor.isNew ? tr('addSection') : tr('editSection')} onSubmit={save}>
        <Bilingual editor={editor} name="title" required />
        <Bilingual editor={editor} name="description" textarea rows={5} />
        <div className="grid items-end gap-4 md:grid-cols-2">
          <ImageUpload label={tr('image')} value={editor.form?.image_url} onChange={set('image_url')} />
          <Select
            label={tr('imagePosition')}
            options={[{ value: 'left', label: tr('left') }, { value: 'right', label: tr('right') }]}
            {...editor.bind('image_position')}
          />
        </div>
        <ActiveSwitch checked={editor.form?.active} onChange={set('active')} />
      </FormModal>
    </div>
  );
}

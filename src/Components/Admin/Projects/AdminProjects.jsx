import { useAdmin, useCollection, bySort } from '../AdminContext';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import ItemActions from '../components/ItemActions';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { Bilingual, ActiveSwitch } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

const empty = { title_ar: '', title_en: '', description_ar: '', description_en: '', image_url: '', sort_order: 0, active: true };

export default function AdminProjects() {
  const { tr, lang } = useAdmin();
  const { items, save, remove, toggle, move } = useCollection('projects');
  const editor = useEditor(empty);
  const set = (k) => (v) => editor.setForm((f) => ({ ...f, [k]: v }));
  const sorted = [...items].sort(bySort);

  return (
    <div>
      <PageHeader title={tr('projects')} count={items.length} onAdd={() => editor.openNew()} addLabel={tr('addProject')} />

      {sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((p, i) => (
            <div key={p.id} className={`overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ${p.active ? '' : 'opacity-60'}`}>
              <div className="aspect-[16/9] bg-gray-50">
                {p.image_url && <img src={p.image_url} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900">{p[`title_${lang}`]}</h3>
                  <span className="shrink-0 text-xs text-gray-400">#{p.sort_order}</span>
                </div>
                <p className="line-clamp-2 text-sm text-gray-500">{p[`description_${lang}`]}</p>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <StatusBadge active={p.active} />
                  <ItemActions
                    item={p}
                    onEdit={editor.openEdit}
                    onToggle={toggle}
                    onDelete={remove}
                    onMove={move}
                    isFirst={i === 0}
                    isLast={i === sorted.length - 1}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormModal editor={editor} title={editor.isNew ? tr('addProject') : tr('editProject')} onSubmit={save}>
        <Bilingual editor={editor} name="title" required />
        <Bilingual editor={editor} name="description" textarea rows={4} />
        <ImageUpload label={tr('image')} value={editor.form?.image_url} onChange={set('image_url')} />
        <ActiveSwitch checked={editor.form?.active} onChange={set('active')} />
      </FormModal>
    </div>
  );
}

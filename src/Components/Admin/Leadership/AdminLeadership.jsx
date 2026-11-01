import { useAdmin, useCollection, bySort } from '../AdminContext';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import ItemActions from '../components/ItemActions';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { Bilingual, ActiveSwitch } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

const empty = { name_ar: '', name_en: '', position_ar: '', position_en: '', image_url: '', sort_order: 0, active: true };

export default function AdminLeadership() {
  const { tr, lang } = useAdmin();
  const { items, save, remove, toggle, move } = useCollection('leadership');
  const editor = useEditor(empty);
  const set = (k) => (v) => editor.setForm((f) => ({ ...f, [k]: v }));
  const sorted = [...items].sort(bySort);

  return (
    <div>
      <PageHeader title={tr('leadership')} count={items.length} onAdd={() => editor.openNew()} addLabel={tr('addMember')} />

      {sorted.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sorted.map((m, i) => (
            <div key={m.id} className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm ${m.active ? '' : 'opacity-60'}`}>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 text-lg font-semibold text-[var(--admin-primary)]">
                  {m.image_url ? <img src={m.image_url} alt="" className="h-full w-full object-cover" /> : (m[`name_${lang}`] || '?').charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-gray-900">{m[`name_${lang}`]}</h3>
                  <p className="truncate text-sm text-gray-500">{m[`position_${lang}`]}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <StatusBadge active={m.active} />
                <ItemActions
                  item={m}
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

      <FormModal editor={editor} title={editor.isNew ? tr('addMember') : tr('editMember')} onSubmit={save}>
        <Bilingual editor={editor} name="name" required />
        <Bilingual editor={editor} name="position" />
        <ImageUpload label={tr('image')} round value={editor.form?.image_url} onChange={set('image_url')} />
        <ActiveSwitch checked={editor.form?.active} onChange={set('active')} />
      </FormModal>
    </div>
  );
}

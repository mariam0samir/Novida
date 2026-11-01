import { useAdmin, bySort } from '../AdminContext';
import { TABLES } from '../../services/adminApi';
import useTable from '../hooks/useTable';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import DataTable, { TitleCell } from '../components/DataTable';
import SortableActions from '../components/SortableActions';
import StatusBadge from '../components/StatusBadge';
import ErrorBanner from '../components/ErrorBanner';
import { Bilingual, Input, ActiveSwitch } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

const empty = { name_ar: '', name_en: '', position_ar: '', position_en: '', bio_ar: '', bio_en: '', image_url: '', sort_order: 1, active: true };

export default function AdminLeadership() {
  const { tr, lang } = useAdmin();
  const table = useTable(TABLES.leaders);
  const editor = useEditor(empty);
  const rows = [...table.items].sort(bySort);

  return (
    <div>
      <PageHeader title={tr('leaders')} count={table.items.length} onAdd={() => editor.openNew({ sort_order: table.nextOrder })} />
      {table.error && <div className="mb-4"><ErrorBanner message={table.error} /></div>}

      <DataTable
        loading={table.loading}
        rows={rows}
        columns={[
          { label: tr('name'), className: '', render: (r) => <TitleCell round image={r.image_url} title={r[`name_${lang}`]} subtitle={r[`position_${lang}`]} /> },
          { label: tr('sortOrder'), render: (r) => r.sort_order },
          { label: tr('status'), render: (r) => <StatusBadge active={r.active} /> },
        ]}
        actions={(r, i) => <SortableActions table={table} editor={editor} row={r} index={i} total={rows.length} />}
      />

      <FormModal editor={editor} title={editor.isNew ? tr('addNew') : tr('edit')} onSubmit={table.save}>
        <Bilingual editor={editor} name="name" required />
        <Bilingual editor={editor} name="position" />
        <Bilingual editor={editor} name="bio" textarea rows={5} />
        <ImageUpload round label={tr('photo')} folder="leaders" value={editor.form?.image_url} onChange={editor.set('image_url')} onBusy={editor.setUploading} />
        <Input type="number" min="0" label={tr('sortOrder')} required {...editor.bind('sort_order')} />
        <ActiveSwitch checked={editor.form?.active} onChange={editor.set('active')} />
      </FormModal>
    </div>
  );
}

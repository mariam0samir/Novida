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
import { Bilingual, Input, Select, ActiveSwitch } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

const empty = {
  title_ar: '', title_en: '', description_ar: '', description_en: '',
  image_url: '', image_position: 'left', sort_order: 1, active: true,
};

export default function AdminAbout() {
  const { tr, lang } = useAdmin();
  const table = useTable(TABLES.about_sections);
  const editor = useEditor(empty);
  const rows = [...table.items].sort(bySort);

  return (
    <div>
      <PageHeader title={tr('about_sections')} count={table.items.length} onAdd={() => editor.openNew({ sort_order: table.nextOrder })} />
      {table.error && <div className="mb-4"><ErrorBanner message={table.error} /></div>}

      <DataTable
        loading={table.loading}
        rows={rows}
        columns={[
          { label: tr('title'), className: '', render: (r) => <TitleCell image={r.image_url} title={r[`title_${lang}`]} subtitle={r[`description_${lang}`]} /> },
          { label: tr('imagePosition'), render: (r) => tr(r.image_position) },
          { label: tr('sortOrder'), render: (r) => r.sort_order },
          { label: tr('status'), render: (r) => <StatusBadge active={r.active} /> },
        ]}
        actions={(r, i) => <SortableActions table={table} editor={editor} row={r} index={i} total={rows.length} />}
      />

      <FormModal editor={editor} title={editor.isNew ? tr('addNew') : tr('edit')} onSubmit={table.save}>
        <Bilingual editor={editor} name="title" required />
        <Bilingual editor={editor} name="description" textarea rows={5} />
        <ImageUpload label={tr('image')} folder="about" value={editor.form?.image_url} onChange={editor.set('image_url')} onBusy={editor.setUploading} />
        <div className="grid gap-4 md:grid-cols-2">
          <Select
            label={tr('imagePosition')}
            options={[{ value: 'left', label: tr('left') }, { value: 'right', label: tr('right') }]}
            {...editor.bind('image_position')}
          />
          <Input type="number" min="0" label={tr('sortOrder')} required {...editor.bind('sort_order')} />
        </div>
        <ActiveSwitch checked={editor.form?.active} onChange={editor.set('active')} />
      </FormModal>
    </div>
  );
}

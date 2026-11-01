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
  sector_id: '', title_ar: '', title_en: '', subtitle_ar: '', subtitle_en: '',
  description_ar: '', description_en: '', image_url: '', sort_order: 1, active: true,
};

export default function AdminSectorShowcase() {
  const { tr, lang } = useAdmin();
  const table = useTable(TABLES.sector_showcase);
  const sectors = useTable(TABLES.sectors);
  const editor = useEditor(empty);
  const rows = [...table.items].sort(bySort);
  const sectorName = (id) => sectors.items.find((s) => s.id === id)?.[`title_${lang}`] || '—';

  return (
    <div>
      <PageHeader title={tr('sector_showcase')} count={table.items.length} onAdd={() => editor.openNew({ sort_order: table.nextOrder })} />
      {table.error && <div className="mb-4"><ErrorBanner message={table.error} /></div>}

      <DataTable
        loading={table.loading}
        rows={rows}
        columns={[
          { label: tr('title'), className: '', render: (r) => <TitleCell image={r.image_url} title={r[`title_${lang}`]} subtitle={r[`subtitle_${lang}`]} /> },
          { label: tr('sector'), render: (r) => sectorName(r.sector_id) },
          { label: tr('sortOrder'), render: (r) => r.sort_order },
          { label: tr('status'), render: (r) => <StatusBadge active={r.active} /> },
        ]}
        actions={(r, i) => <SortableActions table={table} editor={editor} row={r} index={i} total={rows.length} />}
      />

      <FormModal editor={editor} title={editor.isNew ? tr('addNew') : tr('edit')} onSubmit={table.save}>
        <Select
          label={tr('sector')}
          options={[{ value: '', label: tr('noSector') }, ...[...sectors.items].sort(bySort).map((s) => ({ value: s.id, label: s[`title_${lang}`] }))]}
          {...editor.bind('sector_id')}
        />
        <Bilingual editor={editor} name="title" required />
        <Bilingual editor={editor} name="subtitle" />
        <Bilingual editor={editor} name="description" textarea rows={4} />
        <ImageUpload label={tr('image')} folder="sector-showcase" value={editor.form?.image_url} onChange={editor.set('image_url')} onBusy={editor.setUploading} />
        <Input type="number" min="0" label={tr('sortOrder')} required {...editor.bind('sort_order')} />
        <ActiveSwitch checked={editor.form?.active} onChange={editor.set('active')} />
      </FormModal>
    </div>
  );
}

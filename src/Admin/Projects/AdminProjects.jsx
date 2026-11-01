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
import { ImageUpload, GalleryUpload } from '../components/UploadFields';

const empty = {
  sector_id: '', title_ar: '', title_en: '', description_ar: '', description_en: '',
  content_ar: '', content_en: '', location_ar: '', location_en: '',
  area_ar: '', area_en: '', status_ar: '', status_en: '', year: '',
  image_url: '', gallery: [], sort_order: 1, active: true,
};

export default function AdminProjects() {
  const { tr, lang } = useAdmin();
  const table = useTable(TABLES.projects);
  const sectors = useTable(TABLES.sectors);
  const editor = useEditor(empty);
  const rows = [...table.items].sort(bySort);
  const sectorName = (id) => sectors.items.find((s) => s.id === id)?.[`title_${lang}`] || '—';

  return (
    <div>
      <PageHeader title={tr('projects')} count={table.items.length} onAdd={() => editor.openNew({ sort_order: table.nextOrder })} />
      {table.error && <div className="mb-4"><ErrorBanner message={table.error} /></div>}

      <DataTable
        loading={table.loading}
        rows={rows}
        columns={[
          { label: tr('title'), className: '', render: (r) => <TitleCell image={r.image_url} title={r[`title_${lang}`]} subtitle={r[`description_${lang}`]} /> },
          { label: tr('sector'), render: (r) => sectorName(r.sector_id) },
          { label: tr('sortOrder'), render: (r) => r.sort_order },
          { label: tr('status'), render: (r) => <StatusBadge active={r.active} /> },
        ]}
        actions={(r, i) => <SortableActions table={table} editor={editor} row={r} index={i} total={rows.length} />}
      />

      <FormModal editor={editor} title={editor.isNew ? tr('addNew') : tr('edit')} onSubmit={table.save}>
        <Select
          label={tr('sector')}
          required
          options={[{ value: '', label: tr('chooseSector') }, ...[...sectors.items].sort(bySort).map((s) => ({ value: s.id, label: s[`title_${lang}`] }))]}
          {...editor.bind('sector_id')}
        />
        <Bilingual editor={editor} name="title" required />
        <Bilingual editor={editor} name="description" textarea rows={3} />
        <Bilingual editor={editor} name="location" />
        <Bilingual editor={editor} name="area" />
        <Bilingual editor={editor} name="status" labelKey="projectStatus" />
        <Input label={tr('deliveryYear')} placeholder="2027" {...editor.bind('year')} />
        <div>
          <Bilingual editor={editor} name="content" labelKey="projectContent" textarea rows={8} />
          <p className="mt-1 text-xs text-gray-400">{tr('detailsHint')}</p>
        </div>
        <ImageUpload label={tr('image')} folder="projects" value={editor.form?.image_url} onChange={editor.set('image_url')} onBusy={editor.setUploading} />
        <GalleryUpload label={tr('gallery')} hint={tr('galleryHint')} folder="projects-gallery" value={editor.form?.gallery} onChange={editor.set('gallery')} onBusy={editor.setUploading} />
        <Input type="number" min="0" label={tr('sortOrder')} required {...editor.bind('sort_order')} />
        <ActiveSwitch checked={editor.form?.active} onChange={editor.set('active')} />
      </FormModal>
    </div>
  );
}

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
import { Bilingual, Input, TextArea, ActiveSwitch } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

const empty = {
  title_ar: '', title_en: '', description_ar: '', description_en: '',
  label_ar: '', label_en: '', content_ar: '', content_en: '', features_ar: '', features_en: '',
  image_url: '', slug: '', sort_order: 1, active: true,
};

// عناوين خانات صفحة القطاع
const pageLabels = {
  ar: {
    pageSection: 'صفحة القطاع (بتفتح من الناف و"اكتشف القطاع")',
    label_ar: 'العنوان الصغير بالعربي (مثال: القطاع الأول)',
    label_en: 'العنوان الصغير بالإنجليزي (مثال: First Sector)',
    content_ar: 'وصف الصفحة بالعربي',
    content_en: 'وصف الصفحة بالإنجليزي',
    features_ar: 'الخدمات بالعربي (كل خدمة في سطر)',
    features_en: 'الخدمات بالإنجليزي (كل خدمة في سطر)',
  },
  en: {
    pageSection: 'Sector page (opened from the navbar and "Discover")',
    label_ar: 'Small label (Arabic)',
    label_en: 'Small label (English)',
    content_ar: 'Page text (Arabic)',
    content_en: 'Page text (English)',
    features_ar: 'Services (Arabic) — one per line',
    features_en: 'Services (English) — one per line',
  },
};

const slugify = (s) =>
  String(s || '').toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

export default function AdminSectors() {
  const { tr, lang } = useAdmin();
  const P = pageLabels[lang] || pageLabels.ar;
  const table = useTable(TABLES.sectors);
  const editor = useEditor(empty);
  const rows = [...table.items].sort(bySort);

  const save = (item) => table.save({ ...item, slug: slugify(item.slug) || slugify(item.title_en) });

  return (
    <div>
      <PageHeader title={tr('sectors')} count={table.items.length} onAdd={() => editor.openNew({ sort_order: table.nextOrder })} />
      {table.error && <div className="mb-4"><ErrorBanner message={table.error} /></div>}

      <DataTable
        loading={table.loading}
        rows={rows}
        columns={[
          { label: tr('title'), className: '', render: (r) => <TitleCell image={r.image_url} title={r[`title_${lang}`]} subtitle={r[`description_${lang}`]} /> },
          { label: 'Slug', render: (r) => <code dir="ltr" className="text-xs">{r.slug}</code> },
          { label: tr('sortOrder'), render: (r) => r.sort_order },
          { label: tr('status'), render: (r) => <StatusBadge active={r.active} /> },
        ]}
        actions={(r, i) => <SortableActions table={table} editor={editor} row={r} index={i} total={rows.length} />}
      />

      <FormModal editor={editor} title={editor.isNew ? tr('addNew') : tr('edit')} onSubmit={save}>
        <Bilingual editor={editor} name="title" required />
        <Bilingual editor={editor} name="description" textarea rows={4} />
        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-sm font-semibold text-gray-800">{P.pageSection}</h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label={P.label_ar} dir="rtl" {...editor.bind('label_ar')} />
          <Input label={P.label_en} dir="ltr" {...editor.bind('label_en')} />
          <TextArea label={P.content_ar} dir="rtl" rows={5} {...editor.bind('content_ar')} />
          <TextArea label={P.content_en} dir="ltr" rows={5} {...editor.bind('content_en')} />
          <TextArea label={P.features_ar} dir="rtl" rows={6} {...editor.bind('features_ar')} />
          <TextArea label={P.features_en} dir="ltr" rows={6} {...editor.bind('features_en')} />
        </div>
        <ImageUpload label={tr('image')} folder="sectors" value={editor.form?.image_url} onChange={editor.set('image_url')} onBusy={editor.setUploading} />
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Input label={tr('slug')} dir="ltr" placeholder="real-estate" {...editor.bind('slug')} />
            <p className="mt-1 text-xs text-gray-400">{tr('slugHint')}</p>
          </div>
          <Input type="number" min="0" label={tr('sortOrder')} required {...editor.bind('sort_order')} />
        </div>
        <ActiveSwitch checked={editor.form?.active} onChange={editor.set('active')} />
      </FormModal>
    </div>
  );
}

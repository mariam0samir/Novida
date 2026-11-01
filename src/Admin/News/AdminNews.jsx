import { useAdmin } from '../AdminContext';
import { TABLES } from '../../services/adminApi';
import useTable from '../hooks/useTable';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import DataTable, { TitleCell } from '../components/DataTable';
import ItemActions from '../components/ItemActions';
import StatusBadge from '../components/StatusBadge';
import ErrorBanner from '../components/ErrorBanner';
import { Bilingual, Input, ActiveSwitch } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

const today = () => new Date().toISOString().slice(0, 10);
const empty = {
  title_ar: '', title_en: '', excerpt_ar: '', excerpt_en: '', content_ar: '', content_en: '',
  category_ar: '', category_en: '', image_url: '', published_at: today(), active: true,
};

export default function AdminNews() {
  const { tr, lang } = useAdmin();
  const table = useTable(TABLES.news, { order: 'published_at', ascending: false });
  const editor = useEditor(empty);

  // input type="date" يحتاج YYYY-MM-DD
  const openEdit = (item) => editor.openEdit({ ...item, published_at: item.published_at?.slice(0, 10) || '' });

  return (
    <div>
      <PageHeader title={tr('news')} count={table.items.length} onAdd={() => editor.openNew({ published_at: today() })} />
      {table.error && <div className="mb-4"><ErrorBanner message={table.error} /></div>}

      <DataTable
        loading={table.loading}
        rows={table.items}
        columns={[
          { label: tr('title'), className: '', render: (r) => <TitleCell image={r.image_url} title={r[`title_${lang}`]} subtitle={r[`excerpt_${lang}`]} /> },
          { label: tr('category'), render: (r) => r[`category_${lang}`] || '—' },
          { label: tr('publishedAt'), className: 'whitespace-nowrap text-gray-600', render: (r) => r.published_at?.slice(0, 10) },
          { label: tr('status'), render: (r) => <StatusBadge active={r.active} /> },
        ]}
        actions={(r) => <ItemActions item={r} onEdit={openEdit} onToggle={table.toggle} onDelete={table.remove} />}
      />

      <FormModal editor={editor} title={editor.isNew ? tr('addNew') : tr('edit')} onSubmit={table.save}>
        <Bilingual editor={editor} name="title" required />
        <Bilingual editor={editor} name="excerpt" textarea rows={2} />
        <Bilingual editor={editor} name="content" textarea rows={7} />
        <Bilingual editor={editor} name="category" />
        <Input type="date" label={tr('publishedAt')} required {...editor.bind('published_at')} />
        <ImageUpload label={tr('image')} folder="news" value={editor.form?.image_url} onChange={editor.set('image_url')} onBusy={editor.setUploading} />
        <ActiveSwitch checked={editor.form?.active} onChange={editor.set('active')} />
      </FormModal>
    </div>
  );
}

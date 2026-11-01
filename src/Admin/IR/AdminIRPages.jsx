import { useAdmin, bySort } from '../AdminContext';
import useTable from '../hooks/useTable';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import DataTable from '../components/DataTable';
import SortableActions from '../components/SortableActions';
import StatusBadge from '../components/StatusBadge';
import ErrorBanner from '../components/ErrorBanner';
import { Input, TextArea, Select, ActiveSwitch } from '../components/FormFields';
import { IR } from './irLabels';

const empty = {
  title_ar: '', title_en: '', slug: '', page_type: 'page', link_url: '', show_stock: false,
  intro_ar: '', intro_en: '', sort_order: 1, active: true,
};

const slugify = (s) =>
  String(s || '').toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

// صفحات علاقات المستثمرين = التابات + قايمة "علاقات المستثمرين" في الناف
export default function AdminIRPages() {
  const { lang } = useAdmin();
  const L = IR[lang] || IR.ar;
  const table = useTable('ir_pages');
  const editor = useEditor(empty);
  const rows = [...table.items].sort(bySort);
  const f = editor.form || {};

  const save = (item) => table.save({ ...item, slug: slugify(item.slug) || slugify(item.title_en) || `page-${Date.now()}` });

  return (
    <div>
      <PageHeader title={L.pages} count={table.items.length} onAdd={() => editor.openNew({ sort_order: table.nextOrder })} />
      {table.error && <div className="mb-4"><ErrorBanner message={table.error} /></div>}

      <DataTable
        loading={table.loading}
        rows={rows}
        columns={[
          { label: L.title_ar.replace(' بالعربي', '').replace(' (Arabic)', ''), className: 'font-medium text-gray-900', render: (r) => r[`title_${lang}`] },
          { label: L.type, render: (r) => (r.page_type === 'link' ? `↗ ${r.link_url || ''}` : r.show_stock ? `📈 /investors/${r.slug}` : `/investors/${r.slug}`) },
          { label: L.sortOrder, render: (r) => r.sort_order },
          { label: L.status, render: (r) => <StatusBadge active={r.active} /> },
        ]}
        actions={(r, i) => <SortableActions table={table} editor={editor} row={r} index={i} total={rows.length} />}
      />

      <FormModal editor={editor} title={L.pages} onSubmit={save}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label={L.title_ar} dir="rtl" required {...editor.bind('title_ar')} />
          <Input label={L.title_en} dir="ltr" required {...editor.bind('title_en')} />
        </div>
        <Select
          label={L.page_type}
          options={[{ value: 'page', label: L.type_page }, { value: 'link', label: L.type_link }]}
          {...editor.bind('page_type')}
        />
        {f.page_type === 'link' ? (
          <div>
            <Input label={L.link_url} dir="ltr" required placeholder="/ChairmanMessage" {...editor.bind('link_url')} />
            <p className="mt-1 text-xs text-gray-400">{L.linkHint}</p>
          </div>
        ) : (
          <>
            <div>
              <Input label={L.slug} dir="ltr" placeholder="stock-overview" {...editor.bind('slug')} />
              <p className="mt-1 text-xs text-gray-400">{L.slugHint}</p>
            </div>
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={!!f.show_stock} onChange={(e) => editor.set('show_stock')(e.target.checked)} className="h-4 w-4 accent-[var(--admin-primary)]" />
              {L.show_stock}
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <TextArea label={L.intro_ar} dir="rtl" rows={3} {...editor.bind('intro_ar')} />
              <TextArea label={L.intro_en} dir="ltr" rows={3} {...editor.bind('intro_en')} />
            </div>
          </>
        )}
        <Input type="number" min="0" label={L.sortOrder} required {...editor.bind('sort_order')} />
        <ActiveSwitch checked={f.active} onChange={editor.set('active')} />
      </FormModal>
    </div>
  );
}

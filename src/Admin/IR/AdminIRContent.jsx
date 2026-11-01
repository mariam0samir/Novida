import { useState } from 'react';
import { useAdmin, bySort } from '../AdminContext';
import useTable from '../hooks/useTable';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import DataTable from '../components/DataTable';
import SortableActions from '../components/SortableActions';
import ItemActions from '../components/ItemActions';
import { moveItem } from '../../services/adminApi';
import StatusBadge from '../components/StatusBadge';
import ErrorBanner from '../components/ErrorBanner';
import { PrimaryButton } from '../components/Buttons';
import { Input, TextArea, Select, ActiveSwitch } from '../components/FormFields';
import { PdfUpload } from '../components/UploadFields';
import { IR } from './irLabels';

const emptyBlock = { block_type: 'text', title_ar: '', title_en: '', body_ar: '', body_en: '', sort_order: 1, active: true };
const today = () => new Date().toISOString().slice(0, 10);
const emptyDoc = { title_ar: '', title_en: '', doc_date: today(), year: new Date().getFullYear(), file_url: '', sort_order: 1, active: true };

// محتوى كل صفحة: أقسام (نص/قايمة/جدول/بيانات) + ملفات PDF
export default function AdminIRContent() {
  const { lang } = useAdmin();
  const L = IR[lang] || IR.ar;
  const pagesTable = useTable('ir_pages');
  const blocksTable = useTable('ir_blocks');
  const docsTable = useTable('ir_documents', { order: 'doc_date', ascending: false });
  const blockEditor = useEditor(emptyBlock);
  const docEditor = useEditor(emptyDoc);

  const pages = [...pagesTable.items].sort(bySort).filter((p) => p.page_type !== 'link');
  const [pickedId, setPickedId] = useState('');
  const pageId = pickedId || pages[0]?.id || '';
  const page = pages.find((p) => p.id === pageId);

  const blocks = blocksTable.items.filter((b) => b.page_id === pageId).sort(bySort);
  const docs = docsTable.items.filter((d) => d.page_id === pageId);
  // الترتيب جوه الصفحة دي بس
  const blocksForPage = {
    ...blocksTable,
    move: async (id, dir) => {
      await moveItem('ir_blocks', blocks, id, dir);
      await blocksTable.reload();
    },
  };
  const typeLabel = (t) => L[`bt_${t}`]?.split(' (')[0] || t;
  const bf = blockEditor.form || {};

  const setDocDate = (e) => {
    const v = e.target.value;
    docEditor.setForm((f) => ({ ...f, doc_date: v, year: v ? Number(v.slice(0, 4)) : f.year }));
  };

  const error = pagesTable.error || blocksTable.error || docsTable.error;

  return (
    <div>
      <PageHeader title={L.content} />
      {error && <div className="mb-4"><ErrorBanner message={error} /></div>}

      {!pagesTable.loading && pages.length === 0 ? (
        <p className="text-sm text-gray-500">{L.noPages}</p>
      ) : (
        <>
          {/* اختيار الصفحة */}
          <div className="mb-6 flex flex-wrap gap-2">
            {pages.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPickedId(p.id)}
                className={`rounded-lg border px-3 py-1.5 text-sm ${p.id === pageId ? 'border-[var(--admin-primary)] bg-[var(--admin-primary)] text-white' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {p[`title_${lang}`]}
              </button>
            ))}
          </div>

          {page && (
            <div className="space-y-10">
              {/* الأقسام */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">{L.blocks} ({blocks.length})</h2>
                  <PrimaryButton type="button" onClick={() => blockEditor.openNew({ page_id: pageId, sort_order: blocks.length + 1 })}>+ {L.addBlock}</PrimaryButton>
                </div>
                <DataTable
                  loading={blocksTable.loading}
                  rows={blocks}
                  minWidth={560}
                  columns={[
                    { label: L.title_ar.split(' ')[0], className: 'font-medium text-gray-900', render: (r) => r[`title_${lang}`] || '—' },
                    { label: L.block_type, render: (r) => typeLabel(r.block_type) },
                    { label: L.status, render: (r) => <StatusBadge active={r.active} /> },
                  ]}
                  actions={(r, i) => <SortableActions table={blocksForPage} editor={blockEditor} row={r} index={i} total={blocks.length} />}
                />
              </div>

              {/* الملفات */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-base font-semibold text-gray-800">{L.documents} ({docs.length})</h2>
                  <PrimaryButton type="button" onClick={() => docEditor.openNew({ page_id: pageId, doc_date: today() })}>+ {L.addDocument}</PrimaryButton>
                </div>
                <DataTable
                  loading={docsTable.loading}
                  rows={docs}
                  minWidth={560}
                  columns={[
                    { label: L.title_ar.split(' ')[0], className: 'font-medium text-gray-900', render: (r) => r[`title_${lang}`] },
                    { label: L.doc_date, className: 'whitespace-nowrap text-gray-600', render: (r) => r.doc_date || '—' },
                    { label: 'PDF', render: (r) => (r.file_url ? <a href={r.file_url} target="_blank" rel="noreferrer" className="text-[var(--admin-primary)] hover:underline">PDF</a> : '—') },
                    { label: L.status, render: (r) => <StatusBadge active={r.active} /> },
                  ]}
                  actions={(r) => <ItemActions item={r} onEdit={docEditor.openEdit} onToggle={docsTable.toggle} onDelete={docsTable.remove} />}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* فورم القسم */}
      <FormModal editor={blockEditor} title={L.blocks} onSubmit={blocksTable.save}>
        <Select
          label={L.page}
          options={pages.map((p) => ({ value: p.id, label: p[`title_${lang}`] }))}
          {...blockEditor.bind('page_id')}
        />
        <Select
          label={L.block_type}
          options={['text', 'list', 'table', 'info'].map((t) => ({ value: t, label: L[`bt_${t}`] }))}
          {...blockEditor.bind('block_type')}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label={L.title_ar} dir="rtl" {...blockEditor.bind('title_ar')} />
          <Input label={L.title_en} dir="ltr" {...blockEditor.bind('title_en')} />
        </div>
        {bf.block_type === 'table' && <p className="whitespace-pre-line rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500">{L.tableHint}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          <TextArea label={L.body_ar} dir="rtl" rows={10} {...blockEditor.bind('body_ar')} />
          <TextArea label={L.body_en} dir="ltr" rows={10} {...blockEditor.bind('body_en')} />
        </div>
        <Input type="number" min="0" label={L.sortOrder} {...blockEditor.bind('sort_order')} />
        <ActiveSwitch checked={bf.active} onChange={blockEditor.set('active')} />
      </FormModal>

      {/* فورم الملف */}
      <FormModal editor={docEditor} title={L.documents} onSubmit={docsTable.save}>
        <Select
          label={L.page}
          options={pages.map((p) => ({ value: p.id, label: p[`title_${lang}`] }))}
          {...docEditor.bind('page_id')}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label={L.title_ar} dir="rtl" required {...docEditor.bind('title_ar')} />
          <Input label={L.title_en} dir="ltr" required {...docEditor.bind('title_en')} />
          <Input type="date" label={L.doc_date} value={docEditor.form?.doc_date ?? ''} onChange={setDocDate} />
          <Input type="number" label={L.year} min="1990" max="2100" {...docEditor.bind('year')} />
        </div>
        <PdfUpload label={L.file} folder="investors" value={docEditor.form?.file_url} onChange={docEditor.set('file_url')} onBusy={docEditor.setUploading} />
        <ActiveSwitch checked={docEditor.form?.active} onChange={docEditor.set('active')} />
      </FormModal>
    </div>
  );
}

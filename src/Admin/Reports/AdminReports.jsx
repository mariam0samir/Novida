import { useSearchParams } from 'react-router-dom';
import { useAdmin } from '../AdminContext';
import { TABLES } from '../../services/adminApi';
import useTable from '../hooks/useTable';
import useEditor from '../components/useEditor';
import PageHeader from '../components/PageHeader';
import FormModal from '../components/FormModal';
import DataTable from '../components/DataTable';
import ItemActions from '../components/ItemActions';
import StatusBadge from '../components/StatusBadge';
import ErrorBanner from '../components/ErrorBanner';
import Icon from '../components/Icon';
import { Bilingual, Input, Select, ActiveSwitch } from '../components/FormFields';
import { PdfUpload } from '../components/UploadFields';

const REPORT_TYPES = ['board', 'general_assembly', 'financial_statements'];

// اسم النوع الجديد (الميزانيات)
const FINANCIAL = { ar: 'الميزانيات', en: 'Financial statements' };
const today = () => new Date().toISOString().slice(0, 10);
const empty = { report_type: 'board', title_ar: '', title_en: '', report_date: today(), year: new Date().getFullYear(), file_url: '', active: true };

export default function AdminReports() {
  const { tr, lang } = useAdmin();
  const typeLabel = (t) => (t === 'financial_statements' ? FINANCIAL[lang] : tr(t));
  const table = useTable(TABLES.reports, { order: 'report_date', ascending: false });
  const editor = useEditor(empty);
  const [params, setParams] = useSearchParams();
  const reportType = REPORT_TYPES.includes(params.get('type')) ? params.get('type') : 'board';
  const rows = table.items.filter((r) => r.report_type === reportType);

  const setDate = (e) => {
    const v = e.target.value;
    editor.setForm((f) => ({ ...f, report_date: v, year: v ? Number(v.slice(0, 4)) : f.year }));
  };

  return (
    <div>
      <PageHeader title={tr('reports')} count={table.items.length} onAdd={() => editor.openNew({ report_type: reportType, report_date: today() })} />
      {table.error && <div className="mb-4"><ErrorBanner message={table.error} /></div>}

      <div className="mb-4 inline-flex rounded-lg border border-gray-200 bg-white p-1">
        {REPORT_TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setParams({ type: t })}
            className={`rounded-md px-4 py-1.5 text-sm ${t === reportType ? 'bg-[var(--admin-primary)] font-medium text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            {typeLabel(t)} ({table.items.filter((r) => r.report_type === t).length})
          </button>
        ))}
      </div>

      <DataTable
        loading={table.loading}
        rows={rows}
        columns={[
          { label: tr('title'), className: 'font-medium text-gray-900', render: (r) => r[`title_${lang}`] },
          { label: tr('year'), render: (r) => r.year },
          { label: tr('reportDate'), className: 'whitespace-nowrap text-gray-600', render: (r) => r.report_date },
          {
            label: tr('file'),
            render: (r) =>
              r.file_url ? (
                <a href={r.file_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[var(--admin-primary)] hover:underline">
                  <Icon name="file" /> PDF
                </a>
              ) : (
                <span className="text-gray-400">—</span>
              ),
          },
          { label: tr('status'), render: (r) => <StatusBadge active={r.active} /> },
        ]}
        actions={(r) => <ItemActions item={r} onEdit={editor.openEdit} onToggle={table.toggle} onDelete={table.remove} />}
      />

      <FormModal editor={editor} title={editor.isNew ? tr('addNew') : tr('edit')} onSubmit={table.save}>
        <Bilingual editor={editor} name="title" required />
        <Select label={tr('reportType')} options={REPORT_TYPES.map((t) => ({ value: t, label: typeLabel(t) }))} {...editor.bind('report_type')} />
        <div className="grid gap-4 md:grid-cols-2">
          <Input type="date" label={tr('reportDate')} required value={editor.form?.report_date ?? ''} onChange={setDate} />
          <Input type="number" label={tr('year')} min="1990" max="2100" required {...editor.bind('year')} />
        </div>
        <PdfUpload label={tr('file')} folder={editor.form?.report_type} value={editor.form?.file_url} onChange={editor.set('file_url')} onBusy={editor.setUploading} />
        <ActiveSwitch checked={editor.form?.active} onChange={editor.set('active')} />
      </FormModal>
    </div>
  );
}
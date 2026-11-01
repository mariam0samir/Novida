import { useEffect, useState } from 'react';
import { useAdmin } from '../AdminContext';
import { supabase } from '../../lib/supabaseClient';
import { createItem, updateItem } from '../../services/adminApi';
import { STOCK_FIELDS, readPath } from '../../services/irApi';
import PageHeader from '../components/PageHeader';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { Input, TextArea, Select } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';
import ErrorBanner from '../components/ErrorBanner';

/* إعدادات علاقات المستثمرين + بيانات السهم (يدوي أو API) — صف واحد في ir_settings */

const TABLE = 'ir_settings';

const T = {
  ar: {
    title: 'بيانات السهم والإعدادات',
    hero: 'هيدر صفحات علاقات المستثمرين', heroImage: 'صورة الهيدر', hero_title_ar: 'عنوان الهيدر بالعربي', hero_title_en: 'عنوان الهيدر بالإنجليزي',
    company: 'بيانات الشركة في كارت السهم',
    company_name_ar: 'اسم الشركة بالعربي', company_name_en: 'اسم الشركة بالإنجليزي',
    sector_ar: 'القطاع بالعربي', sector_en: 'القطاع بالإنجليزي', market_ar: 'السوق بالعربي', market_en: 'السوق بالإنجليزي',
    isin: 'الكود الدولي (ISIN)', symbol: 'رمز السهم', currency: 'العملة',
    tradingview_symbol: 'رمز السهم على TradingView (للشارت)', tvHint: 'مثال: EGX:TMGH — اتركيه فاضي لو مش عايزة شارت',
    note_ar: 'ملاحظة تحت الشارت بالعربي', note_en: 'ملاحظة تحت الشارت بالإنجليزي',
    source: 'مصدر بيانات السهم', stock_mode: 'البيانات تيجي منين؟', mode_manual: 'أكتبها بإيدي (يدوي)', mode_api: 'من API',
    api: 'إعدادات الـ API', api_url: 'رابط الـ API', api_key_header: 'اسم مفتاح الـ API (Header) — اختياري', api_key_value: 'قيمة المفتاح — اختياري',
    keyWarn: '⚠️ أي مفتاح هنا بيكون ظاهر في المتصفح. استخدمي API عام أو مفتاح مخصص للعرض بس.',
    refresh_minutes: 'التحديث كل كام دقيقة', test: 'جرّبي الـ API', testing: 'جارٍ التجربة…',
    testHint: 'بعد التجربة هتظهر البيانات اللي راجعة. اكتبي جنب كل خانة تحت "المسار" اللي فيه القيمة، مثال: data.price أو items[0].close',
    fields: 'بيانات السهم', manual: 'القيمة اليدوية', path: 'المسار في الـ API',
    fieldsHint: 'أي خانة فاضية مش هتظهر في الموقع. في وضع الـ API: لو المسار فاضي أو مرجعش قيمة، بتظهر القيمة اليدوية.',
    save: 'حفظ التعديلات', saving: 'جارٍ الحفظ…', saved: 'تم الحفظ', loading: 'جارٍ التحميل…',
  },
  en: {
    title: 'Stock data & settings',
    hero: 'Investor relations header', heroImage: 'Header image', hero_title_ar: 'Header title (Arabic)', hero_title_en: 'Header title (English)',
    company: 'Company info on the stock card',
    company_name_ar: 'Company name (Arabic)', company_name_en: 'Company name (English)',
    sector_ar: 'Sector (Arabic)', sector_en: 'Sector (English)', market_ar: 'Market (Arabic)', market_en: 'Market (English)',
    isin: 'ISIN', symbol: 'Ticker', currency: 'Currency',
    tradingview_symbol: 'TradingView symbol (for the chart)', tvHint: 'e.g. EGX:TMGH — leave empty for no chart',
    note_ar: 'Note under the chart (Arabic)', note_en: 'Note under the chart (English)',
    source: 'Stock data source', stock_mode: 'Where does the data come from?', mode_manual: 'I type it (manual)', mode_api: 'From an API',
    api: 'API settings', api_url: 'API link', api_key_header: 'API key header name — optional', api_key_value: 'Key value — optional',
    keyWarn: '⚠️ Any key here is visible in the browser. Use a public API or a display-only key.',
    refresh_minutes: 'Refresh every (minutes)', test: 'Test the API', testing: 'Testing…',
    testHint: 'After testing, the returned data appears below. Next to each field, write the "path" to its value, e.g. data.price or items[0].close',
    fields: 'Stock data', manual: 'Manual value', path: 'Path in the API',
    fieldsHint: 'Empty fields are hidden on the website. In API mode, if a path is empty or returns nothing, the manual value is shown.',
    save: 'Save changes', saving: 'Saving…', saved: 'Saved', loading: 'Loading…',
  },
};

const empty = {
  hero_image: '', hero_title_ar: '', hero_title_en: '',
  company_name_ar: '', company_name_en: '', sector_ar: '', sector_en: '', market_ar: '', market_en: '',
  isin: '', symbol: '', tradingview_symbol: '', currency: 'EGP', note_ar: '', note_en: '',
  stock_mode: 'manual', api_url: '', api_key_header: '', api_key_value: '', refresh_minutes: 15,
  manual: {}, api_map: {},
};

function Section({ title, hint }) {
  return (
    <div className="border-t border-gray-100 pt-6 first:border-0 first:pt-0">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      {hint && <p className="mt-1 text-xs text-gray-500 whitespace-pre-line">{hint}</p>}
    </div>
  );
}

export default function AdminIRStock() {
  const { lang } = useAdmin();
  const L = T[lang] || T.ar;
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [test, setTest] = useState({ busy: false, json: null, error: null });

  useEffect(() => {
    supabase.from(TABLE).select('*').order('created_at').limit(1).maybeSingle().then(({ data, error: err }) => {
      if (err) setError(err.message);
      setForm(data ? { ...empty, ...data, manual: data.manual || {}, api_map: data.api_map || {} } : empty);
    });
  }, []);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2500);
    return () => clearTimeout(t);
  }, [saved]);

  const bind = (key) => ({
    value: form?.[key] ?? '',
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });
  const setIn = (group, key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [group]: { ...f[group], [key]: value } }));
  };

  const runTest = async () => {
    setTest({ busy: true, json: null, error: null });
    try {
      const headers = {};
      if (form.api_key_header && form.api_key_value) headers[form.api_key_header] = form.api_key_value;
      const res = await fetch(form.api_url, { headers });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTest({ busy: false, json: await res.json(), error: null });
    } catch (err) {
      setTest({ busy: false, json: null, error: `${err.message} — لو الرابط صح، غالبًا السيرفر مش سامح للمتصفح (CORS).` });
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const values = { ...form };
      const id = values.id;
      delete values.id;
      delete values.created_at;
      values.refresh_minutes = Number(values.refresh_minutes) || 15;
      const row = id ? await updateItem(TABLE, id, values) : await createItem(TABLE, values);
      setForm({ ...empty, ...row, manual: row.manual || {}, api_map: row.api_map || {} });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="text-sm text-gray-500">{L.loading}</p>;
  const isApi = form.stock_mode === 'api';

  return (
    <div>
      <PageHeader title={L.title} />
      <form onSubmit={submit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        {error && <ErrorBanner message={error} />}

        <Section title={L.hero} />
        <ImageUpload label={L.heroImage} folder="investors" value={form.hero_image} onChange={(v) => setForm((f) => ({ ...f, hero_image: v }))} />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label={L.hero_title_ar} dir="rtl" {...bind('hero_title_ar')} />
          <Input label={L.hero_title_en} dir="ltr" {...bind('hero_title_en')} />
        </div>

        <Section title={L.company} />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label={L.company_name_ar} dir="rtl" {...bind('company_name_ar')} />
          <Input label={L.company_name_en} dir="ltr" {...bind('company_name_en')} />
          <Input label={L.sector_ar} dir="rtl" {...bind('sector_ar')} />
          <Input label={L.sector_en} dir="ltr" {...bind('sector_en')} />
          <Input label={L.market_ar} dir="rtl" {...bind('market_ar')} />
          <Input label={L.market_en} dir="ltr" {...bind('market_en')} />
          <Input label={L.isin} dir="ltr" {...bind('isin')} />
          <Input label={L.symbol} dir="ltr" {...bind('symbol')} />
          <Input label={L.currency} dir="ltr" {...bind('currency')} />
          <div>
            <Input label={L.tradingview_symbol} dir="ltr" placeholder="EGX:..." {...bind('tradingview_symbol')} />
            <p className="mt-1 text-xs text-gray-400">{L.tvHint}</p>
          </div>
          <TextArea label={L.note_ar} dir="rtl" rows={2} {...bind('note_ar')} />
          <TextArea label={L.note_en} dir="ltr" rows={2} {...bind('note_en')} />
        </div>

        <Section title={L.source} />
        <Select
          label={L.stock_mode}
          options={[{ value: 'manual', label: L.mode_manual }, { value: 'api', label: L.mode_api }]}
          {...bind('stock_mode')}
        />

        {isApi && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-800">{L.api}</h3>
            <Input label={L.api_url} dir="ltr" placeholder="https://" {...bind('api_url')} />
            <div className="grid gap-4 md:grid-cols-3">
              <Input label={L.api_key_header} dir="ltr" placeholder="x-api-key" {...bind('api_key_header')} />
              <Input label={L.api_key_value} dir="ltr" {...bind('api_key_value')} />
              <Input type="number" min="1" label={L.refresh_minutes} {...bind('refresh_minutes')} />
            </div>
            <p className="text-xs text-amber-700">{L.keyWarn}</p>
            <div className="flex items-center gap-3">
              <SecondaryButton onClick={runTest} disabled={!form.api_url || test.busy}>{test.busy ? L.testing : L.test}</SecondaryButton>
            </div>
            <p className="text-xs text-gray-500">{L.testHint}</p>
            {test.error && <ErrorBanner message={test.error} />}
            {test.json && (
              <pre dir="ltr" className="max-h-72 overflow-auto rounded-lg bg-white p-3 text-xs text-gray-700 border border-gray-200">
                {JSON.stringify(test.json, null, 2).slice(0, 6000)}
              </pre>
            )}
          </div>
        )}

        <Section title={L.fields} hint={L.fieldsHint} />
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500">
              <tr>
                <th className="px-3 py-2 text-start font-medium"> </th>
                <th className="px-3 py-2 text-start font-medium">{L.manual}</th>
                {isApi && <th className="px-3 py-2 text-start font-medium">{L.path}</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {STOCK_FIELDS.map((fld) => {
                const preview = isApi && test.json ? readPath(test.json, form.api_map[fld.key]) : undefined;
                return (
                  <tr key={fld.key}>
                    <td className="px-3 py-2 text-gray-700 whitespace-nowrap">{fld[lang]}</td>
                    <td className="px-3 py-2">
                      <input dir="ltr" value={form.manual[fld.key] ?? ''} onChange={setIn('manual', fld.key)}
                        className="w-full rounded-lg border border-gray-200 px-2 py-1.5 outline-none focus:border-[var(--admin-primary)]" />
                    </td>
                    {isApi && (
                      <td className="px-3 py-2">
                        <input dir="ltr" placeholder="data.price" value={form.api_map[fld.key] ?? ''} onChange={setIn('api_map', fld.key)}
                          className="w-full rounded-lg border border-gray-200 px-2 py-1.5 outline-none focus:border-[var(--admin-primary)]" />
                        {preview !== undefined && <p className="mt-1 text-xs text-green-700" dir="ltr">= {String(preview)}</p>}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
          <PrimaryButton type="submit" disabled={saving}>{saving ? L.saving : L.save}</PrimaryButton>
          {saved && <span className="text-sm text-green-600">{L.saved}</span>}
        </div>
      </form>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useAdmin } from '../AdminContext';
import { supabase } from '../../lib/supabaseClient';
import { createItem, updateItem } from '../../services/adminApi';
import PageHeader from '../components/PageHeader';
import { PrimaryButton } from '../components/Buttons';
import { Input, TextArea } from '../components/FormFields';
import ErrorBanner from '../components/ErrorBanner';

/* بيانات التواصل والسوشيال والفوتر — صف واحد في جدول site_settings */

const TABLE = 'site_settings';

const labels = {
  ar: {
    title: 'بيانات التواصل والسوشيال',
    social: 'روابط السوشيال ميديا',
    socialHint: 'الصقي رابط الصفحة كامل. الخانة الفاضية = الأيقونة مش هتظهر في الموقع.',
    facebook_url: 'فيسبوك',
    instagram_url: 'إنستجرام',
    linkedin_url: 'لينكد إن',
    x_url: 'X (تويتر)',
    contact: 'بيانات التواصل',
    phone: 'رقم الهاتف (اللي بيظهر في الفوتر)',
    whatsapp: 'رقم الواتساب (زرار الواتساب في الموقع)',
    whatsappHint: 'بكود الدولة من غير + ولا مسافات، مثال: 201221267156',
    email: 'البريد الإلكتروني',
    address_ar: 'العنوان بالعربي',
    address_en: 'العنوان بالإنجليزي',
    footer: 'نص الفوتر',
    footer_about_ar: 'نبذة الفوتر بالعربي',
    footer_about_en: 'نبذة الفوتر بالإنجليزي',
    save: 'حفظ التعديلات',
    saving: 'جارٍ الحفظ…',
    saved: 'تم الحفظ',
    loading: 'جارٍ التحميل…',
  },
  en: {
    title: 'Contact & social',
    social: 'Social media links',
    socialHint: 'Paste the full page link. Empty field = icon hidden on the website.',
    facebook_url: 'Facebook',
    instagram_url: 'Instagram',
    linkedin_url: 'LinkedIn',
    x_url: 'X (Twitter)',
    contact: 'Contact details',
    phone: 'Phone (shown in footer)',
    whatsapp: 'WhatsApp number (website button)',
    whatsappHint: 'Country code + number, no + or spaces. Example: 201221267156',
    email: 'Email',
    address_ar: 'Address (Arabic)',
    address_en: 'Address (English)',
    footer: 'Footer text',
    footer_about_ar: 'Footer description (Arabic)',
    footer_about_en: 'Footer description (English)',
    save: 'Save changes',
    saving: 'Saving…',
    saved: 'Saved',
    loading: 'Loading…',
  },
};

const empty = {
  facebook_url: '', instagram_url: '', linkedin_url: '', x_url: '',
  phone: '', whatsapp: '', email: '', address_ar: '', address_en: '',
  footer_about_ar: '', footer_about_en: '',
};

const SOCIAL = ['facebook_url', 'instagram_url', 'linkedin_url', 'x_url'];

// لو الرابط مكتوب من غير https:// نضيفها
const fixUrl = (v) => {
  const s = (v || '').trim();
  if (!s) return '';
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
};

function Section({ title, hint }) {
  return (
    <div className="border-t border-gray-100 pt-5 first:border-0 first:pt-0">
      <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export default function AdminSettings() {
  const { lang } = useAdmin();
  const L = labels[lang] || labels.ar;
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from(TABLE)
      .select('*')
      .order('created_at')
      .limit(1)
      .maybeSingle()
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        setForm(data ? { ...empty, ...data } : empty);
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

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
           const values = { ...form };
      const id = values.id;
      delete values.id;
      delete values.created_at;
      SOCIAL.forEach((k) => (values[k] = fixUrl(values[k])));
      values.whatsapp = (values.whatsapp || '').replace(/\D/g, '');
      const row = id ? await updateItem(TABLE, id, values) : await createItem(TABLE, values);
      setForm({ ...empty, ...row });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="text-sm text-gray-500">{L.loading}</p>;

  return (
    <div>
      <PageHeader title={L.title} />
      <form onSubmit={submit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        {error && <ErrorBanner message={error} />}

        <Section title={L.social} hint={L.socialHint} />
        <div className="grid gap-4 md:grid-cols-2">
          {SOCIAL.map((k) => (
            <Input key={k} label={L[k]} dir="ltr" placeholder="https://" {...bind(k)} />
          ))}
        </div>

        <Section title={L.contact} />
        <div className="grid gap-4 md:grid-cols-2">
          <Input label={L.phone} dir="ltr" placeholder="+20 ..." {...bind('phone')} />
          <div>
            <Input label={L.whatsapp} dir="ltr" placeholder="201221267156" {...bind('whatsapp')} />
            <p className="mt-1 text-xs text-gray-400">{L.whatsappHint}</p>
          </div>
          <Input type="email" label={L.email} dir="ltr" {...bind('email')} />
          <div />
          <Input label={L.address_ar} dir="rtl" {...bind('address_ar')} />
          <Input label={L.address_en} dir="ltr" {...bind('address_en')} />
        </div>

        <Section title={L.footer} />
        <div className="grid gap-4 md:grid-cols-2">
          <TextArea label={L.footer_about_ar} dir="rtl" rows={3} {...bind('footer_about_ar')} />
          <TextArea label={L.footer_about_en} dir="ltr" rows={3} {...bind('footer_about_en')} />
        </div>

        <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
          <PrimaryButton type="submit" disabled={saving}>
            {saving ? L.saving : L.save}
          </PrimaryButton>
          {saved && <span className="text-sm text-green-600">{L.saved}</span>}
        </div>
      </form>
    </div>
  );
}

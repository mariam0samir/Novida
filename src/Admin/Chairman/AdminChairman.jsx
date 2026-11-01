import { useEffect, useState } from 'react';
import { useAdmin } from '../AdminContext';
import { getChairmanMessageAdmin, saveChairmanMessage } from '../../services/adminApi';
import PageHeader from '../components/PageHeader';
import { PrimaryButton } from '../components/Buttons';
import { Bilingual } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';
import ErrorBanner from '../components/ErrorBanner';

const empty = {
  name_ar: '', name_en: '', position_ar: '', position_en: '',
  message_title_ar: '', message_title_en: '', message_ar: '', message_en: '', image_url: '',
};

// Form واحد لصف واحد في جدول chairman_message
export default function AdminChairman() {
  const { tr } = useAdmin();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getChairmanMessageAdmin()
      .then((row) => setForm(row ? { ...empty, ...row } : empty))
      .catch((e) => {
        setError(e.message);
        setForm(empty);
      });
  }, []);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2500);
    return () => clearTimeout(t);
  }, [saved]);

  const editor = {
    bind: (key) => ({
      value: form?.[key] ?? '',
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    }),
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const row = await saveChairmanMessage(form);
      setForm({ ...empty, ...row });
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <p className="text-sm text-gray-500">{tr('loading')}</p>;

  return (
    <div>
      <PageHeader title={tr('chairman_message')} />
      <form onSubmit={submit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        {error && <ErrorBanner message={error} />}
        <ImageUpload
          round
          label={tr('chairmanPhoto')}
          folder="chairman"
          value={form.image_url}
          onChange={(v) => setForm((f) => ({ ...f, image_url: v }))}
          onBusy={setUploading}
        />
        <Bilingual editor={editor} name="name" labelKey="chairmanName" required />
        <Bilingual editor={editor} name="position" />
        <Bilingual editor={editor} name="message_title" labelKey="messageTitle" />
        <div>
          <Bilingual editor={editor} name="message" textarea rows={12} />
          <p className="mt-1 text-xs text-gray-400">{tr('messageHint')}</p>
        </div>
        <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
          <PrimaryButton type="submit" disabled={saving || uploading}>
            {saving ? tr('saving') : tr('saveChanges')}
          </PrimaryButton>
          {saved && <span className="text-sm text-green-600">{tr('saved')}</span>}
        </div>
      </form>
    </div>
  );
}

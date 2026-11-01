import { useEffect, useState } from 'react';
import { useAdmin } from '../AdminContext';
import PageHeader from '../components/PageHeader';
import { PrimaryButton } from '../components/Buttons';
import { Bilingual } from '../components/FormFields';
import { ImageUpload } from '../components/UploadFields';

export default function AdminChairman() {
  const { tr, chairman, setChairman } = useAdmin();
  const [form, setForm] = useState(chairman);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 2500);
    return () => clearTimeout(t);
  }, [saved]);

  // نفس واجهة useEditor حتى نستخدم مكوّن Bilingual
  const editor = {
    bind: (key) => ({
      value: form[key] ?? '',
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    }),
  };

  const submit = (e) => {
    e.preventDefault();
    // TODO Supabase: upsert في جدول chairman (صف واحد)
    setChairman(form);
    setSaved(true);
  };

  return (
    <div>
      <PageHeader title={tr('chairman')} />
      <form onSubmit={submit} className="space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
        <ImageUpload label={tr('chairmanPhoto')} round value={form.image_url} onChange={(v) => setForm((f) => ({ ...f, image_url: v }))} />
        <Bilingual editor={editor} name="name" labelKey="chairmanName" required />
        <Bilingual editor={editor} name="position" />
        <Bilingual editor={editor} name="message_title" labelKey="messageTitle" />
        <Bilingual editor={editor} name="message" textarea rows={10} />
        <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
          <PrimaryButton type="submit">{tr('saveChanges')}</PrimaryButton>
          {saved && <span className="text-sm text-green-600">{tr('saved')}</span>}
        </div>
      </form>
    </div>
  );
}

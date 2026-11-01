import { useState } from 'react';

// حالة نموذج الإضافة / التعديل داخل الـ Modal
export default function useEditor(empty) {
  const [form, setForm] = useState(null);
  return {
    form,
    setForm,
    isOpen: form !== null,
    isNew: form !== null && !form.id,
    openNew: (extra = {}) => setForm({ ...empty, ...extra }),
    openEdit: (item) => setForm({ ...item }),
    close: () => setForm(null),
    bind: (key) => ({
      value: form?.[key] ?? '',
      onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
    }),
  };
}

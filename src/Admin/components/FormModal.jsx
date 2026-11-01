import { useState } from 'react';
import { useAdmin } from '../AdminContext';
import Modal from './Modal';
import { PrimaryButton, SecondaryButton } from './Buttons';
import ErrorBanner from './ErrorBanner';

/** Modal + form مشترك: يحفظ في Supabase ثم يُغلق، ويعرض الخطأ إن وجد */
export default function FormModal({ editor, title, onSubmit, children }) {
  const { tr } = useAdmin();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const close = () => {
    if (saving) return;
    setError(null);
    editor.close();
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSubmit(editor.form);
      editor.close();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={editor.isOpen}
      title={title}
      onClose={close}
      footer={
        <>
          <SecondaryButton onClick={close} disabled={saving}>{tr('cancel')}</SecondaryButton>
          <PrimaryButton type="submit" form="admin-form" disabled={saving || editor.uploading}>
            {saving ? tr('saving') : tr('save')}
          </PrimaryButton>
        </>
      }
    >
      {editor.isOpen && (
        <form id="admin-form" onSubmit={submit} className="space-y-5">
          {error && <ErrorBanner message={error} />}
          {children}
        </form>
      )}
    </Modal>
  );
}

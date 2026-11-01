import { useAdmin } from '../AdminContext';
import Modal from './Modal';
import { PrimaryButton, SecondaryButton } from './Buttons';

/** Modal + form مشترك لكل صفحات الإضافة والتعديل */
export default function FormModal({ editor, title, onSubmit, children }) {
  const { tr } = useAdmin();
  const submit = (e) => {
    e.preventDefault();
    onSubmit(editor.form);
    editor.close();
  };
  return (
    <Modal
      open={editor.isOpen}
      title={title}
      onClose={editor.close}
      footer={
        <>
          <SecondaryButton onClick={editor.close}>{tr('cancel')}</SecondaryButton>
          <PrimaryButton type="submit" form="admin-form">{tr('save')}</PrimaryButton>
        </>
      }
    >
      {editor.isOpen && (
        <form id="admin-form" onSubmit={submit} className="space-y-5">
          {children}
        </form>
      )}
    </Modal>
  );
}

import { useAdmin } from '../AdminContext';

export const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-[var(--admin-primary)] focus:ring-1 focus:ring-[var(--admin-primary)]';

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-gray-600">{label}</span>
      {children}
    </label>
  );
}

export function Input({ label, ...props }) {
  return (
    <Field label={label}>
      <input className={inputClass} {...props} />
    </Field>
  );
}

export function TextArea({ label, rows = 3, ...props }) {
  return (
    <Field label={label}>
      <textarea rows={rows} className={`${inputClass} resize-y leading-relaxed`} {...props} />
    </Field>
  );
}

export function Select({ label, options, ...props }) {
  return (
    <Field label={label}>
      <select className={inputClass} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

/** حقلان متجاوران: عربي (RTL) وإنجليزي (LTR) */
export function Bilingual({ editor, name, labelKey = name, textarea = false, rows = 3, required = false }) {
  const { tr } = useAdmin();
  const C = textarea ? TextArea : Input;
  const extra = textarea ? { rows } : {};
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <C label={tr(`${labelKey}_ar`)} dir="rtl" required={required} {...extra} {...editor.bind(`${name}_ar`)} />
      <C label={tr(`${labelKey}_en`)} dir="ltr" required={required} {...extra} {...editor.bind(`${name}_en`)} />
    </div>
  );
}

export function ActiveSwitch({ checked, onChange }) {
  const { tr } = useAdmin();
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-gray-300 accent-[var(--admin-primary)]"
      />
      {tr('visible')}
    </label>
  );
}

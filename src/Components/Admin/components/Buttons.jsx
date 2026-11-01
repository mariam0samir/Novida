export function PrimaryButton({ className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--admin-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

export function SecondaryButton({ className = '', ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${className}`}
      {...props}
    />
  );
}

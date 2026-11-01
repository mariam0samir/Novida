import { useCallback, useEffect, useState } from 'react';
import { listItems, createItem, updateItem, deleteItem, moveItem, removeFileByUrl } from '../../services/adminApi';
import { bySort } from '../AdminContext';

const NUMERIC = ['sort_order', 'year'];

// تجهيز البيانات قبل الإرسال: حذف id/created_at، تحويل '' إلى null، وتحويل الأرقام
function toPayload(item) {
  const { id, created_at, ...rest } = item;
  const out = {};
  Object.entries(rest).forEach(([k, v]) => {
    if (v === '') out[k] = null;
    else if (NUMERIC.includes(k) && v !== null && v !== undefined) out[k] = Number(v);
    else out[k] = v;
  });
  return out;
}

/** تحميل جدول من Supabase + العمليات عليه، ثم إعادة التحميل بعد كل عملية */
export default function useTable(table, { order = 'sort_order', ascending = true } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listItems(table, { order, ascending }));
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [table, order, ascending]);

  useEffect(() => {
    load();
  }, [load]);

  // save يعيد رمي الخطأ ليظهر داخل الـ Modal، وباقي العمليات تعرضه أعلى الصفحة
  const run = async (fn, rethrow = false) => {
    try {
      await fn();
      setError(null);
    } catch (e) {
      setError(e.message);
      if (rethrow) throw e;
    } finally {
      await load();
    }
  };

  const sorted = [...items].sort(bySort);

  return {
    items,
    loading,
    error,
    reload: load,
    nextOrder: items.reduce((m, x) => Math.max(m, x.sort_order ?? 0), 0) + 1,
    save: (item) => run(() => (item.id ? updateItem(table, item.id, toPayload(item)) : createItem(table, toPayload(item))), true),
    remove: (item) =>
      run(async () => {
        await deleteItem(table, item.id);
        await Promise.allSettled([removeFileByUrl(item.image_url), removeFileByUrl(item.file_url)]);
      }),
    toggle: (item) => run(() => updateItem(table, item.id, { active: !item.active })),
    move: (id, dir) => run(() => moveItem(table, sorted, id, dir)),
  };
}

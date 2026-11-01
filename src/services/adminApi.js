import { supabase } from '../lib/supabaseClient';

// عمليات لوحة التحكم — الحماية الفعلية عبر RLS في Supabase

export const TABLES = {
  sectors: 'sectors',
  projects: 'projects',
  news: 'news',
  leaders: 'leaders',
  reports: 'reports',
  sector_showcase: 'sector_showcase',
  about_sections: 'about_sections',
  chairman_message: 'chairman_message',
};

export const BUCKETS = {
  images: 'site-images',
  reports: 'reports-files',
};

const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

/* ---------- Auth ---------- */

export async function signIn(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

export async function signOut() {
  await supabase.auth.signOut();
}

export async function checkIsAdmin() {
  const { data, error } = await supabase.rpc('is_admin');
  return !error && data === true;
}

/* ---------- CRUD ---------- */

export async function listItems(table, { order = 'sort_order', ascending = true } = {}) {
  return unwrap(await supabase.from(table).select('*').order(order, { ascending }));
}

export async function countItems(table, filter = {}) {
  let q = supabase.from(table).select('id', { count: 'exact', head: true });
  Object.entries(filter).forEach(([k, v]) => (q = q.eq(k, v)));
  const { count, error } = await q;
  if (error) throw error;
  return count ?? 0;
}

export async function createItem(table, values) {
  return unwrap(await supabase.from(table).insert(values).select().single());
}

export async function updateItem(table, id, values) {
  return unwrap(await supabase.from(table).update(values).eq('id', id).select().single());
}

export async function deleteItem(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

export async function setActive(table, id, activeValue) {
  return updateItem(table, id, { active: activeValue });
}

/** تحريك عنصر لأعلى/لأسفل ثم إعادة ترقيم sort_order للعناصر التي تغيّر ترتيبها فقط */
export async function moveItem(table, sortedItems, id, dir) {
  const list = [...sortedItems];
  const i = list.findIndex((x) => x.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  const changes = list
    .map((x, k) => ({ id: x.id, sort_order: k + 1, old: x.sort_order }))
    .filter((x) => x.sort_order !== x.old);
  const results = await Promise.all(
    changes.map((c) => supabase.from(table).update({ sort_order: c.sort_order }).eq('id', c.id))
  );
  const failed = results.find((r) => r.error);
  if (failed) throw failed.error;
}

/* ---------- Storage ---------- */

export async function uploadFile(bucket, file, folder = 'uploads') {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'bin';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}

/** حذف ملف من Storage بالـ public URL (لا يوقف العملية إذا فشل) */
export async function removeFileByUrl(url) {
  if (!url) return;
  const bucket = Object.values(BUCKETS).find((b) => url.includes(`/object/public/${b}/`));
  if (!bucket) return;
  const path = decodeURIComponent(url.split(`/object/public/${bucket}/`)[1] || '');
  if (path) await supabase.storage.from(bucket).remove([path]);
}

/* ---------- كلمة رئيس مجلس الإدارة (صف واحد) ---------- */

export async function getChairmanMessageAdmin() {
  return unwrap(await supabase.from(TABLES.chairman_message).select('*').order('created_at').limit(1).maybeSingle());
}

export async function saveChairmanMessage(values) {
  const { id, created_at, ...rest } = values;
  return id ? updateItem(TABLES.chairman_message, id, rest) : createItem(TABLES.chairman_message, rest);
}

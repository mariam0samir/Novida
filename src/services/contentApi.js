import { supabase } from '../lib/supabaseClient';

// قراءة الموقع العام — العناصر المفعّلة فقط (active = true)

const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

const active = (table) => supabase.from(table).select('*').eq('active', true);

export async function getSectors() {
  return unwrap(await active('sectors').order('sort_order'));
}

export async function getSectorBySlug(slug) {
  return unwrap(await active('sectors').eq('slug', slug).maybeSingle());
}

export async function getProjects({ sectorId } = {}) {
  let q = active('projects').order('sort_order');
  if (sectorId) q = q.eq('sector_id', sectorId);
  return unwrap(await q);
}

export async function getProjectById(id) {
  return unwrap(await active('projects').eq('id', id).maybeSingle());
}

export async function getNews({ limit } = {}) {
  let q = active('news').order('published_at', { ascending: false });
  if (limit) q = q.limit(limit);
  return unwrap(await q);
}

export async function getNewsById(id) {
  return unwrap(await active('news').eq('id', id).maybeSingle());
}

export async function getLeaders() {
  return unwrap(await active('leaders').order('sort_order'));
}

export async function getReports({ reportType } = {}) {
  let q = active('reports').order('report_date', { ascending: false });
  if (reportType) q = q.eq('report_type', reportType);
  return unwrap(await q);
}

export async function getSectorShowcase({ sectorId } = {}) {
  let q = active('sector_showcase').order('sort_order');
  if (sectorId) q = q.eq('sector_id', sectorId);
  return unwrap(await q);
}

export async function getAboutSections() {
  return unwrap(await active('about_sections').order('sort_order'));
}

// صف واحد فقط في chairman_message
export async function getChairmanMessage() {
  return unwrap(await supabase.from('chairman_message').select('*').order('created_at').limit(1).maybeSingle());
}

// صف واحد فقط في site_settings
export async function getSiteSettings() {
  return unwrap(await supabase.from('site_settings').select('*').order('created_at').limit(1).maybeSingle());
}
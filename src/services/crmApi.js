import { supabase } from "../lib/supabaseClient";

/*
  استقبال طلبات "سجّل اهتمامك"
  الإعدادات بتتقري من لوحة التحكم ← بيانات التواصل والسوشيال ← استقبال طلبات التواصل
  contact_mode: crm | email | both
*/

export async function getContactSettings() {
  const { data } = await supabase
    .from("site_settings")
    .select("crm_url, crm_leadsource, contact_mode")
    .order("created_at")
    .limit(1)
    .maybeSingle();

  return {
    crmUrl: data?.crm_url || import.meta.env.VITE_CRM_API_URL || "",
    leadSource: data?.crm_leadsource || import.meta.env.VITE_CRM_LEAD_SOURCE || "website",
    mode: data?.contact_mode || "crm",
  };
}

// نفس طلب Postman: POST على new_lead.php
export async function sendLeadToCRM({ name, phone, email }, settings) {
  const { crmUrl, leadSource } = settings || (await getContactSettings());
  if (!crmUrl) throw new Error("CRM link is missing");

  const form = new FormData();
  form.append("name", name || "");
  form.append("FirstName", name || "");
  form.append("email", email || "");
  form.append("phone", phone || "");
  form.append("leadsource", leadSource);

  const url = crmUrl.endsWith("/") ? `${crmUrl}new_lead.php` : `${crmUrl}/new_lead.php`;

  // no-cors: الطلب بيوصل حتى لو سيرفر الـ CRM مش سامح للمتصفح يقرا الرد
  await fetch(url, { method: "POST", body: form, mode: "no-cors" });
}
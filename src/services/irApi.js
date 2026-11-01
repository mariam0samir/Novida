import { supabase } from "../lib/supabaseClient";

// علاقات المستثمرين — قراءة الموقع العام

const unwrap = ({ data, error }) => {
  if (error) throw error;
  return data;
};

export async function getIrPages() {
  return unwrap(await supabase.from("ir_pages").select("*").eq("active", true).order("sort_order"));
}

export async function getIrPageContent(pageId) {
  const [blocks, documents] = await Promise.all([
    supabase.from("ir_blocks").select("*").eq("active", true).eq("page_id", pageId).order("sort_order"),
    supabase.from("ir_documents").select("*").eq("active", true).eq("page_id", pageId)
      .order("doc_date", { ascending: false, nullsFirst: false }).order("sort_order"),
  ]);
  return { blocks: unwrap(blocks), documents: unwrap(documents) };
}

export async function getIrSettings() {
  return unwrap(await supabase.from("ir_settings").select("*").order("created_at").limit(1).maybeSingle());
}

// رابط التاب: صفحة جوه علاقات المستثمرين أو رابط لصفحة تانية
export const irPageHref = (page) => (page.page_type === "link" ? page.link_url || "/" : `/investors/${page.slug}`);

/* ---------- بيانات السهم ---------- */

// كل بيانات السهم اللي ممكن تتكتب يدوي أو تيجي من API
export const STOCK_FIELDS = [
  { key: "price", ar: "سعر السهم", en: "Price" },
  { key: "change", ar: "التغير", en: "Change" },
  { key: "change_pct", ar: "نسبة التغير %", en: "Change %" },
  { key: "updated_at", ar: "آخر تحديث", en: "Last update" },
  { key: "open", ar: "فتح", en: "Open" },
  { key: "prev_close", ar: "إغلاق سابق", en: "Previous close" },
  { key: "volume", ar: "حجم التداول", en: "Volume" },
  { key: "value_traded", ar: "قيمة التداول", en: "Value traded" },
  { key: "trades", ar: "عدد الصفقات", en: "Trades" },
  { key: "avg_volume_30d", ar: "متوسط كمية التداول في 30 يوم", en: "Avg. volume (30 days)" },
  { key: "market_cap", ar: "القيمة السوقية", en: "Market cap" },
  { key: "dividend_yield", ar: "الربح الموزع %", en: "Dividend yield %" },
  { key: "eps", ar: "ربحية السهم", en: "EPS" },
  { key: "pe", ar: "مضاعف ربحية السهم", en: "P/E" },
  { key: "day_low", ar: "أدنى سعر اليوم", en: "Day low" },
  { key: "day_high", ar: "أعلى سعر اليوم", en: "Day high" },
  { key: "week52_low", ar: "أدنى سعر خلال 52 أسبوع", en: "52-week low" },
  { key: "week52_high", ar: "أعلى سعر خلال 52 أسبوع", en: "52-week high" },
  { key: "change_week", ar: "التغير الأسبوعي %", en: "Weekly change %" },
  { key: "change_month", ar: "التغير الشهري %", en: "Monthly change %" },
  { key: "change_3m", ar: "التغير خلال 3 شهور %", en: "3-month change %" },
  { key: "change_ytd", ar: "التغير منذ بداية العام %", en: "YTD change %" },
];

// يجيب قيمة من JSON بمسار زي data.quote.price أو items[0].price
export function readPath(obj, path) {
  if (!path) return undefined;
  return String(path)
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean)
    .reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

/**
 * بيانات السهم:
 * - لو stock_mode = api ورابط الـ API متكتب: بيجيبها من الـ API (والفاضي بيكمل من اليدوي)
 * - غير كده: البيانات اليدوية من لوحة التحكم
 */
export async function getStockData(settings) {
  const manual = settings?.manual || {};
  if (settings?.stock_mode !== "api" || !settings?.api_url) {
    return { values: manual, source: "manual" };
  }

  try {
    const headers = {};
    if (settings.api_key_header && settings.api_key_value) {
      headers[settings.api_key_header] = settings.api_key_value;
    }
    const res = await fetch(settings.api_url, { headers });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();

    const map = settings.api_map || {};
    const values = { ...manual };
    STOCK_FIELDS.forEach(({ key }) => {
      const v = readPath(json, map[key]);
      if (v !== undefined && v !== null && v !== "") values[key] = v;
    });
    return { values, source: "api" };
  } catch (error) {
    console.log("STOCK API ERROR:", error);
    return { values: manual, source: "manual", error };
  }
}

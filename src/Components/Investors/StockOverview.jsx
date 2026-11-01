import { useEffect, useRef } from "react";
import { STOCK_FIELDS } from "../../services/irApi";
import { useStockData } from "../../hooks/useIR";

/* نظرة عامة عن السهم — زي صفحة طلعت مصطفى. أي قيمة فاضية مش بتظهر */

const T = {
  ar: { sector: "القطاع", market: "السوق", isin: "الكود الدولي", symbol: "السهم", updated: "آخر تحديث",
        dayRange: "مدى اليوم", yearRange: "الأدنى والأعلى خلال 52 أسبوع", noData: "بيانات السهم هتظهر هنا لما تتضاف من لوحة التحكم." },
  en: { sector: "Sector", market: "Market", isin: "ISIN", symbol: "Symbol", updated: "Last update",
        dayRange: "Day range", yearRange: "52-week range", noData: "Stock data will appear here once added from the dashboard." },
};

const STATS = ["open", "prev_close", "volume", "value_traded", "trades", "avg_volume_30d", "market_cap", "dividend_yield", "eps", "pe"];
const PERF = ["change_week", "change_month", "change_3m", "change_ytd"];

const has = (v) => v !== undefined && v !== null && String(v).trim() !== "";
const num = (v) => {
  const n = Number(String(v).replace(/[,%\s]/g, ""));
  return Number.isFinite(n) ? n : null;
};
const fmt = (v) => {
  const n = num(v);
  return n === null ? String(v) : n.toLocaleString("en-US", { maximumFractionDigits: 2 });
};
const tone = (v) => {
  const n = num(v);
  if (n === null || n === 0) return "text-gray-700";
  return n > 0 ? "text-green-600" : "text-red-600";
};

function RangeBar({ label, low, high, current }) {
  if (!has(low) || !has(high)) return null;
  const l = num(low);
  const h = num(high);
  const c = num(current);
  const pct = l !== null && h !== null && c !== null && h > l ? Math.min(100, Math.max(0, ((c - l) / (h - l)) * 100)) : 50;
  return (
    <div className="pt-4 border-t border-gray-200 first:border-0 first:pt-0">
      <p className="text-sm text-gray-500 mb-3">{label}</p>
      <div className="relative h-2.5 rounded-full bg-gradient-to-l from-green-600 to-red-500">
        <span className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-navy rounded" style={{ insetInlineStart: `${pct}%` }} />
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span dir="ltr">{fmt(low)}</span>
        <span dir="ltr">{fmt(high)}</span>
      </div>
    </div>
  );
}

// شارت TradingView (ببلاش ومن غير API) — بيشتغل لو رمز TradingView متكتب في لوحة التحكم
function TradingViewChart({ symbol, isArabic }) {
  const ref = useRef(null);
  useEffect(() => {
    const box = ref.current;
    if (!box || !symbol) return;
    box.innerHTML = "";
    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.height = "100%";
    box.appendChild(widget);
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Africa/Cairo",
      theme: "light",
      style: "1",
      locale: isArabic ? "ar_AE" : "en",
      allow_symbol_change: false,
      hide_side_toolbar: false,
    });
    box.appendChild(script);
    return () => {
      box.innerHTML = "";
    };
  }, [symbol, isArabic]);
  if (!symbol) return null;
  return <div ref={ref} className="tradingview-widget-container w-full h-[420px] md:h-[480px] border border-gray-200 rounded-xl overflow-hidden" />;
}

export default function StockOverview({ settings, isArabic }) {
  const stock = useStockData(settings);
  const lang = isArabic ? "ar" : "en";
  const L = T[lang];
  const label = (key) => STOCK_FIELDS.find((f) => f.key === key)?.[lang] || key;
  const s = settings || {};
  const v = stock?.values || {};

  if (!stock) return <div className="min-h-[200px]" />;

  const companyName = isArabic ? s.company_name_ar : s.company_name_en;
  const info = [
    { k: L.sector, v: isArabic ? s.sector_ar : s.sector_en },
    { k: L.market, v: isArabic ? s.market_ar : s.market_en },
    { k: L.isin, v: s.isin },
    { k: L.symbol, v: s.symbol },
  ].filter((x) => has(x.v));

  const stats = STATS.filter((k) => has(v[k]));
  const perf = PERF.filter((k) => has(v[k]));
  const nothing = !has(v.price) && !stats.length && !perf.length && !s.tradingview_symbol;

  if (nothing) {
    return <p className="text-gray-500 py-10 text-center">{L.noData}</p>;
  }

  return (
    <div className="space-y-6">
      {/* كارت السعر */}
      <div className="border border-gray-200 rounded-xl shadow-sm p-6 md:p-8 bg-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            {companyName && <h2 className="text-xl md:text-2xl font-bold text-black">{companyName}</h2>}
            {has(v.updated_at) && (
              <p className="text-sm text-gray-500 mt-1">{L.updated}: <span dir="ltr">{String(v.updated_at)}</span></p>
            )}
          </div>
          <div className="flex items-end gap-6 md:gap-10" dir="ltr">
            {has(v.price) && (
              <p className="text-4xl font-bold text-black">
                {fmt(v.price)} <span className="text-sm font-normal text-gray-500">{s.currency || "EGP"}</span>
              </p>
            )}
            {has(v.change) && <p className={`text-2xl ${tone(v.change)}`}>{fmt(v.change)}</p>}
            {has(v.change_pct) && <p className={`text-2xl ${tone(v.change_pct)}`}>{fmt(v.change_pct)}%</p>}
          </div>
        </div>
        {info.length > 0 && (
          <div className="mt-6 pt-5 border-t border-gray-200 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {info.map((x) => (
              <p key={x.k}>
                <span className="text-primary font-bold">{x.k}:</span> <span className="text-gray-700">{x.v}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* الشارت + الجدول */}
      <div className={`grid grid-cols-1 ${stats.length || has(v.day_low) || has(v.week52_low) ? "lg:grid-cols-[1fr_320px]" : ""} gap-6 items-start`}>
        <div className="space-y-6 min-w-0">
          <TradingViewChart symbol={s.tradingview_symbol} isArabic={isArabic} />

          {has(isArabic ? s.note_ar : s.note_en) && (
            <p className="bg-sky-50 border border-sky-200 text-sky-900 rounded-xl px-5 py-4 text-sm md:text-base">
              {isArabic ? s.note_ar : s.note_en}
            </p>
          )}

          {perf.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {perf.map((k) => (
                <div key={k} className="border border-gray-200 rounded-lg overflow-hidden">
                  <p className={`px-3 py-2 text-sm text-white ${num(v[k]) < 0 ? "bg-red-500" : "bg-green-600"}`}>{label(k).replace(" %", "")}</p>
                  <p className={`px-3 py-4 text-2xl text-center ${tone(v[k])}`} dir="ltr">{fmt(v[k])} %</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {(stats.length > 0 || has(v.day_low) || has(v.week52_low)) && (
          <div className="space-y-6">
            {stats.length > 0 && (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {stats.map((k, i) => (
                  <div key={k} className={`flex justify-between gap-4 px-4 py-3 text-sm ${i % 2 ? "bg-white" : "bg-gray-50"}`}>
                    <span className="text-gray-600">{label(k).replace(" %", "")}</span>
                    <span className="font-bold text-primary" dir="ltr">{fmt(v[k])}{k === "dividend_yield" ? " %" : ""}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="space-y-4">
              <RangeBar label={L.dayRange} low={v.day_low} high={v.day_high} current={v.price} />
              <RangeBar label={L.yearRange} low={v.week52_low} high={v.week52_high} current={v.price} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

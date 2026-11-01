import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useIrPages, useIrPageContent, useIrSettings } from "../../hooks/useIR";
import StockOverview from "./StockOverview";
import { irPageHref } from "../../services/irApi";

/*
  علاقات المستثمرين — /investors/:slug
  التابات والمحتوى والملفات وبيانات السهم كلها من لوحة التحكم ← علاقات المستثمرين
*/

const T = {
  ar: { download: "تحميل PDF", year: "السنة", allYears: "كل السنوات", empty: "لا يوجد محتوى في هذا القسم حاليًا.", notFound: "الصفحة غير موجودة" },
  en: { download: "Download PDF", year: "Year", allYears: "All years", empty: "No content in this section yet.", notFound: "Page not found" },
};

const lines = (text) => String(text || "").split("\n").map((l) => l.trim()).filter(Boolean);
const loc = (item, field, isArabic) => (item ? item[`${field}_${isArabic ? "ar" : "en"}`] || "" : "");


function Block({ block, isArabic }) {
  const title = loc(block, "title", isArabic);
  const body = loc(block, "body", isArabic);
  if (!title && !body) return null;

  let content = null;
  if (block.block_type === "list") {
    content = (
      <ol className="list-decimal ps-6 space-y-2 text-gray-700 text-base md:text-lg leading-8">
        {lines(body).map((l, i) => <li key={i}>{l}</li>)}
      </ol>
    );
  } else if (block.block_type === "info") {
    content = (
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {lines(body).map((l, i) => (
          <p key={i} className={`px-5 py-4 text-gray-700 ${i % 2 ? "bg-white" : "bg-gray-50"}`}>{l}</p>
        ))}
      </div>
    );
  } else if (block.block_type === "table") {
    const rows = lines(body).map((l) => l.split("|").map((c) => c.trim()));
    const [head, ...data] = rows;
    content = head ? (
      <div className="overflow-x-auto border border-gray-200 rounded-xl">
        <table className="w-full min-w-[560px] text-sm md:text-base">
          <thead className="bg-gray-50 text-primary">
            <tr>{head.map((h, i) => <th key={i} className="px-4 py-3 text-start font-bold">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((r, i) => (
              <tr key={i}>{head.map((_, j) => <td key={j} className="px-4 py-4 text-gray-700">{r[j] || ""}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : null;
  } else {
    content = (
      <div className="space-y-4 text-gray-700 text-base md:text-lg leading-8">
        {body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean).map((p, i) => (
          <p key={i} className="whitespace-pre-line">{p}</p>
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-5">
      {title && <h2 className="text-2xl md:text-3xl font-extrabold text-primary">{title}</h2>}
      {content}
    </section>
  );
}

function Documents({ documents, isArabic, L }) {
  const [year, setYear] = useState("all");
  const years = useMemo(
    () => [...new Set(documents.map((d) => d.year || (d.doc_date ? Number(String(d.doc_date).slice(0, 4)) : null)).filter(Boolean))].sort((a, b) => b - a),
    [documents]
  );
  const list = documents.filter((d) => year === "all" || String(d.year || String(d.doc_date || "").slice(0, 4)) === String(year));
  if (!documents.length) return null;

  return (
    <section className="space-y-5">
      {years.length > 1 && (
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold">{L.year}</span>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="min-w-[160px] border border-gray-200 bg-white px-4 py-2.5 outline-none focus:border-primary">
            <option value="all">{L.allYears}</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      )}
      <div className="space-y-4">
        {list.map((d) => (
          <div key={d.id} className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-5 md:px-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base md:text-lg font-bold text-black">{loc(d, "title", isArabic)}</h3>
              {d.doc_date && <p className="text-sm text-gray-500 mt-1" dir="ltr">{String(d.doc_date)}</p>}
            </div>
            {d.file_url && (
              <a href={d.file_url} target="_blank" rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 border border-primary text-primary rounded-lg px-4 py-2 text-sm font-bold hover:bg-primary hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                </svg>
                {L.download}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function InvestorsPage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const L = T[isArabic ? "ar" : "en"];

  const { data: pages, loading } = useIrPages();
  const settings = useIrSettings();
  const page = pages.find((p) => p.slug === slug && p.page_type !== "link");
  const { blocks, documents, loading: contentLoading } = useIrPageContent(page?.id);

  if (loading) return <div className="min-h-screen" />;

  // /investors من غير اسم صفحة → أول صفحة
  if (!slug) {
    const first = pages.find((p) => p.page_type !== "link");
    return first ? <Navigate to={`/investors/${first.slug}`} replace /> : <div className="min-h-screen" />;
  }

  const heroTitle = (isArabic ? settings?.hero_title_ar : settings?.hero_title_en) || (isArabic ? "علاقات المستثمرين" : "Investor Relations");
  const intro = loc(page, "intro", isArabic);
  const empty = page && !page.show_stock && !intro && !blocks.length && !documents.length && !contentLoading;

  return (
    <div className="w-full bg-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* الهيدر */}
      <section className="relative w-full min-h-[380px] md:min-h-[480px] flex items-center justify-center overflow-hidden bg-navy">
        {settings?.hero_image && <img src={settings.hero_image} alt="" className="absolute inset-0 w-full h-full object-cover" />}
        <div className="absolute inset-0 bg-black/45" />
        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-extrabold text-center px-6 pt-20">{heroTitle}</h1>
      </section>

      {/* التابات */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container">
          <div className="flex gap-8 overflow-x-auto">
            {pages.map((p) => {
              const active = p.slug === slug;
              return (
                <Link key={p.id} to={irPageHref(p)}
                  className={`relative py-5 whitespace-nowrap text-sm md:text-base transition-colors ${active ? "text-primary font-bold" : "text-gray-600 hover:text-primary"}`}>
                  {loc(p, "title", isArabic)}
                  {active && <span className="absolute bottom-0 inset-x-0 h-[3px] bg-primary" />}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* المحتوى */}
      <div className="container py-12 md:py-16 min-h-[50vh]">
        {!page ? (
          <p className="text-center text-gray-500 py-20">{L.notFound}</p>
        ) : (
          <div className="space-y-12">
            {intro && <p className="text-gray-700 text-base md:text-lg leading-8 whitespace-pre-line max-w-4xl">{intro}</p>}
            {page.show_stock && settings && <StockOverview settings={settings} isArabic={isArabic} />}
            {blocks.map((b) => <Block key={b.id} block={b} isArabic={isArabic} />)}
            <Documents documents={documents} isArabic={isArabic} L={L} />
            {empty && <p className="text-center text-gray-500 py-16">{L.empty}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

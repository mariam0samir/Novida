import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProject, useSectors } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

// نصوص ثابتة للصفحة
const labels = {
  ar: {
    home: "الرئيسية",
    projects: "مشروعاتنا",
    sector: "القطاع",
    location: "الموقع",
    gallery: "معرض الصور",
    area: "المساحة",
    status: "حالة المشروع",
    year: "سنة التسليم",
    notFound: "المشروع غير موجود",
    back: "العودة للرئيسية",
  },
  en: {
    home: "Home",
    projects: "Our Projects",
    sector: "Sector",
    location: "Location",
    gallery: "Gallery",
    area: "Area",
    status: "Status",
    year: "Delivery year",
    notFound: "Project not found",
    back: "Back to home",
  },
};

export default function ProjectDetails() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const L = labels[isArabic ? "ar" : "en"];

  const { data: project, loading } = useProject(id);
  const { data: sectors } = useSectors();

  // الصورة المفتوحة في المعرض (null = مقفولة)
  const [openImage, setOpenImage] = useState(null);

  useEffect(() => {
    if (!openImage) return;
    const onKey = (e) => e.key === "Escape" && setOpenImage(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openImage]);

  if (loading) {
    return <div className="min-h-screen" />;
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" dir={isArabic ? "rtl" : "ltr"}>
        <p>{L.notFound}</p>
        <Link to="/" className="text-primary font-bold">{L.back}</Link>
      </div>
    );
  }

  const title = localized(project, "title", i18n.language);
  const description = localized(project, "description", i18n.language);
  // بيانات المشروع (أي خانة فاضية في لوحة التحكم مش بتظهر)
  const facts = [
    { label: L.location, value: localized(project, "location", i18n.language) },
    { label: L.area, value: localized(project, "area", i18n.language) },
    { label: L.status, value: localized(project, "status", i18n.language) },
    { label: L.year, value: project.year },
  ].filter((f) => f.value);
  const paragraphs = localized(project, "content", i18n.language)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const sector = sectors.find((s) => s.id === project.sector_id);
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <section className="min-h-screen bg-white" dir={isArabic ? "rtl" : "ltr"}>

      {/* =========================
          HERO: صورة المشروع بعرض الصفحة والعنوان فوقها
      ========================== */}
      <div className="relative w-full min-h-[520px] md:min-h-[640px] flex items-end overflow-hidden bg-navy">
        {project.image_url && (
          <img
            src={project.image_url}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-12 md:pb-16 pt-40 text-white">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-white/70">
            <Link to="/" className="hover:text-white">{L.home}</Link>
            <span className="mx-2">/</span>
            <a href="/#OurBrojects" className="hover:text-white">{L.projects}</a>
            <span className="mx-2">/</span>
            <span className="text-white">{title}</span>
          </div>

          {sector && (
            <a
              href={`/${sector.slug}`}
              className="inline-block mb-5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-sm hover:bg-white/25 transition-colors"
            >
              {localized(sector, "title", i18n.language)}
            </a>
          )}

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-[850px]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-white/85 text-base md:text-xl leading-8 max-w-[750px]">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24">

        {/* =========================
            التفاصيل + بيانات المشروع
        ========================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">

          <article className="space-y-6 text-gray-700 text-base md:text-lg leading-8 md:leading-9">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl md:text-2xl text-black leading-9 md:leading-10" : ""}>
                {p}
              </p>
            ))}
          </article>

          {facts.length > 0 && (
            <aside className="lg:sticky lg:top-32 border border-gray-200 rounded-3xl p-7 bg-[#f7f7f7]">
              <div className="space-y-6">
                {facts.map((f) => (
                  <div key={f.label} className="pb-5 border-b border-gray-200 last:border-0 last:pb-0">
                    <p className="text-sm text-gray-500 mb-1">{f.label}</p>
                    <p className="text-lg font-bold text-primary">{f.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>

        {/* =========================
            معرض الصور: أول صورة كبيرة والباقي جنبها
        ========================== */}
        {gallery.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-8">{L.gallery}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[220px] gap-4">
              {gallery.map((url, i) => (
                <button
                  key={url + i}
                  type="button"
                  onClick={() => setOpenImage(url)}
                  className={`group block overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gallery lightbox */}
      {openImage && (
        <div className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4" onClick={() => setOpenImage(null)}>
          <button
            type="button"
            onClick={() => setOpenImage(null)}
            aria-label="Close"
            className="absolute top-4 end-4 w-10 h-10 flex items-center justify-center bg-white text-black"
          >
            ✕
          </button>
          <img src={openImage} alt="" className="max-w-full max-h-[90vh] object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

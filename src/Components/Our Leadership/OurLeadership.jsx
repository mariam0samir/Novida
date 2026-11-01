import './OurLeadership.css'
import { useEffect, useState } from "react";
import defaultLeadImg from "../../assets/lead.png"
import { useTranslation } from "react-i18next";
import { useLeaders } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

const OurLeadership = () => {
  const { t, i18n } = useTranslation();
  const { data: leads } = useLeaders();

  // رقم العضو المفتوح في النافذة (null = مقفولة)
  const [openIndex, setOpenIndex] = useState(null);

  return (
   

    <div>
        <div className="container py-20">
          <div className="text-center pb-32 pt-20">
            <h1 data-aos="fade-up" 
                     data-aos-offset="0"
                 data-aos-once="true"
                 data-aos-delay="300" className=" mb-5 text-3xl
                sm:text-4xl
                md:text-5xl
                font-bold font-extrabold   text-center">{t("leadership.titleLine1")}<br/> {t("leadership.titleLine2")}
</h1>
<p>{t("leadership.subtitle")}</p>
          </div>
          
            <div className="grid grid-cols-1 md:grid-cols-4 gap-7 justify-items-center items-center ">
                
             {
                leads.map((lead, index)=>{
                    return <div
                        key={lead.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setOpenIndex(index)}
                        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpenIndex(index)}
                        className="board-card hover:text-primary hover:border-primary  cursor-pointer  "
                      >
              
                        <img className="  " src={lead.image_url || defaultLeadImg} alt="" />
                     <h2 className="pt-4 pb-2  text-black font-extrabold">{localized(lead, "name", i18n.language)}</h2>
                        <h3 className="text-textPara mb-4">{localized(lead, "position", i18n.language)}</h3>
                        </div>
                    
                })
             }
            </div>
        </div>

        {openIndex !== null && leads[openIndex] && (
          <LeaderModal
            leads={leads}
            index={openIndex}
            onChange={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
        
       
   </div>
  )
}

/* =========================================
   نافذة تفاصيل العضو (الصورة + الاسم + المنصب + النبذة)
   النبذة تُكتب من لوحة التحكم ← القيادات ← النبذة
   (سطر فاضي بين كل فقرة والتانية)
========================================= */

// السهم بيشاور في اتجاه القراءة
function Arrow({ dir, isArabic }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-5 h-5 ${dir === "back" ? "rotate-180" : ""} ${isArabic ? "-scale-x-100" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function LeaderModal({ leads, index, onChange, onClose }) {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const lead = leads[index];

  const name = localized(lead, "name", i18n.language);
  const position = localized(lead, "position", i18n.language);
  const paragraphs = localized(lead, "bio", i18n.language)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const hasPrev = index > 0;
  const hasNext = index < leads.length - 1;
  const prev = () => hasPrev && onChange(index - 1);
  const next = () => hasNext && onChange(index + 1);

  // Esc يقفل، والأسهم تنقل بين الأعضاء + منع سكرول الصفحة وراء النافذة
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") (isArabic ? prev : next)();
      if (e.key === "ArrowLeft") (isArabic ? next : prev)();
    };
    document.addEventListener("keydown", onKey);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = oldOverflow;
    };
  });

  const arrowBtn =
    "w-12 h-12 flex items-center justify-center border border-white/40 text-white transition-colors duration-300 hover:bg-white hover:text-navy disabled:opacity-30 disabled:pointer-events-none";

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-3 sm:p-6"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={name}
        dir={isArabic ? "rtl" : "ltr"}
        onMouseDown={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-[1120px]
          max-h-[92vh]
          overflow-y-auto
          bg-navy
          text-white
          p-6
          sm:p-9
        "
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 end-4 w-10 h-10 flex items-center justify-center bg-white text-navy hover:bg-gray-200 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] gap-8 md:gap-10 pe-0 md:pe-12">

          {/* الصورة + الاسم + المنصب */}
          <div>
            <img
              src={lead.image_url || defaultLeadImg}
              alt={name}
              className="w-full max-w-[360px] aspect-square object-cover bg-white/10"
            />
            <h2 className="mt-6 text-2xl md:text-3xl font-bold leading-snug">
              {name}
            </h2>
            {position && (
              <p className="mt-3 text-white/80 text-sm md:text-base">
                {position}
              </p>
            )}
          </div>

          {/* النبذة */}
          <div className="space-y-5 text-white/90 text-sm md:text-base leading-7 md:leading-8 text-justify">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* التنقل بين الأعضاء */}
        {leads.length > 1 && (
          <div className="mt-8 flex justify-end gap-3">
            <button type="button" className={arrowBtn} onClick={prev} disabled={!hasPrev} aria-label="Previous">
              <Arrow dir="back" isArabic={isArabic} />
            </button>
            <button type="button" className={arrowBtn} onClick={next} disabled={!hasNext} aria-label="Next">
              <Arrow dir="forward" isArabic={isArabic} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OurLeadership

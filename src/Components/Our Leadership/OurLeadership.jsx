import './OurLeadership.css'
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLeaders } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

// صورة القائد في إطار ثابت 3:4 — لو مفيش صورة أو الصورة مش بتفتح يظهر رمز شخص محايد
function LeaderPhoto({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [src]);
  const showImg = src && !failed;
  return (
    <div className={`w-full aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center ${className}`}>
      {showImg ? (
        <img className="w-full h-full object-cover object-top" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <svg viewBox="0 0 24 24" className="w-1/3 h-1/3 text-gray-300" fill="currentColor" aria-label={alt}>
          <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5z" />
        </svg>
      )}
    </div>
  );
}

// نافذة التفاصيل — تظهر لما الزائر يدوس على الكارت
function LeaderModal({ lead, lang, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const name = localized(lead, "name", lang);
  const position = localized(lead, "position", lang);
  const bio = localized(lead, "bio", lang);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <button
          onClick={onClose}
          className="absolute top-3 end-3 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-xl leading-none"
          aria-label="close"
        >
          ×
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <LeaderPhoto src={lead.image_url} alt={name} className="md:w-56 md:flex-shrink-0" />
          <div>
            <h2 className="text-2xl font-extrabold text-black mb-2">{name}</h2>
            {position && <h3 className="text-primary mb-4">{position}</h3>}
            {bio && <p className="text-textPara leading-8 whitespace-pre-line">{bio}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// الكارت: صورة + اسم + منصب فقط، والوصف يظهر لما تدوسي على الكارت
const OurLeadership = () => {
  const { i18n } = useTranslation();
  const { data: leads } = useLeaders();
  const [selected, setSelected] = useState(null);

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
                font-bold font-extrabold   text-center">القياده<br /> التي تقود التقدم
          </h1>
          <p>مجلس الاداره </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 items-start">
          {leads.map((lead) => {
            const name = localized(lead, "name", i18n.language);
            return (
              <div
                key={lead.id}
                className="board-card hover:text-primary hover:border-primary cursor-pointer w-full flex flex-col"
                onClick={() => setSelected(lead)}
              >
                <LeaderPhoto src={lead.image_url} alt={name} />
                <h2 className="pt-4 pb-2 text-black font-extrabold">{name}</h2>
                <h3 className="text-textPara mb-4">{localized(lead, "position", i18n.language)}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {selected && <LeaderModal lead={selected} lang={i18n.language} onClose={() => setSelected(null)} />}
    </div>
  )
}

export default OurLeadership

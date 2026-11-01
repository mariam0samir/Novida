import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RiArrowDropLeftFill } from "react-icons/ri";
import { useSector, useProjects } from "../../hooks/useContent";
import { localized } from "../../utils/localized";
import "../About/About.css";

/*
  صفحة القطاع — /sectors/:slug
  نفس تصميم سيكشن العقارات (Broject2) وسيكشن السياحة (Broject3) بالظبط
  وكل المحتوى من لوحة التحكم ← القطاعات
*/

const labels = {
  ar: { projects: "مشروعات القطاع", notFound: "القطاع غير موجود", back: "العودة للرئيسية" },
  en: { projects: "Sector Projects", notFound: "Sector not found", back: "Back to home" },
};

// نفس كلاسات مربعات الخدمات في سيكشن السياحة
const chipClass = `
          w-full
          min-h-[58px]
          px-6
          flex
          items-center
          justify-start
          text-primary
          text-lg
          border
          border-gray-200
          rounded-[24px]
          bg-white
          shadow-[0_3px_8px_rgba(0,0,0,0.08)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_6px_15px_rgba(0,0,0,0.12)]
        `;

export default function SectorPage() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const L = labels[isArabic ? "ar" : "en"];

  const { data: sector, loading } = useSector(slug);
  const { data: projects } = useProjects(sector?.id);

  if (loading) return <div className="min-h-screen" />;

  if (!sector) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" dir={isArabic ? "rtl" : "ltr"}>
        <p>{L.notFound}</p>
        <Link to="/" className="text-primary font-bold">{L.back}</Link>
      </div>
    );
  }

  const title = localized(sector, "title", i18n.language);
  const label = localized(sector, "label", i18n.language);
  const description = localized(sector, "content", i18n.language) || localized(sector, "description", i18n.language);

  // كل خدمة في سطر — بتتقسم عمودين
  const features = localized(sector, "features", i18n.language)
    .split("\n")
    .map((f) => f.trim())
    .filter(Boolean);
  const half = Math.ceil(features.length / 2);
  const list1 = features.slice(0, half);
  const list2 = features.slice(half);

  // العقارات بشكل Broject2 (الصورة الأول وقايمة بأسهم) — الباقي بشكل Broject3 (مربعات)
  const isRealEstateStyle = slug === "real-estate";

  const header = (
    <>
      {label && (
        <span className="haed-about ms-7  text-primary font-bold text-sm mb-4 block">
          {label}
        </span>
      )}
      <h1
        data-aos="fade-up"
        data-aos-offset="0"
        data-aos-once="true"
        data-aos-delay="300"
        className="text-4xl md:text-5xl font-extrabold text-primary mb-4"
      >
        {title}
      </h1>
      <p
        data-aos="fade-up"
        data-aos-offset="0"
        data-aos-once="true"
        data-aos-delay="400"
        className=" mb-4 text-textPara text-lg leading-8 whitespace-pre-line"
      >
        {description}
      </p>
    </>
  );

  const image = sector.image_url && (
    <div>
      <img
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-once="true"
        className={isRealEstateStyle ? " w-full  h-full rounded-3xl" : "  rounded-3xl"}
        src={sector.image_url}
        alt={title}
      />
    </div>
  );

  return (
    // pt كبير عشان الصفحة تبدأ تحت الناف
    <div className="pt-28 md:pt-36" dir={isArabic ? "rtl" : "ltr"}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-10">

          {isRealEstateStyle && image}

          <div
            className="relative"
            data-aos-duration="1000"
            data-aos="zoom-in"
            data-aos-once="true"
          >
            {header}

            {features.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center pb-10">
                {[list1, list2].map((list, li) => (
                  <div key={li}>
                    {isRealEstateStyle ? (
                      <ul className="m-0 p-0">
                        {list.map((item) => (
                          <li key={item}>
                            <span className=" flex justify-start  py-2  items-center gap-1  text-primary">
                              <RiArrowDropLeftFill className={`text-3xl ${isArabic ? "" : "rotate-180"}`} />
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className=" flex flex-col gap-3 ">
                        {list.map((item) => (
                          <li key={item}>
                            <span className={chipClass}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {!isRealEstateStyle && image}
        </div>

        {/* مشروعات القطاع (لو فيه مشروعات متربطة بالقطاع ده) */}
        {projects.length > 0 && sector.id && (
          <div className="pt-6 pb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-8">{L.projects}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <Link key={p.id} to={`/projects/${p.id}`} className="group relative block h-[340px] overflow-hidden rounded-3xl bg-navy">
                  {p.image_url && (
                    <img src={p.image_url} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-7 text-white">
                    <h3 className="text-2xl font-bold mb-2">{localized(p, "title", i18n.language)}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">{localized(p, "description", i18n.language)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
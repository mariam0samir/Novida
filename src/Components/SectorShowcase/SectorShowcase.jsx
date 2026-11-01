import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSectorShowcase } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

const SectorShowcase = () => {
  const { i18n } = useTranslation();
  const { data: sections } = useSectorShowcase();
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [sections.length]);

  if (sections.length === 0) return null;

  const activeSection = sections[Math.min(activeIndex, sections.length - 1)];

  return (
    <section className="container py-9 bg-white" dir="rtl">
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%]">

        {/* الصور */}
        <div className=" border-e-2  border-gray-200">
          {sections.map((section, index) => (
            <div 
              key={section.id}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              data-index={index}
                            className="h-[65vh] overflow-hidden mb-6 me-8 rounded-2xl"
            >
              <img
                src={section.image_url}
                alt={localized(section, "title", i18n.language)}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* المحتوى */}
        <div className="relative ">
          <div className="sticky top-24 h-[65vh] flex items-center px-8 lg:px-14">            
            <div
              key={activeSection.id}
              className="w-full animate-fade-up"
            >
              <p className="text-sm text-gray-500 mb-5">
                {localized(activeSection, "subtitle", i18n.language)}
              </p>

              <h2 className="text-3xl lg:text-5xl font-bold leading-tight text-black mb-7">
                {localized(activeSection, "title", i18n.language)}
              </h2>

              <p className="text-gray-600 text-base lg:text-lg leading-8 max-w-md mb-10">
                {localized(activeSection, "description", i18n.language)}
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default SectorShowcase;
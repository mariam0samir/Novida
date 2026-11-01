import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useProjects } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const OurBrojects = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  // المشروعات من جدول projects في Supabase
  const { data: slides } = useProjects();

  return (
    <section
      id="OurBrojects"
      className="w-full py-15 pt-20 bg-white overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <h1
          data-aos="fade-up"
          data-aos-offset="0"
          data-aos-once="true"
          data-aos-delay="300"
          className={`
            text-4xl
            md:text-5xl
            mb-7
            font-extrabold
            text-primary
            ${isArabic ? "text-right" : "text-left"}
          `}
        >
          {t("ourProjects.title")}
        </h1>

        {slides.length > 0 && (
        <Swiper
          key={`${i18n.language}-${slides.length}`}
          dir={isArabic ? "rtl" : "ltr"}

          modules={[
            Autoplay,
            Pagination,
            Navigation,
          ]}

          spaceBetween={24}

          slidesPerView={1}

          loop={slides.length > 3}

          speed={1000}

          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}

          pagination={{
            clickable: true,
          }}

          navigation={true}

          breakpoints={{
            640: {
              slidesPerView: 1,
            },

            768: {
              slidesPerView: 2,
            },

            1024: {
              slidesPerView: 3,
            },
          }}

          className="w-full"
        >
          {slides.map((slide) => (
            <SwiperSlide
              key={`${i18n.language}-${slide.id}`}
            >
              <Link
                to={`/projects/${slide.id}`}
                className="
                  block
                  group
                  relative
                  h-[420px]
                  overflow-hidden
                  rounded-3xl
                "
              >
                <img
                  src={slide.image_url}
                  alt={localized(slide, "title", i18n.language)}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover

                    transition-transform
                    duration-700

                    group-hover:scale-110
                  "
                />

                <div className="absolute inset-0 bg-black/40" />

                <div
                  className={`
                    absolute
                    inset-0

                    flex
                    flex-col
                    justify-end

                    p-8

                    text-white

                    ${
                      isArabic
                        ? "text-right"
                        : "text-left"
                    }
                  `}
                >
                  <h3 className="text-3xl font-bold mb-3">
                    {localized(slide, "title", i18n.language)}
                  </h3>

                  <p className="text-sm md:text-base text-white/80">
                    {localized(slide, "description", i18n.language)}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        )}

      </div>
    </section>
  );
};

export default OurBrojects;
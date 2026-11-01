import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import useNewsData from "../../hooks/useNewsData";
import { useTranslation } from "react-i18next";

import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight, Plus } from "lucide-react";


export default function LastNews() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { newsData } = useNewsData();
  return (
    <section className="py-10 bg-[#f7f7f7] overflow-hidden">

      {/* Header */}
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex items-center justify-between gap-4 mb-10 flex-wrap">

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-black">
            {t("news.latestTitle")}
          </h2>

          <div className="flex items-center gap-3">

            <button
              className="
                news-prev
                w-12 h-12
                border border-gray-300
                flex items-center justify-center
                hover:bg-black hover:text-white
                transition
              "
            >
              <ArrowLeft size={20} />
            </button>

            <button
              className="
                news-next
                w-12 h-12
                border border-black
                flex items-center justify-center
                hover:bg-black hover:text-white
                transition
              "
            >
              <ArrowRight size={20} />
            </button>

            <Link
              to="/NewsPage"
              className="
                h-12
                px-5
                border border-black
                flex items-center gap-2
                hover:bg-black hover:text-white
                transition
              "
            >
              <Plus size={18} />

              <span className="text-sm tracking-wider">
                {t("news.learnMore")}
              </span>
            </Link>

          </div>
        </div>
      </div>

      {/* 
        المسافة من الشمال فقط
        السلايدر يبدأ كأنه داخل container
        ويكمل ناحية اليمين
      */}
      <div
        style={{
          paddingLeft:
            "max(24px, calc((100vw - 1300px) / 2 + 24px))",
        }}
      >

        <Swiper
          key={`${i18n.language}-${newsData.length}`}
          dir="ltr"
          modules={[Navigation]}
          navigation={{
            prevEl: ".news-prev",
            nextEl: ".news-next",
          }}
          loop={newsData.length > 2}
          grabCursor={true}
          breakpoints={{
            0: {
              slidesPerView: 1.05,
              spaceBetween: 14,
            },

            640: {
              slidesPerView: 1.15,
              spaceBetween: 18,
            },

            768: {
              slidesPerView: 1.3,
              spaceBetween: 24,
            },

            1024: {
              slidesPerView: 1.55,
              spaceBetween: 30,
            },

            1280: {
              slidesPerView: 1.8,
              spaceBetween: 40,
            },
          }}
        >

          {newsData.map((news) => (
            <SwiperSlide key={news.id} className="h-auto">

              <div
                dir={isArabic ? "rtl" : "ltr"}
                className="
                  bg-white
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  cursor-pointer
                  md:h-[430px]
                  overflow-hidden
                "
              >
                   {/* Image */}
                <div
                  className="
                    h-[230px]
                    sm:h-[280px]
                    md:h-full
                    overflow-hidden
                  "
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                </div>

                {/* Text */}
                <div
                  className="
                    p-6
                    md:p-7
                    lg:p-8
                    flex
                    flex-col
                    justify-between
                    
                    min-h-[370px]
                    md:min-h-0
                    h-full
                  "
                >

                  <div>

                    <span
                      className="
                        inline-block
                        px-4
                        py-2
                        rounded-full
                        bg-gray-100
                        text-sm
                        mb-5
                      "
                    >
                      {news.category}
                    </span>

                    <p className="text-sm text-gray-500 mb-4">
                      {news.date}
                    </p>

                    <h3
                      className="
                        text-xl
                        lg:text-2xl
                        font-medium
                        leading-[1.5]
                        mb-4
                      "
                    >
                      {news.title}
                    </h3>

                    <p
                      className="
                        text-gray-600
                        text-sm
                        lg:text-base
                        leading-7
                      "
                    >
                      {news.description}
                    </p>

                  </div>

                  <Link 
                    to={`/news/${news.id}`}
                    className="
                      mt-5
                      w-fit
                      px-5
                      py-3
                      border
                      border-black
                      flex
                      items-center
                      gap-3
                      hover:bg-black
                      hover:text-white
                      transition
                    "
                  >
                    <Plus size={18} />

                    <span className="text-sm">
                      {t("news.learnMore")}
                    </span>
                  </Link>

                </div>

             

              </div>

            </SwiperSlide>
          ))}

        </Swiper>
      </div>

    </section>
  );
}
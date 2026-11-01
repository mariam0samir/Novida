import PageHeader from "../PageHeader/PageHeader.jsx";
import { useTranslation } from "react-i18next";

import headerImg from "../../assets/HowWEare.png";

import image1 from "../../assets/about-C76B1iu3.jpg";
import image2 from "../../assets/sector-realestate-DeXrcN_Y.jpg";
import image3 from "../../assets/sector-tech-meocfLEh (1).jpg";
import image4 from "../../assets/sector-tourism-BZqUx8sX (1).jpg";

function HowWEare() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

 
  const sectionsData = [
    {
      id: 1,
      titleKey: "aboutShowcase.section1.title",
      descriptionKey: "aboutShowcase.section1.description",
      image: image1,
      imagePosition: "right",
    },

    {
      id: 2,
      titleKey: "aboutShowcase.section2.title",
      descriptionKey: "aboutShowcase.section2.description",
      image: image2,
      imagePosition: "left",
    },

    {
      id: 3,
      titleKey: "aboutShowcase.section3.title",
      descriptionKey: "aboutShowcase.section3.description",
      image: image3,
      imagePosition: "right",
    },

    {
      id: 4,
      titleKey: "aboutShowcase.section4.title",
      descriptionKey: "aboutShowcase.section4.description",
      image: image4,
      imagePosition: "left",
    },
  ];

  return (
    <div
      className="w-full bg-white mb-3"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 
          PAGE HEADER
      = */}

      <PageHeader
        image={headerImg}
        title={t("navbar.whoWeAre")}
        description={t("aboutShowcase.headerDescription")}
      />

      {/* 
          INTRO SECTION
      = */}

      <section className="w-full bg-white">
        <div className="container">
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2

              gap-10
              lg:gap-20

              py-16
              md:py-20
              lg:py-24

              border-b
              border-gray-200
            "
          >
            {/* Intro Title */}

            <div
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-once="true"
            >
              <h2
                className="
                  text-primary

                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl

                  font-medium

                  leading-[1.15]

                  max-w-[650px]
                "
              >
                {t("aboutShowcase.intro.title")}
              </h2>
            </div>

            {/* Intro Description */}

            <div
              className="
                space-y-6

                text-gray-700

                text-sm
                sm:text-base
                md:text-lg

                leading-7
                md:leading-8
              "
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-delay="150"
              data-aos-once="true"
            >
              <p>
                {t("aboutShowcase.intro.paragraph1")}
              </p>

              <p>
                {t("aboutShowcase.intro.paragraph2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
          SECTIONS
      = */}

      <section className="w-full bg-white overflow-hidden">
        {sectionsData.map((item, index) => {
          const imageOnRight =
            item.imagePosition === "right";

          return (
            <div
              key={`about-section-${item.id}`}
              className="
                grid
                grid-cols-1
                lg:grid-cols-2

                w-full

                border-b
                border-gray-200

                min-h-[500px]
                lg:min-h-[560px]
              "
            >

              {/* =====================
                  TEXT
              ====================== */}

              <div
                className={`
                  flex
                  items-center

                  bg-white

                  px-6
                  sm:px-8
                  md:px-12
                  lg:px-16
                  xl:px-20

                  py-14
                  md:py-16
                  lg:py-20

                  ${
                    imageOnRight
                      ? "lg:order-1"
                      : "lg:order-2"
                  }
                `}
              >
                <div
                  className="
                    max-w-[600px]
                    w-full
                  "
                  data-aos={
                    imageOnRight
                      ? "fade-up"
                      : "fade-up"
                  }
                  data-aos-offset="0"
                  data-aos-once="true"
                >
                  {/* Number */}

                  <span
                    className="
                      block

                      text-primary

                      text-sm
                      md:text-base

                      font-bold

                      mb-5
                    "
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}

                  <h3
                    className="
                      text-black

                      text-3xl
                      sm:text-4xl
                      md:text-5xl

                      font-medium

                      leading-tight

                      mb-6
                    "
                  >
                    {t(item.titleKey)}
                  </h3>

                  {/* Description */}

                  <p
                    className="
                      text-gray-700

                      text-sm
                      sm:text-base
                      md:text-lg

                      leading-7
                      md:leading-8

                      max-w-[550px]
                    "
                  >
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </div>

              {/* =====================
                  IMAGE
              ====================== */}

              <div
                className={`
                  relative

                  min-h-[350px]
                  sm:min-h-[420px]
                  lg:min-h-[560px]

                  overflow-hidden

                  ${
                    imageOnRight
                      ? "lg:order-2"
                      : "lg:order-1"
                  }
                `}
              >
                <img
                  src={item.image}
                  alt={t(item.titleKey)}
                  className="
                    absolute
                    inset-0

                    w-full
                    h-full

                    object-cover

                    transition-transform
                    duration-700
                    ease-out

                    hover:scale-105
                  "
                />

                {/* Very light overlay */}

                <div
                  className="
                    absolute
                    inset-0

                    bg-black/[0.03]

                    pointer-events-none
                  "
                />
              </div>

            </div>
          );
        })}
      </section>
    </div>
  );
}

export default HowWEare;
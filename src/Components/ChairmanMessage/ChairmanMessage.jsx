import PageHeader from "../PageHeader/PageHeader.jsx";
import { useTranslation } from "react-i18next";
import { useChairmanMessage } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

import headerImg from "../../assets/HowWEare.png";

function ChairmanMessage() {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  // الكلمة من لوحة التحكم (جدول chairman_message)
  const { data: chairman } = useChairmanMessage();

  // لو الكلمة مكتوبة في لوحة التحكم نستخدمها، ولو لأ يظهر الكلام القديم من ملفات الترجمة
  const fromDashboard = (field) => chairman && localized(chairman, field, i18n.language);

  const title = fromDashboard("message_title") || t("chairmanMessage.title");
  const name = fromDashboard("name") || t("chairmanMessage.name");
  const position = fromDashboard("position") || t("chairmanMessage.position");

  const dashboardMessage = fromDashboard("message");
  const paragraphs = dashboardMessage
    ? dashboardMessage.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [
        t("chairmanMessage.paragraph1"),
        t("chairmanMessage.paragraph2"),
        t("chairmanMessage.paragraph3"),
        t("chairmanMessage.paragraph4"),
      ];

  return (
    <div
      className="w-full bg-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <PageHeader
        image={headerImg}
        title={t("chairmanMessage.pageTitle")}
        description={t("chairmanMessage.headerDescription")}
      />

      <section className="w-full py-16 md:py-24">
        <div className="container">
          <div
            className="
              max-w-[1000px]
              mx-auto
            "
          >
            <div
              data-aos="fade-up"
              data-aos-once="true"
            >
              <span
                className="
                  block
                  text-primary
                  text-sm
                  font-bold
                  mb-4
                "
              >
                {t("chairmanMessage.label")}
              </span>

              <h2
                className="
                  text-black
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-extrabold
                  leading-tight
                  mb-8
                "
              >
                {title}
              </h2>

              <div
                className="
                  space-y-6
                  text-gray-700
                  text-base
                  md:text-lg
                  leading-8
                  md:leading-9
                "
              >
                {paragraphs.map((paragraph, index) => (
                  <p key={`chairman-paragraph-${index}`}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div
                className="
                  mt-10
                  pt-6
                  border-t
                  border-gray-200
                "
              >
                <p
                  className="
                    text-primary
                    text-xl
                    md:text-2xl
                    font-bold
                  "
                >
                  {name}
                </p>

                <p className="text-gray-500 mt-1">
                  {position}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChairmanMessage;
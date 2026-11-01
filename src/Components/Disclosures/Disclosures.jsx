import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReports } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

const ReportsPage = () => {
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const [activeTab, setActiveTab] = useState("board");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  /*
    ======================================
    التقارير من لوحة التحكم (جدول reports)
    report_type = board            → مجلس الإدارة
    report_type = general_assembly → الجمعيات العامة
    ======================================
  */

  const { data: allReports } = useReports();

  /*
    ======================================
    التابات
    ======================================
  */

  const tabs = [
    {
      id: "board",
      reportType: "board",
      labelKey: "reports.board.title",
    },

    {
      id: "generalAssembly",
      reportType: "general_assembly",
      labelKey: "reports.generalAssembly.title",
    },

    {
      id: "financialStatements",
      reportType: "financial_statements",
      label: { ar: "الميزانيات", en: "Financial Statements" },
    },
  ];

  const tabLabel = (tab) =>
    tab.label ? tab.label[isArabic ? "ar" : "en"] : t(tab.labelKey);

  /*
    ======================================
    التقارير الحالية
    ======================================
  */

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const currentReports = allReports
    .filter((item) => item.report_type === activeTabData.reportType)
    .map((item) => ({
      id: item.id,
      title: localized(item, "title", i18n.language),
      date: item.report_date,
      year: Number(item.year),
      file: item.file_url,
    }));

  /*
    ======================================
    استخراج السنوات تلقائيًا
    ======================================
  */

  const years = [
    ...new Set(
      allReports
        .map((item) => Number(item.year))
        .filter(Boolean)
    ),
  ].sort((a, b) => b - a);

  /*
    ======================================
    فلترة وترتيب
    ======================================
  */

  const filteredReports = useMemo(() => {
    let data = [...currentReports];

    if (selectedYear !== "all") {
      data = data.filter(
        (item) => item.year === Number(selectedYear)
      );
    }

    data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === "newest") {
        return dateB - dateA;
      }

      return dateA - dateB;
    });

    return data;
  }, [
    activeTab,
    selectedYear,
    sortOrder,
    currentReports,
  ]);

  /*
    ======================================
    تنسيق التاريخ
    ======================================
  */

  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat(
      isArabic ? "ar-EG" : "en-GB",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ).format(new Date(date));
  };

  return (
    <div
      className="w-full min-h-screen bg-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* =========================
          HEADER
      ========================== */}

      <section className="pt-36 md:pt-44 pb-14">
        <div className="container">

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              md:text-sm
              text-gray-500
              mb-10
            "
          >
            <span>
              {t("reports.breadcrumb.home")}
            </span>

            <span>›</span>

            <span>
              {t("reports.breadcrumb.investors")}
            </span>

            <span>›</span>

            <span className="text-primary font-bold">
              {t("reports.breadcrumb.current")}
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-10
              lg:gap-20
              items-start
            "
          >
            <div>
              <h1
                className="
                  text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-extrabold
                  text-black
                  leading-tight
                "
              >
                {t("reports.pageTitle")}
              </h1>
            </div>

            <div className="lg:pt-5">
              <p
                className="
                  text-gray-700
                  text-base
                  md:text-lg
                  leading-8
                  max-w-[600px]
                "
              >
                {t("reports.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          TABS
      ========================== */}

      <section className="border-b border-gray-200">
        <div className="container">
          <div
            className="
              flex
              gap-10
              overflow-x-auto
            "
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedYear("all");
                }}
                className={`
                  relative
                  py-5

                  whitespace-nowrap

                  text-sm
                  md:text-base

                  font-bold

                  transition-colors
                  duration-300

                  ${
                    activeTab === tab.id
                      ? "text-primary"
                      : "text-gray-600 hover:text-primary"
                  }
                `}
              >
                {tabLabel(tab)}

                {activeTab === tab.id && (
                  <span
                    className="
                      absolute
                      bottom-0
                      left-0

                      w-full
                      h-[3px]

                      bg-primary
                    "
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          FILTERS
      ========================== */}

      <section className="py-10">
        <div className="container">
          <div
            className="
              flex
              flex-col
              md:flex-row

              gap-6

              md:items-center
              md:justify-between
            "
          >
            {/* السنة */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-3
              "
            >
              <span className="text-sm font-bold">
                {t("reports.filters.year")}
              </span>

              <select
                value={selectedYear}
                onChange={(e) =>
                  setSelectedYear(e.target.value)
                }
                className="
                  min-w-[190px]

                  border
                  border-gray-200

                  bg-white

                  px-4
                  py-3

                  outline-none

                  focus:border-primary
                "
              >
                <option value="all">
                  {t("reports.filters.allYears")}
                </option>

                {years.map((year) => (
                  <option
                    key={`report-year-${year}`}
                    value={year}
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* الترتيب */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-3
              "
            >
              <span className="text-sm font-bold">
                {t("reports.filters.sort")}
              </span>

              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value)
                }
                className="
                  min-w-[190px]

                  border
                  border-gray-200

                  bg-white

                  px-4
                  py-3

                  outline-none

                  focus:border-primary
                "
              >
                <option value="newest">
                  {t("reports.filters.newest")}
                </option>

                <option value="oldest">
                  {t("reports.filters.oldest")}
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          REPORT CARDS
      ========================== */}

      <section className="pb-24">
        <div className="container">

          {filteredReports.length > 0 ? (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4

                gap-4
              "
            >
              {filteredReports.map((report) => (
                <a
                  key={`${activeTab}-${report.id}`}
                  href={report.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    group

                    min-h-[240px]

                    border
                    border-gray-200

                    bg-white

                    p-6

                    flex
                    flex-col
                    justify-between

                    transition-all
                    duration-300

                    hover:border-primary
                    hover:shadow-lg
                  "
                >
                  <div>
                    <span
                      className="
                        inline-block

                        bg-gray-100

                        text-gray-600

                        text-xs
                        font-bold

                        px-2
                        py-1

                        mb-5
                      "
                    >
                      {tabLabel(activeTabData)}
                    </span>

                    <h3
                      className="
                        text-xl

                        text-black

                        font-bold

                        leading-8

                        transition-colors
                        duration-300

                        group-hover:text-primary
                      "
                    >
                      {report.title}
                    </h3>
                  </div>

                  <div className="mt-8">
                    <span className="text-sm text-gray-500">
                      {formatDate(report.date)}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div
              className="
                py-24
                text-center
                text-gray-500
              "
            >
              {t("reports.noResults")}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default ReportsPage;
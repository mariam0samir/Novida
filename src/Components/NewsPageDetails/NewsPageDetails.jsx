import { useParams, Link } from "react-router-dom";
import useNewsData from "../../hooks/useNewsData";
export default function NewsPageDetails() {
  const { id } = useParams();
  const { newsData, loading } = useNewsData();

  const news = newsData.find(
    (item) => String(item.id) === String(id)
  );

    if (loading) {
    return <div className="min-h-screen" />;
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        الخبر غير موجود
      </div>
    );
  }

 
  return (
    <section
      className="min-h-screen bg-white pt-36 pb-20"
      dir="rtl"
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500">
          <Link to="/">الرئيسية</Link>
          <span className="mx-2">/</span>

          <Link to="/NewsPage">
            الأخبار
          </Link>

          <span className="mx-2">/</span>

          <span>{news.category}</span>
        </div>

        {/* Title */}
        <div className="max-w-[950px] mx-auto mb-10 text-center">

          <h1 className="text-3xl md:text-5xl font-medium leading-[1.4]">
            {news.title}
          </h1>

        </div>

        {/* Image */}
        <div className="w-full h-[350px] md:h-[550px] overflow-hidden mb-14">

          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />

        </div>

        {/* Content */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-[150px_1fr]
            gap-10
            max-w-[950px]
            mx-auto
          "
        >

          {/* Date */}
          <div>
            <p className="text-sm text-gray-400 mb-2">
              التاريخ
            </p>

            <p className="text-sm">
              {news.date}
            </p>
          </div>

          {/* Article */}
          <article>

            <p className="text-lg leading-9 mb-7">
              {news.description}
            </p>

            <p className="text-gray-600 text-base md:text-lg leading-9">
              {news.details}
            </p>

          </article>

        </div>

      </div>
    </section>
  );
}
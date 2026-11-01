import { Link } from "react-router-dom";
import useNewsData from "../../hooks/useNewsData";

const NewsPage = () => {
  const { newsData } = useNewsData();  
  return (
    <section
      className="bg-[#f7f7f7] min-h-screen py-24"
      dir="rtl"
    >
      <div className="max-w-[1300px] mx-auto px-5 md:px-6">

        <div className="my-12">
          <h1 className="text-4xl md:text-6xl font-medium text-black">
            آخر الأخبار
          </h1>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-x-6
            gap-y-10
          "
        >
         {newsData.map((news) => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="block"
            >
              <article
                className="
                  bg-white
                  overflow-hidden
                  group
                  flex
                  flex-col
                  h-full
                "
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">

                  <div className="mb-4">
                    <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-xs">
                      {news.category}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    {news.date}
                  </p>

                  <h2 className="text-lg font-medium leading-7 mb-3">
                    {news.title}
                  </h2>

                  <p className="text-sm text-gray-600 leading-6 mb-6">
                    {news.description}
                  </p>

                </div>
              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewsPage;
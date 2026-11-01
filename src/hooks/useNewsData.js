import { useTranslation } from "react-i18next";
import { useNews } from "./useContent";
import { localized, isArabic } from "../utils/localized";

/**
 * بديل newsData الثابتة: يرجع الأخبار من جدول news بنفس شكل الـ Array القديمة
 * { id, category, date, title, description, details, image }
 * حتى لا يتغير تصميم LastNews / NewsPage / NewsPageDetails.
 */
export default function useNewsData(limit) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, loading, error } = useNews(limit);

  const fmt = new Intl.DateTimeFormat(isArabic(lang) ? "ar-EG-u-nu-latn" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const newsData = data.map((n) => ({
    id: n.id,
    category: localized(n, "category", lang),
    date: n.published_at ? fmt.format(new Date(n.published_at)) : "",
    title: localized(n, "title", lang),
    description: localized(n, "excerpt", lang),
    details: localized(n, "content", lang),
    image: n.image_url,
  }));

  return { newsData, loading, error };
}

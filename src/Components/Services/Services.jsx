import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSectors } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

const Services = () => {
  const { t, i18n } = useTranslation();
  const { data: allCards } = useSectors();

  return (
    <div>
        <div className="container mt-4">
     <div  data-aos="zoom-in"
                        data-aos-duration="1000" 
                        data-aos-once="true"  className="flex flex-col items-center justify-center py-5 mb-5">

  <span className="haeder  text-primary font-bold text-sm">
    {t("sectorsSection.label")}
  </span>

  <h2 className="font-extrabold md-text-5xl text-3xl text-primary my-7 ">
    {t("sectorsSection.title")}
  </h2>

  <p className="text-primary">
    {t("sectorsSection.subtitle")}
  </p>

</div>
          {/* items-stretch: كل الكروت بنفس الطول */}
          <div  className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-10 items-stretch py-10">
           {/* cards */}
           
           {
          allCards.map((card, index)=>{
            const title = localized(card, "title", i18n.language);
            return <div data-aos="fade-up" 
                     data-aos-offset="0"
                 data-aos-once="true"
                 data-aos-delay={String(400 * (index + 1))}
                  key={card.id}  className="card-ser shadow-lg transition-all duration-300 hover:shadow-2xl   rounded-b-3xl flex flex-col h-full">
            {/* ارتفاع ثابت للصورة مهما كان مقاسها */}
            <div className="rounded-t-3xl overflow-hidden h-[240px] shrink-0 bg-gray-100"><img className="rounded-t-3xl transition-all duration-300 ease-in-out w-full h-full object-cover
              " src={card.image_url} alt={title}/></div>
            <div className="p-7 flex flex-col flex-1">
            <h3 className="text-primary text-xl text-center font-extrabold pb-3">{title}</h3>
            <p className="text-secondary2 py-2 pb-3 leading-9">{localized(card, "description", i18n.language)}</p>
            {/* بيفتح صفحة القطاع: /sectors/technology مثلاً */}
            <span className="text-primary font-extrabold cursor-pointer mt-auto"> <Link to={`/sectors/${card.slug}`}>{t("sectorsSection.discover")}</Link>  </span>
            </div>
           </div>
            })
           }
          </div>
        </div>
    </div>
  )
}

export default Services
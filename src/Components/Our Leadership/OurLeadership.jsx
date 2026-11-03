import './OurLeadership.css'
import { useTranslation } from "react-i18next";
import { useLeaders } from "../../hooks/useContent";
import { localized } from "../../utils/localized";
import defaultLeadImg from "../../assets/lead.png"

// البيانات من جدول leaders — الصورة الافتراضية تظهر إذا لم تُرفع صورة
// كل الكروت بنفس المقاس: الصورة في إطار ثابت 3:4، والنبذة مقصوصة على 5 سطور
const OurLeadership = () => {
  const { i18n } = useTranslation();
  const { data: leads } = useLeaders();

  return (
    <div>
      <div className="container py-20">
        <div className="text-center pb-32 pt-20">
          <h1 data-aos="fade-up"
            data-aos-offset="0"
            data-aos-once="true"
            data-aos-delay="300" className=" mb-5 text-3xl
                sm:text-4xl
                md:text-5xl
                font-bold font-extrabold   text-center">القياده<br /> التي تقود التقدم
          </h1>
          <p>مجلس الاداره </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 items-stretch">
          {
            leads.map((lead) => {
              const name = localized(lead, "name", i18n.language);
              const bio = localized(lead, "bio", i18n.language);
              return (
                <div key={lead.id} className="board-card hover:text-primary hover:border-primary cursor-pointer w-full h-full flex flex-col">
                  <div className="w-full aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                    <img
                      className="w-full h-full object-cover object-top"
                      src={lead.image_url || defaultLeadImg}
                      alt={name}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = defaultLeadImg; }}
                    />
                  </div>
                  <h2 className="pt-4 pb-2 text-black font-extrabold">{name}</h2>
                  <h3 className="text-textPara mb-4">{localized(lead, "position", i18n.language)}</h3>
                  {bio && <p className="text-textPara text-sm mb-4 line-clamp-5" title={bio}>{bio}</p>}
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default OurLeadership

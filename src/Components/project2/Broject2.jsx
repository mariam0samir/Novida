import "../About/About.css"
import Broject2Img from "../../assets/realestate-wide-D7lRFZ2_.jpg"
import { RiArrowDropLeftFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

  const listBrogects = [
    { id: 1, key: "sector2.items.item1" },
    { id: 2, key: "sector2.items.item2" },
    { id: 3, key: "sector2.items.item3" },
  ];

  const listBrogects2 = [
    { id: 1, key: "sector2.items.item4" },
    { id: 2, key: "sector2.items.item5" },
    { id: 3, key: "sector2.items.item6" },
  ];

const Broject2 = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div className=" transition-all" id="#">
        <div className='container '>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center '>
                 {/* image for the section */}
                <div>
                    <div>
                        <img data-aos="zoom-in"
                        data-aos-duration="1000" 
                        data-aos-once="true" 
                        className=" w-full  h-full rounded-3xl" src={Broject2Img} alt=" Novida" />
                    </div>
                </div>
                {/* Content for the  section */}
                <div className="relative " data-aos-duration="1000"    data-aos="zoom-in"
                
                 data-aos-once="true">
                    <span className="haed-about ms-7  text-primary font-bold text-sm mb-7 block">
{t("sector2.label")}      </span>
                    <h1 data-aos="fade-up" 
                     data-aos-offset="0"
                 data-aos-once="true"
                 data-aos-delay="300" className="text-4xl md:text-5xl font-extrabold text-primary mb-7">{t("sector2.title")}</h1>
                    <p data-aos="fade-up" 
                     data-aos-offset="0"
                 data-aos-once="true"
                 data-aos-delay="400" className=" mb-4 text-textPara text-lg leading-8"> {t("sector2.description")} </p>
                    
                    {/* lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center pb-10">
                        <div>
                            <ul className="m-0 p-0">
                                {
                                    listBrogects.map((list)=>{
                                    return <li key={list.id} className=" ">
                                    <a className=" flex justify-start  py-2  items-center gap-1  text-primary">
                                    <RiArrowDropLeftFill className={`text-3xl ${isArabic ? "" : "rotate-180"}`} />
                                    {t(list.key)}
                                    </a>
                                </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <ul className="m-0 p-0">
                                {
                                    listBrogects2.map((list)=>{
                                    return <li key={list.id} className=" ">
                                    <a className=" flex justify-start  py-2  items-center gap-1  text-primary">
                                    <RiArrowDropLeftFill className={`text-3xl ${isArabic ? "" : "rotate-180"}`} />
                                    {t(list.key)}
                                    </a>
                                </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default Broject2
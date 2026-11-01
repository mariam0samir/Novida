import "./Banner.css"
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";
function Banner() {
  const { t } = useTranslation();
  return (
    <div className="Banner ">
       <div className="container  mx-auto h-full">
        <div className="Banner-content  ">
           <div className="">
             <h2 className="mb-7 font-extrabold text-4xl leading-tight text-primary">{t("banner.title")}</h2>
            <h3 className="text-2xl mb-8 text-navy w-9/12">{t("banner.line1")} <br/> {t("banner.line2")}</h3>
             <button> 
                  <Link className=' cursor-pointer hover:bg-white hover:text-primary transition-all  bg-primary font-bold text-white py-2 px-6  rounded-lg' to="/TextMe">{t("banner.button")} </Link>
             </button>
           </div>
        </div>
       </div>
    </div>
  )
}

export default Banner

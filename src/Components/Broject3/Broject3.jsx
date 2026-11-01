import "../About/About.css";
import AboutImg from "../../assets/hospitality-wide-Dfn8HXIv.jpg";
import { useTranslation } from "react-i18next";
const listBrogects = [
  { id: 1, key: "sector3.items.item1" },
  { id: 2, key: "sector3.items.item2" },
  { id: 3, key: "sector3.items.item3" },
  { id: 4, key: "sector3.items.item4" },
];

const listBrogects3 = [
  { id: 1, key: "sector3.items.item5" },
  { id: 2, key: "sector3.items.item6" },
  { id: 3, key: "sector3.items.item7" },
  { id: 4, key: "sector3.items.item8" },
];
const Broject3 = () => {
  const { t } = useTranslation();
  return (
    <div>
      
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
          {/* Content for the About section */}
          <div
            className="relative"
            data-aos-duration="1000"
            data-aos="zoom-in"
            data-aos-once="true"
          >
            <span className="haed-about ms-7  text-primary font-bold text-sm mb-4 block">
              {t("sector3.label")}{" "}
            </span>
            <h1
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-once="true"
              data-aos-delay="300"
              className="text-4xl md:text-5xl font-extrabold text-primary mb-4"
            >
              {t("sector3.title")}
            </h1>
            <p
              data-aos="fade-up"
              data-aos-offset="0"
              data-aos-once="true"
              data-aos-delay="400"
              className=" mb-4 text-textPara text-lg leading-8"
            >
              {t("sector3.description")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 items-center pb-10">
              <div>
                <ul className=" flex flex-col gap-3 ">
                  {listBrogects.map((list) => {
                    return (
                      <li key={list.id}>
                        <a
                          className="
          w-full
          min-h-[58px]
          px-6
          flex
          items-center
          justify-start
          text-primary
          text-lg
          border
          border-gray-200
          rounded-[24px]
          bg-white
          shadow-[0_3px_8px_rgba(0,0,0,0.08)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_6px_15px_rgba(0,0,0,0.12)]
        "
                        >
                          {t(list.key)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-3 ">
                  {listBrogects3.map((list) => {
                    return (
                      <li key={list.id}>
                        <a
                          className="
          w-full
          min-h-[58px]
          px-6
          flex
          items-center
          justify-start
          text-primary
          text-lg
          border
          border-gray-200
          rounded-[24px]
          bg-white
          shadow-[0_3px_8px_rgba(0,0,0,0.08)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-[0_6px_15px_rgba(0,0,0,0.12)]
        "
                        >
                          {t(list.key)}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          {/* image for the about section */}
          <div>
            <div>
              <img
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-once="true"
                className="  rounded-3xl"
                src={AboutImg}
                alt="About Novida"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Broject3;

import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import { useSiteSettings } from "../../hooks/useContent";
import { localized } from "../../utils/localized";

import { FaFacebookF } from "react-icons/fa";
import {
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const { t, i18n } = useTranslation();

  // الروابط وبيانات التواصل من لوحة التحكم (بيانات التواصل والسوشيال)
  const { data: settings } = useSiteSettings();
  const phone = settings?.phone || "+20 XX XXX XXXX";
  const email = settings?.email || "info@novidainvestment.com";
  const address = localized(settings, "address", i18n.language);

  return (
    <footer className="w-full overflow-hidden bg-navy/90 backdrop-blur-xl shadow-lg">
      
      <div
        className="
          w-full
          max-w-[1400px]
          mx-auto

          px-4
          sm:px-6
          md:px-8
          lg:px-10

          py-10
          sm:py-12
          lg:py-14
        "
      >
        
        {/* =========================
            FOOTER GRID
        ========================== */}

        <div
          className="
            grid

            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4

            gap-8
            sm:gap-10
            lg:gap-12

            items-start
          "
        >
          
          {/* =========================
              LOGO + ABOUT
          ========================== */}

          <div className="min-w-0">

            <ul className="m-0 p-0 list-none">

              <li>
                <a
                  href="/#Home"
                  className="inline-block"
                >
                  <img
                    src={logo}
                    alt="Novida Logo"
                    className="
                      w-auto

                      h-12
                      sm:h-14
                      md:h-16

                      max-w-[150px]
                      sm:max-w-[170px]

                      object-contain
                    "
                  />
                </a>
              </li>

              <li
                className="
                  mt-3

                  text-white

                  text-sm
                  sm:text-base

                  font-bold

                  leading-6
                "
              >
                Investment And Technology
              </li>

              <li
                className="
                  mt-5

                  text-textPara

                  text-sm
                  sm:text-base

                  leading-7

                  max-w-[320px]
                "
              >
                <p>
                                    {localized(settings, "footer_about", i18n.language) || t("footer.about")}
                </p>
              </li>

            </ul>

          </div>


          {/* =========================
              QUICK LINKS
          ========================== */}

          <div className="min-w-0">

            <ul
              className="
                flex
                flex-col

                gap-3
                sm:gap-4

                m-0
                p-0

                list-none
              "
            >

              <li>
                <h2
                  className="
                    text-white

                    font-extrabold

                    text-lg
                    sm:text-xl

                    mb-2
                  "
                >
                  {t("footer.quickLinks")}
                </h2>
              </li>

              <li>
                <a
                  className="
                    text-textPara
                    hover:text-white

                    text-sm
                    sm:text-base

                    transition-colors
                    duration-300
                  "
                  href="/#About"
                >
                  {t("footer.aboutNovida")}
                </a>
              </li>

              <li>
                <a
                  className="
                    text-textPara
                    hover:text-white

                    text-sm
                    sm:text-base

                    transition-colors
                    duration-300
                  "
                  href="/#SectorShowcase"
                >
                  {t("footer.sectors")}
                </a>
              </li>

              <li>
                <a
                  className="
                    text-textPara
                    hover:text-white

                    text-sm
                    sm:text-base

                    transition-colors
                    duration-300
                  "
                  href="/#Services"
                >
                  {t("footer.services")}
                </a>
              </li>

              <li>
                <a
                  className="
                    text-textPara
                    hover:text-white

                    text-sm
                    sm:text-base

                    transition-colors
                    duration-300
                  "
                  href="/#Projects"
                >
                  {t("footer.projects")}
                </a>
              </li>

            </ul>

          </div>


          {/* =========================
              SECTORS
          ========================== */}

          <div className="min-w-0">

            <ul
              className="
                flex
                flex-col

                gap-3
                sm:gap-4

                m-0
                p-0

                list-none
              "
            >

              <li>
                <h2
                  className="
                    text-white

                    font-extrabold

                    text-lg
                    sm:text-xl

                    mb-2
                  "
                >
                  {t("footer.sectors")}
                </h2>
              </li>

              <li>
                <a
                  className="
                    text-textPara
                    hover:text-white

                    text-sm
                    sm:text-base

                    leading-6

                    transition-colors
                    duration-300
                  "
                  
                >
                  {t("footer.tech")}
                </a>
              </li>

              <li>
                <a
                  className="
                    text-textPara
                    hover:text-white

                    text-sm
                    sm:text-base

                    leading-6

                    transition-colors
                    duration-300
                  "
                  
                >
                  {t("footer.realEstate")}
                </a>
              </li>

              <li>
                <a
                  className="
                    text-textPara
                    hover:text-white

                    text-sm
                    sm:text-base

                    leading-6

                    transition-colors
                    duration-300
                  "
                 
                >
                  {t("footer.tourism")}
                </a>
              </li>

            </ul>

          </div>


          {/* =========================
              CONTACT
          ========================== */}

          <div className="min-w-0">

            <ul
              className="
                flex
                flex-col

                gap-3
                sm:gap-4

                m-0
                p-0

                list-none
              "
            >

              <li>
                <h2
                  className="
                    text-white

                    font-extrabold

                    text-lg
                    sm:text-xl

                    mb-2
                  "
                >
                  {t("footer.contactTitle")}
                </h2>
              </li>

              <li
                className="
                  text-textPara

                  text-sm
                  sm:text-base

                  leading-6
                "
              >
                {t("footer.phone")} <span dir="ltr">{phone}</span>
              </li>

              <li className="min-w-0">
                <a
                  className="
                    block

                    text-textPara
                    hover:text-white

                    text-sm
                    sm:text-base

                    leading-6

                    break-all

                    transition-colors
                    duration-300
                  "
                  href={`mailto:${email}`}
                >
                  {t("footer.email")}
                  <span className="block sm:inline">
                    {" "}
                    {email}
                  </span>
                </a>
              </li>

              <li
                className="
                  text-textPara

                  text-sm
                  sm:text-base

                  leading-6
                "
              >
                {address ? `${i18n.language === "ar" ? "العنوان:" : "Address:"} ${address}` : t("footer.address")}
              </li>

            </ul>


            {/* =========================
                SOCIAL MEDIA
            ========================== */}

            <div className="mt-7">

              <h4
                className="
                  mb-4

                  text-white

                  font-bold

                  text-base
                  sm:text-lg
                "
              >
                {t("footer.follow")}
              </h4>

              <div
                className="
                  flex
                  items-center

                  gap-3
                  sm:gap-4

                  flex-wrap
                "
              >

                {settings?.instagram_url && (
                <a
                  className="
                    w-9
                    h-9

                    flex
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10

                    text-textPara

                    hover:bg-white
                    hover:text-navy

                    transition-all
                    duration-300
                  "
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram size={16} />
                </a>
                )}

                {settings?.facebook_url && (
                <a
                  className="
                    w-9
                    h-9

                    flex
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10

                    text-textPara

                    hover:bg-white
                    hover:text-navy

                    transition-all
                    duration-300
                  "
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={15} />
                </a>
                )}

                {settings?.linkedin_url && (
                <a
                  className="
                    w-9
                    h-9

                    flex
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10

                    text-textPara

                    hover:bg-white
                    hover:text-navy

                    transition-all
                    duration-300
                  "
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={16} />
                </a>
                )}

                {settings?.x_url && (
                <a
                  className="
                    w-9
                    h-9

                    flex
                    items-center
                    justify-center

                    rounded-full

                    bg-white/10

                    text-textPara

                    hover:bg-white
                    hover:text-navy

                    transition-all
                    duration-300
                  "
                  href={settings.x_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                >
                  <FaXTwitter size={16} />
                </a>
                )}

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            COPYRIGHT
        ========================== */}

        <div
          className="
            mt-10
            sm:mt-12

            pt-5
            sm:pt-6

            border-t
            border-white/20

            flex
            items-center
            justify-center
          "
        >

          <p
            className="
              w-full

              text-center

              text-textPara

              text-xs
              sm:text-sm

              leading-6

              px-2

              break-words
            "
          >
            © NOVIDA Investment And Technology. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
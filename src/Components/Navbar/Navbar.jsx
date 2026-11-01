import "./Navbar.css";

import { MdKeyboardArrowDown } from "react-icons/md";
import { Languages, Menu, X } from "lucide-react";

import logoWhite from "../../assets/logo.png";
import logoDark from "../../assets/novida-logo-transparent.png";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useIrPages } from "../../hooks/useIR";
import { irPageHref } from "../../services/irApi";

const menuList = [
  {
    id: 1,
    key: "navbar.home",
    link: "/#Home",
  },
  {
    id: 2,
    key: "navbar.whoWeAre",
    link: "/HowWEare",
  },
  {
    // علاقات المستثمرين — القايمة دي بتتملى من لوحة التحكم ← صفحات علاقات المستثمرين
    id: 3,
    key: "navbar.investors",
    label: { ar: "علاقات المستثمرين", en: "Investor Relations" },
    link: "/investors",
    submenu: [
      {
        id: 31,
        key: "navbar.chairmanMessage",
        link: "/ChairmanMessage",
      },
      {
        id: 32,
        key: "navbar.boardMembers",
        link: "/OurLeadership",
      },
      {
        id: 34,
        key: "navbar.financials",
        link: "/financials",
      },
    ],
  },
  {
    id: 4,
    key: "navbar.sectors",
    link: "/#SectorShowcase",
    submenu: [
      {
        id: 41,
        key: "navbar.hospitality",
        link: "/sectors/hospitality",
      },
      {
        id: 42,
        key: "navbar.realEstate",
        link: "/sectors/real-estate",
      },
      {
        id: 43,
        key: "navbar.technology",
        link: "/sectors/technology",
      },
     
    ],
  },
  {
    id: 5,
    key: "navbar.projects",
    link: "/OurBrojects",
  },
  {
    id: 6,
    key: "navbar.news",
    link: "/NewsPage",
  },
];

function Navbar() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // النص: من label (عربي/إنجليزي) أو من ملف الترجمة
  const text = (item) => (item.label ? item.label[isArabic ? "ar" : "en"] : t(item.key));

  // صفحات علاقات المستثمرين من لوحة التحكم (لو لسه مفيش، القايمة القديمة بتفضل زي ما هي)
  const { data: irPages } = useIrPages();
  const menuItems = menuList.map((item) =>
    item.id === 3 && irPages.length
      ? {
          ...item,
          submenu: irPages.map((p) => ({
            id: `ir-${p.id}`,
            label: { ar: p.title_ar, en: p.title_en },
            link: irPageHref(p),
          })),
        }
      : item
  );

  const [scrolled, setScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [activeMenu, setActiveMenu] = useState(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);

  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const isLightNav =
    isHomePage ||
    scrolled ||
    activeMenu !== null ||
    mobileMenuOpen;

  const currentLogo =
    isHomePage ||
    scrolled ||
    activeMenu !== null ||
    mobileMenuOpen
      ? logoWhite
      : logoDark;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 200);

      if (mobileMenuOpen) {
        setShowNav(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY < 100) {
        setShowNav(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, mobileMenuOpen]);

  const changeLanguage = () => {
    const newLanguage =
      i18n.language === "ar"
        ? "en"
        : "ar";

    i18n.changeLanguage(newLanguage);

    document.documentElement.lang = newLanguage;

    document.documentElement.dir =
      newLanguage === "ar"
        ? "rtl"
        : "ltr";
  };

  const activeMenuData = menuItems.find(
    (item) => item.id === activeMenu
  );

  const toggleMobileSubmenu = (id) => {
    setMobileSubmenu(
      mobileSubmenu === id
        ? null
        : id
    );
  };

  return (
    <>
      {/* BLUR OVERLAY */}
      {(activeMenu !== null || mobileMenuOpen) && (
        <div
          className="
            fixed
            inset-0
            z-40

            bg-black/35
            backdrop-blur-md

            transition-all
            duration-500
            ease-[cubic-bezier(0.4,0,0.2,1)]
          "
          onClick={() => {
            setActiveMenu(null);
            setMobileMenuOpen(false);
            setMobileSubmenu(null);
          }}
        />
      )}

      {/* NAVBAR */}
      <div
        onMouseLeave={() => setActiveMenu(null)}
        className={`
          fixed

          top-2
          sm:top-3
          md:top-4
          lg:top-6

          left-1/2
          -translate-x-1/2

          w-[calc(100%-16px)]
          sm:w-[calc(100%-24px)]
          md:w-[calc(100%-40px)]
          lg:w-[calc(100%-64px)]

          max-w-[1500px]

          z-50
          overflow-hidden

          transition-all
          duration-500
          ease-[cubic-bezier(0.4,0,0.2,1)]

          ${
            showNav
              ? "translate-y-0"
              : "-translate-y-[150%]"
          }

          ${
            activeMenu !== null || mobileMenuOpen
              ? `
                bg-navy
                backdrop-blur-xl
                shadow-xl
              `
              : isHomePage
              ? scrolled
                ? `
                  bg-navy/70
                  backdrop-blur-xl
                  shadow-lg
                `
                : `
                  bg-white/10
                  backdrop-blur-md
                `
              : scrolled
              ? `
                bg-navy
                backdrop-blur-xl
                shadow-xl
              `
              : `
                bg-white/95
                backdrop-blur-xl
                border
                border-navy/10
              `
          }
        `}
      >

        {/* MAIN NAVBAR */}
        <div
          className="
            header
            py-2

            px-3
            sm:px-4
            md:px-5
            lg:px-6
          "
        >
          <div
            className="
              flex
              items-center
              justify-between

              gap-3
              sm:gap-4
              lg:gap-8

              min-w-0
              w-full
            "
          >

            {/* LOGO */}
            <div className="logo shrink-0 min-w-0">
              <a href="/#Home">
                <img
                  src={currentLogo}
                  alt="Novida Logo"
                  className="
                    cursor-pointer

                    h-10
                    sm:h-11
                    md:h-12
                    lg:h-14
                    xl:h-16

                    w-auto

                    max-w-[105px]
                    sm:max-w-[125px]
                    md:max-w-[145px]
                    lg:max-w-[165px]

                    object-contain

                    transition-all
                    duration-500
                  "
                />
              </a>
            </div>


            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:block flex-1 min-w-0">

              <ul
                className="
                  flex
                  items-center
                  justify-center

                  gap-5
                  xl:gap-8

                  m-0
                  p-0
                "
              >

                {menuItems.map((item) => (

                  <li
                    key={`desktop-main-${item.id}`}
                    onMouseEnter={() => {
                      if (item.submenu) {
                        setActiveMenu(item.id);
                      } else {
                        setActiveMenu(null);
                      }
                    }}
                  >

                    <a
                      href={item.link}
                      className={`
                        relative
                        whitespace-nowrap
                        font-bold
                        tracking-wide
                        flex
                        items-center
                        gap-1

                        text-xs
                        xl:text-base

                        py-2

                        transition-colors
                        duration-300

                        after:content-['']
                        after:absolute
                        after:bottom-0
                        after:right-0

                        after:w-0
                        after:h-[1px]

                        hover:after:w-full

                        after:transition-all
                        after:duration-300

                        ${
                          isLightNav
                            ? `
                              text-white
                              hover:text-white
                              after:bg-white
                            `
                            : `
                              text-black
                              hover:text-navy
                              after:bg-navy
                            `
                        }
                      `}
                    >

                      {text(item)}

                      {item.submenu && (
                        <MdKeyboardArrowDown
                          size={19}
                          className={`
                            transition-transform
                            duration-300

                            ${
                              activeMenu === item.id
                                ? "rotate-180"
                                : ""
                            }
                          `}
                        />
                      )}

                    </a>

                  </li>

                ))}

              </ul>

            </nav>


            {/* DESKTOP BUTTONS */}
            <div
              className="
                hidden
                lg:flex

                items-center
                gap-2
                xl:gap-3

                shrink-0
              "
            >

              <Link
                to="/TextMe"
                className={`
                  whitespace-nowrap

                  py-2.5
                  px-4
                  xl:px-7

                  rounded-md

                  text-sm
                  xl:text-base

                  transition-all
                  duration-300

                  ${
                    isLightNav
                      ? `
                        bg-white
                        text-navy
                        hover:bg-primary
                        hover:text-white
                      `
                      : `
                        bg-primary
                        text-white
                        hover:bg-navy
                      `
                  }
                `}
              >
                {t("navbar.contact")}
              </Link>


              <button
                onClick={changeLanguage}
                className="
                  w-10
                  h-10

                  bg-white
                  text-navy

                  rounded-md

                  flex
                  items-center
                  justify-center

                  shadow-sm

                  hover:bg-gray-100
                  hover:scale-105

                  transition-all
                  duration-300
                "
                aria-label="Change language"
              >
                <Languages size={19} />
              </button>

            </div>


            {/* MOBILE / TABLET BUTTONS */}
            <div
              className="
                flex
                lg:hidden

                items-center
                justify-end

                gap-2

                shrink-0
              "
            >

              <button
                onClick={changeLanguage}
                className="
                  w-9
                  h-9

                  sm:w-10
                  sm:h-10

                  bg-white
                  text-navy

                  rounded-md

                  flex
                  items-center
                  justify-center

                  shadow-sm
                "
                aria-label="Change language"
              >
                <Languages size={18} />
              </button>


              <button
                onClick={() => {
                  setMobileMenuOpen((prev) => !prev);

                  if (mobileMenuOpen) {
                    setMobileSubmenu(null);
                  }
                }}
                className="
                  w-9
                  h-9

                  sm:w-10
                  sm:h-10

                  bg-white
                  text-navy

                  rounded-md

                  flex
                  items-center
                  justify-center

                  shadow-sm
                "
                aria-label="Menu"
              >

                {mobileMenuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}

              </button>

            </div>

          </div>
        </div>


        {/* ============================
            DESKTOP MEGA MENU
            Smooth Grid Animation
        ============================ */}

        <div
          className={`
            hidden
            lg:grid

            transition-[grid-template-rows,opacity,transform]
            duration-200

            ease-[cubic-bezier(0.4,0,0.2,1)]

            ${
              activeMenuData?.submenu
                ? `
                  grid-rows-[1fr]
                  opacity-100
                  translate-y-0
                `
                : `
                  grid-rows-[0fr]
                  opacity-0
                  -translate-y-1
                `
            }
          `}
        >

          <div className="overflow-hidden">

            <div
              className="
                border-t
                border-white/20

                px-8
                py-7
              "
            >

              {activeMenuData?.submenu && (

                <div
                  className="
                    max-w-[1100px]
                    mx-auto

                    flex
                    items-center
                    justify-center
                    flex-wrap

                    gap-x-12
                    gap-y-4
                  "
                >

                  {activeMenuData.submenu.map(
                    (subItem) => (

                      <Link
                        key={`desktop-sub-${activeMenuData.id}-${subItem.id}`}
                        to={subItem.link}
                        onClick={() => setActiveMenu(null)}
                        className="
                          relative
                          whitespace-nowrap

                          text-sm
                          lg:text-base

                          font-medium

                          text-white/90

                          py-2

                          transition-all
                          duration-300

                          hover:text-white

                          after:content-['']
                          after:absolute
                          after:bottom-0
                          after:right-0

                          after:w-0
                          after:h-[1px]

                          after:bg-white

                          hover:after:w-full

                          after:transition-all
                          after:duration-200
                        "
                      >

                        {text(subItem)}

                      </Link>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>


        {/* ============================
            MOBILE / TABLET MENU
        ============================ */}

        <div
          className={`
            lg:hidden

            grid

            transition-[grid-template-rows,opacity]
            duration-100
            ease-[cubic-bezier(0.4,0,0.2,1)]

            ${
              mobileMenuOpen
                ? `
                  grid-rows-[1fr]
                  opacity-100
                `
                : `
                  grid-rows-[0fr]
                  opacity-0
                `
            }
          `}
        >

          <div
            className="
              overflow-x-hidden
              overflow-y-auto

              max-h-[calc(100vh-80px)]
            "
          >

            <div
              className="
                border-t
                border-white/20

                px-3
                sm:px-5

                pb-5
                sm:pb-6

                pt-2
                sm:pt-3
              "
            >

              <div className="flex flex-col w-full min-w-0">

                {menuItems.map((item) => (

                  <div
                    key={`mobile-main-${item.id}`}
                    className="
                      border-b
                      border-white/10

                      w-full
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-between

                        w-full
                        min-w-0
                      "
                    >

                      <a
                        href={item.link}
                        onClick={(event) => {

                          if (item.submenu) {
                            event.preventDefault();

                            toggleMobileSubmenu(item.id);

                            return;
                          }

                          setMobileMenuOpen(false);
                        }}
                        className="
                          flex-1
                          min-w-0

                          py-3
                          sm:py-4

                          pe-2

                          text-white

                          text-sm
                          sm:text-base

                          font-medium

                          break-words
                        "
                      >

                        {text(item)}

                      </a>


                      {item.submenu && (

                        <button
                          onClick={() =>
                            toggleMobileSubmenu(item.id)
                          }
                          className="
                            w-9
                            h-9

                            sm:w-10
                            sm:h-10

                            shrink-0

                            text-white

                            flex
                            items-center
                            justify-center
                          "
                          aria-label="Open submenu"
                        >

                          <MdKeyboardArrowDown
                            size={22}
                            className={`
                              transition-transform
                              duration-200

                              ${
                                mobileSubmenu === item.id
                                  ? "rotate-180"
                                  : ""
                              }
                            `}
                          />

                        </button>

                      )}

                    </div>


                    {/* MOBILE SUBMENU */}

                    {item.submenu && (

                      <div
                        className={`
                          grid

                          transition-[grid-template-rows,opacity]
                          duration-200

                          ease-[cubic-bezier(0.4,0,0.2,1)]

                          ${
                            mobileSubmenu === item.id
                              ? `
                                grid-rows-[1fr]
                                opacity-100
                              `
                              : `
                                grid-rows-[0fr]
                                opacity-0
                              `
                          }
                        `}
                      >

                        <div className="overflow-hidden">

                          <div
                            className="
                              ps-3
                              sm:ps-4

                              pe-1
                              pb-3

                              flex
                              flex-col

                              min-w-0
                            "
                          >

                            {item.submenu.map((subItem) => (

                              <Link
                                key={`mobile-sub-${item.id}-${subItem.id}`}
                                to={subItem.link}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileSubmenu(null);
                                }}
                                className="
                                  relative

                                  w-fit
                                  max-w-full

                                  py-2.5
                                  sm:py-3

                                  text-xs
                                  sm:text-sm

                                  leading-6

                                  break-words

                                  text-white/75

                                  transition-all
                                  duration-200

                                  hover:text-white

                                  after:content-['']
                                  after:absolute
                                  after:bottom-2
                                  after:right-0

                                  after:w-0
                                  after:h-[1px]

                                  after:bg-white

                                  hover:after:w-full

                                  after:transition-all
                                  after:duration-300
                                "
                              >

                                {text(subItem)}

                              </Link>

                            ))}

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                ))}


                {/* CONTACT */}

                <Link
                  to="/TextMe"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileSubmenu(null);
                  }}
                  className="
                    mt-4

                    w-full

                    bg-white
                    text-navy

                    rounded-md

                    py-2.5
                    sm:py-3

                    px-3
                    sm:px-5

                    text-center

                    text-sm
                    sm:text-base

                    font-medium

                    transition-all
                    duration-300

                    hover:bg-primary
                    hover:text-white
                  "
                >

                  {t("navbar.contact")}

                </Link>


                {/* LANGUAGE */}

                <button
                  onClick={changeLanguage}
                  className="
                    mt-2.5

                    w-full

                    bg-white/10

                    border
                    border-white/20

                    text-white

                    rounded-md

                    py-2.5
                    sm:py-3

                    px-3
                    sm:px-5

                    flex
                    items-center
                    justify-center

                    gap-2

                    text-sm

                    transition-all
                    duration-300

                    hover:bg-white/20
                  "
                >

                  <Languages size={17} />

                  <span>
                    {i18n.language === "ar"
                      ? "English"
                      : "العربية"}
                  </span>

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Navbar;
import "./Home.css";
import homeVideo from "../../assets/novida-hero-background-45s.mp4";
import { IoIosArrowDown } from "react-icons/io";

import Contact from "../Contact/Contact.jsx";
import Services from "../Services/Services.jsx";
import Banner from "../Banner/Banner.jsx";
import Broject2 from "../project2/Broject2.jsx";
import Broject3 from "../Broject3/Broject3.jsx";

import OurBrojects from "../ourBrojects/OurBrojects.jsx";

import SectorShowcase from "../SectorShowcase/SectorShowcase.jsx";
import LastNews from "../LastNews/LastNews.jsx";
import { useTranslation } from "react-i18next";


function Home() {
  const { t } = useTranslation();
  return (
    <>
    <section className="Home" id="Home">
      {/* Background Video */}
      <div className="home-video-wrapper">
        <video className="home-video" autoPlay loop muted playsInline>
          <source src={homeVideo} type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}
      <div className="home-overlay"></div>

      {/* Content */}
      <div className="container home-content">
        {/* Left */}
         <div className="home-right">
          <h1 className="text-6xl font-bold text-white">{t("home.heroLine1")} <br/>{t("home.heroLine2")}<br/> {t("home.heroLine3")}</h1>
        </div>
        

        {/* Center Arrow */}
        <a href="#Contact" className="home-arrow">
          <IoIosArrowDown />
        </a>

        {/* Right */}
        <div className="">
          
        </div>
       
      </div>
    </section>
      <Banner />
     
      {/* <About /> */}
      <SectorShowcase />
      <Services />
      <Broject2 />
      <Broject3 />
      <OurBrojects />
      <LastNews />
      <Contact />
    </>
  );

}

export default Home;

import "./App.css";
import Preloader from "./Components/Preloader/Preloader.jsx";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Home from "./Components/Home/Home.jsx"
import Footer from "./Components/Footer/Footer.jsx";
import { Routes, Route ,Link, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import NewsPage from "./Components/NewsPage/NewsPage.jsx";
import NewsPageDetails  from "./Components/NewsPageDetails/NewsPageDetails.jsx";
import TextMe from "./Components/TextMe/TextMe.jsx";
import { useTranslation } from "react-i18next";
import OurLeadership from "./Components/Our Leadership/OurLeadership.jsx";
import HowWEare from "./Components/HowWEare/HowWEare.jsx";
import ChairmanMessage from "./Components/ChairmanMessage/ChairmanMessage.jsx";
import Disclosures from "./Components/Disclosures/Disclosures.jsx";
import Broject3 from "./Components/Broject3/Broject3.jsx";
import Broject2 from "./Components/project2/Broject2.jsx";
import { adminRoutes } from "./Admin/AdminRoutes";
import ProjectDetails from "./Components/ProjectDetails/ProjectDetails.jsx";
import  OurBrojects from "./Components/ourBrojects/OurBrojects.jsx";
import { useSiteSettings } from "./hooks/useContent";
import SectorPage from "./Components/SectorPage/SectorPage.jsx";
import InvestorsPage from "./Components/Investors/InvestorsPage.jsx";
function App() {
  const { i18n } = useTranslation();
  const { data: settings } = useSiteSettings();
    // رقم الواتساب بصيغة دولية (مثال: 201221267156)
  let whatsappNumber = (settings?.whatsapp || "201221267156").replace(/\D/g, "");
  if (whatsappNumber.startsWith("00")) whatsappNumber = whatsappNumber.slice(2);
  if (whatsappNumber.startsWith("200")) whatsappNumber = "20" + whatsappNumber.slice(3);
  if (whatsappNumber.startsWith("0")) whatsappNumber = "20" + whatsappNumber.slice(1);
  // هل إحنا جوه لوحة التحكم؟
  const { pathname } = useLocation();
  const isAdmin = pathname.toLowerCase().replace(/^\/+/, "/").startsWith("/admin");

    useEffect(() => {
    const lang = i18n.language;

    document.documentElement.lang = lang;
    document.documentElement.dir =
      lang === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

    useEffect(() => {
    AOS.init({
      duration: 800,
      easing:"ease-in-sine",
      delay:100,
      offset:100,
    });
    AOS.refresh();
  }, []);

  // لوحة التحكم: بدون Navbar و Footer
  if (isAdmin) {
    return <Routes>{adminRoutes}</Routes>;
  }

  return (
    <>
        <Preloader />
    <ScrollToTop />
    <Navbar/>
     <main> 
      <Routes>
        
      <Route path="/" element={<Home />} />   
      <Route path="/NewsPage" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsPageDetails />}/>
      <Route path="/TextMe" element={<TextMe />}/>
      <Route path="/OurLeadership" element={<OurLeadership />}/>
      <Route path="/HowWEare" element={<HowWEare />}/>
      <Route path="/ChairmanMessage" element={<ChairmanMessage />}/>
      <Route path="/financials" element={<Disclosures />}/>
      <Route path="/Broject3" element={<Broject3 />}/>
      <Route path="/Broject2" element={<Broject2 />}/>
      <Route path="/projects/:id" element={<ProjectDetails />}/>
      <Route path="/OurBrojects" element={<OurBrojects />}/>
                  <Route path="/sectors/:slug" element={<SectorPage />}/>
                        <Route path="/investors" element={<InvestorsPage />}/>
      <Route path="/investors/:slug" element={<InvestorsPage />}/>
    </Routes>
    </main>
    <Footer/>
    <div className="  cursor-pointer">
       <div className="fixed  text-xl right-0 bg-white/10 backdrop-blur-3xl py-4 px-2 rounded-tl-md  rounded-bl-md bottom-3/12 z-50">
          <Link
        to="/TextMe"
        target="_self"
        rel="noopener noreferrer"
        className="whatsapp-fixed  "
      >
        <div className="p-2 mb-2 flex justify-center items-center rounded-full bg-black hover:bg-primary transition duration-300 ease-in-out">
         <SlNote size={20} className="text-white  "/>
        </div>  
        </Link>
         <a
                href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fixed   "
      >
        <div className="p-2 rounded-full bg-black hover:bg-green-500 transition duration-300 ease-in-out">
         <FaWhatsapp size={23} className="text-white  hover:"/>
        </div>  
        </a>
       </div>

    </div>

     
    </>
   
  )
}

export default App
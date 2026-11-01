import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

/*
  صفحة التحميل — بتظهر أول ما الموقع يفتح
  وبتختفي لما الصور والفيديو يخلصوا تحميل (أو بعد 5 ثواني بالكتير)
*/

const MAX_WAIT = 5000; // أقصى وقت للانتظار بالمللي ثانية

export default function Preloader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      setHiding(true);
      setTimeout(() => setGone(true), 600); // وقت الاختفاء التدريجي
    };

    if (document.readyState === "complete") {
      // الموقع كان خلص تحميل أصلًا
      setTimeout(finish, 300);
    } else {
      window.addEventListener("load", finish);
    }

    const timer = setTimeout(finish, MAX_WAIT);

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(timer);
    };
  }, []);

  // منع السكرول وصفحة التحميل ظاهرة
  useEffect(() => {
    if (gone) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  if (gone) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center gap-8
        bg-navy
        transition-opacity duration-500
        ${hiding ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
      aria-busy="true"
      aria-label="Loading"
    >
      <img
        src={logo}
        alt="Novida"
        className="h-16 md:h-20 w-auto object-contain animate-pulse"
      />

      <div className="w-40 h-1 rounded-full bg-white/20 overflow-hidden">
        <div className="h-full w-1/3 rounded-full bg-white animate-[preloader_1.1s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes preloader {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(320%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse { animation: none; }
        }
      `}</style>
    </div>
  );
}
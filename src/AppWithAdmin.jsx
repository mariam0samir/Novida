import { BrowserRouter, Routes, useInRouterContext, useLocation } from "react-router-dom";
import App from "./App";
import { adminRoutes } from "./Admin/AdminRoutes";

/*
  يفصل لوحة التحكم عن الموقع بدون تعديل App.jsx:
  - أي رابط يبدأ بـ /admin  → لوحة التحكم (بدون Navbar و Footer)
  - أي رابط آخر             → الموقع كما هو (App.jsx)
  التعديل الوحيد المطلوب: في main.jsx استبدلي import App from "./App" بـ import App from "./AppWithAdmin"
*/

const isAdminPath = (path) => path === "/admin" || path.startsWith("/admin/");

// لو BrowserRouter موجود في main.jsx
function SwitchInsideRouter() {
  const { pathname } = useLocation();
  return isAdminPath(pathname) ? <Routes>{adminRoutes}</Routes> : <App />;
}

export default function AppWithAdmin() {
  const insideRouter = useInRouterContext();

  if (insideRouter) return <SwitchInsideRouter />;

  // لو BrowserRouter موجود داخل App.jsx
  if (isAdminPath(window.location.pathname)) {
    return (
      <BrowserRouter>
        <Routes>{adminRoutes}</Routes>
      </BrowserRouter>
    );
  }

  return <App />;
}

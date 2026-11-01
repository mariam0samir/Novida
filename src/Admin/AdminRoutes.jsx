import { Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';
import AdminLogin from './Login/AdminLogin';
import AdminLayout from './Layout/AdminLayout';
import Dashboard from './Dashboard/Dashboard';
import AdminSectors from './Sectors/AdminSectors';
import AdminProjects from './Projects/AdminProjects';
import AdminNews from './News/AdminNews';
import AdminLeadership from './Leadership/AdminLeadership';
import AdminReports from './Reports/AdminReports';
import AdminSectorShowcase from './SectorShowcase/AdminSectorShowcase';
import AdminAbout from './About/AdminAbout';
import AdminChairman from './Chairman/AdminChairman';
import AdminSettings from './Settings/AdminSettings';
import AdminIRPages from './IR/AdminIRPages';
import AdminIRContent from './IR/AdminIRContent';
import AdminIRStock from './IR/AdminIRStock';

// ضع {adminRoutes} داخل <Routes> في App.jsx
export const adminRoutes = (
  <>
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="sectors" element={<AdminSectors />} />
      <Route path="projects" element={<AdminProjects />} />
      <Route path="news" element={<AdminNews />} />
      <Route path="leadership" element={<AdminLeadership />} />
      <Route path="reports" element={<AdminReports />} />
      <Route path="sector-showcase" element={<AdminSectorShowcase />} />
      <Route path="about" element={<AdminAbout />} />
      <Route path="chairman" element={<AdminChairman />} />
      <Route path="settings" element={<AdminSettings />} />
      <Route path="ir-pages" element={<AdminIRPages />} />
      <Route path="ir-content" element={<AdminIRContent />} />
      <Route path="ir-stock" element={<AdminIRStock />} />
    </Route>
  </>
);

import { Route } from 'react-router-dom';
import AdminLayout from './Layout/AdminLayout';
import Dashboard from './Dashboard/Dashboard';
import AdminNews from './News/AdminNews';
import AdminProjects from './Projects/AdminProjects';
import AdminLeadership from './Leadership/AdminLeadership';
import AdminReports from './Reports/AdminReports';
import AdminAbout from './About/AdminAbout';
import AdminChairman from './Chairman/AdminChairman';

// ضع {adminRoutes} داخل <Routes> الموجودة في App.jsx
export const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="news" element={<AdminNews />} />
    <Route path="projects" element={<AdminProjects />} />
    <Route path="leadership" element={<AdminLeadership />} />
    <Route path="reports" element={<AdminReports />} />
    <Route path="about" element={<AdminAbout />} />
    <Route path="chairman" element={<AdminChairman />} />
  </Route>
);

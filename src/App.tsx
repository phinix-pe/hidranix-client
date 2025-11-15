// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import LandingPhinix from "./modules/landing/phinix/LandingPhinix";
import LandingHidranix from "./modules/landing/hidranix/LandingHidranix";
import DashboardPage from "./modules/dashboard/pages/DashboardPage";
import { LandingEconix } from "./modules/landing/econix/LandingEconix";
import { CourseDetailPage } from "./modules/landing/econix/cursos/curso-H2V002/CourseDetailPage";
import { CertificateEconix } from "./modules/landing/econix/components/CertificateEconix";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing pages */}
        <Route path="/" element={<LandingPhinix />} />
        <Route path="/hidranix" element={<LandingHidranix />} />
        <Route path="/econix" element={<LandingEconix />} />

        <Route path="/cursos/:courseId" element={<CourseDetailPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard/*" element={<DashboardPage />} />
        
        <Route path="/certificate" element={<CertificateEconix />} />

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

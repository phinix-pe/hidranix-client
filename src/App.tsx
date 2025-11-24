// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import LandingPhinix from "./modules/landing/phinix/LandingPhinix";
import LandingHidranix from "./modules/landing/hidranix/LandingHidranix";
import DashboardPage from "./modules/dashboard/pages/DashboardPage";
import { LandingEconix } from "./modules/landing/econix/LandingEconix";
import { CourseDetailPage } from "./modules/landing/econix/cursos/curso-H2V002/CourseDetailPage";

//Econix LSM
import EconixLMS from "./modules/landing/lsm/EconixLMS";
import { LoginScreen as EconixLoginScreen } from "./modules/landing/lsm/auth/LoginScreen";
import { RegisterScreen as EconixRegisterScreen } from "./modules/landing/lsm/auth/RegisterScreen"; // Importamos el nuevo registro
import { GlobalStyles } from "./modules/landing/lsm/components/GlobalStyles";

const EconixLoginWrapper = () => {
  const navigate = useNavigate();
  const isAuthenticated =
    localStorage.getItem("isEconixAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to="/econix/dashboard" replace />;
  }

  return (
    <>
      <GlobalStyles />
      <EconixLoginScreen onLogin={() => navigate("/econix/dashboard")} />
    </>
  );
};

const EconixRegisterWrapper = () => {
  const navigate = useNavigate();
  const isAuthenticated =
    localStorage.getItem("isEconixAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to="/econix/dashboard" replace />;
  }

  return (
    <>
      <GlobalStyles />
      <EconixRegisterScreen onRegister={() => navigate("/econix/dashboard")} />
    </>
  );
};

const EconixDashboardWrapper = () => {
  const isAuthenticated =
    localStorage.getItem("isEconixAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/econix/login" replace />;
  }

  return <EconixLMS />;
};

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

        {/* Econix LSM Routes */}
        <Route path="/econix/login" element={<EconixLoginWrapper />} />
        <Route path="/econix/register" element={<EconixRegisterWrapper />} />
        <Route path="/econix/dashboard" element={<EconixDashboardWrapper />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

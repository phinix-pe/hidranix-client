// src/App.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

// Importaciones existentes (asegúrate que las rutas sean correctas en tu proyecto)
import LoginPage from "./modules/auth/pages/LoginPage";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import LandingPhinix from "./modules/landing/phinix/LandingPhinix";
import LandingHidranix from "./modules/landing/hidranix/LandingHidranix";
import DashboardPage from "./modules/dashboard/pages/DashboardPage";
import { LandingEconix } from "./modules/landing/econix/LandingEconix";
import { CourseDetailPage } from "./modules/landing/econix/cursos/curso-H2V002/CourseDetailPage";
import { ReportsListPage } from "./modules/reports/pages/ReportsListPage";
import { ReportDetailPage } from "./modules/reports/pages/ReportDetailPage";

// --- ECONIX LMS IMPORTACIONES ---
// Asumiendo que todo el código del Canvas está en un archivo 'EconixLMS.tsx'
// Si separaste los archivos, cambia las rutas correspondientes.
import EconixLMS, {
  LoginScreen as EconixLoginScreen,
  RegisterScreen as EconixRegisterScreen,
  GlobalStyles,
} from "./modules/landing/lsm/lms";

// --- WRAPPERS DE SEGURIDAD PARA ECONIX ---

const EconixLoginWrapper = () => {
  const navigate = useNavigate();
  // Verificamos el token real que usamos en la integración con backend
  const isAuthenticated = !!localStorage.getItem("econixToken");

  if (isAuthenticated) {
    return <Navigate to="/econix/dashboard" replace />;
  }

  // Manejador para cuando el login es exitoso
  const handleLoginSuccess = (token: string, user: any) => {
    localStorage.setItem("econixToken", token);
    localStorage.setItem("econixUser", JSON.stringify(user));
    localStorage.setItem("isEconixAuthenticated", "true"); // Para compatibilidad si usas esto en otros lados
    navigate("/econix/dashboard");
  };

  return (
    <>
      <GlobalStyles />
      {/* Pasamos navigate al onNavigateToRegister */}
      <EconixLoginScreen
        onLogin={handleLoginSuccess}
        onNavigateToRegister={() => navigate("/econix/register")}
      />
    </>
  );
};

const EconixRegisterWrapper = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("econixToken");

  if (isAuthenticated) {
    return <Navigate to="/econix/dashboard" replace />;
  }

  const handleRegisterSuccess = (token: string, user: any) => {
    localStorage.setItem("econixToken", token);
    localStorage.setItem("econixUser", JSON.stringify(user));
    localStorage.setItem("isEconixAuthenticated", "true");
    navigate("/econix/dashboard");
  };

  return (
    <>
      <GlobalStyles />
      <EconixRegisterScreen
        onRegister={handleRegisterSuccess}
        onNavigateToLogin={() => navigate("/econix/login")}
      />
    </>
  );
};

const EconixDashboardWrapper = () => {
  const isAuthenticated = !!localStorage.getItem("econixToken");

  if (!isAuthenticated) {
    return <Navigate to="/econix/login" replace />;
  }

  return <EconixLMS />;
};

// --- APP PRINCIPAL ---

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing pages Generales */}
        <Route path="/" element={<LandingPhinix />} />
        <Route path="/hidranix" element={<LandingHidranix />} />
        <Route path="/econix" element={<LandingEconix />} />

        {/* Detalle de Cursos Públicos (Si aplica) */}
        <Route path="/cursos/:courseId" element={<CourseDetailPage />} />

        {/* Auth General del Sistema Principal */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard General */}
        <Route path="/dashboard/*" element={<DashboardPage />} />

        {/* Reportes */}
        <Route path="/reportes" element={<ReportsListPage />} />
        <Route path="/reportes/:id" element={<ReportDetailPage />} />

        {/* --- RUTAS ECONIX LMS --- */}
        <Route path="/econix/login" element={<EconixLoginWrapper />} />
        <Route path="/econix/register" element={<EconixRegisterWrapper />} />
        <Route path="/econix/dashboard" element={<EconixDashboardWrapper />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

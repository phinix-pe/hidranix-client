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


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing pages */}
        <Route path="/" element={<LandingPhinix />} />
        <Route path="/hidranix" element={<LandingHidranix />} />

        {/* Páginas de autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />



        <Route path="/dashboard/*" element={<DashboardPage />} />

        {/* En caso de ruta no encontrada, redirige a la landing principal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
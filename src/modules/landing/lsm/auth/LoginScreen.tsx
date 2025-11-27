import React, { useState, FormEvent } from "react";
import { BookOpen, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (email === "bmaldonadoc@unsa.edu.pe" && password === "12345") {
      localStorage.setItem("isEconixAuthenticated", "true");
      localStorage.setItem("econixUserName", "Brayan Maldonado");
      onLogin();
    } else {
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 relative z-10">
        <div className="text-center mb-8">
          <div className="bg-[#006a78] w-12 h-12 rounded-lg flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#006a78]/30">
            <BookOpen size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#043c42] tracking-tight">
            ECONIX
          </h1>
          <p className="text-gray-500 mt-2">
            Plataforma de Aprendizaje Profesional
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Institucional
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
              placeholder="usuario@unsa.edu.pe"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-[#006a78] text-white rounded-lg font-bold hover:bg-[#043c42] transition-colors shadow-lg"
          >
            Iniciar Sesión
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <Link
                to="/econix/register"
                className="text-[#006a78] font-bold hover:underline"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

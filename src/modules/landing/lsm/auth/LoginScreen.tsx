import React, { useState, FormEvent } from "react";
import { BookOpen, AlertTriangle, Loader2 } from "lucide-react"; // Asegúrate de tener Loader2 o quítalo si no usas lucide-react actualizado
import { Link } from "react-router-dom";

// Definimos los tipos para la respuesta del backend
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
}

interface LoginScreenProps {
  // AHORA onLogin ACEPTA ARGUMENTOS
  onLogin: (token: string, user: User) => void;
  onNavigateToRegister?: () => void; // Opcional, por compatibilidad
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. CONEXIÓN REAL AL BACKEND
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      // 2. PASAR DATOS REALES A APP.TSX
      // App.tsx guardará esto en localStorage
      onLogin(data.token, data.user);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error de conexión con el servidor");
    } finally {
      setLoading(false);
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
            disabled={loading}
            className="w-full py-3 bg-[#006a78] text-white rounded-lg font-bold hover:bg-[#043c42] transition-colors shadow-lg disabled:opacity-50 flex justify-center gap-2"
          >
            {loading ? "Conectando..." : "Iniciar Sesión"}
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

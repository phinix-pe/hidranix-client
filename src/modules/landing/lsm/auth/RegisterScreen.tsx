import React, { useState, FormEvent } from "react";
import { AlertTriangle, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface RegisterScreenProps {
  onRegister: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onRegister,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validación simple
    if (password.length < 5) {
      setError("La contraseña debe tener al menos 5 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de registro exitoso
    // Aquí guardaríamos el token en el futuro
    localStorage.setItem("isEconixAuthenticated", "true");
    localStorage.setItem("econixUserName", name); // Guardamos el nombre para mostrarlo luego
    onRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 relative z-10">
        <div className="text-center mb-6">
          <div className="bg-[#006a78] w-12 h-12 rounded-lg flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#006a78]/30">
            <UserPlus size={24} />
          </div>
          <h1 className="text-3xl font-bold text-[#043c42] tracking-tight">
            Crear Cuenta
          </h1>
          <p className="text-gray-500 mt-2">Únete a la comunidad de ECONIX</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
              placeholder="Juan Perez"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
              placeholder="usuario@ejemplo.com"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Repetir
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#006a78] outline-none"
                placeholder="••••••••"
                required
              />
            </div>
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
            Registrarse
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/econix/login"
                className="text-[#006a78] font-bold hover:underline"
              >
                Inicia Sesión
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

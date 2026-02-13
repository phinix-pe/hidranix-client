import { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { NovedadesForm } from './components/NovedadesForm';
import { NovedadesEditList } from './components/NovedadesEditList';
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";


type AdminView = 'create' | 'edit';

export const AdminNovedades = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<AdminView>('create');

  useEffect(() => {
    // Verificar si hay sesión guardada
    const savedToken = localStorage.getItem('admin_token');
    const savedUser = localStorage.getItem('admin_user');

    if (savedToken && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (_token: string, newUser: any) => {
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setUser(null);
    setIsAuthenticated(false);
    setView('create');
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      {/* Navegación entre vistas */}
      {view === 'create' && (
        <button
          onClick={() => setView('edit')}
          className="fixed bottom-8 right-8 z-40 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition font-semibold flex items-center gap-2 cursor-pointer"
          title="Ver y editar novedades existentes"
        >
          <FaEdit className="text-lg" /> Editar Novedades
        </button>
      )}

      {view === 'edit' && (
        <button
          onClick={() => setView('create')}
          className="fixed bottom-8 right-8 z-40 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition font-semibold flex items-center gap-2 cursor-pointer"
          title="Crear nueva novedad"
        >
          <IoMdAdd className="text-lg" /> Nueva Novedad
        </button>
      )}

      {/* Contenido según la vista */}
      {view === 'create' ? (
        <NovedadesForm onLogout={handleLogout} user={user} />
      ) : (
        <NovedadesEditList onLogout={handleLogout} user={user} />
      )}
    </div>
  );
};

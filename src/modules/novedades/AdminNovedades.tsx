import { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import { NovedadesForm } from './components/NovedadesForm';

export const AdminNovedades = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

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
  };

  if (!isAuthenticated) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }

  return <NovedadesForm onLogout={handleLogout} user={user} />;
};

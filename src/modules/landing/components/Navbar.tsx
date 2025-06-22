import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

// Definir los enlaces
const links = [
  { name: "Inicio", path: "#inicio" },
  { name: "Nosotros", path: "#nosotros" },
  { name: "Servicios", path: "#servicios" },
  { name: "Clientes", path: "#clientes" },
];

const Navbar = () => {
  const location = useLocation(); // Para obtener la ruta actual
  const [isOpen, setIsOpen] = useState(false); // Para controlar la visibilidad del menú móvil

  // Función para alternar el estado del menú
  const toggleMenu = () => setIsOpen(!isOpen);

  // Función para hacer scroll suave hacia las secciones y cerrar el menú móvil
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Cerrar el menú cuando se haga clic en un enlace
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-primary-dark text-white p-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Hidranix</Link>
        </div>

        {/* Menú de escritorio */}
        <div className="hidden xl:flex items-center gap-8">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => scrollToSection(link.path.slice(1))}
              className={`${
                location.pathname === link.path
                  ? "text-accent border-b-2 border-accent"
                  : ""
              } capitalize font-medium hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}

          {/* Botones de Login y Register en Desktop */}
          <div className="flex space-x-4 ml-8">
            <Link to="/login">
              <button className="bg-primary-light text-white px-4 py-2 rounded hover:bg-primary cursor-pointer">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white text-primary px-4 py-2 rounded border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Menú móvil */}
        <div className="xl:hidden flex items-center">
          <button onClick={toggleMenu} className="z-20">
            {isOpen ? (
              <HiX size={30} className="text-white" />
            ) : (
              <HiMenu size={30} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-primary-dark bg-opacity-90 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => scrollToSection(link.path.slice(1))}
              className={`${
                location.pathname === link.path
                  ? "text-accent border-b-2 border-accent"
                  : ""
              } text-white py-4 text-2xl capitalize hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}

          {/* Botones de Login y Register en Mobile */}
          <div className="mt-8 flex space-x-4">
            <Link to="/login">
              <button className="bg-primary-light text-white px-4 py-2 rounded hover:bg-primary">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-primary-light text-white px-4 py-2 rounded hover:bg-primary">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

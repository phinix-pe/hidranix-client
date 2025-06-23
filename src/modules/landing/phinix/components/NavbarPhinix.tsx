// src/modules/landing/components/NavbarPhinix.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import SimpleButton from "../../animation/SimpleButton";
import BlurButton from "../../animation/BlurButton";

const NavbarPhinix = () => {
  const [isOpen, setIsOpen] = useState(false); // Para controlar el menú móvil

  // Alternar el menú
  const toggleMenu = () => setIsOpen(!isOpen);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="p-4 fixed w-full top-0 z-50"
      style={{
        backgroundColor: `rgba(255, 255, 255, ${Math.min(scrollY / 100, 1)})`,
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-primary-dark text-xl font-extrabold">
          <Link to="/">Phinix</Link>
        </div>

        {/* Menú de escritorio */}
        <div className="text-primary-dark  hidden xl:flex items-center gap-8 font-bold">
          {/* Enlaces de productos */}
          <Link to="/hidranix">Hidranix</Link>
          <Link to="/srrobot">SrRobot</Link>
          <Link to="/mangora">Mangora</Link>

          {/* Botones de Login y Register en Desktop */}
          <div className="flex space-x-4 ml-8">
            <SimpleButton to="/login" scrollY={1}>
              Iniciar sesión
            </SimpleButton>
            <BlurButton to="/register" scrollY={1}>
              Registrarse
            </BlurButton>
          </div>
        </div>

        {/* Menú móvil */}
        <div className="xl:hidden flex items-center">
          <button onClick={toggleMenu} className="z-20">
            {isOpen ? (
              <HiX size={30} className="text-white" />
            ) : (
              <HiMenu size={30} className="text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-10 bg-primary-dark bg-opacity-90 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          {/* Enlaces de productos */}
          <Link
            to="/hidranix"
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
          >
            Hidranix
          </Link>
          <Link
            to="/srrobot"
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
          >
            SrRobot
          </Link>
          <Link
            to="/mangora"
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
          >
            Mangora
          </Link>

          {/* Botones de Login y Register en Mobile */}
          <div className="mt-8 flex space-x-4">
            <Link to="/login">
              <button className="bg-primary-dark text-white px-4 py-2 rounded hover:bg-red-500">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white text-primary-dark px-4 py-2 rounded border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarPhinix;

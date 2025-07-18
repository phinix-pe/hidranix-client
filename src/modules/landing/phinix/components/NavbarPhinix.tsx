import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import SimpleButton from "../../animation/SimpleButton";
import BlurButton from "../../animation/BlurButton";
import phinixLogo from "../../../../assets/phinix_logo.png";

const NavbarPhinix = () => {
  const [isOpen, setIsOpen] = useState(false); // Para controlar el menú móvil
  const [scrollY, setScrollY] = useState(0);

  // Alternar el menú
  const toggleMenu = () => setIsOpen(!isOpen);

  // Función para cerrar el menú en móviles cuando se hace clic en un enlace
  const closeMenu = () => setIsOpen(false);

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
          <Link to="/">
            <img
              src={phinixLogo}
              alt="Phinix Logo"
              className="w-8 h-8 inline-block mr-2"
            />
            Phinix
          </Link>
        </div>

        {/* Menú de escritorio */}
        <div className="text-primary-dark hidden xl:flex items-center gap-8 font-bold">
          {/* Enlaces de productos */}
          <Link to="/hidranix">Hidranix</Link>
          <Link to="/srrobot">Sr.Robot</Link>
          <Link to="/maguna">Maguna</Link>
          {/* Enlace al Consultoría */}
          <a href="#consultory">Consultoria</a>

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
            onClick={closeMenu} // Cerrar el menú al hacer clic
          >
            Hidranix
          </Link>
          <Link
            to="/srrobot"
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
            onClick={closeMenu} // Cerrar el menú al hacer clic
          >
            Sr.Robot
          </Link>
          <Link
            to="/maguna"
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
            onClick={closeMenu} // Cerrar el menú al hacer clic
          >
            Maguna
          </Link>
          {/* Enlace al Consultoría en versión móvil */}
          <a
            href="#consultory"
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
            onClick={closeMenu} // Cerrar el menú al hacer clic
          >
            Consultoria
          </a>

          {/* Botones de Login y Register en Mobile */}
          <div className="mt-8 flex space-x-4">
            <Link to="/login">
              <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-primary-dark transition-colors duration-300">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white text-primary-dark px-4 py-2 rounded border-none border-transparent hover:bg-transparent hover:border-white hover:text-white cursor-pointer">
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

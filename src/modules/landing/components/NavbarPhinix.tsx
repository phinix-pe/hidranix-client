// src/modules/landing/components/NavbarPhinix.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";

const NavbarPhinix = () => {
  const [isOpen, setIsOpen] = useState(false); // Para controlar el menú móvil
  const [isSelectOpen, setIsSelectOpen] = useState(false); // Para controlar el select desglosable

  // Alternar el menú
  const toggleMenu = () => setIsOpen(!isOpen);

  // Alternar el select desglosable
  const toggleSelect = () => setIsSelectOpen(!isSelectOpen);

  // Función para hacer scroll suave hacia las secciones y cerrar el menú móvil
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });

    // Cerrar el menú cuando se hace clic en un enlace
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="bg-red-900 text-white p-4 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Phinix</Link>
        </div>

        {/* Menú de escritorio */}
        <div className="hidden xl:flex items-center gap-8">
          {/* Enlaces de productos */}
          <Link to="/hidranix" className="hover:text-gray-300">
            Hidranix
          </Link>
          <Link to="/srrobot" className="hover:text-gray-300">
            SrRobot
          </Link>
          <Link to="/mangora" className="hover:text-gray-300">
            Mangora
          </Link>

          {/* Select desglosable para las secciones de la landing */}
          <div className="relative">
            <button
              onClick={toggleSelect}
              className="hover:text-gray-300 capitalize font-medium flex items-center"
            >
              Secciones
              <IoIosArrowDown className="ml-2" />
            </button>
            {isSelectOpen && (
              <div className="absolute bg-red-900 w-40 mt-2 rounded-md shadow-lg">
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="block w-full text-white py-2 text-center hover:bg-red-400 hover:text-slate-800 cursor-pointer"
                >
                  Inicio
                </button>
                <button
                  onClick={() => scrollToSection("nosotros")}
                  className="block w-full text-white py-2 text-center hover:bg-red-400 hover:text-slate-800 cursor-pointer"
                >
                  Nosotros
                </button>
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="block w-full text-white py-2 text-center hover:bg-red-400 hover:text-slate-800 cursor-pointer"
                >
                  Servicios
                </button>
                <button
                  onClick={() => scrollToSection("clientes")}
                  className="block w-full text-white py-2 text-center hover:bg-red-400 hover:text-slate-800 cursor-pointer"
                >
                  Clientes
                </button>
              </div>
            )}
          </div>

          {/* Botones de Login y Register en Desktop */}
          <div className="flex space-x-4 ml-8">
            <Link to="/login">
              <button className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white text-red-900 px-4 py-2 rounded border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white cursor-pointer">
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
        className={`fixed inset-0 z-10 bg-red-900 bg-opacity-90 transform transition-all duration-300 ease-in-out ${
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

          {/* Secciones */}
          <button
            onClick={() => scrollToSection("inicio")}
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("nosotros")}
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
          >
            Nosotros
          </button>
          <button
            onClick={() => scrollToSection("servicios")}
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection("clientes")}
            className="text-white py-4 text-2xl capitalize hover:text-accent transition-all"
          >
            Clientes
          </button>

          {/* Botones de Login y Register en Mobile */}
          <div className="mt-8 flex space-x-4">
            <Link to="/login">
              <button className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-white text-red-900 px-4 py-2 rounded border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white cursor-pointer">
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

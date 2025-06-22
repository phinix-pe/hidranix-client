import { Link } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaHistory,
  FaCreditCard,
  FaSignOutAlt,
  FaChartBar,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";

interface VerticalNavbarProps {
  role: "CLIENT" | "ADMIN" | null;
}

const VerticalNavbar: React.FC<VerticalNavbarProps> = ({ role }) => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
  };

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleNavbar}
        className={`md:hidden fixed top-4 left-4 z-50 text-white p-2 bg-primary rounded-lg ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <FaBars size={24} />
      </button>

      <div
        className={`fixed md:relative z-40 w-64 bg-primary text-white h-full p-6 transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="mb-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <button onClick={toggleNavbar} className="md:hidden text-white">
              <FaTimes size={24} />
            </button>
          </div>
          <p className="flex items-center">{user?.firstName}</p>
        </div>

        <ul className="space-y-4">
          {role === "CLIENT" && (
            <>
              <li>
                <Link
                  to="/dashboard/inicio"
                  className="hover:text-gray-300 flex items-center gap-2 p-2 rounded hover:bg-primary-light"
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                >
                  <FaHome className="text-xl" />
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/historial"
                  className="hover:text-gray-300 flex items-center gap-2 p-2 rounded hover:bg-primary-light"
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                >
                  <FaHistory className="text-xl" />
                  <span>Historial</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/pago"
                  className="hover:text-gray-300 flex items-center gap-2 p-2 rounded hover:bg-primary-light"
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                >
                  <FaCreditCard className="text-xl" />
                  <span>Pagar</span>
                </Link>
              </li>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <li>
                <Link
                  to="/dashboard/stats"
                  className="hover:text-gray-300 flex items-center gap-2 p-2 rounded hover:bg-primary-light"
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                >
                  <FaChartBar className="text-xl" />
                  <span>Estadísticas</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/clients"
                  className="hover:text-gray-300 flex items-center gap-2 p-2 rounded hover:bg-primary-light"
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                >
                  <FaUsers className="text-xl" />
                  <span>Clientes</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/admins"
                  className="hover:text-gray-300 flex items-center gap-2 p-2 rounded hover:bg-primary-light"
                  onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                >
                  <FaUserShield className="text-xl" />
                  <span>Admins</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        <button
          onClick={handleSignOut}
          className="mt-8 w-full text-white bg-primary-light px-4 py-2 rounded flex items-center gap-2 justify-center hover:bg-primary-dark"
        >
          <FaSignOutAlt />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </>
  );
};

export default VerticalNavbar;

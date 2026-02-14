import { Outlet, useLocation, Link } from 'react-router-dom';

// Importar logos
import phinixLogo from '../assets/phinix_logo.png';
import hidranixLogo from '../assets/hidranix_logo.svg';
import econixLogo from '../assets/Logo_Econix.png';
import econixLogoWhite from '../assets/Logo_Econix_white.png';

// Iconos usando los logos reales
const PhinixIcon = ({ active }: { active: boolean }) => (
  <img 
    src={phinixLogo} 
    alt="Phinix Logo" 
    className={`w-7 h-7 object-contain transition-all duration-200 ${active ? 'opacity-100 scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]' : 'opacity-80'}`}
  />
);

const HidranixIcon = ({ active }: { active: boolean }) => (
  <img 
    src={hidranixLogo} 
    alt="Hidranix Logo" 
    className={`w-7 h-7 object-contain transition-all duration-200 ${active ? 'opacity-100 scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]' : 'opacity-80'}`}
  />
);

const EconixIcon = ({ active }: { active: boolean }) => (
  <img 
    src={active ? econixLogo : econixLogoWhite} 
    alt="Econix Logo" 
    className={`w-7 h-7 object-contain transition-all duration-200 ${active ? 'opacity-100 scale-110 drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]' : 'opacity-80'}`}
  />
);

interface NavItem {
  path: string;
  label: string;
  icon: (props: { active: boolean }) => React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Phinix', icon: PhinixIcon },
  { path: '/hidranix', label: 'Hidranix', icon: HidranixIcon },
  { path: '/econix', label: 'Econix', icon: EconixIcon },
];

const LandingLayout = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="relative min-h-screen">
      {/* Contenido del landing con view transition */}
      <main 
        className="pb-20"
        style={{
          viewTransitionName: 'main-content',
        }}
      >
        <Outlet />
      </main>

      {/* Navbar footer con efecto liquid glass verdoso */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div 
          className="flex items-center gap-1 px-3 py-2 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(4, 60, 66, 0.85) 0%, rgba(0, 106, 120, 0.75) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255,255,255,0.1)',
          }}
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                viewTransition
                className={`
                  relative flex flex-col items-center justify-center px-4 py-2 rounded-xl
                  transition-all duration-200 ease-out group
                  ${active 
                    ? 'bg-white/25 scale-105' 
                    : 'hover:bg-white/15 hover:scale-[1.02]'
                  }
                `}
                style={{
                  viewTransitionName: `nav-${item.label.toLowerCase()}`,
                }}
              >
                {/* Indicador activo con glow */}
                {active && (
                  <div 
                    className="absolute inset-0 rounded-xl opacity-50 blur-sm bg-emerald-400/40"
                  />
                )}
                
                {/* Icono */}
                <div className="relative z-10">
                  <IconComponent active={active} />
                </div>
                
                {/* Label */}
                <span 
                  className={`
                    relative z-10 text-[10px] font-semibold mt-1 transition-all duration-200
                    ${active 
                      ? 'text-white' 
                      : 'text-white/80 group-hover:text-white'
                    }
                  `}
                >
                  {item.label}
                </span>

                {/* Dot indicator cuando está activo */}
                {active && (
                  <div 
                    className="absolute -bottom-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400"
                    style={{
                      boxShadow: '0 0 8px rgba(52, 211, 153, 0.8)'
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default LandingLayout;
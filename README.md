#  Client Phinix (React + TypeScript + Vite)

## Architecture

```sh
src/
│
├── assets/                   # Archivos estáticos (imágenes, íconos, fuentes, etc.)
│
├── config/                   # Archivos de configuración global
│   └── clerk.ts              # Configuración de Clerk
│
├── modulos/                  # Módulos de la aplicación
│   ├── autenticacion/        # Módulo de autenticación
│   │   ├── components/       # Componentes del módulo de autenticación
│   │   │   └── LoginForm.tsx # Formulario de login
│   │   ├── pages/            # Páginas del módulo de autenticación
│   │   │   ├── LoginPage.tsx # Página de Login
│   │   │   └── RegisterPage.tsx # Página de Registro
│   │   ├── services/         # Servicios del módulo de autenticación
│   │   │   └── authService.ts # Lógica de autenticación
│   │   └── ProtectedRoute.tsx # Ruta protegida
│   │
│   ├── dashboard/            # Módulo del dashboard
│   │   ├── components/       # Componentes del dashboard
│   │   │   ├── ClientMode/   # Componentes específicos para el cliente
│   │   │   │   ├── PaymentList.tsx  # Lista de pagos realizados por el cliente
│   │   │   │   ├── YapePayment.tsx  # Componente para el pago con Yape
│   │   │   │   └── CardPayment.tsx  # Componente para el pago con tarjeta
│   │   │   ├── AdminMode/    # Componentes específicos para el administrador
│   │   │   │   ├── ClientList.tsx  # Lista de clientes registrados
│   │   │   │   ├── SearchFilter.tsx # Filtro de búsqueda por nombre, DNI, etc.
│   │   │   │   └── PaymentStatus.tsx # Componente para ver el estado de pagos de clientes
│   │   ├── pages/            # Páginas del dashboard
│   │   │   └── DashboardPage.tsx # Página principal del dashboard
│   │   └── services/         # Servicios relacionados con el dashboard
│   │       └── paymentService.ts # Lógica para procesar pagos y obtener lista de pagos
│   │
│   ├── landing/              # Módulo de las landing pages
│   │   ├── components/       # Componentes de las landing pages
│   │   │   └── LandingButton.tsx # Botón de login y registro
│   │   └── pages/            # Páginas de las landing pages
│   │       ├── LandingPhinix.tsx   # Página de aterrizaje de Phinix
│   │       └── LandingHidranix.tsx # Página de aterrizaje de Hidranix
│   │
│   └── services/             # Servicios comunes de la aplicación
│       └── apiService.ts     # Lógica para interactuar con APIs generales
│
├── hooks/                    # Custom hooks
│   └── useAuth.ts            # Hook para manejar la autenticación
│
├── store/                    # Estado global (si usas algo como Redux, Zustand, Context API, etc.)
│   └── authSlice.ts          # Slice o estado global para autenticación
│
├── styles/                   # Archivos de estilos (CSS, SCSS, Styled-components, etc.)
│   └── global.css            # Estilos globales
│
├── utils/                    # Funciones utilitarias
│   └── formatters.ts         # Funciones de formato, por ejemplo, para el nombre del usuario
│
└── App.tsx                   # Componente raíz

```

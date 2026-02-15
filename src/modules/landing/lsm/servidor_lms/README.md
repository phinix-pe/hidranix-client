### **Informe Técnico: Backend del LMS (Servidor)**

Este servidor actúa como el cerebro de la aplicación, gestionando los datos, la seguridad y la comunicación entre la base de datos y la interfaz del estudiante.

**Tecnologías Principales:**

- **Motor:** Node.js con Express (para manejar las rutas web).
- **Base de Datos:** SQLite (una base de datos ligera guardada en un archivo local `econix.db`).
- **Seguridad:** Encriptación de contraseñas y uso de Tokens (JWT) para sesiones seguras.

---

### **Funcionalidades Principales**

- **Gestión de Base de Datos Automática:**
- Al iniciar, el servidor verifica si existe la base de datos.
- Si no existe, crea automáticamente las tablas necesarias: _Usuarios, Cursos, Módulos, Lecciones, Inscripciones, Tareas y Progreso_.
- **Datos de Prueba:** Si el sistema está vacío, inserta automáticamente un curso de demostración ("Automatización e IOT") con módulos y lecciones de ejemplo.

- **Sistema de Autenticación (Seguridad):**
- **Registro:** Crea nuevos estudiantes, encripta su contraseña (para que no sea legible) y los inscribe automáticamente en el curso predeterminado.
- **Login:** Verifica las credenciales y devuelve un "Token" (llave digital) que el usuario usa para navegar sin tener que loguearse a cada rato.

- **Gestión de Archivos y Tareas:**
- Permite a los estudiantes subir archivos (PDFs) como tareas.
- **Organización:** Guarda los archivos en carpetas ordenadas automáticamente por: `curso / correo del usuario`.
- Renombra los archivos con la fecha para evitar que se sobrescriban si tienen el mismo nombre.

- **Control de Progreso Académico:**
- Calcula automáticamente el porcentaje de avance del estudiante (0% a 100%).
- Cada vez que un alumno completa una lección o sube una tarea, el sistema recalcula su progreso en la base de datos.
- Detecta cuándo un curso ha sido finalizado.

- **API (Puntos de Acceso):**
  Provee rutas para que el Frontend (la parte visual) pueda:
- Obtener la información del perfil del usuario.
- Listar los cursos y el estado de cada lección (completada o pendiente).
- Marcar lecciones como vistas.
- Subir y eliminar entregas de tareas.
- Actualizar la biografía y nombre del usuario.

### **Instrucciones de Despliegue**

1. **Instalación de dependencias:**

- Comando: `npm install` (Instala las librerías necesarias).

2. **Ejecución del Servidor:**

- Comando: `node index.js`

3. **Puerto:**

- El servicio queda activo escuchando en el puerto **3001**.

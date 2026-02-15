const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer"); // Asegúrate de instalar: npm install multer

const app = express();
const PORT = 3001;
const SECRET_KEY = "econix_secret_super_secure_key";

// Middleware
app.use(express.json());
app.use(cors());
// Servir archivos estáticos (para poder descargar lo que suban, protegido si deseas)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- CONFIGURACIÓN DE MULTER (Subida de Archivos) ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Obtenemos datos del request (el middleware de auth debe correr antes para tener req.user)
    // Nota: req.body.courseId viene del formulario del frontend
    const courseId = req.body.courseId || "general";
    const userEmail = req.user ? req.user.email : "anon";

    // Estructura: uploads/cursos/{courseId}/{emailUsuario}/
    const dir = `./uploads/cursos/${courseId}/${userEmail}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    // Guardamos con fecha para evitar duplicados de nombre
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// --- BASE DE DATOS ---
const db = new sqlite3.Database("./econix.db", (err) => {
  if (err) console.error(err.message);
  console.log("Conectado a la base de datos SQLite.");
});

// Inicialización de Tablas
const initDB = () => {
  db.serialize(() => {
    // ... Tablas existentes (users, courses, modules, etc) se mantienen igual ...
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'student',
      avatar TEXT DEFAULT 'BM',
      bio TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      instructor TEXT,
      image TEXT,
      description TEXT,
      startDate TEXT,
      endDate TEXT,
      totalModules INTEGER
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS modules (
      id TEXT PRIMARY KEY,
      course_id INTEGER,
      title TEXT,
      FOREIGN KEY(course_id) REFERENCES courses(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS lessons (
      id TEXT PRIMARY KEY,
      module_id TEXT,
      title TEXT,
      type TEXT, 
      duration TEXT,
      content_url TEXT,
      content_text TEXT, 
      FOREIGN KEY(module_id) REFERENCES modules(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS enrollments (
      user_id INTEGER,
      course_id INTEGER,
      progress INTEGER DEFAULT 0,
      is_completed INTEGER DEFAULT 0,
      enrollment_date TEXT,
      PRIMARY KEY (user_id, course_id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS lesson_completions (
      user_id INTEGER,
      lesson_id TEXT,
      completed_at TEXT,
      PRIMARY KEY (user_id, lesson_id)
    )`);

    // Actualizamos tabla submissions para incluir file_path y course_id
    db.run(`CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      lesson_id TEXT,
      course_id INTEGER,
      file_name TEXT,
      file_path TEXT,
      submission_date TEXT,
      status TEXT DEFAULT 'submitted'
    )`);

    // Seed Data (Datos iniciales)
    db.get("SELECT count(*) as count FROM courses", [], (err, row) => {
      if (row.count === 0) seedData();
    });
  });
};

// --- HELPER: Función para recalcular progreso ---
const updateCourseProgress = (userId, courseId) => {
  return new Promise((resolve, reject) => {
    // 1. Contar total de lecciones del curso
    const sqlTotal = `
        SELECT COUNT(*) as total 
        FROM lessons l
        JOIN modules m ON l.module_id = m.id
        WHERE m.course_id = ?
      `;

    // 2. Contar lecciones completadas por el usuario en este curso
    const sqlCompleted = `
        SELECT COUNT(*) as completed
        FROM lesson_completions lc
        JOIN lessons l ON lc.lesson_id = l.id
        JOIN modules m ON l.module_id = m.id
        WHERE lc.user_id = ? AND m.course_id = ?
      `;

    db.get(sqlTotal, [courseId], (err, rowTotal) => {
      if (err) return reject(err);
      const total = rowTotal.total;

      db.get(sqlCompleted, [userId, courseId], (err, rowCompleted) => {
        if (err) return reject(err);
        const completed = rowCompleted.completed;

        const progress =
          total === 0 ? 0 : Math.round((completed / total) * 100);
        const isCompleted = progress === 100 ? 1 : 0;

        // 3. Actualizar tabla enrollments
        db.run(
          `UPDATE enrollments SET progress = ?, is_completed = ? WHERE user_id = ? AND course_id = ?`,
          [progress, isCompleted, userId, courseId],
          (err) => {
            if (err) return reject(err);
            resolve({ progress, isCompleted });
          }
        );
      });
    });
  });
};

const seedData = () => {
  console.log("Insertando datos semilla actualizados...");

  // Curso 101
  const stmtCourse = db.prepare(
    "INSERT INTO courses (id, title, instructor, image, description, startDate, endDate, totalModules) VALUES (?,?,?,?,?,?,?,?)"
  );
  stmtCourse.run(
    101,
    "Automatización e IOT: Programación Inteligente con ESP32",
    "Ing. Keneth Brayan Pérez Huaroc",
    "https://images.unsplash.com/photo-1553406830-ef2513450d76?auto=format&fit=crop&q=80&w=600",
    "Domina el internet de las cosas...",
    "2025-11-01",
    "2025-12-15",
    8
  );
  stmtCourse.finalize();

  const m1 = db.prepare(
    "INSERT INTO modules (id, course_id, title) VALUES (?,?,?)"
  );
  m1.run("m1", 101, "Módulo 1: Introducción al IoT y ESP32");
  m1.run("m2", 101, "Módulo 2: Sensores y Actuadores");
  m1.finalize();

  const l = db.prepare(
    "INSERT INTO lessons (id, module_id, title, type, duration, content_url, content_text) VALUES (?,?,?,?,?,?,?)"
  );

  // LECCIÓN 1: Video de Youtube (Ejemplo)
  l.run(
    "l1",
    "m1",
    "Fundamentos de IoT (Video Youtube)",
    "video",
    "10:00",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Reemplaza con tu link de YT real
    "Introducción visual al curso."
  );

  // LECCIÓN 2: Video de Google Drive (El que pediste)
  l.run(
    "l2",
    "m1",
    "Clase Magistral (Google Drive)",
    "video",
    "15:30",
    "https://drive.google.com/file/d/1nqm44QgMKTqUWN36FLm4It2qbtL49aU8/view?usp=sharing",
    "Haz clic para abrir el video con tu cuenta registrada."
  );

  // LECCIÓN 3: Texto
  l.run(
    "l3",
    "m1",
    "Lectura: Hoja de datos del ESP32",
    "text",
    "5 min",
    "",
    "El ESP32 es una serie de microcontroladores de bajo costo y bajo consumo de energía con Wi-Fi y Bluetooth de modo dual integrados. La serie ESP32 emplea un microprocesador Tensilica Xtensa LX6 en variantes de doble núcleo y de un solo núcleo."
  );

  // LECCIÓN 4: Assignment (Tarea)
  l.run(
    "l6",
    "m2",
    "Proyecto: Riego Automático",
    "assignment",
    "Tarea",
    "",
    "Sube el diagrama de tu circuito y el código fuente en formato PDF."
  );
  l.finalize();
};

initDB();

// --- AUTH MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- ENDPOINTS ---

// Registro y Login (Se mantienen igual, resumido para brevedad)
app.post("/auth/register", async (req, res) => {
  // ... (Mismo código de registro que tenías)
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const initials = name.substring(0, 2).toUpperCase();
  db.run(
    `INSERT INTO users (name, email, password, avatar, bio) VALUES (?, ?, ?, ?, ?)`,
    [name, email, hashedPassword, initials, "Estudiante"],
    function (err) {
      if (err) return res.status(400).json({ error: "Email existe" });
      const userId = this.lastID;
      db.run(
        `INSERT INTO enrollments (user_id, course_id, enrollment_date) VALUES (?, ?, ?)`,
        [userId, 101, new Date().toISOString()],
        () => {
          const token = jwt.sign({ id: userId, email }, SECRET_KEY);
          res.json({
            token,
            user: { id: userId, name, email, avatar: initials },
          });
        }
      );
    }
  );
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: "Credenciales inválidas" });
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
      },
    });
  });
});

// Obtener Data (Se mantiene igual)
app.get("/api/me", authenticateToken, (req, res) => {
  const sql = `SELECT c.*, e.progress, e.is_completed FROM courses c JOIN enrollments e ON c.id = e.course_id WHERE e.user_id = ?`;
  db.all(sql, [req.user.id], (err, courses) => {
    if (err) return res.status(500).send("Error DB");
    const promises = courses.map(async (course) => {
      return new Promise((resolve) => {
        db.all(
          "SELECT * FROM modules WHERE course_id = ?",
          [course.id],
          async (err, modules) => {
            const modPromises = modules.map((mod) => {
              return new Promise((resolveMod) => {
                db.all(
                  `SELECT l.*, CASE WHEN lc.completed_at IS NOT NULL THEN 1 ELSE 0 END as completed FROM lessons l LEFT JOIN lesson_completions lc ON l.id = lc.lesson_id AND lc.user_id = ? WHERE l.module_id = ?`,
                  [req.user.id, mod.id],
                  (err, lessons) => {
                    resolveMod({
                      ...mod,
                      lessons: lessons.map((l) => ({
                        ...l,
                        completed: !!l.completed,
                      })),
                    });
                  }
                );
              });
            });
            resolve({
              ...course,
              modules: await Promise.all(modPromises),
              isCompleted: !!course.is_completed,
            });
          }
        );
      });
    });
    Promise.all(promises).then((data) => res.json({ courses: data }));
  });
});

// NUEVO: Subir Tarea (Assignment)
app.post(
  "/api/submissions",
  authenticateToken,
  upload.single("file"),
  (req, res) => {
    if (!req.file)
      return res.status(400).json({ error: "No se subió ningún archivo" });

    const { lessonId, courseId } = req.body;
    const userId = req.user.id;
    const filePath = req.file.path;

    // Insertar Submission
    db.run(
      `INSERT INTO submissions (user_id, lesson_id, course_id, file_name, file_path, submission_date) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        lessonId,
        courseId,
        req.file.originalname,
        filePath,
        new Date().toLocaleString(),
      ],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });

        // MARCAR LECCIÓN COMO COMPLETADA AUTOMÁTICAMENTE
        db.run(
          `INSERT OR IGNORE INTO lesson_completions (user_id, lesson_id, completed_at) VALUES (?, ?, ?)`,
          [userId, lessonId, new Date().toISOString()],
          async function (err) {
            // Recalcular Progreso
            try {
              await updateCourseProgress(userId, courseId);
              res.json({ success: true, filePath });
            } catch (e) {
              res.status(500).json({ error: "Error calculando progreso" });
            }
          }
        );
      }
    );
  }
);

app.delete("/api/submissions/:lessonId", authenticateToken, (req, res) => {
  const lessonId = req.params.lessonId;
  const userId = req.user.id;
  const { courseId } = req.body; // Necesitamos courseId para recalcular progreso si quisieras desmarcar (opcional)

  // Opcional: Podrías querer borrar también el registro de "completed" si borran la tarea.
  // Aquí solo borramos el archivo de la DB. El archivo físico se queda o usas fs.unlink.

  db.run(
    `DELETE FROM submissions WHERE user_id = ? AND lesson_id = ?`,
    [userId, lessonId],
    function (err) {
      if (err) return res.status(500).json({ error: "Error al borrar" });
      res.json({ success: true });
    }
  );
});

// 3. Marcar Lección como Completada (Actualizado con cálculo de progreso)
app.post("/api/lessons/:id/complete", authenticateToken, (req, res) => {
  const lessonId = req.params.id;
  const userId = req.user.id;
  const { courseId } = req.body;

  db.run(
    `INSERT OR IGNORE INTO lesson_completions (user_id, lesson_id, completed_at) VALUES (?, ?, ?)`,
    [userId, lessonId, new Date().toISOString()],
    async function (err) {
      if (err) return res.status(500).json({ error: err.message });

      try {
        const result = await updateCourseProgress(userId, courseId);
        res.json({ success: true, ...result });
      } catch (e) {
        res.status(500).json({ error: "Error actualizando progreso" });
      }
    }
  );
});

// 4. NUEVO ENDPOINT: Obtener Submissions del usuario (Para saber si ya subió algo al recargar)
app.get("/api/submissions", authenticateToken, (req, res) => {
  db.all(
    `SELECT lesson_id, file_name, submission_date, status FROM submissions WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Error" });
      // Convertir array a objeto mapa para acceso rápido { lessonId: submissionData }
      const submissionsMap = {};
      rows.forEach((row) => {
        submissionsMap[row.lesson_id] = {
          file: row.file_name,
          date: row.submission_date,
          status: row.status,
        };
      });
      res.json(submissionsMap);
    }
  );
});

// NUEVO: Marcar Lección como Completada
app.post("/api/lessons/:id/complete", authenticateToken, (req, res) => {
  const lessonId = req.params.id;
  const userId = req.user.id;

  db.run(
    `INSERT OR IGNORE INTO lesson_completions (user_id, lesson_id, completed_at) VALUES (?, ?, ?)`,
    [userId, lessonId, new Date().toISOString()],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Actualizar Perfil
app.put("/api/users/profile", authenticateToken, (req, res) => {
  const { name, bio } = req.body;
  db.run(
    `UPDATE users SET name = ?, bio = ? WHERE id = ?`,
    [name, bio, req.user.id],
    (err) => {
      res.json({ success: !err });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server corriendo en http://localhost:${PORT}`);
});

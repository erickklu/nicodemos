// Importar los módulos express, cors y sqlite
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

// Crear la aplicación express
const app = express();
const port = 3000;

// Usar cors para permitir peticiones desde otros orígenes
app.use(cors());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database("data/estudiantes.db");

// Crear la tabla si no existe
db.run(
  "CREATE TABLE IF NOT EXISTS estudiantes (es_codi INTEGER PRIMARY KEY, es_cedu INTEGER, es_nomb TEXT, es_apel TEXT, es_correo TEXT)"
);

// Definir la ruta para validar la cédula
app.get("/api/validar-cedula/:cedula", (req, res) => {
  const cedula = req.params.cedula;

  // Consultar la base de datos SQLite
  db.get(
    "SELECT * FROM estudiantes WHERE es_cedu = ?",
    [cedula],
    (err, row) => {
      if (err) {
        console.error(err);
        res.json({ valid: false, data: null });
        return;
      }

      if (row) {
        const estudiante = {
          apellidos: row.es_apel,
          nombres: row.es_nomb,
          cedula: row.es_cedu,
        };
        res.json({ valid: true, data: estudiante });
      } else {
        res.json({ valid: false, data: null });
      }
    }
  );
});

// Definir la ruta para obtener los datos del estudiante
app.get("/api/obtener-datos-estudiante/:cedula", (req, res) => {
  const cedula = req.params.cedula;

  // Consultar la base de datos SQLite
  db.get(
    "SELECT * FROM estudiantes WHERE es_cedu = ?",
    [cedula],
    (err, row) => {
      if (err) {
        console.error(err);
        res.status(404).json({ error: "Estudiante no encontrado" });
        return;
      }

      if (row) {
        res.json({ estudiante: row });
      } else {
        res.status(404).json({ error: "Estudiante no encontrado" });
      }
    }
  );
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend running on http://192.168.1.3:${port}`);
});

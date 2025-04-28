import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

// Creación de un servidor express basico
const app = express();

app.use(morgan("dev")); // Middleware para registrar las peticiones HTTP en la consola
app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(cookieParser()); // Middleware para parsear las cookies de las peticiones

// 🔥 Agrega este pequeño middleware
app.use((req, res, next) => {
  if (req.body === undefined) {
    req.body = {};
  }
  next();
});

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;

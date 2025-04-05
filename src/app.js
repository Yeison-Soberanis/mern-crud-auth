import express from 'express'
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';

// Creación de un servidor express basico
const app = express();

app.use(morgan('dev')); // Middleware para registrar las peticiones HTTP en la consola
app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones a JSON

app.use("/api", authRoutes);

export default app;
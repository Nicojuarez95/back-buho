import express from 'express';
import 'dotenv/config.js';
import cors from "cors";
import path from 'path';
import { __dirname } from './utils.js'; // Asumimos que utils.js está en la raíz

import './config/database.js';
import indexRouter from './routes/index.js';

const app = express();

// --- Middlewares ---
app.use(cors()); // Habilita CORS para permitir peticiones desde tu frontend
app.use(express.json()); // Permite al servidor entender JSON
app.use(express.urlencoded({ extended: false })); // Permite al servidor entender datos de formularios

app.use(express.static(path.join(__dirname, 'public')));

// Hace que la carpeta 'uploads' sea accesible desde el navegador.
// Así, una imagen guardada en 'uploads/imagen1.jpg' se podrá ver en 'http://localhost:8000/uploads/imagen1.jpg'.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// --- Configuración de Vistas (si la llegas a usar en el futuro) ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// --- Rutas Principales de la API ---
app.use('/api', indexRouter);

export default app;


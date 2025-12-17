import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPerfilByIdController, getAllPerfilesController, obtenerEstadisticasPerfilController} from '../../../adapters/controllers/PerfilController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const perfilRouter = express.Router();

// Ruta para obtener una persona por ID utilizando el controlador

perfilRouter.get('/todaslaspersonas', getAllPerfilesController);
perfilRouter.get('/id/:id', getPerfilByIdController);
perfilRouter.get('/estadisticas', obtenerEstadisticasPerfilController);
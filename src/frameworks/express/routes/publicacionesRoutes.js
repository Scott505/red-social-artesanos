import express from 'express';
import { crearPublicacionController } from '../../../adapters/controllers/PublicacionesController.js';
import { renderPublicarConAlbumnes } from '../../../adapters/controllers/AlbumnesController.js';
import { upload } from '../../../middlewares/upload.js';
import { crearComentarioController } from '../../../adapters/controllers/ComentariosController.js';

export const publicacionesRouter = express.Router();

// Ruta principal de publicaciones

publicacionesRouter.get('/', renderPublicarConAlbumnes);

publicacionesRouter.post('/guardar', upload.single('imagen'), crearPublicacionController);

publicacionesRouter.post('/comentarios', crearComentarioController);
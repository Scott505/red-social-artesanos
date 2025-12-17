import express from 'express';
import {  mostrarAlbumesDePerfil , mostrarPublicacionesDeAlbum } from '../../../adapters/controllers/mostarController.js';
import { mostrarPublicacionesController } from '../../../adapters/controllers/PublicacionesController.js';

export const mostrarRouter = express.Router();

mostrarRouter.get('/albumnes/:id', mostrarAlbumesDePerfil );

mostrarRouter.get('/publicacion/:id', mostrarPublicacionesController);

mostrarRouter.get('/album/:id', mostrarPublicacionesDeAlbum);
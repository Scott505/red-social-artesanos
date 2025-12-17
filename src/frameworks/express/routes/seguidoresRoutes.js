import express from 'express';
import {
    seguirController, dejarDeSeguirController,
    mostrarSolicitudesController, aceptarSolicitudController,
    rechazarSolicitudController
} from '../../../adapters/controllers/SeguidoresController.js';

export const seguidoresRoutes = express.Router();

seguidoresRoutes.post('/seguir/:idSeguido', seguirController);

seguidoresRoutes.post('/dejar/:idSeguido', dejarDeSeguirController);

seguidoresRoutes.get('/solicitudes', mostrarSolicitudesController);

seguidoresRoutes.post('/aceptar/:idSeguidor', aceptarSolicitudController);

seguidoresRoutes.post('/rechazar/:idSeguidor', rechazarSolicitudController);
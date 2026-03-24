// src/middlewares/cargarNotificacionesMiddleware.js
import { NotificacionesRepository } from '../adapters/repositories/NotificacionesRepository.js';

export const cargarNotificacionesMiddleware = async (req, res, next) => {
  if (req.session.user) {
    const repo = new NotificacionesRepository();
    try {
      const notificaciones = await repo.findUnreadById(req.session.user.id_perfil);
            console.log('Notificaciones cargadas:', notificaciones);

      res.locals.notificaciones = notificaciones; // disponible en Pug
      res.locals.notificacionesNoLeidas = notificaciones.length; // puntito rojo
    } catch (err) {
      console.error('Error cargando notificaciones:', err);
      res.locals.notificaciones = [];
      res.locals.notificacionesNoLeidas = 0;
    }
  } else {
    res.locals.notificaciones = [];
    res.locals.notificacionesNoLeidas = 0;
  }
  next();
};
import { NotificacionesRepository } from '../repositories/NotificacionesRepository.js';

export const mostrarNotificacionesController = async (req, res) => {
  const notificacionesRepo = new NotificacionesRepository();
  const user = req.session.user;

  try {
    // 1. Marcar como leídas apenas entra
    await notificacionesRepo.marcarComoLeidas(user.id_perfil);

    // 2. Traer la lista para mostrar
    const lista = await notificacionesRepo.getByPerfilId(user.id_perfil);
    
    res.render('notificaciones', { 
      notificaciones: lista,
      user: user,
      titulo: 'Notificaciones'
    });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
};
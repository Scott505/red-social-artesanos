import { crearComentario } from '../../usecase/comentarios/crearComentario.js';
import { ComentariosRepository } from '../repositories/ComentariosRepository.js';
import { NotificacionesRepository } from '../repositories/NotificacionesRepository.js';
import { PublicacionesRepository } from '../repositories/PublicacionesRepository.js';

export const crearComentarioController = async (req, res) => {
  const comentariosRepo = new ComentariosRepository();
  const notificacionesRepo = new NotificacionesRepository();
  const publicacionesRepo = new PublicacionesRepository();

  const { id_publicacion, comentario } = req.body;
  const id_perfil = req.session.user?.id_perfil;

  if (!id_perfil || !id_publicacion || !comentario) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }

  try {
    await crearComentario({
      comentarioData: {
        id_perfil,
        id_publicacion,
        comentario,
      },
      comentariosRepository: comentariosRepo,
    });

    //////// Notificaciones /////////////////

    const publicacion = await publicacionesRepo.getById(id_publicacion);
    const id_perfil_receptor = publicacion.id_perfil;

    if (id_perfil_receptor !== id_perfil) {
      await notificacionesRepo.create({
        id_perfil_receptor,
        id_perfil_emisor: id_perfil,
        id_publicacion
      });

      const io = req.app.get('io');

      if (io) {
        io.to(`usuario_${id_perfil_receptor}`).emit('nueva-notificacion', {
          mensaje: 'Alguien comentó tu publicación',
          id_publicacion
        });
      }
    }

    /////////////////////////////////////////////

    res.redirect(`/mostrar/publicacion/${id_publicacion}`);

  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};
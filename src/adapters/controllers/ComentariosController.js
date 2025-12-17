import { crearComentario } from '../../usecase/comentarios/crearComentario.js';
import { ComentariosRepository } from '../repositories/ComentariosRepository.js';

export const crearComentarioController = async (req, res) => {
  const comentariosRepo = new ComentariosRepository();
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

    res.redirect(`/mostrar/publicacion/${id_publicacion}`);


  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
};

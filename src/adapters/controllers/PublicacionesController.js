import { getSequelize } from '../../frameworks/sequelize/db/db.js';
//Repository's
import { PublicacionesRepository } from '../repositories/PublicacionesRepository.js';
import { AlbumRepository } from '../repositories/AlbumRepository.js';
import { AlbumPublicacionRepository } from '../repositories/AlbumPublicacionRepository.js';
import { PerfilRepository } from '../repositories/PerfilRepository.js';
import { ComentariosRepository } from '../repositories/ComentariosRepository.js';
import { PublicacionEtiquetasRepository } from '../repositories/PublicacionEtiquetasRepository.js';
//useacase
import { manejadorDeTransacciones } from '../../usecase/manejadorDeTransacciones.js';
import { crearPublicacionConAlbum } from '../../usecase/publicaciones/crearPublicacionConAlbum.js';
import { getPublicacionConComentarios } from '../../usecase/publicaciones/getPublicacionConComentarios.js';
import { getInteresesPublicacion } from '../../usecase/etiquetas/getInteresesPublicacion.js';

export const crearPublicacionController = async (req, res) => {
    const sequelize = getSequelize();
    const publicacionesRepo = new PublicacionesRepository();
    const albumRepo = new AlbumRepository();
    const albumPublicacionRepo = new AlbumPublicacionRepository();
    const publicacionEtiquetasRepo = new PublicacionEtiquetasRepository();


    const { descripcion, id_album, titulo_nuevo_album, etiquetas } = req.body;
    const imagen = req.file ? req.file.filename : null;
    const id_perfil = req.session.user.id_perfil;

    if (!descripcion || !id_perfil || !imagen) {
        return res.status(400).send('Faltan datos obligatorios');
    }

    try {
        await manejadorDeTransacciones.withTransaction(sequelize, async (transaction) => {
            await crearPublicacionConAlbum({
                publicacionesRepo,
                albumRepo,
                albumPublicacionRepo,
                publicacionEtiquetasRepo,
                transaction,
                id_perfil,
                descripcion,
                imagen,
                id_album: id_album || null,
                titulo_nuevo_album: titulo_nuevo_album?.trim() || null,
                etiquetas
            });
        });

        res.redirect('/mostrar/albumnes/' + id_perfil);

    } catch (error) {
        console.error('Error al crear publicación:', error);
        res.status(500).send('Error al crear la publicación');
    }
};


export const mostrarPublicacionesController = async (req, res) => {
  const id_publicacion = req.params.id;

  const publicacionesRepo = new PublicacionesRepository();
  const comentariosRepo = new ComentariosRepository();
  const perfilesRepo = new PerfilRepository();
  const publicacionEtiquetasRepo = new PublicacionEtiquetasRepository();

  try {
    const publicacion = await getPublicacionConComentarios({
      id_publicacion,
      publicacionesRepository: publicacionesRepo,
      comentariosRepository: comentariosRepo,
      perfilesRepository: perfilesRepo
    });

    if (!publicacion) {
      return res.status(404).send('Publicación no encontrada');
    }

    const intereses = await getInteresesPublicacion(id_publicacion, publicacionEtiquetasRepo);

    //console.log('Publicación obtenida:', publicacion);

    res.render('verPublicacion', {
      titulo: `Publicación de ${publicacion.nombre_perfil}`,
      publicaciones: [publicacion],
      intereses
    });

  } catch (error) {
    
    console.error('Error al obtener publicación:', error);
    res.status(500).send('Error interno');
  }
};

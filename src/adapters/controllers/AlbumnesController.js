import { AlbumRepository } from '../repositories/AlbumRepository.js';
import { getAlbumnesByPerfil } from '../../usecase/album/getAlbumnesByPerfil.js';


//obtener albumnes x perfil
export const getAlbumnesByPerfilController = async (req, res) => {
  const albumRepository = new AlbumRepository();
  try {
    const id_perfil = req.session.user.id_perfil; 
    //Llama al caso de uso
    const albumnes = await getAlbumnesByPerfil(id_perfil, albumRepository);

    if (!albumnes || albumnes.length === 0) {
      return res.status(404).json({ error: 'Álbumes no encontrados para el perfil' });
    }

    res.json(albumnes);

  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ error: error.message });
    }

    console.error('Error en getAlbumnesByPerfilController:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


//Envia los albumnes a la vista publicar
export const renderPublicarConAlbumnes = async (req, res, next) => {
  const albumRepository = new AlbumRepository();
  try {
    const id_perfil = req.session.user.id_perfil;
    const obtenerAlbumnes = await getAlbumnesByPerfil(id_perfil, albumRepository);
    const albumnes = obtenerAlbumnes.map(a => a.toJSON());

    //console.log('ID de perfil:', id_perfil);
    //console.log('Álbumes obtenidos para publicar:', albumnes);

    res.render('publicar', { titulo: 'Publicar', albumnes });
  } catch (error) {
    console.error('Error al obtener álbumes para publicar:', error);
    next(error);
  }
};
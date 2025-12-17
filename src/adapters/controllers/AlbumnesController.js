import { AlbumRepository } from '../repositories/AlbumRepository.js';
import { getAlbumnesByPerfil } from '../../usecase/album/getAlbumnesByPerfil.js';
import { EtiquetasRepository } from "../repositories/EtiquetasRepository.js";
import { getAllEtiquetas } from "../../usecase/etiquetas/getAllEtiquetas.js";


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
  const etiquetasRepository = new EtiquetasRepository();
  try {
    const id_perfil = req.session.user.id_perfil;
    const obtenerAlbumnes = await getAlbumnesByPerfil(id_perfil, albumRepository);
    const albumnes = obtenerAlbumnes.map(a => a.toJSON());
    const etiquetas = await getAllEtiquetas(etiquetasRepository);

    res.render('publicar', { 
      titulo: 'Publicar', 
      albumnes ,
      etiquetas
    });
  } catch (error) {
    console.error('Error al obtener álbumes o etiquetas para publicar:', error);
    next(error);
  }
};

async function obtenerEtiquetas() {
  try {
    const etiquetasRepository = new EtiquetasRepository();
    const etiquetas = await getAllEtiquetas(etiquetasRepository);

    return etiquetas;
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar etiquetas');
  }  }
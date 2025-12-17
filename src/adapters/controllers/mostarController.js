import { AlbumRepository } from '../repositories/AlbumRepository.js';
import { PublicacionesRepository } from '../repositories/PublicacionesRepository.js';
import { getAlbumnesByPerfil } from '../../usecase/album/getAlbumnesByPerfil.js';
import { getPublicacionesByAlbum } from '../../usecase/publicaciones/getPublicacionesByAlbum.js';

export const mostrarAlbumesDePerfil = async (req, res) => {
    const albumRepository = new AlbumRepository();

    try {
        const id_perfil = parseInt(req.params.id, 10);
        const id_perfil_logueado = req.session.user?.id_perfil;

        console.log('parametos:', req.params);
        console.log('ID del perfil a mostrar:', id_perfil);
        console.log('ID del perfil logueado:', id_perfil_logueado)
        ;
        const albumes = await getAlbumnesByPerfil(id_perfil, albumRepository);

        const albumesplano = albumes.map(album => ({
            id: album.id_album,
            nombre: album.titulo
        }));

        const esPerfilPropio = id_perfil === id_perfil_logueado;
        const titulo = esPerfilPropio ? 'Mis Álbumes' : `Álbumes de ${req.query.nombre}`;

        // console.log('Álbumes obtenidos:', albumes);
        // console.log('Álbumes planos:', albumesplano);

        res.render('cuadricula', {
            titulo,
            tipo: 'album',
            items: albumesplano
        });

    } catch (error) {

        console.error('Error al mostrar álbumes:', error);

        res.status(500).send('Error al mostrar álbumes');
    }

};

export const mostrarPublicacionesDeAlbum = async (req, res) => {
    const publicacionesRepository = new PublicacionesRepository();

    try {
        const id_album = req.params.id;
        const publicaciones = await getPublicacionesByAlbum(id_album, publicacionesRepository);

        //console.log('Publicaciones obtenidas para el álbum:', publicaciones);

        const publicacionesParaVista = publicaciones.map(pub => ({
            id: pub.id_publicacion,
            imagen_url: `/uploads/${pub.imagen}`
        }));


        res.render('cuadricula', {
            titulo: 'Publicaciones del Álbum',
            tipo: 'publicacion',
            items: publicacionesParaVista

        });
    } catch (error) {

        console.error('Error al mostrar publicaciones:', error);
        res.status(500).send('Error al mostrar publicaciones');

    }
};

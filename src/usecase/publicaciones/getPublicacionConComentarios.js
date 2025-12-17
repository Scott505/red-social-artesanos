export async function getPublicacionConComentarios({
    id_publicacion,
    publicacionesRepository,
    comentariosRepository,
    perfilesRepository
}) {
    const publicacion = await publicacionesRepository.getById(id_publicacion);

    if (!publicacion) {
        return null;
    }

    const perfil = await perfilesRepository.getPerfilById(publicacion.id_perfil, { raw: true });

    const comentarios = await comentariosRepository.getByPublicacionId(id_publicacion);

    //console.log('Perfil obtenido:', perfil);
    //console.log('Publicación obtenida:', publicacion);
   // console.log('Comentarios obtenidos:', comentarios);
    

    return {
        id_publicacion: publicacion.id_publicacion,
        descripcion: publicacion.descripcion,
        imagen: publicacion.imagen,
        nombre_perfil: perfil?.nombre || 'Perfil desconocido',
        comentarios: comentarios.map(c => ({
            usuario: c.id_perfil_perfile?.nombre || 'Anónimo',
            texto: c.comentario
        }))
    };
}

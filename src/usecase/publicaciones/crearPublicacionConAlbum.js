export const crearPublicacionConAlbum = async ({
  publicacionesRepo,
  albumRepo,
  albumPublicacionRepo,
  publicacionEtiquetasRepo,
  transaction,
  id_perfil,
  descripcion,
  imagen,
  id_album,
  titulo_nuevo_album,
  etiquetas
}) => {
  let id_album_final = id_album;

  // Si no hay álbum, crear uno nuevo (si tiene título)
  if (!id_album && titulo_nuevo_album) {
    const nuevoAlbum = await albumRepo.create(
      { titulo: titulo_nuevo_album, id_perfil },
      { transaction }
    );
    id_album_final = nuevoAlbum.id_album;
  }

  // Crear la publicación
  const publicacion = await publicacionesRepo.create(
    { descripcion, imagen, id_perfil },
    { transaction }
  );

  // Relacionar con el álbum
  if (id_album_final) {
    await albumPublicacionRepo.create(
      { id_album: id_album_final, id_publicacion: publicacion.id_publicacion },
      { transaction }
    );
  }
//asociar etiquetas
  if (etiquetas && etiquetas.length > 0) {
    for (const id_interes of etiquetas) {
      await publicacionEtiquetasRepo.create({
        id_publicacion: publicacion.id_publicacion,
        id_interes: parseInt(id_interes, 10)
      }, { transaction });
    }
  }


  return publicacion;
};

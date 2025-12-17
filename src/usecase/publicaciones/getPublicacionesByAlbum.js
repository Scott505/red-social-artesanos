export const getPublicacionesByAlbum = async (id_album, publicacionesRepository) => {
  return await publicacionesRepository.getByAlbum(id_album);
};

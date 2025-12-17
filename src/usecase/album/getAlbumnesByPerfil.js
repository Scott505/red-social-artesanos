export const getAlbumnesByPerfil = async (id_perfil, albumRepository) => {
  
  const albumnes = await albumRepository.getByPerfil(id_perfil);

  return albumnes;
}

export const seguir = async (seguidoresRepository, idSeguidor, idSeguido) => {
  return await seguidoresRepository.crearSolicitud(idSeguidor, idSeguido);
};

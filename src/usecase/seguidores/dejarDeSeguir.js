export const dejarDeSeguir = async (seguidoresRepository, idSeguidor, idSeguido) => {
  return await seguidoresRepository.eliminarSeguimiento(idSeguidor, idSeguido);
};

export const aceptarSolicitud = async (seguidoresRepository, id_seguidor, id_seguido) => {
  return await seguidoresRepository.aceptarRelacion(id_seguidor, id_seguido);
};

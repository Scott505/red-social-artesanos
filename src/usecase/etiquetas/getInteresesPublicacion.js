export const getInteresesPublicacion = async (id_publicacion, publicacionEtiquetasRepository) => {
  const registros = await publicacionEtiquetasRepository.findByPublicacionId(id_publicacion);

  const intereses = registros.map(r => r.id_interes_etiqueta.nombre);

  return intereses;
};

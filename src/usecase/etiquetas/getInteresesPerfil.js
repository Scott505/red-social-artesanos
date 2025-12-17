export const getInteresesPerfil = async (id_perfil, perfilesEtiquetasRepository) => {
  const registros = await perfilesEtiquetasRepository.findByPerfilId(id_perfil);

  const intereses = registros.map(r => r.id_interes_etiqueta.nombre);

  return intereses;
};

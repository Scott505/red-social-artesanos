export const obtenerEstadisticasPerfil = async (id_perfil, perfilRepository) => {
  if (!id_perfil) {
    const error = new Error("id_perfil es requerido");
    error.statusCode = 400;
    throw error;
  }

  const resultado = await perfilRepository.obtenerEstadisticasPerfil(id_perfil);

  return resultado;
};

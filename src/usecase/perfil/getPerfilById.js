
//Funcion para traer persona por ID sin dependencias externas

export const getPerfilById = async (id, perfilRepository) => {
  const perfil = await perfilRepository.getPerfilById(id);
 
  if (!perfil) {
    const notFoundError = new Error(`Perfil con ID ${id} no encontrada`);
    notFoundError.statusCode = 404; //Cambiar el código de estado a 404 si no se encuentra el perfil
    throw notFoundError; // Lanza un error si el perfil no se encuentra
  } 

  return perfil; // Retorna el perfil si la encontró
}
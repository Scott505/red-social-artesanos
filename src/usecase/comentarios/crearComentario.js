export const crearComentario = async ({
  comentarioData,
  comentariosRepository,
}) => {
  return await comentariosRepository.create(comentarioData);
};

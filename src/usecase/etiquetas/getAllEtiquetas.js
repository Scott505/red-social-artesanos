export const getAllEtiquetas = async (etiquetasRepository) => {
  return await etiquetasRepository.findAll();
};

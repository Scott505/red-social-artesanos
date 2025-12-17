import { EtiquetasRepository } from "../repositories/EtiquetasRepository.js";
import { getAllEtiquetas } from "../../usecase/etiquetas/getAllEtiquetas.js";

export const mostrarRegistroConEtiquetas = async (req, res) => {
  try {
    const etiquetasRepository = new EtiquetasRepository();
    const etiquetas = await getAllEtiquetas(etiquetasRepository);

    res.render('registro', {
      titulo: 'Registro de Persona',
      etiquetas
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar etiquetas');
  }
};

import { getModels } from "../../frameworks/sequelize/db/db.js";

export class PublicacionEtiquetasRepository {
  constructor() {
    const models = getModels();
    this.publicacionEtiquetasModel = models.publicaciones_etiquetas;
    this.etiquetasModel = models.etiquetas;
  }

  async create(data, options = {}) {
    return await this.publicacionEtiquetasModel.create(data, options);
  }

  async findByPublicacionId(id_publicacion, options = {}) {
    return await this.publicacionEtiquetasModel.findAll({
      where: { id_publicacion },
      include: [
        {
          model: this.etiquetasModel,
          as: 'id_interes_etiqueta',
          attributes: ['id_interes', 'nombre'],
        }
      ],
      ...options
    });
  }
}
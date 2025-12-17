import { getModels } from "../../frameworks/sequelize/db/db.js";

export class PerfilesEtiquetasRepository {
  constructor() {
    const models = getModels();
    this.perfilesEtiquetasModel = models.perfiles_etiquetas;
    this.etiquetasModel = models.etiquetas;
  }

  async create(data, options = {}) {
    return await this.perfilesEtiquetasModel.create(data, options);
  }


  async findByPerfilId(id_perfil, options = {}) {
    return await this.perfilesEtiquetasModel.findAll({
      where: { id_perfil },
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

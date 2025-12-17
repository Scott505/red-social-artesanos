import { getModels } from "../../frameworks/sequelize/db/db.js";

export class AlbumRepository {
  constructor() {
    const models = getModels();
    this.albumes = models.albumnes;
  }

  async create(data, options = {}) {
    return await this.albumes.create(data, options);
  }

  async getByPerfil(id_perfil, options = {}) {
    return await this.albumes.findAll({
      where: { id_perfil },
      ...options
    });
  }
}

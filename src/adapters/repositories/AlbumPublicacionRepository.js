import { getModels } from "../../frameworks/sequelize/db/db.js";

export class AlbumPublicacionRepository {
  constructor() {
    const models = getModels();
    this.albumPublicacion = models.album_publicacion;
  }

  async create(data, options = {}) {
    return await this.albumPublicacion.create(data, options);
  }
}

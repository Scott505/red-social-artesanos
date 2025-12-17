import { getModels } from "../../frameworks/sequelize/db/db.js";

export class UsuarioRepository {
  constructor() {
    const models = getModels();
    this.usuariosModel = models.usuarios;
  }

  async getUsuarioById(id, options = {}) {
    return await this.usuariosModel.findByPk(id, options);
  }

  async getAllUsuarios(options = {}) {
    return await this.usuariosModel.findAll(options);
  }

  async create(usuarioData, options = {}) {
    return await this.usuariosModel.create(usuarioData, options);
  }

  async findByUsername(username, options = {}) {
    return await this.usuariosModel.findOne({
      where: { username },
      ...options
    });
  }

}
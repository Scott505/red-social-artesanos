import { getModels } from "../../frameworks/sequelize/db/db.js";
import { getSequelize } from "../../frameworks/sequelize/db/db.js";
import { QueryTypes } from "sequelize";


export class PerfilRepository {
  constructor() {
    const models = getModels();
    this.perfilesModel = models.perfiles;
  }

  async getPerfilById(id, options = {}) {
    return await this.perfilesModel.findByPk(id, options);
  }

  async getAllPerfiles(options = {}) {
    return await this.perfilesModel.findAll(options);
  }

  async create(perfilData, options = {}) {
    return await this.perfilesModel.create(perfilData, options);
  }

  async findByUsuarioId(id_usuario, options = {}) {
    return await this.perfilesModel.findOne({
      where: { id_usuario },
      ...options,
    });
  }

  async obtenerEstadisticasPerfil(id_perfil) {
     const sequelize = getSequelize();

    const [result] = await sequelize.query(
      `
      SELECT 
          (SELECT COUNT(*) FROM albumnes a WHERE a.id_perfil = :idPerfil) AS total_albumnes,
          (SELECT COUNT(*) FROM publicaciones pub WHERE pub.id_perfil = :idPerfil) AS total_publicaciones,
          (SELECT COUNT(*)
           FROM comentarios c
           JOIN publicaciones pub ON pub.id_publicacion = c.id_publicacion
           WHERE pub.id_perfil = :idPerfil) AS comentarios_recibidos,
          (SELECT COUNT(*) FROM comentarios c WHERE c.id_perfil = :idPerfil) AS comentarios_realizados,
          (SELECT COUNT(*) FROM seguidores s WHERE s.id_seguido = :idPerfil AND s.aceptado = 1) AS total_seguidores,
          (SELECT COUNT(*) FROM seguidores s WHERE s.id_seguidor = :idPerfil AND s.aceptado = 1) AS total_seguidos
      `,
      {
        replacements: { idPerfil: id_perfil },
        type: QueryTypes.SELECT,
      }
    );
    return result;
  }

}

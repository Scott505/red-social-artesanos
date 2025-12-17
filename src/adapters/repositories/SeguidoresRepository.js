import { getModels } from "../../frameworks/sequelize/db/db.js";

export class SeguidoresRepository {
  constructor() {
    const models = getModels();
    this.seguidores = models.seguidores;
    this.perfiles = models.perfiles;
  }

  async getSeguimientosDeUsuario(id_seguidor, options = {}) {
    return await this.seguidores.findAll({
      where: { id_seguidor },
      ...options
    });
  }

  async crearSolicitud(id_seguidor, id_seguido, options = {}) {
    return await this.seguidores.create({
      id_seguidor,
      id_seguido,
      aceptado: 0
    }, {
      ...options
    });
  }

  async eliminarSeguimiento(id_seguidor, id_seguido, options = {}) {
    return await this.seguidores.destroy({
      where: {
        id_seguidor,
        id_seguido
      },
      ...options
    });
  }

  async getEstadoSeguimiento(id_seguidor, id_seguido, options = {}) {
    return await this.seguidores.findOne({
      where: {
        id_seguidor,
        id_seguido
      },
      ...options
    });
  }

  async getSolicitudesConPerfiles(id_usuario) {
    return await this.seguidores.findAll({
      where: {
        aceptado: '0',
        id_seguido: id_usuario,
      },
      include: [
        {
          model: this.perfiles,
          as: 'id_seguidor_perfile',
          attributes: ['id_perfil', 'nombre', 'foto'],
        },
      ],
    });
  }
  async aceptarRelacion(id_seguidor, id_seguido, options = {}) {
    return await this.seguidores.update(
      { aceptado: 1 },
      {
        where: { id_seguidor, id_seguido },
        ...options
      }
    );
  }

}

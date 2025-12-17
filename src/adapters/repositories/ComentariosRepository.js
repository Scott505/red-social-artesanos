import { getModels } from "../../frameworks/sequelize/db/db.js";

export class ComentariosRepository {
    constructor() {
        const models = getModels();
        this.comentariosModel = models.comentarios;
        this.perfiles = models.perfiles;
    }

    async create(comentarioData, options = {}) {
        return await this.comentariosModel.create(comentarioData, options);
    }

    async findById(id, options = {}) {
        return await this.comentariosModel.findByPk(id, options);
    }

    async findAll(options = {}) {
        return await this.comentariosModel.findAll(options);
    }

    async update(id, comentarioData, options = {}) {
        const comentario = await this.findById(id, options);
        if (comentario) {
            return await comentario.update(comentarioData, options);
        }
        return null;
    }

    async delete(id, options = {}) {
        const comentario = await this.findById(id, options);
        if (comentario) {
            return await comentario.destroy(options);
        }
        return null;
    }

    async getByPublicacionId(id_publicacion, options = {}) {
        return await this.comentariosModel.findAll({
            where: { id_publicacion },
            include: [
                {
                    model: this.perfiles,
                    as: 'id_perfil_perfile',
                    attributes: ['nombre']
                }
            ],
            ...options
        });
    }
}

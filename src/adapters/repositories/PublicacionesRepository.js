import { getModels } from "../../frameworks/sequelize/db/db.js";

export class PublicacionesRepository {
    constructor() {
        const models = getModels();
        this.publicaciones = models.publicaciones;
        this.albumnes = models.albumnes;
    }

    async create(publicacionData, options = {}) {
        return await this.publicaciones.create(publicacionData, options);
    }

    async getByAlbum(id_album, options = {}) {
        return await this.publicaciones.findAll({
            include: [
                {
                    association: 'id_album_albumnes',
                    where: { id_album },
                    through: { attributes: [] }
                }
            ],
            ...options
        });
    }

    async getById(id_publicacion, options = {}) {
        return await this.publicaciones.findByPk(id_publicacion, options);
    }

    async getAll(options = {}) {
        return await this.publicaciones.findAll({ raw: true, ...options });
    }

};

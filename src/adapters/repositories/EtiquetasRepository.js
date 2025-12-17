import { getModels } from "../../frameworks/sequelize/db/db.js";

export class EtiquetasRepository {
    constructor() {
        const models = getModels();
        this.etiquetasModel = models.etiquetas;
    }

    async findAll(options = {}) {
        return await this.etiquetasModel.findAll(options);
    }
}
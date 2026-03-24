import { raw } from "mysql2";
import { getModels } from "../../frameworks/sequelize/db/db.js";

export class NotificacionesRepository {
    constructor() {
        const models = getModels();
        this.notificacionesModel = models.notificaciones;
        this.perfiles = models.perfiles;
        this.publicaciones = models.publicaciones;
    }

    async create(notificacionData, options = {}) {
        return await this.notificacionesModel.create(notificacionData, options);
    }

    async findById(id, options = {}) {
        return await this.notificacionesModel.findByPk(id, options);
    }

    // Obtener todas las notificaciones de un artesano específico
    async getByPerfilId(id_perfil_receptor, options = {}) {
        return await this.notificacionesModel.findAll({
            where: { id_perfil_receptor },
            include: [
                {
                    model: this.perfiles,
                    // Ajustado al alias real de tu initModels:
                    as: 'id_perfil_emisor_perfile',
                    attributes: ['nombre', 'foto']
                }
            ],
            order: [['fecha_creacion', 'DESC']],
            ...options
        });
    }

    // Para marcar una notificación como leída
    async marcarComoLeidas(id_perfil_receptor) {
        return await this.notificacionesModel.update(
            { leida: true },
            { where: { id_perfil_receptor, leida: false } }
        );
    }

    // Para marcar todas las notificaciones de un usuario como leídas de golpe
    async markAllAsRead(id_perfil_receptor, options = {}) {
        return await this.notificacionesModel.update(
            { leida: true },
            { where: { id_perfil_receptor }, ...options }
        );
    }

    async delete(id, options = {}) {
        const notificacion = await this.findById(id, options);
        if (notificacion) {
            return await notificacion.destroy(options);
        }
        return null;
    }

    async countUnread(id_perfil_receptor) {
        return await this.notificacionesModel.count({
            where: {
                id_perfil_receptor,
                leida: false
            }
        });
    }
    // Obtiene las notificaciones no leídas de un usuario, opcionalmente por id
    async findUnreadById(id_perfil_receptor) {
        return await this.notificacionesModel.findAll({
            where: { id_perfil_receptor, leida: false },
            include: [
                {
                    model: this.perfiles,
                    as: 'id_perfil_emisor_perfile',
                    attributes: ['nombre', 'foto']
                },
                {
                    model: this.publicaciones,
                    as: 'id_publicacion_publicacione',                    
                    attributes: ['id_publicacion', 'descripcion', 'imagen']
                }
            ],
            order: [['fecha_creacion', 'DESC']],
            raw: true,
            nest: true
        });
    }
}
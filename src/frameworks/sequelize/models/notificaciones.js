import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class notificaciones extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_notificacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_perfil_receptor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'perfiles',
        key: 'id_perfil'
      }
    },
    id_perfil_emisor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'perfiles',
        key: 'id_perfil'
      }
    },
    id_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'publicaciones',
        key: 'id_publicacion'
      }
    },
    leida: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'notificaciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_notificacion" },
        ]
      },
      {
        name: "fk_perfil_destinatario",
        using: "BTREE",
        fields: [
          { name: "id_perfil_receptor" },
        ]
      },
      {
        name: "fk_perfil_autor",
        using: "BTREE",
        fields: [
          { name: "id_perfil_emisor" },
        ]
      },
      {
        name: "fk_pub_comentada",
        using: "BTREE",
        fields: [
          { name: "id_publicacion" },
        ]
      },
    ]
  });
  }
}

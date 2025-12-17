import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class compartido extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'publicaciones',
        key: 'id_publicacion'
      }
    },
    id_destinatario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'perfiles',
        key: 'id_perfil'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'compartido',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_destinatario" },
          { name: "id_publicacion" },
        ]
      },
      {
        name: "compartido_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "id_publicacion" },
        ]
      },
    ]
  });
  }
}

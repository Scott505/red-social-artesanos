import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class publicaciones extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_publicacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_perfil: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'perfiles',
        key: 'id_perfil'
      }
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    imagen: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'publicaciones',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_publicacion" },
        ]
      },
      {
        name: "publicaciones_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "id_perfil" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class comentarios extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_comentario: {
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
    id_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'publicaciones',
        key: 'id_publicacion'
      }
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    sequelize,
    tableName: 'comentarios',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_comentario" },
        ]
      },
      {
        name: "comentarios_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "id_perfil" },
        ]
      },
      {
        name: "comentarios_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "id_publicacion" },
        ]
      },
    ]
  });
  }
}

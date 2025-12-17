import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class album_publicacion extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_album: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'albumnes',
        key: 'id_album'
      }
    },
    id_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'publicaciones',
        key: 'id_publicacion'
      }
    }
  }, {
    sequelize,
    tableName: 'album_publicacion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_album" },
          { name: "id_publicacion" },
        ]
      },
      {
        name: "album_publicacion_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "id_publicacion" },
        ]
      },
    ]
  });
  }
}

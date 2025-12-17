import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class albumnes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_album: {
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
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'albumnes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_album" },
        ]
      },
      {
        name: "albumnes_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "id_perfil" },
        ]
      },
    ]
  });
  }
}

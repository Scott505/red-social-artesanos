import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class seguidores extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_seguidor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'perfiles',
        key: 'id_perfil'
      }
    },
    id_seguido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'perfiles',
        key: 'id_perfil'
      }
    },
    aceptado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'seguidores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_seguido" },
          { name: "id_seguidor" },
        ]
      },
      {
        name: "seguidores_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "id_seguidor" },
        ]
      },
    ]
  });
  }
}

import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class etiquetas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_interes: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'etiquetas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_interes" },
        ]
      },
    ]
  });
  }
}

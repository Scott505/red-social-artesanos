import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class perfiles_etiquetas extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_interes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'etiquetas',
        key: 'id_interes'
      }
    },
    id_perfil: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'perfiles',
        key: 'id_perfil'
      }
    }
  }, {
    sequelize,
    tableName: 'perfiles_etiquetas',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_interes" },
          { name: "id_perfil" },
        ]
      },
      {
        name: "perfiles_interes_ibfk_2",
        using: "BTREE",
        fields: [
          { name: "id_perfil" },
        ]
      },
    ]
  });
  }
}

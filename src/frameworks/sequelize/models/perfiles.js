import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class perfiles extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id_perfil: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id_usuario'
      }
    },
    foto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    experiencia: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'perfiles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_perfil" },
        ]
      },
      {
        name: "perfiles_ibfk_1",
        using: "BTREE",
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
  }
}

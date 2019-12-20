/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    apellidos: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    alias: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: true
    },
    contrasena: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    activo: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    rol_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '2',
      references: {
        model: 'rols',
        key: 'id'
      }
    }
  }, {
    tableName: 'usuarios'
  });
};

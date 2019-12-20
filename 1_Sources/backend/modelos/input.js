/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('input', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hora: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    users_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    rutas_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'input'
  });
};

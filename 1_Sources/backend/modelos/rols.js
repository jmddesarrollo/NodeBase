/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rols', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'rols'
  });
};

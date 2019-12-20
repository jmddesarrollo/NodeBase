/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aviso', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    aviso: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    desactivado: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'aviso'
  });
};

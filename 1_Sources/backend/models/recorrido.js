/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Recorrido = sequelize.define('recorrido', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'recorrido',
        timestamps: false
    });

    Recorrido.associate = function(models) {
        Recorrido.hasMany(models.rutas, { foreignKey: 'recorrido_id' });
    };

    return Recorrido;
};
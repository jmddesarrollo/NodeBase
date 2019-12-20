/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Dificultad = sequelize.define('dificultad', {
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
        tableName: 'dificultad',
        timestamps: false
    });

    Dificultad.associate = function(models) {
        Dificultad.hasMany(models.rutas, { foreignKey: 'dificultad_id' });
    };

    return Dificultad;
};
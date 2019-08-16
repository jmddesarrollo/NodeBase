/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Rols = sequelize.define('rols', {
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
        tableName: 'rols',
        timestamps: false
    });

    Rols.associate = function(models) {
        Rols.hasMany(models.usuarios, { foreignKey: 'rol_id' });
    };

    return Rols;
};
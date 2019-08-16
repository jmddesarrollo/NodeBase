/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Entradas = sequelize.define('entradas', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        hora: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
        usuario_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        }
    }, {
        tableName: 'entradas',
        timestamps: false
    });

    Entradas.associate = function(models) {
        Entradas.belongsTo(models.usuarios, { foreignKey: 'usuario_id' });
    }

    return Entradas;
};
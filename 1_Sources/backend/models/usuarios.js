/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Usuarios = sequelize.define('usuarios', {
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
            type: DataTypes.STRING(100),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(60),
            allowNull: false,
            unique: true
        },
        alias: {
            type: DataTypes.STRING(45),
            allowNull: false
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
            type: DataTypes.INTEGER(10),
            allowNull: false
        }
    }, {
        tableName: 'usuarios',
        timestamps: false
    });

    Usuarios.associate = function(models) {
        Usuarios.hasMany(models.entradas, { foreignKey: 'usuario_id' });
        Usuarios.belongsTo(models.rols, { foreignKey: 'rol_id' });
    }

    return Usuarios;
};
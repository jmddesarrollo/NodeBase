/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
    var Ruta = sequelize.define('rutas', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lugar: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        distancia: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        duracion: {
            type: DataTypes.STRING(5),
            allowNull: false
        },
        altitud_max: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        altitud_min: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        desnivel_subida: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        desnivel_bajada: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        senalizacion: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        ibp: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        opcional: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        enlace_tiempo: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        enlace_ruta: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        enlace_apuntarse: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        precio_no_socio: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        precio_socio: {
            type: DataTypes.DECIMAL,
            allowNull: true
        },
        telefono_contacto: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        ultimo_dia_apuntarse: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        ultima_hora_apuntarse: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
        publica: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            defaultValue: '1'
        },
        recorrido_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        dificultad_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'rutas',
        timestamps: false
    });

    Ruta.associate = function(models) {
        Ruta.belongsTo(models.dificultad, { foreignKey: 'dificultad_id' });
    };

    return Ruta;
};
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
        altitudMax: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: "altitud_max"
        },
        altitudMin: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: "altitud_min"
        },
        desnivelSubida: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: "desnivel_subida"
        },
        desnivelBajada: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            field: "desnivel_bajada"
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
        enlaceTiempo: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: "enlace_tiempo"
        },
        enlaceRuta: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: "enlace_ruta"
        },
        enlaceApuntarse: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: "enlace_apuntarse"
        },
        precioNoSocio: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: "precio_no_socio"
        },
        precioSocio: {
            type: DataTypes.DECIMAL,
            allowNull: true,
            field: "precio_socio"
        },
        telefonoContacto: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: "telefono_contacto"
        },
        ultimoDiaApuntarse: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: "ultimo_dia_apuntarse"
        },
        ultimaHoraApuntarse: {
            type: DataTypes.STRING(5),
            allowNull: true,
            field: "ultima_hora_apuntarse"
        },
        publica: {
            type: DataTypes.INTEGER(4),
            allowNull: true,
            defaultValue: '1'
        },
        recorridoId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: "recorrido_id"
        },
        dificultadId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            field: "dificultad_id"
        }
    }, {
        tableName: 'rutas',
        timestamps: false
    });

    Ruta.associate = function(models) {
        Ruta.belongsTo(models.dificultad, { foreignKey: 'dificultad_id' });
        Ruta.belongsTo(models.recorrido, { foreignKey: 'recorrido_id' });
    };

    return Ruta;
};
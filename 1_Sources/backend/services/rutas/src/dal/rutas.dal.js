"use strict";

var db = require("../../../../models");
const Rutas = db.rutas;
const Dificultad = db.dificultad;

var ControlException = require("../../../../utils/ControlException");

/*
 * Consultar todas las rutas.
 */
function getRutas() {
    const rutas = Rutas.findAll({
        include: [{
            model: Dificultad
        }]
    }).catch(error => {
        throw new ControlException(
            "Ha ocurrido un error al consultar las rutas.",
            500
        );
    });

    return rutas;
}

/**
 * Recoger datos de una ruta
 */
async function getRuta(id) {
    const ruta = await Rutas.findOne({
        where: { id: id },
        include: [{
            model: Dificultad
        }]
    }).catch(error => {
        throw new ControlException(
            "Ha ocurrido un error al consultar la ruta solicitada.",
            500
        );
    });
    ruta.dificultad_id = undefined;

    return ruta;
}

/*
 * Añadir nueva ruta
 */
function addRuta(ruta, t) {
    try {
        const rutaAdd = Rutas.create({
            id: null,
            titulo: ruta.titulo,
            lugar: ruta.lugar,
            fecha: ruta.fecha,
            distancia: ruta.distancia,
            duracion: ruta.duracion,
            altitud_max: ruta.altitud_max,
            altitud_min: ruta.altitud_min,
            desnivel_subida: ruta.desnivel_subida,
            desnivel_bajada: ruta.desnivel_bajada,
            senalizacion: ruta.senalizacion,
            ibp: ruta.ibp,
            descripcion: ruta.descripcion,
            opcional: ruta.opcional,
            enlace_tiempo: ruta.enlace_tiempo,
            enlace_ruta: ruta.enlace_ruta,
            enlace_apuntarse: ruta.enlace_apuntarse,
            precio_no_socio: ruta.precio_no_socio,
            precio_socio: ruta.precio_socio,
            telefono_contacto: ruta.telefono_contacto,
            ultimo_dia_apuntarse: ruta.ultimo_dia_apuntarse,
            ultima_hora_apuntarse: ruta.ultima_hora_apuntarse,
            publica: ruta.publica,
            recorrido_id: ruta.recorrido_id,
            dificultad_id: ruta.dificultad_id
        }, { transaction: t }).catch(error => {
            throw new ControlException(
                "Revisar los datos introducidos. Se ha producido un error al añadir una nueva ruta.",
                500
            );
        });

        return rutaAdd;
    } catch (error) {
        throw new ControlException(
            "Revisar los datos introducidos. Se ha producido un error al añadir una nueva ruta.",
            500
        );
    }
}

/*
 * Editar una ruta
 */
function updRuta(ruta, t) {
    const rutaUpd = ruta.save({ transaction: t }).catch(error => {
        throw new ControlException(
            "Revisar datos introduciods. Se ha producido un error al editar la ruta.",
            500
        );
    });

    return rutaUpd;
}

/*
 * Eliminar una ruta
 */
async function delRuta(id, t) {
    try {
        Rutas.destroy({ where: { id: id } }, { transaction: t })
            .catch(function(error) {
                throw new ControlException("Error al eliminar la ruta.", 500);
            });

        return true;
    } catch (error) {
        throw new ControlException("Error al eliminar la ruta.", 500);
    }
}

module.exports = {
    getRutas,
    getRuta,
    addRuta,
    updRuta,
    delRuta
};
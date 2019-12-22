"use strict";

var db = require("../../../../models");
const Rutas = db.rutas;
const Dificultad = db.dificultad;
const Recorrido = db.recorrido;

var ControlException = require("../../../../utils/ControlException");

/*
 * Consultar todas las rutas.
 */
function getRutas() {
    const rutas = Rutas.findAll({
        include: [{
            model: Dificultad
        }],
        include: [{
            model: Recorrido
        }]
    }).catch(error => {
        throw new ControlException(
            "Ha ocurrido un error al consultar las rutas.",
            500
        );
    });

    return rutas;
}

/*
 * Consultar de las rutas públicas.
 */
function getRutasPublicas() {
    const rutas = Rutas.findAll({
        where: {
            publica: 1
        },
        include: [{
            model: Dificultad
        }],
        include: [{
            model: Recorrido
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
    if (!id) {
        throw new ControlException("La ruta a consultar no ha sido informada.", 500);
    }

    const ruta = await Rutas.findOne({
        where: { id: id },
        include: [{ model: Dificultad }, { model: Recorrido }]
    }).catch(error => {
        throw new ControlException("Ha ocurrido un error al consultar la ruta solicitada.", 500);
    });

    if (!ruta) {
        throw new ControlException("La ruta a consultar no ha sido encontrada.", 500);
    } else {
        ruta.dificultad_id = undefined;
        ruta.recorrido_id = undefined;
    }

    return ruta;
}

/*
 * Añadir nueva ruta
 */
function addRuta(ruta, t) {
    try {
        const rutaAdd = Rutas.create(ruta, { transaction: t }).catch(error => {
            throw new ControlException(
                "Revisar los datos introducidos. Se ha producido un error al añadir una nueva ruta.", 500
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
function updRuta(rutas, t) {
    const rutaUpd = rutas.save({ transaction: t }).catch(error => {
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
    getRutasPublicas,
    getRuta,
    addRuta,
    updRuta,
    delRuta
};
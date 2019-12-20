"use strict";

// CRUD de entidades
var RutasDAL = require("../dal/rutas.dal");

var ControlException = require("../../../../utils/ControlException");

/*
 * Consultar todas las rutas.
 */
async function getRutas() {
    const rutas = await RutasDAL.getRutas();

    return rutas;
}

/**
 * Recoger datos de una ruta
 */
async function getRuta(id) {
    const ruta = await RutasDAL.getRuta(id);

    return ruta;
}

/*
 * Añadir nuevo usuario
 */
async function addRuta(eRuta, t) {
    const rutaAdd = await RutasDAL.updRuta(eRuta, t);

    return rutaAdd;
}

/*
 * Editar una ruta
 */
async function updRuta(eRuta, t) {
    const ruta = await RutasDAL.getRuta(eRuta.id);

    if (!ruta) {
        throw new ControlException("La ruta no ha sido encontrada.", 500);
    }

    const rutaEdit = await RutasDAL.updRuta(eRuta, t);

    return rutaEdit;
}

/*
 * Eliminación de ruta
 */
async function delRuta(id, t) {
    const ruta = await RutasDAL.getRuta(id);

    if (!ruta) {
        throw new ControlException("La ruta no ha sido encontrada.", 500);
    }

    await RutasDAL.delRuta(id, t);

    return true;
}

module.exports = {
    getRutas,
    getRuta,
    addRuta,
    updRuta,
    delRuta
};
"use strict";

var db = require("../../../../models");
const Recorrido = db.recorrido;

var ControlException = require("../../../../utils/ControlException");

/*
 * Consultar todas los recorridos.
 */
function getRecorridos() {
    const recorridos = Recorrido.findAll().catch(error => {
        throw new ControlException(
            "Ha ocurrido un error al consultar los recorridos.",
            500
        );
    });

    return recorridos;
}


module.exports = {
    getRecorridos
};
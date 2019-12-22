"use strict";

var db = require("../../../../models");
const Dificultad = db.dificultad;

var ControlException = require("../../../../utils/ControlException");

/*
 * Consultar todas los recorridos.
 */
function getDificultades() {
    const dificultades = Dificultad.findAll().catch(error => {
        throw new ControlException(
            "Ha ocurrido un error al consultar las dificultades.",
            500
        );
    });

    return dificultades;
}


module.exports = {
    getDificultades
};
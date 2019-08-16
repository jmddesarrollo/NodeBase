'use strict'

var db = require("../../../../models");
var Rols = db.rols;

var ControlException = require('../../../../utils/ControlException');

/*
 * Consultar todas los rols.
 */
function getRols() {

    let rols = Rols.findAll()
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar los rols.', 500);
        });

    return rols;
}

/**
 * Recoger datos de un rol
 */
function getRol(id) {

    let rol = Rols.findOne({ where: { id: id } })
        .catch(error => {
            console.log(error);
            throw new ControlException('Ha ocurrido un error al consultar el rol solicitado.', 500);
        });

    return rol;
}

/*
 * Añadir nueva rol
 */
function addRol(rol, t) {
    const rolCreate = Rols.create({
            nombre: rol.nombre
        }, { transaction: t })
        .catch(error => {
            console.log(error);
            throw new ControlException('Revisar los datos introduciods. Se ha producido un error al añadir un nuevo rol.', 500);
        });

    return rolCreate;
}

/*
 * Editar un rol
 */
function updRol(rol, t) {
    const rolUpd = rol.save({ transaction: t })
        .catch(error => {
            console.log(error);
            throw new ControlException('Revisar datos introduciods. Se ha producido un error al editar el rol.', 500);
        });

    return rolUpd;
}

/*
 * Eliminar un rol
 */
async function delRol(id, t) {
    let rolDel = Rols.destroy({ where: { id: id } }, { transaction: t })
        .catch(function(error) {
            console.log(error);
            throw new ControlException('Error al eliminar el rol.', 500);
        });

    return rolDel;
}

module.exports = {
    getRols,
    getRol,
    addRol,
    updRol,
    delRol
}
'use strict'

// CRUD de entidades
var RolsDAL = require('../dal/rols.dal');

var ControlException = require('../../../../utils/ControlException');

/**
 * Consultar todos los rols
 */
async function getRols() {
    let rols = await RolsDAL.getRols();

    return rols;
}

/**
 * Consultar un rol
 */
async function getRol(id) {
    console.log('Vamos por el rol2');
    let rol = await RolsDAL.getRol(id);

    return rol;
}

/**
 * Crear un nuevo rol
 */
async function addRol(rol, t) {
    let rolAdd = await RolsDAL.addRol(rol);

    return rolAdd;
}

/**
 * Actualización de un rol. 
 */
async function updRol(eRol, t) {
    let rol = await RolsDAL.getRol(eRol.id);

    if (!rol) { throw new ControlException('No ha sido encontrado el rol a actualizar.', 500); }

    rol.nombre = eRol.nombre;

    let rolUpd = await RolsDAL.updRol(rol, t);

    return rolUpd;
}

/**
 * Actualización de un rol. 
 */
async function delRol(id, t) {
    let rol = await RolsDAL.getRol(id);

    if (!rol) { throw new ControlException('No ha sido encontrado el rol a eliminar.', 500); }

    let rolDel = await RolsDAL.delRol(id, t);

    return rolDel;
}

module.exports = {
    getRols,
    getRol,
    addRol,
    updRol,
    delRol
}
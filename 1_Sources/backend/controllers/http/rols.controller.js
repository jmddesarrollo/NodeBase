'use strict'
var Sequelize = require('../../models/index').sequelize;

// Servicios
var RolsService = require('../../services/rols');

var ControlException = require('../../utils/ControlException');

/*
 * Consultar todos los rols
 */
async function getRols(req, res) {
    try {
        let rols = await RolsService.getRols();

        res.status(200).send({ status: 'success', data: rols });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Consultar datos de un rol
 */
async function getRol(req, res) {
    const id = req.params.id;

    try {
        let rol = await RolsService.getRol(id);

        res.status(200).send({ status: 'success', data: rol });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Añadir un nuevo rol
 */
async function addRol(req, res) {
    const body = req.body;

    const rolAdd = {
        id: null,
        nombre: body.nombre,
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let rol = await RolsService.addRol(rolAdd, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: rol });
    } catch (error) {
        await t.rollback();

        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Editar un rol
 */
async function updRol(req, res) {
    const id = req.params.id;
    const body = req.body;

    const rolUpd = {
        id: id,
        nombre: body.nombre
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let rol = await RolsService.updRol(rolUpd, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: rol });
    } catch (error) {
        await t.rollback();

        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Eliminar un rol
 */
async function delRol(req, res) {
    const id = req.params.id;

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let rol = await RolsService.delRol(id, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: rol });
    } catch (error) {
        await t.rollback();

        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

module.exports = {
    getRols,
    getRol,
    addRol,
    updRol,
    delRol
}
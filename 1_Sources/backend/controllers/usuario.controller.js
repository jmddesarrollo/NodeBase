'use strict'
var Sequelize = require('../models/index').sequelize;

// Servicios
var UsuariosService = require('../services/usuarios');
var RolsService = require('../services/rols');

var ControlException = require('../utils/ControlException');

/*
 * Consultar todos los usuarios.
 */
async function getUsuarios(req, res) {
    try {
        const usuarios = await UsuariosService.getAllUsuarios();

        res.status(200).send({ status: 'success', data: usuarios, mensaje: "Consulta de usuarios realizada correctamente." });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Consultar todos los usuarios.
 */
async function getUsuariosLimit(req, res) {
    const desde = req.params.desde;
    const limit = req.params.limit;

    try {
        const usuarios = await UsuariosService.getAllUsuariosLimit(desde, limit);

        res.status(200).send({ status: 'success', data: usuarios, mensaje: "Consulta de usuarios realizada correctamente." });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Consultar datos de un usuario
 */
async function getUsuario(req, res) {
    const id = req.params.id;

    try {
        const usuario = await UsuariosService.getUsuario(id);
        const rol = await RolsService.getRol(usuario.rol_id);

        res.status(200).send({ status: 'success', usuario, rol, mensaje: "Consulta de usuario realizada correctamente." });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Añadir un nuevo usuario
 */
async function addUsuario(req, res) {
    const body = req.body;

    const nuevoUsuario = {
        id: null,
        email: body.email,
        nombre: body.nombre,
        apellidos: body.apellidos,
        alias: body.alias,
        contrasena: body.password,
        imagen: null,
        rol_id: body.rolid,
        activo: 1
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let rol = await RolsService.getRol(nuevoUsuario.rol_id);
        let usuario = await UsuariosService.addUsuario(nuevoUsuario, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: usuario, aux: rol, mensaje: "Alta de usuario realizada correctamente." });
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
 * Editar un usuario
 */
async function updUsuario(req, res) {
    const id = req.params.id;
    const body = req.body;

    const editUsuario = {
        id: id,
        email: body.email,
        nombre: body.nombre,
        apellidos: body.apellidos,
        alias: body.alias,
        rol_id: body.rol_id,
        activo: body.activo
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        const usuario = await UsuariosService.updUsuario(editUsuario, t);
        const rol = await RolsService.getRol(editUsuario.rol_id);

        await t.commit();

        res.status(200).send({ status: 'success', usuario, rol, mensaje: "Edición de usuario realizada correctamente." });
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
 * Editar contraseñan de un usuario
 */
async function updPasswordUsuario(req, res) {
    const id = req.params.id;
    const body = req.body;

    const editUsuario = {
        id: id,
        contrasena: body.password
    };

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        let usuario = await UsuariosService.updPasswordUsuario(editUsuario, t);
        await t.commit();

        res.status(200).send({ status: 'success', data: usuario, mensaje: "Edición de contraseña realizada correctamente." });
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
 * Eliminar un usuario
 */
async function delUsuario(req, res) {
    const id = req.params.id;

    // Iniciar transacción
    let t = await Sequelize.transaction();

    try {
        await UsuariosService.delUsuario(id, t);
        await t.commit();

        res.status(200).send({ status: 'success', mensaje: "Eliminación de usuario realizada correctamente." });
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
    getUsuarios,
    getUsuariosLimit,
    getUsuario,
    addUsuario,
    updUsuario,
    updPasswordUsuario,
    delUsuario
}
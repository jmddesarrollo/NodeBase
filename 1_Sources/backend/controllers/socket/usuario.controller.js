'use strict'

const ControlException = require('../../utils/ControlException');

// Servicios
const UsuariosListaService = require('../../services/lista-usuarios.service');
const UsuariosService = require('../../services/usuarios');
const RolsService = require('../../services/rols');

const DownLoadService = require('../../services/download.service');

const sequelize = require('../../models').sequelize;

/**
 * Informar a Servidor vía Socket de la conexión de un nuevo usuario logueado
 */
function configurarUsuario(req, cliente) {
    const email = req.email;

    UsuariosListaService.actualizarEmail(cliente.id, email);

    cliente.emit("usuario/configurar", { mensaje: 'Configurado correctamente', data: req.email });
}

/**
 * Informar a Servidor vía Socket del deslogueo de un usuario
 */
function desconfigurarUsuario(cliente) {
    UsuariosListaService.actualizarEmail(cliente.id);

    cliente.emit("usuario/desconfigurar", { mensaje: 'Desconfigurado correctamente' });
}

/**
 * Reconexión de un usuario que cerró navegador pero sigue logueado por su localstorage
 */
async function actualizarEmailWS(req, cliente) {
    const id = req.id;

    const usuario = await UsuariosService.getUsuario(id);

    if (usuario) {
        UsuariosListaService.actualizarEmail(cliente.id, usuario.email);
    }
}

/*
 * Añadir un nuevo usuario
 */
async function crearUsuario(req, cliente) {
    const eUsuario = req.usuario;

    // Iniciar transacción
    let t = await sequelize.transaction();

    try {
        let usuario = await UsuariosService.addUsuario(eUsuario, t);
        let rol = await RolsService.getRol(usuario.rol_id);
        await t.commit();

        cliente.emit('usuario/crear', { mensaje: "Se ha añadido correctamente el usuario ", usuario, rol });
        cliente.broadcast.emit('usuario/crear', { usuario, rol });
    } catch (error) {
        await t.rollback();
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

/*
 * Consultar un usuario
 */
async function consultarUsuario(req, cliente) {
    const eUsuario = req.usuario;

    try {
        const usuario = await UsuariosService.getUsuario(eUsuario.id);

        cliente.emit('usuario/consultar', { usuario: usuario });
        cliente.broadcast.emit('usuario/consultar', { usuario: usuario });
    } catch (error) {
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

/*
 * Editar un nuevo usuario
 */
async function actualizarUsuario(req, cliente) {
    const eUsuario = req.usuario;

    // Iniciar transacción
    let t = await sequelize.transaction();

    try {
        const usuario = await UsuariosService.updUsuario(eUsuario, t);
        const rol = await RolsService.getRol(usuario.rol_id);

        await t.commit();

        cliente.emit('usuario/actualizar', { mensaje: "Se ha editado correctamente el usuario ", usuario, rol });
        cliente.broadcast.emit('usuario/actualizar', { usuario, rol });
    } catch (error) {
        await t.rollback();
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

/*
 * Eliminar un usuario
 */
async function eliminarUsuario(req, cliente) {
    const eUsuario = req.usuario;

    // Iniciar transacción
    let t = await sequelize.transaction();

    try {
        await UsuariosService.delUsuario(eUsuario.id, t);
        await t.commit();

        cliente.emit('usuario/eliminar', { mensaje: "El usuario ha sido eliminado correctamente", usuario: eUsuario });
        cliente.broadcast.emit('usuario/eliminar', { usuario: eUsuario });
    } catch (error) {
        await t.rollback();
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

async function quitarImagenUsuario(req, cliente) {
    const eUsuario = req.usuario;

    let t = await sequelize.transaction();
    try {
        const usuario = await UsuariosService.getUsuario(eUsuario.id);

        await UsuariosService.updImagenUsuario(usuario.id, null);

        // Quitar imagen
        const tipo = 'usuarios';
        DownLoadService.eliminarArchivo(usuario.imagen, tipo);
        usuario.imagen = null;

        // Iniciar transacción
        await t.commit();

        cliente.emit('usuario/consultar', { usuario: usuario });
        cliente.broadcast.emit('usuario/consultar', { usuario: usuario });
    } catch (error) {
        await t.rollback();
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

module.exports = {
    configurarUsuario,
    desconfigurarUsuario,
    actualizarEmailWS,
    crearUsuario,
    consultarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    quitarImagenUsuario
};
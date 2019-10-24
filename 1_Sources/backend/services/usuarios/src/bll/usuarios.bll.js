"use strict";

// Servicios
var RolsService = require('../../../../services/rols');

// CRUD de entidades
var UsuariosDAL = require("../dal/usuarios.dal");
var Rols = require("../../../../models/rols");

var db = require("../../../../models");
var Usuarios = db.usuarios;
var Rol = db.rols;

// Encriptación de password
const bcrypt = require("bcrypt");
const saltRounds = 10;

var ControlException = require("../../../../utils/ControlException");

/*
 * Consultar todos los empleados.
 */
async function getUsuarios() {
    let usuarios = await UsuariosDAL.getUsuarios();

    return usuarios;
}

/**
 * Recoger datos de un usuario por el email
 */
function getUsuarioByEmail(email) {
    const usuario = UsuariosDAL.getUsuarioByEmail(email);

    return usuario;
}

/**
 * Recoger datos de un usuario
 */
async function getUsuario(id) {
    let usuario = await UsuariosDAL.getUsuario(id);

    if (usuario) {
        usuario.contrasena = undefined;
        return usuario;
    } else {
        throw new ControlException("El usuario no ha sido encontrado.", 404);
    }
}

/*
 * Añadir nuevo usuario
 */
async function addUsuario(eUsuario, t) {
    const usuarioEmail = await UsuariosDAL.getUsuarioByEmail(eUsuario.email);

    if (usuarioEmail) {
        throw new ControlException(
            "El email introducido ya se encuentra dado de alta.",
            409
        );
    }

    const usuarioAlias = await UsuariosDAL.getUsuarioByAlias(eUsuario.alias);

    if (usuarioAlias) {
        throw new ControlException(
            "El alias introducido ya se encuentra dado de alta.",
            409
        );
    }

    const rol = await RolsService.getRol(eUsuario.rol_id);
    if (!rol) {
        throw new ControlException(
            "El rol asociado al usuario no se encuentra.",
            404
        );
    }

    eUsuario.contrasena = bcrypt.hashSync(eUsuario.contrasena, saltRounds);
    let usuarioAdd = await UsuariosDAL.addUsuario(eUsuario, t);

    // No mostrar la password en la salida de la petición.
    usuarioAdd.contrasena = undefined;

    return usuarioAdd;
}

/*
 * Editar un usuario
 */
async function updUsuario(editUsuario, t) {
    let usuario = await UsuariosDAL.getUsuario(editUsuario.id);

    if (!usuario) {
        throw new ControlException("El usuario no ha sido encontrado.", 500);
    }

    if (usuario.email !== editUsuario.email) {
        const usuarioEmail = await UsuariosDAL.getUsuarioByEmail(editUsuario.email);

        if (usuarioEmail) {
            throw new ControlException(
                "El email introducido ya se encuentra dado de alta.",
                409
            );
        }
    }

    if (usuario.alias !== editUsuario.alias) {
        const usuarioAlias = await UsuariosDAL.getUsuarioByAlias(editUsuario.alias);

        if (usuarioAlias) {
            throw new ControlException(
                "El alias introducido ya se encuentra dado de alta.",
                409
            );
        }
    }

    usuario.nombre = editUsuario.nombre;
    usuario.apellidos = editUsuario.apellidos;
    usuario.email = editUsuario.email;
    usuario.alias = editUsuario.alias;
    usuario.activo = editUsuario.activo;
    usuario.rol_id = editUsuario.rol_id;

    const usuarioEdit = await UsuariosDAL.updUsuario(usuario, t);

    // No mostrar la password en la salida de la petición.
    usuarioEdit.contrasena = undefined;

    return usuarioEdit;
}

/*
 * Editar contraseña de un usuario
 */
async function updPasswordUsuario(editUsuario, t) {
    let usuario = await UsuariosDAL.getUsuario(editUsuario.id);

    if (!usuario) {
        throw new ControlException("El usuario no ha sido encontrado.", 500);
    }

    usuario.contrasena = bcrypt.hashSync(editUsuario.contrasena, saltRounds);

    const usuarioEdit = await UsuariosDAL.updUsuario(usuario, t);

    // No mostrar la password en la salida de la petición.
    usuarioEdit.contrasena = undefined;

    return usuarioEdit;
}

/*
 * Editar imagen de un usuario
 */
async function updImagenUsuario(id, nombreImg) {
    let usuario = await UsuariosDAL.getUsuario(id);

    if (!usuario) {
        throw new ControlException("El usuario no ha sido encontrado.", 500);
    }

    const imgAntigua = usuario.imagen;

    usuario.imagen = nombreImg;

    await UsuariosDAL.updUsuario(usuario);

    return imgAntigua;
}

/*
 * Eliminación de usuario
 */
async function delUsuario(id, t) {
    const usuario = await UsuariosDAL.getUsuario(id);

    if (!usuario) {
        throw new ControlException("El usuario no ha sido encontrado.", 500);
    }

    await UsuariosDAL.delUsuario(id);

    return true;
}

/**
 * Recoger todos los usuarios con sus rols.
 */
async function getAllUsuarios() {
    const usuarios = await Usuarios.findAll({
        attributes: [
            "id",
            "nombre",
            "apellidos",
            "alias",
            "email",
            "imagen",
            "activo"
        ],
        include: [{
            model: Rol
        }]
    });

    if (usuarios) {
        return usuarios;
    } else {
        throw new ControlException(
            "Ha ocurrido un error al recuperar información de los usuarios.",
            500
        );
    }
}

/**
 * Recoger datos de un usuario desde un registro hasta otro indicado
 */
async function getAllUsuariosLimit(desde, limit) {
    const desdeInt = parseInt(desde);
    const limitInt = parseInt(limit);

    const usuarios = await Usuarios.findAndCountAll({
        attributes: [
            "id",
            "nombre",
            "apellidos",
            "alias",
            "email",
            "imagen",
            "activo"
        ],
        offset: desdeInt,
        limit: limitInt,
        include: [{
            model: Rol
        }]
    });

    if (usuarios) {
        return usuarios;
    } else {
        throw new ControlException(
            "Ha ocurrido un error al recuperar información de los usuarios.",
            500
        );
    }
}

module.exports = {
    getUsuarios,
    getAllUsuariosLimit,
    getUsuario,
    getUsuarioByEmail,
    addUsuario,
    updUsuario,
    updPasswordUsuario,
    updImagenUsuario,
    delUsuario,
    getAllUsuarios
};
"use strict";

var db = require("../../../../models");
var Usuarios = db.usuarios;

var ControlException = require("../../../../utils/ControlException");

/*
 * Consultar todas los usuarios.
 */
function getUsuarios() {
    let usuarios = Usuarios.findAll({
        attributes: [
            "id",
            "nombre",
            "apellidos",
            "email",
            "alias",
            "imagen",
            "activo"
        ]
    }, {
        order: [
            ["apellidos", "ASC"],
            ["nombre", "ASC"]
        ]
    }).catch(error => {
        console.log(error);
        throw new ControlException(
            "Ha ocurrido un error al consultar los usuarios.",
            500
        );
    });

    return usuarios;
}

/**
 * Recoger datos de un usuario
 */
function getUsuario(id) {
    let usuario = Usuarios.findOne({ where: { id: id } }).catch(error => {
        console.log(error);
        throw new ControlException(
            "Ha ocurrido un error al consultar el usuario solicitado.",
            500
        );
    });

    return usuario;
}

/**
 * Recoger datos de un usuario por el email
 */
function getUsuarioByEmail(email) {
    const usuario = Usuarios.findOne({ where: { email: email } }).catch(error => {
        throw new ControlException("Ha ocurrido un error al consultar el usuario por su email.", 500);
    });

    return usuario;
}

/**
 * Recoger datos de un usuario por el alias
 */
function getUsuarioByAlias(alias) {
    const usuario = Usuarios.findOne({ where: { alias: alias } }).catch(error => {
        throw new ControlException("Ha ocurrido un error al consultar el usuario por su alias.", 500);
    });

    return usuario;
}

/*
 * Añadir nuevo usuario
 */
function addUsuario(usuario, t) {
    try {
        const usuarioAdd = Usuarios.create({
            id: null,
            nombre: usuario.nombre,
            apellidos: usuario.apellidos,
            email: usuario.email.toLowerCase(),
            alias: usuario.alias,
            contrasena: usuario.contrasena,
            imagen: usuario.imagen,
            activo: usuario.activo,
            rol_id: usuario.rol_id
        }, { transaction: t }).catch(error => {
            console.log(error);
            throw new ControlException(
                "Revisar los datos introducidos. Se ha producido un error al añadir un nuevo usuario.",
                500
            );
        });

        return usuarioAdd;
    } catch (error) {
        console.log(error);
        throw new ControlException(
            "Revisar los datos introducidos. Se ha producido un error al añadir un nuevo usuario.",
            500
        );
    }
}

/*
 * Editar un usuario
 */
function updUsuario(usuario, t) {
    const usuarioUpd = usuario.save({ transaction: t }).catch(error => {
        console.log(error);
        throw new ControlException(
            "Revisar datos introduciods. Se ha producido un error al editar el usuario.",
            500
        );
    });

    return usuarioUpd;
}

/*
 * Eliminar un usuario
 */
async function delUsuario(id, t) {
    try {
        Usuarios.destroy({ where: { id: id } }, { transaction: t }).catch(function(
            error
        ) {
            console.log(error);
            throw new ControlException("Error al eliminar el usuario.", 500);
        });

        return true;
    } catch (error) {
        console.log(error);
        throw new ControlException("Error al eliminar el usuario.", 500);
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    getUsuarioByEmail,
    getUsuarioByAlias,
    addUsuario,
    updUsuario,
    delUsuario
};
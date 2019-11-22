'use strict'

var db = require("../models");
var UsuariosService = require('./usuarios');

// Encriptación de password
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');

var ControlException = require('../utils/ControlException');

/*
 * Login del usuario para autentificación.
 */
async function loginUser(usuarioLogin) {
    let usuario = await UsuariosService.getUsuarioByEmail(usuarioLogin.email);

    // Verificar usuario
    if (!usuario) {
        throw new ControlException('El usuario no está registrado', 500);
    }

    if (!usuario.activo) {
        throw new ControlException('El usuario está inactivo', 500);
    }

    if (usuarioLogin.contrasena === undefined) {
        throw new ControlException('La contraseña debe venir informada.', 500);
    }

    // Verificar la contraseña
    if (!bcrypt.compareSync(usuarioLogin.contrasena, usuario.contrasena)) {
        throw new ControlException('Error al confrontar la credencial.', 500);
    }

    // Quitar contraseña de objeto de salida.
    usuario.contrasena = undefined;

    // Crear token: objeto, contraseña secreta general de encriptación, tiempo de expiración en sg. (4h)
    // Las variables de entorno están definidas en el archivo 'config/config.js'.
    var token = jwt.sign({ usuario: usuario }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    let data = new Object;
    data.usuario = usuario;
    data.token = token;

    return data;
}

// =====================================
// Renovar el token
// =====================================
function renovarToken(req) {

    var token = jwt.sign({ usuario: req.usuario }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

    return token;
}

module.exports = {
    loginUser,
    renovarToken
}
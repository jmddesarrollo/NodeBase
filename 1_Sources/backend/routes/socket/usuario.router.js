'use strict';

const UsuarioController = require('../../controllers/socket/usuario.controller');

module.exports = (socket) => {
    socket.on("usuario/configurar", req => { UsuarioController.configurarUsuario(req, socket) });
    socket.on("usuario/desconfigurar", () => { UsuarioController.desconfigurarUsuario(socket) });
    socket.on("usuario/wsEmail", req => { UsuarioController.actualizarEmailWS(req, socket) });

    socket.on("usuario/crear", req => { UsuarioController.crearUsuario(req, socket) });
    socket.on("usuario/actualizar", req => { UsuarioController.actualizarUsuario(req, socket) });
    socket.on("usuario/eliminar", req => { UsuarioController.eliminarUsuario(req, socket) });
};
'use strict';

const RutaController = require('../../controllers/socket/ruta.controller');

module.exports = (socket) => {
    socket.on("ruta/crear", req => { RutaController.crearRuta(req, socket) });
    socket.on("ruta/actualizar", req => { RutaController.actualizarRuta(req, socket) });
    socket.on("ruta/eliminar", req => { RutaController.eliminarRuta(req, socket) });
    socket.on("ruta/consultar", req => { RutaController.consultarRuta(req, socket) });
    socket.on("rutas/consultar", () => { RutaController.consultarRutas(socket) });
};
'use strict';

const RutaController = require('../../controllers/socket/ruta.controller');

module.exports = (socket) => {
    socket.on("ruta/consultar", req => { RutaController.consultarRuta(req, socket) });
    socket.on("rutas/consultar", () => { RutaController.consultarRutas(socket) });
    socket.on("rutas/publicas", () => { RutaController.consultarRutasPublicas(socket) });
    socket.on("ruta/crear", req => { RutaController.crearRuta(req, socket) });
    socket.on("ruta/actualizar", req => { RutaController.actualizarRuta(req, socket) });
    socket.on("ruta/eliminar", req => { RutaController.eliminarRuta(req, socket) });
    socket.on("ruta/dificultades", () => { RutaController.consultarDificultades(socket) });
    socket.on("ruta/recorridos", () => { RutaController.consultarRecorridos(socket) });
    socket.on("rutas/rango", req => { RutaController.consultarRutasRango(req, socket) });
};
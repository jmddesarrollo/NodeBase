'use strict'

const ControlException = require('../../utils/ControlException');

// Servicios
const RutasService = require('../../services/rutas');

const sequelize = require('../../models').sequelize;

/*
 * Añadir una nueva ruta
 */
async function crearRuta(req, cliente) {
    const eRuta = req.ruta;

    // Iniciar transacción
    let t = await sequelize.transaction();

    try {
        let ruta = await RutasService.addRuta(eRuta, t);
        await t.commit();

        cliente.emit('ruta/crear', { mensaje: "Se ha añadido correctamente la ruta ", ruta });
        cliente.broadcast.emit('ruta/crear', { ruta });
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
 * Consultar una ruta
 */
async function consultarRuta(req, cliente) {
    const id = req.id;

    try {
        const ruta = await RutasService.getRuta(id);

        cliente.emit('ruta/consultar', { ruta });
    } catch (error) {
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

/*
 * Consultar todas las rutas
 */
async function consultarRutas(cliente) {
    try {
        const rutas = await RutasService.getRutas();

        cliente.emit('rutas/consultar', { rutas });
    } catch (error) {
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

/*
 * Consultar rutas públicas
 */
async function consultarRutasPublicas(cliente) {
    try {
        const rutas = await RutasService.getRutasPublicas();

        cliente.emit('rutas/consultar', { rutas });
    } catch (error) {
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

/*
 * Editar una ruta
 */
async function actualizarRuta(req, cliente) {
    const eRuta = req.ruta;

    // Iniciar transacción
    let t = await sequelize.transaction();

    try {
        const ruta = await RutasService.updRuta(eRuta, t);

        await t.commit();

        cliente.emit('ruta/actualizar', { mensaje: "Se ha editado correctamente la ruta ", ruta });
        cliente.broadcast.emit('ruta/actualizar', { ruta });
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
 * Eliminar una ruta
 */
async function eliminarRuta(req, cliente) {
    const ruta = req.ruta;

    // Iniciar transacción
    let t = await sequelize.transaction();

    try {
        await RutasService.delRuta(ruta.id, t);
        await t.commit();

        cliente.emit('ruta/eliminar', { mensaje: "La ruta ha sido eliminada correctamente", ruta });
        cliente.broadcast.emit('usuario/eliminar', { ruta });
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
 * Consultar dificultades
 */
async function consultarDificultades(cliente) {
    try {
        const dificultades = await RutasService.getDificultades();

        cliente.emit('ruta/dificultades', { dificultades });
    } catch (error) {
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

/*
 * Consultar recorridos
 */
async function consultarRecorridos(cliente) {
    try {
        const recorridos = await RutasService.getRecorridos();

        cliente.emit('ruta/recorridos', { recorridos });
    } catch (error) {
        if (error instanceof ControlException) {
            cliente.emit("error_message", { message: error.message, code: error.code });
        } else {
            cliente.emit("error_message", { message: "Error no controlado" });
        }
    }
}

module.exports = {
    crearRuta,
    consultarRuta,
    consultarRutas,
    consultarRutasPublicas,
    actualizarRuta,
    eliminarRuta,
    consultarDificultades,
    consultarRecorridos
}
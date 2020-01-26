"use strict";

// CRUD de entidades
const RutasDAL = require("../dal/rutas.dal");
const DificultadDAL = require("../dal/dificultad.dal");
const RecorridoDAL = require("../dal/recorrido.dal");

const ControlException = require("../../../../utils/ControlException");

/*
 * Consultar todas las rutas.
 */
async function getRutas() {
    const rutas = await RutasDAL.getRutas();

    return rutas;
}

/*
 * Consultar todas las rutas.
 */
async function getRutasPublicas() {
    const rutas = await RutasDAL.getRutasPublicas();

    return rutas;
}

/*
 * Consultar todas las rutas entre dos fechas.
 */
async function getRutasRango(fdesde, fhasta) {
    const rutas = await RutasDAL.getRutasRango(fdesde, fhasta);

    return rutas;
}

/**
 * Recoger datos de una ruta
 */
async function getRuta(id) {
    const ruta = await RutasDAL.getRuta(id);

    return ruta;
}

/*
 * Añadir nueva ruta
 */
async function addRuta(eRuta, t) {
    const rutaAdd = await RutasDAL.addRuta(eRuta, t);

    return rutaAdd;
}

/*
 * Editar una ruta
 */
async function updRuta(eRuta, t) {
    var ruta = await RutasDAL.getRuta(eRuta.id);

    if (!ruta) {
        throw new ControlException("La ruta no ha sido encontrada.", 500);
    }

    ruta.titulo = eRuta.titulo;
    ruta.lugar = eRuta.lugar;
    ruta.fecha = eRuta.fecha;
    ruta.distancia = eRuta.distancia;
    ruta.duracion = eRuta.duracion;
    ruta.altitudMax = eRuta.altitudMax;
    ruta.altitudMin = eRuta.altitudMin;
    ruta.desnivelSubida = eRuta.desnivelSubida;
    ruta.desnivelBajada = eRuta.desnivelBajada;
    ruta.senalizacion = eRuta.senalizacion;
    ruta.ibp = eRuta.ibp;
    ruta.descripcion = eRuta.descripcion;
    ruta.opcional = eRuta.opcional;
    ruta.enlaceTiempo = eRuta.enlaceTiempo;
    ruta.enlaceRuta = eRuta.enlaceRuta;
    ruta.enlaceApuntarse = eRuta.enlaceApuntarse;
    ruta.precioNoSocio = eRuta.precioNoSocio;
    ruta.precioSocio = eRuta.precioSocio;
    ruta.telefonoContacto = eRuta.telefonoContacto;
    ruta.ultimoDiaApuntarse = eRuta.ultimoDiaApuntarse;
    ruta.ultimaHoraApuntarse = eRuta.ultimaHoraApuntarse;
    ruta.publica = eRuta.publica;
    ruta.recorridoId = eRuta.recorridoId;
    ruta.dificultadId = eRuta.dificultadId;

    const rutaEdit = await RutasDAL.updRuta(ruta, t);

    return rutaEdit;
}

/*
 * Eliminación de ruta
 */
async function delRuta(id, t) {
    const ruta = await RutasDAL.getRuta(id);

    if (!ruta) {
        throw new ControlException("La ruta no ha sido encontrada.", 500);
    }

    await RutasDAL.delRuta(id, t);

    return true;
}

/*
 * Consultar todas las dificultades.
 */
async function getDificultades() {
    const dificultades = await DificultadDAL.getDificultades();

    return dificultades;
}

/*
 * Consultar todos los recorridos.
 */
async function getRecorridos() {
    const recorridos = await RecorridoDAL.getRecorridos();

    return recorridos;
}

module.exports = {
    getRutas,
    getRutasPublicas,
    getRutasRango,
    getRuta,
    addRuta,
    updRuta,
    delRuta,
    getDificultades,
    getRecorridos
};
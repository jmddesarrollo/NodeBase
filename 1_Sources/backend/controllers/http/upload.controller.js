'use strict'
// Servicios
var UploadService = require('../../services/upload.service');

var ControlException = require('../../utils/ControlException');

/*
 * Subida de archivos
 */
async function putArchivo(req, res) {
    try {
        UploadService.putArchivo(req);

        res.status(200).send({ status: 'success', message: "El archivo ha sido almacenado correctamente." });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Descargar archivos
 */
function getArchivo(req, res) {
    try {
        var tipo = req.body.tipo;
        var nombre_archivo = req.body.archivo;

        var archivoPath = UploadService.getArchivo(tipo, nombre_archivo);

        res.sendFile(archivoPath);
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Descargar imagen del usuario
 */
function getImagenUsuario(req, res) {
    try {
        const imgname = req.params.imgname;

        var tipo = 'usuarios';
        var nombre_archivo = imgname;

        var archivoPath = UploadService.getArchivo(tipo, nombre_archivo);

        res.sendFile(archivoPath);
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

/*
 * Editar imagen de un usuario
 */
async function updImgUsuario(req, res) {
    const id = req.params.id;

    try {
        await UploadService.updImgUsuario(id, req);

        res.status(200).send({ status: 'success', message: "La imagen del usuario ha sido actualizada correctamente." });
    } catch (error) {
        if (error instanceof ControlException) {
            res.status(error.code).send({ status: 'error', message: error.message });
        } else {
            res.status(500).send({ status: 'error', message: 'Error no controlado.' });
        }
    }
}

module.exports = {
    putArchivo,
    getArchivo,
    getImagenUsuario,
    updImgUsuario
}
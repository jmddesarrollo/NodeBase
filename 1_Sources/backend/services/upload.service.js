'use strict'
// Servicios
var UsuarioService = require('../services/usuarios');

var moment = require('moment');

var path = require('path');
var fs = require('fs');

var ControlException = require('../utils/ControlException');

/*
 * Subir archivos.
 */
function putArchivo(req) {
    if (!req.files) {
        throw new ControlException('No se ha encontrado selección de archivos.', 400);
    }

    // Recoger archivo.
    const archivo = req.files.archivo;

    // Recoger nombre y Extensión
    const nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];
    extension = extension.toLowerCase();

    // Restringir extensión permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        throw new ControlException('Error. Las extensiones permitidas son: ' + extensionesValidas.join(', '), 400);
    }

    // Mover el archivo a carpeta del servicor
    archivo.mv(`uploads/archivos/${archivo.name}`, (err) => {
        if (err) {
            console.log(err);
            throw new ControlException('Ha ocurrido un error al guardar el archivo.', 500);
        }
    });

    return true;
}

/*
 * Devolver archivo.
 */
function getArchivo(tipo, nombre) {

    var archivoPath = path.resolve(__dirname, `../uploads/${tipo}/${nombre}`);

    if (!fs.existsSync(archivoPath)) {
        archivoPath = path.resolve(__dirname, '../uploads/no-image.jpg');
    }

    return archivoPath;
}

/*
 * Editar imagen del usuario.
 */
async function updImgUsuario(id, req) {
    if (!req.files) {
        throw new ControlException('No se ha encontrado selección de imagen.', 400);
    }

    // Recoger archivo.
    const archivo = req.files.imagen;

    // Recoger nombre y Extensión
    const nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];
    extension = extension.toLowerCase();

    // Restringir extensión permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        throw new ControlException('Error. Las extensiones permitidas son: ' + extensionesValidas.join(', '), 400);
    }

    const unixTimestamp = moment().format('X');
    const nombreImg = `${id}-${unixTimestamp}.${extension}`;

    const imgAntigua = await UsuarioService.updImagenUsuario(id, nombreImg);

    // Mover el archivo a carpeta del servicor
    archivo.mv(`uploads/usuarios/${nombreImg}`, (err) => {
        if (err) {
            console.log(err);
            throw new ControlException('Ha ocurrido un error al guardar el archivo.', 500);
        }
    });

    // Eliminar del servidor la imagen antigua del usuario.
    if (imgAntigua) {
        var tipo = 'usuarios';
        eliminarArchivo(imgAntigua, tipo);
    }

    return true;
}

/**
 * Eliminar un archivo del repositorio del servidor
 */
function eliminarArchivo(nombre, tipo) {
    var pathFile = path.resolve(__dirname, `../uploads/${tipo}/${nombre}`);

    if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
    }
}

module.exports = {
    putArchivo,
    getArchivo,
    updImgUsuario
}
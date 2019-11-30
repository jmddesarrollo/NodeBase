'use strict'
// Servicios
var path = require('path');
var fs = require('fs');

/**
 * Eliminar un archivo del repositorio del servidor
 */
function eliminarArchivo(nombre, tipo) {
    var pathFile = path.resolve(__dirname, `../uploads/${tipo}/${nombre}`);

    if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
    }

    return true;
}

module.exports = {
    eliminarArchivo
}
"use strict";
// Servicios
const UsuarioService = require("../services/usuarios");
const DownLoadService = require("../services/download.service");

var moment = require("moment");

var path = require("path");
var fs = require("fs");

var ControlException = require("../utils/ControlException");

/*
 * Subir archivos.
 */
function putArchivo(req) {
    if (!req.files) {
        throw new ControlException(
            "No se ha encontrado selección de archivos.",
            400
        );
    }

    // Recoger archivo.
    const archivo = req.files.archivo;

    // Recoger nombre y Extensión
    const nombreCortado = archivo.name.split(".");
    let extension = nombreCortado[nombreCortado.length - 1];
    extension = extension.toLowerCase();

    // Restringir extensión permitidas
    let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

    if (extensionesValidas.indexOf(extension) < 0) {
        throw new ControlException(
            "Error. Las extensiones permitidas son: " + extensionesValidas.join(", "),
            400
        );
    }

    // Mover el archivo a carpeta del servicor
    archivo.mv(`uploads/archivos/${archivo.name}`, err => {
        if (err) {
            throw new ControlException(
                "Ha ocurrido un error al guardar el archivo.",
                500
            );
        }
    });

    return true;
}

/*
 * Consultar archivo.
 */
function getArchivo(tipo, nombre) {
    var archivoPath = path.resolve(__dirname, `../uploads/${tipo}/${nombre}`);

    if (!fs.existsSync(archivoPath)) {
        archivoPath = path.resolve(__dirname, "../uploads/no-image.jpg");
    }

    return archivoPath;
}

/*
 * Editar imagen del usuario.
 */
async function updImgUsuario(id, req) {
    if (!req.files) {
        throw new ControlException("No se ha encontrado selección de imagen.", 400);
    }

    // Recoger archivo.
    const archivo = req.files.imagen;

    // Recoger nombre y Extensión
    const nombreCortado = archivo.name.split(".");
    let extension = nombreCortado[nombreCortado.length - 1];
    extension = extension.toLowerCase();

    // Restringir extensión permitidas
    let extensionesValidas = ["png", "jpg", "gif", "jpeg"];

    if (extensionesValidas.indexOf(extension) < 0) {
        throw new ControlException(
            "Error. Las extensiones permitidas son: " + extensionesValidas.join(", "),
            400
        );
    }

    const unixTimestamp = moment().format("X");
    const nombreImg = `${id}-${unixTimestamp}.${extension}`;

    const imgAntigua = await UsuarioService.updImagenUsuario(id, nombreImg);

    // Mover el archivo a carpeta del servicor
    archivo.mv(`uploads/usuarios/${nombreImg}`, err => {
        if (err) {
            throw new ControlException(
                "Ha ocurrido un error al guardar el archivo.",
                500
            );
        }
    });

    // Eliminar del servidor la imagen antigua del usuario.
    if (imgAntigua) {
        const tipo = "usuarios";
        DownLoadService.eliminarArchivo(imgAntigua, tipo);
    }

    return true;
}

/*
 * Cargar archivos de imagen de galeria de fotos.
 */
function postGaleria(req) {
    if (!req.files) {
        throw new ControlException(
            "No se ha encontrado selección de archivos.",
            400
        );
    }

    const id = req.params.id;

    // Recoger archivo.
    const archivo = req.files.imagen;

    // Recoger nombre y Extensión
    const nombreCortado = archivo.name.split(".");
    let extension = nombreCortado[nombreCortado.length - 1];
    extension = extension.toLowerCase();

    // Restringir extensión permitidas
    let extensionesValidas = ["jpg", "jpeg", "JPG", "JPEG"];

    if (extensionesValidas.indexOf(extension) < 0) {
        throw new ControlException(
            "Error. Las extensiones permitidas son: " + extensionesValidas.join(", "),
            400
        );
    }

    // Mover el archivo a carpeta del servicor
    var dir = `uploads/imagenes/${id}`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    archivo.mv(`uploads/imagenes/${id}/${archivo.name}`, err => {
        if (err) {
            throw new ControlException(
                "Ha ocurrido un error al guardar el archivo.",
                500
            );
        }
    });

    return true;
}

/*
 * Consultar una imagen.
 */
function getGaleria(req) {
    const id = req.params.id;
    const data = fs.readdirSync(`uploads/imagenes/${id}`, function(err, archivos) {
        if (err) {
            onError(err);
            return false;
        }

        return archivos;
    });

    return data;
}

/**
 * Eliminar un archivo del repositorio del servidor
 */
function eliminarImg(req) {
    const id = req.params.id;
    const imgnombre = req.params.imgnombre;

    var pathFile = path.resolve(__dirname, `../uploads/imagenes/${id}/${imgnombre}`);

    if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
    }

    return true;
}

module.exports = {
    putArchivo,
    getArchivo,
    updImgUsuario,
    postGaleria,
    getGaleria,
    eliminarImg
};
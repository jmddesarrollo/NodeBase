'use strict'

var express = require('express');
var UploadController = require('../../controllers/upload.controller');
var api = express.Router();

var mdwAutentificacion = require('../../server/middlewares/autenticacion');

// Crear rutas por GET/POST/PUT/DELETE con express
api.get('/archivo', UploadController.getArchivo);
api.put('/archivo', [mdwAutentificacion.verificarToken], UploadController.putArchivo);
api.get('/usuarioimagen/:imgname', UploadController.getImagenUsuario);
api.put('/usuarioimagen/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdminOrUsuario], UploadController.updImgUsuario);

module.exports = api;
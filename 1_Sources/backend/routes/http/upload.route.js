'use strict'

var express = require('express');
var UploadController = require('../../controllers/http/upload.controller');
var api = express.Router();

var mdwAutentificacion = require('../../server/middlewares/autenticacion');

// Crear rutas por GET/POST/PUT/DELETE con express
api.get('/archivo', UploadController.getArchivo);
api.put('/archivo', [mdwAutentificacion.verificarToken], UploadController.putArchivo);
api.get('/usuarioimagen/:imgname', UploadController.getImagenUsuario);
api.put('/usuarioimagen/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], UploadController.updImgUsuario);
api.post('/uploads/galeria/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], UploadController.postGaleria);
api.get('/uploads/galeria/:id', UploadController.getGaleria);
api.get('/galeria/:id/:imgnombre', UploadController.getGaleriaById);
api.delete('/galeria/:id/:imgnombre', UploadController.eliminarImg);

module.exports = api;
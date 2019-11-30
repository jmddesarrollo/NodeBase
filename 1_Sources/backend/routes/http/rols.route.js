'use strict'

var express = require('express');
var RolsController = require('../../controllers/http/rols.controller');
var api = express.Router();

var mdwAutentificacion = require('../../server/middlewares/autenticacion');

// Crear rutas por GET/POST/PUT/DELETE con express
api.get('/rols', RolsController.getRols);
api.get('/rol/:id', [mdwAutentificacion.infoToken], RolsController.getRol);
api.post('/rol', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], RolsController.addRol);
api.put('/rol/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], RolsController.updRol);
api.delete('/rol/:id', [mdwAutentificacion.verificarToken, mdwAutentificacion.verificarAdmin], RolsController.delRol);

module.exports = api;
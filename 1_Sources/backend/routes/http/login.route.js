'use strict'

var express = require('express');
var LoginController = require('../../controllers/login.controller');
var api = express.Router();

var mdwAutentificacion = require('../../server/middlewares/autenticacion');

// Crear rutas por GET/POST/PUT/DELETE con express
api.post('/login', LoginController.loginUser);
api.get('/renovartoken', [mdwAutentificacion.verificarToken], LoginController.renovarToken);

module.exports = api;
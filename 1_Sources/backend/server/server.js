const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// En el archivo config se definen variables globales (variables de entorno) que se usan en la app.
require('../config/config');

// Recoge el archivo que se está subiendo y lo coloca en req.files.
const fileUpload = require('express-fileupload');
app.use(fileUpload());

// Cargar rutas
var login_routes = require('../routes/http/login.route');
var usuario_routes = require('../routes/http/usuario.route');
var rols_routes = require('../routes/http/rols.route');
var upload_routes = require('../routes/http/upload.route');

// Middleware: Antes de recibir http se lanza lo que le indiquemos aquí.
// Método que se ejecuta antes de que llegue a un controlador. 
// Recibe datos por método HTTP.
// Convierte datos recibidos en petición a objeto JSON, a un objeto javascript listo para usar.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//

// Al crear nuestro cliente (Frontend) que tire del API puede dar problemas con el CORS, cruzado de dominios, ...
// Middleware propio para solucionar este problema.
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

// Habilitar la carpeta public
// app.use(express.static(path.resolve(__dirname, '../public')));

// Rutas
app.use('/api', login_routes);
app.use('/api', usuario_routes);
app.use('/api', rols_routes);
app.use('/api', upload_routes);

module.exports = app;
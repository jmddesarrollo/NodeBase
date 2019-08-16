var jwt = require('jsonwebtoken');

// =====================================
// Verificar token - Middleware
// =====================================
var verificarToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ status: 'error', mensaje: 'La petición necesita ser autentificada.' });
    }

    var token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            if (err.name && err.name === 'TokenExpiredError') {
                return res.status(401).json({ status: 'error', mensaje: 'El tiempo de conexión ha expirado.', errors: err });
            } else {
                return res.status(401).json({ status: 'error', mensaje: 'Usuario no autentificado.', errors: err });
            }
        }

        req.usuario = decoded.usuario;
        next();
    });
}

// =====================================
// Informar datos del token - Middleware
// =====================================
var infoToken = (req, res, next) => {

    var token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (!err) {
            req.usuario = decoded.usuario;
        }
    });

    next();
}

// =====================================
// Verificar Administrador - Middleware
// =====================================
var verificarAdmin = function(req, res, next) {
    if (req.usuario.rol_id === 1) {
        next();
        return true;
    } else {
        return res.status(401).json({
            status: 'error',
            mensaje: 'Autorización invalida para la petición. Acción sólo permitida para Administradores.'
        });
    }
}

// =====================================
// Verificar Administrador - Middleware
// =====================================
var verificarAdminOrUsuario = function(req, res, next) {

    // En req.usuario tenemos datos del token traídos del middleware 'verificar token'
    if (req.usuario.rol_id === 1 || req.usuario.id == req.params.id) {
        next();
        return true;
    } else {
        return res.status(401).json({ status: 'error', mensaje: 'Autorización invalida para la petición.' });
    }
}

module.exports = {
    verificarToken,
    infoToken,
    verificarAdmin,
    verificarAdminOrUsuario
}
'use strict'

var app = require('./server/server');
var port = process.env.PORT || 3678;

app.listen(port, () => {
    console.log('Escuchando para Express por puerto: ' + port);
});
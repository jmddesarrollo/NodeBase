var accesoRouter = require('./acceso.router');

module.exports = (io) => {
    io.on("connect", async cliente => {
        accesoRouter(cliente);

        cliente.on("disconnect", data => {});
    });

    io.on('connection')
}
const usuarioRouter = require('./usuario.router');

const UsuariosListaService = require('../../services/lista-usuarios.service');

module.exports = (io) => {
    io.on("connect", async cliente => {
        console.log('Usuario conectado: ' + cliente.id);
        UsuariosListaService.agregar(cliente.id);

        usuarioRouter(cliente);

        cliente.on("disconnect", () => {
            UsuariosListaService.borrarUsuario(cliente.id);
            console.log('Usuario desconectado');
        });
    });

    io.on("connection", cliente => {
        console.log('Cliente conectado');
    });
};
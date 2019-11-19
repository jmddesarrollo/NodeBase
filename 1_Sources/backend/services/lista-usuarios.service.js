'use strict'

var lista = [];

/**
 * Agregar un usuario
 */
function agregar(id) {
    var usuario = new Object;
    usuario.id = id;
    usuario.email = null;
    usuario.sala = null;

    lista.push(usuario);

    return usuario;
}

function actualizarEmail(id, email = null) {
    for (var usuario of lista) {
        if (usuario.id === id) {
            usuario.email = email;
            break;
        }
    }
}

function getLista() {
    return lista;
}

function getUsuario(id) {
    return lista.find(usuario => usuario.id === id);
}

function getusuariosEnSala(sala) {
    return lista.filter(usuario => usuario.sala === sala);
}

function borrarUsuario(id) {
    const tempUsuario = getUsuario(id);
    lista = lista.filter(usuario => usuario.id !== id);

    return tempUsuario;
}

module.exports = {
    agregar,
    actualizarEmail,
    getLista,
    getUsuario,
    getusuariosEnSala,
    borrarUsuario
}
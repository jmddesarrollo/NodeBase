import { Injectable } from "@angular/core";
import { WebsocketService } from "../websocket.service";
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: "root"
})
export class WsUsuarioService {
  constructor(public wsService: WebsocketService) {}

  loginWS(email: string) {
    const payload = { email };
    this.wsService.emit("usuario/configurar", payload);
  }

  getLogin() {
    return this.wsService.listen("usuario/configurar");
  }

  logoutWS(email: string) {
    const payload = { email };
    this.wsService.emit("usuario/desconfigurar", payload);
  }

  getLogout() {
    return this.wsService.listen("usuario/desconfigurar");
  }

  crearUsuario(usuario: Usuario) {
    const payload = { usuario };
    this.wsService.emit("usuario/crear", payload);
  }

  getCrearUsuario() {
    return this.wsService.listen("usuario/crear");
  }

  actualizarUsuario(usuario: Usuario) {
    const payload = { usuario };
    this.wsService.emit("usuario/actualizar", payload);
  }

  getActualizarUsuario() {
    return this.wsService.listen("usuario/actualizar");
  }

  eliminarUsuario(usuario: Usuario) {
    const payload = { usuario };
    this.wsService.emit("usuario/eliminar", payload);
  }

  getEliminarUsuario() {
    return this.wsService.listen("usuario/eliminar");
  }
}

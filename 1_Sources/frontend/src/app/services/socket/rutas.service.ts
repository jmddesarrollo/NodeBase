import { Injectable } from "@angular/core";
import { WebsocketService } from "../websocket.service";
import { Ruta } from '../../models/ruta.model';

@Injectable({
  providedIn: "root"
})
export class WsRutaService {
  constructor(public wsService: WebsocketService) {}

  crearRuta(ruta: Ruta) {
    const payload = { ruta };
    this.wsService.emit("ruta/crear", payload);
  }

  getCrearRuta() {
    return this.wsService.listen("ruta/crear");
  }

  actualizarRuta(ruta: Ruta) {
    const payload = { ruta };
    this.wsService.emit("ruta/actualizar", payload);
  }

  getActualizarRuta() {
    return this.wsService.listen("ruta/actualizar");
  }

  eliminarRuta(ruta: Ruta) {
    const payload = { ruta };
    this.wsService.emit("ruta/eliminar", payload);
  }

  getEliminarRuta() {
    return this.wsService.listen("ruta/eliminar");
  }

  consultarRuta(id: number) {
    const payload = { id };
    this.wsService.emit("ruta/consultar", payload);
  }

  getConsultarRuta() {
    return this.wsService.listen("ruta/consultar");
  }

  consultarRutas() {
    this.wsService.emit("rutas/consultar");
  }

  getConsultarRutas() {
    return this.wsService.listen("rutas/consultar");
  }  

}

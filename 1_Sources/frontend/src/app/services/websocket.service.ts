import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../models/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus: boolean;
  public usuario: Usuario;

  constructor(
    private socket: Socket
  ) {
    this.socketStatus = false;

    this.checkStatus();
    this.actualizarEmail();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
    });
  }

  emit(evento: string, payload?: any, callback?: any) {
    this.socket.emit(evento, payload, callback);
  }

  listen(evento: string) {
    return this.socket.fromEvent(evento);
  }

  actualizarEmail() {
    const id = localStorage.getItem('id') || null;
    if (id) {
      this.emit('usuario/wsEmail', {id});
    }
  }
}

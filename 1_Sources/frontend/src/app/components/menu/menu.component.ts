import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

import {Location} from '@angular/common';

import { adminId } from '../../config/config';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios propios
import { ShareUsuariosService } from '../../services/share/share-usuarios';
// Servicios HTTP
import { UsuarioService } from '../../services/service.index';
// Servicios Socket
import { WsUsuarioService } from '../../services/socket/usuario.service';
// Modulo de notificaciones.
import { ToastrService, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  public isLog: boolean;
  public usuario: Usuario;
  public adminId: number;
  public seleccion: string;

  private observables = new Array();

  constructor(
    private location: Location,
    private usuarioService: UsuarioService,
    private shareUsuariosService: ShareUsuariosService,
    private wsUsuarioService: WsUsuarioService,
    private toastr: ToastrService,
    public wsService: WebsocketService
  ) {
    this.isLog = false;
    this.adminId = adminId;
    this.usuario = new Usuario(null, null, null, null, null);

    const path = this.location.path().split('/');
    this.seleccion = path[1];
  }

  ngOnInit() {
    this.estalogueado();
    this.getEditUsuario();
    this.getLogin();
    this.getLogout();
  }

  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  estalogueado() {
    this.isLog = this.usuarioService.estalogueado();
    if (this.isLog) {
      const id = localStorage.getItem('id');
      this.usuarioService.cargarUsuario(id).subscribe((respuesta) => {
        if (respuesta) {
          this.usuario = respuesta['usuario'];
          this.usuario.rol = respuesta['rol'];
          this.shareUsuariosService.editUsuarioPermiso(this.usuario.rol_id);
        }
      });
    }
  }

  /*
   * Observable para la edición de un usuario.
   */
  getEditUsuario() {
    const ob = this.shareUsuariosService.currentObjUsuarioEditPost.subscribe(usuarioEdit => {
      if (usuarioEdit && (usuarioEdit.id === this.usuario.id)) {
        this.usuario = usuarioEdit;
      }
    });

    this.observables.push(ob);
  }

  getLogin() {
    const ob = this.wsUsuarioService.getLogin().subscribe((data) => {
      const id = localStorage.getItem('id');
      if (id) {
        this.usuarioService.cargarUsuario(id).subscribe(
          response => {
            this.usuario = response["usuario"];
            this.shareUsuariosService.editUsuarioPermiso(this.usuario.rol_id);
          },
          error => {
            const errorMensaje = JSON.parse(error._body);
            if (errorMensaje.mensaje !== undefined) {
              this.toastr.error(errorMensaje.mensaje);
            } else {
              this.toastr.error('Ha ocurrido un error indeterminado en el login.');
            }
          }
        );
      }
    });
    this.observables.push(ob);
  }

  getLogout() {
    const ob = this.wsUsuarioService.getLogout().subscribe((data) => {
      this.limpiarUsuario();
      this.shareUsuariosService.editUsuarioPermiso(0);
    });
    this.observables.push(ob);
  }

  limpiarUsuario() {
    this.usuario = new Usuario(null, null, null, null, null);
  }

  selMenu(seleccion: string) {
    this.seleccion = seleccion;
  }

}

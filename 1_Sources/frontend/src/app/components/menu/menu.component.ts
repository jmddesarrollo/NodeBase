import { Component, OnInit, OnDestroy } from '@angular/core';

import { adminId } from '../../config/config';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { UsuarioService } from '../../services/service.index';
import { ShareUsuariosService } from '../../services/share/share-usuarios';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  public isLog: boolean;
  public usuario: Usuario;
  public adminId: number;

  private observables = new Array();

  constructor(
    private usuarioService: UsuarioService,
    private shareUsuariosService: ShareUsuariosService
  ) {
    this.isLog = false;
    this.adminId = adminId;
    this.usuario = new Usuario(null, null, null, null, null);
  }

  ngOnInit() {
    this.estalogueado();
    this._getEditUsuario();
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
        }
      });
    }
  }

  /*
   * Observable para la edición de un usuario.
   */
  _getEditUsuario() {
    const ob = this.shareUsuariosService.currentObjUsuarioEditPost.subscribe(usuarioEdit => {
      if (usuarioEdit && (usuarioEdit.id === this.usuario.id)) {
        this.usuario = usuarioEdit;
      }
    });

    this.observables.push(ob);
  }

}

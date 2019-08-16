import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Servicios
import { UsuarioService } from '../../services/service.index';
import { ShareUsuariosService } from '../../services/share/share-usuarios';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public recuerdame: boolean;
  public email: string;
  public isLog: boolean;
  public usuario: Usuario;

  public boolAdminRight: boolean;

  private observables = new Array();

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private shareUsuariosService: ShareUsuariosService,
    private toastr: ToastrService
  ) {
    this.boolAdminRight = false;
  }

  ngOnInit() {
    // Recoger elemento modal
    const modal = document.getElementById('modal_login');
    this.email = localStorage.getItem('email') || '';
    this.recuerdame = false;
    this.isLog = false;

    this.usuario = new Usuario(null, null, null, null, null);

    if (this.email.length > 1) {
      this.recuerdame = true;
    }

    // Al pulsar sobre cualquier lugar fuera del modal, este se cerrará
    document.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

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
      this.usuario = this.usuarioService.usuario;
    }
  }

  ingresar(forma: NgForm) {
    // console.log(forma.valid);
    // console.log(forma.value);

    this.usuario.email = forma.value.email;
    this.usuario.password = forma.value.password;

    this.usuarioService.login(this.usuario).subscribe(
      response => {
        response.data.usuario.rolid = response.data.usuario.rol_id;
        response.data.usuario.rol_id = undefined;
        localStorage.setItem('id', response.data.usuario.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
        console.log(response.data.usuario);

        if (this.recuerdame) {
          localStorage.setItem('email', response.data.usuario.email);
        } else {
          localStorage.removeItem('email');
        }
        this.usuarioService.estalogueado();

        this.toastr.success('Login realizado correctamente.');
        this.router.navigate(['/home']);
      }, error => {
        const errorMensaje = JSON.parse(error._body);
        if (errorMensaje.mensaje !== undefined) {
          this.toastr.error(errorMensaje.mensaje);
        } else {
          this.toastr.error('Ha ocurrido un error indeterminado en el login.');
        }
      }
    );
  }

  logout() {
    this.isLog = false;
    this.usuarioService.logout();
    this.usuario = new Usuario(null, null, null, null, null);
  }

  /**
   * Acción de mostrar/ocultar panel de administración
   */
  mostrarAdminRight(valor) {
    this.boolAdminRight = valor;
    this.usuario.rol = {id: this.usuario.rolid, nombre: ''};

    this.shareUsuariosService.editObjUsuario(this.usuario);
  }

  /*
   * Observable para la edición de un usuario.
   */
  _getEditUsuario() {
    const ob = this.shareUsuariosService.currentObjUsuarioEditPost.subscribe(usuarioEdit => {
      if (usuarioEdit && usuarioEdit.id === this.usuario.id) {
        this.usuario = usuarioEdit;
        this.usuario.rolid = usuarioEdit.rol.id;
        this.mostrarAdminRight(false);
      }
    });

    this.observables.push(ob);
  }

}

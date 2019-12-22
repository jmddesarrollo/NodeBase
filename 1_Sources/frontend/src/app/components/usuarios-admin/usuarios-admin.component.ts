import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { adminId } from '../../config/config';

// Modelos
import { Usuario } from '../../models/usuario.model';
import { Rol } from '../../models/rol.model';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

// Servicios
import { RolService } from '../../services/http/rol.service';
import { UsuarioService } from '../../services/http/usuario.service';
import { ShareUsuariosService } from '../../services/share/share-usuarios';
import { ValidadoresService } from '../../services/regex/validadores.service';

// Servicios websocket
import { WsUsuarioService } from '../../services/socket/usuario.service';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public usuarioPrev: Usuario;
  public usuarioConectado: Usuario;
  public rols: Rol[];
  public mostrarPestanaImagen: boolean;
  public adminId: number;

  public errorPassword: boolean;
  public errorNombre: boolean;
  public errorEmail: boolean;

  public forma: FormGroup;

  public pestanaAbierta: string;
  private observables = new Array();

  constructor(
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private shareUsuariosService: ShareUsuariosService,
    private validadoresService: ValidadoresService,
    private wsUsuarioService: WsUsuarioService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.usuario = new Usuario(null, null, null, null, null);
    this.usuarioPrev = Usuario.copiar(this.usuario);
    this.usuarioConectado = new Usuario(null, null, null, null, null);
    this.rols = [];
    this.pestanaAbierta = 'panel_general';
    this.adminId = adminId;

    this.errorPassword = false;
    this.errorNombre = false;
    this.errorEmail = false;

    this.getUsuarioConectado();
    this.getRols();
    this.getActualizarUsuario();
    this.getCrearUsuario();

    // FormControl parametros: valor por defecto / regla validación[] / regla validación asincrona[]
    this.forma = new FormGroup(
      {
        nombre: new FormControl('', [
          Validators.required,
          this.validadoresService.valNombre,
          this.validadoresService.textoMinimo2,
          this.validadoresService.textoMaximo45
        ]),
        apellidos: new FormControl('', [
          Validators.required,
          this.validadoresService.valApellidos,
          this.validadoresService.textoMinimo2,
          this.validadoresService.textoMaximo100
        ]),
        email: new FormControl('', [
          Validators.required,
          this.validadoresService.valEmail,
          this.validadoresService.textoMinimo6,
          this.validadoresService.textoMaximo60
        ]),
        alias: new FormControl('', [
          this.validadoresService.valEntero
        ]),
        password: new FormControl('', [
          this.validadoresService.validarPasswordMedium
        ]),
        confirmPass: new FormControl(''),
        rol_id: new FormControl('', [Validators.required]),
        activo: new FormControl(true),
        id: new FormControl(''),
        imagen: new FormControl(''),
        rol: new FormControl('')
      },
      { validators: this.validadoresService.sonIguales('password', 'confirmPass') }
    );

    // Debe situarse después de la creación del formulario, pues recoge información para él.
    this._getEditUsuario();

    this.forma.controls['rol_id'].setValue(2);
  }

  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  // Marcar con borde inferior rojo la pestaña de la administración.
  abrirPestana(tab, panel) {
    const x = document.getElementsByClassName('tabs');
    const tablinks = document.getElementsByClassName('tablink');

    for (let i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(
        ' w3-border-red',
        ''
      );
    }

    if (document.getElementById(tab)) {
      document.getElementById(tab).className += ' w3-border-red';
    }

    this.pestanaAbierta = panel;
  }

  /**
   * Consultar los rols existentes
   */
  getRols() {
    this.rolService.cargarRols().subscribe(
      response => {
        this.rols = response.data;
      },
      error => {
        this.toastr.error(error._body.message);
      }
    );
  }

  getUsuarioConectado() {
    const id = localStorage.getItem('id');
    if (id) {
      this.usuarioService.cargarUsuario(id).subscribe(
        response => {
          this.usuarioConectado = response["usuario"];
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
  }

  /**
   * Alta o edición de un usuario.
   */
  guardarCambios() {
    this.usuario = this.forma.value;

    this.usuario.nombre = this.usuario.nombre.trim();
    this.usuario.apellidos = this.usuario.apellidos.trim();
    this.usuario.email = this.usuario.email.trim();
    this.usuario.alias = this.usuario.alias.trim();

    if (!this.usuario.id) {
      // Alta del usuario
      if (this.validarCamposAdd()) {
        this.crearUsuario();
        this.limpiarErrorPass();
      }
    } else {
      // Edición del usuario
      if (this.validarCambios()) {
        this.editUsuario();
      }
      if (this.usuario.password !== null && this.usuario.password !== '') {
        this.editPassword();
      }
    }
  }

  /**
   * Validación de cambios al editar
   */
  validarCambios() {
    if (
      this.usuario.nombre === this.usuarioPrev.nombre &&
      this.usuario.apellidos === this.usuarioPrev.apellidos &&
      this.usuario.email === this.usuarioPrev.email &&
      this.usuario.alias === this.usuarioPrev.alias &&
      this.usuario.rol_id === this.usuarioPrev.rol_id &&
      this.usuario.activo === this.usuarioPrev.activo
    ) {
      if (this.usuario.password === null || this.usuario.password === '') {
        this.toastr.warning('No se ha encontrado ningún cambio en el usuario.');
      }
      return false;
    }
    return true;
  }

  /**
   * Llamada a servicio para añadir a un usuario
   */
  crearUsuario() {
    this.wsUsuarioService.crearUsuario(this.usuario);
  }
  getCrearUsuario() {
    const ob = this.wsUsuarioService.getCrearUsuario().subscribe((data) => {
      this.limpiarData();
      if (data["mensaje"]) {
        this.toastr.success(data["mensaje"]);
      }
    });
    this.observables.push(ob);
  }

  /**
   * Llamada a servicio para editar datos de un usuario
   */
  editUsuario() {
    this.wsUsuarioService.actualizarUsuario(this.usuario);
  }
  getActualizarUsuario() {
    const ob = this.wsUsuarioService.getActualizarUsuario().subscribe((data) => {
      this.limpiarData();
      if (data["mensaje"]) {
        this.toastr.success(data["mensaje"]);
      }
    });
    this.observables.push(ob);
  }

  /**
   * Llamada a servicio para editar contraseña de un usuario
   */
  editPassword() {
    this.usuarioService.actualizarContrasena(this.usuario).subscribe(
      response => {
        this.limpiarData();
        this.toastr.success(response.mensaje);
      },
      error => {
        const dataError = JSON.parse(error._body);

        if (dataError.mensaje) {
          this.toastr.error(dataError.mensaje);
        } else if (dataError.message) {
          this.toastr.error(dataError.message);
        }
      }
    );
  }

  /*
   * Observable para la edición de un nuevo usuario.
   */
  _getEditUsuario() {
    const ob = this.shareUsuariosService.currentObjUsuarioEdit.subscribe(
      usuario => {
        if (usuario) {
          this.usuario = usuario;
          this.usuario.password = '';
          this.usuario.confirmPass = '';

          this.forma.reset();
          this.forma.setValue(this.usuario);

          this.usuarioPrev = Usuario.copiar(this.usuario);
          this.mostrarPestanaImagen = true;

          this.abrirPestana('tab_general', 'panel_general');
        }
      }
    );

    this.observables.push(ob);
  }

  /**
   * Validación de campos de entrada para el alta de usuario
   */
  validarCamposAdd(): boolean {
    // Validar contraseña
    if (!this.usuario.password) {
      this.errorPassword = true;
      return false;
    }

    return true;
  }

  /**
   * Quitar posible error de contraseña
   */
  limpiarErrorPass() {
    this.errorPassword = false;
  }

  // Limpiar contenido de objeto que contiene información a editar.
  limpiarData() {
    this.usuario = new Usuario(null, null, null, null, null, false, null, null, null, null, null);
    this.shareUsuariosService.editObjUsuario(this.usuario);

    this.forma.reset({
      nombre: '',
      apellidos: '',
      email: '',
      alias: '',
      rol_id: '',
      password: '',
      confirmPass: '',
      activo: true
    });
    this.exeLimpiar();
  }

  /**
   * Acción llevada a cabo al limpiar contenido del formulario
   */
  exeLimpiar() {
    this.mostrarPestanaImagen = false;
  }
}

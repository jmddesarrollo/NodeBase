import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

// Servicios
import { UsuarioService } from '../../services/http/usuario.service';
import { ShareUsuariosService } from '../../services/share/share-usuarios';

// Servicios WebSockets
import { WsUsuarioService } from '../../services/socket/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public boolAdminRight: boolean;
  public loading: boolean;
  public numRegs: number;
  public numTotRegs: number;
  public countUsuarios: number;

  public headerHeight: number;
  public rowHeight: number;
  public pageLimit: number;
  public isLoading: boolean;

  public usuarios: Usuario[];

  private observables = new Array();

  constructor(
    private usuarioService: UsuarioService,
    private shareUsuariosService: ShareUsuariosService,
    private wsUsuarioService: WsUsuarioService,
    private toastr: ToastrService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.boolAdminRight = false;
    this.isLoading = false;
    this.headerHeight = 40;
    this.rowHeight = 30;
    this.pageLimit = 10;
    this.numRegs = 12;
    this.usuarios = [];
    this.countUsuarios = null;

    this.getCrearUsuario();
    this.getActualizarUsuario();
    this.getEliminarUsuario();
    this.getConsultarUsuario();
    this.onScroll(0);
    this.limpiarUsuario();
  }

  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  onScroll(offsetY: number) {
    // total height of all rows in the viewport
    const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;

    // check if we scrolled to the end of the viewport
    if (!this.isLoading && offsetY + viewHeight >= this.usuarios.length * this.rowHeight) {
      // total number of results to load
      let limit = this.pageLimit;

      // check if we haven't fetched any results yet
      if (this.usuarios.length === 0) {
        // calculate the number of rows that fit within viewport
        const pageSize = Math.ceil(viewHeight / this.rowHeight);

        // change the limit to pageSize such that we fill the first page entirely
        // (otherwise, we won't be able to scroll past it)
        limit = Math.max(pageSize, this.pageLimit);
      }
      if (!this.isLoading) {
        this.getUsuarios(limit);
      }
    }
  }

  /**
   * Acción de mostrar/ocultar panel de administración
   */
  mostrarAdminRight(valor) {
    this.boolAdminRight = valor;

    // Al cerrar la ventana limpiar contenido de edición de usuario
    if (!valor) {
      this.limpiarUsuario();
    }

    this.refrescarDisplayTabla();
  }

  limpiarUsuario() {
    const usuario = new Usuario(null, null, null, null, null, true, null, null, null, null, null);
    this.shareUsuariosService.editObjUsuario(usuario);
  }

  /**
   * Consultar todos los usuarios
   */
  getUsuarios(limit: number) {
    this.isLoading = true;

    // Mostrar
    if (this.usuarios.length !== this.countUsuarios) {
      this.usuarioService.cargarUsuariosLimit((this.usuarios.length), limit).subscribe(
        response => {
          const rows = [...this.usuarios, ...response.data.rows];
          this.usuarios = rows;
          this.countUsuarios = response.data.count;

          this.refrescarDisplayTabla();
          this.isLoading = false;
        },
        error => {
          const errorMensaje = JSON.parse(error._body);
          this.isLoading = false;
          if (errorMensaje.mensaje !== undefined) {
            this.toastr.error(errorMensaje.mensaje);
          } else {
            this.toastr.error('Ha ocurrido un error indeterminado en el login.');
          }
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  /**
   * Enviar a sección Admin el usuario para su edición
   */
  sendEditarUsuario(row) {
    row.rol_id = row.rol.id;
    this.shareUsuariosService.editObjUsuario(row);

    this.mostrarAdminRight(true);
  }

  delUsuario(row) {
    if (confirm('Confirmar la eliminación del usuario "' + row.alias + '" ')) {
      this.wsUsuarioService.eliminarUsuario(row);
    }
    return true;
  }

  getEliminarUsuario() {
    const ob = this.wsUsuarioService.getEliminarUsuario().subscribe((data) => {
      const usuario = data["usuario"];
      if (usuario) {
        this.usuarios = this.usuarios.filter(user => user.id !== usuario.id);
        this.mostrarAdminRight(false);
        this.refrescarDisplayTabla();
        if (data["mensaje"]) {
          this.toastr.success(data["mensaje"]);
        }
      }
    });
    this.observables.push(ob);
  }

  /**
   * Observable para la creación de usuario
   */
  getCrearUsuario() {
    const ob = this.wsUsuarioService.getCrearUsuario().subscribe((data) => {
      const usuario = data["usuario"];
      usuario.rol = data["rol"];
      if (usuario) {
        this.usuarios.push(usuario);
        this.mostrarAdminRight(false);
        this.refrescarDisplayTabla();
      }
    });
    this.observables.push(ob);
  }

  /*
   * Observable para la edición de un usuario.
   */
  getActualizarUsuario() {
    const ob = this.wsUsuarioService.getActualizarUsuario().subscribe((data) => {
      let usuarioEdit = new Usuario(null, null, null, null, null, false, null, null, null, null, null);
      usuarioEdit = data["usuario"];
      usuarioEdit.rol = data["rol"];

      const index = this.usuarios.findIndex(usuario => usuario.id === usuarioEdit.id);
      this.usuarios[index] = usuarioEdit;
      this.usuarios = [...this.usuarios];
    });
    this.observables.push(ob);
  }

  getConsultarUsuario() {
    const ob = this.wsUsuarioService.getConsultarUsuario().subscribe((data) => {
      const usuarioImg = data["usuario"];
      const index = this.usuarios.findIndex(usuario => usuario.id === usuarioImg.id);
      this.usuarios[index].imagen = usuarioImg.imagen;
      this.usuarios = [...this.usuarios];
    });
    this.observables.push(ob);
  }

  onResize(event) {
    this.refrescarDisplayTabla();
  }

  /**
   * Refrescar datos de la tabla
   */
  refrescarDisplayTabla() {
    setTimeout(() => {
      this.usuarios = [...this.usuarios];
    }, 100);
  }
}

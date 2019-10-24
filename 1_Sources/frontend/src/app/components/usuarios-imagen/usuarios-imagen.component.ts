import { Component, OnInit } from '@angular/core';

// Servicios
import { UploadService } from '../../services/service.index';
import { UsuarioService } from '../../services/http/usuario.service';
import { ShareUsuariosService } from '../../services/share/share-usuarios';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-imagen',
  templateUrl: './usuarios-imagen.component.html',
  styleUrls: ['./usuarios-imagen.component.css']
})
export class UsuariosImagenComponent implements OnInit {

  public filesToUpload: Array<File>;
  public url: string;

  public usuario: Usuario;

  private observables = new Array();

  constructor(
    private uploadService: UploadService,
    private usuarioService: UsuarioService,
    private shareUsuariosService: ShareUsuariosService,
    private toastr: ToastrService
  ) {
    this.url = uploadService.url;
    this.usuario = new Usuario(null, null, null, null, null);
  }

  ngOnInit() {
    // Observable con la edición de un usuario
    this._getEditUsuario();
  }

  subirImagen() {
    // Subir imagen del artista
    this.uploadService.makeFileRequest(this.url + 'usuarioimagen/' + this.usuario.id, [], this.filesToUpload,
                                        this.usuarioService.token, 'imagen')
      .then( () => {
        this.toastr.success('Imagen actualizada correctamente.');
      },
      error => {
        const errorMSg = JSON.parse(error);
        this.toastr.error(errorMSg.message);
      });
  }

  // Recoger los archivos seleccionados en el input
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files;
  }
  // Fin Subida archivos al servidor

  /*
   * Observable para la edición de un nuevo usuario.
   */
  _getEditUsuario() {
    const ob = this.shareUsuariosService.currentObjUsuarioEdit.subscribe(
      usuario => {
        if (usuario.id) {
          this.usuario = usuario;
          this.usuario.password = '';
          this.usuario.confirmPass = '';
          // this.usuario.imagen = '';
          this.usuario.rol_id = usuario.rol.id;
        }
      }
    );

    this.observables.push(ob);
  }
}

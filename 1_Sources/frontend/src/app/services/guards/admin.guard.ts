import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../http/usuario.service';

import { adminId } from '../../config/config';

// Modelos
import { Usuario } from '../../models/usuario.model';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdminGuard implements CanActivate {
  public isLog: boolean;
  public usuario: Usuario;
  public adminId: number;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.isLog = false;
    this.adminId = adminId;
    this.usuario = new Usuario(null, null, null, null, null);
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.estalogueado();

    if (this.isLog) {
      const id = localStorage.getItem('id');
      this.usuarioService.cargarUsuario(id).subscribe((respuesta) => {
        if (respuesta) {
          this.usuario = respuesta['usuario'];
          this.usuario.rol = respuesta['rol'];

          if (this.usuario && this.usuario.rol_id === this.adminId) {
            return true;
          } else {
            this.toastr.warning('El usuario no tiene permisos de acceso.');
            this.router.navigate(['/home']);
            return false;
          }
        }
      });
    } else {
      this.toastr.warning('El usuario no está logueado.');
      this.router.navigate(['/home']);
      return false;
    }
  }

  estalogueado() {
    this.isLog = this.usuarioService.estalogueado();
  }
}

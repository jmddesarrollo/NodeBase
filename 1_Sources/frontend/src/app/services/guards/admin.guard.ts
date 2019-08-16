import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UsuarioService } from '../http/usuario.service';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) {

  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.usuarioService.usuario && this.usuarioService.usuario.rolid === 1) {
      return true;
    } else {
      this.toastr.warning('El usuario no tiene permisos de acceso.');
      this.router.navigate(['/home']);
      return false;
    }
  }
}

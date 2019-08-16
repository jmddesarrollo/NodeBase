import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ShareUsuariosService {
  /*
   * Variables de comunicación para Usuarios
   */
  private objUsuario = new BehaviorSubject<any>('');
  currentObjUsuario = this.objUsuario.asObservable();

  private objUsuarioEdit = new BehaviorSubject<any>('');
  currentObjUsuarioEdit = this.objUsuarioEdit.asObservable();

  private objUsuarioEditPost = new BehaviorSubject<any>('');
  currentObjUsuarioEditPost = this.objUsuarioEditPost.asObservable();

  constructor() {}

  addObjUsuario(valorObjUsuario: any) {
    this.objUsuario.next(valorObjUsuario);
  }

  editObjUsuario(valorObjUsuarioEdit: any) {
    this.objUsuarioEdit.next(valorObjUsuarioEdit);
  }

  editObjUsuarioPost(valorObjUsuarioEditPost: any) {
    this.objUsuarioEditPost.next(valorObjUsuarioEditPost);
  }
}

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import 'rxjs/add/operator/map';
import { delay, map } from 'rxjs/operators';

import { Usuario } from '../../models/usuario.model';

import { GLOBAL } from '../global';
import { Router } from '@angular/router';

class PagedData<T> {
  data: T[];
}

@Injectable()
export class UsuarioService {
  public token: string;
  public headers: any;
  public url: string;

  constructor(
    private http: Http,
    private router: Router
  ) {
    this.getToken();

    this.url = GLOBAL.url;
  }

  getToken() {
    this.token = localStorage.getItem('token') || '';
    this.headers = new Headers({ 'Content-Type': 'application/json'});
    this.headers.append('Authorization', 'Bearer ' + this.token);
  }

  estalogueado() {
    this.getToken();
    return (this.token.length > 5) ? true : false;
  }

  login(usuario: Usuario) {
    const params = JSON.stringify(usuario);
    const url = this.url + 'login';

    return this.http.post(url, params, {headers: this.headers}).map(res => res.json());
  }

  logout() {
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('id');

    this.headers.delete('Authorization');

    this.router.navigate(['/login']);
  }

  renovartoken() {
    const url = this.url + 'renovartoken';
    this.getToken();

    return this.http.get(url, {headers: this.headers}).map( (respuesta: any) => {
      const res = respuesta.json();
      this.token = res.token;

      localStorage.setItem('token', this.token);

      return true;
    });
  }

  cargarUsuario(termino: string) {
    const url = this.url + 'usuario/' + termino;
    this.getToken();

    return this.http.get(url, {headers: this.headers}).map(res => res.json());
  }

  cargarUsuarios() {
    const url = this.url + 'usuarios';
    this.getToken();

    return this.http.get(url, {headers: this.headers}).map(res => res.json());
  }

  cargarUsuariosLimit(desde, limit) {
    const url = this.url + 'usuarioslimit/' + desde + '/' + limit;
    this.getToken();

    return this.http.get(url, {headers: this.headers}).pipe(
      delay(new Date(Date.now() + 500)),
      map(res => res.json())
    );
  }

  crearUsuario(usuario: Usuario) {
    const params = JSON.stringify(usuario);
    const url = this.url + 'usuario';
    this.getToken();

    return this.http.post(url, params, {headers: this.headers}).map(res => res.json());
  }

  actualizarUsuario(usuario: Usuario) {
    const params = JSON.stringify(usuario);
    const url = this.url + 'usuario/' + usuario.id;
    this.getToken();

    return this.http.put(url, params, {headers: this.headers}).map(res => res.json());
  }

  actualizarContrasena(usuario: Usuario) {
    const params = JSON.stringify(usuario);
    const url = this.url + 'usuariopassword/' + usuario.id;
    this.getToken();

    return this.http.put(url, params, {headers: this.headers}).map(res => res.json());
  }

  borrarUsuario(usuario: Usuario) {
    this.getToken();
    const url = this.url + 'usuario/' + usuario.id;
    const options = new RequestOptions({ headers: this.headers });

    return this.http.delete(url, options).map(res => res.json());
  }

  buscarUsuarios(termino: string) {
    const url = this.url + 'busqueda/coleccion/usuarios/' + termino;
    this.getToken();

    return this.http.get(url, {headers: this.headers}).map(res => res.json());
  }

}

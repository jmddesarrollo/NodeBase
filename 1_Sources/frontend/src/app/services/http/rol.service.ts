import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

import { Rol } from '../../models/rol.model';

import { GLOBAL } from '../global';


@Injectable()
export class RolService {
  public token: string;
  public rol: Rol;
  public headers: any;
  public url: string;

  constructor(
    private http: Http
  ) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
    this.url = GLOBAL.url;
  }

  cargarRols() {
    const url = this.url + 'rols';

    return this.http.get(url, {headers: this.headers}).map(res => res.json());
  }

}

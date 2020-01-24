import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Http, Headers } from '@angular/http';
import { UsuarioService } from '../http/usuario.service';

@Injectable()
export class UploadService {
  public url: string;
  public headers: any;
  public token: string;

  constructor(
    private http: Http,
    private usuarioService: UsuarioService
  ) {
    this.headers = new Headers({ 'Content-Type': 'application/json'});
    this.token = this.usuarioService.token;
  }

  // Petición Ajax para subir ficheros convencionales.
  makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
    // Lanzar el código de la subida
    return new Promise((resolve, reject) => {
      // Simular comportamiento de un formulario
      const formData: any = new FormData();
      // Petición de ajax tipica
      const xhr = new XMLHttpRequest();
      // Recorrer los ficheros que llegan por la entrada y añadirlos al formulario
      for (let i = 0; i < files.length; i++) {
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
      xhr.send(formData);
    });
  }
  // Fin Subida archivos al servidor

  // Petición Ajax para subir ficheros convencionales.
  updloadsFilesServer(url, formData: FormData) {
    // Lanzar el código de la subida
    return new Promise((resolve, reject) => {
      // Petición de ajax tipica
      const xhr = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open("POST", url, true);
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.token);
      xhr.send(formData);
    });
  }
  // Fin Subida archivos al servidor

  getGaleria(url) {
    return this.http.get(url, {headers: this.headers}).map(res => res.json());
  }

  eliminarImg(url) {
    return this.http.delete(url, {headers: this.headers}).map(res => res.json());
  }
}

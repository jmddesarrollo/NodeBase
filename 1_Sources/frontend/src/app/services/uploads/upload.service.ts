import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { GLOBAL } from '../global';

@Injectable()
export class UploadService {
  public url: string;

  constructor() {
    this.url = GLOBAL.url;
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
      xhr.setRequestHeader('Authorization', 'bearer ' + token);
      xhr.send(formData);
    });
  }
  // Fin Subida archivos al servidor
}

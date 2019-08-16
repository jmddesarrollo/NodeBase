import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): any {
    let url = URL_SERVICIOS + '/usuarioimagen/';

    if (!img) {
      return url += 'no-imagen.jpg';
    } else {
        url += img;
    }

    return url;
  }

}

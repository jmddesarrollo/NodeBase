import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'galeria'
})
export class GaleriaPipe implements PipeTransform {

  transform(img: string): any {
    let url = URL_SERVICIOS + '/galeria/';

    if (!img) {
      return url += 'no-imagen.jpg';
    } else {
        url += img;
    }

    return url;
  }

}

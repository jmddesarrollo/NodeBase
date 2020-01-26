import { Component, OnInit, Input } from '@angular/core';

// Servicios
import { UploadService } from '../../services/uploads/upload.service';

// Constantes globales
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  @Input() imageSize: object;
  @Input() infinite: boolean;
  @Input() autoSlide: number;
  @Input() animationSpeed: number;
  @Input() id: number;

  public arrGaleria = [];
  public url: string;
  public imageObject: Array<object>;

  constructor(
    private uploadService: UploadService
  ) {
    this.url = GLOBAL.url;
    this.arrGaleria = [];
    this.imageObject = [];

    this.imageSize = {width: 250, height: 200, space: 1};
    this.infinite = true;
    this.autoSlide = 5;
    this.animationSpeed = 2;
  }

  ngOnInit() {
    this.arrGaleria = [];
    this.getGaleria();
  }

  getGaleria() {
    const url = this.url + 'uploads/galeria/' + this.id;

    this.uploadService.getGaleria(url).subscribe((response) => {
      if (response["data"]) {
        this.arrGaleria = response["data"];
        this.arrGaleria = [...this.arrGaleria];

        for (const galeria of this.arrGaleria) {
          const ruta = this.url + 'galeria/' + this.id + '/' + galeria;

          const objGaleria = {
            image: ruta,
            thumbImage: ruta,
            alt: galeria,
            title: galeria
          };

          this.imageObject.push(objGaleria);
        }
      } else {
        this.arrGaleria = [];
        const ruta = this.url + 'galeria/sin/no-imagen.jpg';

        const objGaleria = {
          image: ruta,
          thumbImage: ruta,
          alt: 'Sin imagen',
          title: 'Sin imagen'
        };

        this.imageObject.push(objGaleria);
      }
    });
  }

}

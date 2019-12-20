import {
  Component,
  OnInit,
  AfterViewInit,
  Input
} from "@angular/core";

import { NgImageSliderComponent } from "ng-image-slider";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @Input() imageSize: object;
  @Input() infinite: boolean;
  @Input() autoSlide: number;
  @Input() animationSpeed: number;
  

  public slideIndex: number;
  public imageObject: Array<object>;

  constructor() {
    this.imageSize = {width: 250, height: 200, space: 1};
    this.infinite = true;
    this.autoSlide = 5;
    this.animationSpeed = 2;
  }

  ngOnInit() {
    this.imageObject = [
      {
        image: "assets/images/gallery/01-Casillas.JPG",
        thumbImage: "assets/images/gallery/01-Casillas.JPG",
        alt: "Pico casillas",
        title: "Pico Casillas"
      },
      {
        image: "assets/images/gallery/02-Arenal.JPG",
        thumbImage: "assets/images/gallery/02-Arenal.JPG",
        alt: "El Arenal",
        title: "El Arenal"
      },
      {
        image: "assets/images/gallery/03-Vicente.JPG",
        thumbImage: "assets/images/gallery/03-Vicente.JPG",
        alt: "Pico de San Vicente",
        title: "Pico de San Vicente"
      },
      {
        image: "assets/images/gallery/04-Navacerrada.JPG",
        thumbImage: "assets/images/gallery/04-Navacerrada.JPG",
        alt: "Navacerrada",
        title: "Navacerrada"
      },
      {
        image: "assets/images/gallery/05-Navalucillos.JPG",
        thumbImage: "assets/images/gallery/05-Navalucillos.JPG",
        alt: "Los Navalucillos",
        title: "Los Navalucillos"
      },
      {
        image: "assets/images/gallery/06-Navalucillos.JPG",
        thumbImage: "assets/images/gallery/06-Navalucillos.JPG",
        alt: "Los Navalucillos",
        title: "Los Navalucillos"
      },
      {
        image: "assets/images/gallery/07-Montalban.JPG",
        thumbImage: "assets/images/gallery/07-Montalban.JPG",
        alt: "Castillo de Montalban",
        title: "Castillo de Montalban"
      },
      {
        image: "assets/images/gallery/08-SanPablo.JPG",
        thumbImage: "assets/images/gallery/08-SanPablo.JPG",
        alt: "San Pablo de los Montes",
        title: "San Pablo de los Montes"
      },
      {
        image: "assets/images/gallery/09-Corral.JPG",
        thumbImage: "assets/images/gallery/09-Corral.JPG",
        alt: "Corral de Amaguer",
        title: "Corral de Amaguer"
      },
      {
        image: "assets/images/gallery/10-Cebreros.JPG",
        thumbImage: "assets/images/gallery/10-Cebreros.JPG",
        alt: "Cebreros",
        title: "Cebreros"
      },
      {
        image: "assets/images/gallery/11-Navacerrada.JPG",
        thumbImage: "assets/images/gallery/11-Navacerrada.JPG",
        alt: "Navacerrada",
        title: "Navacerrada"
      },
      {
        image: "assets/images/gallery/12-Mijares.JPG",
        thumbImage: "assets/images/gallery/12-Mijares.JPG",
        alt: "Mijares",
        title: "Mijares"
      }
      // {
      //   video: "https://youtu.be/6pxRHBw-k8M" // Youtube url
      // },
      // {
      //   video: "assets/video/movie.mp4" // MP4 Video url
      // },
      // {
      //   video: "assets/video/movie2.mp4",
      //   posterImage: "assets/img/slider/2_min.jpeg", //Optional: You can use this key if you want to show video poster image in slider
      //   title: "Image title"
      // },
      // {
      //   image: "assets/img/slider/1.jpg",
      //   thumbImage: "assets/img/slider/1_min.jpeg",
      //   alt: "Image alt"
      // }
    ];
  }

  ngAfterViewInit() {

  }

}

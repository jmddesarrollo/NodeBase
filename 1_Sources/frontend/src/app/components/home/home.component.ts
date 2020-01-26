import {
  Component,
  OnInit,
  AfterViewInit,
  Input
} from "@angular/core";

// Servicios propios
import { ShareUsuariosService } from '../../services/share/share-usuarios';

// Config
import { adminId } from '../../config/config';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, AfterViewInit {
  public permiso: number;
  public adminId: number;

  constructor(
    private shareUsuariosService: ShareUsuariosService
  ) {
    this.permiso = 0;
    this.adminId = adminId;
  }

  ngOnInit() {
    this.shareUsuariosService.currentUsuarioPermiso.subscribe(permiso => {
      this.permiso = permiso;
    });

    // this.imageObject = [
      // {
      //   image: "assets/images/gallery/12-Mijares.JPG",
      //   thumbImage: "assets/images/gallery/12-Mijares.JPG",
      //   alt: "Mijares",
      //   title: "Mijares"
      // }
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
    // ];
  }

  ngAfterViewInit() {

  }

}

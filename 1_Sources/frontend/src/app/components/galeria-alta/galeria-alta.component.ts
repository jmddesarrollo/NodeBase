import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Servicios
import { UploadService } from '../../services/uploads/upload.service';
// Modulo de importar archivos
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

// Constantes globales
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-galeria-alta',
  templateUrl: './galeria-alta.component.html',
  styleUrls: ['./galeria-alta.component.css']
})
export class GaleriaAltaComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  public filesToUpload: Array<File>;

  public id: string;
  public url: string;

  public arrGaleria = [];
  public imgTemp: string;

  constructor(
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = null;
    this.url = GLOBAL.url;

    this.arrGaleria = [];
    this.imgTemp = 'IMG_20200101_170939.jpg';
  }

  ngOnInit() {
    // Recoger identificador de la url
    this.route.params.forEach((params: Params) => {
      this.id = params['id'];
      this.getGaleria();
    });
  }

  /**
   * Exportación de archivos al servidor
   */
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    const url = this.url + 'uploads/galeria/' + this.id;

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

        fileEntry.file((file: File) => {
          const formData = new FormData();
          formData.append('imagen', file, file.name);

          this.uploadService.updloadsFilesServer(url, formData)
          .then( (data) => {
            this.getGaleria();
            this.toastr.success(data['message']);
          },
          error => {
            const errorMSg = JSON.parse(error);
            this.toastr.error(errorMSg.message);
          });
        });
      }
    }
  }

  public fileOver(event){
    // console.log(event);
  }

  public fileLeave(event){
    // console.log(event);
  }

  public openFileSelector() {
    // console.log('Apertura del selector');
  }

  public getGaleria() {
    const url = this.url + 'uploads/galeria/' + this.id;

    this.uploadService.getGaleria(url).subscribe((response) => {
      this.arrGaleria = response["data"];
      this.arrGaleria = [...this.arrGaleria];
    });
  }

  public eliminarImg(imgName) {
    const url = this.url + 'galeria/' + this.id + '/' + imgName;

    this.uploadService.eliminarImg(url).subscribe(() => {
      this.arrGaleria = this.arrGaleria.filter(imagen => imagen !== imgName);
      this.arrGaleria = [...this.arrGaleria];
    });
  }

}

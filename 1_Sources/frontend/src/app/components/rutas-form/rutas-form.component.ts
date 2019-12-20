import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

// Servicios
import { WsRutaService } from '../../services/socket/rutas.service';
import { ValidadoresService } from '../../services/regex/validadores.service';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

// Modelos
import { Ruta } from '../../models/ruta.model';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './rutas-form.component.html',
  styleUrls: ['./rutas-form.component.css']
})
export class RutasFormComponent implements OnInit, OnDestroy {
  public rutaId: number;
  public ruta: Ruta;
  public rutaPrev: Ruta;

  public mostrarAlert: boolean;
  public inProcess: boolean;

  public forma: FormGroup;

  private observables = new Array();

  constructor(
    private rutaService: WsRutaService,
    private validadoresService: ValidadoresService,
    private toastr: ToastrService
  ) {
    this.rutaId = null;
    this.ruta = new Ruta(null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    this.rutaPrev = Ruta.copiar(this.ruta);

    this.mostrarAlert = false;
    this.inProcess = false;

    // FormControl parametros: valor por defecto / regla validación[] / regla validación asincrona[]
    this.forma = new FormGroup({
      'id': new FormControl(''),
      'titulo': new FormControl('', [Validators.required, this.validadoresService.textoMinimo2, this.validadoresService.textoMaximo100]),
      'lugar': new FormControl('', [Validators.required, this.validadoresService.textoMinimo2, this.validadoresService.textoMaximo100]),
      'fecha': new FormControl('', [Validators.required]),
      'distancia': new FormControl('', [Validators.required]),
      'duracion': new FormControl('', [Validators.required]),
      'altitudMax': new FormControl('', [Validators.required]),
      'altitudMin': new FormControl('', [Validators.required]),
      'desnivelSubida': new FormControl('', [Validators.required]),
      'desnivelBajada': new FormControl('', [Validators.required]),
      'senalizacion': new FormControl('', [Validators.required]),
      'ibp': new FormControl('', [Validators.required]),
      'descripcion': new FormControl('', [Validators.required, this.validadoresService.textoMinimo2]),
      'opcional': new FormControl('', [Validators.required]),
      'enlaceTiempo': new FormControl('', [Validators.required]),
      'enlaceRuta': new FormControl('', [Validators.required]),
      'enlaceApuntarse': new FormControl('', [Validators.required]),
      'precioNoSocio': new FormControl('', [Validators.required]),
      'precioSocio': new FormControl('', [Validators.required]),
      'telefonoContacto': new FormControl('', [Validators.required]),
      'ultimoDiaApuntarse': new FormControl('', [Validators.required]),
      'ultimaHoraApuntarse': new FormControl('', [Validators.required]),
      'publica': new FormControl('', [Validators.required]),
      'recorridoId': new FormControl('', [Validators.required]),
      'dificultadId': new FormControl('', [Validators.required]),
      'dificultad': new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    console.log('Carga ruta');
    this.rutaId = 1;
    this.rutaService.consultarRuta(this.rutaId);
    this._getRuta();
    // this._getRolsUserLevel();
    // this._addEnlace();
    // this._editEnlace();
  }


  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  /*
   * Tratar respuesta de la identificación de la versión.
   */
  _getRuta() {
    const ob = this.rutaService.getConsultarRuta().subscribe((respuesta: Ruta) => {
      if (respuesta) {
        console.log(respuesta);
        this.ruta = respuesta['ruta'];

        this.rutaPrev = Ruta.copiar(this.ruta);

        // this.getRolsUserLevel();

        this.forma.setValue(this.ruta);
      }
    });
    this.observables.push(ob);
  }

  /*
   * Solicitud de roles del usuario en el nivel.
   */
  // getRolsUserLevel() {
  //   this.mostrarAlert = false;

  //   const data = { nivelid: this.idNivelWork };
  //   this._accesoService.getRolsUserLevel(data);
  // }

  /*
   * Tratar respuesta de la solicitud de roles del usuario en el nivel.
   */
  // _getRolsUserLevel() {
  //   const ob = this._accesoService._getRolsUserLevel().subscribe(
  //     response => {
  //       this.mostrarAlert = true;
  //       // Buscar si el usuario posee en el nivel un modo de rol Responsable o Usuario
  //       const indR = response["modorol"].indexOf('r');
  //       const indU = response["modorol"].indexOf('u');

  //       if (indR >= 0 || indU >= 0) {
  //         this.mostrarAlert = false;
  //       }
  //     });
  //   this.observables.push(ob);
  // }

  /**
   * Alta o edición de noticia.
   */
  guardarCambios() {
    console.log(this.forma.value);
  //   this.enlace = this.forma.value;

  //   this.enlace.ruta = this.enlace.ruta.trim();
  //   this.enlace.comentario = this.enlace.comentario.trim();
  //   this.inProcess = true;

  //   if (this.enlace.identrada === "" || this.enlace.identrada === null) {
  //     if (!this.enlace.idnivel) {
  //       this.enlace.idnivel = this.idNivel;
  //     }
  //     // Alta de enlace
  //     this._enlaceService.addEnlaceNivel(this.enlace);
  //   } else {
  //     // Edición de un elace
  //     if (this.enlace.ruta === this.enlace_prev.ruta &&
  //        this.enlace.comentario === this.enlace_prev.comentario &&
  //        this.enlace.principal === this.enlace_prev.principal) {
  //       this._toastr.warning('Enlace no actualizado. No se ha encontrado ningún cambio.');
  //       return false;
  //     }

  //     this._enlaceService.editEnlaceNivel(this.enlace);
  //   }

  //   this.limpiarData();
  }

  // _addEnlace() {
  //   const ob = this._enlaceService._addEnlaceNivel().subscribe(
  //     response => {
  //       if (response["mensaje"] !== undefined) {
  //         this.inProcess = false;
  //         this._toastr.success(response["mensaje"]);
  //         this.limpiarData();
  //       }
  //     });
  //   this.observables.push(ob)
  // }

  // _editEnlace() {
  //   const ob = this._enlaceService._editEnlaceNivel().subscribe(
  //     response => {
  //       if (response["mensaje"] !== undefined) {
  //         this.inProcess = false;
  //         this._toastr.success(response["mensaje"]);
  //         this.limpiarData();
  //       }
  //     });
  //   this.observables.push(ob)
  // }


  // Limpiar contenido de objeto que contiene información a editar.
  limpiarData() {
    this.forma.reset();
    this.ruta = new Ruta(null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    this.rutaPrev = Ruta.copiar(this.ruta);
  }

}

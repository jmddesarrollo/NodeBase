import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';

// Servicios
import { WsRutaService } from '../../services/socket/rutas.service';
import { ValidadoresService } from '../../services/regex/validadores.service';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

// Modelos
import { Ruta } from '../../models/ruta.model';
import { Dificultad } from '../../models/dificultad.model';
import { Recorrido } from '../../models/recorrido.model';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './rutas-form.component.html',
  styleUrls: ['./rutas-form.component.css']
})
export class RutasFormComponent implements OnInit, OnDestroy {
  public rutaId: number;
  public ruta: Ruta;
  public rutaPrev: Ruta;
  public dificultades: Dificultad[];
  public recorridos: Recorrido[];
  public contadorCambiosForma: number;

  public forma: FormGroup;

  private observables = new Array();

  constructor(
    private rutaService: WsRutaService,
    private validadoresService: ValidadoresService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.rutaId = null;
    this.ruta = new Ruta(null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    this.rutaPrev = Ruta.copiar(this.ruta);

    this.contadorCambiosForma = 0;

    // FormControl parametros: valor por defecto / regla validación[] / regla validación asincrona[]
    this.forma = new FormGroup({
      id: new FormControl(''),
      titulo: new FormControl('', [Validators.required, this.validadoresService.textoMinimo2, this.validadoresService.textoMaximo100]),
      lugar: new FormControl('', [Validators.required, this.validadoresService.textoMinimo2, this.validadoresService.textoMaximo100]),
      fecha: new FormControl('', [Validators.required]),
      distancia: new FormControl('', [this.validadoresService.valDecimal]),
      duracion: new FormControl('', [this.validadoresService.validarHora]),
      altitudMax: new FormControl('', [this.validadoresService.valEntero]),
      altitudMin: new FormControl('', [this.validadoresService.valEntero]),
      desnivelSubida: new FormControl('', [this.validadoresService.valEntero]),
      desnivelBajada: new FormControl('', [this.validadoresService.valEntero]),
      senalizacion: new FormControl('', [this.validadoresService.textoMaximo100]),
      ibp: new FormControl('', [this.validadoresService.textoMaximo45]),
      descripcion: new FormControl('', [this.validadoresService.textoMaximoTextArea]),
      opcional: new FormControl('', [this.validadoresService.textoMaximoTextArea]),
      enlaceTiempo: new FormControl('', [this.validadoresService.validarUrl, this.validadoresService.textoMaximo200]),
      enlaceRuta: new FormControl('', [this.validadoresService.validarUrl, this.validadoresService.textoMaximo200]),
      enlaceApuntarse: new FormControl('', [this.validadoresService.validarUrl, this.validadoresService.textoMaximo200]),
      precioNoSocio: new FormControl('', [this.validadoresService.valDecimal]),
      precioSocio: new FormControl('', [this.validadoresService.valDecimal]),
      telefonoContacto: new FormControl('', [this.validadoresService.validarTelefono]),
      ultimoDiaApuntarse: new FormControl('', [Validators.required]),
      ultimaHoraApuntarse: new FormControl('', [this.validadoresService.validarHora]),
      publica: new FormControl('', []),
      recorridoId: new FormControl('', []),
      dificultadId: new FormControl('', []),
      recorrido: new FormControl('', []),
      dificultad: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.rutaId = params['id'];
    });

    this._getRuta();
    this._getDificultades();
    this._getRecorridos();
    this._crearRuta();
    this._actualizarRuta();
    if (this.rutaId) {
      this.rutaService.consultarRuta(this.rutaId);
    } else {
      // Valores por defecto en los select si no se consulta ruta
      this.forma.controls['publica'].setValue(1);
      this.forma.controls['dificultadId'].setValue(1);
      this.forma.controls['recorridoId'].setValue(1);
    }
    this.rutaService.consultarDificultades();
    this.rutaService.consultarRecorridos();

    this.forma.valueChanges.subscribe( () => {
      this.contadorCambiosForma ++;
    });
  }

  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  /*
   * Tratar respuesta de la consulta a la ruta.
   */
  _getRuta() {
    const ob = this.rutaService.getConsultarRuta().subscribe((respuesta: Ruta) => {
      if (respuesta) {
        this.ruta = respuesta['ruta'];

        this.rutaPrev = Ruta.copiar(this.ruta);

        this.forma.setValue(this.ruta);
      }
    });
    this.observables.push(ob);
  }

  /*
   * Tratar respuesta de la consulta a las dificultades.
   */
  _getDificultades() {
    const ob = this.rutaService.getConsultarDificultades().subscribe((respuesta: Dificultad[]) => {
      if (respuesta) {
        this.dificultades = respuesta['dificultades'];
      }
    });
    this.observables.push(ob);
  }

  /*
   * Tratar respuesta de la consulta a los recorridos.
   */
  _getRecorridos() {
    const ob = this.rutaService.getConsultarRecorridos().subscribe((respuesta: Recorrido[]) => {
      if (respuesta) {
        this.recorridos = respuesta['recorridos'];
      }
    });
    this.observables.push(ob);
  }

  /**
   * Alta o edición de noticia.
   */
  guardarCambios() {
    this.ruta = this.forma.value;

    if (this.ruta.id) {
      this.rutaService.actualizarRuta(this.ruta);
    } else {
      this.rutaService.crearRuta(this.ruta);
    }

    setTimeout(() => {
      this.router.navigate(['rutas']);
    }, 1000);
  }
  _crearRuta() {
    const ob = this.rutaService.getCrearRuta().subscribe(
      response => {
        if (response["mensaje"] !== undefined) {
          this.toastr.success(response["mensaje"]);
          this.limpiarData();
        }
      });
    this.observables.push(ob);
  }
  _actualizarRuta() {
    const ob = this.rutaService.getActualizarRuta().subscribe(
      response => {
        if (response["mensaje"] !== undefined) {
          this.toastr.success(response["mensaje"]);
          this.contadorCambiosForma = 1;
        }
      });
    this.observables.push(ob);
  }

  // Limpiar contenido de objeto que contiene información a editar.
  limpiarData() {
    this.forma.reset();
    this.ruta = new Ruta(null, null, null, null, null, null, null, null, null, null, null, null,
      null, null, null, null, null, null, null, null, null, null, null, null, null, null);

    this.rutaPrev = Ruta.copiar(this.ruta);
  }

}

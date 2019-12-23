import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { WsRutaService } from '../../services/socket/rutas.service';
// Servicios propios
import { ShareUsuariosService } from '../../services/share/share-usuarios';

// Modelo
import { Ruta } from '../../models/ruta.model';

// Config
import { adminId } from '../../config/config';

// Modulo de tiempo
import * as moment from 'moment';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent implements OnInit, OnDestroy {
  public rutas: Ruta[];
  public rutasOriginal: Ruta[];
  public numRegs: number;
  public numTotRegs: number;
  public adminId: number;
  public permiso: number;
  public hoy: string;
  public opcRutas: number;

  private observables = new Array();

  constructor(
    private wsRutaService: WsRutaService,
    private shareUsuariosService: ShareUsuariosService
  ) {
    this.numRegs = 12;
    this.adminId = adminId;
    this.permiso = 0;
    this.opcRutas = 1;

    this.hoy = moment().format('YYYY-MM-DD');
  }

  ngOnInit() {
    const id = localStorage.getItem('id');
    if (id) {
      this.getRutas();
    } else {
      this.getRutasPublicas();
    }

    this.getConsultarRutas();
    this.getConsultarRutasPublicas();

    this.shareUsuariosService.currentUsuarioPermiso.subscribe(permiso => {
      this.permiso = permiso;
    });
  }

  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  getRutas() {
    this.wsRutaService.consultarRutas();
  }

  getConsultarRutas() {
    const ob = this.wsRutaService.getConsultarRutas().subscribe((data) => {
      this.rutasOriginal = data["rutas"];
      this.rutas = this.rutasOriginal.filter((ruta) => {
        return ruta.fecha >= this.hoy;
      });

      this.changeUnits();
    });

    this.observables.push(ob);
  }

  getRutasPublicas() {
    this.wsRutaService.consultarRutasPublicas();
  }

  getConsultarRutasPublicas() {
    const ob = this.wsRutaService.getConsultarRutasPublicas().subscribe((data) => {
      this.rutasOriginal = data["rutas"];
      this.rutas = this.rutasOriginal.filter((ruta) => {
        return ruta.fecha >= this.hoy;
      });
      this.changeUnits();
    });

    this.observables.push(ob);
  }

  delRuta(id) {

  }

  /**
   * Recalcular unidades a mostrar en texto de totales de la tabla.
   */
  changeUnits() {
    this.numTotRegs = this.rutas.length;

    this.countRows(window.innerHeight);
  }

  onResize(event) {
    const size = event.target.innerHeight;
    this.countRows(size);
  }

  /**
   * Calcular el número de filas a mostrar en función del tamaño de entrada (tamaño de la ventana).
   * Se resta el sumatorio del alto del resto de elementos en la vista.   
   */
  countRows(size) {
    let rows = (size - 200) / 32;
    if (rows < 10) {
      rows = 10;
    }

    // Redondear hacia abajo.
    const rounded = Math.floor(rows);
    this.numRegs = rounded;

    // Dar tiempo a Angular a actualizar valor de filas en ngx-datatable.
    setTimeout(() => {
      this.editContador();
    }, 100);
  }

  editContador() {
    const div = document.getElementsByClassName('page-count');
    const rows = document.getElementsByTagName('datatable-row-wrapper');

    // #22869. Se ha dado algún caso donde supera el total
    let numMostradasRegs = rows.length;
    if (numMostradasRegs > this.numTotRegs) {
      numMostradasRegs = this.numTotRegs;
    }

    if (div[0] !== undefined) {
      div[0].innerHTML = 'Mostrando ' + numMostradasRegs + ' de ' + this.numTotRegs + ' totales';
    }
  }

  cambiarOpcion() {
    if (this.opcRutas == 1) {
      this.rutas = this.rutasOriginal.filter((ruta) => {
        return ruta.fecha >= this.hoy;
      });
    } else {
      this.rutas = this.rutasOriginal;
    }
    this.rutas = [...this.rutas];

    this.changeUnits();
  }

  refrescarDatos() {
    setTimeout(() => {
      this.rutas = [...this.rutas];
    }, 100);
  }

}

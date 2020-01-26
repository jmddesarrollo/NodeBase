import { Component, OnInit } from '@angular/core';

// Servicios
import { WsRutaService } from '../../services/socket/rutas.service';

// Modulo de tiempo
import * as moment from 'moment';

@Component({
  selector: 'app-galerias',
  templateUrl: './galerias.component.html',
  styleUrls: ['./galerias.component.css']
})
export class GaleriasComponent implements OnInit {
  public fechaDesde: string;
  public fechaHasta: string;
  public rutas: [];

  constructor(
    private wsRutaService: WsRutaService
  ) {
    this.fechaDesde = null;
    this.fechaHasta = null;
    this.rutas = [];
  }

  ngOnInit() {
    this.fechaDesde = moment().subtract(1, 'month').format('YYYY-MM-DD');
    this.fechaHasta = moment().format('YYYY-MM-DD');

    this.mostrarDatos();
    this.getConsultarRutasRango();
  }

  getConsultarRutasRango() {
    this.wsRutaService.getConsultarRutasRango().subscribe((response) => {
      this.rutas = response['data'];
    });

  }

  mostrarDatos() {
    this.wsRutaService.consultarRutasRango(this.fechaDesde, this.fechaHasta);
  }

}

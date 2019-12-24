import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

// Servicios
import { WsRutaService } from '../../services/socket/rutas.service';

// Modelos
import { Ruta } from '../../models/ruta.model';

@Component({
  selector: 'app-rutas-consulta',
  templateUrl: './rutas-consulta.component.html',
  styleUrls: ['./rutas-consulta.component.css']
})
export class RutasConsultaComponent implements OnInit, OnDestroy {
  public rutaId: number;
  public ruta: Ruta;

  private observables = new Array();

  constructor(
    private rutaService: WsRutaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.rutaId = params['id'];
    });

    this._getRuta();
    this.rutaService.consultarRuta(this.rutaId);
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
      }
    });
    this.observables.push(ob);
  }

}

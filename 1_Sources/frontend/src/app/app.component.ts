import { Component, OnInit, OnDestroy } from '@angular/core';

import { WebsocketService } from './services/websocket.service';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';

// Título en cada página
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private observables = new Array();

  constructor(
    private websocketService: WebsocketService,
    private router: Router,
    private toastr: ToastrService,
    private titulo: Title
  ) {
    this.getDataRoute().subscribe (data => {
      if (data.titulo !== undefined && data.titulo !== null) {
        this.titulo.setTitle(data.titulo);
      } else {
        this.titulo.setTitle('Y-Toledo');
      }
    });

  }

  ngOnInit() {
    this.getError();
  }

  ngOnDestroy() {
    for (const ob of this.observables) {
      if (ob !== undefined && ob !== null) {
        ob.unsubscribe();
      }
    }
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map ( (evento: ActivationEnd ) => evento.snapshot.data)
    );
  }

  getError() {
    this.websocketService.listen('error_message').subscribe((data) => {
      this.toastr.error(data["message"], 'Error');
    });
  }

}

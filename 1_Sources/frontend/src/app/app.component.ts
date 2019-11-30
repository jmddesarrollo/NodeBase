import { Component, OnInit, OnDestroy } from '@angular/core';

import { WebsocketService } from './services/websocket.service';

// Modulo de notificaciones.
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private observables = new Array();

  constructor(
    private websocketService: WebsocketService,
    private toastr: ToastrService
  ) {

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

  getError() {
    this.websocketService.listen('error_message').subscribe((data) => {
      this.toastr.error(data["message"], 'Error');
    });
  }

}

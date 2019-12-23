import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  public pestanaAbierta: string;

  constructor() { 
    this.pestanaAbierta = '1';
  }

  ngOnInit() {
  }

  /**
   * Cambiar pestañas seleccionadas
   */
  abrirPestana(tab, panel) {
    let i, x, tablinks;

    x = document.getElementsByClassName('tabs');
    tablinks = document.getElementsByClassName('tablink');

    for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' w3-border-red', '');
    }

    if (document.getElementById(tab)) {
      document.getElementById(tab).className += ' w3-border-red';
    }

    this.pestanaAbierta = panel;
  }

}

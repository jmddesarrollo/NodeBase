import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ShareMenuService {
  /*
   * Variables de comunicación para Menu
   */
  private objMenu = new BehaviorSubject<any>('');
  currentObjMenu = this.objMenu.asObservable();

  constructor() {}

  editObjMenu(valorObjMenu: any) {
    this.objMenu.next(valorObjMenu);
  }
}
